import { useQuery } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import { apiResponseSchema, type ApiResponse } from "./schema";


export const useCharacters = (page: number, name: string) => {
    const { isPending, error, data, isFetching } = useQuery<ApiResponse, AxiosError>({
        queryKey: ['characters', page, name],
        queryFn: async () => {
            const response = await axios.get('https://rickandmortyapi.com/api/character', {
                params: {
                    page,
                    name: name?.length > 0 ? name : undefined
                }
            }).then(res => res.data);
            return apiResponseSchema.parse(response);
        }
    });

    return { isPending, error, data, isFetching };
}