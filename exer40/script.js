

const videos = [

    {
        title: "Beautiful Nature",
        category: "Nature Video",
        src: "https://www.w3schools.com/html/mov_bbb.mp4"
    },

    {
        title: "Amazing Big Buck Bunny",
        category: "Animation",
        src: "https://www.w3schools.com/html/movie.mp4"
    },

    {
        title: "Creative Video",
        category: "Entertainment",
        src: "https://www.w3schools.com/html/mov_bbb.mp4"
    }

];



const video = document.getElementById("video");

const title = document.getElementById("title");

const category = document.getElementById("category");

const videoTitle = document.getElementById("videoTitle");

const playBtn = document.getElementById("playBtn");

const centerPlay = document.getElementById("centerPlay");

const previousBtn =
    document.getElementById("previousBtn");

const nextBtn =
    document.getElementById("nextBtn");

const progress =
    document.getElementById("progress");

const currentTime =
    document.getElementById("currentTime");

const duration =
    document.getElementById("duration");

const volume =
    document.getElementById("volume");

const volumeIcon =
    document.getElementById("volumeIcon");

const speed =
    document.getElementById("speed");

const fullscreenBtn =
    document.getElementById("fullscreenBtn");

const videoNumber =
    document.getElementById("videoNumber");

const totalVideos =
    document.getElementById("totalVideos");




let videoIndex = 0;

let isPlaying = false;


function loadVideo(index) {

    const currentVideo = videos[index];

    title.textContent =
        currentVideo.title;

    videoTitle.textContent =
        currentVideo.title;

    category.textContent =
        currentVideo.category;

    video.src =
        currentVideo.src;

    video.load();

    videoNumber.textContent =
        index + 1;

    totalVideos.textContent =
        videos.length;

    progress.value = 0;

    progress.style.background = `
        linear-gradient(
            90deg,
            var(--primary) 0%,
            var(--track) 0%
        )
    `;

    currentTime.textContent =
        "0:00";

    duration.textContent =
        "0:00";

    isPlaying = false;

    updatePlayIcon();

}




function playVideo() {

    video.play()

        .then(() => {

            isPlaying = true;

            updatePlayIcon();

        })

        .catch((error) => {

            console.error(
                "Video could not play:",
                error
            );

            isPlaying = false;

            updatePlayIcon();

        });

}




function pauseVideo() {

    video.pause();

    isPlaying = false;

    updatePlayIcon();

}




function togglePlay() {

    if (video.paused) {

        playVideo();

    } else {

        pauseVideo();

    }

}



playBtn.addEventListener(
    "click",
    togglePlay
);


centerPlay.addEventListener(
    "click",
    togglePlay
);



function updatePlayIcon() {

    if (isPlaying) {

        playBtn.innerHTML = `
            <i class="fa-solid fa-pause"></i>
        `;

        centerPlay.innerHTML = `
            <i class="fa-solid fa-pause"></i>
        `;

        centerPlay.classList.add(
            "hidden"
        );

    } else {

        playBtn.innerHTML = `
            <i class="fa-solid fa-play"></i>
        `;

        centerPlay.innerHTML = `
            <i class="fa-solid fa-play"></i>
        `;

        centerPlay.classList.remove(
            "hidden"
        );

    }

}




video.addEventListener(
    "play",
    () => {

        isPlaying = true;

        updatePlayIcon();

    }
);




video.addEventListener(
    "pause",
    () => {

        isPlaying = false;

        updatePlayIcon();

    }
);




function nextVideo() {

    videoIndex++;

    if (
        videoIndex >= videos.length
    ) {

        videoIndex = 0;

    }

    loadVideo(videoIndex);

    playVideo();

}



nextBtn.addEventListener(
    "click",
    nextVideo
);




function previousVideo() {

    videoIndex--;

    if (videoIndex < 0) {

        videoIndex =
            videos.length - 1;

    }

    loadVideo(videoIndex);

    playVideo();

}



previousBtn.addEventListener(
    "click",
    previousVideo
);



function updateProgress() {

    if (!video.duration) return;

    const percentage =
        (video.currentTime /
            video.duration) * 100;

    progress.value =
        percentage;

    progress.style.background = `
        linear-gradient(
            90deg,
            var(--primary) ${percentage}%,
            var(--track) ${percentage}%
        )
    `;

    currentTime.textContent =
        formatTime(
            video.currentTime
        );

}




video.addEventListener(
    "timeupdate",
    updateProgress
);




video.addEventListener(
    "loadedmetadata",
    () => {

        duration.textContent =
            formatTime(
                video.duration
            );

    }
);



progress.addEventListener(
    "input",
    () => {

        if (!video.duration) return;

        const newTime =
            (progress.value / 100) *
            video.duration;

        video.currentTime =
            newTime;

    }
);



function formatTime(time) {

    if (isNaN(time)) {

        return "0:00";

    }

    const minutes =
        Math.floor(time / 60);

    const seconds =
        Math.floor(time % 60);

    return `${minutes}:${seconds
        .toString()
        .padStart(2, "0")}`;

}




volume.addEventListener(
    "input",
    () => {

        video.volume =
            Number(volume.value);

        updateVolumeIcon();

        updateVolumeProgress();

    }
);




function updateVolumeProgress() {

    const value =
        Number(volume.value) * 100;

    volume.style.background = `
        linear-gradient(
            90deg,
            var(--primary) ${value}%,
            var(--track) ${value}%
        )
    `;

}



function updateVolumeIcon() {

    const value =
        Number(volume.value);

    if (value === 0) {

        volumeIcon.className =
            "fa-solid fa-volume-xmark";

    }

    else if (value < 0.5) {

        volumeIcon.className =
            "fa-solid fa-volume-low";

    }

    else {

        volumeIcon.className =
            "fa-solid fa-volume-high";

    }

}


speed.addEventListener(
    "change",
    () => {

        video.playbackRate =
            Number(speed.value);

    }
);



fullscreenBtn.addEventListener(
    "click",
    async () => {

        try {

            if (!document.fullscreenElement) {

                await video.requestFullscreen();

            } else {

                await document.exitFullscreen();

            }

        }

        catch (error) {

            console.error(
                "Fullscreen error:",
                error
            );

        }

    }
);



video.addEventListener(
    "ended",
    () => {

        nextVideo();

    }
);



video.addEventListener(
    "click",
    togglePlay
);



loadVideo(videoIndex);

video.volume = 1;

updateVolumeProgress();

updateVolumeIcon();
