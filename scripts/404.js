window.onload = load;
window.addEventListener('resize', scaleElements);

function scaleElements() {
    //scroll to top first to avoid positioning issues
    window.scrollTo(0, 0);

    const h = window.innerHeight;
    const w = window.innerWidth;

    scaleInnerCircles(h, w);

    var tfh = "24pt";
    if (w > small) {
        tfh = "48px"
    }
    if (w > extraWide) {
        tfh = "64px"
    }
    if (w > extraExtraWide) {
        tfh = "72px"
    }

    const t = document.getElementById("title");
    const at = document.getElementById("animated-title");

    t.style.fontSize = tfh;
    at.style.fontSize = tfh;

    const o = ((w / 2) - (t.getBoundingClientRect().width) / 2);
    t.style.left = o + "px";
    at.style.left = o + "px";

    t.style.top = (h / 2) + "px";
    at.style.top = (h / 2) + "px";
}

function playPause() {
    const at = document.getElementById("animated-title");
    if (isPlaying) {
        animate(at, "none");
    } else {
        animate(at, titleAnimation);
    }
    commonPlayPause();
}

function load() {
    scaleElements();
    const circles = document.getElementsByClassName("circle");
    for (i = 0; i < circles.length; i++) {
        circles[i].style.visibility = "visible";
    }
    document.getElementById("title-wrapper").style.visibility = "visible";
    commonLoad();
}