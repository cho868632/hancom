const multiply = (num1, num2) => num1 * num2;
const div = (num1, num2) => num1 / num2;
const plus = (num1, num2) => num1 + num2;
const minus = (num1, num2) => num1 - num2;

const a = document.querySelector("#a");
const b = document.querySelector("#b");
const out = document.querySelector("#out");
document.querySelector("#calc").addEventListener("click", () => {
  // Number( ): 입력칸 글자를 숫자로 바꿔 곱하기, 템플릿 리터럴로 문장 조립
  out.textContent = `${a.value} × ${b.value} = ${multiply(Number(a.value), Number(b.value))}
${a.value} / ${b.value} = ${div(Number(a.value), Number(b.value))}
${a.value} + ${b.value} = ${plus(Number(a.value), Number(b.value))}
${a.value} - ${b.value} = ${minus(Number(a.value), Number(b.value))}`;
});
