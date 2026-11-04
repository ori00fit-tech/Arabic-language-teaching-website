/* ==========================================================
   Arabic with Your Name — site behaviour
   ========================================================== */

// PERSONALISE: the address that receives registration enquiries.
const CONFIG = {
  email: "your.email@example.com",
  brand: "Arabic with Your Name",
};

document.addEventListener("DOMContentLoaded", () => {
  // Footer year
  const year = document.getElementById("year");
  if (year) year.textContent = new Date().getFullYear();

  // Keep visible email links in sync with CONFIG
  document.querySelectorAll(".js-email").forEach((a) => {
    a.href = `mailto:${CONFIG.email}`;
    a.textContent = CONFIG.email;
  });

  setupNav();
  setupCourseLinks();
  setupForm();
  setupReveal();
});

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

/* ---------- Registration form (prepares an email) ---------- */
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
    const subject = `Registration enquiry: ${data.course} – ${data.group} – ${data.level}`;
    const body = [
      `Name: ${data.name}`,
      `Email: ${data.email}`,
      `Course: ${data.course}`,
      `Age group: ${data.group}`,
      `Level: ${data.level}`,
      `Country / time zone: ${data.timezone || "-"}`,
      "",
      "Message:",
      data.message || "-",
    ].join("\n");

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
