export default function Footer() {
  return (
    <footer className="mt-8 pl-8 w-full border-t py-6 md:py-8 font-sans" style={{ borderColor: 'rgba(232, 129, 50, 0.3)', backgroundColor: '#F9F4EE' }}>
      <div className="grid w-full gap-12 px-2 md:grid-cols-2 lg:px-3 xl:grid-cols-3">
        <div>
          <h3 className="font-sans text-lg" style={{ color: '#E88132' }}>BPS Kabupaten Kuantan Singingi</h3>
          <p className="mt-2 text-sm" style={{ color: '#333333' }}>Dashboard Ekonomi Digital Kuantan Singingi menyajikan data statistik usaha digital yang akurat untuk kesuksesan pelaksanaan Sensus Ekonomi 2026.</p>
        </div>
        <div>
          <h4 className="text-sm font-semibold uppercase tracking-wider" style={{ color: '#E88132' }}>Kontak</h4>
          <p className="mt-2 text-sm" style={{ color: '#333333' }}>Telp: (0760) 21190</p>
          <p className="text-sm" style={{ color: '#333333' }}>Email: bps1401@bps.go.id</p>
        </div>
        <div>
          <h4 className="text-sm font-semibold uppercase tracking-wider" style={{ color: '#E88132' }}>Jam Layanan</h4>
          <p className="mt-2 text-sm" style={{ color: '#333333' }}>Senin - Kamis, 07.30 - 16.00 WIB</p>
          <p className="text-sm" style={{ color: '#333333' }}>Jumat, 07.30 - 16.30 WIB</p>
          <p className="mt-2 text-sm" style={{ color: '#333333' }}>© 2026 BPS Kabupaten Kuantan Singingi</p>
        </div>
      </div>
    </footer>
  )
}
