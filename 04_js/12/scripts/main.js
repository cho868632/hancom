// 1. 입력칸과 결과 칸을 찾아 담기
const s = document.querySelector("#s");
const out = document.querySelector("#out");
// 2. "분석" 버튼을 누르면 문자열 도구로 글자를 다루기 (화살표 함수)
document.querySelector("#go").addEventListener("click", () => {
  const text = s.value;
  const hasA = text.includes("a") ? "있음" : "없음";

  // 백틱 ` ` 안 ${ }로 결과 끼워 넣기 — .length=속성, .toUpperCase()/.replace()=메서드
  out.innerHTML =
    `글자 수(length): ${text.length}` +
    "<br>" +
    `대문자(toUpperCase): ${text.toUpperCase()}` +
    "<br>" +
    `e→a 바꾸기(replace): ${text.replace("e", "a")}` +
    "<br>" +
    `문자 "a" 포함 여부(includes): ${hasA}`;
});
