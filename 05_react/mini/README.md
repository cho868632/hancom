# 씨네타입 (CineType)

MBTI 성향 테스트 형식으로 영화를 추천해주는 웹앱입니다. TMDB API만으로 동작하는 프론트엔드 단독 프로젝트로, 별도 백엔드는 없습니다.

12개 질문(축당 3문항)에 답하면 16가지 "시네타입" 중 하나가 결정되고 타입별 장르 매핑에 따라 추천 영화를 보여줍니다. 결과 화면에서 "왜 이 영화를 추천했는지"—어떤 성향 축이 어떤 장르로 이어졌는지—를 함께 보여주는 것이 이 프로젝트의 핵심 차별점입니다.

## 기술 스택

| 역할               | 라이브러리             |
| ------------------ | ---------------------- |
| 라우팅 / 모달 상태 | react-router v8        |
| 클라이언트 상태    | zustand (+ persist)    |
| 서버 데이터 페칭   | @tanstack/react-query  |
| 스타일             | Tailwind CSS v4        |

## 시작하기

```bash
npm install
```

`.env` 파일에 TMDB v4 Read Access Token이 필요합니다.

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

`Result.jsx`의 `<Outlet />`이 `movie/:movieId` 경로와 매칭되면 그 자리에 `MovieModal`을 얹는 구조입니다. 덕분에 모달이 떠 있어도 뒷배경(영화 그리드)이 그대로 유지되고 새로고침·뒤로가기·링크 공유가 모두 자연스럽게 동작합니다.

## 상태 관리: zustand

퀴즈 진행 상태처럼 순수 클라이언트 영역의 상태는 `src/store/useQuizStore.js`에 zustand 스토어 하나로 모아뒀습니다.

```js
export const useQuizStore = create(
  persist(
    (set, get) => ({
      answers: {},
      currentIndex: 0,
      resultType: null,
      answer: (questionId, pole) => { ... },
      goBack: () => { ... },
      computeResult: () => { ... },
      reset: () => { ... },
    }),
    { name: "mbti-quiz-storage" },
  ),
);
```

- **상태**: `answers`(문항별 응답), `currentIndex`(진행 위치), `resultType`(계산된 MBTI 결과)
- **액션**: `answer` (응답 기록 + 다음 문항 이동), `goBack` (이전 문항), `computeResult` (12문항 응답을 축별로 집계해 4글자 타입 산출), `reset` (전체 초기화)
- `persist` 미들웨어로 `localStorage`(`mbti-quiz-storage` 키)에 자동 저장되어 퀴즈 도중 새로고침해도 진행 상태가 유지됩니다.

**사용처**

- `pages/Quiz.jsx` — `currentIndex`, `answer`, `goBack`, `computeResult`를 구조 분해해 문항 렌더링과 답변 처리에 그대로 사용. 마지막 문항까지 답하면 `computeResult()`로 결과 타입을 구해 `/result/:mbtiType`로 이동합니다.
- `pages/Result.jsx` — `reset` 액션만 셀렉터(`useQuizStore((s) => s.reset)`)로 꺼내와 "다시 테스트하기" 버튼에 연결. 필요한 값만 구독해 불필요한 리렌더를 줄입니다.

## 서버 데이터 페칭: @tanstack/react-query

TMDB API에서 가져오는 모든 데이터(영화 목록, 상세정보, 예고편)는 react-query로 관리합니다. `QueryClient`는 `src/main.jsx`에서 앱 최상단에 한 번만 생성해 `QueryClientProvider`로 감싸둡니다.

쿼리 훅은 `src/hooks/`에 데이터 종류별로 분리되어 있고 실제 fetch 함수는 `src/api/tmdb.js`에 모아뒀습니다.

| 훅                 | queryKey                    | 사용 위치           | 비고                                                                 |
| ------------------ | ---------------------------- | -------------------- | --------------------------------------------------------------------- |
| `useMovieList`     | `["movies", mbtiType]`      | `pages/Result.jsx`   | 타입별 장르로 3페이지를 병렬 요청 후 병합, `select`로 줄거리 없는 항목 제외 → 최신순 정렬 → 12개로 자르기 |
| `useMovieDetail`   | `["movie-detail", movieId]` | `components/modal/MovieModal.jsx` | 모달에 표시할 영화 상세정보                                            |
| `useMovieVideos`   | `["movie-videos", movieId]` | `components/modal/MovieModal.jsx` | `select`로 YouTube 트레일러 하나만 골라냄                              |

- 세 훅 모두 `enabled` 옵션으로 필요한 파라미터(타입/영화 ID)가 준비되기 전에는 요청을 막습니다.
- `isLoading` / `isError` / `refetch`를 각 화면에서 그대로 받아 로딩 스피너, 에러 메시지, 재시도 버튼을 구성합니다(`Result.jsx`, `MovieModal.jsx`).
- 데이터 가공(필터링·정렬·트레일러 추출)은 컴포넌트가 아니라 `select` 옵션 안에서 처리해 캐시된 원본 데이터와 화면에 필요한 파생 데이터를 분리했습니다.

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
- 로딩(`Loader` `aria-live="polite"`), 에러(재시도 버튼 포함), 빈 결과(추천 영화 0개) 상태를 각각 처리
- 날짜는 `Intl.DateTimeFormat`으로 로케일 포맷팅, 숫자는 `tabular-nums`
- 이미지 `width`/`height` 명시로 레이아웃 시프트 방지, TMDB 도메인 `preconnect`
- "다시 테스트하기" 버튼은 결과 헤더 바로 아래(스크롤 없이 바로 도달)에 배치
