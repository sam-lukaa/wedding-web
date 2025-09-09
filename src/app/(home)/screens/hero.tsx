'use client'

import { DotLottieReact } from '@lottiefiles/dotlottie-react'

export const HeroScreen = () => {
  return (
    <section className="relative h-[80dvh] lg:h-[80dvh] bg-[#f8f6f2] max-lg:pt-8">
      {/* Pattern Background */}
      <div className="absolute inset-0 opacity-8 z-10">
        <div
          className="absolute inset-4 lg:rounded-[50%] overflow-hidden"
          style={{
            backgroundImage: `
              linear-gradient(90deg, #9C92AC 1px, transparent 1px),
              linear-gradient(0deg, #9C92AC 1px, transparent 1px)
            `,
            backgroundSize: '40px 40px',
          }}
        />
      </div>

      <h2 className="absolute text-5xl lg:text-[9rem] font-bold tracking-widest left-10 max-lg:top-1/5 from-primary to-primary/50 MonsieurLaDoulaise">
        James
      </h2>

      <h2 className="absolute text-5xl lg:text-[9rem] font-bold tracking-widest bottom-1/4 lg:bottom-20 right-10 lg:right-0 from-primary to-primary/50 MonsieurLaDoulaise">
        Kenny
      </h2>

      {/* love lottie */}
      <figure className="absolute bottom-0 left-0 h-screen">
        <DotLottieReact
          loop
          autoplay
          src="https://lottie.host/57f56baf-55f7-4c6c-95d2-11104c9e6280/YJClu206FE.lottie"
        />
      </figure>

      <DotLottieReact
        loop
        autoplay
        className="w-full lg:w-[80%] pt-40 lg:pt-10"
        src="https://lottie.host/8c306924-bfa2-4a14-86e1-cb834c8f94a8/W7wKvrbQZu.lottie"
      />

      <button className="absolute bottom-14 lg:bottom-0 right-1/3 h-20 lg:h-30">
        <DotLottieReact
          src="https://lottie.host/2ae2127c-d262-46b2-8826-00bbe5817abc/NbbUL4HN06.lottie"
          loop
          autoplay
        />
      </button>
    </section>
  )
}
