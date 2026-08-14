import { useEffect, useMemo } from 'react';
import Header from './components/Header.jsx';
import VoucherPanel from './components/VoucherPanel.jsx';
import Toolbar from './components/Toolbar.jsx';
import CategorySection from './components/CategorySection.jsx';
import ReferenceTables from './components/ReferenceTables.jsx';
import { CATEGORIES, RATES } from './data/items.js';
import { deriveRates } from './lib/rates.js';
import { digitsOnly } from './lib/format.js';
import { useLocalStorage } from './lib/useLocalStorage.js';

const prefersDark = () =>
  typeof window !== 'undefined' &&
  window.matchMedia &&
  window.matchMedia('(prefers-color-scheme: dark)').matches;

export default function App() {
  const [voucherDigits, setVoucherDigits] = useLocalStorage(
    'ml-voucher-meso',
    String(RATES.DEFAULT_VOUCHER_MESO)
  );
  const [theme, setTheme] = useLocalStorage('ml-theme', prefersDark() ? 'dark' : 'light');
  const [query, setQuery] = useLocalStorage('ml-query', '');
  const [sort, setSort] = useLocalStorage('ml-sort', 'default');

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  const voucherMeso = Number(digitsOnly(voucherDigits)) || 0;
  const rates = useMemo(() => deriveRates(voucherMeso), [voucherMeso]);

  const categories = useMemo(() => {
    const q = query.trim().toLowerCase();
    const sorters = {
      'meso-asc': (a, b) => a.point - b.point,
      'meso-desc': (a, b) => b.point - a.point,
      name: (a, b) => a.name.localeCompare(b.name, 'ko'),
    };
    return CATEGORIES.map((cat) => {
      const items = cat.items.filter((it) => !q || it.name.toLowerCase().includes(q));
      return { ...cat, items: sorters[sort] ? [...items].sort(sorters[sort]) : items };
    }).filter((cat) => cat.items.length > 0);
  }, [query, sort]);

  return (
    <>
      <Header theme={theme} onToggleTheme={() => setTheme(theme === 'dark' ? 'light' : 'dark')} />
      <main className="wrap">
        <VoucherPanel
          digits={voucherDigits}
          onChangeDigits={setVoucherDigits}
          voucherMeso={voucherMeso}
          rates={rates}
        />

        <Toolbar query={query} onQuery={setQuery} sort={sort} onSort={setSort} />

        {categories.map((cat) => (
          <CategorySection key={cat.id} category={cat} rates={rates} valid={voucherMeso > 0} />
        ))}
        {categories.length === 0 && <p className="empty">검색 결과가 없습니다.</p>}

        <ReferenceTables rates={rates} valid={voucherMeso > 0} />

        <footer className="foot">
          <p>
            메소 시세는 자유시장 상황에 따라 달라집니다. 원화 가치는 캐시샵 고정 환율(1P = 1.05원)
            기준입니다.
          </p>
        </footer>
      </main>
    </>
  );
}
