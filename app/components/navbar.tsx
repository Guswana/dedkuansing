import Image from "next/image"
import { withBasePath } from "@/lib/utils/base-path"

export default function Navbar() {
  return (
    <nav className="sticky top-0 left-0 z-50 w-full border-b border-orange-300 bg-orange-700">
      <div className="flex h-20 items-center justify-between px-4 md:px-6">
        <div className="flex items-center gap-3">
          <label
            htmlFor="app-sidebar-toggle"
            className="inline-flex h-10 w-14 items-center justify-center rounded-lg border border-orange-200/60 bg-orange-500/40 transition hover:bg-orange-500/60"
            aria-label="Toggle sidebar"
          >
            <Image
              src={withBasePath("/images/logo.png")}
              alt="Toggle sidebar"
              width={60}
              height={60}
              className="rounded-sm bg-white/90"
            />
          </label>

          <div className="hidden text-orange-50 md:block">
            <div className="font-[family-name:var(--font-heading)] text-base font-bold italic uppercase leading-tight">
              Badan Pusat Statistik
            </div>
            <div className="font-[family-name:var(--font-heading)] text-base font-bold italic uppercase leading-tight text-orange-50">
              Kabupaten Kuantan Singingi
            </div>
          </div>
        </div>

        <div className="px-3 text-center text-orange-50">
          <div className="font-[family-name:var(--font-heading)] text-base font-black uppercase tracking-wide md:text-4xl">
            DEDIKASI
          </div>
        </div>

        <div className="flex items-center gap-2 text-orange-50">
          <div className="hidden rounded-lg border border-orange-200/50 bg-orange-500/40 px-3 py-1.5 text-xs md:block">
            Statistik Berkualitas
          </div>
          <div className="flex h-8 w-8 items-center justify-center rounded-full border border-orange-200/60 bg-orange-500/50 text-xs font-semibold">
            ID
          </div>
        </div>
      </div>
    </nav>
  )
}
