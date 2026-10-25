// Product
// Item reviews, referenced by product schema
export const reviewSchema = {
  $schema: "https://json-schema.org/draft/2020-12/schema",
  title: "Review",
  type: "object",
  properties: {
    _id: {
      type: "string",
      minLength: 1,
      description: "Unique identifier for the review, referenced by the product's reviews array"
    },
    productId: {
      type: "string",
      minLength: 1,
      description: "The _id of the product this review is about"
    },
    reviewTitle: {
      type: "string",
      minLength: 1,
      description: "The title of the review"
    },
    reviewText: {
      type: "string",
      minLength: 10,
      maxLength: 1000,
      description: "The body of the review, 10 to 1000 characters"
    }
  },
  required: ["_id", "productId", "reviewTitle", "reviewText"],
  additionalProperties: false
};

export const productSchema = {
  "$schema": "https://json-schema.org/draft/2020-12/schema",
  "title": "Product",
  "type": "object",
  "properties": {
    "_id": {
      "type": "string",
      "description": "Unique identifier for the product"
    },
    "name": {
      "type": "string",
      "minLength": 1,
      "description": "What the store product is called"
    },
    "description": {
      "type": "string",
      "minLength": 10,
      "maxLength": 500,
      "description": "A short paragraph explaining what the object is"
    },
    "price": {
      "type": "number",
      "minimum": 0
    },
    "reviews": reviewSchema,
    "images": {
      "type": "string",
      "format": "uri-reference",
      "description": "A URL link to a locally stored image file"
    }
  },
  "required": ["__id", "name", "description", "price", "images"],
  "additionalProperties": false
}

// User
export const userSchema = {
  "$schema": "https://json-schema.org/draft/2020-12/schema",
  "title": "User",
  "type": "object",
  "properties": {
    "_id": {
      "type": "string",
      "description": "Unique identifier for the user"
    },
    "username": {
      "type": "string",
      "minLength": 1,
      "description": "Username associated with the user account, chosen at account creation, may be used to log in"
    },
    "email": {
      "type": "string",
      "format": "email",
      "description": "Email associated with the user account, may be used to log in"
    },
    "password": {
      "type": "string",
      "minLength": 1,
      "description": "Authentication to make sure the user is who they say they are"
    },
    "cart": {
      "type": "array",
      "description": "Each item contains the productId, productName, and finalPrice (the price of the item)",
      "items": {
        "type": "object",
        "properties": {
          "productId": {
            "type": "string"
          },
          "productName": {
            "type": "string"
          },
          "finalPrice": {
            "type": "number",
            "minimum": 0
          }
        },
        "required": ["productId", "productName", "finalPrice"],
        "additionalProperties": false
      }
    },
    "shippingAddress": {
      "type": "string",
      "minLength": 1,
      "description": "The address the user provided to ship the order to"
    }
  },
  "required": ["_id", "username", "email", "password", "cart", "shippingAddress"],
  "additionalProperties": false
};

// Alert
export const alertSchema = {
  "$schema": "https://json-schema.org/draft/2020-12/schema",
  "title": "Alert",
  "type": "object",
  "properties": {
    "_id": {
      "type": "string"
    },
    "title": {
      "type": "string",
      "minLength": 1,
      "pattern": "\\S",
      "description": "The title of the alert, must not be blank"
    },
    "type": {
      "type": "string",
      "enum": ["warning", "info", "promotion"],
      "description": "The type of the alert, must be one of: warning, info, promotion"
    },
    "status": {
      "type": "string",
      "enum": ["active", "inactive"],
      "description": "The status of the alert, must be one of: active or inactive"
    },
    "createdAt": {
      "type": "string",
      "format": "date-time"
    },
    "modifiedAt": {
      "type": "string",
      "format": "date-time"
    }
  },
  "required": ["_id", "title", "type", "status", "createdAt", "modifiedAt"],
  "additionalProperties": false
}

// Items ordered, goes in cartOrder schema
export const itemsOrderedSchema = {
  "type": "array",
  "description": "Each item contains the productId, productName, and finalPrice (the price of the item)",
  "items": {
    "type": "object",
    "properties": {
      "productId": {
        "type": "string"
      },
      "productName": {
        "type": "string"
      },
      "finalPrice": {
        "type": "number",
        "minimum": 0
      }
    },
    "required": ["productId", "productName", "finalPrice"],
    "additionalProperties": false
  }
};

export const cartOrderSchema = {
  $schema: "https://json-schema.org/draft/2020-12/schema",
  "title": "CartOrder",
  "type": "object",
  "properties": {
    "_id": {
      "type": "string",
      "minLength": 1,
      "description": "An id belonging to a specific user's cart/order, must not be blank"
    },
    "userId": {
      "type": "string",
      "minLength": 1,
      "description": "An id belonging to a specific user, must not be blank"
    },
    "quantity": {
      "type": "number",
      "minimum": 0,
      "description": "The amount of a specific item a user ordered"
    },
    "itemsOrdered": itemsOrderedSchema,
    "totalCost": {
      "type": "number",
      "minimum": 0,
      "description": "The total cost of all the items in the cart/order"
    },
    "orderDate": {
        "type": "string",
        "format": "date-time",
        "description": "The date and time the order was requested"
    }
  },
  "required": ["_id", "userId", "quantity", "totalCost"],
  "additionalProperties": false
};

export const cartSchema = {
  ...cartOrderSchema,
  "title": "Cart"
};

export const orderSchema = {
  ...cartOrderSchema,
  "title": "Order",
  "required": [...cartOrderSchema.required, "itemsOrdered", "orderDate"]
};