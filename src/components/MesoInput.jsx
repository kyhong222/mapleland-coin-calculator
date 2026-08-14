import { useLayoutEffect, useRef } from 'react';
import { digitsOnly, formatDigits } from '../lib/format.js';

/** 천단위 콤마가 붙는 메소 입력창 (콤마 증감에도 커서 위치 유지) */
export default function MesoInput({ id, digits, onChange, ariaLabel, placeholder }) {
  const inputRef = useRef(null);
  const caretRef = useRef(null);
  const display = formatDigits(digits);

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
    onChange(digitsOnly(el.value));
  };

  return (
    <input
      id={id}
      ref={inputRef}
      type="text"
      inputMode="numeric"
      autoComplete="off"
      value={display}
      onChange={handleChange}
      onFocus={(e) => e.target.select()}
      aria-label={ariaLabel}
      placeholder={placeholder}
    />
  );
}
