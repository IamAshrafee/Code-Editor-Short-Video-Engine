
// // Initialize Ace Editor
// const editor = ace.edit("editor");  // Create an editor in the 'editor' div
// editor.setTheme("ace/theme/cloud9_night");  // Set the theme (You can change to your preference)
// editor.session.setMode("ace/mode/html");  // Set the language mode to JavaScript

// // Function to update the iframe with the editor content
// function updatePreview() {
//       const iframe = document.getElementById("output").contentWindow.document;
//       iframe.open();
//       iframe.write(editor.getValue());
//       iframe.close();
//   }

//   // Trigger updatePreview on editor content change
//   editor.session.on('change', updatePreview);

//   // Initial preview load
//   updatePreview();

// // Additional Settings (Optional)
// editor.setOptions({
//   enableBasicAutocompletion: false,    // Turns off basic autocompletion
//   enableLiveAutocompletion: false,     // Turns off live autocompletion
//   enableSnippets: false,               // Turns off code snippets (which can auto-close tags)
//   behavioursEnabled: false,            // Disables auto-closing tags and brackets
//   fontSize: "16px",        // Set font size
//   showLineNumbers: true,   // Show line numbers
//   tabSize: 4,              // Set tab size
//   wrap: true               // Wrap long lines
// });





// // Initialize Ace Editor in the code editor section
// const editor = ace.edit("editor");  // Create an editor in the 'editor' div
// editor.setTheme("ace/theme/cloud9_night");  // Set the theme for the editor
// editor.session.setMode("ace/mode/html");  // Set the language mode to HTML by default

// // Selectors for HTML elements
// const outputIframe = document.getElementById("output");  // Output frame to show code output
// const typingSpeedInput = document.querySelector(".typing-speed-button input");  // Input for typing speed
// const textAreaInput = document.querySelector(".type-box textarea");  // Main typing area for text
// const loggerTextArea = document.querySelector(".logger-showing-box textarea");  // Logger area for logs

// // Typing Variables
// let typingInterval;  // Interval for automatic typing
// let currentTextIndex = 0;  // Index of the current character being typed

// // Typing Functionality
// function startTyping() {
//   clearInterval(typingInterval);  // Clear any existing typing interval
//   const text = textAreaInput.value;  // Get the text to type
//   const speed = parseInt(typingSpeedInput.value) || 1;  // Get typing speed (default is 1)
//   const delay = 1000 / speed;  // Calculate delay based on speed
  
//   // Typing interval for each character
//   typingInterval = setInterval(() => {
//     if (currentTextIndex < text.length) {
//       document.activeElement.value += text[currentTextIndex];  // Type the next character at the cursor position
//       currentTextIndex++;  // Move to the next character
//     } else {
//       clearInterval(typingInterval);  // Stop typing when done
//       logStatus("Typing completed.");
//     }
//   }, delay);
//   logStatus("Started typing with speed " + speed);
// }

// // Stop Typing Function
// function stopTyping() {
//   clearInterval(typingInterval);  // Stop the typing interval
//   logStatus("Typing stopped.");
// }

// // End Typing Function
// function endTyping() {
//   stopTyping();  // Stop typing
//   currentTextIndex = 0;  // Reset typing index
//   logStatus("Typing ended.");
// }

// // Log Status Function
// function logStatus(message) {
//   loggerTextArea.value += message + "\n";  // Add the message to the logger
//   loggerTextArea.scrollTop = loggerTextArea.scrollHeight;  // Auto-scroll to the latest log
// }

// // Event Listeners for Typing Buttons
// document.querySelector(".start-typing-button button:nth-child(1)").addEventListener("click", startTyping);  // Start Typing button
// document.querySelector(".start-typing-button button:nth-child(2)").addEventListener("click", stopTyping);  // Stop Typing button
// document.querySelector(".start-typing-button button:nth-child(3)").addEventListener("click", endTyping);  // End Typing button

// // Language Tabs Functionality
// document.querySelector(".html-language-tab button").addEventListener("click", () => {
//   editor.session.setMode("ace/mode/html");  // Switch to HTML mode
//   updateSelectedTab(".html-language-tab");
// });
// document.querySelector(".css-language-tab button").addEventListener("click", () => {
//   editor.session.setMode("ace/mode/css");  // Switch to CSS mode
//   updateSelectedTab(".css-language-tab");
// });
// document.querySelector(".javascript-language-tab button").addEventListener("click", () => {
//   editor.session.setMode("ace/mode/javascript");  // Switch to JavaScript mode
//   updateSelectedTab(".javascript-language-tab");
// });

// // Function to update the selected tab styling
// function updateSelectedTab(selector) {
//   document.querySelectorAll(".language-tab-select-section div").forEach(tab => tab.classList.remove("selected-tab"));
//   document.querySelector(selector).classList.add("selected-tab");  // Highlight the selected tab
// }

// // Function to update the iframe with editor content
// function updatePreview() {
//   const iframeDoc = outputIframe.contentWindow.document;  // Access iframe document
//   iframeDoc.open();
//   iframeDoc.write(editor.getValue());  // Write editor content to iframe
//   iframeDoc.close();
// }

// // Event listener to update preview on editor change
// editor.session.on("change", updatePreview);  // Update preview whenever editor content changes

// Caption Update Functionality
document.querySelector(".caption-box button").addEventListener("click", () => {
  const captionText = document.querySelector(".caption-box input").value;  // Get caption text
  document.querySelector(".caption").innerText = captionText;  // Update caption in the output section
  logStatus("Caption updated to: " + captionText);
});

// // Screen Recording Functionality (Placeholder functions for actual recording)
// function startRecording() {
//   logStatus("Recording started...");
//   // Placeholder for actual recording logic
// }

// function endRecording() {
//   logStatus("Recording ended. Video saved.");
//   // Placeholder for saving the recording
// }

// function togglePauseResume() {
//   logStatus("Recording paused/resumed.");
//   // Placeholder for toggling pause/resume recording
// }

// // Event Listeners for Recording Buttons
// document.querySelector(".recording-buttons button:nth-child(1)").addEventListener("click", startRecording);  // Start Recording
// document.querySelector(".recording-buttons button:nth-child(2)").addEventListener("click", endRecording);  // End Recording
// document.querySelector(".recording-buttons button:nth-child(3)").addEventListener("click", togglePauseResume);  // Pause/Resume Recording


// Initialize Ace editor
const editor = ace.edit("editor");
editor.setTheme("ace/theme/monokai");  // Set editor theme

// Variables to store code for each tab
let htmlCode = "<!-- Write your HTML code here -->";
let cssCode = "/* Write your CSS code here */";
let jsCode = "// Write your JavaScript code here";

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
        editor.setValue(htmlCode);
    } else if (language === "css") {
        editor.session.setMode("ace/mode/css");
        editor.setValue(cssCode);
    } else if (language === "javascript") {
        editor.session.setMode("ace/mode/javascript");
        editor.setValue(jsCode);
    }

    // Move the cursor to the end of the content
    editor.navigateFileEnd();

    // Update active button style
    document.querySelectorAll('.tab-button').forEach(button => {
        button.classList.remove('active');
    });
    document.getElementById(`${language}Tab`).classList.add('active');
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
