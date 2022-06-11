import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
const cryptoApiHeaders = {
  "X-RapidAPI-Key": "d3d0de49b2mshd1a340ad93dd23bp1e8f1djsn887b5e937ba0",
  "X-RapidAPI-Host": "coingecko.p.rapidapi.com",
};
// const baseUrl = "https://coingecko.p.rapidapi.com/";
const baseUrl = "https://api.coingecko.com/api/v3";
const createRequest = (url) => ({ url, headers: cryptoApiHeaders });
export const cryptoApi = createApi({
  reducerPath: "cryptoApi",
  baseQuery: fetchBaseQuery({ baseUrl }),
  endpoints: (builder) => ({
    getCryptos: builder.query({
      // query: (count) => createRequest(`/coins?limit=${count}`),
      query: (count) => createRequest('/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false'),
    }),
    getCryptoDetails: builder.query({
      query: (coinId) => createRequest(`/coins/${coinId}`),
    }),
  }),
});

export const { useGetCryptosQuery, useGetCryptoDetailsQuery } = cryptoApi;

// const options = {
//     method: 'GET',
//     url: 'https://coingecko.p.rapidapi.com/exchanges/%7Bid%7D',
//     headers: {
//       'X-RapidAPI-Key': 'd3d0de49b2mshd1a340ad93dd23bp1e8f1djsn887b5e937ba0',
//       'X-RapidAPI-Host': 'coingecko.p.rapidapi.com'
//     }
//   };
