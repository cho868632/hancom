const QuestionCard = ({ question, index, onAnswer }) => {
  return (
    <section className="flex flex-1 flex-col justify-center py-12">
      <p className="animate-fade-in text-sm font-semibold tracking-[0.3em] text-velvet">
        Q{index + 1}
      </p>
      <h2 className="animate-fade-up mt-4 text-2xl font-bold leading-snug sm:text-3xl">
        {question.text}
      </h2>

      <div className="mt-10 flex flex-col gap-4">
        {question.options.map((opt, i) => (
          <button
            key={opt.pole}
            type="button"
            onClick={() => onAnswer(opt.pole)}
            className="animate-fade-up min-h-16 cursor-pointer rounded-2xl border border-line bg-surface px-6 py-5 text-left text-base font-medium leading-relaxed transition-colors duration-200 hover:border-tungsten hover:bg-surface-2 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-tungsten active:scale-[0.99] sm:text-lg"
            style={{ animationDelay: `${100 + i * 70}ms` }}
          >
            {opt.label}
          </button>
        ))}
      </div>
    </section>
  );
};

export default QuestionCard;
