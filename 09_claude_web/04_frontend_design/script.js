const resultEl = document.getElementById("result");
const expressionEl = document.getElementById("expression");
const tapeUnitEl = document.querySelector(".tape-unit");
const tapeWindowEl = document.getElementById("tapeWindow");
const tapeListEl = document.getElementById("tapeList");
const tapeEmptyEl = document.getElementById("tapeEmpty");
const equalsBtn = document.getElementById("equalsBtn");
const tearBtn = document.getElementById("tearTape");

const OP_SYMBOL = { "+": "+", "-": "−", "*": "×", "/": "÷" };

let curr = "0";
let prev = "";
let operator = null;
let resetNext = false;
let tapeCount = 0;

function prefersReducedMotion() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function groupThousands(intPart) {
  return intPart.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function formatForDisplay(str) {
  if (str === "Error" || str === "") return str;
  const negative = str.startsWith("-");
  const raw = negative ? str.slice(1) : str;
  const [intPart, decPart] = raw.split(".");
  const grouped = groupThousands(intPart || "0");
  const out = decPart !== undefined ? `${grouped}.${decPart}` : grouped;
  return (negative ? "-" : "") + out;
}

function trimResult(n) {
  if (Number.isNaN(n) || !Number.isFinite(n)) return "Error";
  let s = n.toString();
  if (s.length > 14) s = parseFloat(n.toPrecision(10)).toString();
  return s;
}

function updateDisplay() {
  resultEl.textContent = formatForDisplay(curr);
  expressionEl.textContent = prev ? `${formatForDisplay(prev)} ${OP_SYMBOL[operator]}` : "";
}

function addTapeLine(text, isError) {
  tapeCount += 1;
  tapeEmptyEl.style.display = "none";
  const li = document.createElement("li");
  li.className = "tape-line" + (isError ? " is-error" : "");
  li.textContent = text;
  tapeListEl.appendChild(li);
  tapeWindowEl.scrollTop = tapeWindowEl.scrollHeight;
}

function inputDigit(d) {
  if (curr === "Error") {
    curr = "0";
    resetNext = false;
  }
  if (resetNext) {
    curr = d === "." ? "0." : d;
    resetNext = false;
    return;
  }
  if (d === ".") {
    if (!curr.includes(".")) curr += ".";
    return;
  }
  curr = curr === "0" ? d : curr + d;
}

function chooseOperator(op) {
  if (curr === "Error") return;
  if (operator && !resetNext) compute();
  prev = curr;
  operator = op;
  resetNext = true;
}

function compute() {
  const a = parseFloat(prev);
  const b = parseFloat(curr);
  if (Number.isNaN(a) || Number.isNaN(b) || !operator) return;

  let result;
  switch (operator) {
    case "+":
      result = a + b;
      break;
    case "-":
      result = a - b;
      break;
    case "*":
      result = a * b;
      break;
    case "/":
      result = b === 0 ? NaN : a / b;
      break;
    default:
      return;
  }

  const resultStr = trimResult(result);
  const isError = resultStr === "Error";
  addTapeLine(
    `${formatForDisplay(prev)} ${OP_SYMBOL[operator]} ${formatForDisplay(curr)} = ${isError ? "오류" : formatForDisplay(resultStr)}`,
    isError
  );

  curr = resultStr;
  operator = null;
  prev = "";
}

function handleEquals() {
  if (curr === "Error") return;
  if (operator) {
    compute();
    stampEquals();
  }
  resetNext = true;
  updateDisplay();
}

function stampEquals() {
  if (prefersReducedMotion()) return;
  equalsBtn.classList.remove("stamp-pulse");
  void equalsBtn.offsetWidth;
  equalsBtn.classList.add("stamp-pulse");
}

function clearAll() {
  curr = "0";
  prev = "";
  operator = null;
  resetNext = false;
}

function backspace() {
  if (resetNext || curr === "Error") {
    curr = "0";
    resetNext = false;
    return;
  }
  curr = curr.length > 1 ? curr.slice(0, -1) : "0";
}

function toggleSign() {
  if (curr === "0" || curr === "Error") return;
  curr = curr.startsWith("-") ? curr.slice(1) : "-" + curr;
}

function percent() {
  if (curr === "Error") return;
  curr = trimResult(parseFloat(curr) / 100);
}

function tearTape() {
  if (tapeCount === 0) return;
  if (prefersReducedMotion()) {
    clearTapeNow();
    return;
  }
  tapeUnitEl.classList.add("tearing");
  window.setTimeout(() => {
    tapeUnitEl.classList.remove("tearing");
    clearTapeNow();
  }, 260);
}

function clearTapeNow() {
  tapeCount = 0;
  tapeListEl.innerHTML = "";
  tapeEmptyEl.style.display = "";
}

document.querySelector(".keypad").addEventListener("click", (e) => {
  const btn = e.target.closest("button[data-key]");
  if (!btn) return;
  const key = btn.dataset.key;

  if (/^[0-9.]$/.test(key)) {
    inputDigit(key);
  } else {
    switch (key) {
      case "ac":
        clearAll();
        break;
      case "back":
        backspace();
        break;
      case "percent":
        percent();
        break;
      case "sign":
        toggleSign();
        break;
      case "+":
      case "-":
      case "*":
      case "/":
        chooseOperator(key);
        break;
      case "=":
        handleEquals();
        return;
    }
  }
  updateDisplay();
});

tearBtn.addEventListener("click", tearTape);

window.addEventListener("keydown", (e) => {
  if (e.key >= "0" && e.key <= "9") {
    inputDigit(e.key);
  } else if (e.key === ".") {
    inputDigit(".");
  } else if (e.key === "+" || e.key === "-" || e.key === "*") {
    chooseOperator(e.key);
  } else if (e.key === "/") {
    e.preventDefault();
    chooseOperator("/");
  } else if (e.key === "%") {
    percent();
  } else if (e.key === "Enter" || e.key === "=") {
    e.preventDefault();
    handleEquals();
    return;
  } else if (e.key === "Escape") {
    clearAll();
  } else if (e.key === "Backspace") {
    backspace();
  } else {
    return;
  }
  updateDisplay();
});

updateDisplay();
