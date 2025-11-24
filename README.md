# TheMealDB Explorer

Full-stack project for exploring TheMealDB recipes.

- **Backend:** Spring Boot (Java) — simplified proxy API with caching (Caffeine) and normalized responses.  
- **Frontend:** React (Vite) — search meals, browse categories, view random meals, see recipe details with ingredients, instructions, and YouTube embeds. Fully responsive.

---

## Repository Structure
TheMealDB/
=>backend/ (Spring Boot project)

=>frontend/ (React Vite project)

=>README.md

=>.gitignore
--

## Backend - Spring Boot

### Requirements
- Java 17+
- Maven
- Internet access (calls TheMealDB API: https://www.themealdb.com/api/json/v1/1)

### Run Locally
1. Open terminal at `backend/` (or project root)

mvn clean package
mvn spring-boot:run

Backend runs at: http://localhost:8080

*API Endpoints
Method	Endpoint	          Description
GET	/api/search?name={name}	Search meals by name
GET	/api/categories	        List categories
GET	/api/category/{name}	  Meals in category
GET	/api/random	            Random meal
GET	/api/meal/{id}	        Meal details
GET	/api/_health	          Health check

#Caching
-Implemented using Caffeine

#TTL: 5 minutes

#Max entries: 500

Cache keys based on Spring Cache default method keys

#Notes
-Uses WebClient (blocking .block()) for simplicity; production use should prefer reactive handling or resilience patterns.
-Can switch to Redis by replacing the cache manager bean.
===============================================================


**Frontend - React (Vite)**

**Requirements**
Node.js & npm

Run Locally
cd frontend
npm install
npm run dev


Open the app at http://localhost:5173.

**Notes**
-Expects backend API at http://localhost:8080/api.
-To change backend host/port:

VITE_API_BASE=http://localhost:4000/api npm run dev

**GitHub Repository**
Public repo: https://github.com/RiyanS07/TheMealDB-Explorer
