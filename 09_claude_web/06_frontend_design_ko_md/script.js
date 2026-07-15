(() => {
  const resultEl = document.getElementById("result");
  const expressionEl = document.getElementById("expression");
  const keypad = document.getElementById("keypad");
  const copyBtn = document.getElementById("copyBtn");
  const toastEl = document.getElementById("toast");

  const MAX_DIGITS = 15;

  let current = "0";
  let previous = null;
  let operator = null;
  let overwrite = true;
  let hasError = false;
  let toastTimer = null;

  const opSymbol = { "+": "+", "−": "−", "×": "×", "÷": "÷" };

  function formatNumber(raw) {
    if (raw === "") return "";
    const negative = raw.startsWith("-");
    const body = negative ? raw.slice(1) : raw;
    const [intPart, decPart] = body.split(".");
    const withCommas = intPart.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    const out = decPart !== undefined ? `${withCommas}.${decPart}` : withCommas;
    return (negative ? "-" : "") + out;
  }

  function renderResult() {
    const formatted = formatNumber(current);
    resultEl.textContent = formatted;
    resultEl.classList.remove("is-long", "is-longer", "is-error");
    if (formatted.length > 12) {
      resultEl.classList.add("is-longer");
    } else if (formatted.length > 8) {
      resultEl.classList.add("is-long");
    }
  }

  function renderExpression() {
    if (operator && previous !== null) {
      expressionEl.textContent = `${formatNumber(String(previous))} ${opSymbol[operator]}`;
    } else {
      expressionEl.textContent = " ";
    }
  }

  function clearOperatorHighlight() {
    keypad.querySelectorAll(".key--operator").forEach((btn) => btn.classList.remove("is-active"));
  }

  function showError(message) {
    hasError = true;
    resultEl.textContent = message;
    resultEl.classList.add("is-error");
    expressionEl.textContent = " ";
    clearOperatorHighlight();
  }

  function resetAll() {
    current = "0";
    previous = null;
    operator = null;
    overwrite = true;
    hasError = false;
    clearOperatorHighlight();
    renderExpression();
    renderResult();
  }

  function inputDigit(d) {
    if (hasError) resetAll();
    if (overwrite) {
      current = d === "." ? "0." : d === "0" ? "0" : d;
      overwrite = false;
    } else {
      if (d === "." && current.includes(".")) return;
      if (current.replace(/[-.]/g, "").length >= MAX_DIGITS) return;
      current = current === "0" && d !== "." ? d : current + d;
    }
    clearOperatorHighlight();
    renderResult();
  }

  function toggleSign() {
    if (hasError) return;
    if (current === "0") return;
    current = current.startsWith("-") ? current.slice(1) : "-" + current;
    renderResult();
  }

  function inputPercent() {
    if (hasError) return;
    const value = parseFloat(current) / 100;
    current = String(value);
    renderResult();
  }

  function round(value) {
    return parseFloat(value.toPrecision(12));
  }

  function compute() {
    if (operator === null || previous === null) return;
    const a = previous;
    const b = parseFloat(current);
    let value;
    switch (operator) {
      case "+":
        value = a + b;
        break;
      case "−":
        value = a - b;
        break;
      case "×":
        value = a * b;
        break;
      case "÷":
        if (b === 0) {
          showError("0으로 나눌 수 없어요");
          previous = null;
          operator = null;
          overwrite = true;
          return;
        }
        value = a / b;
        break;
      default:
        return;
    }
    current = String(round(value));
    previous = null;
    operator = null;
    overwrite = true;
  }

  function inputOperator(op) {
    if (hasError) resetAll();
    if (operator && !overwrite) {
      compute();
      if (hasError) return;
    }
    previous = parseFloat(current);
    operator = op;
    overwrite = true;
    clearOperatorHighlight();
    const activeBtn = keypad.querySelector(`.key--operator[data-value="${op}"]`);
    if (activeBtn) activeBtn.classList.add("is-active");
    renderExpression();
  }

  function equals() {
    if (hasError) return;
    if (operator === null || previous === null) return;
    compute();
    if (hasError) return;
    clearOperatorHighlight();
    renderExpression();
    renderResult();
  }

  function backspace() {
    if (hasError) {
      resetAll();
      return;
    }
    if (overwrite) return;
    current = current.length > 1 ? current.slice(0, -1) : "0";
    if (current === "-") current = "0";
    renderResult();
  }

  keypad.addEventListener("click", (e) => {
    const btn = e.target.closest("button");
    if (!btn) return;
    const { action, value } = btn.dataset;
    switch (action) {
      case "digit":
        inputDigit(value);
        break;
      case "operator":
        inputOperator(value);
        break;
      case "equals":
        equals();
        break;
      case "clear":
        resetAll();
        break;
      case "sign":
        toggleSign();
        break;
      case "percent":
        inputPercent();
        break;
    }
  });

  window.addEventListener("keydown", (e) => {
    if (/^[0-9]$/.test(e.key)) {
      inputDigit(e.key);
    } else if (e.key === ".") {
      inputDigit(".");
    } else if (e.key === "+") {
      inputOperator("+");
    } else if (e.key === "-") {
      inputOperator("−");
    } else if (e.key === "*") {
      inputOperator("×");
    } else if (e.key === "/") {
      e.preventDefault();
      inputOperator("÷");
    } else if (e.key === "Enter" || e.key === "=") {
      e.preventDefault();
      equals();
    } else if (e.key === "Backspace") {
      backspace();
    } else if (e.key === "Escape") {
      resetAll();
    } else if (e.key === "%") {
      inputPercent();
    }
  });

  copyBtn.addEventListener("click", async () => {
    const text = formatNumber(current);
    try {
      await navigator.clipboard.writeText(text);
    } catch (err) {
      const temp = document.createElement("textarea");
      temp.value = text;
      document.body.appendChild(temp);
      temp.select();
      document.execCommand("copy");
      document.body.removeChild(temp);
    }
    showToast();
  });

  function showToast() {
    toastEl.classList.add("is-visible");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => {
      toastEl.classList.remove("is-visible");
    }, 1800);
  }

  renderResult();
  renderExpression();
})();
