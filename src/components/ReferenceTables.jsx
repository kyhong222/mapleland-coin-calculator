import { MAPLE_POINT_TABLE, RATES, WORLD_COIN_TABLE } from '../data/items.js';
import { comma } from '../lib/format.js';

export default function ReferenceTables({ rates, valid }) {
  const mpp = valid ? comma(rates.mesoPerPoint) : '—';

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

        <div className="ref-card formula">
          <h3>계산 수식</h3>
          <ul>
            <li>
              <b>1 월드코인</b> = 7.5원 <span className="muted">(전 구간 동일)</span>
            </li>
            <li>
              <b>1 메이플포인트</b> = 700코인 × 7.5 ÷ 5,000P = <b>1.05원</b>
            </li>
            <li>
              <b>1 메이플포인트</b> = 교환권 시세 ÷ 10,000 = <b>{mpp}메소</b>
            </li>
            <li>
              <b>아이템 메소가</b> = 아이템 포인트 × <span>{mpp}</span>
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
}
