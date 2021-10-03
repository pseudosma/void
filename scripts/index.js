window.onload = load;
window.addEventListener('resize', () => {scaleElements(false)});
const subtitleAnimation = "text 11s ease-in-out 0s infinite";
const hideAnimation = "hide 1s linear forwards";
const revealAnimation = "reveal 1s linear forwards";
const postTitleAnimation = "text 7s ease-in-out 0s infinite";

function scaleElements(firstRun) {
    commonScaleElements(firstRun);
    //scroll to top first to avoid positioning issues
    window.scrollTo(0, 0);

    const h = window.innerHeight;
    const w = window.innerWidth;
    const shouldCentralize = (w < 950 || h < 500 || h > w) ? (true) : (false);

    if (!hasNavigated) {
        scaleInnerCircles(h, w);

        const m = [];
        var tfh = "20pt";
        var sfh = "12pt";
        var nfh = "14pt";
        if (w > small) {
            tfh = "28px";
            sfh = "16px";
            nfh = "18px";
        }
        if (w > extraWide) {
            tfh = "36px";
            sfh = "20px";
            nfh = "23px";
        }
        if (w > extraExtraWide) {
            tfh = "48px";
            sfh = "28px";
            nfh = "30px";
        }
    
        m.push(document.getElementById("title"));
        m.push(document.getElementById("animated-title"));
        m.push(document.getElementById("subtitle"));
        m.push(document.getElementById("animated-subtitle"));
    
        var furthestRight = 0;
        var furthestDown = 0;

        for (i = 0; i < m.length; i++) {
            if (m[i]) {
                var z = 0;
                m[i].style.left = 0; //reset for more accurate width calc
    
                //first scale text
                if (m[i].id.includes("subtitle")) {
                    z += 65;
                    m[i].style.fontSize = sfh;
                    if (w > extraWide) {
                        z += 30;
                    }
                } else {
                    m[i].style.fontSize = tfh;
                }
    
                //then work on left positioning
                var rect = m[i].getBoundingClientRect(); 
                const o = ((w/2) - (rect.width) / 2);
                if (shouldCentralize) {
                    m[i].style.left = o + "px";
                } else {
                    z += 100;
                    m[i].style.left = (w / 2) +  "px";
                }
    
                //finally do top positioning
                m[i].style.top = (h / 2) + z + "px";
    
                //now that all transforms are done, get the furthest points
                rect = m[i].getBoundingClientRect();
                if (rect.right > furthestRight) {
                    furthestRight = rect.right;
                }
                if (rect.bottom > furthestDown) {
                    furthestDown = rect.bottom;
                }
            }
        }
    
        var n = document.getElementById("navigate");
        if (n) {
            n.left = 0;
            n.style.top = furthestDown + "px";
            n.style.fontSize = nfh;
            const r = n.getBoundingClientRect();
            if (shouldCentralize) {
                n.style.left = ((w/2) - (r.width/2)) + "px";
            } else {
                var z = w * 0.90;
                if (furthestRight > z) {
                    //clip the navigate offset at 80% of the width
                    n.style.left = z - r.width + "px";
                } else {
                    n.style.left = (furthestRight - r.width) + "px";
                }
            }
        }
    }
    //sizing for posts
    const p = document.getElementById("posts");
    if (p) {
        if (w > 950) {
            p.style.maxWidth = "50%"
        } else {
            p.style.maxWidth = "90%"
        }
    }  
    const pt = document.getElementsByClassName("post-title");
    for (i = 0; i < pt.length; i++) {
        pt[i].style.fontSize = "18pt";
        if (w > extraWide) {
            pt[i].style.fontSize = "24pt";
        }
        if (w > extraExtraWide) {
            pt[i].style.fontSize = "36pt";
        }
    }
    const pd = document.getElementsByClassName("post-description");
    for (i = 0; i < pd.length; i++) {
        pd[i].style.fontSize = "14pt";
        if (w > extraWide) {
            pd[i].style.fontSize = "20pt";
        }
        if (w > extraExtraWide) {
            pd[i].style.fontSize = "28pt";
        }
    }
    const c = document.getElementsByClassName("chapters");
    for (i = 0; i < c.length; i++) {
        c[i].style.fontSize = "14pt";
        if (w > extraWide) {
            c[i].style.fontSize = "20pt";
        }
        if (w > extraExtraWide) {
            c[i].style.fontSize = "28pt";
        }
    }
    const dw = document.getElementsByClassName("description-wrapper");
    for (i = 0; i < dw.length; i++) {
        if (dw[i].style.maxHeight){
            dw[i].style.maxHeight = dw[i].scrollHeight + "px";
        } else {
            dw[i].style.maxHeight = null;
        }
    }
}

function animatePostTitle() {
    animate(this.firstElementChild, postTitleAnimation)
}

function clearAnimation() {
    animate(this.firstElementChild, null)
}

function load() {
    scaleElements(true);
    const circles = document.getElementsByClassName("circle");
    for (i = 0; i < circles.length; i++) {
        circles[i].style.visibility = "visible";
    }
    document.getElementById("title-wrapper").style.visibility = "visible";
    //add the expansion
    const pt = document.getElementsByClassName("post-title");
    for (i = 0; i < pt.length; i++) {
        pt[i].addEventListener("click", function() {
            var d = this.nextElementSibling;
            if (d.style.maxHeight){
                d.style.maxHeight = null;
            } else {
                d.style.maxHeight = d.scrollHeight + "px";
            } 
        });
        pt[i].onmouseenter = animatePostTitle;
        pt[i].onmouseleave = clearAnimation;
    }

    const r = commonLoad();
    for (i = 0; i < r.length; i++) {
        if (r[i].toLowerCase() == "skip") {
            if(isPlaying) {
                //set is playing to false to avoid the load animation
                isPlaying = false;
                revealPosts();
                isPlaying = true;
            } else {
                revealPosts();
            }
            break;
        }
    }
}

function playPause() {
    const at = document.getElementById("animated-title");
    const as = document.getElementById("animated-subtitle");
    const pt = document.getElementsByClassName("post-title");
    if (isPlaying) {
        if (!hasNavigated) {
            animate(at, "none");
            animate(as, "none");
        }
        for (i = 0; i < pt.length; i++) {
            pt[i].onmouseenter = null;
            pt[i].onmouseleave = null;
        }
    } else {
        if (!hasNavigated) {
            animate(at, titleAnimation);
            animate(as, subtitleAnimation);
        }
        for (i = 0; i < pt.length; i++) {
            pt[i].onmouseenter = animatePostTitle;
            pt[i].onmouseleave = clearAnimation;
        }
    }
    commonPlayPause();
}

function revealPosts() {
    if (!hasNavigated) {
        hasNavigated = true;
        const circles = document.getElementsByClassName("circle");
        const menus = document.getElementsByClassName("menu");
        const at = document.getElementById("animated-title");
        const as = document.getElementById("animated-subtitle");
        const t = document.getElementById("title");
        const s = document.getElementById("subtitle");
        const n = document.getElementById("navigate");
        const p = document.getElementById("posts");
        const mw = document.getElementById("menu-wrapper");
        for (i = 0; i < circles.length; i++) {
            if (isPlaying) {
                animate(circles[i], hideAnimation)
            } else {
                circles[i].style.visibility = "hidden";
            }
        }
        for (i = 0; i < menus.length; i++) {
            if (isPlaying) {
                animate(menus[i], "glitchInColor 1s linear 0s forwards")
            }
        }
        p.style.display = "inherit";
        if (isPlaying) {
            animate(at, hideAnimation);
            animate(as, hideAnimation);
            animate(s, hideAnimation);
            animate(t, hideAnimation);
            animate(n, hideAnimation);
            animate(p, revealAnimation);
            mw.style.visibility = "visible";
            animate(mw, "glitchIn 1s linear 0s forwards");
        } else {
            animate(at, "none");
            animate(as, "none");
            animate(s, "none");
            animate(t, "none");
            animate(n, "none");
            animate(p, "none");
            at.style.visibility = "hidden";
            as.style.visibility = "hidden";
            s.style.visibility = "hidden";
            t.style.visibility = "hidden";
            n.style.visibility = "hidden";
            p.style.visibility = "visible";
            p.style.opacity = 100;
            mw.style.visibility = "visible";
        }
    }
}