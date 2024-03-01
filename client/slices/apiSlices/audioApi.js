import { api } from "./api";

export const audioApi = api.injectEndpoints({
  endpoints: (builder) => ({
    saveTranscript: builder.mutation({
      query: (data) => ({
        url: `/api/`,
        method: `POST`,
        body: data,
      }),
    }),
    getTranscript: builder.query({
      query: (id) => ({
        url: `/api/${id}`,
        method: `GET`,
      }),
    }),
    getAnalyse: builder.mutation({
      query: (data) => ({
        url: `api/analyze`,
        method: `POST`,
        body: data,
      })
    })
  }),
});

export const { useSaveTranscriptMutation, useGetTranscriptQuery, useGetAnalyseMutation } = audioApi;
