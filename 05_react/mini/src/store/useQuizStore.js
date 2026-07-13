import { create } from "zustand";
import { persist } from "zustand/middleware";
import { QUESTIONS } from "../constants/questions";

const AXIS_LETTERS = {
  EI: { first: "E", second: "I" },
  SN: { first: "S", second: "N" },
  TF: { first: "T", second: "F" },
  JP: { first: "J", second: "P" },
};

function computeResultType(answers) {
  const tally = {
    EI: { first: 0, second: 0 },
    SN: { first: 0, second: 0 },
    TF: { first: 0, second: 0 },
    JP: { first: 0, second: 0 },
  };

  QUESTIONS.forEach((q) => {
    const pole = answers[q.id];
    if (pole) tally[q.axis][pole] += 1;
  });

  return ["EI", "SN", "TF", "JP"]
    .map((axis) => {
      const { first, second } = tally[axis];
      const pole = second > first ? "second" : "first";
      return AXIS_LETTERS[axis][pole];
    })
    .join("");
}

export const useQuizStore = create(
  persist(
    (set, get) => ({
      answers: {},
      currentIndex: 0,
      resultType: null,
      answer: (questionId, pole) =>
        set((s) => ({
          answers: { ...s.answers, [questionId]: pole },
          currentIndex: Math.min(s.currentIndex + 1, QUESTIONS.length),
        })),
      goBack: () => set((s) => ({ currentIndex: Math.max(s.currentIndex - 1, 0) })),
      computeResult: () => {
        const resultType = computeResultType(get().answers);
        set({ resultType });
        return resultType;
      },
      reset: () => set({ answers: {}, currentIndex: 0, resultType: null }),
    }),
    { name: "mbti-quiz-storage" },
  ),
);
