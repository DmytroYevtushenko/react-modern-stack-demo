import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiClient } from "@/api/client";
import { type Character } from "@/features/characters/schema";

type UpdateCharacterArgs = { id: number } & Partial<Character>;

export const useUpdateCharacter = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async ({ id, ...patch }: UpdateCharacterArgs) => {
            await apiClient.patch(`/characters/${id}`, patch);
        },

        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['characters']
            });
        }
    });
}