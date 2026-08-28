import Icon from './Icon.jsx';
import MesoIcon from './MesoIcon.jsx';
import MesoInput from './MesoInput.jsx';
import { VOUCHERS } from '../data/items.js';
import { comma, krw } from '../lib/format.js';

export default function VoucherPanel({
  prices,
  onChangePrice,
  voucherPoints,
  onSelectVoucher,
  rates,
  valid,
}) {
  const rows = VOUCHERS.map((v) => {
    const meso = Number(prices[v.points]) || 0;
    return { ...v, meso, perPoint: meso > 0 ? meso / v.points : 0 };
  });

  // 1P당 단가가 서로 다를 때만 최저가를 표시
  const rated = rows.filter((r) => r.perPoint > 0).map((r) => r.perPoint);
  const best = rated.length > 1 && new Set(rated).size > 1 ? Math.min(...rated) : null;

  return (
    <section className="panel" aria-labelledby="input-title">
      <h2 id="input-title" className="panel-title">
        포인트 교환권 시세 입력
      </h2>

      <div className="voucher-list" role="radiogroup" aria-label="적용할 교환권 선택">
        {rows.map((v) => {
          const active = v.points === voucherPoints;
          return (
            <div
              key={v.points}
              className={`voucher-row${active ? ' active' : ''}`}
              onClick={() => onSelectVoucher(v.points)}
            >
              <input
                type="radio"
                id={`voucher-${v.points}`}
                name="voucher"
                checked={active}
                onChange={() => onSelectVoucher(v.points)}
              />
              <Icon itemId={v.itemId} className="icon-sm" />
              <label className="v-name" htmlFor={`voucher-${v.points}`}>
                {v.label} 교환권
              </label>

              <div className="v-input" onClick={(e) => e.stopPropagation()}>
                <MesoInput
                  digits={prices[v.points] ?? ''}
                  onChange={(d) => onChangePrice(v.points, d)}
                  ariaLabel={`${v.label} 교환권 1장 가격 (메소)`}
                  placeholder="시세 입력"
                />
                <span className="suffix">메소</span>
              </div>

              <div className="v-rate">
                {v.perPoint > 0 ? (
                  <>
                    1P = <MesoIcon />
                    <b>{comma(v.perPoint)}</b>
                    {best !== null && v.perPoint === best && <span className="chip">최저</span>}
                  </>
                ) : (
                  <span className="muted">시세 미입력</span>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {!valid && (
        <p className="help help-warn">
          선택한 교환권의 시세가 비어 있습니다. 시세를 입력하거나 값이 있는 교환권을 선택하세요.
        </p>
      )}

      <div className="stats">
        <Stat label="1 메이플포인트" sub="= 1.05원 고정">
          {valid ? <><MesoIcon />{comma(rates.mesoPerPoint)}</> : '—'}
        </Stat>
        <Stat label="1 월드코인" sub="= 7.5원 고정">
          {valid ? <><MesoIcon />{comma(rates.coinMeso)}</> : '—'}
        </Stat>
        <Stat label="현금 1,000원" sub="포인트 교환권 판매가 기준">
          {valid ? <><MesoIcon />{comma(rates.krw1000Meso)}</> : '—'}
        </Stat>
        <Stat label="100만 메소" sub="포인트 교환권 판매가 기준">
          {valid ? `${krw(rates.millionMesoKrw)}원` : '—'}
        </Stat>
      </div>
    </section>
  );
}

function Stat({ label, sub, children }) {
  return (
    <div className="stat">
      <span className="stat-label">{label}</span>
      <strong>{children}</strong>
      <span className="stat-sub">{sub}</span>
    </div>
  );
}
