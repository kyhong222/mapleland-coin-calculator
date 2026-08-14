import { useEffect, useMemo } from 'react';
import Header from './components/Header.jsx';
import VoucherPanel from './components/VoucherPanel.jsx';
import CategorySection from './components/CategorySection.jsx';
import ReferenceTables from './components/ReferenceTables.jsx';
import { CATEGORIES, DEFAULT_VOUCHER_POINTS, VOUCHERS } from './data/items.js';
import { deriveRates } from './lib/rates.js';
import { digitsOnly } from './lib/format.js';
import { useLocalStorage } from './lib/useLocalStorage.js';

const prefersDark = () =>
  typeof window !== 'undefined' &&
  window.matchMedia &&
  window.matchMedia('(prefers-color-scheme: dark)').matches;

/* 교환권별 기본 시세. 교환권끼리 정비례하지 않으므로 근거 없는 칸은 비워 둠 */
const DEFAULT_PRICES = Object.fromEntries(
  VOUCHERS.map((v) => [v.points, v.defaultMeso === null ? '' : String(v.defaultMeso)])
);

export default function App() {
  const [pricesRaw, setPricesRaw] = useLocalStorage(
    'ml-voucher-prices',
    JSON.stringify(DEFAULT_PRICES)
  );
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

  /* 교환권별 입력값 (항상 VOUCHERS 전체 키를 갖는 숫자 문자열 맵) */
  const prices = useMemo(() => {
    let saved = {};
    try {
      const parsed = JSON.parse(pricesRaw);
      if (parsed && typeof parsed === 'object') saved = parsed;
    } catch {
      /* 손상된 값은 기본값으로 */
    }
    return Object.fromEntries(
      VOUCHERS.map((v) => [
        v.points,
        digitsOnly(saved[v.points] ?? DEFAULT_PRICES[v.points]),
      ])
    );
  }, [pricesRaw]);

  /* 값을 입력한 교환권을 곧바로 적용 대상으로 삼음 */
  const handleChangePrice = (points, digits) => {
    setPricesRaw(JSON.stringify({ ...prices, [points]: digitsOnly(digits) }));
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

        <ReferenceTables rates={rates} valid={voucherMeso > 0} voucherPoints={voucherPoints} />

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
