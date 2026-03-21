const menuToggle = document.getElementById("menu-toggle");
const navMenu = document.getElementById("nav-menu");
const langSelect = document.getElementById("lang-select");
const scheduleContent = document.getElementById("schedule-content");
const tabButtons = document.querySelectorAll(".tab-btn");
const yearTabs = document.getElementById("year-tabs");
const applyLink = document.getElementById("apply-link");
const rulesPdf = document.getElementById("rules-pdf");

let currentMainTab = "Upcoming";
let currentYear = null;

const textData = {
  ko: {
    navJoin: "가입하기",
    navTimeline: "타임라인",
    navFaq: "FAQ",
    navRules: "회칙",
    navAbout: "소개",
    heroTitle: "털맛 두유",
    heroSubtitle: "삼육대학교 퍼리 소모임",
    heroButton: "가입하기",
    joinTitle: "가입하기",
    joinDesc: "다양한 활동과 행사 참여를 함께 할 신입 부원을 모집하고 있습니다.",
    applyNow: "지원하기",
    timelineTitle: "타임라인",
    upcomingTab: "예정된 일정",
    previousTab: "지난 일정",
    loadingSchedule: "일정 불러오는 중...",
    noEvents: "등록된 행사가 없습니다.",
    faqTitle: "자주 묻는 질문",
    faq1q: "회비를 내야 하나요?",
    faq1a: "아닙니다. 가입 시, 혹은 정기적으로 내야하는 회비는 따로 없습니다.",
    faq2q: "활동에 반드시 매번 참여해야 하나요?",
    faq2a: "아닙니다. 학기 중 1회 이상만 참여하시면 자격이 유지됩니다.",
    faq3q: "활동은 실명으로 해야 하나요?",
    faq3a: "아닙니다. 실명 또는 가명으로 자유롭게 활동하실 수 있습니다.",
    rulesTitle: "회칙",
    rulesDesc: "여기에서 소모임의 회칙 및 참여 조건을 확인할 수 있습니다.",
    seeRules: "회칙 보기",
    aboutTitle: "털맛 두유는?",
    aboutDesc: "회원들의 다양한 활동과 퍼리 행사 참여를 지향하는 교내 미등록 소모임입니다.",
    footerCopyright: "© Copyright 2026-2026. 털맛 두유 [Fur Flavored Soy Milk]. All rights reserved.",
    applyRef: "https://forms.gle/KRuiiRpYtfihToZZ7",
    rulesRef: "rules/회칙.pdf"
  },

  en: {
    navJoin: "Join",
    navTimeline: "Timeline",
    navFaq: "FAQ",
    navRules: "Rules",
    navAbout: "About",
    heroTitle: "Fur Flavored Soy Milk",
    heroSubtitle: "Sahmyook University Furry Club",
    heroButton: "Join us",
    joinTitle: "Join us",
    joinDesc: "We are looking for new members to take part in various activities and events with us.",
    applyNow: "Apply now",
    timelineTitle: "Timeline",
    upcomingTab: "Upcoming Schedules",
    previousTab: "Previous Schedules",
    loadingSchedule: "Loading Schedule...",
    noEvents: "No events available.",
    faqTitle: "Frequently Asked Questions",
    faq1q: "Do I have to pay a membership fee?",
    faq1a: "No. There is no membership fee required upon joining or on a regular basis.",
    faq2q: "Do I have to participate in every activity?",
    faq2a: "No. You only need to participate in at least one activity during the semester to maintain your membership.",
    faq3q: "Do I have to use my real name when participating?",
    faq3a: "No. You may participate using either your real name or a nickname.",
    rulesTitle: "Rules",
    rulesDesc: "Here, you can find the club's rules and participation requirements.",
    seeRules: "See rules",
    aboutTitle: "What's Fur Flavored Soy Milk?",
    aboutDesc: "We are an unofficial campus club that encourages members to take part in various activities and furry events.",
    footerCopyright: "© Copyright 2026-2026. 털맛 두유 [Fur Flavored Soy Milk]. All rights reserved.",
    applyRef: "https://forms.gle/U8qH3aTdXkuMtiA78",
    rulesRef: "rules/Rules.pdf"
  }
};

const scheduleData = {
  ko: {
    Upcoming: [
      {
        date: "2026년 3월 27일",
        title: "소모임 OT",
        desc: "신입 회원들이 소모임을 알아가며 서로 자연스럽게 친해질 수 있는 가벼운 모임입니다."
      }
    ],
    Previous: {
      "2026": [
        {
          date: "2026년 3월 21일",
          title: "소모임 창립일",
          desc: "본 소모임의 역사가 시작된 날입니다."
        },
        {
          date: "2026년 3월 21일",
          title: "2026년 1학기 신입 회원 모집일",
          desc: "본 소모임을 함께 만들어나갈 신입 회원 모집을 시작한 날입니다."
        },
      ],
    }
  },

  en: {
    Upcoming: [
      {
        date: "March 27, 2026",
        title: "Club Orientation",
        desc: "This is a casual meet-up where new members can learn about the club and get to know each other."
      }
    ],
    Previous: {
      "2026": [
        {
          date: "March 21, 2026",
          title: "Club Foundation Day",
          desc: "This marks the beginning of our club's history."
        },
        {
          date: "March 21, 2026",
          title: "New Memeber Recruitment - Spring Semester, 2026",
          desc: "This marks the start of recruiting new members to develop our club together."
        },
      ],
    }
  }
};

function applyLanguage(lang) {
  document.documentElement.lang = lang;

  document.querySelectorAll("[data-i18n]").forEach((element) => {
    const key = element.dataset.i18n;
    if (textData[lang] && textData[lang][key]) {
      element.textContent = textData[lang][key];
    }
  });

  if (applyLink && textData[lang].applyRef) {
    applyLink.href = textData[lang].applyRef;
  }

  if (rulesPdf && textData[lang].rulesRef) {
    rulesPdf.href = textData[lang].rulesRef;
  }

  if (currentMainTab === "Previous") {
    const years = Object.keys(scheduleData[lang].Previous || {}).sort(
      (a, b) => Number(b) - Number(a)
    );
    if (!currentYear || !scheduleData[lang].Previous[currentYear]) {
      currentYear = years[0] || null;
    }
  }

  renderSchedule(currentMainTab, lang);
}

function renderYearTabs(lang) {
  if (currentMainTab !== "Previous") {
    yearTabs.innerHTML = "";
    return;
  }

  const previousData = scheduleData[lang].Previous || {};
  const years = Object.keys(previousData).sort((a, b) => Number(b) - Number(a));

  if (years.length === 0) {
    yearTabs.innerHTML = "";
    return;
  }

  if (!currentYear || !previousData[currentYear]) {
    currentYear = years[0];
  }

  yearTabs.innerHTML = years
    .map(
      (year) => `
        <button class="year-tab-btn ${year === currentYear ? "active" : ""}" data-year="${year}">
          ${year}
        </button>
      `
    )
    .join("");

  document.querySelectorAll(".year-tab-btn").forEach((button) => {
    button.addEventListener("click", () => {
      currentYear = button.dataset.year;
      document.querySelectorAll(".year-tab-btn").forEach((btn) => {
        btn.classList.remove("active");
      });
      button.classList.add("active");
      renderSchedule(currentMainTab, langSelect.value);
    });
  });
}

function renderSchedule(tabName, lang) {
  const data = scheduleData[lang][tabName];

  if (!data) {
    yearTabs.innerHTML = "";
    scheduleContent.innerHTML = `<p>${textData[lang].noEvents}</p>`;
    return;
  }

  if (tabName === "Upcoming") {
    yearTabs.innerHTML = "";

    if (data.length === 0) {
      scheduleContent.innerHTML = `<p>${textData[lang].noEvents}</p>`;
      return;
    }

    scheduleContent.innerHTML = data
      .map(
        (item) => `
          <div class="schedule-item">
            <div class="schedule-date">${item.date}</div>
            <div class="schedule-title">${item.title}</div>
            <div class="schedule-desc">${item.desc}</div>
          </div>
        `
      )
      .join("");
    return;
  }

  const years = Object.keys(data).sort((a, b) => Number(b) - Number(a));

  if (years.length === 0) {
    yearTabs.innerHTML = "";
    scheduleContent.innerHTML = `<p>${textData[lang].noEvents}</p>`;
    return;
  }

  if (!currentYear || !data[currentYear]) {
    currentYear = years[0];
  }

  renderYearTabs(lang);

  const items = data[currentYear] || [];

  if (items.length === 0) {
    scheduleContent.innerHTML = `<p>${textData[lang].noEvents}</p>`;
    return;
  }

  scheduleContent.innerHTML = items
    .map(
      (item) => `
        <div class="schedule-item">
          <div class="schedule-date">${item.date}</div>
          <div class="schedule-title">${item.title}</div>
          <div class="schedule-desc">${item.desc}</div>
        </div>
      `
    )
    .join("");
}

menuToggle.addEventListener("click", () => {
  navMenu.classList.toggle("show");
});

document.addEventListener("click", (e) => {
  const isInsideMenu = navMenu.contains(e.target);
  const isMenuButton = menuToggle.contains(e.target);

  if (!isInsideMenu && !isMenuButton) {
    navMenu.classList.remove("show");
  }
});

tabButtons.forEach((button) => {
  button.addEventListener("click", () => {
    tabButtons.forEach((btn) => btn.classList.remove("active"));
    button.classList.add("active");

    currentMainTab = button.dataset.tab;

    if (currentMainTab === "Previous") {
      const years = Object.keys(scheduleData[langSelect.value].Previous || {}).sort(
        (a, b) => Number(b) - Number(a)
      );
      currentYear = years[0] || null;
    } else {
      currentYear = null;
    }

    renderSchedule(currentMainTab, langSelect.value);
  });
});

langSelect.addEventListener("change", (e) => {
  applyLanguage(e.target.value);
});

document.querySelectorAll(".faq-question").forEach((question) => {
  question.addEventListener("click", () => {
    question.parentElement.classList.toggle("open");
  });
});

langSelect.value = "ko";
applyLanguage("ko");