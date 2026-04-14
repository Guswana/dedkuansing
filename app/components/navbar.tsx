import Image from "next/image"
import { withBasePath } from "@/lib/utils/base-path"

export default function Navbar() {
  return (
    <nav className="sticky top-0 left-0 z-50 w-full border-b border-primary/30 bg-background shadow-sm">
      <div className="flex h-20 items-center justify-between px-4 md:px-6">
        <div className="flex items-center gap-3">
          <label
            htmlFor="app-sidebar-toggle"
            className="inline-flex h-10 w-14 items-center justify-center rounded-lg transition hover:bg-primary-100"
            aria-label="Toggle sidebar"
          >
            <Image
              src={withBasePath("/images/logo bps.png")}
              alt="Toggle sidebar"
              width={60}
              height={60}
              className="rounded-sm"
            />
          </label>

          <div className="hidden md:block">
            <div className="font-[family-name:Arial] text-base font-bold italic uppercase leading-tight text-accent">
              Badan Pusat Statistik
            </div>
            <div className="font-[family-name:Arial] text-base font-bold italic uppercase leading-tight text-accent">
              Kabupaten Kuantan Singingi
            </div>
          </div>
        </div>

        <div className="px-3 text-center">
          <div className="font-sans text-base font-black uppercase tracking-wide md:text-4xl text-primary">
            DEDIKASI
          </div>
        </div>

        <div className="flex items-center gap-2 text-neutral-700">
          <div className="hidden rounded-lg border border-primary/40 bg-primary/10 px-3 py-1.5 text-xs md:block font-sans">
            Statistik Berkualitas
          </div>
          <div className="flex h-8 w-8 items-center justify-center rounded-full border border-primary/40 bg-primary/10 text-xs font-semibold">
            ID
          </div>
        </div>
      </div>
    </nav>
  )
}
