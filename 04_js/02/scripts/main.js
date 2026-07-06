// 1. id가 "title"인 제목을 찾아 title 상자에 담기
const title = document.querySelector("#title");
// 2. id가 "btn"인 버튼을 찾아 btn 상자에 담기
const btn = document.querySelector("#btn");

// 3. btn을 클릭하면 안쪽 함수 실행 (이벤트 연결)
btn.addEventListener("click", () => {
  // 4. 제목 글자를 "Hello world!"로 교체 (화살표 함수 안에서)
  title.textContent = "Hello world!";
});
