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

let scaryVoice = null;

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

const splashScreen = document.getElementById('splash-screen');
const mainContent = document.getElementById('main-content');

setTimeout(async function() {
    splashScreen.style.display = 'none';
    mainContent.classList.add('show');

    if (scaryVoice) {
        await speak("Sarva Dharmaan Pari Tyajya Maam Ekam Sarnam Vraja! Aham Thvaam Sarva Paa peap you Mokshish yaami! Ma Chusaa! He who comes from hell is not afraid of hot ashes! Anniyan dot com!", scaryVoice);
    } else {
        loadVoice().then(v => speak("Sarva Dharmaan Pari Tyajya Maam Ekam Sarnam Vraja! Aham Thvaam Sarva Paa peap you Mokshish yaami! Ma Chusaa! He who comes from hell is not afraid of hot ashes! Anniyan dot com!", v));
    }
}, 6000); 
