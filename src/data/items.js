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
  VOUCHER_POINTS: 10000, // '1만 포인트 교환권' 1장의 포인트
  DEFAULT_VOUCHER_MESO: 6600000, // 기본 시세
};

/* 시세 빠른 선택 버튼 */
export const PRESETS = [
  { label: '500만', value: 5000000 },
  { label: '600만', value: 6000000 },
  { label: '660만', value: 6600000 },
  { label: '700만', value: 7000000 },
  { label: '800만', value: 8000000 },
];

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
 * public/icons/{id}.png 를 채워 넣었다면 true 로 바꾸면 실제 아이콘을 사용합니다.
 * 파일이 없는 아이템은 자동으로 emoji 로 폴백됩니다.
 */
export const USE_IMAGE_ICONS = false;

/*
 * 캐시 아이템 목록
 *  id     : public/icons/{id}.png 아이콘 파일명과 연결
 *  point  : 캐시샵 판매가 (메이플포인트)
 *  bundle : 묶음 수량 (있으면 '개당 메소' 표시)
 */
export const CATEGORIES = [
  {
    id: 'pet',
    name: '펫',
    emoji: '🐾',
    items: [
      { id: 'pet', name: '펫', point: 12000, emoji: '🐶' },
      { id: 'pet-equip', name: '펫장비', point: 6000, emoji: '🎀' },
      { id: 'creature', name: '생물', point: 4500, emoji: '🐣' },
      { id: 'premium-creature', name: '프생물', point: 14500, emoji: '🦄' },
      { id: 'pet-skill', name: '펫스킬(버프)', point: 9000, emoji: '💫' },
    ],
  },
  {
    id: 'cosmetic',
    name: '꾸미기',
    emoji: '💄',
    items: [
      { id: 'hair-coupon', name: '헤어쿠폰', point: 3500, emoji: '💇' },
      { id: 'idol-hair-coupon', name: '아이돌헤어쿠폰', point: 6900, emoji: '🌟' },
      { id: 'royal-hair-coupon', name: '로얄헤어쿠폰', point: 7900, emoji: '👑' },
      { id: 'plastic-coupon', name: '성형쿠폰', point: 2500, emoji: '👤' },
      { id: 'skin-coupon', name: '피부쿠폰', point: 3000, emoji: '🧴' },
      { id: 'dye-coupon', name: '염색쿠폰', point: 2000, emoji: '🎨' },
      { id: 'color-lens', name: '컬러렌즈', point: 1000, emoji: '👁️' },
      { id: 'emotion', name: '감정표현', point: 2500, emoji: '😊' },
    ],
  },
  {
    id: 'consume',
    name: '소비',
    emoji: '🧪',
    items: [
      { id: 'megaphone', name: '고확', point: 750, emoji: '📢' },
      { id: 'megaphone-11', name: '고확(11개)', point: 7500, emoji: '📢', bundle: 11 },
      { id: 'item-megaphone', name: '아확', point: 900, emoji: '📣' },
      { id: 'item-megaphone-11', name: '아확(11개)', point: 9000, emoji: '📣', bundle: 11 },
      { id: 'summon', name: '부리기', point: 1000, emoji: '🔔' },
      { id: 'summon-11', name: '부리기(11개)', point: 10000, emoji: '🔔', bundle: 11 },
      { id: 'safety-charm-10', name: '호신부적(10개)', point: 6000, emoji: '🧧', bundle: 10 },
      { id: 'return-scroll', name: '고순돌(1개)', point: 900, emoji: '🌀' },
      { id: 'ap-reset', name: 'AP초기화', point: 12000, emoji: '🔴' },
      { id: 'sp-reset', name: 'SP초기화', point: 9750, emoji: '🔵' },
      { id: 'slot-expand', name: '선택슬롯', point: 3750, emoji: '🎒' },
    ],
  },
];
