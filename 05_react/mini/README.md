# 씨네타입 (CineType)

MBTI 성향 테스트 형식으로 영화를 추천하는 웹앱. TMDB API 기반, 백엔드 없이 프론트엔드 단독으로 동작.

12개 질문(축당 3문항)으로 16가지 "시네타입"을 판별하고, 타입별 장르 매핑으로 추천 영화를 보여줌. 결과 화면엔 "왜 이 영화를 추천했는지"(어떤 축 점수가 어떤 장르로 매핑됐는지) 근거를 노출하는 게 핵심 차별화 포인트.

## 기술 스택

| 역할               | 라이브러리            |
| ------------------ | --------------------- |
| 라우팅 / 모달 상태 | react-router v8       |
| 클라이언트 상태    | zustand (+ persist)   |
| 서버 데이터 페칭   | @tanstack/react-query |
| 스타일             | Tailwind CSS v4       |

## 시작하기

```bash
npm install
```

`.env` 파일에 TMDB v4 Read Access Token 필요:

```
VITE_TMDB_API_KEY=your_tmdb_read_access_token
```

```bash
npm run dev      # 개발 서버
npm run build    # 프로덕션 빌드
npm run lint     # eslint
```

## 라우트 구조

```
/                                  Home — 인트로, 테스트 시작
/quiz                              Quiz — 12문항 진행
/result/:mbtiType                  Result — 시네타입 + 추천 근거 + 영화 카드 그리드
/result/:mbtiType/movie/:movieId   MovieModal — Result에 중첩 라우트로 오버레이
```

`Result.jsx`의 `<Outlet/>`이 `movie/:movieId` 매칭 시 그 자리에 `MovieModal`을 얹는 구조라, 모달이 떠도 뒷배경(영화 그리드)이 유지되고 새로고침·뒤로가기·링크 공유가 자연스럽게 동작함.

## 폴더 구조

```
src/
├── api/tmdb.js                 TMDB fetch 함수 (discover, detail, videos)
├── hooks/
│   ├── useMovieList.js         타입별 추천 영화 목록 (3페이지 병합 → overview 없는 항목 제외 → 최신순 → 12개)
│   ├── useMovieDetail.js       모달용 상세정보
│   └── useMovieVideos.js       모달용 트레일러(YouTube만 필터)
├── store/useQuizStore.js       zustand — 답변, 진행 인덱스, resultType 계산, localStorage persist
├── constants/
│   ├── questions.js            12문항 데이터 (축당 3문항: EI/SN/TF/JP)
│   └── mbtiMap.js              16타입 → 장르 ID·닉네임·설명·베스트/워스트 매치 매핑
├── components/
│   ├── common/Loader.jsx
│   ├── quiz/                   ProgressBar.jsx, QuestionCard.jsx — Quiz.jsx가 사용
│   ├── result/                 MovieCard.jsx, ResultSummary.jsx
│   └── modal/MovieModal.jsx
├── pages/                      Home.jsx, Quiz.jsx, Result.jsx
├── App.jsx                     루트 레이아웃 — router.jsx에서 모든 라우트를 감싸는 부모
└── router.jsx
```

## 접근성 / UX

- 다크 전용 테마: `<html lang="ko">`, `color-scheme: dark`(`index.css`), `theme-color` 메타 설정
- 포커스 링(`focus-visible`), 44px 터치 타겟, 아이콘 버튼 `aria-label` 전체 적용
- `MovieModal`: `role="dialog"` + `aria-modal`, Escape 키로 닫기, `overscroll-behavior: contain`으로 배경 스크롤 체이닝 방지
- 로딩(`Loader` `aria-live="polite"`), 에러(재시도 버튼 포함), 빈 결과(추천 영화 0개) 상태 각각 처리
- 날짜는 `Intl.DateTimeFormat`으로 로케일 포맷팅, 숫자는 `tabular-nums`
- 이미지 `width`/`height` 명시로 레이아웃 시프트 방지, TMDB 도메인 `preconnect`
- "다시 테스트하기" 버튼은 결과 헤더 바로 아래(스크롤 없이 바로 도달) 배치
