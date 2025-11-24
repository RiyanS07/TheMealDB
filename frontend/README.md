# TheMealDB Explorer - React Frontend

This React frontend consumes the Spring Boot backend and provides the UI features required by the assignment:
- Recipe Search
- Category Browser
- Random Meal
- Recipe Details (ingredients, instructions, YouTube embed)
- Responsive design

## Run locally
1. Ensure backend (Spring Boot) is running at `http://localhost:8080` (default). The frontend expects API base `http://localhost:8080/api`.
2. Install dependencies:

```bash
npm install
```
3. Start dev server:

```bash
npm run dev
```
4. Open the app at `http://localhost:5173` (Vite default) and use the UI.

## Notes
- If your backend runs on a different host/port, set `VITE_API_BASE` environment variable when running Vite:

```bash
VITE_API_BASE=http://localhost:4000/api npm run dev
```