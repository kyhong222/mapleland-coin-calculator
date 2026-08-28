import { RATES } from '../data/items.js';

/**
 * 선택한 교환권의 시세(메소)로부터 파생 환율을 계산합니다.
 *
 *   1 메이플포인트 = 교환권 시세 / 교환권 포인트 메소   (= 1.05원 고정)
 *   1 월드코인     = 7.5원 = (7.5 / 1.05) 포인트
 *
 * @param voucherMeso   교환권 1장의 메소 시세
 * @param voucherPoints 교환권 1장의 포인트 (5,000 / 10,000 / 30,000)
 */
export function deriveRates(voucherMeso, voucherPoints) {
  const mesoPerPoint = voucherPoints > 0 ? voucherMeso / voucherPoints : 0;
  return {
    mesoPerPoint,
    /** 월드코인 1개의 메소 가치 */
    coinMeso: (RATES.WORLD_COIN_TO_KRW / RATES.POINT_TO_KRW) * mesoPerPoint,
    /** 현금 1,000원의 메소 가치 */
    krw1000Meso: (1000 / RATES.POINT_TO_KRW) * mesoPerPoint,
    /** 100만 메소의 원화 가치 */
    millionMesoKrw: mesoPerPoint ? (1000000 / mesoPerPoint) * RATES.POINT_TO_KRW : 0,
  };
}

/**
 * 단위 문자열을 나눗셈에 쓸 수 있게 분해합니다.
 *
 *   '11개' → { count: 11, label: '1개당' }   묶음 상품 → 개당 단가
 *   '30일' → { count: 30, label: '1일당' }   기간제 상품 → 하루당 단가
 *
 * 단위가 없거나 수량이 1이면(나눌 의미가 없으면) null 을 돌려줍니다.
 */
export function parseUnit(unit) {
  const m = typeof unit === 'string' ? unit.trim().match(/^(\d+)\s*(개|일)$/) : null;
  if (!m) return null;
  const count = Number(m[1]);
  if (!Number.isFinite(count) || count <= 1) return null;
  return { count, label: `1${m[2]}당` };
}

/**
 * 아이템 1개(묶음이면 묶음 전체)의 메소가 / 원화가.
 * 묶음·기간제 상품은 단위당 단가도 함께 돌려줍니다.
 */
export function itemPrice(item, mesoPerPoint) {
  const meso = item.point * mesoPerPoint;
  const krw = item.point * RATES.POINT_TO_KRW;
  const unit = parseUnit(item.unit);

  return {
    meso,
    krw,
    /** '1개당' / '1일당' — 단위가 없으면 null */
    unitLabel: unit ? unit.label : null,
    perUnitMeso: unit ? meso / unit.count : null,
    perUnitKrw: unit ? krw / unit.count : null,
  };
}
