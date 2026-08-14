아이템 아이콘 이미지를 이 폴더에 넣고, src/data/items.js 의 각 아이템 icon 값에 파일명을 적으면 됩니다.

  { id: 'pet', name: '펫', point: 12000, icon: 'pet.png' }   → public/icons/pet.png

외부 URL 이나 data URI 를 그대로 넣어도 됩니다.

  icon: 'https://example.com/pet.png'

icon 이 null 이거나 이미지 로드에 실패하면 카드에 빈 아이콘 자리만 표시됩니다.
