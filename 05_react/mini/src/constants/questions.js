/**
 * 축당 3문항, 총 12문항.
 * pole: 'first' = E/S/T/J, 'second' = I/N/F/P
 */
export const QUESTIONS = [
  // ── E / I ──────────────────────────────
  {
    id: 1,
    axis: 'EI',
    text: '영화는 어떻게 보는 게 제일 좋아?',
    options: [
      { label: '친구들이랑 왁자지껄 극장에서!', pole: 'first' },
      { label: '집에서 혼자 이불 덮고 조용히', pole: 'second' },
    ],
  },
  {
    id: 2,
    axis: 'EI',
    text: '영화를 다 보고 나면 나는…',
    options: [
      { label: '바로 누군가에게 감상을 얘기하고 싶다', pole: 'first' },
      { label: '혼자 여운을 곱씹는 시간이 필요하다', pole: 'second' },
    ],
  },
  {
    id: 3,
    axis: 'EI',
    text: '더 끌리는 영화 속 주인공은?',
    options: [
      { label: '사람들을 이끄는 에너지 넘치는 주인공', pole: 'first' },
      { label: '조용하지만 깊은 내면을 가진 주인공', pole: 'second' },
    ],
  },
  // ── S / N ──────────────────────────────
  {
    id: 4,
    axis: 'SN',
    text: '더 재밌게 보는 영화는?',
    options: [
      { label: '현실에 있을 법한 생생한 이야기', pole: 'first' },
      { label: '상상력이 폭발하는 판타지·SF 세계관', pole: 'second' },
    ],
  },
  {
    id: 5,
    axis: 'SN',
    text: '영화를 볼 때 나는…',
    options: [
      { label: '디테일한 장면과 소품, 액션에 집중한다', pole: 'first' },
      { label: '숨은 의미와 상징, 떡밥을 찾는다', pole: 'second' },
    ],
  },
  {
    id: 6,
    axis: 'SN',
    text: '열린 결말 영화를 보면?',
    options: [
      { label: '답답해… 확실하게 끝나는 게 좋아', pole: 'first' },
      { label: '오히려 좋아. 내 마음대로 상상할 수 있잖아', pole: 'second' },
    ],
  },
  // ── T / F ──────────────────────────────
  {
    id: 7,
    axis: 'TF',
    text: '영화 속 설정 오류를 발견하면?',
    options: [
      { label: '거슬린다. 개연성이 무너지면 몰입이 깨짐', pole: 'first' },
      { label: '감동적이면 됐지, 그게 뭐가 중요해', pole: 'second' },
    ],
  },
  {
    id: 8,
    axis: 'TF',
    text: '슬픈 장면에서 옆 사람이 펑펑 울면?',
    options: [
      { label: '왜 우는지 궁금하다 (나는 담담)', pole: 'first' },
      { label: '따라서 눈물이 난다', pole: 'second' },
    ],
  },
  {
    id: 9,
    axis: 'TF',
    text: '영화를 고르는 기준은?',
    options: [
      { label: '평점, 수상 이력, 감독의 연출력', pole: 'first' },
      { label: '지금 내 기분에 와닿을 것 같은 느낌', pole: 'second' },
    ],
  },
  // ── J / P ──────────────────────────────
  {
    id: 10,
    axis: 'JP',
    text: '오늘 밤 영화를 본다면?',
    options: [
      { label: '미리 골라둔 위시리스트에서 하나 픽', pole: 'first' },
      { label: '그때그때 끌리는 걸로 즉흥 선택', pole: 'second' },
    ],
  },
  {
    id: 11,
    axis: 'JP',
    text: '영화 보다가 재미없으면?',
    options: [
      { label: '시작했으면 끝까지 본다', pole: 'first' },
      { label: '바로 끄고 다른 거 튼다', pole: 'second' },
    ],
  },
  {
    id: 12,
    axis: 'JP',
    text: '시리즈물(3부작)을 보는 방식은?',
    options: [
      { label: '1편부터 순서대로 정주행', pole: 'first' },
      { label: '끌리는 편부터 자유롭게', pole: 'second' },
    ],
  },
]
