import { HeroScreen } from './screens/hero'
import { DatesScreen } from './screens/dates'
import { UploadScreen } from './screens/upload'
import { CountdownScreen } from './screens/countdown'

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
