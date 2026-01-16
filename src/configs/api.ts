import axios from "axios";

export const api = axios.create({
  baseURL: "https://webscrap.bigdates.com.br:3620",
  headers: {
    "Content-Type": "application/json",
  },
});

export const apiProducts = axios.create({
  baseURL: "https://webscrap.bigdates.com.br:3660",
  headers: {
    "Content-Type": "application/json",
  },
});

export const apiPurchase = axios.create({
  baseURL: "https://evolution.bigdates.com.br:3620",
  headers: {
    "Content-Type": "application/json",
  },
});
