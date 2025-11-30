import { Link, useParams } from "react-router-dom";
import { useCharacter } from "@/features/characters/useCharacter";
import { useEffect, useState } from "react";
import type { Character } from "@/features/characters/schema";
import { useUpdateCharacter } from "@/features/characters/useUpdateCharacter";

const CharacterPage = () => {
    const { id } = useParams<{ id: string }>();
    const { data, isPending, error, isFetching } = useCharacter(Number(id));
    const [character, setCharacter] = useState<Character | null>(null);
    const { mutate, isPending: isUpdating } = useUpdateCharacter();

    useEffect(() => {
        if (data) {
            setCharacter(data);
        }
    }, [data]);

    return (
        <div className="container mx-auto p-4 max-w-2xl">
            <Link to="/" className="text-gray-400 hover:text-white mb-4 inline-block">
                &larr; Back to list
            </Link>

            <div className="bg-gray-800 p-8 rounded-xl border border-gray-700">
                <h1 className="text-3xl font-bold text-white mb-4">
                    Editing Character #{id}
                </h1>
                <div className="text-gray-400">
                    {isPending ? (
                        <div className="flex justify-center items-center h-64">
                            <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-cyan-500"></div>
                        </div>
                    ) : error && error.response?.status === 404 ? (
                        <div className="text-center text-gray-500 bg-gray-900/20 p-4 rounded-lg border border-gray-500/50">
                            No records
                        </div>
                    ) : error ? (
                        <div className="text-center text-red-500 bg-red-900/20 p-4 rounded-lg border border-red-500/50">
                            Error: {error.message}
                        </div>
                    ) : (
                        <>
                            <input
                                type="text"
                                value={character?.name || ''}
                                onChange={(e) => character && setCharacter({ ...character, name: e.target.value })}
                                className="w-full p-2 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500"
                            />
                            <button
                                disabled={isUpdating}
                                onClick={() => mutate({ id: Number(id), name: character?.name || '' })}
                                className="mt-4 bg-cyan-500 text-white px-4 py-2 rounded-lg hover:bg-cyan-600"
                            >
                                Update
                            </button>
                        </>
                    )}
                </div>
            </div>
            {isFetching && !isPending && (
                <div className="fixed bottom-4 right-4 bg-cyan-600 text-white px-4 py-2 rounded-full shadow-lg animate-pulse">
                    Fetching updates...
                </div>
            )}
        </div>
    );
};

export default CharacterPage;