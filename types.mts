// Product
export interface Review {
  /** Unique identifier for the review, referenced by the product's reviews array */
  _id: string;
  /** The _id of the product this review is about */
  productId: string;
  reviewTitle: string;
  /** 10 to 1000 characters */
  reviewText: string;
}

export interface Product {
  /** Unique identifier for the product */
  _id: string;
  /** What the store product is called */
  name: string;
  /** A short paragraph explaining what the object is (500 characters maximum) */
  description: string;
  price: number;
  /** References (IDs) to related Review documents */
  reviews?: string[];
  /** A URL link to a locally stored image file */
  images: string;
}

// User
export interface CartItem {
  productId: string;
  productName: string;
  /** The price of the item */
  finalPrice: number;
}

export interface User {
  /** Unique identifier for the user */
  _id: string;
  /** Username associated with the user account, chosen at account creation, may be used to log in */
  username: string;
  /** Email associated with the user account, may be used to log in */
  email: string;
  /** Authentication to make sure the user is who they say they are (store a hash, never plain text) */
  password: string;
  /** Each item contains the productId, productName, and finalPrice */
  cart: CartItem[];
  /** The address the user provided to ship the order to */
  shippingAddress: string;
}

// Alert
export interface Alert {
  _id: string;
  /** The title of the alert, must not be blank */
  title: string;
  /** The type of the alert, must be one of: warning, info, promotion */
  type: "warning" | "info" | "promotion";
  /** The status of the alert, must be one of: active or inactive */
  status: "active" | "inactive";
  createdAt: Date;
  modifiedAt: Date;
}

// Cart & Order
export interface ItemOrdered {
  productId: string;
  productName: string;
  /** The price of the item */
  finalPrice: number;
}

interface CartOrderBase {
  /** An id belonging to a specific user's cart/order, must not be blank */
  _id: string;
  /** An id belonging to a specific user, must not be blank */
  userId: string;
  /** The amount of a specific item a user ordered */
  quantity: number;
  /** The total cost of all the items in the cart/order (the cost of each item added up) */
  totalCost: number;
}

export interface Cart extends CartOrderBase {
  /** Optional for a cart */
  itemsOrdered?: ItemOrdered[];
}

export interface Order extends CartOrderBase {
  /** Required for an order */
  itemsOrdered: ItemOrdered[];
}