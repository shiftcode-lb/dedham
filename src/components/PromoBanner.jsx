import { Link } from 'react-router-dom';

const MESSAGE = 'Limited Time Offer — 25% Off Your First Ride — Book Now';

// Repeated so the track is always wider than the viewport; the marquee
// animation shifts this track by exactly -50%, and since MarqueeTrack
// renders the identical sequence twice, that shift is invisible and the
// loop reads as continuous motion.
function MarqueeTrack() {
  return (
    <div
      className="flex shrink-0 items-center"
      aria-hidden="true"
    >
      {Array.from({ length: 4 }).map((_, i) => (
        <span
          key={i}
          className="mx-6 whitespace-nowrap text-[13px] max-[600px]:text-[12px] font-bold uppercase tracking-[0.06em]"
        >
          {MESSAGE}
        </span>
      ))}
    </div>
  );
}

export default function PromoBanner() {
  return (
    <Link
      to="/contact"
      aria-label={MESSAGE}
      className="relative z-[101] flex h-10 max-[600px]:h-9 items-center overflow-hidden bg-brown text-off-white"
    >
      <div className="flex w-max animate-marquee motion-reduce:animate-none">
        <MarqueeTrack />
        <MarqueeTrack />
      </div>
    </Link>
  );
}
