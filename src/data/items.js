/*
 * 메이플랜드 캐시템 ↔ 메소 환율 데이터
 *
 * [고정 환율 근거]
 *  1) 월드코인 → 원화 : 모든 구간에서 1코인 = 7.5원
 *       400코인/3,000원, 800/6,000, 1,600/12,000, 3,600/27,000,
 *       6,400/48,000, 13,200/99,000, 26,000/195,000, 66,000/495,000
 *  2) 월드코인 → 메이플포인트 : 700코인 = 5,000포인트
 *       → 1포인트 = (700 × 7.5) / 5,000 = 1.05원
 *  3) 메이플포인트 → 메소 : 1만 포인트 교환권 시세(사용자 입력) / 10,000
 *       → 660만 메소 기준 1포인트 = 660메소
 */

export const RATES = {
  WORLD_COIN_TO_KRW: 7.5, // 월드코인 1개당 원화
  POINT_TO_KRW: 1.05, // 메이플포인트 1P당 원화
};

/*
 * 시세를 입력할 교환권 종류
 *
 * 교환권끼리 시세가 정비례하지 않으므로 서로의 값을 유추하지 않습니다.
 * defaultMeso 는 근거가 있는 값(1만 = 660만)만 채워두고, 나머지는 비워서
 * 사용자가 직접 넣도록 둡니다.
 */
export const VOUCHERS = [
  { points: 5000, label: '5천 포인트', defaultMeso: null },
  { points: 10000, label: '1만 포인트', defaultMeso: 6600000 },
  { points: 30000, label: '3만 포인트', defaultMeso: null },
];

export const DEFAULT_VOUCHER_POINTS = 10000;

/* 월드코인 → 원화 충전 구간 (참고표) */
export const WORLD_COIN_TABLE = [
  { coin: 400, krw: 3000 },
  { coin: 800, krw: 6000 },
  { coin: 1600, krw: 12000 },
  { coin: 3600, krw: 27000 },
  { coin: 6400, krw: 48000 },
  { coin: 13200, krw: 99000 },
  { coin: 26000, krw: 195000 },
  { coin: 66000, krw: 495000 },
];

/* 월드코인 → 메이플포인트 교환 구간 (참고표) */
export const MAPLE_POINT_TABLE = [
  { coin: 700, point: 5000 },
  { coin: 1400, point: 10000 },
  { coin: 4200, point: 30000 },
];

/*
 * 캐시 아이템 목록
 *  id     : 아이템 식별자
 *  point  : 캐시샵 판매가 (메이플포인트)
 *  bundle : 묶음 수량 (표시에는 쓰지 않는 참고용 메타데이터)
 *  icon   : 아이콘 지정. 아직 미지정이라 전부 null 이며, 지정 전에는 빈 자리로 표시됩니다.
 *           - 'pet.png'  → public/icons/pet.png
 *           - 'https://...' 또는 'data:image/...' → 그대로 사용
 */
export const CATEGORIES = [
  {
    id: 'pet',
    name: '펫',
    items: [
      { id: 'pet', name: '펫', point: 12000, icon: null },
      { id: 'pet-equip', name: '펫 전용 장비', point: 6000, icon: null },
      { id: 'creature', name: '생명의 물', point: 4500, icon: null },
      { id: 'premium-creature', name: '프리미엄 생명의 물', point: 14500, icon: null },
      { id: 'pet-skill', name: '펫 버프 자동스킬', point: 9000, icon: null },
    ],
  },
  {
    id: 'cosmetic',
    name: '꾸미기',
    items: [
      { id: 'hair-coupon', name: '헤어 쿠폰', point: 3500, icon: null },
      { id: 'idol-hair-coupon', name: '아이돌 헤어 쿠폰', point: 6900, icon: null },
      { id: 'royal-hair-coupon', name: '로얄 헤어 쿠폰', point: 7900, icon: null },
      { id: 'plastic-coupon', name: '성형 쿠폰', point: 2500, icon: null },
      { id: 'skin-coupon', name: '스킨케어 쿠폰', point: 3000, icon: null },
      { id: 'dye-coupon', name: '염색 쿠폰', point: 2000, icon: null },
      { id: 'color-lens', name: '1회용 컬러렌즈', point: 1000, icon: null },
      { id: 'emotion', name: '감정표현', point: 2500, icon: null },
    ],
  },
  {
    id: 'consume',
    name: '소비',
    items: [
      { id: 'megaphone', name: '고성능 확성기', point: 750, icon: null },
      { id: 'megaphone-11', name: '고성능 확성기(11개)', point: 7500, bundle: 11, icon: null },
      { id: 'item-megaphone', name: '아이템 확성기', point: 900, icon: null },
      { id: 'item-megaphone-11', name: '아이템 확성기(11개)', point: 9000, bundle: 11, icon: null },
      { id: 'summon', name: '뿌리기', point: 1000, icon: null },
      { id: 'summon-11', name: '뿌리기(11개)', point: 10000, bundle: 11, icon: null },
      { id: 'safety-charm-10', name: '호신부적(10개)', point: 6000, bundle: 10, icon: null },
      { id: 'return-scroll', name: '고성능 순간이동의 돌', point: 900, icon: null },
      { id: 'ap-reset', name: 'AP초기화', point: 12000, icon: null },
      { id: 'sp-reset', name: 'SP초기화', point: 9750, icon: null },
      { id: 'slot-expand', name: '선택슬롯', point: 3750, icon: null },
      { id: 'premium-wedding-ticket', name: '프리미엄 결혼식 티켓', point: 19800, icon: null },
    ],
  },
];
