import { useLayoutEffect, useRef } from 'react';
import { PRESETS } from '../data/items.js';
import { comma, digitsOnly, formatDigits, krw } from '../lib/format.js';

export default function VoucherPanel({ digits, onChangeDigits, voucherMeso, rates }) {
  const inputRef = useRef(null);
  const caretRef = useRef(null);
  const display = formatDigits(digits);
  const valid = voucherMeso > 0;

  // 콤마가 삽입/삭제돼도 커서가 같은 숫자 위치에 남도록 복원
  useLayoutEffect(() => {
    const el = inputRef.current;
    if (!el || caretRef.current === null) return;
    const target = caretRef.current;
    caretRef.current = null;
    let pos = 0;
    let seen = 0;
    while (pos < el.value.length && seen < target) {
      if (el.value[pos] >= '0' && el.value[pos] <= '9') seen++;
      pos++;
    }
    el.setSelectionRange(pos, pos);
  }, [display]);

  const handleChange = (e) => {
    const el = e.target;
    caretRef.current = digitsOnly(el.value.slice(0, el.selectionStart ?? 0)).length;
    onChangeDigits(digitsOnly(el.value));
  };

  return (
    <section className="panel" aria-labelledby="input-title">
      <h2 id="input-title" className="panel-title">
        1만 포인트 교환권 시세 입력
      </h2>

      <div className="input-row">
        <div className="field">
          <label htmlFor="voucherInput">
            <span className="ico">🎫</span> 1만 포인트 교환권 <em>1장</em> 가격
          </label>
          <div className="input-wrap">
            <input
              id="voucherInput"
              ref={inputRef}
              type="text"
              inputMode="numeric"
              autoComplete="off"
              value={display}
              onChange={handleChange}
              onFocus={(e) => e.target.select()}
              aria-describedby="voucherHelp"
            />
            <span className="suffix">메소</span>
          </div>
          <p id="voucherHelp" className="help">
            자유시장 시세를 입력하면 아래 모든 값이 즉시 갱신됩니다.
          </p>
        </div>

        <div className="presets" role="group" aria-label="시세 빠른 선택">
          {PRESETS.map((p) => (
            <button
              key={p.value}
              type="button"
              aria-pressed={voucherMeso === p.value}
              onClick={() => onChangeDigits(String(p.value))}
            >
              {p.label}
            </button>
          ))}
        </div>
      </div>

      <div className="stats">
        <Stat label="1 메이플포인트" sub="= 1.05원 고정">
          {valid ? `${comma(rates.mesoPerPoint)} 메소` : '—'}
        </Stat>
        <Stat label="1 월드코인" sub="= 7.5원 고정">
          {valid ? `${comma(rates.coinMeso)} 메소` : '—'}
        </Stat>
        <Stat label="현금 1,000원" sub="현금 → 메소 체감가">
          {valid ? `${comma(rates.krw1000Meso)} 메소` : '—'}
        </Stat>
        <Stat label="100만 메소" sub="메소 → 현금 환산">
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
