/* =========================================================================
   hybrid.cam — site behaviour (jQuery)
   One shared layer for every page:
     · HYBRID.partials  → header / footer / back-to-top injected from one source
     · HYBRID.data      → inventory + protocol data used by several pages
     · HYBRID.modules   → marquee, reveal, stepper, accordion, modal, filters
   Pages opt in with data-attributes; body[data-page] drives nav active state.
   ========================================================================= */

window.HYBRID = window.HYBRID || {};

(function ($, H) {
  "use strict";

  /* ---------------------------------------------------------------- config */
  H.nav = [
    { id: "home", label: "Home", href: "index.html" },
    { id: "shop", label: "Inventory", href: "shop.html" },
    { id: "protocol", label: "Escrow Protocol", href: "protocol.html" },
    { id: "track", label: "Track Order", href: "track.html" },
    { id: "sellers", label: "For Sellers", href: "sellers.html" }
  ];

  H.data = {
    products: [
      { id: "r50", name: "Canon EOS R50", spec: "24.2 MP · 4K30 · SC 1,204", price: "\u20b136,000", seller: "ProGear PH", condition: "MINT \u00b7 VERIFIED", cat: "mirrorless", slot: "[ product shot \u00b7 body + kit lens, 4:3 ]", serial: "062XXXXX0913", shutter: "1,204 actuations", warranty: "Local warranty until Mar 2027" },
      { id: "xs10", name: "Fujifilm X-S10", spec: "26.1 MP · IBIS · SC 4,820", price: "\u20b144,000", seller: "FujiVault", condition: "LIKE NEW", cat: "mirrorless", slot: "[ product shot \u00b7 body, 4:3 ]", serial: "1AQ2XXXX4471", shutter: "4,820 actuations", warranty: "Seller-backed 30 days" },
      { id: "zv1", name: "Sony ZV-1", spec: "20.1 MP · 1\" sensor · vlog", price: "\u20b124,500", seller: "Cubao Optics", condition: "GOOD \u00b7 VERIFIED", cat: "digicam", slot: "[ product shot \u00b7 compact digicam, 4:3 ]", serial: "39XXXX882", shutter: "Not applicable", warranty: "Seller-backed 14 days" },
      { id: "zfc", name: "Nikon Z fc + 28mm", spec: "20.9 MP · retro body · SC 900", price: "\u20b152,000", seller: "Manila Camera Lab", condition: "MINT \u00b7 VERIFIED", cat: "mirrorless", slot: "[ product shot \u00b7 retro body, 4:3 ]", serial: "60XXXXX113", shutter: "900 actuations", warranty: "Local warranty until Aug 2027" },
      { id: "ixus", name: "Canon IXUS 190", spec: "20 MP · 10x zoom · CCD look", price: "\u20b16,800", seller: "Y2K Optics MNL", condition: "GOOD", cat: "digicam", slot: "[ product shot \u00b7 pocket digicam, 4:3 ]", serial: "01XXXX447", shutter: "Not applicable", warranty: "Inspection pass only" },
      { id: "sigma30", name: "Sigma 30mm f/1.4 DC", spec: "APS-C prime · no fungus", price: "\u20b19,900", seller: "Glass Bank PH", condition: "MINT", cat: "glass", slot: "[ product shot \u00b7 prime lens, 4:3 ]", serial: "52XXXXX20", shutter: "Not applicable", warranty: "Inspection pass only" }
    ],

    steps: [
      {
        code: "01", title: "Order & address", role: "Buyer", badge: "Done",
        body: "The buyer confirms the exact unit and drops a delivery address into the order \u2014 never into a chat thread. The address stays masked to the seller until a rider is assigned.",
        guarantee: "Address is tokenised; only the assigned rider sees the full line.",
        facts: [["Order id", "HC-24817-MNL"], ["Unit", "Canon EOS R50 + RF-S 18-45mm"], ["Drop-off", "Masked until rider assignment"], ["Payment", "Nothing charged yet"]]
      },
      {
        code: "02", title: "Seller confirmation", role: "Seller", badge: "Done",
        body: "The seller locks the unit against the order, uploads serial and shutter count, and picks a geofenced meet point. Once locked, the listing goes dark to other buyers.",
        guarantee: "A serial mismatch at inspection voids the sale, not the buyer's money.",
        facts: [["Serial logged", "062XXXXX0913"], ["Shutter count", "1,204 actuations"], ["Meet point", "San Miguel, Manila"], ["Listing state", "Locked \u00b7 hidden"]]
      },
      {
        code: "03", title: "Delivery booking", role: "Platform", badge: "Done",
        body: "Instead of paying the seller up front, the buyer books an on-demand rider through the order. Funds move into escrow at this moment \u2014 the seller can see they exist, but cannot touch them.",
        guarantee: "Escrow funded before dispatch. The rider fee is quoted, not estimated.",
        facts: [["Courier", "On-demand partner rider"], ["Rider fee", "\u20b1180 \u00b7 quoted upfront"], ["Escrow", "\u20b136,000 held"], ["Dispatch", "Assigned in 3 min"]]
      },
      {
        code: "04", title: "Item verification", role: "Rider + both parties", badge: "Live",
        body: "At the seller's door the rider opens a three-way call and runs the checklist on camera: power on, shutter fire, sensor and glass check, dials and buttons, card slot, battery seat. The clip attaches to the order.",
        guarantee: "A failed item never leaves the seller \u2014 escrow refunds within 24 hours.",
        facts: [["Call state", "Buyer + seller + rider live"], ["Checklist", "9 of 12 signed"], ["Evidence", "Video clip attached to order"], ["If it fails", "Auto-cancel, full refund"]]
      },
      {
        code: "05", title: "Pickup", role: "Rider", badge: "Queued",
        body: "Handoff happens at the agreed point \u2014 San Miguel, Manila, near Arellano School. The rider seals the unit in tamper-evident packaging and scans the seal code into the order.",
        guarantee: "Seal code recorded at both ends. A broken seal is the courier's liability.",
        facts: [["Meet point", "Arellano School, San Miguel"], ["Seal code", "TS-4491-A"], ["Packaging", "Tamper-evident, padded"], ["Photo proof", "Sealed unit + odometer"]]
      },
      {
        code: "06", title: "Delivery", role: "Rider", badge: "Queued",
        body: "The unit travels to the buyer's address with live tracking. Location sharing between all three parties expires fifteen minutes after handoff.",
        guarantee: "Insured in transit up to the escrowed value of the unit.",
        facts: [["Tracking", "Live, buyer-visible"], ["Transit cover", "Up to \u20b136,000"], ["Handover", "OTP at the door"], ["Sharing", "Expires after 15 min"]]
      },
      {
        code: "07", title: "Transaction completed", role: "Escrow", badge: "Pending",
        body: "The buyer confirms the seal is intact and the OTP releases escrow to the seller. Warranty window, inspection clip and serial stay filed against both accounts.",
        guarantee: "48-hour dispute window on anything the checklist could not catch.",
        facts: [["Payout", "Released to seller"], ["Buyer record", "Serial + clip archived"], ["Dispute window", "48 hours"], ["Seller score", "+1 cleared sale"]]
      }
    ]
  };

  /* -------------------------------------------------------------- partials */
  var ICONS = {
    facebook: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M13.5 21v-7h2.4l.4-3h-2.8V9.2c0-.9.3-1.5 1.6-1.5H16.5V5.1C16.2 5 15.3 5 14.3 5c-2.1 0-3.6 1.3-3.6 3.8V11H8.3v3h2.4v7h2.8z"/></svg>',
    instagram: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 7.4a4.6 4.6 0 100 9.2 4.6 4.6 0 000-9.2zm0 7.6a3 3 0 110-6 3 3 0 010 6zM17.9 7.2a1.1 1.1 0 11-2.2 0 1.1 1.1 0 012.2 0zM12 4.6c2 0 2.3 0 3.1.1 1 0 1.6.2 2 .4.5.2.9.5 1.2.9.4.3.6.7.8 1.2.2.4.3 1 .4 2 0 .8.1 1.1.1 3.1s0 2.3-.1 3.1c0 1-.2 1.6-.4 2a3.6 3.6 0 01-2 2c-.4.2-1 .3-2 .4-.8 0-1.1.1-3.1.1s-2.3 0-3.1-.1c-1 0-1.6-.2-2-.4a3.6 3.6 0 01-2-2c-.2-.4-.3-1-.4-2 0-.8-.1-1.1-.1-3.1s0-2.3.1-3.1c0-1 .2-1.6.4-2a3.6 3.6 0 012-2c.4-.2 1-.3 2-.4.8 0 1.1-.1 3.1-.1zm0 1.6c-2 0-2.2 0-3 .1-.7 0-1.1.1-1.4.2-.4.2-.6.3-.8.5-.2.2-.4.4-.5.8-.1.3-.2.7-.2 1.4 0 .8-.1 1-.1 3s0 2.2.1 3c0 .7.1 1.1.2 1.4.2.4.3.6.5.8.2.2.4.4.8.5.3.1.7.2 1.4.2.8 0 1 .1 3 .1s2.2 0 3-.1c.7 0 1.1-.1 1.4-.2.4-.2.6-.3.8-.5.2-.2.4-.4.5-.8.1-.3.2-.7.2-1.4 0-.8.1-1 .1-3s0-2.2-.1-3c0-.7-.1-1.1-.2-1.4a2.1 2.1 0 00-.5-.8 2.1 2.1 0 00-.8-.5c-.3-.1-.7-.2-1.4-.2-.8 0-1-.1-3-.1z"/></svg>',
    tiktok: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M15.6 4h-2.4v10.1a2.1 2.1 0 11-2.1-2.1c.2 0 .4 0 .6.1V9.6a4.6 4.6 0 102.9 4.3V8.7c.8.8 1.9 1.3 3.1 1.4V7.6a3.6 3.6 0 01-2.1-1.1c-.5-.6-.8-1.4-.8-2.2v-.3z"/></svg>',
    youtube: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M21.1 8.2a2.4 2.4 0 00-1.7-1.7C17.9 6.1 12 6.1 12 6.1s-5.9 0-7.4.4A2.4 2.4 0 002.9 8.2C2.5 9.7 2.5 12 2.5 12s0 2.3.4 3.8a2.4 2.4 0 001.7 1.7c1.5.4 7.4.4 7.4.4s5.9 0 7.4-.4a2.4 2.4 0 001.7-1.7c.4-1.5.4-3.8.4-3.8s0-2.3-.4-3.8zM10.2 14.9V9.1l5 2.9-5 2.9z"/></svg>',
    x: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M17.5 4h2.8l-6.1 7L21 20h-5.4l-3.6-4.7L7 20H4.2l6.4-7.3L4 4h5.5l3.4 4.4L17.5 4zm-1 14.3h1.5L8 5.6H6.4l10.1 12.7z"/></svg>'
  };

  H.partials = {
    header: function (page) {
      var links = "", drawer = "";
      $.each(H.nav, function (_, n) {
        var on = n.id === page;
        links += '<li class="nav__item"><a class="nav__link' + (on ? " nav__link--active" : "") + '" href="' + n.href + '"' + (on ? ' aria-current="page"' : "") + ">" + n.label + "</a></li>";
        drawer += '<li class="drawer__item"><a class="drawer__link' + (on ? " drawer__link--active" : "") + '" href="' + n.href + '"' + (on ? ' aria-current="page"' : "") + ">" + n.label + "</a></li>";
      });

      return '' +
        '<div class="announce">' +
          '<span class="announce__dot" aria-hidden="true"></span>' +
          '<span class="announce__text">Rider-verified meet-ups \u00b7 Payment releases only after the unit passes inspection</span>' +
        '</div>' +
        '<header class="header" id="site-header">' +
          '<div class="header__inner">' +
            '<a class="logo" href="index.html" aria-label="hybrid.cam home">' +
              '<span class="logo__mark" aria-hidden="true"></span>' +
              '<span class="logo__text">hybrid<span class="logo__text-accent">.cam</span></span>' +
            '</a>' +
            '<nav class="nav" aria-label="Primary"><ul class="nav__list">' + links + '</ul></nav>' +
            '<div class="header__actions">' +
              '<span class="header__locale">MNL \u00b7 PHP</span>' +
              '<a class="btn btn--ghost btn--sm" href="track.html">Track order</a>' +
              '<a class="btn btn--primary btn--sm" href="shop.html">Browse units</a>' +
              '<button class="burger" type="button" aria-expanded="false" aria-controls="site-drawer" aria-label="Toggle menu"><span class="burger__bar"></span></button>' +
            '</div>' +
          '</div>' +
          '<div class="drawer" id="site-drawer">' +
            '<ul class="drawer__list">' + drawer + '</ul>' +
            '<div class="drawer__actions">' +
              '<a class="btn btn--ghost btn--block" href="track.html">Track order</a>' +
              '<a class="btn btn--primary btn--block" href="shop.html">Browse units</a>' +
            '</div>' +
          '</div>' +
        '</header>';
    },

    footer: function () {
      var social = "";
      $.each([["facebook", "Facebook"], ["instagram", "Instagram"], ["tiktok", "TikTok"], ["youtube", "YouTube"], ["x", "X"]], function (_, s) {
        social += '<a class="footer__social-link" href="#" aria-label="' + s[1] + '">' + ICONS[s[0]] + "</a>";
      });

      var cols = [
        ["Marketplace", [["Browse inventory", "shop.html"], ["Mirrorless bodies", "shop.html#grid"], ["Digicams", "shop.html#grid"], ["Lenses & glass", "shop.html#grid"]]],
        ["Trust", [["Escrow protocol", "protocol.html"], ["Track an order", "track.html"], ["Inspection checklist", "protocol.html#checklist"], ["Dispute window", "protocol.html#disputes"]]],
        ["Company", [["For sellers", "sellers.html"], ["Payout schedule", "sellers.html#payouts"], ["Seller FAQ", "sellers.html#faq"], ["Contact support", "sellers.html#contact"]]]
      ];
      var colHtml = "";
      $.each(cols, function (_, c) {
        var items = "";
        $.each(c[1], function (__, l) { items += '<li class="footer__item"><a class="footer__link" href="' + l[1] + '">' + l[0] + "</a></li>"; });
        colHtml += '<div class="footer__col"><h3 class="footer__col-title">' + c[0] + '</h3><ul class="footer__list">' + items + "</ul></div>";
      });

      return '' +
        '<footer class="footer">' +
          '<div class="l-wrap">' +
            '<div class="footer__top">' +
              '<div class="footer__brand">' +
                '<a class="logo" href="index.html" aria-label="hybrid.cam home">' +
                  '<span class="logo__mark" aria-hidden="true"></span>' +
                  '<span class="logo__text">hybrid<span class="logo__text-accent">.cam</span></span>' +
                '</a>' +
                '<p class="footer__brand-copy">Escrowed peer-to-peer camera trading in Metro Manila. Rider inspection on every unit, payout only after the checklist passes.</p>' +
                '<div class="footer__social">' + social + '</div>' +
              '</div>' + colHtml +
            '</div>' +
            '<div class="footer__bottom">' +
              '<span>\u00a9 2026 hybrid.cam \u00b7 Concept design</span>' +
              '<span>Manila, Philippines \u00b7 hello@hybrid.cam</span>' +
            '</div>' +
          '</div>' +
        '</footer>';
    },

    toTop: function () {
      return '<button class="to-top" id="to-top" type="button" aria-label="Back to top"><span class="to-top__arrow" aria-hidden="true"></span></button>';
    },

    marquee: function () {
      var items = ["Canon", "Fujifilm", "Sony", "Nikon", "Panasonic", "Digicams", "Vintage glass", "Verified sellers"];
      var group = '<div class="marquee__group" aria-hidden="false"><span class="marquee__item">';
      $.each(items, function (i, t) {
        group += t + '<span class="marquee__sep' + (i % 2 ? " marquee__sep--gold" : "") + '">\u25c6</span>';
      });
      group += "</span></div>";
      /* two identical groups + translate3d(-50%) = seamless, gapless loop */
      /* one group is the seed; H.modules.marquee repeats it until each half of
         the track is wider than the viewport, so translate3d(-50%) never shows a gap */
      return '<div class="marquee" data-marquee data-marquee-group="' + encodeURIComponent(group) + '">' +
             '<div class="marquee__track">' + group + group + "</div></div>";
    }
  };

  /* --------------------------------------------------------------- modules */
  H.modules = {
    layout: function () {
      var page = $("body").data("page") || "";
      $('[data-partial="header"]').html(H.partials.header(page));
      $('[data-partial="footer"]').html(H.partials.footer());
      $('[data-partial="marquee"]').html(H.partials.marquee());
      if (!$("#to-top").length) { $("body").append(H.partials.toTop()); }
    },

    marquee: function () {
      var $mqs = $("[data-marquee]");
      if (!$mqs.length) { return; }

      function fill($mq) {
        var seed = decodeURIComponent($mq.attr("data-marquee-group") || "");
        if (!seed) { return; }
        var $track = $mq.find(".marquee__track");
        $track.html(seed);
        var groupW = $track.children(".marquee__group").outerWidth() || 1;
        var need = Math.max(2, Math.ceil(($mq.outerWidth() + 120) / groupW) + 1);
        var half = "";
        for (var n = 0; n < need; n++) { half += seed; }
        /* two identical halves → -50% lands exactly on a repeat boundary */
        $track.html(half + half);
        /* constant, even pace at any width: 54 px per second across one half */
        var halfW = groupW * need;
        $track.css("animation-duration", (halfW / 54).toFixed(2) + "s");
      }

      $mqs.each(function () { fill($(this)); });

      var t = null, w = $(window).width();
      $(window).on("resize", function () {
        if ($(window).width() === w) { return; }
        w = $(window).width();
        clearTimeout(t);
        t = setTimeout(function () { $mqs.each(function () { fill($(this)); }); }, 200);
      });
    },

    drawer: function () {
      $(document).on("click", ".burger", function () {
        var $b = $(this), open = $b.attr("aria-expanded") === "true";
        $b.attr("aria-expanded", open ? "false" : "true");
        $("#site-drawer").toggleClass("is-open", !open);
      });
      $(document).on("click", ".drawer__link", function () {
        $(".burger").attr("aria-expanded", "false");
        $("#site-drawer").removeClass("is-open");
      });
      $(window).on("resize", function () {
        if ($(window).width() > 1024) {
          $("#site-drawer").removeClass("is-open");
          $(".burger").attr("aria-expanded", "false");
        }
      });
    },

    scroll: function () {
      var $top = $("#to-top"), $header = $("#site-header");
      function onScroll() {
        var y = $(window).scrollTop();
        $top.toggleClass("is-visible", y > 420);
        $header.toggleClass("header--scrolled", y > 12);
      }
      $(window).on("scroll", onScroll);
      onScroll();
      $(document).on("click", "#to-top", function () {
        $("html, body").animate({ scrollTop: 0 }, 420);
      });
    },

    reveal: function () {
      var $items = $(".reveal");
      if (!$items.length) { return; }
      if (typeof window.IntersectionObserver === "function") {
        var io = new IntersectionObserver(function (entries) {
          entries.forEach(function (e) {
            if (e.isIntersecting) { $(e.target).addClass("is-in"); io.unobserve(e.target); }
          });
        }, { rootMargin: "0px 0px -8% 0px", threshold: 0.08 });
        $items.each(function () { io.observe(this); });
      } else {
        var check = function () {
          var fold = $(window).scrollTop() + $(window).height() * 0.94;
          $items.not(".is-in").each(function () {
            if ($(this).offset().top < fold) { $(this).addClass("is-in"); }
          });
        };
        $(window).on("scroll resize", check);
        check();
      }
    },

    stepper: function () {
      var $rail = $("[data-stepper]");
      if (!$rail.length) { return; }
      var steps = H.data.steps, i = parseInt($rail.data("start"), 10) || 0;

      var railHtml = "";
      $.each(steps, function (n, s) {
        railHtml += '' +
          '<li class="step"><button class="step__button" type="button" data-step="' + n + '">' +
            '<span class="step__index">' + s.code + "</span>" +
            '<span class="step__text"><span class="step__title">' + s.title + '</span><span class="step__role">' + s.role + "</span></span>" +
            '<span class="step__state' + (s.badge === "Live" ? " step__state--live" : "") + '">' + s.badge + "</span>" +
          "</button></li>";
      });
      $rail.html(railHtml);

      function render() {
        var s = steps[i], facts = "";
        $.each(s.facts, function (_, f) {
          facts += '<div class="fact"><div class="fact__label">' + f[0] + '</div><div class="fact__value">' + f[1] + "</div></div>";
        });
        $("[data-detail-kicker]").text("Checkpoint " + s.code + " \u00b7 " + s.badge);
        $("[data-detail-title]").text(s.title);
        $("[data-detail-body]").text(s.body);
        $("[data-detail-guarantee]").text(s.guarantee);
        $("[data-detail-facts]").html(facts);
        $rail.find(".step__button").removeClass("step__button--active").attr("aria-current", "false");
        $rail.find('[data-step="' + i + '"]').addClass("step__button--active").attr("aria-current", "step");
      }

      $rail.on("click", ".step__button", function () { i = parseInt($(this).data("step"), 10); render(); });
      $(document).on("click", "[data-step-prev]", function () { i = (i + steps.length - 1) % steps.length; render(); });
      $(document).on("click", "[data-step-next]", function () { i = (i + 1) % steps.length; render(); });
      render();
    },

    inventory: function () {
      var $grid = $("[data-inventory]");
      if (!$grid.length) { return; }
      var lim
