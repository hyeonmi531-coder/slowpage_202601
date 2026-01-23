// ============================================
// common.js
// ============================================

console.clear();

// 스크롤 시작 시 header-top-bar 배경색 변경
ScrollTrigger.create({
  start: "top -50", // 50px내려가면 실행
  onUpdate: (self) => {
    const pcBar = document.querySelector(".header-top-bar");
    const mobileBar = document.querySelector(".mobile-header-top-bar");
    // 50px 이상 내려오면 클래스 추가, 최상단이면 제거
    if (window.scrollY > 50) {
      pcBar.classList.add("is-active");
      mobileBar.classList.add("is-active");
    } else {
      pcBar.classList.remove("is-active");
      mobileBar.classList.remove("is-active");
    }
  },
});

// pc 섹션1: 슬라이드 + 페이지네이션
function section1SwiperInit() {
  const swiper = new Swiper(".section-1 .swiper", {
    direction: "horizontal",
    slidesPerView: 1,
    spaceBetween: 0,
    centeredSlides: false,
    loop: true,
    speed: 600,

    autoplay: {
      delay: 5000, // 5초마다 자동 전환
      disableOnInteraction: false,
      pauseOnMouseEnter: true, // 마우스 호버 시 일시정지
    },
    effect: "slide",

    pagination: {
      el: ".section-1 .swiper-pagination",
      type: "fraction",
      // clickable: true,

      renderFraction: function (currentClass, totalClass) {
        return `
        <span class="${currentClass}"></span>
        /
        <span class="${totalClass}"></span>
      `;
      },
    },
    // Navigation arrows
    navigation: {
      nextEl: ".section-1 .swiper-button-next",
      prevEl: ".section-1 .swiper-button-prev",
    },
  });
}

section1SwiperInit();

// 페이지 로드시 페이드 업 효과 실행
$(document).ready(function () {
  setTimeout(function () {
    $(".section-1, .mobile-section-1").addClass("active");
  }, 150);
});

// 모바일 섹션:1 슬라이드
function mobileSection1SwiperInit() {
  const swiper = new Swiper(".mobile-section-1 .swiper", {
    direction: "horizontal",
    slidesPerView: 1,
    spaceBetween: 0,
    // slidesPerGroup: 1,
    centeredSlides: false,
    loop: true,
    speed: 600,

    pagination: {
      el: ".mobile-section-1 .swiper-pagination",
      type: "fraction",
    },

    autoplay: {
      delay: 5000, // 5초마다 자동 전환
      disableOnInteraction: false,
      pauseOnMouseEnter: true, // 마우스 호버 시 일시정지
    },
    effect: "slide",
  });
}

mobileSection1SwiperInit();

// 섹션2: marquee(캐러셀)
const textLine = document.querySelector(".section-2 .text-line");

let position = 0; // 현재 위치
let speed = 1; // 현재 속도 (1 = 보통, 0.3 = 느림)
let targetSpeed = 1; // 목표 속도

function moveMarquee() {
  // 속도를 부드럽게 변경(속도 보간)
  speed = speed + (targetSpeed - speed) * 0.1;
  // 위치 이동
  position = position - speed;

  // 너무 많이 이동하면 처음으로 되돌리기
  if (position < -textLine.scrollWidth / 2) {
    position = 0;
  }

  // 실제로 움직이기
  textLine.style.transform = "translateX(" + position + "px)";

  // 계속 반복
  requestAnimationFrame(moveMarquee);
}

moveMarquee();

// fade-up 효과
AOS.init({
  once: true, // 한번만 애니메이션 실행
  offset: 80, // 화면에 들어오는 시점
  duration: 900, // 기본 지속시간
});

AOS.init();

// 섹션4: tag-box 아코디언 끝 시작
function tagAccordionInit() {
  const isDesktop = window.matchMedia(
    "(hover: hover) and (pointer: fine)",
  ).matches;
  const $items = $(".large-button");

  $(".large-button").each(function () {
    const $item = $(this);
    const $btn = $item.find(".large-text");

    if (isDesktop) {
      // PC: hover시 열기 (다른건 닫기)
      $item.on("mouseenter", function () {
        $items.not($item).removeClass("active");
        $item.addClass("active");
      });
      // PC: hover 해제시 닫기
      $item.on("mouseleave", function () {
        $item.removeClass("active");
      });

      // PC: 클릭도 가능
      $btn.on("click", function (e) {
        e.preventDefault();
        const isOpen = $item.hasClass("active");

        $item.removeClass("active");
        if (!isOpen) $item.addClass("active");
      });
    } else {
      // 모바일: 클릭만(아코디언)
      $btn.on("click", function (e) {
        e.preventDefault();
        const isOpen = $item.hasClass("active");

        $item.removeClass("active");
        if (!isOpen) $item.addClass("active");
      });
    }
  });
}

tagAccordionInit();
/* tag-box 아코디언 끝 */

// 섹션4: 글자타이핑 효과
$(document).ready(function () {
  const $section = $(".section-4");
  const $lines = $section.find(".typing-line");
  let isTyped = false;

  const texts = [];

  // 원본 텍스트 저장 + 초기화
  $lines.each(function (i) {
    texts[i] = $(this).text();
    $(this).text("");
  });

  function startTyping() {
    let lineIndex = 0;

    function typeLine() {
      if (lineIndex >= $lines.length) return;

      const $current = $lines.eq(lineIndex);
      const text = texts[lineIndex];
      let charIndex = 0;

      const typingInterval = setInterval(function () {
        $current.text($current.text() + text.charAt(charIndex));
        charIndex++;

        if (charIndex >= text.length) {
          clearInterval(typingInterval);
          $current.addClass("done"); // 커서 제거
          lineIndex++;

          setTimeout(typeLine, 300); // 다음 문장 딜레이
        }
      }, 55); // 타이핑 속도
    }

    typeLine(); // 시작
  }

  // 섹션4 위치에 도달했을때 타이핑효과시작
  $(window).on("scroll", function () {
    if (isTyped) return;

    const scrollTop = $(window).scrollTop();
    const windowHeight = $(window).height();
    const sectionTop = $section.offset().top;

    if (scrollTop + windowHeight * 0.6 > sectionTop) {
      isTyped = true;
      startTyping();
    }
  });
});

// 모바일 전용 : 섹션5 슬라이드
$(document).ready(function () {
  var newsSwiper = new Swiper(".newsSwiper", {
    slidesPerView: 1.2,
    spaceBetween: 20,
    centeredSlides: false,
    breakpoints: {
      // 800px 이상 (PC)
      800: {
        slidesPerView: 2.3,
        spaceBetween: 30,
        allowTouchMove: true,
      },

      // 480px 이상 (태블릿/모바일)
      480: {
        slidesPerView: 1.5,
        spaceBetween: 20,
      },
    },
  });
});

// 섹션6: 슬라이드
const swiper6 = new Swiper(".book-mark__content", {
  slidesPerView: 1,
  spaceBetween: 30,
  loop: true,
  speed: 600,
  breakpoints: {
    800: {
      slidesPerView: 1,
      centeredSlides: true,
    },
    0: {
      slidesPerView: 1,
      centeredSlides: true,
      spaceBetween: 20,
    },
  },
  autoplay: {
    delay: 3000, // 3초마다 이동
    disableOnInteraction: false, // 사용자 제어(클릭, 드래그) 후에도 자동 재생 유지
  },

  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
  // 슬라이드가 바뀔 때마다 실행
  on: {
    slideChangeTransitionEnd: function () {
      // 모든 애니메이션 리셋하고
      const allHl = document.querySelectorAll(".hl");
      allHl.forEach((el) => (el.style.backgroundSize = "0% 100%"));

      // 활성화된 슬라이드의 hl만 애니메이션 시작
      const activeSlide = this.slides[this.activeIndex];
      const targetHls = activeSlide.querySelectorAll(".hl");
      targetHls.forEach((el) => {
        // 약간의 시간차를 두어 부드럽게 시작
        setTimeout(() => {
          el.style.backgroundSize = "100% 100%";
        }, 20);
      });
    },
  },
});

// 스크롤 감시자 설정 (Intersection Observer)
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");

        // 섹션6에 처음 진입했을 때 첫 번째 슬라이드 형광펜 강제 실행
        const firstActiveSlide = document.querySelector(
          ".section-6 .swiper-slide-active",
        );
        if (firstActiveSlide) {
          const hls = firstActiveSlide.querySelectorAll(".hl");
          hls.forEach((el) => (el.style.backgroundSize = "100% 100%"));
        }
      }
    });
  },
  { threshold: 0.3 },
); // 30%만 보여도 실행되게 조정

const section6 = document.querySelector(".section-6");
if (section6) observer.observe(section6);

// 섹션7 best추천 : gsap 가로 스크롤 섹션 (책 등장 → 열림 → 영상 확대 → 카드 등장)
gsap.registerPlugin(ScrollTrigger);
window.onload = function () {
  const mm = gsap.matchMedia();

  mm.add(
    {
      isDesktop: "(min-width: 1025px)",
      isTablet: "(min-width: 769px) and (max-width: 1024px)",
      isMobile: "(max-width: 768px)",
    },
    (context) => {
      let { isDesktop, isTablet, isMobile } = context.conditions;

      const bookYOffset = isMobile ? 60 : 0;
      // 모바일: 책 크기를 0.7~0.8배로 설정
      const bookScale = isMobile ? 0.75 : 1;
      // 모바일: 시작 시점을 더 늦게 설정 (예: 1.5 -> 3.0)
      const cardStartDelay = isDesktop ? 12.0 : isMobile ? 22.0 : 17.0;
      // 화면 크기에 따른 스크롤 길이와 이동 속도 조절
      const scrollLength = isDesktop ? 2600 : 1000;
      // 이동 거리는 카드 개수와 화면 폭에 따라 유동적으로 (vw 단위 활용)
      const xPercent = isDesktop ? -155 : isTablet ? -200 : -240;
      const remainingCardOffset = isMobile ? 65 : 45;

      //  0. section-7 진입 시 책 레이어 보이기
      ScrollTrigger.create({
        trigger: ".section-7",
        start: "top 80%", // 섹션 7이 화면 하단 20% 지점에 나타날 때
        onEnter: () => {
          gsap.to(".intro-overlay", {
            opacity: 1,
            visibility: "visible",
            scale: bookScale,
            y: 0,
            duration: 3.5,
            ease: "power2.out",
          });
          // section-7 진입시 헤더 숨기기
          document.querySelector("#header-top")?.classList.add("is-hidden");
          document
            .querySelector(".mobile-header-top-bar")
            ?.classList.add("is-hidden");
        },
        onLeaveBack: () => {
          gsap.to(".intro-overlay", {
            opacity: 0,
            visibility: "hidden",
            duration: 0.8,
          });

          document.querySelector("#header-top")?.classList.remove("is-hidden");
          document
            .querySelector(".mobile-header-top-bar")
            ?.classList.remove("is-hidden");
        },
      });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: ".section-7",
          start: "top top",
          end: `+=${scrollLength}`,
          scrub: 3, // 부드럽고 천천히 따라옴
          pin: true,
          pinSpacing: true, // 핀이 걸리는 동안 여백 유지
          anticipatePin: 1, // 핀이 걸리기 전 미리 준비하여 덜컥거림방지
          fastScrollEnd: true, // 스크롤이 트리거를 빠르게 지나칠 때 발생할 수 있는 튀는 현상 방지
          invalidateOnRefresh: true, // 리사이즈 시 수치 재계산
          refreshPriority: 1, // 다른 트리거보다 먼저 계산되도록 우선순위 부여
        },
      });

      // 인트로 책 wrapper도 살짝 커지며 제자리로
      tl.to(
        ".book-wrapper",
        {
          scale: bookScale,
          y: bookYOffset,
          duration: 2,
          ease: "none",
        },
        "<",
      ); // 위 opacity 애니메이션과 동시에 시작

      //  1. 책 표지가 왼쪽으로 110도 열림 + 살짝 앞으로 다가옴
      tl.to(".book-cover", {
        rotationY: -110,
        z: 200, // 사용자 쪽으로 살짝 다가옴
        duration: 8,
        ease: "power1.inOut",
      });

      // 2. 영상 레이어 등장 (책이 절반쯤 열렸을 때 시작)
      tl.to(
        ".best__bg.bg-layer",
        {
          autoAlpha: 1, // opacity와 visibility를 동시에 제어
          scale: 1.2,
          borderRadius: "0",
          duration: 15,
          ease: "none",
        },
        "-=3",
      ); // 순서 1이 끝나기 3초 전(겹침)

      //  3. 인트로 레이어 사라짐 (영상이 커질 때 같이 사라짐)
      tl.to(
        ".intro-overlay",
        {
          scale: isMobile ? 8 : 5, // 책 안으로 빨려 들어가는 느낌
          opacity: 0,
          ease: "power2.in",
          duration: 10,
        },
        "-=10",
      ); // 영상 확대 중간부터 같이 진행

      //  4. 카드 트랙 이동 (xPercent를 사용하여 너비 대응/ 아주 느린 이동)
      tl.to(
        ".card-track",
        {
          // 예: -250이었으면 -170으로 변경 (음수이므로 더하면 오른쪽으로 당겨짐)
          xPercent: xPercent + remainingCardOffset, // 카드가 화면에 걸치도록
          ease: "power1.out",
          duration: isMobile ? 80 : 50, // 	카드 흘러가는 속도 길게
        },
        cardStartDelay,
      );

      //  5. Skew 효과 (중복 호출 방지를 위해 타임라인 밖에서 별도 관리)
      let skewSetter = gsap.quickSetter(".card", "skewX", "deg");
      let clamp = gsap.utils.clamp(-20, 20);

      ScrollTrigger.create({
        trigger: ".section-7",
        onUpdate: (self) => {
          // 모바일에서는 스크롤 속도가 빠르므로 감도 조절 (-300 -> -500)
          let skew = clamp(self.getVelocity() / (isMobile ? -500 : -300));
          // if (Math.abs(skew) > Math.abs(proxy.skew)) {
          // 	proxy.skew = skew;
          gsap.to(
            {},
            {
              // skew: 0,
              duration: 0.3,
              ease: "power3",
              overwrite: true,
              onUpdate: () => skewSetter(skew),
              onComplete: () => skewSetter(0),
            },
          );
        },
      });
    },
  );

  ScrollTrigger.refresh();
};

// 섹션8 : 슬로우페이지 랭킹
const lankItems = gsap.utils.toArray(".lank__item");
const dots = gsap.utils.toArray(".timeline-dot");
const mm = gsap.matchMedia();

mm.add("(min-width: 600px)", () => {
  const section8Tl = gsap.timeline({
    scrollTrigger: {
      trigger: ".section-8",
      start: "top top",
      end: "+=3000",
      scrub: 2,
      pin: true,
      pinSpacing: true,
      invalidateOnRefresh: true,
    },
  });

  // 1. 타임라인 애니메이션
  section8Tl.to(
    ".timeline-active",
    {
      width: "100%",
      ease: "none",
      duration: 1,
    },
    0,
  );

  // 2. 아이템별 순차 애니메이션
  lankItems.forEach((item, index) => {
    const startTime = index / lankItems.length;
    const num = item.querySelector(".lank-number");
    const img = item.querySelector(".lank__box");
    const shadow = item.querySelector(".lank-shadow");
    const info = item.querySelector(".lank-info");
    const dot = dots[index];

    // 도트 활성화
    if (dot) {
      section8Tl.to(
        dot,
        { backgroundColor: "#614231", scale: 1.5, duration: 0.1 },
        startTime,
      );
    }
    // 숫자 등장 (그라데이션 포함)
    if (num) {
      section8Tl.fromTo(
        num,
        {
          opacity: 0,
          y: 50,
          backgroundPosition: "0% 0%",
          filter: "drop-shadow(0 0 0px rgba(0,0,0,0))",
        },
        {
          opacity: 1,
          y: 0,
          backgroundPosition: "0% 80%",
          filter: "drop-shadow(0 10px 15px rgba(0,0,0,0.15))",
          ease: "power2.out",
        },
        startTime + 0.05,
      );
    }
    // 책 이미지 폴짝 등장
    if (img) {
      section8Tl.fromTo(
        img,
        { y: "10vh", opacity: 0, scale: 0.5 },
        { y: 0, opacity: 1, scale: 1, duration: 0.4, ease: "back.out(1.7)" },
        startTime + 0.1,
      );
    }
    // 그림자 등장
    if (shadow) {
      section8Tl.fromTo(
        shadow,
        { opacity: 0, scale: 0.3 },
        { opacity: 1, scale: 1, duration: 0.3 },
        startTime + 0.3,
      );
    }
    // 리뷰 말풍선 등장 (위에서 아래로 톡!)
    if (info) {
      section8Tl.fromTo(
        info,
        { opacity: 0, y: -20, scale: 0.8 },
        { opacity: 1, y: 0, scale: 1, duration: 0.5, ease: "power2.out" },
        startTime + 0.4,
      );
    }
  });
});

ScrollTrigger.refresh();

// 스크롤 위치에 따른 퀵메뉴 숨기기/보이기
$(window).on("scroll", function () {
  if ($(this).scrollTop() > 300) {
    $(".quickMenuList").fadeIn();
  } else {
    $(".quickMenuList").fadeOut();
  }
});
// 스크롤 top버튼
$(function () {
  $(".icon-top").on("click", function (e) {
    e.preventDefault();
    e.stopPropagation(); // 이벤트 버블링 방지

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  });
  // 채팅 버튼 위로 올라가지 않게 설정
  $(".btn-chat-capsule").on("click", function (e) {
    e.preventDefault();
    e.stopPropagation();
  });
});
