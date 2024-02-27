let timer;
let isRunning = false;
let milliseconds = 0;
let seconds = 0;
let minutes = 0;
let hours = 0;
let records = [];

function startStop() {
  if (!isRunning) {
    timer = setInterval(updateTime, 100);
    document.getElementById("startStop").textContent = "Stop";
    isRunning = true;
  } else {
    clearInterval(timer);
    document.getElementById("startStop").textContent = "Start";
    isRunning = false;
  }
}

function recordTime() {
  if (isRunning) {
    records.push(`${formatTime(hours)}:${formatTime(minutes)}:${formatTime(seconds)}.${formatMilliseconds(milliseconds)}`);
    updateRecords();
  }
}

function reset() {
  clearInterval(timer);
  document.getElementById("startStop").textContent = "Start";
  isRunning = false;
  milliseconds = 0;
  seconds = 0;
  minutes = 0;
  hours = 0;
  records = [];
  updateRecords();
  updateTime();
}

function updateTime() {
  milliseconds++;
  if (milliseconds === 10) {
    milliseconds = 0;
    seconds++;
    if (seconds === 60) {
      seconds = 0;
      minutes++;
      if (minutes === 60) {
        minutes = 0;
        hours++;
      }
    }
  }
  const display = document.getElementById("display");
  display.textContent = formatTime(hours) + ":" + formatTime(minutes) + ":" + formatTime(seconds) + "." + formatMilliseconds(milliseconds);
}

function formatTime(time) {
  return time < 10 ? "0" + time : time;
}

function formatMilliseconds(ms) {
  return ms < 10 ? "0" + ms : ms;
}

function updateRecords() {
  const recordsList = document.getElementById("records");
  recordsList.innerHTML = "";
  records.forEach(record => {
    const li = document.createElement("li");
    li.textContent = record;
    li.classList.add("record-item");
    recordsList.appendChild(li);
  });
}

function downloadCSV() {
  const csvContent = "data:text/csv;charset=utf-8," + records.map(record => record.replace(/:/g, ",")).join("\n");
  const encodedUri = encodeURI(csvContent);
  const link = document.createElement("a");
  link.setAttribute("href", encodedUri);
  link.setAttribute("download", "chronometer_records.csv");
  document.body.appendChild(link);
  link.click();
}

function downloadSCSV() {
  const scsvContent = "data:text/csv;charset=utf-8," + records.map(record => record.replace(/:/g, ";")).join("\n");
  const encodedUri = encodeURI(scsvContent);
  const link = document.createElement("a");
  link.setAttribute("href", encodedUri);
  link.setAttribute("download", "chronometer_records.scsv");
  document.body.appendChild(link);
  link.click();
}
