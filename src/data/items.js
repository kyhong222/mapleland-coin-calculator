/*
 * 메이플랜드 캐시템 ↔ 메소 환율 데이터
 *
 * [고정 환율 근거]
 *  1) 월드코인 → 원화 : 모든 구간에서 1코인 = 7.5원
 *       400코인/3,000원, 800/6,000, 1,600/12,000, 3,600/27,000,
 *       6,400/48,000, 13,200/99,000, 26,000/195,000, 66,000/495,000
 *  2) 월드코인 → 메이플포인트 : 700코인 = 5,000포인트
 *       → 1포인트 = (700 × 7.5) / 5,000 = 1.05원
 *  3) 메이플포인트 → 메소 : 교환권 시세(사용자 입력) / 교환권 포인트
 *       → 1만 포인트 교환권 660만 메소 기준 1포인트 = 660메소
 */

export const RATES = {
  WORLD_COIN_TO_KRW: 7.5, // 월드코인 1개당 원화
  POINT_TO_KRW: 1.05, // 메이플포인트 1P당 원화
};

/*
 * 시세를 입력할 교환권 종류
 *
 * defaultMeso 는 사용자가 아무것도 입력하지 않았을 때 쓰는 기본 시세입니다.
 * 사용자가 값을 넣으면 그 값이 localStorage 에 저장되고 기본값보다 우선합니다.
 */
export const VOUCHERS = [
  { points: 5000, label: '5천 포인트', defaultMeso: 3500000, itemId: 5680148 },
  { points: 10000, label: '1만 포인트', defaultMeso: 7000000, itemId: 5680149 },
  { points: 30000, label: '3만 포인트', defaultMeso: 21000000, itemId: 5680150 },
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
 *  id     : 앱 내부 식별자
 *  point  : 캐시샵 판매가 (메이플포인트)
 *  unit   : 수량·기간 단위(11개, 30일 등). 아이콘 우측 상단 배지로 표시
 *  itemId : maplestory.io 아이템 id. 이 값으로 아이콘을 가져옵니다.
 *             https://maplestory.io/api/kms/384/item/{itemId}/icon
 *           null 이면 빈 아이콘 자리로 표시됩니다.
 *  iconVersion : 기본 버전(kms/384)에 없는 아이템이 생겼을 때만 쓰는 예외 버전
 */
export const CATEGORIES = [
  {
    id: 'pet',
    name: '펫',
    items: [
      { id: 'pet', name: '펫', point: 12000, itemId: 5000001 },
      { id: 'pet-equip', name: '펫 전용 장비', point: 6000, itemId: 1802000 },
      { id: 'creature', name: '생명의 물', point: 4500, itemId: 5180000 },
      { id: 'premium-creature', name: '프리미엄 생명의 물', point: 14500, itemId: 5689000 },
      { id: 'pet-skill', name: '펫 버프 자동스킬', point: 9000, itemId: 5190010 },
    ],
  },
  {
    id: 'cosmetic',
    name: '꾸미기',
    items: [
      { id: 'msw-cody-ring', name: 'MSW 코디 반지', point: 7500, unit: '30일', itemId: 1112202 },
      { id: 'msw-cody-ring-90', name: 'MSW 코디 반지', point: 20250, unit: '90일', itemId: 1112202 },
      { id: 'hair-coupon', name: '헤어 쿠폰', point: 3500, itemId: 5150001 },
      { id: 'idol-hair-coupon', name: '아이돌 헤어 쿠폰', point: 6900, itemId: 5150038 },
      { id: 'royal-hair-coupon', name: '로얄 헤어 쿠폰', point: 7900, itemId: 5150040 },
      {
        id: 'special-royal-hair-coupon',
        name: '스페셜 로얄 헤어 쿠폰',
        point: 7900,
        itemId: 5150044,
      },
      { id: 'plastic-coupon', name: '성형 쿠폰', point: 2500, itemId: 5152024 },
      { id: 'skin-coupon', name: '스킨케어 쿠폰', point: 3000, itemId: 5153000 },
      { id: 'dye-coupon', name: '염색 쿠폰', point: 2000, itemId: 5151001 },
      { id: 'color-lens', name: '1회용 컬러렌즈', point: 1000, itemId: 5152100 },
      { id: 'emotion', name: '감정표현', point: 2500, itemId: 5160007 },
    ],
  },
  {
    id: 'consume',
    name: '소비',
    items: [
      { id: 'megaphone', name: '고성능 확성기', point: 750, itemId: 5072000 },
      { id: 'megaphone-11', name: '고성능 확성기', point: 7500, unit: '11개', itemId: 5072000 },
      { id: 'item-megaphone', name: '아이템 확성기', point: 900, itemId: 5076000 },
      { id: 'item-megaphone-11', name: '아이템 확성기', point: 9000, unit: '11개', itemId: 5076000 },
      { id: 'summon', name: '뿌리기', point: 1000, itemId: 5120004 },
      { id: 'summon-11', name: '뿌리기', point: 10000, unit: '11개', itemId: 5120004 },
      { id: 'safety-charm-10', name: '호신부적', point: 6000, unit: '10개', itemId: 5130000 },
      { id: 'return-scroll', name: '고성능 순간이동의 돌', point: 900, itemId: 5041000 },
      {
        id: 'return-scroll-5',
        name: '고성능 순간이동의 돌',
        point: 4500,
        unit: '5개',
        itemId: 5041000,
      },
      {
        id: 'return-scroll-11',
        name: '고성능 순간이동의 돌',
        point: 9900,
        unit: '11개',
        itemId: 5041000,
      },
      { id: 'myomyo', name: '보따리상인 묘묘', point: 300, itemId: 5450000 },
      { id: 'myomyo-11', name: '보따리상인 묘묘', point: 3000, unit: '11개', itemId: 5450000 },
      { id: 'ap-reset', name: 'AP초기화', point: 12000, itemId: 5050100 },
      { id: 'sp-reset', name: 'SP초기화', point: 9750, itemId: 5051001 },
      { id: 'slot-expand', name: '선택 슬롯 4칸 확장권', point: 3750, itemId: 3801189 },
      { id: 'premium-wedding-ticket', name: '프리미엄 결혼식 티켓', point: 19800, itemId: 5251006 },
    ],
  },
];
