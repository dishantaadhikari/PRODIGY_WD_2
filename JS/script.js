let [milliseconds, seconds, minutes, hours] = [0, 0, 0, 0];
let timeRef = document.querySelector(".timer-display");
let lapListRef = document.getElementById("lap-list");
let int = null;

document.getElementById("start-timer").addEventListener("click", () => {
    if (int !== null) {
        clearInterval(int);
    }
    int = setInterval(displayTimer, 10);
});

document.getElementById("pause-timer").addEventListener("click", () => {
    clearInterval(int);
});

document.getElementById("reset-timer").addEventListener("click", () => {
    clearInterval(int);
    [milliseconds, seconds, minutes, hours] = [0, 0, 0, 0];
    timeRef.innerHTML = "00 : 00 : 00 : 000 ";
    clearLapList();
});

document.getElementById("lap-timer").addEventListener("click", () => {
    if (int !== null) {
        const lapTime = formatTime(milliseconds, seconds, minutes, hours);
        addLapTime(lapTime);
    }
});

function displayTimer() {
    milliseconds += 10;
    if (milliseconds == 1000) {
        milliseconds = 0;
        seconds++;
        if (seconds == 60) {
            seconds = 0;
            minutes++;
            if (minutes == 60) {
                minutes = 0;
                hours++;
            }
        }
    }

    timeRef.innerHTML = formatTime(milliseconds, seconds, minutes, hours);
}

function formatTime(ms, s, m, h) {
    let formattedHours = h < 10 ? "0" + h : h;
    let formattedMinutes = m < 10 ? "0" + m : m;
    let formattedSeconds = s < 10 ? "0" + s : s;
    let formattedMilliseconds =
        ms < 10
            ? "00" + ms
            : ms < 100
                ? "0" + ms
                : ms;

    return `${formattedHours} : ${formattedMinutes} : ${formattedSeconds} : ${formattedMilliseconds}`;
}

function addLapTime(lapTime) {
    const lapItem = document.createElement("li");
    lapItem.textContent = lapTime;
    lapListRef.appendChild(lapItem);
}

function clearLapList() {
    lapListRef.innerHTML = "";
}
