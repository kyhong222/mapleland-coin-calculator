import Icon from './Icon.jsx';
import { comma, krw } from '../lib/format.js';
import { itemPrice } from '../lib/rates.js';

export default function ItemCard({ item, mesoPerPoint, valid }) {
  const { meso, krw: won } = itemPrice(item, mesoPerPoint);

  return (
    <article className="card">
      <Icon itemId={item.itemId} version={item.iconVersion} />
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
