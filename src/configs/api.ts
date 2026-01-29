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

// export const apiUberich = axios.create({
//   baseURL: "https://evolution.bigdates.com.br:3300",
//   headers: {
//     "Content-Type": "application/json",
//     "x-flowise-token":
//       "ff52c550a19a84ce0de929b75874ef8bbd503eeffdaeb324cdb7da0c7f4cd819cfb760c07b0e2578197fc3934c13df24",
//   },
// });
