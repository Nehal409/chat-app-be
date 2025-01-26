import swaggerJSDoc from "swagger-jsdoc";
import { fileURLToPath } from "url";
import path from "path";

// Simulate __dirname for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Real Time Chat APP - API",
      version: "1.0.0",
      description: "API documentation for Real Time Chat APP",
    },
    servers: [
      {
        url: "http://localhost:5000/api/v1",
        description: "Development Server",
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },
    security: [
      {
        bearerAuth: [],
      },
    ],
  },
  apis: [path.join(__dirname, "../src/modules/**/routes/*.js")],
};

const swaggerSpec = swaggerJSDoc(swaggerOptions);
export default swaggerSpec;
