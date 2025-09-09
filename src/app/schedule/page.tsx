import { HeaderScreen } from './screens/header'
import { TimelineScreen } from './screens/timeline'

export default function SchedulePage() {
  return (
    <main className="page-container">
      <HeaderScreen />

      <TimelineScreen />
    </main>
  )
}
