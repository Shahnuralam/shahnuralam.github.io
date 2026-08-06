(function () {
  'use strict';
  var canvas = document.getElementById('bg');
  if (!canvas || !canvas.getContext) { return; }
  var ctx = canvas.getContext('2d');
  if (!ctx) { return; }

  var mqReduce = window.matchMedia ? window.matchMedia('(prefers-reduced-motion: reduce)') : { matches: false };
  var mqDark = window.matchMedia ? window.matchMedia('(prefers-color-scheme: dark)') : { matches: false };
  var DPR = Math.min(window.devicePixelRatio || 1, 2);
  var W = 0, H = 0, cx = 0, cy = 0, R = 0;

  // Fibonacci sphere of points (the "globe").
  var N = 520, sphere = [];
  for (var i = 0; i < N; i++) {
    var t = (i + 0.5) / N;
    var phi = Math.acos(1 - 2 * t);
    var theta = Math.PI * (1 + Math.sqrt(5)) * i;
    sphere.push({ x: Math.sin(phi) * Math.cos(theta), y: Math.sin(phi) * Math.sin(theta), z: Math.cos(phi) });
  }
  // Ambient floating particles (wider field, parallax backdrop).
  var M = 90, parts = [];
  for (var j = 0; j < M; j++) {
    parts.push({ x: Math.random() * 2 - 1, y: Math.random() * 2 - 1, z: Math.random() * 2 - 1, s: Math.random() * 0.6 + 0.25 });
  }

  function resize() {
    W = window.innerWidth; H = window.innerHeight;
    canvas.style.width = W + 'px'; canvas.style.height = H + 'px';
    canvas.width = Math.floor(W * DPR); canvas.height = Math.floor(H * DPR);
    ctx.setTransform(DPR, 0, 0, DPR, 0, 0);
    cx = W / 2; cy = H / 2; R = Math.min(W, H) * 0.29;
  }
  window.addEventListener('resize', resize);
  resize();

  var mx = 0, my = 0, tmx = 0, tmy = 0;
  window.addEventListener('mousemove', function (e) {
    tmx = e.clientX / W - 0.5;
    tmy = e.clientY / H - 0.5;
  }, { passive: true });

  var ang = 0;
  var fov = 2.2;

  function project(p, rad, cosY, sinY, cosX, sinX, camZ) {
    var x1 = p.x * cosY - p.z * sinY;
    var z1 = p.x * sinY + p.z * cosY;
    var y1 = p.y * cosX - z1 * sinX;
    var z2 = p.y * sinX + z1 * cosX;
    var scale = fov / (fov + z2 + camZ);
    return { sx: cx + x1 * rad * scale, sy: cy + y1 * rad * scale, sc: scale, z: z2 };
  }

  function frame() {
    var scrollY = window.pageYOffset || document.documentElement.scrollTop || 0;
    var doc = Math.max(1, (document.documentElement.scrollHeight - window.innerHeight));
    var sp = Math.min(1, scrollY / doc);

    mx += (tmx - mx) * 0.05;
    my += (tmy - my) * 0.05;
    ang += mqReduce.matches ? 0 : 0.0016;

    var ay = ang + mx * 0.8 + sp * Math.PI * 1.2;
    var ax = 0.5 + my * 0.6 + sp * 0.5;
    var cosY = Math.cos(ay), sinY = Math.sin(ay), cosX = Math.cos(ax), sinX = Math.sin(ax);
    var camZ = 2.6 - sp * 0.5;
    var isDark = mqDark.matches;
    var hue1 = 198 + sp * 34;
    var hue2 = 250 + sp * 20;

    ctx.clearRect(0, 0, W, H);

    // Ambient particles.
    for (var a = 0; a < parts.length; a++) {
      var q = project(parts[a], R * 2.4, cosY, sinY, cosX, sinX, camZ);
      var qa = (q.sc - 0.4) * 0.6; if (qa < 0) { qa = 0; }
      ctx.beginPath();
      ctx.arc(q.sx, q.sy, Math.max(0.3, q.sc * 1.5 * parts[a].s), 0, 6.283185);
      ctx.fillStyle = 'hsla(' + hue2 + ',70%,' + (isDark ? '72%' : '55%') + ',' + (qa * 0.45) + ')';
      ctx.fill();
    }

    // Globe points, sorted far-to-near for depth-correct blending.
    var pr = [];
    for (var b = 0; b < sphere.length; b++) {
      pr.push(project(sphere[b], R, cosY, sinY, cosX, sinX, camZ));
    }
    pr.sort(function (u, v) { return v.z - u.z; });
    for (var c = 0; c < pr.length; c++) {
      var pp = pr[c];
      var depth = pp.sc - 0.45; if (depth < 0) { depth = 0; }
      var size = Math.max(0.4, pp.sc * 2.1);
      var alpha = (isDark ? 0.24 : 0.20) + depth * 0.95;
      if (alpha > 0.9) { alpha = 0.9; }
      var hue = hue1 + (pp.z + 1) * 15;
      ctx.beginPath();
      ctx.arc(pp.sx, pp.sy, size, 0, 6.283185);
      ctx.fillStyle = 'hsla(' + hue + ',85%,' + (isDark ? '62%' : '50%') + ',' + alpha + ')';
      ctx.fill();
    }

    requestAnimationFrame(frame);
  }
  requestAnimationFrame(frame);

  // Scroll-reveal.
  if ('IntersectionObserver' in window) {
    var obs = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { en.target.classList.add('in'); obs.unobserve(en.target); }
      });
    }, { threshold: 0.12 });
    document.querySelectorAll('.reveal').forEach(function (el) { obs.observe(el); });
  } else {
    document.querySelectorAll('.reveal').forEach(function (el) { el.classList.add('in'); });
  }

  // 3D tilt on cards (skipped when the user prefers reduced motion or on touch).
  if (!mqReduce.matches && !window.matchMedia('(hover: none)').matches) {
    document.querySelectorAll('.tilt').forEach(function (card) {
      card.addEventListener('mousemove', function (e) {
        var r = card.getBoundingClientRect();
        var px = (e.clientX - r.left) / r.width - 0.5;
        var py = (e.clientY - r.top) / r.height - 0.5;
        card.style.transform = 'perspective(720px) rotateX(' + (-py * 7) + 'deg) rotateY(' + (px * 9) + 'deg) translateY(-3px)';
      });
      card.addEventListener('mouseleave', function () { card.style.transform = ''; });
    });
  }
})();

/* Mobile main menu.
   Separate IIFE from the background scene above, which returns early when the
   canvas is missing — the menu must not depend on that. */
(function () {
  'use strict';
  var btn = document.getElementById('navToggle');
  var links = document.getElementById('navLinks');
  if (!btn || !links) { return; }

  function setOpen(open) {
    if (open) { links.classList.add('open'); } else { links.classList.remove('open'); }
    btn.setAttribute('aria-expanded', open ? 'true' : 'false');
    btn.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
  }

  btn.addEventListener('click', function (e) {
    e.stopPropagation();
    setOpen(links.className.indexOf('open') === -1);
  });

  // Any link closes it, including the in-page anchors.
  links.addEventListener('click', function (e) {
    var t = e.target;
    while (t && t !== links) {
      if (t.tagName === 'A') { setOpen(false); return; }
      t = t.parentNode;
    }
  });

  document.addEventListener('click', function (e) {
    if (links.className.indexOf('open') === -1) { return; }
    if (!links.contains(e.target) && !btn.contains(e.target)) { setOpen(false); }
  });

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' || e.keyCode === 27) { setOpen(false); }
  });

  // Resizing to desktop must not leave the panel state stuck open.
  window.addEventListener('resize', function () {
    if (window.innerWidth > 760) { setOpen(false); }
  });
})();
