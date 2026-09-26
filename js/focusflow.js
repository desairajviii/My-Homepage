const key = "focusflow-v1";
const energies = { high: "High", medium: "Steady", low: "Low" };
const byId = (id) => document.getElementById(id);
const status = (message) => {
  byId("flow-status").textContent = message;
};
let tasks = [
  { id: "example-1", title: "Finish my homepage demo", energy: "high", minutes: 25, done: false },
  {
    id: "example-2",
    title: "Write three HCI reading notes",
    energy: "medium",
    minutes: 15,
    done: false,
  },
  {
    id: "example-3",
    title: "Review image alternative text",
    energy: "low",
    minutes: 5,
    done: false,
  },
];
let energy = "high";
let selectedId = null;
let remaining = 25 * 60;
let deadline = null;
let suggested = null;
let canSave = true;

// Treat browser storage as untrusted data; never insert task text as HTML.
try {
  const raw = localStorage.getItem(key);
  if (raw) {
    const saved = JSON.parse(raw);
    if (
      !Array.isArray(saved.tasks) ||
      saved.tasks.length > 100 ||
      !saved.tasks.every(
        (task) =>
          task &&
          typeof task.id === "string" &&
          /^[a-zA-Z0-9-]{1,80}$/.test(task.id) &&
          typeof task.title === "string" &&
          task.title.trim().length > 0 &&
          task.title.length <= 120 &&
          Object.hasOwn(energies, task.energy) &&
          Number.isInteger(task.minutes) &&
          task.minutes >= 1 &&
          task.minutes <= 180 &&
          typeof task.done === "boolean"
      ) ||
      new Set(saved.tasks.map((task) => task.id)).size !== saved.tasks.length
    )
      throw new Error("Invalid saved tasks");
    tasks = saved.tasks;
    energy = Object.hasOwn(energies, saved.energy) ? saved.energy : "high";
    const selected = tasks.find((task) => task.id === saved.selectedId && !task.done);
    if (selected) {
      selectedId = selected.id;
      remaining =
        Number.isFinite(saved.remaining) &&
        saved.remaining >= 0 &&
        saved.remaining <= selected.minutes * 60
          ? saved.remaining
          : selected.minutes * 60;
      deadline =
        Number.isFinite(saved.deadline) && saved.deadline <= Date.now() + selected.minutes * 60000
          ? saved.deadline
          : null;
    }
  }
} catch {
  status("Saved data could not be loaded. Starting with the example tasks.");
}

function save() {
  try {
    localStorage.setItem(key, JSON.stringify({ tasks, energy, selectedId, remaining, deadline }));
  } catch {
    canSave = false;
    byId("storage-note").textContent =
      "Browser storage is unavailable. Changes will last only while this page stays open.";
  }
}

function selectedTask() {
  return tasks.find((task) => task.id === selectedId && !task.done);
}

function renderTimer() {
  const task = selectedTask();
  byId("session-task").textContent = task ? task.title : "Choose a task to begin.";
  const seconds = Math.ceil(remaining);
  byId("timer-display").textContent =
    `${String(Math.floor(seconds / 60)).padStart(2, "0")}:${String(seconds % 60).padStart(2, "0")}`;
  byId("timer-toggle").textContent = deadline ? "Pause" : remaining === 0 ? "Restart" : "Start";
  for (const id of ["timer-toggle", "timer-reset", "finish-task"]) byId(id).disabled = !task;
}

function tick() {
  if (!deadline) return;
  remaining = Math.max(0, (deadline - Date.now()) / 1000);
  if (remaining === 0) {
    deadline = null;
    save();
    status("Focus session finished. Take a break, restart, or mark your task complete.");
  }
  renderTimer();
}

function chooseTask(id) {
  const task = tasks.find((item) => item.id === id && !item.done);
  if (!task) return;
  if (selectedId !== id) {
    selectedId = id;
    deadline = null;
    remaining = task.minutes * 60;
    save();
    renderTimer();
    status(`Ready to focus on ${task.title}. Press Start when you’re ready.`);
  }
  byId("timer-toggle").focus();
}

function render() {
  const list = byId("task-list");
  list.replaceChildren();
  tasks.forEach((task) => {
    const item = document.createElement("li");
    item.className = `task-item${task.done ? " is-done" : ""}`;
    const top = document.createElement("div");
    top.className = "task-top";
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.className = "task-check";
    checkbox.id = `task-${task.id}`;
    checkbox.checked = task.done;
    checkbox.addEventListener("change", () => {
      task.done = checkbox.checked;
      if (task.done && selectedId === task.id) {
        selectedId = null;
        deadline = null;
        remaining = 1500;
      }
      save();
      render();
      byId(`task-${task.id}`).focus();
      status(`${task.title}: ${task.done ? "completed" : "reopened"}.`);
    });
    const label = document.createElement("label");
    label.htmlFor = checkbox.id;
    label.className = "task-name";
    label.textContent = task.title;
    top.append(checkbox, label);
    const bottom = document.createElement("div");
    bottom.className = "task-bottom";
    const meta = document.createElement("span");
    meta.className = "task-meta";
    meta.textContent = `${energies[task.energy]} energy · ${task.minutes} min`;
    const focus = document.createElement("button");
    focus.type = "button";
    focus.className = "quiet-button";
    focus.textContent = "Focus";
    focus.setAttribute("aria-label", `Focus on ${task.title}`);
    focus.disabled = task.done;
    focus.addEventListener("click", () => chooseTask(task.id));
    const remove = document.createElement("button");
    remove.type = "button";
    remove.className = "quiet-button";
    remove.textContent = "Remove";
    remove.setAttribute("aria-label", `Remove ${task.title}`);
    remove.addEventListener("click", () => {
      tasks = tasks.filter((entry) => entry.id !== task.id);
      if (selectedId === task.id) {
        selectedId = null;
        deadline = null;
        remaining = 1500;
      }
      save();
      render();
      byId("task-title").focus();
      status(`Removed ${task.title}.`);
    });
    bottom.append(meta, focus, remove);
    item.append(top, bottom);
    list.append(item);
  });
  const completed = tasks.filter((task) => task.done).length;
  byId("task-count").textContent = `${tasks.length - completed} remaining`;
  byId("progress-label").textContent = `${completed} of ${tasks.length} tasks complete`;
  byId("task-progress").max = tasks.length || 1;
  byId("task-progress").value = completed;
  byId("empty-note").hidden = tasks.length > 0;
  byId("clear-completed").disabled = completed === 0;
  const pending = tasks.filter((task) => !task.done).sort((a, b) => a.minutes - b.minutes);
  suggested = pending.find((task) => task.energy === energy) || pending[0];
  byId("recommendation-title").textContent = suggested
    ? suggested.title
    : tasks.length
      ? "Everything is checked off."
      : "Start with one small task.";
  byId("recommendation-reason").textContent = suggested
    ? suggested.energy === energy
      ? `Your shortest ${energies[energy].toLowerCase()}-energy task: ${suggested.minutes} minutes.`
      : `No unfinished task matches this energy. Try your shortest remaining task: ${suggested.minutes} minutes.`
    : "Add a task when you’re ready for your next session.";
  byId("use-suggestion").disabled = !suggested;
  document
    .querySelectorAll(".planner-energy")
    .forEach((button) =>
      button.setAttribute("aria-pressed", String(button.dataset.energy === energy))
    );
  renderTimer();
}

byId("task-form").addEventListener("submit", (event) => {
  event.preventDefault();
  const title = byId("task-title").value.trim();
  if (!title) {
    byId("task-title").setCustomValidity("Enter a task, not just spaces.");
    byId("task-title").reportValidity();
    return;
  }
  if (tasks.length >= 100) {
    status("Your list holds up to 100 tasks. Remove a task or clear completed tasks first.");
    return;
  }
  tasks.push({
    id: crypto.randomUUID(),
    title,
    energy: byId("task-energy").value,
    minutes: Number(byId("task-minutes").value),
    done: false,
  });
  byId("task-title").value = "";
  save();
  render();
  byId("task-title").focus();
  status(canSave ? "Task added and saved in this browser." : "Task added for this visit.");
});
byId("task-title").addEventListener("input", () => byId("task-title").setCustomValidity(""));
document.querySelectorAll(".planner-energy").forEach((button) =>
  button.addEventListener("click", () => {
    energy = button.dataset.energy;
    save();
    render();
    status(
      `Energy set to ${energies[energy].toLowerCase()}. ${byId("recommendation-title").textContent}`
    );
  })
);
byId("use-suggestion").addEventListener("click", () => {
  if (suggested) chooseTask(suggested.id);
});
byId("timer-toggle").addEventListener("click", () => {
  if (!selectedTask()) return;
  if (deadline) {
    tick();
    deadline = null;
    status("Focus session paused.");
  } else {
    if (remaining <= 0) remaining = selectedTask().minutes * 60;
    deadline = Date.now() + remaining * 1000;
    status("Focus session started.");
  }
  save();
  renderTimer();
});
byId("timer-reset").addEventListener("click", () => {
  if (!selectedTask()) return;
  deadline = null;
  remaining = selectedTask().minutes * 60;
  save();
  renderTimer();
  status("Timer reset. Press Start to begin again.");
});
byId("finish-task").addEventListener("click", () => {
  const task = selectedTask();
  if (!task) return;
  task.done = true;
  selectedId = null;
  deadline = null;
  remaining = 1500;
  save();
  render();
  byId(`task-${task.id}`).focus();
  status(`Completed ${task.title}. Nice work—take a breath.`);
});
byId("clear-completed").addEventListener("click", () => {
  tasks = tasks.filter((task) => !task.done);
  save();
  render();
  byId("task-title").focus();
  status("Completed tasks cleared.");
});
byId("planner").hidden = false;
render();
tick();
save();
setInterval(tick, 250);
document.addEventListener("visibilitychange", tick);
