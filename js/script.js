function locomotiveAnime() {
  gsap.registerPlugin(ScrollTrigger);

  const locoScroll = new LocomotiveScroll({
    el: document.querySelector("main"),
    smooth: true,
  });

  locoScroll.on("scroll", ScrollTrigger.update);

  ScrollTrigger.scrollerProxy("main", {
    scrollTop(value) {
      return arguments.length
        ? locoScroll.scrollTo(value, 0, 0)
        : locoScroll.scroll.instance.scroll.y;
    },
    getBoundingClientRect() {
      return {
        top: 0,
        left: 0,
        width: window.innerWidth,
        height: window.innerHeight,
      };
    },
    pinType: document.querySelector("main").style.transform
      ? "transform"
      : "fixed",
  });

  ScrollTrigger.addEventListener("refresh", () => locoScroll.update());
  ScrollTrigger.refresh();
}

function navAnime() {
  gsap.to("#nav-left svg", {
    transform: "translateY(-100%)",
    scrollTrigger: {
      trigger: "#page1",
      scroller: "main",
      start: "top 0",
      end: "top -5%",
      scrub: true,
    },
  });
  gsap.to("#nav-right #links", {
    transform: "translateY(-100%)",
    opacity: 0,
    scrollTrigger: {
      trigger: "#page1",
      scroller: "main",
      start: "top 0",
      end: "top -5%",
      scrub: true,
    },
  });
}

function videoconAnimation() {
  const videocon = document.querySelector("#video-container");
  const playBtn = document.querySelector("#play");
  const video = document.querySelector("#video-container video");

  videocon.addEventListener("mouseenter", () => {
    // Use GSAP for smooth animations
    gsap.to(playBtn, {
      scale: 1,
      opacity: 1,
      duration: 0.3,
    });
  });

  videocon.addEventListener("mouseleave", () => {
    gsap.to(playBtn, {
      scale: 0,
      opacity: 0,
      duration: 0.3,
    });
  });

  videocon.addEventListener("mousemove", (dets) => {
    // Animate the button to follow the cursor
    gsap.to(playBtn, {
      left: dets.clientX -25, // Use clientX for viewport-relative position
      top: dets.clientY -25,
      duration: 0.8,
      ease: "power3.out",
    });
  });

  // CORRECTED: Simplified play/pause logic
  videocon.addEventListener("click", function () {
    if (video.paused) {
      video.play();
      playBtn.innerHTML = "Pause";
    } else {
      video.pause();
      playBtn.innerHTML = "Play";
    }
  });
}

function loadingAnimation() {
  gsap.from("#page1 h1", {
    y: 100,
    opacity: 0,
    delay: 0.5,
    duration: 0.9,
    stagger: 0.3,
  });
  gsap.from("#page1 #video-container", {
    scale: 0.9,
    opacity: 0,
    delay: 1.3,
    duration: 0.5,
  });
}

function cursorAnimation() {
  const cursor = document.querySelector("#cursor");

  // Animate cursor to follow mouse
  document.addEventListener("mousemove", (dets) => {
    gsap.to(cursor, {
      left: dets.clientX,
      top: dets.clientY,
      duration: 0.5,
      ease: "power1.out",
    });
  });

  document.querySelectorAll(".elem").forEach(function (elem) {
    elem.addEventListener("mouseenter", function () {
      gsap.to(cursor, {
        transform: "translate(-50%, -50%) scale(1)",
      });
    });
    elem.addEventListener("mouseleave", function () {
      gsap.to(cursor, {
        transform: "translate(-50%, -50%) scale(0)",
      });
    });
  });
}


function footerAnimation() {
  const footerCols = document.querySelectorAll(".footer-col");
  const copyright = document.querySelector(".copyright");

  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: "footer",
      scroller: "main",
      start: "top 95%",
      end: "top 70%",
      scrub: 1,
    },
  });

  tl.from(footerCols, {
    y: 50,
    opacity: 0,
    duration: 1,
    stagger: 0.2,
  }).from(
    copyright,
    {
      opacity: 0,
      duration: 0.5,
    },
    "-=0.5"
  );
}

locomotiveAnime();
navAnime();
videoconAnimation();
loadingAnimation();
cursorAnimation();
footerAnimation();
