let btn = document.querySelector("#btn");
let content = document.querySelector("#content");
let voice = document.querySelector("#voice");

function speak(text, lang = "hi-GB") {
    let text_speak = new SpeechSynthesisUtterance(text);
    text_speak.rate = 1;
    text_speak.pitch = 1;
    text_speak.volume = 1;
    text_speak.lang = lang; // Set language dynamically
    window.speechSynthesis.speak(text_speak);
}

function wishMe() {
    let hours = new Date().getHours();
    if (hours >= 0 && hours < 12) {
        speak("Good morning!");
    } else if (hours >= 12 && hours < 16) {
        speak("Good afternoon!");
    } else {
        speak("Good evening!");
    }
}

window.addEventListener('load', () => {
    wishMe();
});

let speechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
let recognition = new speechRecognition();

recognition.onresult = (event) => {
    let currentIndex = event.resultIndex;
    let transcript = event.results[currentIndex][0].transcript;
    content.innerText = transcript;
    takeCommand(transcript.toLowerCase());
};

btn.addEventListener("click", () => {
    recognition.start();
    btn.style.display = "none";   
    voice.style.display = "block"; 
});

function takeCommand(message) {
    btn.style.display = "flex";  
    voice.style.display = "none";  

    // Remove all occurrences of "shifpra"
    let cleanedMessage = message.replaceAll("shifpra", "").trim(); 

    if (cleanedMessage.includes("hello") || cleanedMessage.includes("hey")) {
        speak("Hello sir, what can I help you with?");
    } else if (cleanedMessage.includes("who are you")) {
        speak("I am a virtual assistant, created by Adarsh sir.");
    } else if (cleanedMessage.includes("open youtube")) {
        speak("Opening YouTube...");
        window.open("https://youtube.com/", "_blank");
    } else if (cleanedMessage.includes("open facebook")) {
        speak("Opening Facebook...");
        window.open("https://facebook.com/", "_blank");
    } else if (cleanedMessage.includes("open instagram")) {
        speak("Opening Instagram...");
        window.open("https://instagram.com/", "_blank");
    } else if (cleanedMessage.includes("open google")) {
        speak("Opening Google...");
        window.open("https://google.com/", "_blank");
    } else {
        let finalText = "This is what I found on the internet regarding " + cleanedMessage;
        speak(finalText);
        window.open(`https://www.google.com/search?q=${cleanedMessage}`, "_blank");
    }
}


