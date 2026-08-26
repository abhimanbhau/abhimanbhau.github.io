(function () {
  "use strict";

  var reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (reduced) document.body.classList.add("reduced-motion");

  var yearEl = document.getElementById("copyrightYear");
  if (yearEl) yearEl.textContent = String(new Date().getFullYear());

  /* ============================================================
     1. Boot typewriter
     ============================================================ */
  var bootScript = [
    { t: "cmd", text: "whoami" },
    { t: "out", text: "abhiman-kolte — staff software engineer, production engineering" },
    { t: "cmd", text: "./init_pipeline.sh --candidate=abhiman-kolte --env=production" },
    { t: "ok", text: "[OK] identity verified" },
    { t: "ok", text: "[OK] 6+ years reliability infra experience loaded" },
    { t: "ok", text: "[OK] change-safety platform gating 9 systems : ONLINE" },
    { t: "out", text: "connecting to career_pipeline ..." }
  ];

  var bootEl = document.getElementById("bootLines");
  var uptimeLine = document.getElementById("uptimeLine");

  function renderLineInstant(entry) {
    var div = document.createElement("div");
    div.className = "term-line";
    if (entry.t === "cmd") {
      div.innerHTML = '<span class="prompt">$</span> ' + escapeHtml(entry.text);
    } else if (entry.t === "ok") {
      div.innerHTML = '<span class="ok">' + escapeHtml(entry.text) + "</span>";
    } else {
      div.innerHTML = '<span class="out">' + escapeHtml(entry.text) + "</span>";
    }
    bootEl.appendChild(div);
  }

  function escapeHtml(s) {
    return s.replace(/[&<>]/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;" }[c];
    });
  }

  function typeBoot() {
    if (reduced || !bootEl) {
      bootScript.forEach(renderLineInstant);
      finishBoot();
      return;
    }

    var i = 0;
    function nextLine() {
      if (i >= bootScript.length) {
        finishBoot();
        return;
      }
      var entry = bootScript[i++];
      var div = document.createElement("div");
      div.className = "term-line";
      bootEl.appendChild(div);

      if (entry.t === "cmd") {
        var prompt = document.createElement("span");
        prompt.className = "prompt";
        prompt.textContent = "$ ";
        div.appendChild(prompt);
        typeText(div, entry.text, function () {
          setTimeout(nextLine, 220);
        });
      } else {
        var span = document.createElement("span");
        span.className = entry.t === "ok" ? "ok" : "out";
        div.appendChild(span);
        typeText(span, entry.text, function () {
          setTimeout(nextLine, entry.t === "ok" ? 90 : 260);
        });
      }
    }
    nextLine();
  }

  function typeText(el, text, done) {
    var idx = 0;
    var cursor = document.createElement("span");
    cursor.className = "cursor";
    el.parentNode.appendChild(cursor);
    (function step() {
      if (idx < text.length) {
        el.textContent += text.charAt(idx++);
        setTimeout(step, 14 + Math.random() * 22);
      } else {
        cursor.remove();
        done();
      }
    })();
  }

  function finishBoot() {
    if (uptimeLine) {
      uptimeLine.style.transition = "opacity 0.6s ease";
      uptimeLine.style.opacity = "1";
    }
    startUptimeClock();
  }

  /* ============================================================
     2. Live uptime clock
     ============================================================ */
  function startUptimeClock() {
    var start = new Date("2020-01-06T09:00:00-08:00").getTime();
    var el = document.getElementById("uptimeVal");
    if (!el) return;

    function tick() {
      var diff = Date.now() - start;
      var s = Math.floor(diff / 1000);
      var days = Math.floor(s / 86400);
      var years = Math.floor(days / 365.25);
      var remDays = Math.floor(days - years * 365.25);
      var hh = String(Math.floor((s % 86400) / 3600)).padStart(2, "0");
      var mm = String(Math.floor((s % 3600) / 60)).padStart(2, "0");
      var ss = String(s % 60).padStart(2, "0");
      el.textContent = years + "y " + remDays + "d " + hh + ":" + mm + ":" + ss;
    }
    tick();
    if (!reduced) setInterval(tick, 1000);
  }

  /* ============================================================
     3. Scroll-scrubbed hero: terminal -> metrics
     ============================================================ */
  var heroScrub = document.getElementById("heroScrub");
  var heroTerminal = document.getElementById("heroTerminal");
  var heroMetrics = document.getElementById("heroMetrics");
  var metricEls = document.querySelectorAll(".metric-value");

  function setMetricsToFinal() {
    metricEls.forEach(function (el) {
      el.textContent = el.getAttribute("data-final");
    });
  }

  if (reduced || !heroScrub) {
    setMetricsToFinal();
  } else {
    var ticking = false;

    function clamp(v, a, b) { return Math.max(a, Math.min(b, v)); }

    function updateHeroScrub() {
      ticking = false;
      var rect = heroScrub.getBoundingClientRect();
      var total = rect.height - window.innerHeight;
      if (total <= 0) return;
      var progress = clamp(-rect.top / total, 0, 1);

      // Phase A (0 -> 0.5): terminal fades/scales out
      var termP = clamp(progress / 0.5, 0, 1);
      heroTerminal.style.opacity = String(1 - termP);
      heroTerminal.style.transform = "scale(" + (1 - termP * 0.12) + ") translateY(" + (-termP * 40) + "px)";

      // Phase B (0.35 -> 1): metrics fade/scale in
      var metP = clamp((progress - 0.35) / 0.65, 0, 1);
      heroMetrics.style.opacity = String(metP);
      heroMetrics.style.transform = "scale(" + (0.94 + metP * 0.06) + ") translateY(" + ((1 - metP) * 30) + "px)";

      // counters tied to progress
      var countP = clamp((progress - 0.45) / 0.55, 0, 1);
      metricEls.forEach(function (el) {
        var numeric = el.getAttribute("data-numeric");
        if (numeric === null) {
          if (countP > 0.05) el.textContent = el.getAttribute("data-final");
          return;
        }
        var target = parseFloat(numeric);
        var prefix = el.getAttribute("data-prefix") || "";
        var suffix = el.getAttribute("data-suffix") || "";
        var current = Math.round(target * countP);
        el.textContent = prefix + current + suffix;
      });
    }

    function onScroll() {
      if (!ticking) {
        window.requestAnimationFrame(updateHeroScrub);
        ticking = true;
      }
    }

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    updateHeroScrub();
  }

  /* ============================================================
     4. Warp-in reveals
     ============================================================ */
  var revealEls = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window && !reduced) {
    var io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" }
    );
    revealEls.forEach(function (el) { io.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add("is-visible"); });
  }

  /* ============================================================
     5. Deploy buttons -> stage animation + expand
     ============================================================ */
  document.querySelectorAll("[data-deploy-btn]").forEach(function (btn) {
    btn.addEventListener("click", function () {
      var card = btn.closest(".job-card");
      var isOpen = card.classList.contains("is-open");

      if (isOpen) {
        card.classList.remove("is-open");
        btn.setAttribute("aria-expanded", "false");
        btn.textContent = "▶ run deploy";
        card.querySelectorAll(".stage-chip").forEach(function (chip) {
          chip.classList.remove("lit");
        });
        return;
      }

      btn.disabled = true;
      btn.textContent = "deploying…";
      var chips = card.querySelectorAll(".stage-chip");
      var delay = reduced ? 0 : 260;

      chips.forEach(function (chip, idx) {
        setTimeout(function () {
          chip.classList.add("lit");
          if (idx === chips.length - 1) {
            card.classList.add("is-open");
            btn.setAttribute("aria-expanded", "true");
            btn.textContent = "▲ rollback";
            btn.disabled = false;
          }
        }, idx * delay);
      });
    });
  });

  /* ============================================================
     6. Copy email
     ============================================================ */
  var copyBtn = document.getElementById("copyEmailBtn");
  var copyNote = document.getElementById("copyNote");
  var emailLink = document.getElementById("emailLink");
  if (copyBtn && emailLink) {
    copyBtn.addEventListener("click", function () {
      var email = emailLink.textContent.trim();
      if (navigator.clipboard) {
        navigator.clipboard.writeText(email).then(function () {
          copyNote.classList.add("show");
          setTimeout(function () { copyNote.classList.remove("show"); }, 1600);
        });
      }
    });
  }

  typeBoot();
})();
