import ItemCard from './ItemCard.jsx';

export default function CategorySection({ category, rates, valid }) {
  return (
    <section className="category">
      <div className="cat-head">
        <h2>{category.name}</h2>
        <span className="count">{category.items.length}종</span>
      </div>
      <div className="item-list">
        {category.items.map((item) => (
          <ItemCard key={item.id} item={item} mesoPerPoint={rates.mesoPerPoint} valid={valid} />
        ))}
      </div>
    </section>
  );
}
