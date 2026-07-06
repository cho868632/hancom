// 1. 입력칸과 결과 칸을 찾아 상자에 담기
const nameInput = document.querySelector("#name");
const out = document.querySelector("#out");
const greetBtn = document.querySelector("#greet");
const defaultOutText = out.textContent;

const updateBtn = () => {
  const myName = nameInput.value;
  if (out.textContent !== defaultOutText || myName) {
    greetBtn.textContent = "다시 인사하기";
  } else {
    greetBtn.textContent = "인사하기";
  }
};
nameInput.addEventListener("input", updateBtn);
// 2. "인사하기" 버튼을 누르면 실행 (화살표 함수)
document.querySelector("#greet").addEventListener("click", () => {
  // 3. 입력한 글자를 myName 변수(상자)에 담기 (.value = 입력칸 글자)
  let myName = nameInput.value;
  // 4. 템플릿 리터럴 `${ }`로 값을 문장에 끼워 넣기
  out.textContent = `안녕, ${myName}!`;
  nameInput.value = "";
  updateButtonText();
});
