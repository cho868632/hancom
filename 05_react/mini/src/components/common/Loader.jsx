const Loader = ({ label = "불러오는 중..." }) => {
  return (
    <div
      role="status"
      aria-live="polite"
      className="flex flex-col items-center justify-center gap-3 py-16 text-fog"
    >
      <div className="size-8 animate-spin rounded-full border-2 border-line border-t-tungsten" />
      <p className="text-sm font-medium">{label}</p>
    </div>
  );
};

export default Loader;
