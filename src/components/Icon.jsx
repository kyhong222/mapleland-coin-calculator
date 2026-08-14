import { useState } from 'react';
import { iconUrl } from '../lib/icons.js';

/**
 * maplestory.io 아이템 아이콘.
 * itemId 미지정이거나 이미지를 못 받아오면 빈 자리(점선)만 남깁니다.
 */
export default function Icon({ itemId, version, className = '' }) {
  const [failed, setFailed] = useState(false);
  const src = iconUrl(itemId, version);
  const cls = className ? `icon ${className}` : 'icon';

  if (!src || failed) return <span className={`${cls} icon-empty`} aria-hidden="true" />;

  return (
    <span className={cls} aria-hidden="true">
      <img src={src} alt="" loading="lazy" decoding="async" onError={() => setFailed(true)} />
    </span>
  );
}
