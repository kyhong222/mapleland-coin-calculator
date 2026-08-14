import { MAPLE_POINT_TABLE, RATES, WORLD_COIN_TABLE } from '../data/items.js';
import { comma } from '../lib/format.js';

export default function ReferenceTables() {
  return (
    <section className="panel refs" aria-labelledby="ref-title">
      <h2 id="ref-title" className="panel-title">
        환전 참고표 <span className="badge">고정값</span>
      </h2>

      <div className="ref-grid">
        <div className="ref-card">
          <h3>월코 → 원화</h3>
          <table className="ref-table">
            <thead>
              <tr>
                <th>월드코인</th>
                <th>원화</th>
                <th>1코인당</th>
              </tr>
            </thead>
            <tbody>
              {WORLD_COIN_TABLE.map((r) => (
                <tr key={r.coin}>
                  <td>{comma(r.coin)}</td>
                  <td>{comma(r.krw)}원</td>
                  <td>₩{r.krw / r.coin}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="ref-card">
          <h3>월코 → 메포</h3>
          <table className="ref-table">
            <thead>
              <tr>
                <th>월드코인</th>
                <th>메이플포인트</th>
                <th>원화</th>
                <th>1P당</th>
              </tr>
            </thead>
            <tbody>
              {MAPLE_POINT_TABLE.map((r) => {
                const won = r.coin * RATES.WORLD_COIN_TO_KRW;
                return (
                  <tr key={r.coin}>
                    <td>{comma(r.coin)}</td>
                    <td>{comma(r.point)}</td>
                    <td>{comma(won)}원</td>
                    <td>₩{won / r.point}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

      </div>
    </section>
  );
}
