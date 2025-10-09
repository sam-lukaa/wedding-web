import Image from 'next/image';
import { seal } from '@/assets/images';

type EventCardProps = {
  index: string;
  img: string;
  date: string;
  description: string;
};

export const DatesScreen = () => {
  return (
    <main className='flex max-lg:flex-col justify-center w-full max-w-7xl lg:px-8 py-16 gap-8'>
      {/* Left: Save The Dates */}
      <section className='flex-1 flex flex-col justify-center'>
        <h1 className='text-[5rem] md:text-[9rem] font-light leading-[0.95] text-gray-700 mb-8 tracking-wide'>
          SAVE
          <br />
          THE
          <br />
          DATES
        </h1>

        <Image
          src={seal}
          alt='seal'
          width={100}
          height={100}
          className='mt-16 max-lg:absolute max-lg:right-10 max-lg:mb-4'
        />
      </section>

      {/* Right: Event Cards */}
      <section className='flex max-lg:flex-col justify-center gap-12 max-lg:gap-16'>
        {events.map((event, key) => (
          <EventCard key={key} {...event} />
        ))}
      </section>
    </main>
  );
};

const EventCard = ({ img, index, date, description }: EventCardProps) => (
  <article className='flex flex-col items-center relative'>
    <figure
      style={{ backgroundImage: `url(${img})` }}
      className='w-60 h-96 bg-gray-200 rounded-[100px] overflow-hidden flex items-center justify-center mb-4 shadow-lg relative bg-cover bg-center bg-no-repeat'
    >
      <div className="absolute inset-0 bg-black/30" />
      
      <figcaption
        className='absolute right-4 -bottom-10 text-[7rem] font-light text-gray-300/60 select-none pointer-events-none drop-shadow-md'
        style={{
          WebkitTextStroke: '1px #bdbdbd',
        }}
      >
        {index}
      </figcaption>
    </figure>

    <p className='text-sm text-gray-400 mb-1 mt-4 lg:mt-6'>{date}</p>

    <h6 className='text-lg tracking-wide'>{description}</h6>
  </article>
);

const events = [
  {
    index: '01',
    date: '7 OCT 2024',
    img: '/images/img-1.jpg',
    description: 'THE DAY WE MET',
  },
  {
    index: '02',
    date: '27 SEP 2025',
    img: '/images/img-2.jpg',
    description: 'STORIES OPENNING',
  },

  {
    index: '03',
    date: '11 OCT 2025',
    img: '/images/img-3.jpg',
    description: 'THE NEXT JOURNEY',
  },
];
