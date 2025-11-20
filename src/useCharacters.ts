import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { apiResponseSchema } from "./schema";

export const useCharacters = (page: number) => {
    const { isPending, error, data, isFetching } = useQuery({
        queryKey: ['characters', page],
        queryFn: async () => {
            const response = await axios.get(`https://rickandmortyapi.com/api/character?page=${page}`).then(res => res.data);
            return apiResponseSchema.parse(response);
        }
    });

    return { isPending, error, data, isFetching };
}