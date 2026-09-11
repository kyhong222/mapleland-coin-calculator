import Icon from './Icon.jsx';
import MesoIcon from './MesoIcon.jsx';
import { comma, krw } from '../lib/format.js';
import { itemPrice } from '../lib/rates.js';

/** 단위가 있으면 이름 뒤에도 함께 표기: 고성능 확성기(11개) */
export const itemLabel = (item) => (item.unit ? `${item.name}(${item.unit})` : item.name);

export default function ItemCard({ item, mesoPerPoint, valid }) {
  const { meso, krw: won, unitLabel, perUnitMeso, perUnitKrw } = itemPrice(item, mesoPerPoint);
  const label = itemLabel(item);

  return (
    <article className="card">
      <div className="icon-slot">
        <Icon itemId={item.itemId} version={item.iconVersion} scale={item.iconScale} />
        {item.unit && <span className="unit-badge">{item.unit}</span>}
      </div>
      <div className="card-body">
        <div className="card-top">
          <span className="card-name" title={label}>
            {label}
          </span>
          <span className="card-point">{comma(item.point)} 포인트</span>
        </div>
        <div className="card-price">
          <div className="price-meso">
            <MesoIcon />
            {valid ? comma(meso) : '—'}
            {unitLabel && (
              <span className="per-unit">
                ({unitLabel} <MesoIcon />
                {valid ? comma(perUnitMeso) : '—'})
              </span>
            )}
          </div>
          <div className="price-sub">
            ₩ {krw(won)}
            {unitLabel && <span> ({unitLabel} ₩{krw(perUnitKrw)})</span>}
          </div>
        </div>
      </div>
    </article>
  );
}
