/* Portfolio behavior: mobile navigation, scroll state, active-section
   highlighting, back-to-top, AOS reveal (respecting reduced motion), and the
   data-driven project detail renderer. No template dependencies. */
(function () {
  "use strict";

  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var nav = document.querySelector(".pf-nav");

  /* ---------------------------------------------------------- Mobile nav */
  var toggle = document.querySelector(".pf-nav__toggle");
  if (toggle && nav) {
    toggle.addEventListener("click", function () {
      var open = nav.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", String(open));
    });
    nav.querySelectorAll(".pf-nav__link").forEach(function (link) {
      link.addEventListener("click", function () {
        nav.classList.remove("is-open");
        toggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  /* --------------------------------------------- Nav background on scroll */
  var onScroll = function () {
    if (nav) nav.classList.toggle("is-scrolled", window.scrollY > 12);
    if (scrollTop) scrollTop.classList.toggle("is-visible", window.scrollY > 480);
  };
  window.addEventListener("scroll", onScroll, { passive: true });

  /* -------------------------------------------------- Active section link */
  var links = document.querySelectorAll('.pf-nav__link[href^="#"]');
  var sections = [];
  links.forEach(function (link) {
    var id = link.getAttribute("href").slice(1);
    var el = id ? document.getElementById(id) : null;
    if (el) sections.push({ link: link, el: el });
  });
  function setActive() {
    var pos = window.scrollY + 120;
    var current = null;
    sections.forEach(function (s) {
      if (s.el.offsetTop <= pos) current = s;
    });
    links.forEach(function (l) {
      l.classList.remove("is-active");
      l.removeAttribute("aria-current");
    });
    if (current) {
      current.link.classList.add("is-active");
      current.link.setAttribute("aria-current", "true");
    }
  }
  if (sections.length) {
    window.addEventListener("scroll", setActive, { passive: true });
    setActive();
  }

  /* --------------------------------------------------------- Back to top */
  var scrollTop = document.querySelector(".pf-scrolltop");
  if (scrollTop) {
    scrollTop.addEventListener("click", function () {
      window.scrollTo({ top: 0, behavior: reduceMotion ? "auto" : "smooth" });
    });
  }

  /* ----------------------------------------------------------------- AOS */
  if (window.AOS) {
    window.AOS.init({
      duration: 600,
      easing: "ease-out",
      once: true,
      offset: 60,
      disable: reduceMotion
    });
  }

  /* ------------------------------------------------------------ Full year */
  document.querySelectorAll(".pf-year").forEach(function (el) {
    el.textContent = String(new Date().getFullYear());
  });

  /* ----------------------------------------------------------- Contact form
     Dependency-free AJAX submission to Formspree (https://formspree.io/f/<id>).
     The form's action/method are kept for no-JS progressive enhancement; this
     block upgrades it to a fetch() request when JavaScript is available.

     Behaviors:
       - validates name / email / message before sending;
       - shows a loading state and blocks duplicate submissions;
       - only claims success after the service accepts the request;
       - keeps the visitor's input on any failure (resets only on success);
       - never logs the visitor's message or personal data. */
  var contactForm = document.getElementById("contactForm");
  if (contactForm) {
    var statusEl = document.getElementById("cf-status");
    var submitBtn = document.getElementById("cf-submit");
    var msgField = document.getElementById("cf-message");
    var msgCount = document.getElementById("cf-message-count");
    var EMAIL_RE = /^[^\s@]+@[^\s@]+\.[A-Za-z]{2,}$/;
    var submitting = false;

    var fields = [
      {
        input: contactForm.elements["name"],
        error: document.getElementById("cf-name-error"),
        validate: function (v) {
          if (!v) return "Please enter your name.";
          if (v.length < 2) return "Please enter at least 2 characters for your name.";
          return "";
        }
      },
      {
        input: contactForm.elements["email"],
        error: document.getElementById("cf-email-error"),
        validate: function (v) {
          if (!v) return "Please enter your email address.";
          if (!EMAIL_RE.test(v)) return "Please enter a valid email address.";
          return "";
        }
      },
      {
        input: contactForm.elements["message"],
        error: document.getElementById("cf-message-error"),
        validate: function (v) {
          if (!v) return "Please enter a message.";
          if (v.length < 20) return "Please write at least 20 characters.";
          return "";
        }
      }
    ].filter(function (f) {
      return f.input;
    });

    var updateCount = function () {
      if (!msgField || !msgCount) return;
      var max = parseInt(msgField.getAttribute("maxlength"), 10) || 2000;
      var len = msgField.value.length;
      msgCount.textContent = len + " / " + max;
      msgCount.classList.toggle("is-over", len >= max);
    };

    var showFieldError = function (field, message) {
      if (message) {
        field.input.setAttribute("aria-invalid", "true");
        if (field.error) field.error.textContent = message;
        return true;
      }
      field.input.removeAttribute("aria-invalid");
      if (field.error) field.error.textContent = "";
      return false;
    };

    var validateField = function (field) {
      return showFieldError(field, field.validate(field.input.value.trim()));
    };

    var clearFieldErrors = function () {
      fields.forEach(function (field) {
        showFieldError(field, "");
      });
    };

    var setStatus = function (message, type) {
      if (!statusEl) return;
      statusEl.textContent = message;
      statusEl.className = "pf-form__status is-visible pf-form__status--" + type;
    };

    var clearStatus = function () {
      if (!statusEl) return;
      statusEl.textContent = "";
      statusEl.className = "pf-form__status";
    };

    var setBusy = function (busy) {
      submitting = busy;
      if (submitBtn) {
        submitBtn.disabled = busy;
        if (busy) submitBtn.setAttribute("aria-busy", "true");
        else submitBtn.removeAttribute("aria-busy");
      }
    };

    /* Turn a Formspree error payload into a single readable sentence.
       Formspree may answer with { error }, { errors: [str] } or
       { errors: [{ field, message }] }; handle all of them defensively. */
    var readError = function (data) {
      if (!data) return "";
      if (typeof data.error === "string" && data.error) return data.error;
      if (Array.isArray(data.errors) && data.errors.length) {
        var first = data.errors[0];
        if (typeof first === "string") return first;
        if (first && typeof first.message === "string") return first.message;
      }
      if (typeof data.message === "string" && data.message) return data.message;
      return "";
    };

    fields.forEach(function (field) {
      field.input.addEventListener("blur", function () {
        validateField(field);
      });
      field.input.addEventListener("input", function () {
        if (field.input.getAttribute("aria-invalid") === "true") validateField(field);
      });
    });

    if (msgField && msgCount) {
      msgField.addEventListener("input", updateCount);
    }
    updateCount();

    contactForm.addEventListener("submit", function (event) {
      event.preventDefault();
      if (submitting) return; // guard against accidental double submits

      var firstInvalid = null;
      fields.forEach(function (field) {
        if (validateField(field) && !firstInvalid) firstInvalid = field.input;
      });
      if (firstInvalid) {
        setStatus("Please fix the highlighted fields and try again.", "error");
        firstInvalid.focus();
        return;
      }

      clearStatus();
      setBusy(true);

      fetch(contactForm.action, {
        method: "POST",
        headers: { Accept: "application/json" },
        body: new FormData(contactForm)
      })
        .then(function (response) {
          // Read the body as text first, then parse defensively: the response
          // may be JSON, empty, or an unexpected format / status code.
          return response.text().then(function (text) {
            var data = null;
            try {
              data = text ? JSON.parse(text) : null;
            } catch (err) {
              data = null;
            }
            return { ok: response.ok, status: response.status, data: data };
          });
        })
        .then(function (result) {
          if (result.ok) {
            contactForm.reset();
            clearFieldErrors();
            updateCount();
            setStatus(
              "Thanks — your message was submitted successfully. I'll get back to you soon.",
              "success"
            );
            if (statusEl) statusEl.focus();
            return;
          }
          var reason =
            readError(result.data) ||
            "Your message could not be sent (error " +
              result.status +
              "). Please try again or email me directly.";
          setStatus(reason, "error");
        })
        .catch(function () {
          setStatus(
            "Network error — your message was not sent. Please check your connection and try again.",
            "error"
          );
        })
        .then(function () {
          setBusy(false);
        });
    });
  }

  /* --------------------------------------------- Project detail renderer */
  var detailRoot = document.getElementById("projectDetail");
  if (detailRoot && window.PF_PROJECTS) {
    var params = new URLSearchParams(window.location.search);
    var id = params.get("id");
    var p = id ? window.PF_PROJECTS[id] : null;

    if (!p) {
      detailRoot.innerHTML =
        '<div class="pf-wrap" style="padding:80px 24px;text-align:center">' +
        "<h1>Project not found</h1>" +
        '<p style="margin:12px 0 24px">The project you are looking for is not available.</p>' +
        '<a class="pf-btn pf-btn--primary" href="index.html#projects">Back to projects</a>' +
        "</div>";
      return;
    }

    document.title = p.title + " \u2014 Yidnekachew Solomon";
    var descTag = document.querySelector('meta[name="description"]');
    if (descTag) descTag.setAttribute("content", p.title + ": " + p.cardSummary);

    var esc = function (s) {
      return String(s).replace(/[&<>"]/g, function (c) {
        return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c];
      });
    };
    var tags = p.tags.map(function (t) { return '<li class="pf-tag">' + esc(t) + "</li>"; }).join("");
    var meta = p.meta
      .map(function (m) {
        return (
          '<li><span class="pf-meta__k">' + esc(m.k) +
          '</span><span class="pf-meta__v">' + esc(m.v) + "</span></li>"
        );
      })
      .join("");
    var built = p.built.map(function (b) { return "<li>" + esc(b) + "</li>"; }).join("");
    var technical = p.technical.map(function (t) { return "<li>" + esc(t) + "</li>"; }).join("");
    var overview = p.overview.map(function (o) { return "<p>" + esc(o) + "</p>"; }).join("");
    var gallery = p.gallery
      .map(function (g) {
        return (
          '<figure class="pf-shot"><img src="' + esc(g.src) + '" alt="' +
          esc(p.title + " \u2014 " + g.caption) + '" loading="lazy" decoding="async">' +
          "<figcaption>" + esc(g.caption) + "</figcaption></figure>"
        );
      })
      .join("");
    var arch = p.architecture
      ? '<figure class="pf-shot"><img src="' + esc(p.architecture.src) + '" alt="' +
        esc(p.title + " architecture diagram") + '" loading="lazy" decoding="async">' +
        "<figcaption>" + esc(p.architecture.caption) + "</figcaption></figure>"
      : "";

    var repoBtn = p.repo
      ? '<a class="pf-btn pf-btn--primary" href="' + esc(p.repo) +
        '" target="_blank" rel="noopener">View Code</a>'
      : '<p class="pf-note">No public repository for this project.</p>';

    var flag =
      p.flag && p.flagClass
        ? '<span class="pf-card__flag ' + esc(p.flagClass) + '">' + esc(p.flag) + "</span>"
        : "";

    detailRoot.innerHTML =
      '<section class="pf-detail-hero"><div class="pf-detail-hero__bg"></div><div class="pf-wrap">' +
      '<nav class="pf-breadcrumb"><a href="index.html">Home</a><span>/</span>' +
      '<a href="index.html#projects">Projects</a><span>/</span><span>' + esc(p.title) + "</span></nav>" +
      "<h1>" + esc(p.title) + "</h1>" +
      '<p class="pf-detail-hero__lead">' + esc(p.lead) + "</p>" +
      '<ul class="pf-tags">' + tags + "</ul>" +
      "</div></section>" +
      '<section class="pf-section"><div class="pf-wrap"><div class="pf-detail__grid">' +
      '<div class="pf-detail__main">' +
      '<div class="pf-detail__block"><p class="pf-eyebrow">Overview</p>' + overview + "</div>" +
      (arch ? '<div class="pf-detail__block"><p class="pf-eyebrow">Architecture</p>' + arch + "</div>" : "") +
      '<div class="pf-detail__block"><h2>What I built</h2><ul class="pf-bullets">' + built + "</ul></div>" +
      '<div class="pf-detail__block"><h2>Technical notes</h2><ul class="pf-bullets">' + technical + "</ul></div>" +
      '<div class="pf-detail__block"><h2>Screenshots</h2>' + gallery + "</div>" +
      "</div>" +
      '<aside class="pf-aside"><h3>Project details</h3>' +
      '<ul class="pf-meta">' + meta + "</ul>" +
      repoBtn +
      '<a class="pf-btn pf-btn--outline" href="index.html#projects">Back to projects</a>' +
      "</aside>" +
      "</div></div></section>";
  }
})();
