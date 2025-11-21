import { useState } from "react";
import { useCharacters } from "./useCharacters";
function App() {
  const [page, setPage] = useState(1);

  const { data, isPending, error, isFetching } = useCharacters(page);

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8 font-sans">
      <div className="max-w-7xl mx-auto">
        <header className="mb-12 text-center">
          <h1 className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500 mb-4">
            Rick and Morty Browser
          </h1>
          <p className="text-gray-400 text-lg">Explore the multiverse of characters</p>
        </header>

        {isPending ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-cyan-500"></div>
          </div>
        ) : error ? (
          <div className="text-center text-red-500 bg-red-900/20 p-4 rounded-lg border border-red-500/50">
            Error: {error.message}
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {data?.results.map((character) => (
                <div
                  key={character.id}
                  className="bg-gray-800 rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-700 hover:border-cyan-500/50 group"
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
                </div>
              ))}
            </div>

            <div className="flex justify-center items-center mt-12 gap-4">
              <button
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={page === 1 || isFetching}
                className="px-6 py-2 bg-gray-800 hover:bg-gray-700 text-white rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition-colors border border-gray-700 font-medium"
              >
                Previous
              </button>
              <span className="text-gray-400 font-mono bg-gray-800 px-4 py-2 rounded-lg border border-gray-700">
                Page {page}
              </span>
              <button
                onClick={() => setPage((p) => p + 1)}
                disabled={isFetching}
                className="px-6 py-2 bg-gray-800 hover:bg-gray-700 text-white rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition-colors border border-gray-700 font-medium"
              >
                Next
              </button>
            </div>
            {isFetching && !isPending && (
              <div className="fixed bottom-4 right-4 bg-cyan-600 text-white px-4 py-2 rounded-full shadow-lg animate-pulse">
                Fetching updates...
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default App
