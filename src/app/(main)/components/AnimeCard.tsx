import Link from 'next/link'
import { Anime } from '@/types/anime'

export default function AnimeCard({ anime }: { anime: Anime }) {
  const placeholderImage = 'https://raw.githubusercontent.com/NdikzDatabase/Database/main/Database/1754394396624-k6s68p.jpg'
  
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
      <Link href={anime.url} target="_blank" rel="noopener noreferrer">
        <div className="w-full h-48 relative">
          <img
            src={anime.image || placeholderImage}
            alt={anime.title}
            className="w-full h-full object-cover"
            onError={(e) => {
              const target = e.target as HTMLImageElement
              target.onerror = null
              target.src = placeholderImage
            }}
          />
        </div>
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
