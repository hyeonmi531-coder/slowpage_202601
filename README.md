# Slow Page 📖

> 책과 함께 여유로운 시간을 보내는 공간, 슬로우 페이지

## 📋 프로젝트 개요

**Slow Page**는 책을 사랑하는 사람들을 위한 웹사이트로, 월간 구독 서비스와 큐레이션 도서 추천을 제공합니다.

### 🎯 주요 기능

- 메인 비주얼 슬라이드 (PC/모바일 반응형)
- 월간 구독 북's - 큐레이션 도서 소개
- 인기 태그 검색 (아코디언 UI)
- 뉴스 섹션 - 신간 및 소식
- 베스트 추천 (GSAP 가로 스크롤 애니메이션)
- 슬로우페이지 랭킹

---

## 🛠 기술 스택

| 분류           | 기술                                           |
| -------------- | ---------------------------------------------- |
| **마크업**     | HTML5                                          |
| **스타일**     | SCSS, Tailwind CSS v4                          |
| **스크립트**   | JavaScript, jQuery 3.7.1                       |
| **애니메이션** | GSAP 3.13.0, ScrollTrigger, AOS                |
| **슬라이드**   | Swiper 8                                       |
| **아이콘**     | Font Awesome 6.7.2                             |
| **폰트**       | Google Fonts (Open Sans, Nothing You Could Do) |

---

## 📁 프로젝트 구조

```
slowpage_202601/
├── index.html          # 메인 HTML 파일
├── css/
│   └── style.css       # 컴파일된 CSS
├── scss/
│   ├── style.scss      # 메인 SCSS (진입점)
│   ├── _variables.scss # 변수 정의
│   ├── _common.scss    # 공통 스타일
│   ├── _header.scss    # 헤더 스타일
│   ├── _footer.scss    # 푸터 스타일
│   ├── _main.scss      # 메인 페이지 스타일
│   └── pages/
│       └── _sub.scss   # 서브 페이지 스타일
├── js/
│   └── common.js       # 메인 JavaScript
└── assets/
    ├── icon/           # 아이콘 이미지
    ├── images/         # 이미지 리소스
    └── video/          # 비디오 리소스
```

---

## 🚀 시작하기

### 1. 저장소 클론

```bash
git clone https://github.com/hyeonmi531-coder/slowpage_202601.git
```

### 2. SCSS 컴파일

VS Code 사용 시 **Live Sass Compiler** 확장 프로그램을 설치하고, 하단의 "Watch Sass" 버튼을 클릭하면 자동으로 CSS가 컴파일됩니다.

### 3. 로컬 서버 실행

**Live Server** 확장 프로그램을 사용하거나, `index.html`을 브라우저에서 직접 열어 확인할 수 있습니다.

---

## 📱 반응형 지원

| 디바이스 | 브레이크포인트 |
| -------- | -------------- |
| Mobile   | ~768px         |
| Tablet   | 769px ~ 1024px |
| Desktop  | 1025px~        |

---

## ✨ 주요 인터랙션

### 1. 헤더 스크롤 효과

- 50px 스크롤 시 헤더 배경색 변경

### 2. 마키(Marquee) 텍스트

- 섹션2 무한 흐르는 텍스트 애니메이션

### 3. 타이핑 효과

- 섹션4 인기 태그 텍스트 순차 타이핑

### 4. 아코디언 UI

- PC: hover 시 열림
- Mobile: 클릭 시 열림

### 5. GSAP 가로 스크롤

- 섹션7 책 열림 → 영상 확대 → 카드 슬라이드

### 6. 랭킹 타임라인

- 섹션8 스크롤에 따른 순차 등장 애니메이션

---

## 🐛 트러블슈팅

### CSS가 적용되지 않는 문제

**원인:** HTML에서 CSS 파일 경로가 잘못 설정됨

```html
<!-- 수정 전 (잘못된 경로) -->
<link rel="stylesheet" href="./assets/css/style.css" />

<!-- 수정 후 (올바른 경로) -->
<link rel="stylesheet" href="./css/style.css" />
```

---

## 📝 라이선스

이 프로젝트는 학습 및 포트폴리오 목적으로 제작되었습니다.

---

## 👩‍💻 개발자

**hyeonmi531-coder**

📧 GitHub: [@hyeonmi531-coder](https://github.com/hyeonmi531-coder)
