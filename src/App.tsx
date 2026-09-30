import { useState, useEffect, useRef } from 'react'

// ─── Data ───────────────────────────────────────────────────────────────────

const NAV_LINKS = [
  { label: 'About', href: '#about' },
  { label: 'Products', href: '#products' },
  { label: 'Services', href: '#services' },
  { label: 'Projects', href: '#projects' },
  { label: 'Factory', href: '#factory' },
  { label: 'Showrooms', href: '#showrooms' },
]

const STATS = [
  { value: '2002', label: 'Year Founded', suffix: '' },
  { value: '5', label: 'Business Entities', suffix: '+' },
  { value: '5000', label: 'Satisfied Clients', suffix: '+' },
  { value: '160', label: 'Employees', suffix: '+' },
  { value: '14137', label: 'm² Factory Land', suffix: '' },
  { value: '40', label: 'Wood Grain Patterns', suffix: '+' },
]

const PRODUCTS = [
  {
    title: 'Premium Kitchens',
    desc: 'Fully customised designs with super-durable powder-coated or wooden finishes, premium marble and quartz surfaces, and top-quality fittings.',
    img: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=700&h=500&fit=crop&auto=format',
    tag: 'Residential & Commercial',
  },
  {
    title: 'Doors & Windows',
    desc: 'High-grade aluminium alloy frames with feather-touch closing and soundproofing. Models: Classic, DH-45, DP-45, DH-85, DP-85, DP-115, HPL.',
    img: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=700&h=500&fit=crop&auto=format',
    tag: 'All Models Available',
  },
  {
    title: 'Interiors & Wardrobes',
    desc: 'Tailor-made wash counters, wardrobes and interior solutions combining quality materials, premium mirrors, and integrated illumination.',
    img: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=700&h=500&fit=crop&auto=format',
    tag: 'Bespoke Design',
  },
  {
    title: 'Pergolas & Gates',
    desc: 'Custom aluminium pergolas and automatic or manual swing and sliding gates. Super-durable finishes in a wide range of colours.',
    img: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=700&h=500&fit=crop&auto=format',
    tag: 'Outdoor Solutions',
  },
  {
    title: 'Powder Coating',
    desc: 'Over 40 wood grain patterns and colour combinations. QUALICOAT-certified automatic powder application and chemical pre-treatment.',
    img: 'https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=700&h=500&fit=crop&auto=format',
    tag: 'QUALICOAT Certified',
  },
]

const STRENGTHS = [
  { icon: '◈', title: 'Custom Design', desc: 'Bespoke solutions built to the client\'s exact vision — no compromise.' },
  { icon: '◆', title: 'Premium Quality', desc: 'Precision engineering with high-grade aluminium alloys built to last.' },
  { icon: '◉', title: 'One-Stop Solution', desc: 'Design, manufacturing, installation, and after-sales under one roof.' },
  { icon: '◇', title: 'Affordable Luxury', desc: 'Elegant yet cost-effective designs that add real value to your space.' },
  { icon: '○', title: 'Sustainability', desc: 'Eco-conscious materials and processes aligned with the UAE\'s green future.' },
  { icon: '▣', title: 'ISO Certified', desc: 'ISO 9001, 14001, 45001 and QUALICOAT — proven quality at every stage.' },
]

const SERVICES = [
  {
    num: '01',
    title: 'In-House Manufacturing',
    desc: 'Complete production control for unmatched consistency, flexibility, and on-time delivery — no third-party dependence.',
  },
  {
    num: '02',
    title: 'Custom Design & Engineering',
    desc: 'Our design team translates your vision into precise technical drawings, balancing creativity with structural integrity.',
  },
  {
    num: '03',
    title: 'Professional Installation',
    desc: 'Skilled technicians handle every fitting — seamless integration, expert finishing, and dedicated after-sales care.',
  },
  {
    num: '04',
    title: 'Project Management',
    desc: 'End-to-end coordination with clear communication, strict quality control, and on-time handover every time.',
  },
]

const ENTITIES = [
  { name: 'AWTAD Kitchens Furniture Fix. & Metallic Const. Ind.', role: 'Manufacturing & Production of Aluminium Doors & Kitchens' },
  { name: 'AWTAD Kitchens', role: 'Trading Services & Showroom' },
  { name: 'AWTAD Trading Establishment', role: 'Trading Services & Showroom' },
  { name: 'AWTAD Al Khaleej', role: 'Manufacturing of Aluminium Doors, Windows & Glass Works' },
  { name: 'AWTAD Metal Coating', role: 'Specialized Coating Services for Aluminium Profiles & Wood Finish' },
]

const SHOWROOMS = [
  {
    city: 'Head Office & Factory',
    address: 'Bin Rasheed 3, Al Baghayeh, Sharjah, UAE',
    tel: '+971 6 522 9367',
    mob: '+971 56 412 364',
    email: 'info@awtadgroup.net',
    img: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=600&h=400&fit=crop&auto=format',
  },
  {
    city: 'Showroom — Sharjah',
    address: 'Shaikh Khalifa bin Zayed Al Nahyan Road, Industrial Area 12, Sharjah',
    tel: '+971 6 538 4888',
    mob: '+971 544 464 928',
    email: 'sales.shj@awtadgroup.net',
    img: 'https://images.unsplash.com/photo-1524758631624-e2822e304c36?w=600&h=400&fit=crop&auto=format',
  },
  {
    city: 'Showroom — Dubai',
    address: 'Shop 50–51, Building Materials Mall, Al Warsan 3, Dubai',
    tel: '+971 4 283 1777',
    mob: '+971 56 412 3449',
    email: 'sales.dxb@awtadgroup.net',
    img: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=600&h=400&fit=crop&auto=format',
  },
  {
    city: 'Showroom — Abu Dhabi',
    address: '9th Street, Al Danah E-11, Abu Dhabi, UAE',
    tel: '+971 2 635 0003',
    mob: '+971 56 410 1319',
    email: 'sales.abd@awtadgroup.net',
    img: 'https://images.unsplash.com/photo-1518684079-3c830dcef090?w=600&h=400&fit=crop&auto=format',
  },
]

const PARTNERS = [
  'Biesse', 'Gema', 'AkzoNobel', 'Axalta', 'Egger',
  'Liebherr', 'Philips', 'Samsung', 'QUALICOAT', 'ISO',
  'Biesse', 'Gema', 'AkzoNobel', 'Axalta', 'Egger',
  'Liebherr', 'Philips', 'Samsung', 'QUALICOAT', 'ISO',
]

const MARKETS = ['UAE', 'KSA', 'Oman', 'Egypt', 'Sudan', 'Nigeria', 'Niger', 'Qatar', 'Kuwait', 'Uganda', 'Angola', 'Morocco']

const PROJECTS = [
  { title: 'Villa Kitchen — Sharjah', category: 'Residential', img: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=600&h=400&fit=crop&auto=format' },
  { title: 'Commercial Tower — Dubai', category: 'Commercial', img: 'https://images.unsplash.com/photo-1486325212027-8081e485255e?w=600&h=400&fit=crop&auto=format' },
  { title: 'Luxury Villa Doors — Abu Dhabi', category: 'Residential', img: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&h=400&fit=crop&auto=format' },
  { title: 'Developer Complex — Sharjah', category: 'Developer', img: 'https://images.unsplash.com/photo-1560185127-6a12f9a6f9ea?w=600&h=400&fit=crop&auto=format' },
  { title: 'Interior Fit-out — Dubai', category: 'Commercial', img: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=600&h=400&fit=crop&auto=format' },
  { title: 'Export Project — KSA', category: 'Export', img: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=600&h=400&fit=crop&auto=format' },
]

// ─── Hooks ───────────────────────────────────────────────────────────────────

function useIntersection(ref: React.RefObject<Element | null>, threshold = 0.15) {
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true) }, { threshold })
    obs.observe(el)
    return () => obs.disconnect()
  }, [ref, threshold])
  return visible
}

function useCounter(target: number, active: boolean, duration = 1800) {
  const [count, setCount] = useState(0)
  useEffect(() => {
    if (!active) return
    const steps = 60
    const increment = target / steps
    let current = 0
    const interval = setInterval(() => {
      current = Math.min(current + increment, target)
      setCount(Math.floor(current))
      if (current >= target) clearInterval(interval)
    }, duration / steps)
    return () => clearInterval(interval)
  }, [active, target, duration])
  return count
}

// ─── Components ──────────────────────────────────────────────────────────────

function StatCard({ value, label, suffix, active }: { value: string; label: string; suffix: string; active: boolean }) {
  const numericValue = parseInt(value.replace(/\D/g, ''))
  const isNumeric = !isNaN(numericValue) && numericValue > 10
  const displayValue = isNumeric ? numericValue : parseInt(value) || value
  const count = useCounter(typeof displayValue === 'number' ? displayValue : 0, active)
  const shown = isNumeric ? count.toLocaleString() : value

  return (
    <div className="text-center group">
      <div
        className="text-4xl md:text-5xl font-bold mb-1"
        style={{ fontFamily: 'var(--font-display)', color: '#C9A84C' }}
      >
        {shown}{suffix}
      </div>
      <div className="text-xs uppercase tracking-widest" style={{ color: '#8A8478' }}>{label}</div>
    </div>
  )
}

function SectionLabel({ text }: { text: string }) {
  return (
    <div className="flex items-center gap-3 mb-4">
      <div className="w-8 h-px" style={{ background: '#C9A84C' }} />
      <span className="text-xs uppercase tracking-[0.3em]" style={{ color: '#C9A84C' }}>{text}</span>
    </div>
  )
}

function ProductCard({ product, index }: { product: typeof PRODUCTS[0]; index: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const visible = useIntersection(ref)
  return (
    <div
      ref={ref}
      className="hover-lift group relative overflow-hidden cursor-pointer"
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(30px)',
        transition: `opacity 0.7s ease ${index * 0.1}s, transform 0.7s ease ${index * 0.1}s`,
        background: '#181816',
        border: '1px solid rgba(201,168,76,0.15)',
        borderRadius: '2px',
      }}
    >
      <div className="relative overflow-hidden" style={{ height: '220px' }}>
        <img
          src={product.img}
          alt={product.title}
          className="w-full h-full object-cover"
          style={{ transition: 'transform 0.6s ease' }}
          onMouseEnter={e => (e.currentTarget.style.transform = 'scale(1.05)')}
          onMouseLeave={e => (e.currentTarget.style.transform = 'scale(1)')}
        />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(14,14,12,0.8) 0%, transparent 60%)' }} />
        <span
          className="absolute top-3 left-3 text-[10px] uppercase tracking-widest px-2 py-1"
          style={{ background: 'rgba(201,168,76,0.2)', color: '#C9A84C', border: '1px solid rgba(201,168,76,0.3)' }}
        >
          {product.tag}
        </span>
      </div>
      <div className="p-5">
        <h3 className="text-lg font-semibold mb-2" style={{ fontFamily: 'var(--font-display)', color: '#F5F0E8' }}>
          {product.title}
        </h3>
        <p className="text-sm leading-relaxed" style={{ color: '#8A8478' }}>{product.desc}</p>
        <div
          className="mt-4 flex items-center gap-2 text-xs uppercase tracking-widest"
          style={{ color: '#C9A84C' }}
        >
          <span>Enquire</span>
          <span>→</span>
        </div>
      </div>
    </div>
  )
}

// ─── Sections ────────────────────────────────────────────────────────────────

function NavBar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <>
      <nav
        className="fixed top-0 left-0 right-0 z-50 px-6 md:px-12"
        style={{
          background: scrolled ? 'rgba(14,14,12,0.95)' : 'transparent',
          backdropFilter: scrolled ? 'blur(12px)' : 'none',
          borderBottom: scrolled ? '1px solid rgba(201,168,76,0.15)' : 'none',
          padding: scrolled ? '14px 48px' : '22px 48px',
        }}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {/* Logo */}
          <a href="#" className="flex flex-col leading-none">
            <span
              className="text-2xl font-black tracking-[0.15em]"
              style={{ fontFamily: 'var(--font-display)', color: '#C9A84C', letterSpacing: '0.2em' }}
            >
              AWTAD
            </span>
            <span className="text-[9px] uppercase tracking-[0.35em]" style={{ color: '#8A8478', marginTop: '1px' }}>
              Work of Art & Quality
            </span>
          </a>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-8">
            {NAV_LINKS.map(l => (
              <a
                key={l.href}
                href={l.href}
                className="text-xs uppercase tracking-widest transition-colors"
                style={{ color: '#C8C2B6' }}
                onMouseEnter={e => (e.currentTarget.style.color = '#C9A84C')}
                onMouseLeave={e => (e.currentTarget.style.color = '#C8C2B6')}
              >
                {l.label}
              </a>
            ))}
          </div>

          {/* CTA */}
          <div className="hidden md:flex items-center gap-4">
            <a
              href="https://wa.me/971564123640"
              className="text-xs uppercase tracking-widest px-4 py-2 transition-all"
              style={{ color: '#C9A84C', border: '1px solid rgba(201,168,76,0.4)' }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = 'rgba(201,168,76,0.1)' }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = 'transparent' }}
            >
              WhatsApp
            </a>
            <a
              href="#contact"
              className="text-xs uppercase tracking-widest px-5 py-2 font-semibold transition-all"
              style={{ background: '#C9A84C', color: '#0E0E0C' }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = '#E8C96A' }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = '#C9A84C' }}
            >
              Get a Quote
            </a>
          </div>

          {/* Hamburger */}
          <button
            className="md:hidden flex flex-col gap-1.5 p-2"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <span className="block w-6 h-0.5" style={{ background: '#C9A84C', transition: 'transform 0.3s', transform: menuOpen ? 'rotate(45deg) translate(3px, 3px)' : 'none' }} />
            <span className="block w-6 h-0.5" style={{ background: '#C9A84C', opacity: menuOpen ? 0 : 1, transition: 'opacity 0.3s' }} />
            <span className="block w-6 h-0.5" style={{ background: '#C9A84C', transition: 'transform 0.3s', transform: menuOpen ? 'rotate(-45deg) translate(3px, -3px)' : 'none' }} />
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      <div
        className="fixed inset-0 z-40 flex flex-col justify-center items-center gap-8 md:hidden"
        style={{
          background: 'rgba(14,14,12,0.97)',
          opacity: menuOpen ? 1 : 0,
          pointerEvents: menuOpen ? 'auto' : 'none',
          transition: 'opacity 0.3s ease',
        }}
      >
        {NAV_LINKS.map(l => (
          <a
            key={l.href}
            href={l.href}
            className="text-2xl uppercase tracking-[0.2em]"
            style={{ fontFamily: 'var(--font-display)', color: '#F5F0E8' }}
            onClick={() => setMenuOpen(false)}
          >
            {l.label}
          </a>
        ))}
        <div className="flex flex-col gap-3 mt-4 w-48">
          <a href="#contact" className="text-center text-sm uppercase tracking-widest py-3 font-semibold" style={{ background: '#C9A84C', color: '#0E0E0C' }} onClick={() => setMenuOpen(false)}>
            Get a Quote
          </a>
          <a href="https://wa.me/971564123640" className="text-center text-sm uppercase tracking-widest py-3" style={{ border: '1px solid rgba(201,168,76,0.4)', color: '#C9A84C' }} onClick={() => setMenuOpen(false)}>
            WhatsApp
          </a>
        </div>
      </div>

      {/* Mobile sticky bottom bar */}
      <div
        className="fixed bottom-0 left-0 right-0 z-50 md:hidden flex"
        style={{ background: '#0E0E0C', borderTop: '1px solid rgba(201,168,76,0.2)' }}
      >
        <a href="tel:+97165229367" className="flex-1 flex flex-col items-center py-3 gap-0.5" style={{ color: '#C8C2B6' }}>
          <span className="text-lg">📞</span>
          <span className="text-[10px] uppercase tracking-wider">Call</span>
        </a>
        <a href="https://wa.me/971564123640" className="flex-1 flex flex-col items-center py-3 gap-0.5" style={{ color: '#C9A84C' }}>
          <span className="text-lg">💬</span>
          <span className="text-[10px] uppercase tracking-wider">WhatsApp</span>
        </a>
        <a href="#contact" className="flex-1 flex flex-col items-center py-3 gap-0.5 font-semibold" style={{ background: '#C9A84C', color: '#0E0E0C' }}>
          <span className="text-lg">✉</span>
          <span className="text-[10px] uppercase tracking-wider">Quote</span>
        </a>
      </div>
    </>
  )
}

function Hero() {
  const [loaded, setLoaded] = useState(false)
  useEffect(() => { setTimeout(() => setLoaded(true), 100) }, [])

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden fluted-bg" style={{ background: '#0E0E0C' }}>
      {/* Background image */}
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=1600&h=900&fit=crop&auto=format"
          alt="AWTAD luxury kitchen"
          className="w-full h-full object-cover"
          style={{ opacity: 0.18 }}
        />
        <div
          className="absolute inset-0"
          style={{ background: 'linear-gradient(135deg, rgba(14,14,12,0.95) 0%, rgba(14,14,12,0.7) 50%, rgba(14,14,12,0.9) 100%)' }}
        />
      </div>

      {/* Vertical gold line accent */}
      <div
        className="absolute left-0 top-0 bottom-0 w-px hidden lg:block"
        style={{ background: 'linear-gradient(to bottom, transparent, rgba(201,168,76,0.4), transparent)', marginLeft: '80px' }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 pt-32 pb-24">
        <div className="max-w-3xl">
          {/* Tag */}
          <div
            className="inline-flex items-center gap-3 mb-8"
            style={{ opacity: loaded ? 1 : 0, transform: loaded ? 'none' : 'translateY(20px)', transition: 'all 0.8s ease 0.2s' }}
          >
            <div className="w-8 h-px" style={{ background: '#C9A84C' }} />
            <span className="text-xs uppercase tracking-[0.35em]" style={{ color: '#C9A84C' }}>
              Founded 2002 · Sharjah, UAE
            </span>
          </div>

          {/* Headline */}
          <h1
            className="text-5xl md:text-7xl lg:text-8xl font-bold leading-[0.95] mb-6"
            style={{
              fontFamily: 'var(--font-display)',
              color: '#F5F0E8',
              opacity: loaded ? 1 : 0,
              transform: loaded ? 'none' : 'translateY(30px)',
              transition: 'all 0.9s ease 0.4s',
            }}
          >
            Crafted
            <br />
            <span className="gold-shimmer">Excellence,</span>
            <br />
            Harmonized
          </h1>

          {/* Sub */}
          <p
            className="text-lg md:text-xl leading-relaxed max-w-xl mb-10"
            style={{
              color: '#C8C2B6',
              opacity: loaded ? 1 : 0,
              transform: loaded ? 'none' : 'translateY(20px)',
              transition: 'all 0.8s ease 0.6s',
            }}
          >
            Premium aluminium kitchens, doors, windows, and interior solutions — manufactured in our 14,137 m² Sharjah facility and delivered across the UAE and 11 export markets.
          </p>

          {/* CTAs */}
          <div
            className="flex flex-wrap gap-4"
            style={{ opacity: loaded ? 1 : 0, transform: loaded ? 'none' : 'translateY(20px)', transition: 'all 0.8s ease 0.8s' }}
          >
            <a
              href="#contact"
              className="inline-flex items-center gap-3 px-8 py-4 text-sm uppercase tracking-widest font-semibold transition-all"
              style={{ background: '#C9A84C', color: '#0E0E0C' }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = '#E8C96A' }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = '#C9A84C' }}
            >
              Get a Quote
              <span>→</span>
            </a>
            <a
              href="#showrooms"
              className="inline-flex items-center gap-3 px-8 py-4 text-sm uppercase tracking-widest transition-all"
              style={{ border: '1px solid rgba(201,168,76,0.5)', color: '#C9A84C' }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = 'rgba(201,168,76,0.08)' }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = 'transparent' }}
            >
              Visit a Showroom
            </a>
          </div>

          {/* Markets */}
          <div
            className="mt-12 pt-8"
            style={{
              borderTop: '1px solid rgba(201,168,76,0.15)',
              opacity: loaded ? 1 : 0,
              transition: 'opacity 0.8s ease 1s',
            }}
          >
            <p className="text-[10px] uppercase tracking-[0.3em] mb-3" style={{ color: '#8A8478' }}>Export markets</p>
            <div className="flex flex-wrap gap-2">
              {MARKETS.map(m => (
                <span key={m} className="text-xs px-2 py-0.5" style={{ background: 'rgba(201,168,76,0.08)', color: '#C8C2B6', border: '1px solid rgba(201,168,76,0.15)' }}>
                  {m}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Scroll cue */}
      <div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        style={{ opacity: loaded ? 0.5 : 0, transition: 'opacity 1s ease 1.2s' }}
      >
        <div className="w-px h-12" style={{ background: 'linear-gradient(to bottom, transparent, #C9A84C)' }} />
        <span className="text-[9px] uppercase tracking-widest" style={{ color: '#8A8478' }}>Scroll</span>
      </div>
    </section>
  )
}

function TrustBar() {
  const ref = useRef<HTMLDivElement>(null)
  const visible = useIntersection(ref)

  return (
    <section ref={ref} style={{ background: '#181816', borderTop: '1px solid rgba(201,168,76,0.15)', borderBottom: '1px solid rgba(201,168,76,0.15)' }}>
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-16">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-10">
          {STATS.map((s, i) => (
            <div key={i} style={{ opacity: visible ? 1 : 0, transition: `opacity 0.6s ease ${i * 0.1}s` }}>
              <StatCard {...s} active={visible} />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function About() {
  const ref = useRef<HTMLDivElement>(null)
  const visible = useIntersection(ref)

  return (
    <section id="about" ref={ref} className="py-28 px-6 md:px-12" style={{ background: '#0E0E0C' }}>
      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
        {/* Text */}
        <div style={{ opacity: visible ? 1 : 0, transform: visible ? 'none' : 'translateX(-30px)', transition: 'all 0.9s ease' }}>
          <SectionLabel text="About AWTAD" />
          <h2 className="text-4xl md:text-5xl font-bold mb-6 leading-tight" style={{ fontFamily: 'var(--font-display)', color: '#F5F0E8' }}>
            A Vertically Integrated <span style={{ color: '#C9A84C' }}>Manufacturing Group</span>
          </h2>
          <p className="text-base leading-relaxed mb-6" style={{ color: '#C8C2B6' }}>
            Founded in 2002 in Sharjah, AWTAD Group has grown into a diversified business specialising in aluminium doors, kitchens, interior solutions, and surface finishing services. With a strong manufacturing backbone and a customer-first approach, we serve the UAE and key markets across the Gulf, East Africa, and North Africa.
          </p>
          <p className="text-base leading-relaxed mb-8" style={{ color: '#8A8478' }}>
            We deliver projects for real estate developers, interior design companies, private villas, and VIP clients — combining craftsmanship, innovation, and sustainability to redefine modern living spaces.
          </p>

          {/* Founder quote */}
          <blockquote className="border-l-2 pl-5 py-2" style={{ borderColor: '#C9A84C' }}>
            <p className="text-base italic mb-2" style={{ color: '#C8C2B6', fontFamily: 'var(--font-display)' }}>
              "Quality and creativity should go hand in hand. Our vision has remained the same: to build durable, beautiful, and innovative solutions that enrich everyday living."
            </p>
            <cite className="text-xs uppercase tracking-widest not-italic" style={{ color: '#8A8478' }}>— Nasir Musabeh Ahmed Saif Alteneiji, Founder</cite>
          </blockquote>

          {/* Certifications */}
          <div className="mt-8 flex flex-wrap gap-3">
            {['ISO 9001', 'ISO 14001', 'ISO 45001', 'QUALICOAT'].map(cert => (
              <span
                key={cert}
                className="text-xs px-3 py-1.5 uppercase tracking-widest font-semibold"
                style={{ border: '1px solid rgba(201,168,76,0.4)', color: '#C9A84C' }}
              >
                {cert}
              </span>
            ))}
          </div>
        </div>

        {/* Entities */}
        <div style={{ opacity: visible ? 1 : 0, transform: visible ? 'none' : 'translateX(30px)', transition: 'all 0.9s ease 0.2s' }}>
          <div className="relative">
            <img
              src="https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=700&h=500&fit=crop&auto=format"
              alt="AWTAD factory"
              className="w-full object-cover mb-6"
              style={{ height: '260px', filter: 'brightness(0.7)' }}
            />
            <div className="absolute top-4 right-4 px-4 py-3" style={{ background: 'rgba(14,14,12,0.9)', border: '1px solid rgba(201,168,76,0.3)' }}>
              <div className="text-2xl font-bold" style={{ fontFamily: 'var(--font-display)', color: '#C9A84C' }}>5</div>
              <div className="text-[10px] uppercase tracking-widest" style={{ color: '#8A8478' }}>Group Entities</div>
            </div>
          </div>
          <div className="space-y-2">
            {ENTITIES.map((e, i) => (
              <div key={i} className="flex gap-4 py-3" style={{ borderBottom: '1px solid rgba(201,168,76,0.08)' }}>
                <span className="text-xs mt-0.5 shrink-0" style={{ color: '#C9A84C' }}>◆</span>
                <div>
                  <div className="text-sm font-medium" style={{ color: '#F5F0E8' }}>{e.name}</div>
                  <div className="text-xs" style={{ color: '#8A8478' }}>{e.role}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

function Products() {
  const ref = useRef<HTMLDivElement>(null)
  const visible = useIntersection(ref)

  return (
    <section id="products" ref={ref} className="py-28 px-6 md:px-12 fluted-bg" style={{ background: '#181816' }}>
      <div className="max-w-7xl mx-auto">
        <div className="max-w-xl mb-16" style={{ opacity: visible ? 1 : 0, transition: 'opacity 0.7s ease' }}>
          <SectionLabel text="Product Lines" />
          <h2 className="text-4xl md:text-5xl font-bold leading-tight" style={{ fontFamily: 'var(--font-display)', color: '#F5F0E8' }}>
            Built in Our Own Factory, <span style={{ color: '#C9A84C' }}>Delivered to Your Door</span>
          </h2>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {PRODUCTS.map((p, i) => (
            <ProductCard key={i} product={p} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}

function Strengths() {
  const ref = useRef<HTMLDivElement>(null)
  const visible = useIntersection(ref)

  return (
    <section ref={ref} className="py-28 px-6 md:px-12" style={{ background: '#0E0E0C' }}>
      <div className="max-w-7xl mx-auto">
        <div className="text-center max-w-xl mx-auto mb-16" style={{ opacity: visible ? 1 : 0, transition: 'opacity 0.7s ease' }}>
          <SectionLabel text="Why Choose AWTAD" />
          <h2 className="text-4xl md:text-5xl font-bold" style={{ fontFamily: 'var(--font-display)', color: '#F5F0E8' }}>
            Six Reasons to <span style={{ color: '#C9A84C' }}>Trust Us</span>
          </h2>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {STRENGTHS.map((s, i) => (
            <div
              key={i}
              className="group p-7 hover-lift"
              style={{
                background: '#181816',
                border: '1px solid rgba(201,168,76,0.1)',
                opacity: visible ? 1 : 0,
                transform: visible ? 'none' : 'translateY(20px)',
                transition: `all 0.7s ease ${i * 0.1}s`,
              }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = 'rgba(201,168,76,0.4)' }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = 'rgba(201,168,76,0.1)' }}
            >
              <div className="text-2xl mb-4" style={{ color: '#C9A84C' }}>{s.icon}</div>
              <h3 className="text-lg font-semibold mb-2" style={{ fontFamily: 'var(--font-display)', color: '#F5F0E8' }}>{s.title}</h3>
              <p className="text-sm leading-relaxed" style={{ color: '#8A8478' }}>{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function Services() {
  const ref = useRef<HTMLDivElement>(null)
  const visible = useIntersection(ref)

  return (
    <section id="services" ref={ref} className="py-28 px-6 md:px-12" style={{ background: '#181816' }}>
      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
        <div style={{ opacity: visible ? 1 : 0, transition: 'opacity 0.7s ease' }}>
          <SectionLabel text="Our Services" />
          <h2 className="text-4xl md:text-5xl font-bold mb-4 leading-tight" style={{ fontFamily: 'var(--font-display)', color: '#F5F0E8' }}>
            From Concept to <span style={{ color: '#C9A84C' }}>Completion</span>
          </h2>
          <p className="text-base mb-8" style={{ color: '#8A8478' }}>
            Every project is managed end-to-end — design, engineering, manufacturing, installation, and ongoing support.
          </p>
          <img
            src="https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=700&h=400&fit=crop&auto=format"
            alt="Manufacturing floor"
            className="w-full object-cover"
            style={{ height: '260px', filter: 'brightness(0.6)' }}
          />
        </div>

        <div className="space-y-0">
          {SERVICES.map((s, i) => (
            <div
              key={i}
              className="group py-7 flex gap-6"
              style={{
                borderBottom: '1px solid rgba(201,168,76,0.1)',
                opacity: visible ? 1 : 0,
                transform: visible ? 'none' : 'translateX(30px)',
                transition: `all 0.7s ease ${i * 0.12}s`,
              }}
            >
              <div
                className="text-3xl font-black leading-none shrink-0"
                style={{ fontFamily: 'var(--font-display)', color: 'rgba(201,168,76,0.25)', transition: 'color 0.3s' }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = '#C9A84C' }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = 'rgba(201,168,76,0.25)' }}
              >
                {s.num}
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2" style={{ fontFamily: 'var(--font-display)', color: '#F5F0E8' }}>{s.title}</h3>
                <p className="text-sm leading-relaxed" style={{ color: '#8A8478' }}>{s.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function Projects() {
  const [filter, setFilter] = useState('All')
  const ref = useRef<HTMLDivElement>(null)
  const visible = useIntersection(ref)
  const categories = ['All', 'Residential', 'Commercial', 'Developer', 'Export']
  const filtered = filter === 'All' ? PROJECTS : PROJECTS.filter(p => p.category === filter)

  return (
    <section id="projects" ref={ref} className="py-28 px-6 md:px-12 fluted-bg" style={{ background: '#0E0E0C' }}>
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12" style={{ opacity: visible ? 1 : 0, transition: 'opacity 0.7s ease' }}>
          <div>
            <SectionLabel text="Featured Projects" />
            <h2 className="text-4xl md:text-5xl font-bold" style={{ fontFamily: 'var(--font-display)', color: '#F5F0E8' }}>
              5,000+ Projects <span style={{ color: '#C9A84C' }}>Delivered</span>
            </h2>
          </div>
          <div className="flex flex-wrap gap-2">
            {categories.map(c => (
              <button
                key={c}
                onClick={() => setFilter(c)}
                className="text-xs uppercase tracking-widest px-4 py-2 transition-all"
                style={{
                  background: filter === c ? '#C9A84C' : 'transparent',
                  color: filter === c ? '#0E0E0C' : '#8A8478',
                  border: `1px solid ${filter === c ? '#C9A84C' : 'rgba(201,168,76,0.2)'}`,
                }}
              >
                {c}
              </button>
            ))}
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filtered.map((p, i) => (
            <div
              key={p.title}
              className="group relative overflow-hidden hover-lift cursor-pointer"
              style={{
                opacity: visible ? 1 : 0,
                transform: visible ? 'none' : 'translateY(20px)',
                transition: `all 0.7s ease ${i * 0.1}s`,
              }}
            >
              <div style={{ height: '260px', overflow: 'hidden' }}>
                <img
                  src={p.img}
                  alt={p.title}
                  className="w-full h-full object-cover"
                  style={{ transition: 'transform 0.6s ease' }}
                  onMouseEnter={e => (e.currentTarget.style.transform = 'scale(1.08)')}
                  onMouseLeave={e => (e.currentTarget.style.transform = 'scale(1)')}
                />
              </div>
              <div
                className="absolute inset-0 flex flex-col justify-end p-5"
                style={{ background: 'linear-gradient(to top, rgba(14,14,12,0.9) 0%, transparent 60%)' }}
              >
                <span className="text-[10px] uppercase tracking-widest mb-1" style={{ color: '#C9A84C' }}>{p.category}</span>
                <h3 className="text-base font-semibold" style={{ fontFamily: 'var(--font-display)', color: '#F5F0E8' }}>{p.title}</h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function Factory() {
  const ref = useRef<HTMLDivElement>(null)
  const visible = useIntersection(ref)

  return (
    <section id="factory" ref={ref} className="relative py-28 px-6 md:px-12 overflow-hidden" style={{ background: '#181816' }}>
      <div className="max-w-7xl mx-auto grid lg:grid-cols-5 gap-12 items-center">
        <div className="lg:col-span-2" style={{ opacity: visible ? 1 : 0, transition: 'all 0.9s ease' }}>
          <SectionLabel text="Factory & Capability" />
          <h2 className="text-4xl md:text-5xl font-bold mb-6 leading-tight" style={{ fontFamily: 'var(--font-display)', color: '#F5F0E8' }}>
            In-House. <span style={{ color: '#C9A84C' }}>Every Step.</span>
          </h2>
          <p className="text-base leading-relaxed mb-8" style={{ color: '#C8C2B6' }}>
            14,137 m² of factory land in Sharjah. Independent in machinery and technology — every major craft performed in-house. Our 160+ person team handles cutting, edge banding, powder coating, assembly, and installation without third-party dependence.
          </p>

          <div className="grid grid-cols-2 gap-4">
            {[
              { label: '14,137 m²', sub: 'Factory land' },
              { label: '160+', sub: 'Skilled employees' },
              { label: '35+', sub: 'In-house machines' },
              { label: '8', sub: 'Delivery vehicles' },
            ].map((f, i) => (
              <div key={i} className="p-4" style={{ background: '#0E0E0C', border: '1px solid rgba(201,168,76,0.1)' }}>
                <div className="text-xl font-bold" style={{ fontFamily: 'var(--font-display)', color: '#C9A84C' }}>{f.label}</div>
                <div className="text-xs uppercase tracking-widest" style={{ color: '#8A8478' }}>{f.sub}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="lg:col-span-3 grid grid-cols-2 gap-3" style={{ opacity: visible ? 1 : 0, transform: visible ? 'none' : 'translateX(30px)', transition: 'all 0.9s ease 0.2s' }}>
          <img src="https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=500&h=400&fit=crop&auto=format" alt="Factory" className="w-full object-cover col-span-2" style={{ height: '220px', filter: 'brightness(0.6)' }} />
          <img src="https://images.unsplash.com/photo-1565372780816-00f90fe5f6ab?w=300&h=220&fit=crop&auto=format" alt="Aluminium processing" className="w-full object-cover" style={{ height: '180px', filter: 'brightness(0.6)' }} />
          <img src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=300&h=220&fit=crop&auto=format" alt="Quality control" className="w-full object-cover" style={{ height: '180px', filter: 'brightness(0.6)' }} />
        </div>
      </div>
    </section>
  )
}

function Partners() {
  return (
    <section className="py-20 px-6 md:px-12 overflow-hidden" style={{ background: '#0E0E0C', borderTop: '1px solid rgba(201,168,76,0.1)', borderBottom: '1px solid rgba(201,168,76,0.1)' }}>
      <div className="max-w-7xl mx-auto mb-10 text-center">
        <p className="text-[10px] uppercase tracking-[0.35em]" style={{ color: '#8A8478' }}>
          Trusted by global industry leaders
        </p>
      </div>
      <div className="overflow-hidden relative">
        <div className="flex scroll-left whitespace-nowrap">
          {PARTNERS.map((p, i) => (
            <div
              key={i}
              className="inline-flex items-center justify-center mx-8 text-sm uppercase tracking-widest font-semibold shrink-0"
              style={{ color: 'rgba(200,194,182,0.4)', minWidth: '120px', transition: 'color 0.3s', cursor: 'default' }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = '#C9A84C' }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = 'rgba(200,194,182,0.4)' }}
            >
              {p}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function Showrooms() {
  const [active, setActive] = useState(0)
  const ref = useRef<HTMLDivElement>(null)
  const visible = useIntersection(ref)

  return (
    <section id="showrooms" ref={ref} className="py-28 px-6 md:px-12" style={{ background: '#181816' }}>
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12" style={{ opacity: visible ? 1 : 0, transition: 'opacity 0.7s ease' }}>
          <SectionLabel text="Our Locations" />
          <h2 className="text-4xl md:text-5xl font-bold" style={{ fontFamily: 'var(--font-display)', color: '#F5F0E8' }}>
            Experience Craftsmanship <span style={{ color: '#C9A84C' }}>Up Close</span>
          </h2>
          <p className="mt-3 text-base" style={{ color: '#8A8478' }}>Four locations across the UAE — Sharjah, Dubai, and Abu Dhabi.</p>
        </div>

        {/* Tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {SHOWROOMS.map((s, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              className="text-xs uppercase tracking-widest px-5 py-2.5 transition-all"
              style={{
                background: active === i ? '#C9A84C' : 'transparent',
                color: active === i ? '#0E0E0C' : '#8A8478',
                border: `1px solid ${active === i ? '#C9A84C' : 'rgba(201,168,76,0.2)'}`,
              }}
            >
              {s.city.replace('Showroom — ', '').replace('Head Office & ', '')}
            </button>
          ))}
        </div>

        {/* Active card */}
        <div
          className="grid lg:grid-cols-2 gap-8"
          style={{ opacity: visible ? 1 : 0, transition: 'opacity 0.7s ease 0.2s' }}
        >
          <img
            src={SHOWROOMS[active].img}
            alt={SHOWROOMS[active].city}
            className="w-full object-cover"
            style={{ height: '360px', filter: 'brightness(0.65)' }}
          />
          <div className="flex flex-col justify-center">
            <h3 className="text-2xl font-bold mb-2" style={{ fontFamily: 'var(--font-display)', color: '#F5F0E8' }}>
              {SHOWROOMS[active].city}
            </h3>
            <div className="gold-line-left mb-6 w-24" />
            <p className="text-base mb-6" style={{ color: '#C8C2B6' }}>{SHOWROOMS[active].address}</p>
            <div className="space-y-3 mb-8">
              <div className="flex items-center gap-3 text-sm" style={{ color: '#C8C2B6' }}>
                <span style={{ color: '#C9A84C' }}>Tel</span>
                <a href={`tel:${SHOWROOMS[active].tel}`} style={{ color: '#C8C2B6' }}>{SHOWROOMS[active].tel}</a>
              </div>
              <div className="flex items-center gap-3 text-sm" style={{ color: '#C8C2B6' }}>
                <span style={{ color: '#C9A84C' }}>Mob</span>
                <a href={`tel:${SHOWROOMS[active].mob}`} style={{ color: '#C8C2B6' }}>{SHOWROOMS[active].mob}</a>
              </div>
              <div className="flex items-center gap-3 text-sm" style={{ color: '#C8C2B6' }}>
                <span style={{ color: '#C9A84C' }}>Email</span>
                <a href={`mailto:${SHOWROOMS[active].email}`} style={{ color: '#C8C2B6' }}>{SHOWROOMS[active].email}</a>
              </div>
            </div>
            <div className="flex flex-wrap gap-3">
              <a
                href={`tel:${SHOWROOMS[active].tel}`}
                className="px-6 py-3 text-xs uppercase tracking-widest font-semibold transition-all"
                style={{ background: '#C9A84C', color: '#0E0E0C' }}
              >
                Call Now
              </a>
              <a
                href="https://wa.me/971564123640"
                className="px-6 py-3 text-xs uppercase tracking-widest transition-all"
                style={{ border: '1px solid rgba(201,168,76,0.4)', color: '#C9A84C' }}
              >
                WhatsApp
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function Contact() {
  const [form, setForm] = useState({ name: '', phone: '', city: '', product: '', message: '' })
  const [sent, setSent] = useState(false)
  const ref = useRef<HTMLDivElement>(null)
  const visible = useIntersection(ref)

  const handle = (e: React.FormEvent) => {
    e.preventDefault()
    setSent(true)
  }

  const inputStyle = {
    background: '#181816',
    border: '1px solid rgba(201,168,76,0.2)',
    color: '#F5F0E8',
    padding: '12px 14px',
    fontSize: '14px',
    outline: 'none',
    width: '100%',
    fontFamily: 'Outfit, system-ui, sans-serif',
    transition: 'border-color 0.2s',
  }

  return (
    <section id="contact" ref={ref} className="py-28 px-6 md:px-12 fluted-bg" style={{ background: '#0E0E0C' }}>
      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16">
        <div style={{ opacity: visible ? 1 : 0, transition: 'opacity 0.7s ease' }}>
          <SectionLabel text="Request a Quote" />
          <h2 className="text-4xl md:text-5xl font-bold mb-4 leading-tight" style={{ fontFamily: 'var(--font-display)', color: '#F5F0E8' }}>
            Start Your <span style={{ color: '#C9A84C' }}>Project Today</span>
          </h2>
          <p className="text-base mb-10 leading-relaxed" style={{ color: '#8A8478' }}>
            Whether you're a homeowner, developer, or interior designer — our team will respond within 24 hours with a tailored quotation.
          </p>

          <div className="space-y-6">
            {[
              { icon: '📍', label: 'Head Office', val: 'Bin Rasheed 3, Al Baghayeh, Sharjah, UAE' },
              { icon: '📞', label: 'Call', val: '+971 6 522 9367' },
              { icon: '✉', label: 'Email', val: 'info@awtadgroup.net' },
              { icon: '🌐', label: 'Web', val: 'www.awtadgroup.net' },
            ].map((c, i) => (
              <div key={i} className="flex gap-4 items-start">
                <span className="text-xl" style={{ marginTop: '2px' }}>{c.icon}</span>
                <div>
                  <div className="text-[10px] uppercase tracking-widest mb-0.5" style={{ color: '#C9A84C' }}>{c.label}</div>
                  <div className="text-sm" style={{ color: '#C8C2B6' }}>{c.val}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ opacity: visible ? 1 : 0, transform: visible ? 'none' : 'translateX(30px)', transition: 'all 0.9s ease 0.2s' }}>
          {sent ? (
            <div className="flex flex-col items-center justify-center h-full gap-4 py-20 text-center">
              <div className="text-4xl">✓</div>
              <h3 className="text-2xl font-bold" style={{ fontFamily: 'var(--font-display)', color: '#C9A84C' }}>Enquiry Sent</h3>
              <p style={{ color: '#8A8478' }}>Our team will be in touch within 24 hours.</p>
              <button onClick={() => setSent(false)} className="text-xs uppercase tracking-widest mt-4 px-5 py-2.5" style={{ border: '1px solid rgba(201,168,76,0.4)', color: '#C9A84C' }}>
                Send Another
              </button>
            </div>
          ) : (
            <form onSubmit={handle} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <input
                  style={inputStyle}
                  placeholder="Full Name *"
                  value={form.name}
                  required
                  onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                  onFocus={e => (e.target.style.borderColor = '#C9A84C')}
                  onBlur={e => (e.target.style.borderColor = 'rgba(201,168,76,0.2)')}
                />
                <input
                  style={inputStyle}
                  placeholder="Phone *"
                  type="tel"
                  value={form.phone}
                  required
                  onChange={e => setForm(f => ({ ...f, phone: e.target.value }))}
                  onFocus={e => (e.target.style.borderColor = '#C9A84C')}
                  onBlur={e => (e.target.style.borderColor = 'rgba(201,168,76,0.2)')}
                />
              </div>
              <select
                style={{ ...inputStyle, appearance: 'none', cursor: 'pointer' }}
                value={form.city}
                onChange={e => setForm(f => ({ ...f, city: e.target.value }))}
                onFocus={e => (e.target.style.borderColor = '#C9A84C')}
                onBlur={e => (e.target.style.borderColor = 'rgba(201,168,76,0.2)')}
              >
                <option value="">Select City</option>
                <option>Sharjah</option>
                <option>Dubai</option>
                <option>Abu Dhabi</option>
                <option>Other UAE</option>
                <option>KSA</option>
                <option>Qatar</option>
                <option>Other Export Market</option>
              </select>
              <select
                style={{ ...inputStyle, appearance: 'none', cursor: 'pointer' }}
                value={form.product}
                onChange={e => setForm(f => ({ ...f, product: e.target.value }))}
                onFocus={e => (e.target.style.borderColor = '#C9A84C')}
                onBlur={e => (e.target.style.borderColor = 'rgba(201,168,76,0.2)')}
              >
                <option value="">Product Interest</option>
                <option>Premium Kitchens</option>
                <option>Doors & Windows</option>
                <option>Wardrobes & Interiors</option>
                <option>Pergolas & Gates</option>
                <option>Powder Coating</option>
                <option>Multiple Products</option>
              </select>
              <textarea
                style={{ ...inputStyle, resize: 'none', height: '110px' }}
                placeholder="Project details (optional)"
                value={form.message}
                onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
                onFocus={e => (e.target.style.borderColor = '#C9A84C')}
                onBlur={e => (e.target.style.borderColor = 'rgba(201,168,76,0.2)')}
              />
              <button
                type="submit"
                className="w-full py-4 text-sm uppercase tracking-widest font-semibold transition-all"
                style={{ background: '#C9A84C', color: '#0E0E0C' }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = '#E8C96A' }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = '#C9A84C' }}
              >
                Send Enquiry →
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  )
}

function Footer() {
  return (
    <footer style={{ background: '#0A0A08', borderTop: '1px solid rgba(201,168,76,0.15)' }}>
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-16">
        <div className="grid md:grid-cols-4 gap-10 mb-12">
          {/* Brand */}
          <div className="md:col-span-1">
            <div className="text-2xl font-black tracking-[0.15em] mb-2" style={{ fontFamily: 'var(--font-display)', color: '#C9A84C' }}>
              AWTAD
            </div>
            <div className="text-[9px] uppercase tracking-[0.35em] mb-4" style={{ color: '#8A8478' }}>
              Work of Art & Quality
            </div>
            <p className="text-xs leading-relaxed" style={{ color: '#8A8478' }}>
              Crafted Excellence, Harmonized. Premium aluminium solutions since 2002.
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              {['ISO 9001', 'ISO 14001', 'QUALICOAT'].map(c => (
                <span key={c} className="text-[9px] px-2 py-0.5 uppercase tracking-widest" style={{ border: '1px solid rgba(201,168,76,0.3)', color: '#C9A84C' }}>{c}</span>
              ))}
            </div>
          </div>

          {/* Products */}
          <div>
            <h4 className="text-[10px] uppercase tracking-[0.3em] mb-4" style={{ color: '#C9A84C' }}>Products</h4>
            <ul className="space-y-2 text-xs" style={{ color: '#8A8478' }}>
              {['Premium Kitchens', 'Doors & Windows', 'Wardrobes & Interiors', 'Pergolas & Gates', 'Powder Coating'].map(p => (
                <li key={p}><a href="#products" style={{ color: '#8A8478', transition: 'color 0.2s' }} onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = '#C9A84C' }} onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = '#8A8478' }}>{p}</a></li>
              ))}
            </ul>
          </div>

          {/* Locations */}
          <div>
            <h4 className="text-[10px] uppercase tracking-[0.3em] mb-4" style={{ color: '#C9A84C' }}>Locations</h4>
            <ul className="space-y-2 text-xs" style={{ color: '#8A8478' }}>
              <li>HQ & Factory — Sharjah</li>
              <li>Metal Coating — Sharjah</li>
              <li>Showroom — Sharjah</li>
              <li>Showroom — Dubai</li>
              <li>Showroom — Abu Dhabi</li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-[10px] uppercase tracking-[0.3em] mb-4" style={{ color: '#C9A84C' }}>Contact</h4>
            <ul className="space-y-2 text-xs" style={{ color: '#8A8478' }}>
              <li>+971 6 522 9367</li>
              <li>+971 56 412 364</li>
              <li>info@awtadgroup.net</li>
              <li>www.awtadgroup.net</li>
            </ul>
            <a
              href="https://wa.me/971564123640"
              className="inline-block mt-4 text-xs uppercase tracking-widest px-4 py-2 transition-all"
              style={{ border: '1px solid rgba(201,168,76,0.4)', color: '#C9A84C' }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = 'rgba(201,168,76,0.08)' }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = 'transparent' }}
            >
              WhatsApp Us
            </a>
          </div>
        </div>

        <div className="gold-line mb-6" />

        <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-[10px] uppercase tracking-widest" style={{ color: '#8A8478' }}>
          <span>© {new Date().getFullYear()} AWTAD Group. All rights reserved.</span>
          <span>Sharjah, UAE — Est. 2002</span>
        </div>
      </div>
    </footer>
  )
}

// ─── App ─────────────────────────────────────────────────────────────────────

export default function App() {
  return (
    <div style={{ fontFamily: 'Outfit, system-ui, sans-serif', minHeight: '100vh', paddingBottom: '56px' }} className="md:pb-0">
      <NavBar />
      <Hero />
      <TrustBar />
      <About />
      <Products />
      <Strengths />
      <Services />
      <Projects />
      <Factory />
      <Partners />
      <Showrooms />
      <Contact />
      <Footer />
    </div>
  )
}
