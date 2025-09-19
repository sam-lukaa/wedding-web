'use client'

import { useEffect, useState } from 'react'

export const CountdownScreen = () => {
  const [countdown, setCountdown] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  })

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date()
      const target = new Date('2025-10-11')
      const diff = target.getTime() - now.getTime()

      setCountdown({
        days: Math.floor(diff / (1000 * 60 * 60 * 24)),
        hours: Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((diff % (1000 * 60)) / 1000),
      })
    }, 1000)

    return () => clearInterval(interval)
  }, [])

  return (
    <section className="w-full flex flex-col items-center mt-20 mb-20 space-y-20">
      <p className="text-lg md:text-2xl tracking-widest uppercase font-bold">
        Countdown to Our wedding
      </p>

      <main className="grid grid-cols-2 gap-10 lg:gap-16 gap-y-16 lg:gap-y-28">
        {/* Days */}
        <article className="flex flex-col items-center">
          <h3 className="text-9xl md:text-[9rem] font-bold tracking-widest">
            {countdown.days}
          </h3>

          <span className="mt-1 text-xs md:text-sm uppercase tracking-widest text-gray-400">
            Days
          </span>
        </article>

        {/* Hours */}
        <article className="flex flex-col items-center">
          <span className="text-6xl md:text-7xl font-extralight tracking-widest text-gray-700">
            {countdown.hours}
          </span>

          <span className="mt-1 text-xs md:text-sm uppercase tracking-widest text-gray-400">
            Hours
          </span>
        </article>

        {/* Minutes */}
        <article className="flex flex-col items-center">
          <span className="text-6xl md:text-7xl font-extralight tracking-widest text-gray-700">
            {countdown.minutes}
          </span>

          <span className="mt-1 text-xs md:text-sm uppercase tracking-widest text-gray-400">
            Minutes
          </span>
        </article>

        {/* Seconds */}
        <article className="flex flex-col items-center">
          <h3 className="text-9xl md:text-[9rem] font-bold tracking-widest">
            {countdown.seconds}
          </h3>

          <span className="mt-1 text-xs md:text-sm uppercase tracking-widest text-gray-400">
            Seconds
          </span>
        </article>
      </main>
    </section>
  )
}
