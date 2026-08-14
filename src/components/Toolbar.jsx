const SORTS = [
  { value: 'default', label: '기본순' },
  { value: 'meso-asc', label: '메소 낮은순' },
  { value: 'meso-desc', label: '메소 높은순' },
  { value: 'name', label: '이름순' },
];

export default function Toolbar({ query, onQuery, sort, onSort }) {
  return (
    <div className="toolbar">
      <div className="search-wrap">
        <span className="ico">🔍</span>
        <input
          type="search"
          value={query}
          onChange={(e) => onQuery(e.target.value)}
          placeholder="아이템 검색 (예: 헤어, 고확)"
          autoComplete="off"
          aria-label="아이템 검색"
        />
      </div>
      <div className="sort-wrap">
        <label htmlFor="sortSelect">정렬</label>
        <select id="sortSelect" value={sort} onChange={(e) => onSort(e.target.value)}>
          {SORTS.map((s) => (
            <option key={s.value} value={s.value}>
              {s.label}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
