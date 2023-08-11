import { Header } from '@/components/layout/header'
import { Navigation } from '@/components/layout/navigation'

import { Player } from '@/components/client/react-player'

export default function Home() {
  return (
    <>
      <div className="h-screen bg-zinc-950 text-zinc-50 flex justify-center items-center">
        <div className="flex w-[1100px] flex-col gap-6">
          <Header />

          <main className="relative flex overflow-hidden rounded-lg border border-zinc-800 bg-zinc-900 shadow pr-80">
            <div className="flex-1">
              <Player playing width="100%" height="100%" controls />
            </div>

            <Navigation />
          </main>
        </div>
      </div>
    </>
  )
}
