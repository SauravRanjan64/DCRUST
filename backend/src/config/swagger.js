import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import env from './env.js';

const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'DCRUST Campus Placement & Eligibility Portal API',
      version: '2.0.0',
      description: 'Production-ready Modular Monolith REST API for DCRUST placement drives, deterministic eligibility engine, application state machine, assistive resume matcher, and real-time Socket.IO notifications.',
      contact: {
        name: 'Training & Placement Cell, DCRUST Murthal',
        email: 'tpo@dcrust.edu.in',
      },
    },
    servers: [
      {
        url: `http://localhost:${env.PORT}`,
        description: 'Local Development Server',
      },
    ],
    components: {
      securitySchemes: {
        cookieAuth: {
          type: 'apiKey',
          in: 'cookie',
          name: env.COOKIE_NAME,
          description: 'HttpOnly Session Cookie',
        },
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
    },
    security: [
      { cookieAuth: [] },
      { bearerAuth: [] },
    ],
  },
  apis: ['./src/modules/**/*.js', './src/routes/*.js'],
};

export function setupSwagger(app) {
  if (env.NODE_ENV === 'test') {
    app.get('/docs', (req, res) => res.send('Swagger UI Test Mode'));
    app.get('/docs.json', (req, res) => res.json({ openapi: '3.0.0' }));
    return;
  }

  const swaggerSpec = swaggerJsdoc(swaggerOptions);

  app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec, {
    customSiteTitle: 'DCRUST Placement API Documentation',
    customCss: '.swagger-ui .topbar { display: none }',
  }));

  app.get('/docs.json', (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    res.send(swaggerSpec);
  });
}

export default setupSwagger;
