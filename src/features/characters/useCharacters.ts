import { apiClient } from "@/api/client";
import { useQuery } from "@tanstack/react-query";
import type { AxiosError } from "axios";
import { apiResponseSchema, type ApiResponse } from "./schema";


export const useCharacters = (page: number, name: string) => {
    const { isPending, error, data, isFetching } = useQuery<ApiResponse, AxiosError>({
        queryKey: ['characters', page, name],
        queryFn: async () => {
            const perPage = 20;
            const response = await apiClient.get('/characters', {
                params: {
                    _page: page,
                    _limit: perPage,
                    name: name?.length > 0 ? name : undefined
                }
            });

            const rawData = response.data;
            const totalCount = response.headers['x-total-count']
                ? parseInt(response.headers['x-total-count'])
                : 0;

            const totalPages = Math.ceil(totalCount / perPage);
            const hasNext = page < totalPages;
            const hasPrev = page > 1;
            const adaptedResponse = {
                results: Array.isArray(rawData) ? rawData : rawData.data || [],
                info: {
                    count: totalCount,
                    pages: Math.ceil(totalCount / perPage),
                    next: hasNext ? `?page=${page + 1}` : null,
                    prev: hasPrev ? `?page=${page - 1}` : null
                }
            };

            return apiResponseSchema.parse(adaptedResponse);
        },
        retry: false
    });

    return { isPending, error, data, isFetching };
}