# 메이플랜드 캐시템 메소 환산기

메이플랜드 캐시 아이템을 인게임 재화(메소)로 환산했을 때의 비율을 직관적으로 보여주는 서비스입니다.
**`1만 포인트 교환권` 시세(메소)** 하나만 입력하면 전체 캐시 아이템의 메소가·원화가가 즉시 계산됩니다.

React 18 + Vite 5 로 구성되어 있습니다.

## 실행

```bash
npm install
npm run dev      # 개발 서버 (http://localhost:5173)
npm run build    # 정적 빌드 → dist/
npm run preview  # 빌드 결과 미리보기
```

> Node.js 18 이상이 필요합니다.

## 환율 근거 (첨부 표 기준)

| 단계 | 관계 | 값 |
|---|---|---|
| 월드코인 → 원화 | 모든 충전 구간에서 동일 | **1코인 = 7.5원** |
| 월드코인 → 메이플포인트 | 700코인 = 5,000P | **1P = 700×7.5÷5,000 = 1.05원** |
| 메이플포인트 → 메소 | 1만 포인트 교환권 시세 ÷ 10,000 | **1P = 660메소** (660만 기준, 사용자 입력) |

따라서

```
아이템 메소가 = 아이템 포인트 × (교환권 시세 ÷ 10,000)
아이템 원화가 = 아이템 포인트 × 1.05
```

교환권 시세 660만 메소를 넣으면 첨부 표의 24개 항목 값과 정확히 일치합니다
(예: 펫 12,000P → 7,920,000메소 / ₩12,600).

상단 지표는 반대 방향 환산도 함께 보여줍니다.

- 1 월드코인 = 시세 660만 기준 4,714메소
- 현금 1,000원 = 628,571메소
- 100만 메소 = 1,590.9원

## 구조

```
index.html            Vite 엔트리
vite.config.js
src/
  main.jsx            React 마운트
  App.jsx             상태(시세·검색·정렬·테마) 보유
  styles.css          라이트/다크 테마 스타일
  data/items.js       환율 상수 + 캐시 아이템 목록
  lib/format.js       숫자 표기 유틸
  lib/rates.js        환율 파생 계산 (deriveRates / itemPrice)
  lib/useLocalStorage.js
  components/
    Header.jsx          제목 + 테마 토글
    VoucherPanel.jsx    시세 입력 + 프리셋 + 지표 4종
    Toolbar.jsx         검색 + 정렬
    CategorySection.jsx 카테고리 묶음
    ItemCard.jsx        아이템 카드 (아이콘 폴백 포함)
    ReferenceTables.jsx 월코 참고표 + 수식
public/icons/         실제 아이템 아이콘 PNG 위치
```

## 아이템 추가 / 수정

[src/data/items.js](src/data/items.js)의 `CATEGORIES` 배열만 고치면 됩니다.

```js
{ id: 'hair-coupon', name: '헤어쿠폰', point: 3500, emoji: '💇' }
// bundle: 11 을 넣으면 '개당 메소' 줄이 자동으로 표시됩니다.
```

## 실제 게임 아이콘 적용

현재는 이모지 아이콘으로 표시됩니다. 실제 아이콘 이미지를 쓰려면:

1. `public/icons/` 에 아이템의 `id`와 같은 이름으로 PNG를 넣습니다.
   (예: `public/icons/hair-coupon.png`, `public/icons/pet.png`)
2. [src/data/items.js](src/data/items.js)의 `USE_IMAGE_ICONS` 를 `true` 로 바꿉니다.

파일이 없는 아이템은 자동으로 이모지로 폴백되므로, 아이콘을 하나씩 채워 넣어도 됩니다.

## 기타 기능

- 시세 프리셋 버튼 (500만 ~ 800만)
- 아이템 이름 검색, 가격/이름 정렬
- 입력 시세·검색어·정렬·테마는 `localStorage`에 저장되어 다음 방문 시 복원됩니다

## 참고

메소 시세는 자유시장 상황에 따라 변동합니다. 원화 가치는 캐시샵 고정 환율(1P = 1.05원) 기준의 참고값입니다.
