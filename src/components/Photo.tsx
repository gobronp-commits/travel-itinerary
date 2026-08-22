import type { Photo as PhotoType } from "@/lib/photos";

export default function Photo({
  photo,
  className = "",
}: {
  photo: PhotoType;
  className?: string;
}) {
  return (
    <figure className={`relative overflow-hidden ${className}`}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={photo.url}
        alt={photo.alt}
        className="w-full h-full object-cover"
        loading="lazy"
      />
      {photo.credit && (
        <a
          href={photo.creditUrl}
          target="_blank"
          rel="noreferrer"
          className="absolute bottom-1.5 right-1.5 rounded bg-black/50 px-1.5 py-0.5 text-[10px] text-white/90 hover:text-white hover:underline"
        >
          {photo.credit}
        </a>
      )}
    </figure>
  );
}
