/* ==========================================================
   Arabic with Your Name — site behaviour
   ========================================================== */

/* ----------------------------------------------------------
   PERSONALISE: everything you normally need to change is here.
   ---------------------------------------------------------- */
const CONFIG = {
  brand: "Arabic with Your Name",

  // Address that receives email enquiries.
  email: "your.email@example.com",

  // WhatsApp number in international format, digits only:
  // no "+", spaces or leading zeros. Example for Morocco: "212612345678".
  whatsappNumber: "",

  // Greeting used by the floating WhatsApp button and the "Chat on WhatsApp" link.
  whatsappGreeting: "Hello! I'm interested in your Arabic classes and have a question.",

  // Pricing. These are EXAMPLE prices: replace them with your own.
  pricing: {
    currencySymbol: "$",
    currencyName: "US dollars",
    lessonsPerMonth: 8, // e.g. 2 lessons per week
    plans: {
      children: { monthly: 60, perLesson: 9, minutes: 45 },
      teens: { monthly: 70, perLesson: 10, minutes: 60 },
      adults: { monthly: 80, perLesson: 12, minutes: 60 },
    },
  },
};

document.addEventListener("DOMContentLoaded", () => {
  const year = document.getElementById("year");
  if (year) year.textContent = new Date().getFullYear();

  document.querySelectorAll(".js-email").forEach((a) => {
    a.href = `mailto:${CONFIG.email}`;
    a.textContent = CONFIG.email;
  });

  setupNav();
  setupCourseLinks();
  setupPricing();
  setupWhatsAppLinks();
  setupForm();
  setupReveal();
});

/* ---------- Helpers ---------- */
function formatMoney(value) {
  const rounded = Number.isInteger(value) ? value : value.toFixed(2);
  return `${CONFIG.pricing.currencySymbol}${rounded}`;
}

function whatsappUrl(text) {
  const number = String(CONFIG.whatsappNumber).replace(/\D/g, "");
  if (!number) return null;
  return `https://wa.me/${number}?text=${encodeURIComponent(text)}`;
}

/* ---------- Mobile navigation ---------- */
function setupNav() {
  const toggle = document.querySelector(".nav-toggle");
  const menu = document.getElementById("nav-menu");
  if (!toggle || !menu) return;

  const setOpen = (open) => {
    menu.classList.toggle("open", open);
    toggle.setAttribute("aria-expanded", String(open));
    toggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
  };

  toggle.addEventListener("click", () => setOpen(!menu.classList.contains("open")));
  menu.querySelectorAll("a").forEach((link) => link.addEventListener("click", () => setOpen(false)));
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") setOpen(false);
  });
}

/* ---------- Pre-select course from course cards ---------- */
function setupCourseLinks() {
  const select = document.getElementById("course");
  document.querySelectorAll("[data-course]").forEach((link) => {
    link.addEventListener("click", () => {
      if (select) select.value = link.dataset.course;
    });
  });
}

/* ---------- Pricing: monthly / per-lesson switch ---------- */
function setupPricing() {
  const section = document.getElementById("pricing");
  if (!section) return;
  const { plans, lessonsPerMonth, currencyName } = CONFIG.pricing;
  const buttons = section.querySelectorAll("[data-billing]");
  let billing = "monthly";

  section.querySelectorAll("[data-currency-name]").forEach((el) => (el.textContent = currencyName));

  const render = () => {
    section.querySelectorAll(".plan").forEach((card) => {
      const plan = plans[card.dataset.plan];
      if (!plan) return;
      const amount = card.querySelector(".amount");
      const per = card.querySelector(".per");
      const note = card.querySelector(".price-note");
      card.querySelectorAll("[data-duration]").forEach((el) => (el.textContent = plan.minutes));

      if (billing === "monthly") {
        const perLessonEquivalent = plan.monthly / lessonsPerMonth;
        const saving = Math.round((1 - perLessonEquivalent / plan.perLesson) * 100);
        amount.textContent = formatMoney(plan.monthly);
        per.textContent = "/ month";
        note.textContent =
          `${lessonsPerMonth} lessons · ${formatMoney(perLessonEquivalent)} per lesson` +
          (saving > 0 ? ` · save ${saving}%` : "");
      } else {
        amount.textContent = formatMoney(plan.perLesson);
        per.textContent = "/ lesson";
        note.textContent = "Pay as you go, no commitment";
      }
    });

    buttons.forEach((b) => {
      const active = b.dataset.billing === billing;
      b.classList.toggle("active", active);
      b.setAttribute("aria-pressed", String(active));
    });
  };

  buttons.forEach((b) =>
    b.addEventListener("click", () => {
      billing = b.dataset.billing;
      render();
    })
  );

  // "Choose this plan" pre-fills the registration form.
  section.querySelectorAll("[data-select-group]").forEach((link) => {
    link.addEventListener("click", () => {
      const group = document.getElementById("group");
      const planSelect = document.getElementById("plan");
      if (group) group.value = link.dataset.selectGroup;
      if (planSelect) planSelect.value = billing === "monthly" ? "Monthly subscription" : "Pay per lesson";
    });
  });

  render();
}

/* ---------- WhatsApp chat links (floating button etc.) ---------- */
function setupWhatsAppLinks() {
  const url = whatsappUrl(CONFIG.whatsappGreeting);
  if (!url) {
    console.warn("WhatsApp number not set: add it to CONFIG.whatsappNumber in script.js");
    return; // links keep pointing to the registration form
  }
  document.querySelectorAll(".js-wa").forEach((a) => {
    a.href = url;
    a.target = "_blank";
    a.rel = "noopener";
  });
}

/* ---------- Registration form: WhatsApp or email ---------- */
function setupForm() {
  const form = document.getElementById("register-form");
  if (!form) return;
  const status = form.querySelector(".form-status");

  const showStatus = (msg, type) => {
    status.textContent = msg;
    status.className = `form-status ${type}`;
  };

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const via = e.submitter && e.submitter.value === "email" ? "email" : "whatsapp";

    let firstInvalid = null;
    form.querySelectorAll("[required]").forEach((field) => {
      const ok = field.checkValidity() && field.value.trim() !== "";
      field.classList.toggle("invalid", !ok);
      field.setAttribute("aria-invalid", String(!ok));
      if (!ok && !firstInvalid) firstInvalid = field;
    });

    if (firstInvalid) {
      showStatus("Please complete the highlighted fields.", "error");
      firstInvalid.focus();
      return;
    }

    const data = Object.fromEntries(new FormData(form).entries());
    const details = [
      `Name: ${data.name}`,
      `Email: ${data.email}`,
      `Course: ${data.course}`,
      `Age group: ${data.group}`,
      `Level: ${data.level}`,
      `Payment option: ${data.plan || "Not sure yet"}`,
      `Country / time zone: ${data.timezone || "-"}`,
    ];
    const message = data.message ? ["", "Message:", data.message] : [];

    if (via === "whatsapp") {
      const text = [`Hello! I'd like to register for Arabic classes.`, "", ...details, ...message].join("\n");
      const url = whatsappUrl(text);
      if (!url) {
        showStatus(`WhatsApp registration isn't available yet. Please use "Send by email" instead.`, "error");
        return;
      }
      const win = window.open(url, "_blank", "noopener");
      if (!win) window.location.href = url;
      showStatus("WhatsApp should now open with your registration. Just press send!", "success");
      return;
    }

    const subject = `Registration enquiry: ${data.course} – ${data.group} – ${data.level}`;
    const body = [...details, ...message].join("\n");
    window.location.href =
      `mailto:${CONFIG.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    showStatus(
      `Your email app should now open with your enquiry. If it doesn't, please email ${CONFIG.email} directly.`,
      "success"
    );
  });

  form.querySelectorAll("input, select, textarea").forEach((field) => {
    field.addEventListener("input", () => {
      field.classList.remove("invalid");
      field.removeAttribute("aria-invalid");
    });
  });
}

/* ---------- Subtle reveal on scroll ---------- */
function setupReveal() {
  if (!("IntersectionObserver" in window)) return;
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

  const items = document.querySelectorAll(".section-head, .card, .level, .step, .teacher, details");
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12 }
  );

  items.forEach((el) => {
    el.classList.add("reveal");
    observer.observe(el);
  });
}
