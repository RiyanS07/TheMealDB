package com.themealdb.explorer.controller;

import com.themealdb.explorer.dto.MealDto;
import com.themealdb.explorer.service.MealService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api")
public class MealController {

    private final MealService mealService;

    public MealController(MealService mealService) {
        this.mealService = mealService;
    }

    @GetMapping("/search")
    public ResponseEntity<?> search(@RequestParam(name = "name") String name) {
        if (name == null || name.isBlank()) {
            return ResponseEntity.badRequest().body(Map.of("error", "name query required"));
        }
        List<MealDto> meals = mealService.searchByName(name.trim());
        return ResponseEntity.ok(Map.of("count", meals.size(), "meals", meals));
    }

    @GetMapping("/categories")
    public ResponseEntity<?> categories() {
        var cats = mealService.listCategories();
        return ResponseEntity.ok(Map.of("count", cats.size(), "categories", cats));
    }

    @GetMapping("/category/{name}")
    public ResponseEntity<?> byCategory(@PathVariable String name) {
        var meals = mealService.mealsByCategory(name);
        return ResponseEntity.ok(Map.of("count", meals.size(), "meals", meals));
    }

    @GetMapping("/random")
    public ResponseEntity<?> randomMeal() {
        MealDto meal = mealService.randomMeal();
        return ResponseEntity.ok(Map.of("meal", meal));
    }

    @GetMapping("/meal/{id}")
    public ResponseEntity<?> mealById(@PathVariable String id) {
        MealDto meal = mealService.findById(id);
        if (meal == null) return ResponseEntity.notFound().build();
        return ResponseEntity.ok(Map.of("meal", meal));
    }

    @GetMapping("/_health")
    public ResponseEntity<?> health() {
        return ResponseEntity.ok(Map.of("ok", true));
    }
}
