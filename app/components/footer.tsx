export default function Footer() {
  return (
    <footer className="mt-8 pl-8 w-full border-t border-primary/30 bg-background py-6 md:py-8 font-sans">
      <div className="grid w-full gap-12 px-2 md:grid-cols-2 lg:px-3 xl:grid-cols-3">
        <div>
          <h3 className="font-sans text-lg text-primary">BPS Kabupaten Kuantan Singingi</h3>
          <p className="mt-2 text-sm text-foreground">Dashboard Ekonomi Digital Kuantan Singingi menyajikan data statistik usaha digital yang akurat untuk kesuksesan pelaksanaan Sensus Ekonomi 2026.</p>
        </div>
        <div>
          <h4 className="text-sm font-semibold uppercase tracking-wider text-primary">Kontak</h4>
          <p className="mt-2 text-sm text-foreground">Telp: (0760) 21190</p>
          <p className="text-sm text-foreground">Email: bps1401@bps.go.id</p>
        </div>
        <div>
          <h4 className="text-sm font-semibold uppercase tracking-wider text-primary">Jam Layanan</h4>
          <p className="mt-2 text-sm text-foreground">Senin - Kamis, 07.30 - 16.00 WIB</p>
          <p className="text-sm text-foreground">Jumat, 07.30 - 16.30 WIB</p>
          <p className="mt-2 text-sm text-foreground">© 2026 BPS Kabupaten Kuantan Singingi</p>
        </div>
      </div>
    </footer>
  )
}
