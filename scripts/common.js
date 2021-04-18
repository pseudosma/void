const ratio = window.devicePixelRatio || 1;
const titleAnimation = "text 17s ease-in-out 0s infinite";
const shiftingAnimation = "shift 2s linear 0s infinite";
const small = 500;
const extraWide = 1800;
const extraExtraWide = 2400;
var isPlaying = window.matchMedia('(prefers-reduced-motion)').matches ? false : true;
var menuOpen = false;

const palette = [
    {f: "#aaafb9", bg: "none"},
    {f: "#FFF", bg: "none"},
    {f: "#000", bg: "#FFF"},
];
var cIndex = 0;

function animate(element, animation) {
    element.style.webkitAnimation = animation;
    element.style.mozAnimation = animation;
    element.style.oAnimation = animation;
    element.style.msTransition = animation;
    element.style.animation = animation;
}

function hideRevealPlayPauseButtons() {
    const pl = document.getElementsByClassName("play");
    const ps = document.getElementsByClassName("pause");
    if (isPlaying) {
        for (i = 0; i < pl.length; i++) {
            pl[i].style.visibility = "hidden"
        }
        for (i = 0; i < ps.length; i++) {
            ps[i].style.visibility = "visible"
        }
    } else {
        for (i = 0; i < pl.length; i++) {
            pl[i].style.visibility = "visible"
        }
        for (i = 0; i < ps.length; i++) {
            ps[i].style.visibility = "hidden"
        }
    }
}

function commonPlayPause() {
    const sb = document.getElementById("shifting-background");
    if (isPlaying) {
        animate(sb, "none");
    } else {
        animate(sb, shiftingAnimation);
    }
    isPlaying = !isPlaying;
    hideRevealPlayPauseButtons();
}

function commonScaleElements() {
    var scale;
    if (window.innerWidth < small) {
        const s = document.getElementsByClassName("td-hidden-at-small");
        for (i = 0; i < s.length; i++) {
            s[i].style.display = "none";
        };
    } else {
        const s = document.getElementsByClassName("td-hidden-at-small");
        for (i = 0; i < s.length; i++) {
            s[i].style.display = "table-cell";
        };
    }
    if (window.innerWidth > extraExtraWide) {
        scale = 2;
    } else {
        scale = 1;
    }
    const oldScale = getComputedStyle(document.documentElement).getPropertyValue('--scale');
    if (oldScale != scale) {
        document.documentElement.style.setProperty('--scale', scale);
        const mw = document.getElementById("menu-wrapper");
        for (i = 0; i < mw.childElementCount; i++) {
            if (mw.children[i].classList.contains("unscalable")) {
                const a = [];
                a.push({k: "r", v: mw.children[i].getAttribute("r")});
                a.push({k: "x", v: mw.children[i].getAttribute("x")});
                a.push({k: "y", v: mw.children[i].getAttribute("y")});
                a.push({k: "cx", v: mw.children[i].getAttribute("cx")});
                a.push({k: "cy", v: mw.children[i].getAttribute("cy")});
                a.push({k: "rx", v: mw.children[i].getAttribute("rx")});
                a.push({k: "ry", v: mw.children[i].getAttribute("ry")});
                a.push({k: "width", v: mw.children[i].getAttribute("width")});
                a.push({k: "height", v: mw.children[i].getAttribute("height")});
                a.push({k: "stroke-width", v: mw.children[i].getAttribute("stroke-width")});
                for (ii = 0; ii < a.length; ii++)
                if (a[ii]) {
                    var int = parseInt(a[ii].v);
                    if (int === int) { //NaN check
                        if (oldScale < scale) {
                            int = int * 2;
                        } else {
                            int = int / 2;
                        }
                        mw.children[i].setAttribute(a[ii].k, int);
                    }
                }
                //now parse points
                const points = mw.children[i].getAttribute("points");
                if (points) {
                    var pString = "";
                    const p = points.split(" ");
                    for (iii = 0; iii < p.length; iii++) {
                        if (iii > 0 && iii < p.length) {
                            pString = pString + " "
                        }
                        const xy = p[iii].split(",");
                        var x = parseInt(xy[0]);
                        var y = parseInt(xy[1]);
                        if (oldScale < scale) {
                            x = x * 2;
                            y = y * 2;
                        } else {
                            x = x / 2;
                            y = y / 2;
                        }
                        pString = pString + x + "," + y;
                    }
                    mw.children[i].setAttribute("points", pString);
                }
            }
        }
        document.documentElement.style.setProperty('--scale', scale);
    }
}

function commonLoad() {
    hideRevealPlayPauseButtons();
    const r = window.location.search.replace("?","").split("&");
    for (i = 0; i < r.length; i++) {
        const q = r[i].toLowerCase();
        if (q == "pause") {
            //playPause must be implemented in a local JS file
            if (playPause) {
                playPause();
            }
            break;
        }
        if (q.includes("palette")) {
            try {
                const p = r[i].split("=");
                changeColor(parseInt(p[1]));
            } catch {
                //do nothing
            }   
        }
    }
    return r;
}

function toggleMenu() {
    const m = document.getElementsByClassName("menu");
    const mi = document.getElementsByClassName("menu-item");
    const mw = document.getElementById("menu-wrapper");
    const sb = document.getElementById("stop-button");
    if (menuOpen) {
        for (i = 0; i < mi.length; i++) {
          animate(mi[i], "hideMenuItems 0.5s ease-in-out 0s forwards");
    }
        for (i = 0; i < m.length; i++) {
            animate(m[i], "closeMenu 0.5s ease-in-out 0s forwards");
        }
        animate(mw, "closeMenu2 0.5s ease-in-out 0s forwards");
        animate(sb, "closeStopButton 0.5s ease-in-out 0s forwards");
    } else {
        for (i = 0; i < mi.length; i++) {
          const n = i < 10 ? ("0" + i) : (i) ;
          animate(mi[i], "revealMenuItems 0.5s ease-in-out 0." + n + "s forwards");
        }
        for (i = 0; i < m.length; i++) {
          animate(m[i], "openMenu 0.5s ease-in-out 0s forwards");
        }
        animate(mw, "openMenu2 0.5s ease-in-out 0s forwards");
        animate(sb, "openStopButton 0.5s ease-in-out 0s forwards");
    }
    menuOpen = !menuOpen;
}

function changeColor(i) {
    if (i && i < palette.length) {
        cIndex = i;
    } else {
        if (cIndex >= (palette.length - 1)) {
            cIndex = 0;
        } else {
            cIndex += 1;
        }
    }
    document.documentElement.style.setProperty("--defaultTextColor", palette[cIndex].f);
    var c = palette[cIndex].bg;
    document.documentElement.style.setProperty("--defaultBackgroundColor", c);
}

function link(destination, base) {
    var query = "";
    if (!base) {
        query = "?";
    } else {
        query = base;
    }
    if (!isPlaying) {
        query += (query === "?" ? "" : "&" ) + "pause";
    }
    if (cIndex > 0) {
        query += (query === "?" ? "" : "&" ) + "palette=" + cIndex;
    }
    window.location.href = destination + query;
}

function home(destination) {
    link(destination, "?skip");
}

function scaleInnerCircles(h, w) {
    const innerCircles = document.getElementsByClassName("inner-circle");
    
    for (i = 0; i < innerCircles.length; i++) {
        innerCircles[i].setAttribute("cx", (w / 2) + "px");
        innerCircles[i].setAttribute("cy", (h / 2) + "px");
        var n = w / 3;
        if (w > h) {
            n = h / 3
        }
        if (n < 100) {
            n = 100;
        }
        innerCircles[i].setAttribute("r", n + "px");
    }
}