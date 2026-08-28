/*
 * 아이템 아이콘은 maplestory.io 에서 가져옵니다.
 *
 *   https://maplestory.io/api/{REGION}/{VERSION}/item/{itemId}/icon
 *
 * kms/384 를 사용합니다. 지정된 id 가 모두 존재하고 아이템명도 한글이라
 * 확인하기 쉽습니다.
 *
 * 원본 아이콘이 작아서(대개 32px 내외) resize 로 확대해 받아옵니다.
 * 픽셀 아트라 CSS 의 image-rendering: pixelated 와 함께 써야 선명합니다.
 */
export const ICON_REGION = 'kms';
export const ICON_VERSION = '384';
export const ICON_RESIZE = 2;

/**
 * maplestory.io 아이템 id → 아이콘 URL. id 가 없으면 null.
 * version 은 기본 버전에 없는 아이템이 생겼을 때만 items.js 의 iconVersion 으로 덮어씁니다.
 * resize 는 더 선명하게 받아야 하는 곳에서만 올려 씁니다.
 */
export function iconUrl(itemId, version = ICON_VERSION, resize = ICON_RESIZE) {
  if (itemId === null || itemId === undefined || itemId === '') return null;
  return (
    `https://maplestory.io/api/${ICON_REGION}/${version}/item/${itemId}/icon` +
    `?resize=${resize}`
  );
}

/**
 * 메소 표기에 쓰는 동전('슈미의 동전').
 *
 * 글자 옆이라 20px 안팎으로 작게 그려지지만, 2~3배 고해상도 화면에서는
 * 60px 가까이 필요하다. 기본 배율(2배=52px)로는 확대돼서 뭉개지므로
 * 4배(104px)로 받아 항상 축소해서 그린다. 늘어나는 용량은 1KB 남짓이고
 * 페이지 전체에서 한 장만 받는다.
 */
export const MESO_ICON_ID = 4031039;
export const MESO_ICON_RESIZE = 4;
export const mesoIconUrl = () => iconUrl(MESO_ICON_ID, ICON_VERSION, MESO_ICON_RESIZE);
