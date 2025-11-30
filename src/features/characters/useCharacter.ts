import { apiClient } from "@/api/client";
import { useQuery } from "@tanstack/react-query";
import { characterSchema } from "./schema";
import type { AxiosError } from "axios";
import type { Character } from "./schema";

export const useCharacter = (id: number) => {
    const { data, isPending, error, isFetching } = useQuery<Character, AxiosError>({
        queryKey: ['character', id],
        queryFn: async () => {
            const response = await apiClient.get(`/characters/${id}`);
            return characterSchema.parse(response.data);
        },
    });

    return { data, isPending, error, isFetching };
}
