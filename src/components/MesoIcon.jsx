import { mesoIconUrl } from '../lib/icons.js';

/**
 * 메소 표기에 쓰는 동전 아이콘.
 * maplestory.io 의 '슈미의 동전'(4031039) 이 인게임 메소 동전 스프라이트다.
 *
 * 크기를 em 으로 잡아서 감싼 글자 크기를 따라간다.
 * alt 를 '메소' 로 둬서 이미지가 안 떠도, 스크린리더에서도 단위가 읽힌다.
 */
export default function MesoIcon() {
  return <img className="meso-icon" src={mesoIconUrl()} alt="메소" />;
}
