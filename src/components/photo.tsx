import Image from "next/image";
import type { GardenPhoto } from "@/data/images";

/**
 * A photo card with its required attribution.
 *
 * Every image on the site must go through this component so the credit line
 * and source link are always rendered (CC BY / BY-SA and Maps photographer
 * courtesy both require it).
 */
export function Photo({
  photo,
  priority = false,
  sizes = "100vw",
  aspect = "aspect-[4/3]",
  width = 1600,
  height = 1200,
  className = "",
  showCaption = true,
}: {
  photo: GardenPhoto;
  priority?: boolean;
  sizes?: string;
  aspect?: string;
  width?: number;
  height?: number;
  className?: string;
  showCaption?: boolean;
}) {
  return (
    <figure
      className={`overflow-hidden rounded-[2rem] border border-forest/10 bg-white shadow-card ${className}`}
    >
      <Image
        src={photo.src}
        alt={photo.alt}
        width={width}
        height={height}
        priority={priority}
        sizes={sizes}
        className={`${aspect} w-full object-cover`}
      />
      {showCaption && (
        <figcaption className="space-y-0.5 px-4 py-3">
          <p className="text-sm leading-snug text-charcoal">
            {photo.caption}
            {photo.standIn && (
              <span className="ml-1.5 whitespace-nowrap rounded-full bg-sun-soft px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-forest">
                sample photo
              </span>
            )}
          </p>
          <p className="text-[11px] leading-snug text-stone">
            <a
              href={photo.sourceUrl}
              target="_blank"
              rel="noreferrer"
              className="underline decoration-stone/40 underline-offset-2 hover:text-forest"
            >
              {photo.credit}
            </a>
          </p>
        </figcaption>
      )}
    </figure>
  );
}
