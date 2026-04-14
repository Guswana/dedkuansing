import KecamatanFilter from "./filters/kecamatan-filter"
import P421Filter from "./filters/p421-filter"
import P424Filter from "./filters/p424-filter"
import P425Filter from "./filters/p425-filter"
import P426Filter from "./filters/p426-filter"

export default function Sidebar() {
  return (
    <aside className="flex h-full flex-col border-r shadow-sm" style={{ borderColor: 'rgba(232, 129, 50, 0.3)', backgroundColor: '#E88132' }}>
      <div className="p-3">
        <div className="rounded-xl border bg-white/90 px-3 py-3 shadow-sm" style={{ borderColor: 'rgba(232, 129, 50, 0.4)' }}>
          <h2 className="font-sans text-lg font-black" style={{ color: '#E88132' }}>Filter Dashboard</h2>
          <p className="mt-1 text-xs text-neutral-700/85 font-sans">Atur kombinasi filter untuk melihat perubahan statistik usaha secara langsung.</p>
        </div>
      </div>

      <div className="flex-1 space-y-3 overflow-y-auto px-3 pb-3">
        <KecamatanFilter />
        <P421Filter />
        <P424Filter />
        <P425Filter />
        <P426Filter />
      </div>
    </aside>
  )
}
