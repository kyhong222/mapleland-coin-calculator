/* 숫자 표기 유틸 */

export const digitsOnly = (s) => String(s).replace(/[^0-9]/g, '');

/** 정수 + 천단위 콤마 (메소 표기) */
export const comma = (n) => Math.round(n).toLocaleString('ko-KR');

/** 소수점 1자리까지 (원화 표기: 787.5원) */
export const krw = (n) => n.toLocaleString('ko-KR', { maximumFractionDigits: 1 });

/** 입력창용: 숫자만 남기고 앞의 0 제거 후 콤마 삽입 */
export function formatDigits(digits) {
  const clean = digitsOnly(digits).replace(/^0+(?=\d)/, '');
  return clean ? Number(clean).toLocaleString('ko-KR') : '';
}
