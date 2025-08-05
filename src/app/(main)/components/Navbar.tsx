import Link from 'next/link'

export default function Navbar() {
  return (
    <nav className="bg-blue-600 text-white shadow-lg">
      <div className="container mx-auto px-4 py-3">
        <div className="flex justify-between items-center">
          <Link href="/" className="text-xl font-bold">
            OtakuDesu
          </Link>
          <div className="hidden md:flex space-x-6">
            <Link href="/" className="hover:text-blue-200">
              Home
            </Link>
            <a href="https://otakudesu.cloud" target="_blank" rel="noopener noreferrer" className="hover:text-blue-200">
              Source
            </a>
          </div>
        </div>
      </div>
    </nav>
  )
}