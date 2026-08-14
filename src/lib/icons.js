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
 */
export function iconUrl(itemId, version = ICON_VERSION) {
  if (itemId === null || itemId === undefined || itemId === '') return null;
  return (
    `https://maplestory.io/api/${ICON_REGION}/${version}/item/${itemId}/icon` +
    `?resize=${ICON_RESIZE}`
  );
}
