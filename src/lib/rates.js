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

/** 아이템 1개(묶음이면 묶음 전체)의 메소가 / 원화가 */
export function itemPrice(item, mesoPerPoint) {
  return {
    meso: item.point * mesoPerPoint,
    krw: item.point * RATES.POINT_TO_KRW,
  };
}
