const resultEl = document.getElementById("result");
const expressionEl = document.getElementById("expression");
const keypadEl = document.querySelector(".calculator__keypad");

const OP_SYMBOL = { add: "+", subtract: "−", multiply: "×", divide: "÷" };

const state = {
  currentOperand: "0",
  previousOperand: null,
  operator: null,
  overwrite: false,
  error: false,
};

function roundResult(n) {
  if (!Number.isFinite(n)) return n;
  return parseFloat(n.toPrecision(12));
}

function inputDigit(d) {
  if (state.overwrite) {
    state.currentOperand = d;
    state.overwrite = false;
    return;
  }
  if (state.currentOperand === "0") {
    state.currentOperand = d;
    return;
  }
  if (state.currentOperand.replace("-", "").length >= 16) return;
  state.currentOperand += d;
}

function inputDecimal() {
  if (state.overwrite) {
    state.currentOperand = "0.";
    state.overwrite = false;
    return;
  }
  if (!state.currentOperand.includes(".")) {
    state.currentOperand += ".";
  }
}

function compute() {
  if (state.operator === null || state.previousOperand === null) return;
  const prev = parseFloat(state.previousOperand);
  const curr = parseFloat(state.currentOperand);
  if (Number.isNaN(prev) || Number.isNaN(curr)) return;

  let result;
  switch (state.operator) {
    case "add":
      result = prev + curr;
      break;
    case "subtract":
      result = prev - curr;
      break;
    case "multiply":
      result = prev * curr;
      break;
    case "divide":
      if (curr === 0) {
        state.error = true;
        state.currentOperand = "Error";
        state.previousOperand = null;
        state.operator = null;
        state.overwrite = true;
        return;
      }
      result = prev / curr;
      break;
    default:
      return;
  }

  state.currentOperand = roundResult(result).toString();
  state.previousOperand = null;
  state.operator = null;
  state.overwrite = true;
}

function chooseOperator(op) {
  if (state.operator !== null && !state.overwrite) {
    compute();
    if (state.error) return;
  }
  state.previousOperand = state.currentOperand;
  state.operator = op;
  state.overwrite = true;
}

function backspace() {
  if (state.overwrite) return;
  state.currentOperand = state.currentOperand.slice(0, -1);
  if (state.currentOperand === "" || state.currentOperand === "-") {
    state.currentOperand = "0";
  }
}

function clearAll() {
  state.currentOperand = "0";
  state.previousOperand = null;
  state.operator = null;
  state.overwrite = false;
  state.error = false;
}

function render() {
  resultEl.textContent = state.currentOperand;

  resultEl.classList.remove("calculator__result--md", "calculator__result--sm", "calculator__result--xs");
  const len = state.currentOperand.length;
  if (len >= 16) {
    resultEl.classList.add("calculator__result--xs");
  } else if (len >= 13) {
    resultEl.classList.add("calculator__result--sm");
  } else if (len >= 10) {
    resultEl.classList.add("calculator__result--md");
  }

  if (state.operator && state.previousOperand !== null) {
    expressionEl.textContent = `${state.previousOperand} ${OP_SYMBOL[state.operator]}`;
  } else {
    expressionEl.textContent = "";
  }
}

function handleKey(key) {
  if (state.error && key !== "AC") return;

  if (/^[0-9]$/.test(key)) {
    inputDigit(key);
  } else if (key === "decimal") {
    inputDecimal();
  } else if (key in OP_SYMBOL) {
    chooseOperator(key);
  } else if (key === "equals") {
    compute();
  } else if (key === "back") {
    backspace();
  } else if (key === "AC") {
    clearAll();
  } else {
    return;
  }

  render();
}

keypadEl.addEventListener("click", (e) => {
  const btn = e.target.closest("button[data-key]");
  if (btn) handleKey(btn.dataset.key);
});

const KEYBOARD_MAP = {
  "+": "add",
  "-": "subtract",
  "*": "multiply",
  "/": "divide",
  Enter: "equals",
  "=": "equals",
  Backspace: "back",
  Escape: "AC",
  c: "AC",
  C: "AC",
  ".": "decimal",
};

document.addEventListener("keydown", (e) => {
  if (/^[0-9]$/.test(e.key)) {
    handleKey(e.key);
    return;
  }
  const mapped = KEYBOARD_MAP[e.key];
  if (mapped) {
    if (e.key === "Enter" || e.key === "=") e.preventDefault();
    handleKey(mapped);
  }
});

render();
