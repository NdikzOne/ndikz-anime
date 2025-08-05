import AnimeList from './components/AnimeList'
import Navbar from './components/Navbar'
import SearchBar from './components/SearchBar'
import { Suspense } from 'react'

async function getData(tab: string) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/anime?tab=${tab}`)
  if (!res.ok) {
    throw new Error('Failed to fetch data')
  }
  return res.json()
}

export default async function Home({
  searchParams,
}: {
  searchParams?: { [key: string]: string | string[] | undefined }
}) {
  const tab = searchParams?.tab || 'update'
  const searchQuery = searchParams?.search as string | undefined

  const data = await getData(tab as string)

  return (
    <main className="min-h-screen">
      <Navbar />
      <div className="container mx-auto px-4">
        <Suspense fallback={<div>Loading...</div>}>
          <SearchBar initialValue={searchQuery || ''} />
          <AnimeList animes={data} tab={tab as string} searchQuery={searchQuery} />
        </Suspense>
      </div>
    </main>
  )
}