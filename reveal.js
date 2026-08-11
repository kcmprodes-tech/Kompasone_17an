/* Scroll-reveal: fades/rises elements in as they enter the viewport.
   Works on desktop & mobile. Honors prefers-reduced-motion.
   Hooks: [data-reveal] (fade), [data-reveal="up"] (fade+rise),
          [data-reveal-group] (staggers its direct children). */
(function () {
  var items = document.querySelectorAll("[data-reveal], [data-reveal-group]");
  if (!items.length) return;

  var reduce =
    window.matchMedia &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  function revealAll() {
    for (var i = 0; i < items.length; i++) items[i].classList.add("is-visible");
  }

  // No animation when reduced-motion is on or IO is unsupported.
  if (reduce || !("IntersectionObserver" in window)) {
    revealAll();
    return;
  }

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

  items.forEach(function (el) {
    io.observe(el);
  });

  // Safety net: if something goes wrong, don't leave content hidden.
  window.addEventListener("load", function () {
    setTimeout(function () {
      items.forEach(function (el) {
        var r = el.getBoundingClientRect();
        if (r.top < window.innerHeight) el.classList.add("is-visible");
      });
    }, 1200);
  });
})();
