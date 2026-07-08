const todoForm = document.getElementById("todo-form");
const todoInput = document.getElementById("todo-input");
const todoList = document.getElementById("todo-list");
const todoCount = document.getElementById("todo-count");
const emptyState = document.getElementById("empty-state");
const clearCompletedBtn = document.getElementById("clear-completed");
const statTotal = document.getElementById("stat-total");
const statActive = document.getElementById("stat-active");
const statCompleted = document.getElementById("stat-completed");
const filterBtns = document.querySelectorAll(".filter-btn");
const themeToggle = document.getElementById("theme-toggle");

// 캘린더 관련 DOM 선택자 추가
const calendarDays = document.getElementById("calendar-days");
const calendarTitle = document.getElementById("calendar-title");
const prevMonthBtn = document.getElementById("prev-month");
const nextMonthBtn = document.getElementById("next-month");
const todayBtn = document.getElementById("today-btn");

let todos = JSON.parse(localStorage.getItem("todos")) || [];
let currentFilter = localStorage.getItem("todoFilter") || "all";

// 날짜 초기 포맷 오류 해결 (YYYY-MM-DD)
const getFormattedDate = (dateObj) => {
  return `${dateObj.getFullYear()}-${String(dateObj.getMonth() + 1).padStart(2, "0")}-${String(dateObj.getDate()).padStart(2, "0")}`;
};

let currentMonth = new Date();
let selectedDate = getFormattedDate(new Date());

const saveTodos = () => {
  localStorage.setItem("todos", JSON.stringify(todos));
};

const getFilteredTodos = () => {
  let result = todos;

  if (currentFilter === "active") {
    result = result.filter((todo) => !todo.checked);
  }

  if (currentFilter === "completed") {
    result = result.filter((todo) => todo.checked);
  }

  return result;
};

const PENCIL_SVG = `<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon-svg"><path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z"/><path d="m15 5 4 4"/></svg>`;
const TRASH_SVG = `<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon-svg"><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/><line x1="10" x2="10" y1="11" y2="17"/><line x1="14" x2="14" y1="11" y2="17"/></svg>`;
const SUN_SVG = `<svg class="icon-svg" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="4"/><path d="M12 2v2"/><path d="M12 20v2"/><path d="m4.93 4.93 1.41 1.41"/><path d="m17.66 17.66 1.41 1.41"/><path d="M2 12h2"/><path d="M20 12h2"/><path d="m6.34 17.66-1.41 1.41"/><path d="m19.07 4.93-1.41 1.41"/></svg>`;
const MOON_SVG = `<svg class="icon-svg" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/></svg>`;

const createTodoItem = (todo) => {
  const li = document.createElement("li");
  li.className = "todo-item";
  li.dataset.id = todo.id;
  if (todo.checked) li.classList.add("completed");

  const label = document.createElement("label");
  label.className = "todo-check";

  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.className = "todo-checkbox";
  checkbox.checked = todo.checked;
  checkbox.setAttribute("aria-label", `${todo.text} 완료 표시`);

  // 텍스트와 날짜를 묶어줄 요소 추가
  const content = document.createElement("div");
  content.className = "todo-content";

  const span = document.createElement("span");
  span.className = "todo-text";
  span.textContent = todo.text;

  const date = document.createElement("span");
  date.className = "todo-date";
  date.textContent = todo.date; // 데이터에 저장된 날짜 텍스트

  content.append(span, date);
  label.append(checkbox, content);

  const actions = document.createElement("div");
  actions.className = "todo-actions";

  const editBtn = document.createElement("button");
  editBtn.type = "button";
  editBtn.className = "edit-btn";
  editBtn.innerHTML = PENCIL_SVG;
  editBtn.setAttribute("aria-label", "수정");

  const deleteBtn = document.createElement("button");
  deleteBtn.type = "button";
  deleteBtn.className = "delete-btn";
  deleteBtn.innerHTML = TRASH_SVG;
  deleteBtn.setAttribute("aria-label", "삭제");

  actions.append(editBtn, deleteBtn);
  li.append(label, actions);

  return li;
};

const renderTodos = () => {
  const filtered = getFilteredTodos();
  todoList.innerHTML = "";
  filtered.forEach((todo) => todoList.appendChild(createTodoItem(todo)));

  emptyState.hidden = filtered.length !== 0;

  const remaining = todos.filter((todo) => !todo.checked).length;
  const completed = todos.length - remaining;
  todoCount.textContent = `${remaining}개 남음`;

  statTotal.textContent = todos.length;
  statActive.textContent = remaining;
  statCompleted.textContent = completed;

  clearCompletedBtn.disabled = !todos.some((todo) => todo.checked);

  saveTodos();
};

// 투두 추가
todoForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const todoText = todoInput.value.trim();
  if (!todoText) return;

  todos.push({
    id: Date.now(),
    text: todoText,
    checked: false,
    date: selectedDate,
  });
  todoInput.value = "";
  renderTodos();
  renderCalendar(); // 투두가 추가되었으므로 달력 점 표시 갱신
  todoInput.focus();
});

// 완료 토글
todoList.addEventListener("change", (e) => {
  if (!e.target.classList.contains("todo-checkbox")) return;

  const li = e.target.closest(".todo-item");
  const id = Number(li.dataset.id);
  todos = todos.map((todo) =>
    todo.id === id ? { ...todo, checked: e.target.checked } : todo,
  );
  renderTodos();
});

// 삭제 / 수정 버튼
todoList.addEventListener("click", (e) => {
  const li = e.target.closest(".todo-item");
  if (!li) return;
  const id = Number(li.dataset.id);

  const deleteBtn = e.target.closest(".delete-btn");
  const editBtn = e.target.closest(".edit-btn");

  if (deleteBtn) {
    todos = todos.filter((todo) => todo.id !== id);
    renderTodos();
    renderCalendar(); // 투두가 삭제되었으므로 달력 점 표시 갱신
    return;
  }

  if (editBtn) {
    startEdit(li, id);
  }
});

const startEdit = (li, id) => {
  if (li.classList.contains("editing")) return;
  const todo = todos.find((t) => t.id === id);
  if (!todo) return;

  li.classList.add("editing");
  const span = li.querySelector(".todo-text");

  const input = document.createElement("input");
  input.type = "text";
  input.className = "edit-input";
  input.maxLength = 100;
  input.value = todo.text;

  span.replaceWith(input);
  input.focus();
  input.select();

  let finished = false;
  const finishEdit = (save) => {
    if (finished) return;
    finished = true;

    const newText = input.value.trim();
    if (save && newText) {
      todos = todos.map((t) => (t.id === id ? { ...t, text: newText } : t));
    }
    renderTodos();
  };

  input.addEventListener("keydown", (e) => {
    if (e.key === "Enter") finishEdit(true);
    if (e.key === "Escape") finishEdit(false);
  });
  input.addEventListener("blur", () => finishEdit(true));
};

// 완료 항목 일괄 삭제
clearCompletedBtn.addEventListener("click", () => {
  const completedCount = todos.filter((todo) => todo.checked).length;
  if (completedCount === 0) return;
  if (!confirm(`완료된 항목 ${completedCount}개를 삭제할까요?`)) return;

  todos = todos.filter((todo) => !todo.checked);
  renderTodos();
  renderCalendar();
});
todayBtn.addEventListener("click", () => {
  const today = new Date();
  currentMonth = new Date();
  selectedDate = getFormattedDate(today);
  renderCalendar();
  renderTodos();
});
// 필터 전환
const activateFilterTab = (btn) => {
  currentFilter = btn.dataset.filter;
  localStorage.setItem("todoFilter", currentFilter);
  filterBtns.forEach((b) => {
    const isActive = b === btn;
    b.classList.toggle("active", isActive);
    b.setAttribute("aria-selected", String(isActive));
    b.tabIndex = isActive ? 0 : -1;
  });
  renderTodos();
};

filterBtns.forEach((btn) => {
  btn.addEventListener("click", () => activateFilterTab(btn));
});

// WAI-ARIA 탭 패턴: 방향키로 탭 간 포커스 이동 및 활성화
const filterBtnList = Array.from(filterBtns);
filterBtnList.forEach((btn, index) => {
  btn.addEventListener("keydown", (e) => {
    let targetIndex = null;
    if (e.key === "ArrowRight") {
      targetIndex = (index + 1) % filterBtnList.length;
    } else if (e.key === "ArrowLeft") {
      targetIndex = (index - 1 + filterBtnList.length) % filterBtnList.length;
    } else if (e.key === "Home") {
      targetIndex = 0;
    } else if (e.key === "End") {
      targetIndex = filterBtnList.length - 1;
    } else {
      return;
    }

    e.preventDefault();
    const targetBtn = filterBtnList[targetIndex];
    targetBtn.focus();
    activateFilterTab(targetBtn);
  });
});

filterBtnList.forEach((btn) => {
  const isActive = btn.dataset.filter === currentFilter;
  btn.classList.toggle("active", isActive);
  btn.setAttribute("aria-selected", String(isActive));
  btn.tabIndex = isActive ? 0 : -1;
});

// 다크 모드
const applyTheme = (theme) => {
  document.body.classList.toggle("dark", theme === "dark");
  themeToggle.innerHTML = theme === "dark" ? SUN_SVG : MOON_SVG;
};

const savedTheme =
  localStorage.getItem("theme") ||
  (window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light");
applyTheme(savedTheme);

themeToggle.addEventListener("click", () => {
  const next = document.body.classList.contains("dark") ? "light" : "dark";
  localStorage.setItem("theme", next);
  applyTheme(next);
});

// 캘린더 고도화 함수 및 월 이동 이벤트 연동
function renderCalendar() {
  calendarDays.innerHTML = "";

  const year = currentMonth.getFullYear();
  const month = currentMonth.getMonth();

  calendarTitle.textContent = `${year}년 ${month + 1}월`;

  const firstDay = new Date(year, month, 1).getDay();
  const lastDate = new Date(year, month + 1, 0).getDate();

  for (let i = 0; i < firstDay; i++) {
    calendarDays.appendChild(document.createElement("div"));
  }

  for (let day = 1; day <= lastDate; day++) {
    const btn = document.createElement("button");
    btn.type = "button";
    btn.textContent = day;

    const currentDayOfWeek = new Date(year, month, day).getDay();

    if (currentDayOfWeek === 0) {
      btn.classList.add("sunday");
    } else if (currentDayOfWeek === 6) {
      btn.classList.add("saturday");
    }

    const date = `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;

    if (date === selectedDate) {
      btn.classList.add("selected");
    }

    // 일정이 등록된 날짜 인디케이터 점 부여
    const hasTodo = todos.some((todo) => todo.date === date);
    if (hasTodo) {
      btn.classList.add("has-todo");
    }

    btn.onclick = () => {
      selectedDate = date;
      renderCalendar();
      renderTodos();
    };

    calendarDays.appendChild(btn);
  }
}

prevMonthBtn.addEventListener("click", () => {
  currentMonth.setMonth(currentMonth.getMonth() - 1);
  renderCalendar();
});

nextMonthBtn.addEventListener("click", () => {
  currentMonth.setMonth(currentMonth.getMonth() + 1);
  renderCalendar();
});

// 앱 최초 빌드 실행
renderCalendar();
renderTodos();
