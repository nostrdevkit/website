// Nostr Dev Kit — site behaviour: theme toggle, cursor glow, reveal on scroll

(function () {
  // --- theme toggle (persisted; initial theme applied inline in <head>) ---
  const root = document.documentElement;
  const toggle = document.getElementById("theme-toggle");

  function applyTheme(theme) {
    root.setAttribute("data-theme", theme);
    if (toggle) {
      toggle.setAttribute(
        "aria-label",
        "Switch to " + (theme === "dark" ? "light" : "dark") + " theme"
      );
    }
  }

  if (toggle) {
    toggle.addEventListener("click", () => {
      const next = root.getAttribute("data-theme") === "dark" ? "light" : "dark";
      applyTheme(next);
      try {
        localStorage.setItem("ndk-theme", next);
      } catch {}
    });
  }

  // --- click-to-copy fields ---
document.querySelectorAll("[data-copy]").forEach((el) => {
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(el.getAttribute("data-copy"));
      el.classList.add("copied");
      setTimeout(() => el.classList.remove("copied"), 1400);
    } catch {
      // clipboard unavailable (e.g. non-secure context) — ignore
    }
  };

  el.addEventListener("click", copy);
  el.addEventListener("keydown", (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      copy();
    }
  });
});

  // --- cursor-following glow on cards + hero spotlight ---
  document.querySelectorAll(".glow-card, .hero").forEach((card) => {
    card.addEventListener("pointermove", (e) => {
      const rect = card.getBoundingClientRect();
      card.style.setProperty("--mx", e.clientX - rect.left + "px");
      card.style.setProperty("--my", e.clientY - rect.top + "px");
    });
  });

  // --- sticky header line on scroll ---
  const header = document.querySelector(".site-header");
  if (header) {
    const onScroll = () => header.classList.toggle("scrolled", window.scrollY > 8);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
  }

  // --- reveal on scroll ---
  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );

    document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));
  } else {
    document.querySelectorAll(".reveal").forEach((el) => el.classList.add("visible"));
  }
})();
