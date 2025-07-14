// Initialize Howler.js sounds
const sounds = {
    teashop: new Howl({
        src: ['sounds/teashop.mp3'],
        loop: true,
        volume: 0
    }),
    river: new Howl({
        src: ['sounds/river.mp3'],
        loop: true,
        volume: 0
    }),
    temple: new Howl({
        src: ['sounds/temple.mp3'],
        loop: true,
        volume: 0
    }),
    paddy: new Howl({
        src: ['sounds/paddy.mp3'],
        loop: true,
        volume: 0
    }),
    rain: new Howl({
        src: ['sounds/rain.mp3'],
        loop: true,
        volume: 0
    }),
    thunder: new Howl({
        src: ['sounds/thunder.mp3'],
        loop: true,
        volume: 0
    }),
    song1: new Howl({
        src: ['songs/song1.mp3'],
        volume: 0.7
    }),
    song2: new Howl({
        src: ['songs/song2.mp3'],
        volume: 0.7
    }),
    song3: new Howl({
        src: ['songs/song3.mp3'],
        volume: 0.7
    })
};

// Village location click handlers
document.querySelectorAll('.location').forEach(location => {
    location.addEventListener('click', function() {
        const soundType = this.getAttribute('data-sound');
        
        // Stop all location sounds first
        Object.keys(sounds).forEach(key => {
            if (key !== 'rain' && key !== 'thunder' && !key.startsWith('song')) {
                sounds[key].stop();
            }
        });
        
        // Play the selected sound
        sounds[soundType].play();
        sounds[soundType].fade(0, 1, 1000);
    });
});

// Ambient sound sliders
document.getElementById('rain').addEventListener('input', function() {
    const volume = parseFloat(this.value);
    sounds.rain.volume(volume);
    
    // Show/hide rain effect
    const rainEffect = document.querySelector('.rain-effect');
    if (volume > 0) {
        rainEffect.classList.remove('hidden');
        rainEffect.style.opacity = volume;
    } else {
        rainEffect.classList.add('hidden');
    }
});

document.getElementById('thunder').addEventListener('input', function() {
    const volume = parseFloat(this.value);
    sounds.thunder.volume(volume);
    
    // Random lightning when thunder volume is high
    if (volume > 0.7 && Math.random() > 0.7) {
        const lightning = document.querySelector('.lightning-effect');
        lightning.classList.remove('hidden');
        lightning.style.opacity = 0.7;
        
        setTimeout(() => {
            lightning.style.opacity = 0;
            setTimeout(() => {
                lightning.classList.add('hidden');
            }, 1000);
        }, 100);
    }
});

// Music player controls
const songSelector = document.getElementById('song-selector');
const playBtn = document.getElementById('play-btn');
const pauseBtn = document.getElementById('pause-btn');

songSelector.addEventListener('change', function() {
    const song = this.value;
    if (song) {
        // Stop any currently playing song
        Object.keys(sounds).forEach(key => {
            if (key.startsWith('song')) {
                sounds[key].stop();
            }
        });
        
        sounds[song].play();
    }
});

playBtn.addEventListener('click', function() {
    const currentSong = songSelector.value;
    if (currentSong) {
        sounds[currentSong].play();
    }
});

pauseBtn.addEventListener('click', function() {
    const currentSong = songSelector.value;
    if (currentSong) {
        sounds[currentSong].pause();
    }
});

document.getElementById('volume').addEventListener('input', function() {
    const volume = parseFloat(this.value);
    Object.keys(sounds).forEach(key => {
        if (key.startsWith('song')) {
            sounds[key].volume(volume);
        }
    });
});

// Day/Night toggle
document.getElementById('day-night').addEventListener('click', function() {
    document.body.classList.toggle('night-mode');
    this.textContent = document.body.classList.contains('night-mode') 
        ? 'Switch to Day' 
        : 'Switch to Night';
    
    // Change ambiance sounds for night
    if (document.body.classList.contains('night-mode')) {
        sounds.crickets = new Howl({
            src: ['sounds/crickets.mp3'],
            loop: true,
            volume: 0.5
        });
        sounds.crickets.play();
    } else if (sounds.crickets) {
        sounds.crickets.stop();
    }
});