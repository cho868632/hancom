// ---------- calculation engine (no eval) ----------

function tokenize(str) {
  const tokens = [];
  const fnNames = ["sin", "cos", "tan", "log", "ln"];
  let i = 0;
  while (i < str.length) {
    const c = str[i];

    if (c === " ") { i++; continue; }

    if (/[0-9.]/.test(c)) {
      let j = i;
      while (j < str.length && /[0-9.]/.test(str[j])) j++;
      const numStr = str.slice(i, j);
      if ((numStr.match(/\./g) || []).length > 1) throw new Error("잘못된 숫자");
      tokens.push({ type: "num", value: parseFloat(numStr) });
      i = j;
      continue;
    }

    if (c === "π") { tokens.push({ type: "num", value: Math.PI }); i++; continue; }
    if (c === "e") { tokens.push({ type: "num", value: Math.E }); i++; continue; }
    if (c === "√") { tokens.push({ type: "func", value: "sqrt" }); i++; continue; }

    if (/[a-z]/.test(c)) {
      const rest = str.slice(i);
      const matched = fnNames.find((f) => rest.startsWith(f));
      if (matched) { tokens.push({ type: "func", value: matched }); i += matched.length; continue; }
      throw new Error("알 수 없는 함수");
    }

    if ("+-*/^%()".includes(c)) { tokens.push({ type: "op", value: c }); i++; continue; }

    throw new Error("잘못된 문자");
  }
  return tokens;
}

function evaluateTokens(tokens) {
  let pos = 0;
  const peek = () => tokens[pos];
  const next = () => tokens[pos++];

  function parseExpr() {
    let value = parseTerm();
    while (peek() && peek().type === "op" && (peek().value === "+" || peek().value === "-")) {
      const op = next().value;
      const rhs = parseTerm();
      value = op === "+" ? value + rhs : value - rhs;
    }
    return value;
  }

  function parseTerm() {
    let value = parsePower();
    while (peek() && peek().type === "op" && (peek().value === "*" || peek().value === "/")) {
      const op = next().value;
      const rhs = parsePower();
      if (op === "/") {
        if (rhs === 0) throw new Error("0으로 나눌 수 없습니다");
        value = value / rhs;
      } else {
        value = value * rhs;
      }
    }
    return value;
  }

  function parsePower() {
    const value = parseUnary();
    if (peek() && peek().type === "op" && peek().value === "^") {
      next();
      const rhs = parsePower();
      return Math.pow(value, rhs);
    }
    return value;
  }

  function parseUnary() {
    if (peek() && peek().type === "op" && peek().value === "-") {
      next();
      return -parseUnary();
    }
    return parsePostfix();
  }

  function parsePostfix() {
    let value = parsePrimary();
    while (peek() && peek().type === "op" && peek().value === "%") {
      next();
      value = value / 100;
    }
    return value;
  }

  function parsePrimary() {
    const tok = peek();
    if (!tok) throw new Error("식이 완성되지 않았습니다");

    if (tok.type === "num") { next(); return tok.value; }

    if (tok.type === "func") {
      next();
      if (!(peek() && peek().value === "(")) throw new Error("괄호가 필요합니다");
      next();
      const arg = parseExpr();
      if (!(peek() && peek().value === ")")) throw new Error("괄호가 닫히지 않았습니다");
      next();
      switch (tok.value) {
        case "sin": return Math.sin((arg * Math.PI) / 180);
        case "cos": return Math.cos((arg * Math.PI) / 180);
        case "tan": return Math.tan((arg * Math.PI) / 180);
        case "log": if (arg <= 0) throw new Error("정의역 오류"); return Math.log10(arg);
        case "ln": if (arg <= 0) throw new Error("정의역 오류"); return Math.log(arg);
        case "sqrt": if (arg < 0) throw new Error("정의역 오류"); return Math.sqrt(arg);
      }
    }

    if (tok.type === "op" && tok.value === "(") {
      next();
      const val = parseExpr();
      if (!(peek() && peek().value === ")")) throw new Error("괄호가 닫히지 않았습니다");
      next();
      return val;
    }

    throw new Error("잘못된 식");
  }

  const result = parseExpr();
  if (pos !== tokens.length) throw new Error("잘못된 식");
  return result;
}

function calculate(raw) {
  if (!raw || raw.trim() === "") throw new Error("빈 식");
  const tokens = tokenize(raw);
  const result = evaluateTokens(tokens);
  if (!isFinite(result)) throw new Error("결과가 너무 큽니다");
  return result;
}

function formatNumber(num) {
  if (!isFinite(num)) throw new Error("Error");
  if (num === 0) return "0";
  const abs = Math.abs(num);
  if (abs >= 1e15 || abs < 1e-9) return num.toExponential(6);
  let s = num.toPrecision(12);
  if (!s.includes("e")) {
    if (s.includes(".")) s = s.replace(/0+$/, "").replace(/\.$/, "");
  }
  return s;
}

function prettify(raw) {
  return raw.replace(/\*/g, "×").replace(/\//g, "÷");
}

// ---------- UI state ----------

const state = { raw: "", justEvaluated: false, error: false };
let history = [];

const exprEl = document.getElementById("expression");
const resultEl = document.getElementById("result");
const historyListEl = document.getElementById("historyList");
const historyEmptyEl = document.getElementById("historyEmpty");
const historyPanel = document.getElementById("historyPanel");
const sciRow = document.getElementById("sciRow");
const sciToggle = document.getElementById("sciToggle");
const themeToggle = document.getElementById("themeToggle");
const historyToggle = document.getElementById("historyToggle");
const clearHistoryBtn = document.getElementById("clearHistory");

function needsImplicitMultiply() {
  return /[0-9).%πe]$/.test(state.raw);
}

function lastNumberSegment() {
  const m = state.raw.match(/(\d*\.?\d*)$/);
  return m ? m[0] : "";
}

function appendConstant(sym) {
  if (needsImplicitMultiply()) state.raw += "*";
  state.raw += sym;
}

function appendFunction(name) {
  const map = { sin: "sin(", cos: "cos(", tan: "tan(", log: "log(", ln: "ln(", sqrt: "√(" };
  if (needsImplicitMultiply()) state.raw += "*";
  state.raw += map[name];
}

function appendToken(key) {
  if (key === "(") {
    if (needsImplicitMultiply()) state.raw += "*";
    state.raw += "(";
    return;
  }
  if (key === ")") {
    const opens = (state.raw.match(/\(/g) || []).length;
    const closes = (state.raw.match(/\)/g) || []).length;
    if (opens > closes && /[0-9)]$/.test(state.raw)) state.raw += ")";
    return;
  }
  if (key === ".") {
    if (/[)%πe]$/.test(state.raw)) state.raw += "*";
    const seg = lastNumberSegment();
    if (seg.includes(".")) return;
    state.raw += seg === "" ? "0." : ".";
    return;
  }
  if ("+-*/^".includes(key)) {
    if (state.raw === "") {
      if (key === "-") state.raw += "-";
      return;
    }
    const last = state.raw.slice(-1);
    if ("+-*/^".includes(last)) {
      if (key === "-" && last !== "-") { state.raw += "-"; return; }
      state.raw = state.raw.slice(0, -1) + key;
      return;
    }
    if (last === "(") {
      if (key === "-") state.raw += "-";
      return;
    }
    state.raw += key;
    return;
  }
  // digit: insert implicit multiply if it follows a completed value like ")", "%", "π", "e"
  if (/[)%πe]$/.test(state.raw)) state.raw += "*";
  state.raw += key;
}

function appendPercent() {
  if (state.raw === "") return;
  if (/[0-9)%]$/.test(state.raw)) state.raw += "%";
}

function toggleSign() {
  const match = state.raw.match(/(-?\d*\.?\d+)$/);
  if (!match) return;
  const numStr = match[1];
  const start = match.index;
  if (numStr.startsWith("-")) {
    state.raw = state.raw.slice(0, start) + numStr.slice(1);
  } else {
    state.raw = state.raw.slice(0, start) + "-" + numStr + state.raw.slice(start + numStr.length);
  }
}

function backspace() {
  if (state.raw === "") return;
  const funcTokens = ["sin(", "cos(", "tan(", "log(", "ln("];
  for (const f of funcTokens) {
    if (state.raw.endsWith(f)) { state.raw = state.raw.slice(0, -f.length); return; }
  }
  state.raw = state.raw.slice(0, -1);
}

function resetAll() {
  state.raw = "";
  state.justEvaluated = false;
  state.error = false;
  render();
}

function render() {
  exprEl.textContent = prettify(state.raw);
  if (state.raw === "") {
    resultEl.textContent = "0";
    return;
  }
  try {
    const val = calculate(state.raw);
    resultEl.textContent = formatNumber(val);
  } catch (e) {
    // incomplete expression mid-typing: keep showing last valid preview
  }
}

function evaluate() {
  if (state.raw === "" || state.error) return;
  try {
    const result = calculate(state.raw);
    const formatted = formatNumber(result);
    const prettyExpr = prettify(state.raw);
    addHistory(prettyExpr, formatted, result);
    exprEl.textContent = prettyExpr + " =";
    resultEl.textContent = formatted;
    state.raw = String(result);
    state.justEvaluated = true;
    state.error = false;
  } catch (e) {
    state.error = true;
    exprEl.textContent = prettify(state.raw);
    resultEl.textContent = "오류";
  }
}

function press(key) {
  if (state.error) {
    if (key === "AC") resetAll();
    return;
  }
  if (key === "AC") { resetAll(); return; }
  if (key === "back") { backspace(); render(); return; }
  if (key === "=") { evaluate(); return; }

  if (state.justEvaluated) {
    const startsFresh = /[0-9.]/.test(key) || key === "(" || ["sin", "cos", "tan", "log", "ln", "sqrt", "pi", "e"].includes(key);
    if (startsFresh) state.raw = "";
    state.justEvaluated = false;
  }

  switch (key) {
    case "%": appendPercent(); break;
    case "±": toggleSign(); break;
    case "sin": case "cos": case "tan": case "log": case "ln": case "sqrt":
      appendFunction(key);
      break;
    case "pi": appendConstant("π"); break;
    case "e": appendConstant("e"); break;
    default: appendToken(key);
  }
  render();
}

// ---------- history ----------

function escapeHtml(str) {
  const d = document.createElement("div");
  d.textContent = str;
  return d.innerHTML;
}

function addHistory(expr, formatted, value) {
  history.unshift({ expr, formatted, value });
  if (history.length > 50) history.pop();
  renderHistory();
}

function renderHistory() {
  historyListEl.innerHTML = "";
  historyEmptyEl.style.display = history.length ? "none" : "block";
  history.forEach((item) => {
    const li = document.createElement("li");
    li.className = "history-item";
    li.innerHTML =
      '<span class="h-expr">' + escapeHtml(item.expr) + "</span>" +
      '<span class="h-result">= ' + escapeHtml(item.formatted) + "</span>";
    li.addEventListener("click", () => {
      state.raw = String(item.value);
      state.justEvaluated = true;
      state.error = false;
      render();
      if (window.matchMedia("(max-width: 820px)").matches) {
        historyPanel.classList.remove("open");
      }
    });
    historyListEl.appendChild(li);
  });
}

clearHistoryBtn.addEventListener("click", () => {
  history = [];
  renderHistory();
});

// ---------- button wiring ----------

document.querySelectorAll(".btn[data-key]").forEach((btn) => {
  btn.addEventListener("click", () => press(btn.dataset.key));
});

sciToggle.addEventListener("click", () => {
  sciRow.classList.toggle("open");
  sciToggle.classList.toggle("active");
});

historyToggle.addEventListener("click", () => {
  historyPanel.classList.toggle("open");
});

document.addEventListener("click", (e) => {
  if (!window.matchMedia("(max-width: 820px)").matches) return;
  if (!historyPanel.classList.contains("open")) return;
  if (historyPanel.contains(e.target) || historyToggle.contains(e.target)) return;
  historyPanel.classList.remove("open");
});

// ---------- theme ----------

const THEME_KEY = "calc-theme";

function applyTheme(theme) {
  document.body.setAttribute("data-theme", theme);
  themeToggle.textContent = theme === "dark" ? "🌙" : "☀️";
  localStorage.setItem(THEME_KEY, theme);
}

applyTheme(localStorage.getItem(THEME_KEY) || "dark");

themeToggle.addEventListener("click", () => {
  const current = document.body.getAttribute("data-theme");
  applyTheme(current === "dark" ? "light" : "dark");
});

// ---------- keyboard ----------

window.addEventListener("keydown", (e) => {
  const key = e.key;
  if (/^[0-9]$/.test(key)) { press(key); e.preventDefault(); return; }
  if (key === ".") { press("."); e.preventDefault(); return; }
  if (["+", "-", "*", "/", "^", "%", "(", ")"].includes(key)) { press(key); e.preventDefault(); return; }
  if (key === "Enter" || key === "=") { press("="); e.preventDefault(); return; }
  if (key === "Backspace") { press("back"); e.preventDefault(); return; }
  if (key === "Escape") { press("AC"); e.preventDefault(); return; }
});

render();
