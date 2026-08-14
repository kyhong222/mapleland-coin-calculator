import { VOUCHERS } from '../data/items.js';
import { digitsOnly } from './format.js';

/* 교환권별 기본 시세 (사용자 입력이 없을 때 사용) */
export const DEFAULT_PRICES = Object.fromEntries(
  VOUCHERS.map((v) => [v.points, v.defaultMeso === null ? '' : String(v.defaultMeso)])
);

/** localStorage 문자열 → 저장된 입력값 객체. 손상된 값은 빈 객체로 */
export function parseSaved(raw) {
  try {
    const parsed = JSON.parse(raw);
    if (parsed && typeof parsed === 'object' && !Array.isArray(parsed)) return parsed;
  } catch {
    /* 무시하고 기본값 사용 */
  }
  return {};
}

/**
 * 최종 표시값 = 사용자가 입력한 적 있는 교환권은 저장값, 나머지는 기본 시세.
 *
 * 저장 객체에는 사용자가 건드린 키만 들어 있습니다. 그래서 값을 지워 빈칸으로
 * 둔 것("")과 아예 입력한 적 없는 것(키 없음)이 구분되고, 코드의 기본 시세를
 * 나중에 바꾸면 건드린 적 없는 칸에는 그대로 반영됩니다.
 */
export function resolvePrices(saved) {
  return Object.fromEntries(
    VOUCHERS.map((v) => {
      const key = String(v.points);
      const hasInput = saved && Object.prototype.hasOwnProperty.call(saved, key);
      return [v.points, hasInput ? digitsOnly(saved[key]) : DEFAULT_PRICES[v.points]];
    })
  );
}
