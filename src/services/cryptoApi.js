import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
const cryptoApiHeaders = {
  "X-RapidAPI-Key": "d3d0de49b2mshd1a340ad93dd23bp1e8f1djsn887b5e937ba0",
  "X-RapidAPI-Host": "coingecko.p.rapidapi.com",
};
const baseUrl = "https://coingecko.p.rapidapi.com/";

const createRequest = (url) => ({ url, headers: cryptoApiHeaders})

export const cryptoApi = createApi({
  reducerPath: "cryptoApi",
  baseQuery: fetchBaseQuery({ baseUrl }),
  endpoints: (builder) => ({
      getCryptos: builder.query({
          query: () => createRequest('/global')
      })
  })
});

export const {
    useGetCryptosQuery,
} = cryptoApi;

// const options = {
//     method: 'GET',
//     url: 'https://coingecko.p.rapidapi.com/exchanges/%7Bid%7D',
//     headers: {
//       'X-RapidAPI-Key': 'd3d0de49b2mshd1a340ad93dd23bp1e8f1djsn887b5e937ba0',
//       'X-RapidAPI-Host': 'coingecko.p.rapidapi.com'
//     }
//   };
