'use client';
import { useState, useEffect, useRef, Suspense } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useSearchParams } from 'next/navigation';
import gsap from 'gsap';
import { PRODUCTS, CATEGORIES } from '@/data/products';
import { useCart } from '@/context/CartContext';

const CATEGORY_COLORS: Record<string, string> = {
  'aerosol-dispenser': '#000000',
  'aroma-diffusers':   '#1a1a1a',
  'urinal-hygiene':    '#222222',
  'soap-dispenser':    '#111111',
  'paper-dispenser':   '#0d0d0d',
  'hand-dryer':        '#FF1A1A',
  'feminine-hygiene':  '#1c1c1c',
};

/* ── 7 Consolidated categories for horizontal tab bar ─────────── */
const GROUPED_CATEGORIES = [
  {
    id: 'washroom-hygiene',
    name: 'Washroom Hygiene Solutions',
    categoryIds: ['aerosol-dispenser', 'aroma-diffusers', 'urinal-hygiene', 'soap-dispenser', 'paper-dispenser', 'hand-dryer', 'feminine-hygiene'],
  },
  {
    id: 'floor-cleaning-machines',
    name: 'Floor Cleaning Machines',
    categoryIds: ['sweepers', 'scrubbers', 'carpet-cleaners', 'escalator-cleaner'],
  },
  {
    id: 'vacuum-cleaners',
    name: 'Vacuum Cleaners',
    categoryIds: ['vacuum-cleaners', 'industrial-vacuum'],
  },
  {
    id: 'high-pressure-steam',
    name: 'High-Pressure & Steam Cleaning',
    categoryIds: ['high-pressure-jets', 'steam-cleaners'],
  },
  {
    id: 'janitorial-tools-consumables',
    name: 'Janitorial Tools & Consumables',
    categoryIds: ['janitorial', 'pads-detergents'],
  },
  {
    id: 'pest-insect-control',
    name: 'Pest & Insect Control',
    categoryIds: ['flycatchers'],
  },
  {
    id: 'sprayers-fogging',
    name: 'Sprayers & Fogging Equipment',
    categoryIds: ['aspee-sprayers'],
  },
];

// Build a quick lookup: grouped category id → array of original categoryIds
const GROUPED_LOOKUP: Record<string, string[]> = {};
GROUPED_CATEGORIES.forEach(g => { GROUPED_LOOKUP[g.id] = g.categoryIds; });

function ProductsContent() {
  const searchParams = useSearchParams();
  const initialCategory = searchParams.get('category') ?? 'all';

  const [activeCategory, setActiveCategory] = useState<string>(initialCategory);
  const [search, setSearch] = useState('');
  const gridRef = useRef<HTMLDivElement>(null);
  const tabsRef = useRef<HTMLDivElement>(null);
  const { addToCart } = useCart();

  useEffect(() => {
    const cat = searchParams.get('category') ?? 'all';
    setActiveCategory(cat);
  }, [searchParams]);

  // Enable horizontal mouse wheel scrolling on tabs
  useEffect(() => {
    const el = tabsRef.current;
    if (!el) return;

    const onWheel = (e: WheelEvent) => {
      if (e.deltaY !== 0) {
        e.preventDefault();
        el.scrollLeft += e.deltaY;
      }
    };

    el.addEventListener('wheel', onWheel, { passive: false });
    return () => el.removeEventListener('wheel', onWheel);
  }, []);

  // Auto-scroll active tab into view
  useEffect(() => {
    if (!tabsRef.current) return;
    const activeTab = tabsRef.current.querySelector<HTMLElement>('.pg-tab.active');
    if (activeTab) {
      activeTab.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
    }
  }, [activeCategory]);

  const filtered = PRODUCTS.filter(p => {
    let matchCat: boolean;
    if (activeCategory === 'all') {
      matchCat = true;
    } else if (GROUPED_LOOKUP[activeCategory]) {
      // Grouped category tab clicked — match any original category in the group
      matchCat = GROUPED_LOOKUP[activeCategory].includes(p.categoryId);
    } else {
      // Original category (sidebar) clicked
      matchCat = p.categoryId === activeCategory;
    }
    const matchSearch = p.name.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  useEffect(() => {
    if (!gridRef.current) return;
    const cards = gridRef.current.querySelectorAll('.pg-card');
    gsap.fromTo(cards,
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.5, stagger: 0.04, ease: 'power3.out' }
    );
  }, [activeCategory, search]);

  const handleAddToCart = (e: React.MouseEvent, product: (typeof PRODUCTS)[0]) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart({
      id: product.id,
      name: product.name,
      category: product.category,
      image: product.image,
    });
  };

  return (
    <div className="pg-page">
      {/* ── Page Header ───────────────────────────────────────── */}
      <div className="pg-header">
        <div className="pg-header-inner">
          <p className="pg-header-label">Product Catalog</p>
          <div className="pg-header-row">
            <h1 className="pg-header-title">Explore Our Range</h1>
            <div className="pg-search-wrap">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>
              <input
                type="text"
                className="pg-search"
                placeholder="Search products..."
                value={search}
                onChange={e => setSearch(e.target.value)}
                aria-label="Search products"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="pg-body">
        {/* ── Left Sidebar ──────────────────────────────────── */}
        <aside className="pg-sidebar">
          <p className="pg-sidebar-title">CATEGORIES</p>
          <ul className="pg-sidebar-list">
            <li>
              <label className="pg-sidebar-item">
                <input
                  type="radio"
                  name="cat"
                  checked={activeCategory === 'all'}
                  onChange={() => setActiveCategory('all')}
                />
                <span>All Products</span>
                <span className="pg-sidebar-count">{PRODUCTS.length}</span>
              </label>
            </li>
            {CATEGORIES.map(cat => (
              <li key={cat.id}>
                <label className="pg-sidebar-item">
                  <input
                    type="radio"
                    name="cat"
                    checked={activeCategory === cat.id}
                    onChange={() => setActiveCategory(cat.id)}
                  />
                  <span>{cat.name}</span>
                  <span className="pg-sidebar-count">
                    {PRODUCTS.filter(p => p.categoryId === cat.id).length}
                  </span>
                </label>
              </li>
            ))}
          </ul>
        </aside>

        {/* ── Main Content ──────────────────────────────────── */}
        <div className="pg-main">
          {/* Category tabs – 7 consolidated groups */}
          <div ref={tabsRef} className="pg-tabs" role="tablist">
            <button
              role="tab"
              className={`pg-tab ${activeCategory === 'all' ? 'active' : ''}`}
              onClick={() => setActiveCategory('all')}
            >
              ALL PRODUCTS
            </button>
            {GROUPED_CATEGORIES.map(group => {
              const isActive =
                activeCategory === group.id ||
                group.categoryIds.includes(activeCategory);
              return (
                <button
                  key={group.id}
                  role="tab"
                  className={`pg-tab ${isActive ? 'active' : ''}`}
                  onClick={() => setActiveCategory(group.id)}
                >
                  {group.name.toUpperCase()}
                </button>
              );
            })}
          </div>

          {/* Result count */}
          <p className="pg-result-count">
            {filtered.length} product{filtered.length !== 1 ? 's' : ''} found
          </p>

          {/* Grid */}
          <div ref={gridRef} className="pg-grid">
            {filtered.map(product => (
              <Link
                key={product.id}
                href={`/products/${product.id}`}
                className="pg-card"
                aria-label={product.name}
              >
                {/* Product image or placeholder */}
                <div
                  className="pg-card-thumb"
                  style={{ position: 'relative', background: '#f5f5f7', overflow: 'hidden' }}
                >
                  {product.image ? (
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      sizes="(max-width: 768px) 100vw, 25vw"
                      style={{ objectFit: 'contain', padding: '12px' }}
                    />
                  ) : (
                    <div
                      style={{
                        position: 'absolute',
                        inset: 0,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        background: CATEGORY_COLORS[product.categoryId] ?? '#000',
                      }}
                    >
                      <span className="pg-card-thumb-letter">
                        {product.name.charAt(0)}
                      </span>
                    </div>
                  )}
                  <span className="pg-card-category-badge">{product.category}</span>
                </div>

                {/* Info */}
                <div className="pg-card-body">
                  <p className="pg-card-cat">{product.category}</p>
                  <h3 className="pg-card-name">{product.name}</h3>
                  <p className="pg-card-desc">
                    {product.description.substring(0, 80)}…
                  </p>
                  <div className="pg-card-actions">
                    <button
                      className="pg-card-enquire"
                      onClick={e => handleAddToCart(e, product)}
                      aria-label={`Add ${product.name} to enquiry`}
                    >
                      + Enquire
                    </button>
                    <span className="pg-card-view">View Details →</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {filtered.length === 0 && (
            <div className="pg-empty">
              <p>No products found for &ldquo;{search}&rdquo;</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default function ProductsPage() {
  return (
    <Suspense fallback={
      <div className="pg-page" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '50vh' }}>
        <p>Loading products...</p>
      </div>
    }>
      <ProductsContent />
    </Suspense>
  );
}
