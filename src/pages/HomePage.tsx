import { useEffect, useState } from "react";
import { useCharacters } from "@/features/characters/useCharacters";
import { useDebounce } from "@/hooks/useDebounce";
import { Link } from "react-router-dom";

const HomePage = () => {
    const [page, setPage] = useState(1);
    const [searchString, setSearchString] = useState('');
    const debouncedSearchString = useDebounce(searchString, 500);

    useEffect(() => {
        // TODO: oprimize on 1st load
        setPage(1);
    }, [debouncedSearchString]);

    const { data, isPending, error, isFetching } = useCharacters(page, debouncedSearchString);

    return (
        <div className="container mx-auto p-4 max-w-7xl">
            <div className="mb-12">
                <input
                    type="text"
                    placeholder="Search characters..."
                    value={searchString}
                    onChange={(e) => setSearchString(e.target.value)}
                    className="w-full p-4 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500"
                />
            </div>

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
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                        {data?.results.map((character) => (
                            <Link
                                to={`/character/${character.id}`}
                                key={character.id}
                                className="bg-gray-800 rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-700 hover:border-cyan-500/50 group cursor-pointer"
                            >
                                <div className="relative overflow-hidden">
                                    <img
                                        src={character.image}
                                        alt={character.name}
                                        className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-110"
                                    />
                                    <div className="absolute top-0 right-0 bg-black/60 text-white px-2 py-1 m-2 rounded text-xs font-bold uppercase tracking-wider backdrop-blur-sm">
                                        {character.status}
                                    </div>
                                </div>
                                <div className="p-5">
                                    <h2 className="text-xl font-bold mb-2 text-gray-100 group-hover:text-cyan-400 transition-colors">
                                        {character.name}
                                    </h2>
                                    <div className="flex items-center text-gray-400 text-sm">
                                        <span
                                            className={`w-2 h-2 rounded-full mr-2 ${character.status === "Alive"
                                                ? "bg-green-500"
                                                : character.status === "Dead"
                                                    ? "bg-red-500"
                                                    : "bg-gray-500"
                                                }`}
                                        ></span>
                                        {character.status}
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>

                    <div className="flex flex-col sm:flex-row justify-between items-center mt-12 gap-4 bg-gray-800/50 p-4 rounded-xl border border-gray-700/50">
                        <div className="text-gray-400 text-sm font-medium">
                            Showing <span className="text-white">{(page - 1) * 20 + 1}</span> - <span className="text-white">{Math.min(page * 20, data?.info.count || 0)}</span> of <span className="text-white">{data?.info.count}</span>
                        </div>

                        <div className="flex items-center gap-4">
                            <button
                                onClick={() => setPage((p) => Math.max(1, p - 1))}
                                disabled={page === 1 || isFetching}
                                className="px-6 py-2 bg-gray-800 hover:bg-gray-700 text-white rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition-colors border border-gray-700 font-medium hover:border-cyan-500/50"
                            >
                                Previous
                            </button>
                            <span className="text-gray-400 font-mono bg-gray-900 px-4 py-2 rounded-lg border border-gray-700 min-w-[3rem] text-center">
                                {page}
                            </span>
                            <button
                                onClick={() => setPage((p) => p + 1)}
                                disabled={isFetching || !data?.info.next}
                                className="px-6 py-2 bg-gray-800 hover:bg-gray-700 text-white rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition-colors border border-gray-700 font-medium hover:border-cyan-500/50"
                            >
                                Next
                            </button>
                        </div>
                    </div>
                    {isFetching && !isPending && (
                        <div className="fixed bottom-4 right-4 bg-cyan-600 text-white px-4 py-2 rounded-full shadow-lg animate-pulse">
                            Fetching updates...
                        </div>
                    )}
                </>
            )}
        </div>
    );
}

export default HomePage
