const splashScreen = document.getElementById('splash-screen');
const mainContent = document.getElementById('main-content');
let scaryVoice = null;

setTimeout(() => {
splashScreen.style.display = 'none';
mainContent.classList.add('show');
speakIntro();
}, 6000);

function speak(text, voice) {
return new Promise(resolve => {
const u = new SpeechSynthesisUtterance(text);
u.voice = voice;
u.pitch = 0.4;
u.rate = 0.85;
u.volume = 1.0;
u.onend = resolve;
speechSynthesis.speak(u);
});
}

function loadVoice() {
return new Promise(resolve => {
let v = speechSynthesis.getVoices();
if (v.length !== 0) resolve(selectDeepVoice(v));
else speechSynthesis.onvoiceschanged = () => {
v = speechSynthesis.getVoices();
resolve(selectDeepVoice(v));
};
});
}

function selectDeepVoice(voices) {
let male = voices.filter(v =>
v.name.toLowerCase().includes("male") ||
v.name.toLowerCase().includes("deep") ||
v.name.toLowerCase().includes("fred") ||
v.name.toLowerCase().includes("bass")
);
return male[0] || voices[0];
}

loadVoice().then(v => scaryVoice = v);

async function speakIntro() {
while(!scaryVoice) await new Promise(r=>setTimeout(r,100));
await speak("Welcome to Anniyan dot com", scaryVoice);
await speak("Enter your credentials", scaryVoice);
}

function speakError(text) {
if(!scaryVoice) return;
speechSynthesis.cancel();
speak(text, scaryVoice);
}

const loginForm = document.getElementById("login-form");
const errorMessage = document.getElementById("error-message");

loginForm.addEventListener("submit", e => {
e.preventDefault();
const username = loginForm.username.value.trim();
const password = loginForm.password.value.trim();
errorMessage.textContent = "";

if(username === "") {
errorMessage.textContent = "The username should not be left empty as per Garuda Purana!";
speakError("The username should not be left empty as per Garuda Purana!");
return;
}
if(password === "") {
errorMessage.textContent = "The password field should not be left empty as per Garuda Purana!";
speakError("The password field should not be left empty as per Garuda Purana!");
return;
}
if(!/[0-9]/.test(password)) {
errorMessage.textContent = "Password must contain at least one number as said in Garuda Purana!";
speakError("Password must contain at least one number as said in Garuda Purana!");
return;
}
if(!/[!@#$%^&*]/.test(password)) {
errorMessage.textContent = "Password must contain at least one special symbol to enter the site!";
speakError("Password must contain at least one special symbol to enter the site!");
return;
}
setTimeout(() => {
    window.location.href = "https://harish040805.github.io/anniyan/anniyanwelcome.html";
}, 3000);
});
