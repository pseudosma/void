window.onload = load;
window.addEventListener('resize', () => {scaleElements(false)});

function scaleElements(firstRun) {
    commonScaleElements(firstRun);
    //scroll to top first to avoid positioning issues
    window.scrollTo(0, 0);

    const w = window.innerWidth;
    const t = document.getElementById("title");
    const at = document.getElementById("animated-title");
    const tx = document.getElementById("text");

    //reset these before making calculations
    t.style.left = 0;
    at.style.left = 0;

    t.style.top = "90px";
    at.style.top = "90px";

    t.style.fontSize = "24px";
    at.style.fontSize = "24px";
    tx.style.fontSize = "14pt";


    if (w > 700) {
        t.style.fontSize = "36px";
        at.style.fontSize = "36px";
    } 
    if (w > 1800) {
        t.style.fontSize = "48px";
        at.style.fontSize = "48px";
        tx.style.fontSize = "24pt";
    }

    const rect = t.getBoundingClientRect();
    const o = ((w/2) - (rect.width) / 2);

    t.style.left = o + "px";
    at.style.left = o + "px";

    tx.style.marginTop = rect.bottom + 20 + "px";
    if (w > 950) {
        tx.style.maxWidth = "85%"
    } else {
        tx.style.maxWidth = "90%"
    }
}

function load() {
    scaleElements(true);
    document.getElementById("post-title-wrapper").style.visibility = "visible";
    document.getElementById("text").style.visibility = "visible";
    document.getElementById("menu-wrapper").style.visibility = "visible";
    commonLoad();
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