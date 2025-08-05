import { NextResponse } from 'next/server'
import axios from 'axios'
import cheerio from 'cheerio'
import { Anime } from '@/types/anime'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const tab = searchParams.get('tab') || 'update'

  try {
    let url = ''
    let selector = ''
    let animes: Anime[] = []

    switch (tab) {
      case 'update':
        url = 'https://otakudesu.cloud/'
        selector = '.venz ul li'
        break
      case 'jadwal':
        url = 'https://otakudesu.cloud/jadwal-rilis/'
        selector = '.kgjdwl321 .kglist321'
        break
      case 'complete':
        url = 'https://otakudesu.cloud/complete-anime/'
        selector = '.venz ul li'
        break
      default:
        url = 'https://otakudesu.cloud/'
        selector = '.venz ul li'
    }

    const { data } = await axios.get(url)
    const $ = cheerio.load(data)

    if (tab === 'jadwal') {
      $(selector).each((_, element) => {
        const day = $(element).find('h2').text().trim()
        $(element)
          .find('ul li')
          .each((_, el) => {
            const title = $(el).find('a').text().trim()
            const url = $(el).find('a').attr('href') || ''
            animes.push({
              title,
              url,
              image: '/placeholder.jpg',
              day,
            })
          })
      })
    } else {
      $(selector).each((_, element) => {
        const title = $(element).find('.thumb a').attr('title') || $(element).find('.thumb a').text().trim()
        const url = $(element).find('.thumb a').attr('href') || ''
        const image = $(element).find('.thumb a img').attr('src') || '/placeholder.jpg'
        const episode = $(element).find('.epz').text().trim()

        animes.push({
          title,
          url,
          image,
          episode,
        })
      })
    }

    return NextResponse.json(animes)
  } catch (error) {
    console.error('Scraping error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch data' },
      { status: 500 }
    )
  }
}