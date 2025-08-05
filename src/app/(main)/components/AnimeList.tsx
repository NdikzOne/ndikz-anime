import { Anime } from '@/types/anime'
import AnimeCard from './AnimeCard'

export default function AnimeList({
  animes,
  tab,
  searchQuery,
}: {
  animes: Anime[]
  tab: string
  searchQuery?: string
}) {
  const filteredAnimes = searchQuery
    ? animes.filter((anime) =>
        anime.title.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : animes

  if (filteredAnimes.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-500">Tidak ada anime yang ditemukan.</p>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-6">
      <h2 className="text-2xl font-bold mb-6 capitalize">{tab.replace('-', ' ')}</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {filteredAnimes.map((anime, index) => (
          <AnimeCard key={index} anime={anime} />
        ))}
      </div>
    </div>
  )
}