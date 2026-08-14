import { useState } from 'react';
import { USE_IMAGE_ICONS } from '../data/items.js';
import { comma, krw } from '../lib/format.js';
import { itemPrice } from '../lib/rates.js';

function ItemIcon({ item }) {
  const [failed, setFailed] = useState(false);
  const showImage = USE_IMAGE_ICONS && !failed;

  return (
    <span className="icon" aria-hidden="true">
      {showImage ? (
        <img
          src={`${import.meta.env.BASE_URL}icons/${item.id}.png`}
          alt=""
          onError={() => setFailed(true)}
        />
      ) : (
        item.emoji
      )}
    </span>
  );
}

export default function ItemCard({ item, mesoPerPoint, valid }) {
  const { meso, krw: won, perUnitMeso } = itemPrice(item, mesoPerPoint);

  return (
    <article className="card">
      <div className="card-head">
        <ItemIcon item={item} />
        <div>
          <div className="card-name">{item.name}</div>
          <div className="card-point">{comma(item.point)} 포인트</div>
        </div>
      </div>
      <div className="card-body">
        <div className="price-meso">
          {valid ? comma(meso) : '—'}
          <span className="unit">메소</span>
        </div>
        <div className="price-krw">₩ {krw(won)}</div>
        {perUnitMeso !== null && (
          <div className="per-unit">개당 {valid ? comma(perUnitMeso) : '—'} 메소</div>
        )}
      </div>
    </article>
  );
}
