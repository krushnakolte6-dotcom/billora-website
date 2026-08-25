// =========================================
// BILLORA — interactions & motion
// =========================================

(function () {
  "use strict";

  var reduceMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  // Only now, confirmed running, do we let CSS hide-then-reveal content.
  // If this script never runs (blocked, missing, errors out before this
  // line), the page stays fully visible via the CSS defaults.
  document.body.classList.add("js-ready");

  // ---- Mobile menu ----
  var menuButton = document.getElementById("menu-button");
  var nav = document.getElementById("main-navigation");

  if (menuButton && nav) {
    var closeMenu = function () {
      nav.classList.remove("mobile-open");
      menuButton.setAttribute("aria-expanded", "false");
      menuButton.setAttribute("aria-label", "Open navigation menu");
    };

    var openMenu = function () {
      nav.classList.add("mobile-open");
      menuButton.setAttribute("aria-expanded", "true");
      menuButton.setAttribute("aria-label", "Close navigation menu");
    };

    menuButton.addEventListener("click", function () {
      var isOpen = nav.classList.contains("mobile-open");
      if (isOpen) {
        closeMenu();
      } else {
        openMenu();
      }
    });

    // Close after choosing a link
    nav.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", closeMenu);
    });

    // Close on outside click
    document.addEventListener("click", function (e) {
      if (!nav.classList.contains("mobile-open")) return;
      if (nav.contains(e.target) || menuButton.contains(e.target)) return;
      closeMenu();
    });

    // Close on Escape
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape") closeMenu();
    });

    // Reset state if the viewport grows back to desktop
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

  // ---- FAQ accordion (only one open at a time, smooth height) ----
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

  // ---- Magnetic buttons (subtle pointer-follow on desktop) ----
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
})();
    // Close after choosing a link
    nav.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", closeMenu);
    });

    // Close on outside click
    document.addEventListener("click", function (e) {
      if (!nav.classList.contains("mobile-open")) return;
      if (nav.contains(e.target) || menuButton.contains(e.target)) return;
      closeMenu();
    });

    // Close on Escape
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape") closeMenu();
    });

    // Reset state if the viewport grows back to desktop
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

  // ---- FAQ accordion (only one open at a time, smooth height) ----
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

  // ---- Magnetic buttons (subtle pointer-follow on desktop) ----
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
})();                "aria-expanded",
                "false"
            );

            button.setAttribute(
                "aria-label",
                "Open navigation menu"
            );

        });

    });

});
