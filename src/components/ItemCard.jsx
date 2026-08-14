import { useState } from 'react';
import { comma, krw } from '../lib/format.js';
import { itemPrice } from '../lib/rates.js';

/** icon 값을 실제 URL 로 해석 (파일명이면 public/icons/ 기준) */
function iconUrl(icon) {
  if (!icon) return null;
  if (/^(https?:)?\/\//.test(icon) || icon.startsWith('data:') || icon.startsWith('/')) return icon;
  return `${import.meta.env.BASE_URL}icons/${icon}`;
}

function ItemIcon({ item }) {
  const [failed, setFailed] = useState(false);
  const src = iconUrl(item.icon);

  // 아이콘 미지정(또는 로드 실패) 시 빈 자리만 유지
  if (!src || failed) return <span className="icon icon-empty" aria-hidden="true" />;

  return (
    <span className="icon">
      <img src={src} alt="" onError={() => setFailed(true)} />
    </span>
  );
}

export default function ItemCard({ item, mesoPerPoint, valid }) {
  const { meso, krw: won } = itemPrice(item, mesoPerPoint);

  return (
    <article className="card">
      <ItemIcon item={item} />
      <div className="card-body">
        <div className="card-top">
          <span className="card-name" title={item.name}>
            {item.name}
          </span>
          <span className="card-point">{comma(item.point)} 포인트</span>
        </div>
        <div className="card-price">
          <div className="price-meso">
            {valid ? comma(meso) : '—'}
            <span className="unit">메소</span>
          </div>
          <div className="price-sub">₩ {krw(won)}</div>
        </div>
      </div>
    </article>
  );
}
