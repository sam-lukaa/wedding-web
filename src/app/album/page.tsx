'use client'

import { Mansory } from '@/components/UI/mansory'
import { useGetUploads } from '../shared/services'

export default function AlbumPage() {
  const { data } = useGetUploads()

  console.log('uploaded data: ', data)

  return (
    <main className="page-container">
      <header className="page-header">
        <h1 className="page-title">PHOTOS ALBUM</h1>

        <p className="page-description">
          Our precious moments captured in time
        </p>
      </header>

      <Mansory data={data} />
    </main>
  )
}
