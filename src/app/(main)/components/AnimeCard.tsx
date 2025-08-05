import Link from 'next/link'
import { Anime } from '@/types/anime'

export default function AnimeCard({ anime }: { anime: Anime }) {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
      <Link href={anime.url} target="_blank" rel="noopener noreferrer">
        <img
          src={anime.image}
          alt={anime.title}
          className="w-full h-48 object-cover"
          onError={(e) => {
            (e.target as HTMLImageElement).src = '/placeholder.jpg'
          }}
        />
        <div className="p-4">
          <h3 className="font-semibold text-lg mb-2 line-clamp-2">{anime.title}</h3>
          {anime.episode && (
            <p className="text-sm text-gray-600">Episode: {anime.episode}</p>
          )}
          {anime.day && (
            <p className="text-sm text-gray-600">Hari: {anime.day}</p>
          )}
        </div>
      </Link>
    </div>
  )
}