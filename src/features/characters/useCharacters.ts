import { apiClient } from "@/api/client";
import { useQuery } from "@tanstack/react-query";
import type { AxiosError } from "axios";
import { apiResponseSchema, type ApiResponse } from "./schema";


export const useCharacters = (page: number, name: string) => {
    const { isPending, error, data, isFetching } = useQuery<ApiResponse, AxiosError>({
        queryKey: ['characters', page, name],
        queryFn: async () => {
            const response = await apiClient.get('/characters', {
                params: {
                    page,
                    name: name?.length > 0 ? name : undefined
                }
            });

            const rawData = response.data;

            const adaptedResponse = {
                results: Array.isArray(rawData) ? rawData : rawData.data || [],
                info: {
                    count: response.headers['x-total-count'] ? parseInt(response.headers['x-total-count']) : 0,
                    pages: 0, // TODO: should be fixed
                    next: null,
                    prev: null
                }
            };

            return apiResponseSchema.parse(adaptedResponse);
        },
        retry: false
    });

    return { isPending, error, data, isFetching };
}