// Function to log messages with a timestamp in the logger textarea
function logStatus(message) {
  const logger = document.getElementById("logger"); // Get the logger element
  const timestamp = `[${new Date().toLocaleTimeString()}] `; // Current time formatted as [HH:MM:SS]
  logger.value += `${timestamp}${message}\n`; // Append timestamp and message
  logger.scrollTop = logger.scrollHeight; // Auto-scroll to show the latest message
}

// Initial log message when app loads
logStatus("Logger initialized");

// Functions to log different typing states
function startTypingLogger() {
  logStatus("Started typing...");
}
function endTypingLogger() {
  logStatus("Ended typing.");
}
function pauseTypingLogger() {
  logStatus("Typing paused.");
}
function resumeTypingLogger() {
  logStatus("Typing resumed.");
}

// Initialize Ace editor and configure it
const editor = ace.edit("editor");
editor.setTheme("ace/theme/cloud9_night");
editor.setOptions({
  enableBasicAutocompletion: false,
  enableLiveAutocompletion: false,
  enableSnippets: false,
  behavioursEnabled: false,
  fontSize: "14px",
  showLineNumbers: true,
  tabSize: 4,
  wrap: true,
  useSoftTabs: false,
  autoIndent: false,
});
logStatus("-- Code Editor Initialized");
logStatus("-- Selected theme 'cloud9_night'");

// Variables to store code for HTML, CSS, and JavaScript tabs
let htmlCode = "",
  cssCode = "",
  jsCode = "";

// Set editor to HTML mode by default and load HTML code
editor.session.setMode("ace/mode/html");
editor.setValue(htmlCode);

// Function to switch tabs and load relevant code
function switchTab(language) {
  const currentMode = editor.session.getMode().$id; // Get current editor mode

  // Save current editor content to corresponding variable
  if (currentMode === "ace/mode/html") htmlCode = editor.getValue();
  else if (currentMode === "ace/mode/css") cssCode = editor.getValue();
  else if (currentMode === "ace/mode/javascript") jsCode = editor.getValue();

  // Change editor mode and load corresponding code based on selected tab
  if (language === "html") {
    editor.session.setMode("ace/mode/html");
    editor.setValue(htmlCode);
  } else if (language === "css") {
    editor.session.setMode("ace/mode/css");
    editor.setValue(cssCode);
  } else if (language === "javascript") {
    editor.session.setMode("ace/mode/javascript");
    editor.setValue(jsCode);
  }
  editor.navigateFileStart(); // Move cursor to start
  logStatus(`Tab switched to ${language.toUpperCase()}`);

  // Update selected tab button style
  document
    .querySelectorAll(".tab-button")
    .forEach((button) => button.classList.remove("selected-tab"));
  document.getElementById(`${language}Tab`).classList.add("selected-tab");
}

// Event listeners for tab buttons
document
  .getElementById("htmlTab")
  .addEventListener("click", () => switchTab("html"));
document
  .getElementById("cssTab")
  .addEventListener("click", () => switchTab("css"));
document
  .getElementById("jsTab")
  .addEventListener("click", () => switchTab("javascript"));

// Function to update iframe preview
function updatePreview() {
  const iframe = document.getElementById("output").contentWindow.document;
  iframe.open();
  iframe.write(
    `${htmlCode}<style>${cssCode}</style><script>${jsCode}</script>`
  );
  iframe.close();
}

// Update preview when editor content changes
editor.session.on("change", () => {
  const currentMode = editor.session.getMode().$id;
  if (currentMode === "ace/mode/html") htmlCode = editor.getValue();
  else if (currentMode === "ace/mode/css") cssCode = editor.getValue();
  else if (currentMode === "ace/mode/javascript") jsCode = editor.getValue();
  updatePreview();
});

// Initial preview load
updatePreview();

// Function to update caption
document.querySelector(".caption-box button").addEventListener("click", () => {
  const captionText = document.querySelector(".caption-box input").value;
  document.querySelector(".caption").innerText = captionText;
  logStatus(`Caption updated to: ${captionText}`);
});

// Typing simulation variables and functions
let typingInterval,
  typingActive = false,
  inputText = "",
  speedMultiplier = 1,
  currentIndex = 0,
  isPaused = false,
  targetEditor = null;

// Enable typing mode
function enableTyping() {
  inputText = document.getElementById("textInput").value;
  typingActive = true;
  speedMultiplier = document.getElementById("speedControl").value;
  console.log("Click inside the text field to start typing.");
}

// Start typing when editor is clicked and typing is active
document.getElementById("editor").addEventListener("click", () => {
  if (typingActive) {
    targetEditor = editor;
    startTyping();
    typingActive = false;
  } else if (isPaused && targetEditor) {
    resumeTyping();
  }
});

// Function to start typing in the editor
function startTyping() {
  const speed = 200 / speedMultiplier;
  typingInterval = setInterval(() => {
    if (currentIndex >= inputText.length) clearInterval(typingInterval);
    else {
      targetEditor.session.insert(
        targetEditor.getCursorPosition(),
        inputText.charAt(currentIndex)
      );
      currentIndex++;
    }
  }, speed);
  logStatus("-- Typing Started");
}

// Toggle pause and resume for typing
function togglePauseResume() {
  if (!isPaused) {
    clearInterval(typingInterval);
    logStatus("Typing Paused");
    document.getElementById("pauseResumeButton").innerText = "Resume Typing";
    isPaused = true;
  } else if (targetEditor) {
    resumeTyping();
  }
}

// Resume typing from the last position
function resumeTyping() {
  const speed = 200 / speedMultiplier;
  typingInterval = setInterval(() => {
    if (currentIndex >= inputText.length) clearInterval(typingInterval);
    else {
      targetEditor.session.insert(
        targetEditor.getCursorPosition(),
        inputText.charAt(currentIndex)
      );
      currentIndex++;
    }
  }, speed);
  logStatus("Typing Resumed");
  isPaused = false;
  document.getElementById("pauseResumeButton").innerText = "Pause Typing";
}

// End typing process and reset variables
function endTyping() {
  clearInterval(typingInterval);
  typingActive = false;
  currentIndex = 0;
  isPaused = false;
  targetEditor = null;
  logStatus("-- Typing Aborted");
  document.getElementById("pauseResumeButton").innerText = "Pause Typing";
}

// Update speed multiplier and log
document.getElementById("speedControl").addEventListener("input", (event) => {
  speedMultiplier = event.target.value;
  logStatus(`Speed Set: ${speedMultiplier}`);
});
