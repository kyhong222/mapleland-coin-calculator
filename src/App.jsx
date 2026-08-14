import { useEffect, useMemo } from 'react';
import { Analytics } from '@vercel/analytics/react';
import Header from './components/Header.jsx';
import VoucherPanel from './components/VoucherPanel.jsx';
import CategorySection from './components/CategorySection.jsx';
import ReferenceTables from './components/ReferenceTables.jsx';
import { CATEGORIES, DEFAULT_VOUCHER_POINTS, VOUCHERS } from './data/items.js';
import { deriveRates } from './lib/rates.js';
import { digitsOnly } from './lib/format.js';
import { parseSaved, resolvePrices } from './lib/prices.js';
import { useLocalStorage } from './lib/useLocalStorage.js';

const prefersDark = () =>
  typeof window !== 'undefined' &&
  window.matchMedia &&
  window.matchMedia('(prefers-color-scheme: dark)').matches;

export default function App() {
  // 사용자가 실제로 입력한 교환권만 담긴다. 나머지는 items.js 의 기본 시세를 씀
  const [pricesRaw, setPricesRaw] = useLocalStorage('ml-voucher-prices-v2', '{}');
  const [voucherPointsRaw, setVoucherPointsRaw] = useLocalStorage(
    'ml-voucher-points',
    String(DEFAULT_VOUCHER_POINTS)
  );
  const [theme, setTheme] = useLocalStorage('ml-theme', prefersDark() ? 'dark' : 'light');

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  // 저장된 값이 손상됐거나 목록에 없는 교환권이면 기본값으로 되돌림
  const voucherPoints = VOUCHERS.some((v) => v.points === Number(voucherPointsRaw))
    ? Number(voucherPointsRaw)
    : DEFAULT_VOUCHER_POINTS;

  /* 저장된 입력값 (사용자가 건드린 교환권만) */
  const savedPrices = useMemo(() => parseSaved(pricesRaw), [pricesRaw]);

  /* 화면에 쓸 최종 시세: 입력값 우선, 없으면 기본 시세 */
  const prices = useMemo(() => resolvePrices(savedPrices), [savedPrices]);

  /* 값을 입력한 교환권을 곧바로 적용 대상으로 삼음 */
  const handleChangePrice = (points, digits) => {
    setPricesRaw(JSON.stringify({ ...savedPrices, [points]: digitsOnly(digits) }));
    setVoucherPointsRaw(String(points));
  };

  const voucherMeso = Number(prices[voucherPoints]) || 0;
  const rates = useMemo(
    () => deriveRates(voucherMeso, voucherPoints),
    [voucherMeso, voucherPoints]
  );

  return (
    <>
      <Header theme={theme} onToggleTheme={() => setTheme(theme === 'dark' ? 'light' : 'dark')} />
      <main className="wrap">
        <VoucherPanel
          prices={prices}
          onChangePrice={handleChangePrice}
          voucherPoints={voucherPoints}
          onSelectVoucher={(points) => setVoucherPointsRaw(String(points))}
          rates={rates}
          valid={voucherMeso > 0}
        />

        <div className="catalog">
          {CATEGORIES.map((cat) => (
            <CategorySection key={cat.id} category={cat} rates={rates} valid={voucherMeso > 0} />
          ))}
        </div>

        <ReferenceTables />
      </main>
      <Analytics />
    </>
  );
}
