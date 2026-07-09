// type을 키로 객체에서 스타일·아이콘 꺼냄
const Alert = ({ type, text }) => {
  // props 2개: type(종류), text(내용)
  const map = {
    // 종류별 설정 모음(객체) — 키: {아이콘, 색}
    success: { icon: "✅", color: "green" },
    error: { icon: "❌", color: "crimson" },
    warning: { icon: "⚠️", color: "orange" },
  };
  const cfg = map[type]; // type(노랑) 값이 키(노랑)와 매칭돼 설정 꺼냄 (예: type='error' → {❌, crimson})
  return (
    <p style={{ color: cfg.color }}>
      {cfg.icon} {text}
    </p>
  ); // 꺼낸 색·아이콘을 화면에 꽂음
};
export default Alert; // 다른 파일에서 쓰도록 내보냄
