import { Mansory } from '@/components/UI/mansory'

export default function AlbumPage() {
  return (
    <main className="page-container">
      <header className="page-header">
        <h1 className="page-title">PHOTOS ALBUM</h1>

        <p className="page-description">
          Our precious moments captured in time
        </p>
      </header>

      <Mansory />
    </main>
  )
}
