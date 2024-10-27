// Function to log messages in the logger textarea with a timestamp
function logStatus(message) {
    // Select the logger textarea
    const logger = document.getElementById("logger");

    // Get the current date and time
    const now = new Date();
    // Format the date and time as [HH:MM:SS]
    const timestamp = "[" + now.toLocaleTimeString() + "] ";

    // Add the timestamp and message at the end of the logger's existing content
    logger.value += timestamp + message + "\n";

    // Automatically scroll to the bottom to show the latest message
    logger.scrollTop = logger.scrollHeight;
}

// Example usage of logStatus function
logStatus("Logger initialized"); // Logs the initial message when the app loads

// Function examples for using logStatus with timestamps
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


// Call these functions at appropriate places in your existing code
// For example:
// startTypingLogger();
// pauseTypingLogger();
// endTypingLogger();



// Initialize Ace editor
const editor = ace.edit("editor");
editor.setTheme("ace/theme/cloud9_night");
logStatus("-- Code Editor Initialized");
logStatus("-- Selected theme 'cloud9_night'");  // Set editor theme

// Additional Settings (Optional)
editor.setOptions({
    enableBasicAutocompletion: false,    // Turns off basic autocompletion
    enableLiveAutocompletion: false,     // Turns off live autocompletion
    enableSnippets: false,               // Turns off code snippets
    behavioursEnabled: false,            // Disables auto-closing tags and brackets
    fontSize: "14px",
    showLineNumbers: true,
    tabSize: 4,
    wrap: true,
    useSoftTabs: false,                  // Turns off soft tabs (auto indentation)
    autoIndent: false                    // Disables automatic indentation for new lines
});
  

  // Variables to store code for each tab
  let htmlCode = "";
  let cssCode = "";
  let jsCode = "";
  
  // Set editor to HTML mode by default
  editor.session.setMode("ace/mode/html");
  editor.setValue(htmlCode);
  
  // Function to switch tabs and load the correct code
  function switchTab(language) {
      // Save current code to the relevant variable
      const currentMode = editor.session.getMode().$id;
      if (currentMode === "ace/mode/html") {
          htmlCode = editor.getValue();
          
      } else if (currentMode === "ace/mode/css") {
          cssCode = editor.getValue();
      } else if (currentMode === "ace/mode/javascript") {
          jsCode = editor.getValue();
      }
  
      // Change editor mode and load the corresponding code
      if (language === "html") {
          editor.session.setMode("ace/mode/html");
          logStatus("Tab Switched to HTML");
          editor.setValue(htmlCode);
      } else if (language === "css") {
          editor.session.setMode("ace/mode/css");
          logStatus("Tab Switched to CSS");
          editor.setValue(cssCode);
      } else if (language === "javascript") {
          editor.session.setMode("ace/mode/javascript");
          logStatus("Tab Switched to Javascript");
          editor.setValue(jsCode);
      }
  
      // Move the cursor to the end of the content
      editor.navigateFileStart();
  
      // Update active button style
      document.querySelectorAll('.tab-button').forEach(button => {
          button.classList.remove('selected-tab');
      });
      document.getElementById(`${language}Tab`).classList.add('selected-tab');
  }
  
  // Add event listeners for tab buttons
  document.getElementById("htmlTab").addEventListener("click", () => switchTab("html"));
  document.getElementById("cssTab").addEventListener("click", () => switchTab("css"));
  document.getElementById("jsTab").addEventListener("click", () => switchTab("javascript"));
  
  // Function to update the iframe preview
  function updatePreview() {
    const htmlContent = htmlCode;
    const cssContent = `<style>${cssCode}</style>`;
    const jsContent = `<script>${jsCode}</script>`;
    
    const iframe = document.getElementById("output").contentWindow.document;
    iframe.open();
    iframe.write(htmlContent + cssContent + jsContent);
    iframe.close();
}

// Attach the update function to the 'change' event of the editor
editor.session.on('change', () => {
    // Update the relevant code variable when the editor content changes
    const currentMode = editor.session.getMode().$id;
    if (currentMode === "ace/mode/html") {
        htmlCode = editor.getValue();
    } else if (currentMode === "ace/mode/css") {
        cssCode = editor.getValue();
    } else if (currentMode === "ace/mode/javascript") {
        jsCode = editor.getValue();
    }
    
    updatePreview();
});

// Initial preview load

updatePreview();

// Caption Update Functionality
document.querySelector(".caption-box button").addEventListener("click", () => {
    const captionText = document.querySelector(".caption-box input").value;  // Get caption text
    document.querySelector(".caption").innerText = captionText;  // Update caption in the output section
    logStatus("Caption updated to: " + captionText);
  });


// Auto typing script start here 

let typingInterval;
let typingActive = false;
let inputText = "";
let speedMultiplier = 1;
let currentIndex = 0;
let isPaused = false;
let targetEditor = null;

// Function to enable typing mode
function enableTyping() {
    inputText = document.getElementById("textInput").value;
    typingActive = true;
    speedMultiplier = document.getElementById("speedControl").value;
    console.log("Click inside the text field where you want to start typing.");
}

// Event listener to detect clicks in text fields and start typing if typing is enabled
document.getElementById("editor").addEventListener("click", (event) => {
    if (typingActive) {
        targetEditor = editor;  // Set target to Ace editor
        startTyping();
        typingActive = false; // Disable typing mode after starting
    } else if (isPaused && targetEditor) {
        resumeTyping();
    }
});

// Function to start typing the input text into the Ace Editor
function startTyping() {
    const speed = 200 / speedMultiplier; // Adjust speed based on the multiplier
    typingInterval = setInterval(() => {
        if (currentIndex >= inputText.length) {
            clearInterval(typingInterval);
        } else {
            // Insert text at the current cursor position in the editor
            targetEditor.session.insert(targetEditor.getCursorPosition(), inputText.charAt(currentIndex));
            currentIndex++;
        }
    }, speed);
    logStatus("-- Typing Started");
}

// Function to toggle between pause and resume typing
function togglePauseResume() {
    if (!isPaused) {
        // Pause typing
        clearInterval(typingInterval);
        logStatus("Typing Paused");
        document.getElementById("pauseResumeButton").innerText = "Resume Typing";
        isPaused = true;
    } else if (targetTextArea) {
        // Resume typing
        resumeTyping();
    }
}

// Function to resume typing from the last position
function resumeTyping() {
    const speed = 200 / speedMultiplier;
    typingInterval = setInterval(() => {
        if (currentIndex >= inputText.length) {
            clearInterval(typingInterval);
        } else {
            targetEditor.session.insert(targetEditor.getCursorPosition(), inputText.charAt(currentIndex));
            currentIndex++;
        }
    }, speed);
    logStatus("Typing Resumed");
    isPaused = false;
    document.getElementById("pauseResumeButton").innerText = "Pause Typing";
}

// Function to fully abort the typing process
function endTyping() {
    clearInterval(typingInterval);
    typingActive = false;
    currentIndex = 0; // Reset the current index for a fresh start
    isPaused = false; // Reset pause status
    targetTextArea = null; // Clear the target text area
    logStatus("-- Typing Aborted");
    document.getElementById("pauseResumeButton").innerText = "Pause Typing"; // Reset button text
}

// Event listener for speed control input
document.getElementById("speedControl").addEventListener("input", (event) => {
    speedMultiplier = event.target.value;
    logStatus("Speed Set: " + speedMultiplier);
});


