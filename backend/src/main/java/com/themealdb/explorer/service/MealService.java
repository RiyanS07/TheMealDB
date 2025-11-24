package com.themealdb.explorer.service;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.themealdb.explorer.dto.MealDto;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;

import java.util.*;
import java.util.stream.Collectors;

@Service
public class MealService {

    private final WebClient webClient;
    private final ObjectMapper mapper = new ObjectMapper();

    public MealService(@Value("${themealdb.base}") String baseUrl, WebClient.Builder webClientBuilder) {
        this.webClient = webClientBuilder.baseUrl(baseUrl).build();
    }

    // Search by name
    @Cacheable("search")
    public List<MealDto> searchByName(String name) {
        String url = "/search.php?s=" + encode(name);
        JsonNode root = callUpstream(url);
        if (root == null || root.get("meals") == null || root.get("meals").isNull()) return Collections.emptyList();
        List<MealDto> list = new ArrayList<>();
        for (JsonNode n : root.get("meals")) {
            list.add(parseMeal(n));
        }
        return list;
    }

    // List categories
    @Cacheable("categories")
    public List<Map<String, Object>> listCategories() {
        String url = "/categories.php";
        JsonNode root = callUpstream(url);
        if (root == null || root.get("categories") == null || root.get("categories").isNull()) return Collections.emptyList();
        List<Map<String, Object>> cats = new ArrayList<>();
        for (JsonNode n : root.get("categories")) {
            Map<String, Object> m = new LinkedHashMap<>();
            m.put("id", safeText(n, "idCategory"));
            m.put("name", safeText(n, "strCategory"));
            m.put("thumbnail", safeText(n, "strCategoryThumb"));
            m.put("description", safeText(n, "strCategoryDescription"));
            cats.add(m);
        }
        return cats;
    }

    // Meals in category
    @Cacheable("category")
    public List<Map<String, String>> mealsByCategory(String category) {
        String url = "/filter.php?c=" + encode(category);
        JsonNode root = callUpstream(url);
        if (root == null || root.get("meals") == null || root.get("meals").isNull()) return Collections.emptyList();
        List<Map<String, String>> list = new ArrayList<>();
        for (JsonNode n : root.get("meals")) {
            Map<String, String> m = new HashMap<>();
            m.put("id", safeText(n, "idMeal"));
            m.put("name", safeText(n, "strMeal"));
            m.put("thumbnail", safeText(n, "strMealThumb"));
            list.add(m);
        }
        return list;
    }

    // Random meal
    @Cacheable("random")
    public MealDto randomMeal() {
        String url = "/random.php";
        JsonNode root = callUpstream(url);
        if (root == null || root.get("meals") == null || root.get("meals").isNull()) return null;
        return parseMeal(root.get("meals").get(0));
    }

    // Meal by id
    @Cacheable("meal")
    public MealDto findById(String id) {
        String url = "/lookup.php?i=" + encode(id);
        JsonNode root = callUpstream(url);
        if (root == null || root.get("meals") == null || root.get("meals").isNull()) return null;
        return parseMeal(root.get("meals").get(0));
    }

    // --- helpers ---
    private JsonNode callUpstream(String path) {
        try {
            String txt = this.webClient.get()
                    .uri(path)
                    .accept(MediaType.APPLICATION_JSON)
                    .retrieve()
                    .bodyToMono(String.class)
                    .block();
            if (txt == null) return null;
            return mapper.readTree(txt);
        } catch (Exception e) {
            throw new RuntimeException("Upstream call failed: " + e.getMessage(), e);
        }
    }

    private MealDto parseMeal(JsonNode n) {
        if (n == null || n.isNull()) return null;
        MealDto m = new MealDto();
        m.setId(safeText(n, "idMeal"));
        m.setName(safeText(n, "strMeal"));
        m.setCategory(safeText(n, "strCategory"));
        m.setArea(safeText(n, "strArea"));
        m.setInstructions(safeText(n, "strInstructions"));
        m.setThumbnail(safeText(n, "strMealThumb"));
        m.setYoutube(safeText(n, "strYoutube"));

        // ingredients and measures (1..20)
        List<String> ingredients = new ArrayList<>();
        for (int i = 1; i <= 20; i++) {
            String ing = safeText(n, "strIngredient" + i);
            String measure = safeText(n, "strMeasure" + i);
            if (ing != null && !ing.isBlank()) {
                String combined = (measure == null || measure.isBlank()) ? ing : (measure + " " + ing).trim();
                ingredients.add(combined);
            }
        }
        m.setIngredients(ingredients);

        // thumbnail and tags
        m.setTags(safeText(n, "strTags"));
        return m;
    }

    private String safeText(JsonNode n, String field) {
        JsonNode f = n.get(field);
        return (f == null || f.isNull()) ? null : f.asText();
    }

    private String encode(String s) {
        return Optional.ofNullable(s).map(u -> u.replace(" ", "%20")).orElse("");
    }
}
