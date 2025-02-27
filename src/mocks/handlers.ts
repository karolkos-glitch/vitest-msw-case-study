// src/mocks/handlers.js
import { http, HttpResponse } from "msw";

export const handlers = [
  // Intercept "GET https://example.com/user" requests...
  http.get("http://localhost:3000/api/invoice-types", () => {
    // ...and respond to them using this JSON response.
    return HttpResponse.json([
      { value: "standard", label: "Standard Invoice" },
      { value: "proforma", label: "Proforma Invoice" },
      { value: "correction", label: "Correction Invoice" },
    ]);
  }),
];
