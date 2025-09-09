import { HeroScreen } from './(home)/screens/hero'
import { DatesScreen } from './(home)/screens/dates'
import { UploadScreen } from './(home)/screens/upload'
import { CountdownScreen } from './(home)/screens/countdown'

export default function HomePage() {
  return (
    <main className="page-container">
      <HeroScreen />

      <DatesScreen />

      <CountdownScreen />

      <UploadScreen />
    </main>
  )
}
