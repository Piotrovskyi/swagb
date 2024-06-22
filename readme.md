# Simple Swagger Builder

## Get started

```
npm install swagb
```

## Example
```js
const express = require('express');
const app = express();
const swaggerUi = require('swagger-ui-express');

// Joi for schema generation, can be replaced with any other schema generator
const Joi = require("joi");
const jts = require("joi-to-swagger");

const swagb = require("swagb");

const swaggerDocument = swagb
  .api("3.0.0")
  .info({
    title: "API Documentation",
    version: "1.0.0",
    description: "Documentation for your API",
  })
  .paths({
    "/entity/{uuid}": swagb
      .put()
      .summary("Update entity")
      .description("Endpoint to update entity")
      .tags(["Location"])
      .security([{ bearerAuth: [] }])
      .request(
        swagb
          .request()
          .required()
          .json(
            jts(
              Joi.object().keys({
                name: Joi.string().required(),
                address: Joi.string().required(),
                city: Joi.string().required(),
                state: Joi.string().required(),
                zip: Joi.string().required(),
                country: Joi.string().required(),
              })
            ).swagger
          )
      )
      .responses({
        200: swagb
          .response()
          .description("Entity updated successfully")
          .json(
            jts(
              Joi.object().keys({
                message: Joi.string().required(),
              })
            ).swagger
          ),
      }),
  })
  .components({
    securitySchemes: {
      bearerAuth: {
        type: "http",
        scheme: "bearer",
      },
    },
  })
  .compile();

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});
```
