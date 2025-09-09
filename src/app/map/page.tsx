import { MapScreen } from './screens/map'
import { HeaderScreen } from './screens/header'

export default function MapPage() {
  return (
    <main className="page-container">
      <HeaderScreen />

      <MapScreen />
    </main>
  )
}
