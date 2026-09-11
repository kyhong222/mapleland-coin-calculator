import { useState } from 'react';
import { iconUrl } from '../lib/icons.js';

/**
 * maplestory.io 아이템 아이콘.
 * itemId 미지정이거나 이미지를 못 받아오면 빈 자리(점선)만 남깁니다.
 *
 * scale 은 원본 PNG 안에서 그림이 차지하는 비율이 유독 작은 아이템에만 씁니다.
 * object-fit:contain 은 투명 여백까지 포함해 맞추므로 그런 아이템은 혼자 작아 보입니다.
 *
 * 배율을 줄 때는 안쪽 여백(7px)을 빼서 확대할 자리를 만듭니다. 박스를 넘는 만큼은
 * .icon 의 overflow 로 잘리지만, 애초에 잘려나가는 부분이 원본의 투명 여백이라
 * 그림 자체는 웬만한 배율까지 온전히 보입니다.
 */
export default function Icon({ itemId, version, scale, className = '' }) {
  const [failed, setFailed] = useState(false);
  const src = iconUrl(itemId, version);
  const cls = className ? `icon ${className}` : 'icon';

  if (!src || failed) return <span className={`${cls} icon-empty`} aria-hidden="true" />;

  return (
    <span className={cls} aria-hidden="true">
      <img
        src={src}
        alt=""
        loading="lazy"
        decoding="async"
        style={scale ? { padding: 0, transform: `scale(${scale})` } : undefined}
        onError={() => setFailed(true)}
      />
    </span>
  );
}
