import Image from "next/image"

type Props = {
  title: string
  date: string
  image: string
  sectorLabel?: string
}

export default function Card({ title, date, image, sectorLabel }: Props) {
  return (
    <article className="group flex gap-4 rounded-2xl border border-orange-200 bg-orange-50/95 p-4 shadow-lg shadow-orange-200/60 transition-all duration-300 hover:-translate-y-0.5 hover:border-orange-400 hover:bg-orange-100/90">
      <div className="relative h-24 w-24 flex-shrink-0 overflow-hidden rounded-xl border border-orange-200 md:h-28 md:w-28">
        <Image
          src={image}
          alt="img"
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>

      <div className="flex flex-1 flex-col">
        {sectorLabel ? (
          <p className="mb-1 text-[11px] font-semibold uppercase tracking-wide text-orange-700">{sectorLabel}</p>
        ) : null}
        <p className="text-xs font-medium uppercase tracking-wide text-orange-700">{date}</p>
        <h3 className="mt-2 font-[family-name:var(--font-heading)] text-base font-bold leading-snug text-stone-800 md:text-lg">
          {title}
        </h3>
        <p className="mt-3 text-sm font-semibold text-orange-600">Baca ringkasan</p>
      </div>
    </article>
  )
}
