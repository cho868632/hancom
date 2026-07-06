const flavor = document.querySelector("#flavor");
const res = document.querySelector("#result");

document.querySelector("#check").addEventListener("click", () => {
  if (flavor.value === "chocolate") {
    res.textContent = "와! 초코 아이스크림 좋아! 🍫";
  } else if (flavor.value === "vanilla") {
    // 4. 첫 조건이 거짓이면 다음 조건(else if)을 검사
    res.textContent = "바닐라도 깔끔하니 좋지! 🍦";
  } else {
    // 5. 위 조건이 모두 거짓이면(else) 이 문장
    res.textContent = "음... 그래도 초코가 최고인데...";
  }
});
