let storyIndex = 0;
let sinisterGender = null;
let sinisterColor = null;

const stories = [
  "WELCOME TO ANNIYAN.COM<br><br>Get Solutions for All Your Problems<br><br>",
  "On the way to Yamapuri, the last sanctuary for the souls that wait <br> on the banks of the Vai Dharani river is nothing but this WEBSITE! <br><br>",
  `
    Misanthropist, Disobedient, Rule-breakers, Rebels of the Government, the people who do not work and be Lazy, 
    the people who deceive other people,
    <br>
    None of the Rule-breakers can escape the gaze of Anniyan!
    <br><br>
  `,
  "What is the crime you wish to complain about to me? <br><br>", 
  "What is the name of the Sinister? <br><br>", 
  "What is the gender of the Sinister? <br><br>", 
  "What is the age of the Sinister? <br><br>",
  "What is the color of the Sinister? <br><br>",
  "Describe the appearance of the Sinister <br><br>",
  "Don't worry! They will be punished as said in Garuda Purana! <br><br>"
];

function selectGender(gender) {
  sinisterGender = gender;
  document.getElementById("male-button").style.background = "";
  document.getElementById("female-button").style.background = "";
  document.getElementById("transgender-button").style.background = "";
  document.getElementById(gender + "-button").style.background = "#80ac81";
}

let scaryVoice = null;

function speak(text, voice) {
  return new Promise(resolve => {
    const u = new SpeechSynthesisUtterance(text.replace(/<br>/g, " "));
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
    let voices = speechSynthesis.getVoices();
    if (voices.length !== 0) {
      resolve(selectDeepVoice(voices));
    } else {
      speechSynthesis.onvoiceschanged = () => {
        voices = speechSynthesis.getVoices();
        resolve(selectDeepVoice(voices));
      };
    }
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

async function nextPartOfStory() {
  const btn = document.getElementById("continue-button");
  btn.disabled = true;

  if (storyIndex >= 3 && storyIndex <= 8) {
    if (storyIndex === 5) {
      if (sinisterGender === null) {
        document.getElementById("error-message").style.display = "block";
        btn.disabled = false;
        return;
      }
    } else if (storyIndex === 7) { 
      if (!document.getElementById("color-picker").value) {
        document.getElementById("error-message").style.display = "block";
        btn.disabled = false;
        return;
      }
      sinisterColor = document.getElementById("color-picker").value;
    } else {
      const input = document.getElementById("input-tag").value.trim();
      if (input === "") {
        document.getElementById("error-message").style.display = "block";
        btn.disabled = false;
        return;
      }
      if (storyIndex === 6) {
        const n = Number(input);
        if (Number.isNaN(n) || n < 0 || n > 99) {
          document.getElementById("error-message").style.display = "block";
          btn.disabled = false;
          return;
        }
      }
    }
  }
  document.getElementById("error-message").style.display = "none";
  storyIndex++;
  if (storyIndex === stories.length - 1) {
    const finalMessage = `Don't worry! They will be punished as said in Garuda Purana!<br>on ${getMockPunishmentDate()}<br><br>`;
    document.getElementById("story").innerHTML = finalMessage;
    btn.style.display = "none";
    alert("This action may take some time. Kindly wait!");
    const speakPromise = scaryVoice
      ? speak(finalMessage, scaryVoice)
      : loadVoice().then(v => speak(finalMessage, v));
    speakPromise.then(() => {
      window.location.href = "https://harish040805.github.io/anniyan/";
    });
    btn.disabled = false; 
    return;
  }
  document.getElementById("story").innerHTML = stories[storyIndex];
  if (scaryVoice) await speak(stories[storyIndex], scaryVoice);
  else await loadVoice().then(v => speak(stories[storyIndex], v));
  btn.disabled = false;
  if (storyIndex >= 3 && storyIndex <= 9) {
    if (storyIndex === 5) {
      document.getElementById("input-tag").style.display = "none";
      document.getElementById("gender-buttons").style.display = "block";
      document.getElementById("color-input").style.display = "none";
    } else if (storyIndex === 7) {
      document.getElementById("input-tag").style.display = "none";
      document.getElementById("gender-buttons").style.display = "none";
      document.getElementById("color-input").style.display = "block";
    } else {
      document.getElementById("input-tag").style.display = "block";
      document.getElementById("gender-buttons").style.display = "none";
      document.getElementById("color-input").style.display = "none";
      if (storyIndex === 6) {
        document.getElementById("input-tag").type = "number";
        document.getElementById("input-tag").min = "16";
        document.getElementById("input-tag").max = "99";
      } else {
        document.getElementById("input-tag").type = "text";
      }
      document.getElementById("input-tag").value = "";
    }
  } else {
    document.getElementById("input-tag").style.display = "none";
    document.getElementById("gender-buttons").style.display = "none";
    document.getElementById("color-input").style.display = "none";
  }
}
function getMockPunishmentDate() {
  const today = new Date();
  let day, month, year;
  year = Math.floor(Math.random() * (2100 - today.getFullYear() + 1)) + today.getFullYear();
  if (year === today.getFullYear()) {
    month = Math.floor(Math.random() * (12 - (today.getMonth() + 1) + 1)) + (today.getMonth() + 1);
  } else {
    month = Math.floor(Math.random() * 12) + 1;
  }
  day = Math.floor(Math.random() * 29) + 1;
  return `${day.toString().padStart(2, '0')}-${month.toString().padStart(2, '0')}-${year}`;
}
const splashScreen = document.getElementById('splash-screen');
const mainContent = document.getElementById('main-content');
setTimeout(() => {
  splashScreen.style.display = 'none';
  mainContent.classList.add('show');
}, 6000);
