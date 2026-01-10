/* ----------------- All Features ------------------- */
function openFeatures() {
  let allElems = document.querySelectorAll(".elem");
  let allFullElemPage = document.querySelectorAll(".fullElem");
  let allFullElemBackBtn = document.querySelectorAll(".fullElem .back");

  allElems.forEach(function (elem) {
    elem.addEventListener("click", function () {
      allFullElemPage[elem.id].style.display = "block";
    });
  });

  allFullElemBackBtn.forEach(function (back) {
    back.addEventListener("click", function () {
      allFullElemPage[back.id].style.display = "none";
    });
  });
}

openFeatures();

/* ----------------- ToDo List -------------------------*/
function todoList() {
  const form = document.querySelector(".addTask form");
  const taskInput = document.querySelector("#input");
  const taskDetailInput = document.querySelector("#textarea");
  const taskCheckbox = document.querySelector("#check");
  const allTasks = document.querySelector(".allTask");

  /* ---------------- LOAD FROM STORAGE ---------------- */
  let currentTasks = JSON.parse(localStorage.getItem("currentTasks")) || [];

  /* ---------------- RENDER ---------------- */
  function renderTask() {
    allTasks.innerHTML = currentTasks
      .map((elem, index) => {
        return `
        <div class="task" data-index="${index}">
          <h5 class="task-title">
            ${elem.task}
            ${elem.imp ? "<span class='imp'>Imp</span>" : ""}
          </h5>

          <details class="task-details-box">
            <summary>View Details</summary>
            <p>${elem.details}</p>
          </details>

          <button class="delete-btn">Mark as Completed</button>
        </div>
      `;
      })
      .join("");
  }

  /* ---------------- SAVE ---------------- */
  function saveTasks() {
    localStorage.setItem("currentTasks", JSON.stringify(currentTasks));
  }

  /* ---------------- ADD TASK ---------------- */
  form.addEventListener("submit", function (e) {
    e.preventDefault();

    if (!taskInput.value.trim()) return;

    currentTasks.push({
      task: taskInput.value.trim(),
      details: taskDetailInput.value.trim(),
      imp: taskCheckbox.checked,
    });

    saveTasks();
    renderTask();

    form.reset(); // 🔥 clean & best
  });

  /* ---------------- DELETE TASK ---------------- */
  allTasks.addEventListener("click", function (e) {
    if (e.target.classList.contains("delete-btn")) {
      const taskDiv = e.target.closest(".task");
      const index = taskDiv.dataset.index;

      currentTasks.splice(index, 1); // ❌ remove task
      saveTasks();
      renderTask();
    }
  });

  renderTask();
}

todoList();

/* ----------------- Daily Planner --------------------- */
function dailyPlaner() {
  var dayPlaner = document.querySelector(".daily-container");

  var dayPlanData = JSON.parse(localStorage.getItem("dayPlanData")) || {};

  var hours = Array.from({ length: 20 }, function (_, idx) {
    return `${4 + idx}:00 - ${5 + idx}:00`;
  });

  var wholeDaySum = "";
  hours.forEach(function (elem, idx) {
    var saveData = dayPlanData[idx] || "";
    wholeDaySum =
      wholeDaySum +
      `<div class="day-planer-time">
                    <p>${elem}</p>
                    <input id = ${idx} type="text" placeholder="..." value = "${saveData}">
                </div>`;
  });
  dayPlaner.innerHTML = wholeDaySum;

  var dayPlanerInput = document.querySelectorAll(
    ".daily-container .day-planer-time input"
  );

  dayPlanerInput.forEach(function (input, idx) {
    input.addEventListener("input", function (elem) {
      dayPlanData[input.id] = input.value;

      localStorage.setItem("dayPlanData", JSON.stringify(dayPlanData));
    });
  });
}

dailyPlaner();

/* ----------------- Motivational Quotes --------------*/
function motivationalQuotes() {
  async function fetchQuotes() {
    var motivationalQuoteContent = document.querySelector(
      ".motivational-quote .motivational-2 h2"
    );
    var motivationalAuthor = document.querySelector(
      ".motivational-quote .motivational-3 h2"
    );

    let response = await fetch("https://dummyjson.com/quotes/random");
    let saveData = await response.json();

    motivationalQuoteContent.innerHTML = saveData.quote;
    motivationalAuthor.innerHTML = " - " + saveData.author;
  }
  fetchQuotes();
  function getQuote() {
    let newQuoteBtn = document.querySelector(".refresh-btn .refresh");
    newQuoteBtn.addEventListener("click", function () {
      fetchQuotes();
    });
  }
  getQuote();
}

motivationalQuotes();

/* ------------------ Pomodoro Timer ----------------- */
function pomodoroTimer() {
  let pomoTimer = document.querySelector(".pomodoro-timer h1");
  let workMode = document.querySelector(".pomodoro-timer .mode h2");
  let startBtn = document.querySelector(".start button");
  let pauseBtn = document.querySelector(".pause button");
  let resetBtn = document.querySelector(".reset button");

  let mode = "work";
  let totalTime = 25 * 60;
  let pomodoroCount = 0;
  let timer = null;

  const TIMES = {
    work: 25 * 60,
    shortBreak: 5 * 60,
    longBreak: 15 * 60,
  };

  function updateTimer() {
    let minutes = Math.floor(totalTime / 60);
    let seconds = totalTime % 60;

    pomoTimer.innerHTML = `${String(minutes).padStart(2, 0)}:${String(
      seconds
    ).padStart(2, 0)}`;
  }

  function switchMode() {
    if (mode === "work") {
      pomodoroCount++;

      if (pomodoroCount % 4 === 0) {
        mode = "longBreak";
        totalTime = TIMES.longBreak;
        workMode.innerHTML = "Long Break";
      } else {
        mode = "shortBreak";
        totalTime = TIMES.shortBreak;
        workMode.innerHTML = "Short Break";
      }
    } else {
      mode = "work";
      totalTime = TIMES.work;
      workMode.innerHTML = "Work Mode";
    }
  }

  function startTimer() {
    if (timer) return;

    timer = setInterval(() => {
      if (totalTime > 0) {
        totalTime--;
        updateTimer();
      } else {
        clearInterval(timer);
        timer = null;
        switchMode();
        updateTimer();
      }
    }, 1000);
  }

  function pauseTimer() {
    clearInterval(timer);
    timer = null;
  }

  function resetTimer() {
    clearInterval(timer);
    timer = null;
    totalTime = TIMES.work;
    updateTimer();
  }

  startBtn.addEventListener("click", startTimer);
  pauseBtn.addEventListener("click", pauseTimer);
  resetBtn.addEventListener("click", resetTimer);
}

pomodoroTimer();

/* ------------------Weather ------------------------ */
function weatherFunctionality() {
  var city = "Dehradun";
  var apiKey = "7a4f2f17841243baba9150633260801";

  var header1Date = document.querySelector(".allElems .header1 h2");
  var header1DayTime = document.querySelector(".allElems .header1 h1");

  let weatherTemp = document.querySelector(".allElems .header2 h2");
  let weatherCondition = document.querySelector(".allElems .header2 h4");
  let precipitation = document.querySelector(
    ".allElems .header2 .precipitation"
  );
  let humidity = document.querySelector(".allElems .header2 .humidity");
  let wind = document.querySelector(".allElems .header2 .wind");

  async function weatherAPI() {
    let response = await fetch(
      `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}`
    );

    let data = await response.json();

    // Temperature
    weatherTemp.innerHTML = `${data.current.temp_c}°C`;

    // Conditions
    weatherCondition.innerHTML = `${data.current.condition.text}`;
    precipitation.innerHTML = `Precipitation: ${data.current.precip_mm} nm`;
    humidity.innerHTML = `Humidity: ${data.current.humidity}%`;
    wind.innerHTML = `Wind: ${data.current.wind_kph}km/h`;
  }

  weatherAPI();

  function timeDate() {
    const totalDaysOfWeek = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];

    const monthNames = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    let date = new Date();

    let year = date.getFullYear();
    let month = monthNames[date.getMonth()];
    let day = totalDaysOfWeek[date.getDay()];
    let tareek = date.getDate();

    let hours = date.getHours();
    let minutes = date.getMinutes();
    let seconds = date.getSeconds();

    header1Date.innerHTML = `${tareek} ${month} ${year}`;
    header1DayTime.innerHTML = `${day},  ${hours}:${minutes}:${seconds}`;

    if (hours > 12) {
      header1DayTime.innerHTML = `${day}, ${String(hours - 12).padStart(
        "2",
        "0"
      )}:${String(minutes).padStart("2", "0")}:${String(seconds).padStart(
        "2",
        "0"
      )} PM`;
    } else {
      header1DayTime.innerHTML = `${day}, ${String(hours).padStart(
        "2",
        "0"
      )}:${String(minutes).padStart("2", "0")}:${String(seconds).padStart(
        "2",
        "0"
      )} AM`;
    }
  }

  setInterval(() => {
    timeDate();
  }, 1000);
}

weatherFunctionality();

/* -------------------Theme------------------------ */
function changeTheme() {
  var theme = document.querySelector(".theme");
  var rootElement = document.documentElement;

  var flag = 0;
  theme.addEventListener("click", function () {
    if (flag == 0) {
      rootElement.style.setProperty("--pri", "#fff");
      rootElement.style.setProperty("--sec", "#0F2854");
      rootElement.style.setProperty("--tri1", "#1C4D8D");
      rootElement.style.setProperty("--tri2", "#4988C4");
      flag = 1;
    } else if (flag == 1) {
      rootElement.style.setProperty("--pri", "#FBDB93");
      rootElement.style.setProperty("--sec", "#641B2E");
      rootElement.style.setProperty("--tri1", "#8A2D3B");
      rootElement.style.setProperty("--tri2", "#BE5B50");
      flag = 2;
    } else if (flag == 2) {
      rootElement.style.setProperty("--pri", "#fff");
      rootElement.style.setProperty("--sec", "#798d58ff");
      rootElement.style.setProperty("--tri2", "#62704cff");
      rootElement.style.setProperty("--tri1", "#cadea0ff");
      flag = 3;
    } else {
      rootElement.style.setProperty("--pri", "#fff");
      rootElement.style.setProperty("--sec", "#372002");
      rootElement.style.setProperty("--tri1", "#603f13");
      rootElement.style.setProperty("--tri2", "#ec9b2a");
      flag = 0;
    }
  });
}

changeTheme();

/*-------------------Daily Goals--------------------- */
function dailyGoals() {
  var goalLists = document.querySelector(".goals-wrapper .goals-list");
  var addBtn = document.querySelector(".add-goals button");
  var goalsInput = document.querySelector(".add-goals input");

  // Load goals from localStorage
  let storedGoals = JSON.parse(localStorage.getItem("goals")) || [];

  // Render goals
  function renderGoals() {
    goalLists.innerHTML = "";

    storedGoals.forEach(function (goal, index) {
      let li = document.createElement("li");

      li.innerHTML = `
      <input type="checkbox" ${goal.done ? "checked" : ""}>
      <span>${goal.text}</span>
      <button class="delete">Remove</button>
    `;

      if (goal.done) li.classList.add("done");

      // checkbox logic
      li.querySelector("input").addEventListener("change", function () {
        li.classList.toggle("done");
        storedGoals[index].done = !storedGoals[index].done;
        saveGoals();
      });

      li.querySelector(".delete").addEventListener("click", function () {
        storedGoals.splice(index, 1);
        saveGoals();
        renderGoals();
      });

      goalLists.appendChild(li);
    });
  }

  function saveGoals() {
    localStorage.setItem("goals", JSON.stringify(storedGoals));
  }

  // Add new goal
  addBtn.addEventListener("click", function () {
    let text = goalsInput.value.trim();
    if (text === "") return;

    storedGoals.push({
      text: text,
      done: false,
    });

    saveGoals();
    renderGoals();
    goalsInput.value = "";
  });

  // Enter key support
  goalsInput.addEventListener("keypress", function (e) {
    if (e.key === "Enter") {
      addBtn.click();
    }
  });

  renderGoals();
}

dailyGoals();

