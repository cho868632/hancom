import { useEffect } from "react";
import { useNavigate } from "react-router";
import { QUESTIONS } from "../constants/questions";
import { useQuizStore } from "../store/useQuizStore";
import ProgressBar from "../components/quiz/ProgressBar";
import QuestionCard from "../components/quiz/QuestionCard";

const Quiz = () => {
  const navigate = useNavigate();
  const { currentIndex, answer, goBack, computeResult } = useQuizStore();

  const total = QUESTIONS.length;
  const done = currentIndex >= total;
  const question = QUESTIONS[Math.min(currentIndex, total - 1)];

  useEffect(() => {
    if (!done) return;
    const resultType = computeResult();
    navigate(`/result/${resultType}`, { replace: true });
  }, [done, computeResult, navigate]);

  if (done) return null;

  return (
    <main className="mx-auto flex min-h-dvh w-full max-w-2xl flex-col px-6 py-8">
      <h1 className="sr-only">씨네타입 테스트</h1>

      {/* 상단: 뒤로가기 + 진행 표시 */}
      <header className="flex items-center gap-4">
        <button
          type="button"
          onClick={() => (currentIndex === 0 ? navigate("/") : goBack())}
          aria-label={currentIndex === 0 ? "홈으로" : "이전 질문으로"}
          className="flex size-11 cursor-pointer items-center justify-center rounded-full text-fog transition-colors duration-200 hover:bg-surface hover:text-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-velvet"
        >
          <svg
            aria-hidden
            className="size-5"
            viewBox="0 0 20 20"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M16 10H4m5 5-5-5 5-5" />
          </svg>
        </button>

        <ProgressBar current={currentIndex} total={total} />
      </header>

      {/* 질문 영역 — key로 리마운트해서 전환 애니메이션 */}
      <QuestionCard
        key={question.id}
        question={question}
        index={currentIndex}
        onAnswer={(pole) => answer(question.id, pole)}
      />
    </main>
  );
};

export default Quiz;
