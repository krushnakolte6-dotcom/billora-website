document.addEventListener("DOMContentLoaded", function () {
  "use strict";

  var reduceMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  // Confirms this script is actually running. CSS only hides content
  // for reveal animations once this class is present — if this script
  // never loads or errors out, the page stays fully visible.
  document.body.classList.add("js-ready");

  // ---- Mobile menu ----
  var button = document.getElementById("menu-button");
  var menu = document.getElementById("main-navigation");

  if (button && menu) {
    var closeMenu = function () {
      menu.classList.remove("mobile-open");
      button.setAttribute("aria-expanded", "false");
      button.setAttribute("aria-label", "Open navigation menu");
    };

    button.addEventListener("click", function () {
      menu.classList.toggle("mobile-open");
      var opened = menu.classList.contains("mobile-open");
      button.setAttribute("aria-expanded", opened ? "true" : "false");
      button.setAttribute(
        "aria-label",
        opened ? "Close navigation menu" : "Open navigation menu"
      );
    });

    menu.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", closeMenu);
    });

    document.addEventListener("click", function (e) {
      if (!menu.classList.contains("mobile-open")) return;
      if (menu.contains(e.target) || button.contains(e.target)) return;
      closeMenu();
    });

    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape") closeMenu();
    });

    window.addEventListener("resize", function () {
      if (window.innerWidth > 760) closeMenu();
    });
  }

  // ---- Navbar scroll state ----
  var navbar = document.getElementById("navbar");
  if (navbar) {
    var updateNavbar = function () {
      if (window.scrollY > 12) {
        navbar.classList.add("is-scrolled");
      } else {
        navbar.classList.remove("is-scrolled");
      }
    };
    updateNavbar();
    window.addEventListener("scroll", updateNavbar, { passive: true });
  }

  // ---- Scroll reveal ----
  var revealTargets = document.querySelectorAll(
    ".reveal, .feature-grid, .screenshot-grid"
  );

  if (reduceMotion || !("IntersectionObserver" in window)) {
    revealTargets.forEach(function (el) {
      el.classList.add("is-visible");
    });
  } else {
    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -60px 0px" }
    );

    revealTargets.forEach(function (el) {
      observer.observe(el);
    });
  }

  // ---- FAQ accordion (only one open at a time) ----
  var faqItems = document.querySelectorAll(".faq-item");

  faqItems.forEach(function (item) {
    item.addEventListener("toggle", function () {
      if (!item.open) return;
      faqItems.forEach(function (other) {
        if (other !== item && other.open) {
          other.open = false;
        }
      });
    });
  });

  // ---- Magnetic buttons (desktop pointer devices only) ----
  if (!reduceMotion && window.matchMedia("(hover: hover)").matches) {
    document.querySelectorAll(".magnetic").forEach(function (btn) {
      btn.addEventListener("mousemove", function (e) {
        var rect = btn.getBoundingClientRect();
        var x = e.clientX - rect.left - rect.width / 2;
        var y = e.clientY - rect.top - rect.height / 2;
        btn.style.transform =
          "translate(" + x * 0.12 + "px, " + y * 0.28 + "px)";
      });

      btn.addEventListener("mouseleave", function () {
        btn.style.transform = "";
      });
    });
  }

});
