const ProgressBar = ({ current, total }) => {
  const progress = (current / total) * 100;

  return (
    <>
      <div
        role="progressbar"
        aria-valuenow={current}
        aria-valuemin={0}
        aria-valuemax={total}
        aria-label="테스트 진행률"
        className="h-1.5 flex-1 overflow-hidden rounded-full bg-surface-2"
      >
        <div
          className="h-full rounded-full bg-tungsten transition-[width] duration-300 ease-out"
          style={{ width: `${progress}%` }}
        />
      </div>

      <span className="text-sm font-semibold tabular-nums text-fog">
        {current + 1}
        <span className="mx-0.5 text-line">/</span>
        {total}
      </span>
    </>
  );
};

export default ProgressBar;
