// Scrollspy: highlight the nav link of the section currently in view.
(function () {
  var links = Array.prototype.slice.call(document.querySelectorAll(".nav-link"));
  var sections = links.map(function (l) {
    return document.querySelector(l.getAttribute("href"));
  });
  var header = document.querySelector(".site-header");

  // The header is fixed; keep --header-h in sync with its real height
  // (it can wrap to two lines on narrow screens).
  function setHeaderHeight() {
    document.documentElement.style.setProperty("--header-h", header.offsetHeight + "px");
  }
  setHeaderHeight();
  window.addEventListener("resize", setHeaderHeight);

  function spy() {
    var offset = header.offsetHeight + 30;
    var current = sections[0];
    for (var i = 0; i < sections.length; i++) {
      if (sections[i].getBoundingClientRect().top <= offset) current = sections[i];
    }
    // At the very bottom of the page, force the last section active.
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 2) {
      current = sections[sections.length - 1];
    }
    links.forEach(function (l) {
      l.classList.toggle("active", l.getAttribute("href") === "#" + current.id);
    });
  }

  document.addEventListener("scroll", spy, { passive: true });
  window.addEventListener("resize", spy);
  spy();
})();
