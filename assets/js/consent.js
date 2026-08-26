(function () {
  "use strict";

  var GA_ID = "G-1GMWX5LPDV";
  var STORAGE_KEY = "cookie-consent";

  function loadGA() {
    if (window.__gaLoaded) return;
    window.__gaLoaded = true;
    var s = document.createElement("script");
    s.async = true;
    s.src = "https://www.googletagmanager.com/gtag/js?id=" + GA_ID;
    document.head.appendChild(s);
    window.dataLayer = window.dataLayer || [];
    function gtag() { window.dataLayer.push(arguments); }
    window.gtag = gtag;
    gtag("js", new Date());
    gtag("config", GA_ID, { anonymize_ip: true });
  }

  var consent = localStorage.getItem(STORAGE_KEY);
  if (consent === "accepted") { loadGA(); return; }
  if (consent === "declined") return;

  function showBanner() {
    var style = document.createElement("style");
    style.textContent =
      ".cc-banner{position:fixed;left:16px;right:16px;bottom:16px;z-index:9999;" +
      "max-width:640px;margin:0 auto;background:#1a1a1a;color:#eee;" +
      "font:14px/1.5 -apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;" +
      "padding:16px 18px;border-radius:10px;box-shadow:0 10px 30px rgba(0,0,0,.35);" +
      "display:flex;gap:14px;align-items:center;flex-wrap:wrap;}" +
      ".cc-banner p{margin:0;flex:1 1 260px;}" +
      ".cc-banner .cc-actions{display:flex;gap:8px;}" +
      ".cc-banner button{font:inherit;font-size:13px;padding:8px 14px;border-radius:6px;" +
      "border:1px solid rgba(255,255,255,.25);background:transparent;color:#eee;cursor:pointer;}" +
      ".cc-banner button.cc-accept{background:#3ddc84;color:#06170f;border-color:#3ddc84;font-weight:600;}";
    document.head.appendChild(style);

    var el = document.createElement("div");
    el.className = "cc-banner";
    el.setAttribute("role", "dialog");
    el.setAttribute("aria-label", "Cookie consent");
    el.innerHTML =
      "<p>This site uses cookies for anonymous traffic analytics. No personal data is sold or shared.</p>" +
      '<div class="cc-actions">' +
      '<button type="button" class="cc-decline">Decline</button>' +
      '<button type="button" class="cc-accept">Accept</button>' +
      "</div>";
    document.body.appendChild(el);

    el.querySelector(".cc-accept").addEventListener("click", function () {
      localStorage.setItem(STORAGE_KEY, "accepted");
      loadGA();
      el.remove();
    });
    el.querySelector(".cc-decline").addEventListener("click", function () {
      localStorage.setItem(STORAGE_KEY, "declined");
      el.remove();
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", showBanner);
  } else {
    showBanner();
  }
})();
