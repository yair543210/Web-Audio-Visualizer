document.addEventListener("DOMContentLoaded", initAudio);

//variables
let html, body, canvas, ctx, windowWidth, windowHeight, centerX, centerY, radius,
    bars, barWidth, audio, audioContext, frequency_array, analyser, playButton, nextButton, prevButton, songTitleDisplay;

let songs = [
    "ROY KNOX & Shiah Maisel - Living With Regret [NCS Release]",
    "Jim Yosef - Let You Go [NCS Release]",
    "Kozah - Heavens [NCS Release]"
];
let currentSongIndex = 0;

let backgroundColors = ["black", "red", "blue"];


function initAudio() {
    html = document.getElementsByTagName("HTML")[0];
    body = document.getElementsByTagName("BODY")[0];    
    console.log(body)
    body.style.backgroundColor = backgroundColors[currentSongIndex];        
    html.style.backgroundColor = backgroundColors[currentSongIndex];        
    audio = new Audio();
    audioContext = new(window.AudioContext || window.webkitAudioContext)();
    analyser = audioContext.createAnalyser();
    audio.src = "./mp3/" + songs[currentSongIndex] + ".mp3";
    songTitleDisplay = document.querySelector('.songTitle');
    songTitleDisplay.innerHTML = "Song Name: " + songs[currentSongIndex];
    let source = audioContext.createMediaElementSource(audio);
    source.connect(analyser);
    analyser.connect(audioContext.destination);
    frequency_array = new Uint8Array(analyser.frequencyBinCount);
    addSoundControlsEventListeners();
}

function addSoundControlsEventListeners() {
    addPlayButtonListener();
    addNextButtonEventListener();
    addPrevButtonEventListener();
}

function addPlayButtonListener() {
    playButton = document.querySelector('.playButton');
    playButton.addEventListener("click", () => {
        if (playButton.classList.contains("play")) {
            playButton.innerHTML = "Stop";
            playButton.classList.add("stop");
            playButton.classList.remove("play");
            audioContext.resume();
            audio.play();
            animationLoop();
        } else { //stop                     
            frequency_array = new Uint8Array(analyser.frequencyBinCount);                        
            console.log(frequency_array);                        
            audio.src = "./mp3/" + songs[currentSongIndex] + ".mp3";            
            playButton.innerHTML = "Play";
            playButton.classList.add("play");
            playButton.classList.remove("pause");
        }
    });
}

function addNextButtonEventListener() {
    nextButton = document.querySelector('.next');
    nextButton.addEventListener("click", () => {
        currentSongIndex++;

        if (currentSongIndex >= songs.length) {
            currentSongIndex = 0;
        }
        body.style.backgroundColor = backgroundColors[currentSongIndex];        
        html.style.backgroundColor = backgroundColors[currentSongIndex];        
        audio.src = "./mp3/" + songs[currentSongIndex] + ".mp3";
        songTitleDisplay.innerHTML = "Song Name: " + songs[currentSongIndex];
        playButton.innerHTML = "Play";
        playButton.classList.add("play");
        playButton.classList.remove("pause");
    })
}

function addPrevButtonEventListener() {
    prevButton = document.querySelector('.prev');
    prevButton.addEventListener("click", (event) => {
        currentSongIndex--;
        if (currentSongIndex <= -1) {
            currentSongIndex = songs.length - 1;
        }
        body.style.backgroundColor = backgroundColors[currentSongIndex];        
        html.style.backgroundColor = backgroundColors[currentSongIndex];        
        audio.src = "./mp3/" + songs[currentSongIndex] + ".mp3";
        songTitleDisplay.innerHTML = "Song Name: " + songs[currentSongIndex];
        playButton.innerHTML = "Play";
        playButton.classList.add("play");
        playButton.classList.remove("pause");
    })
}

function animationLoop() {
    windowWidth = window.innerWidth;
    windowHeight = window.innerHeight;
    canvas = document.getElementById("canvas");
    canvas.width = windowWidth;
    canvas.height = windowHeight;
    bars = 200;
    barWidth = 2;
    drawCircle();
    drawBars(200);
    window.requestAnimationFrame(animationLoop);
}

function drawCircle() {
    centerX = windowWidth / 2;
    centerY = windowHeight / 2;
    radius = 200;
    ctx = canvas.getContext("2d");
    ctx.strokeStyle = "#a9ccee";
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI);
    ctx.shadowBlur = 10;
    ctx.shadowColor = "yellow";
    ctx.stroke();
}

function drawBars(amountOfBars) {
    analyser.getByteFrequencyData(frequency_array);
    for (let i = 0; i < amountOfBars; i++) {
        let barHeight = frequency_array[i];
        let rads = Math.PI * 2 / amountOfBars;
        let x = centerX + Math.cos(rads * i) * (radius);
        let y = centerY + Math.sin(rads * i) * (radius);
        let xEnd = centerX + Math.cos(rads * i) * (radius + barHeight);
        let yEnd = centerY + Math.sin(rads * i) * (radius + barHeight);
        drawSingleBar(x, y, xEnd, yEnd, barWidth, frequency_array);
    }
}

function drawSingleBar(x1, y1, x2, y2, width, frequency) {
    ctx.lineWidth = width;
    ctx.beginPath();
    ctx.strokeStyle = "#a9ccee";
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.shadowBlur = 0;
    ctx.shadowColor = null;
    ctx.stroke();
}

function loadAudio() {
    audio = new Audio();
    let audioContext = new(window.AudioContext || window.webkitAudioContext)();
    let analyser = audioContext.createnalyser();
    audio.src = "./mp3/song.mp3";
    let source = context.createMediaElementSource(audio);
    source.connect(analyser);
    analyser.connect(context.destenation);
    frequency_array = new Unot8Arry(analyser.frequencyBinCount);
    audio.play();
}