export const UNSPLASH_BASE_URL = "https://api.unsplash.com/search/photos";

export const UNSPLASH_DEFAULTS = {
  query: "teaching",
  defaultPages: 1,
  defaultPerPage: 10,
  maxPages: 10,
  maxPerPage: 30,
};

export enum Role {
  USER,
  ADMIN,
}

export enum PurchaseStatus {
  SUCCESS,
  FAILED,
  REFUNDED,
}
