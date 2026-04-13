export default function Footer() {
  return (
    <footer className="mt-8 pl-8 Sw-full border-t border-orange-300 bg-orange-800 py-6 text-orange-50 md:py-8 font-sans">
      <div className="grid w-full gap-12 px-2 md:grid-cols-2 lg:px-3 xl:grid-cols-3">
        <div>
          <h3 className="font-sans text-lg text-orange-50">BPS Kabupaten Kuantan Singingi</h3>
          <p className="mt-2 text-sm text-orange-100/90">Dashboard Ekonomi Digital Kuantan Singingi menyajikan data statistik usaha digital yang akurat untuk kesuksesan pelaksanaan Sensus Ekonomi 2026.</p>
        </div>
        <div>
          <h4 className="text-sm font-semibold uppercase tracking-wider text-amber-100">Kontak</h4>
          <p className="mt-2 text-sm text-orange-100/90">Telp: (0760) 21190</p>
          <p className="text-sm text-orange-100/90">Email: bps1401@bps.go.id</p>
        </div>
        <div>
          <h4 className="text-sm font-semibold uppercase tracking-wider text-amber-100">Jam Layanan</h4>
          <p className="mt-2 text-sm text-orange-100/90">Senin - Kamis, 07.30 - 16.00 WIB</p>
          <p className="text-sm text-orange-100/90">Jumat, 07.30 - 16.30 WIB</p>
          <p className="mt-2 text-sm text-orange-100/90">© 2026 BPS Kabupaten Kuantan Singingi</p>
        </div>
      </div>
    </footer>
  )
}
