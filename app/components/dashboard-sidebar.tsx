import P421Filter from "./filters/p421-filter"
import P424Filter from "./filters/p424-filter"
import P425Filter from "./filters/p425-filter"
import P426Filter from "./filters/p426-filter"

export default function DashboardSidebar() {
  return (
    <aside className="flex h-full flex-col border-r border-orange-300/80 bg-gradient-to-b from-orange-100 to-orange-50">
      <div className="p-3">
        <div className="rounded-xl border border-orange-300 bg-orange-200/70 px-3 py-3">
          <h2 className="font-[family-name:var(--font-heading)] text-lg font-black text-orange-900">Filter Dashboard</h2>
          <p className="mt-1 text-xs text-orange-800/85">Atur kombinasi filter untuk melihat perubahan statistik usaha secara langsung.</p>
        </div>
      </div>

      <div className="flex-1 space-y-3 overflow-y-auto px-3 pb-3">
        <P421Filter />
        <P424Filter />
        <P425Filter />
        <P426Filter />
      </div>
    </aside>
  )
}
