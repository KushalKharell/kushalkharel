(function () {
  var feed = document.getElementById("vlog-feed");
  var filterBar = document.getElementById("vlog-filters");
  if (!feed) return;

  var posts = (window.VLOG_POSTS || []).slice().sort(function (a, b) {
    return String(b.date).localeCompare(String(a.date));
  });

  var MONTHS = ["January", "February", "March", "April", "May", "June", "July",
    "August", "September", "October", "November", "December"];

  function escapeHtml(str) {
    return String(str)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#39;");
  }

  function linkify(text) {
    return escapeHtml(text).replace(/https?:\/\/[^\s<]+[^\s<.,;:!?)]/g, function (url) {
      return '<a href="' + url + '" target="_blank" rel="noopener">' + url + "</a>";
    });
  }

  // "2026-10-08" -> "October 8, 2026"; "2025-04" -> "April 2025"
  function formatDate(date) {
    var parts = String(date).split("-").map(Number);
    var month = MONTHS[parts[1] - 1];
    if (!month) return escapeHtml(date);
    return parts[2] ? month + " " + parts[2] + ", " + parts[0] : month + " " + parts[0];
  }

  function slugify(post) {
    return (post.date + "-" + (post.title || "post"))
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, "");
  }

  function youtubeId(url) {
    var m = String(url).match(/(?:youtu\.be\/|youtube\.com\/(?:watch\?(?:.*&)?v=|embed\/|shorts\/))([\w-]{11})/);
    return m ? m[1] : null;
  }

  function hostname(url) {
    try {
      return new URL(url).hostname.replace(/^www\./, "");
    } catch (e) {
      return url;
    }
  }

  function renderVideo(video) {
    var id = youtubeId(video);
    if (id) {
      return '<div class="post-video"><iframe src="https://www.youtube-nocookie.com/embed/' + id +
        '" title="Video" loading="lazy" referrerpolicy="strict-origin-when-cross-origin" allow="accelerometer; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe></div>';
    }
    if (/\.(mp4|webm|mov)(\?|$)/i.test(video)) {
      return '<div class="post-video"><video src="' + escapeHtml(video) + '" controls preload="metadata"></video></div>';
    }
    return renderLink({ url: video, title: "Watch video" });
  }

  function renderLink(link) {
    var url = escapeHtml(link.url);
    return '<a class="link-card" href="' + url + '" target="_blank" rel="noopener">' +
      '<span class="link-card-icon" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg></span>' +
      '<span class="link-card-text">' +
      '<span class="link-card-title">' + escapeHtml(link.title || link.url) + "</span>" +
      (link.description ? '<span class="link-card-desc">' + escapeHtml(link.description) + "</span>" : "") +
      '<span class="link-card-host">' + escapeHtml(hostname(link.url)) + "</span>" +
      "</span></a>";
  }

  function renderPost(post) {
    var slug = slugify(post);
    var html = '<article class="card post reveal" id="' + slug + '">';
    html += '<div class="post-meta"><a href="#' + slug + '" class="post-date"><time datetime="' +
      escapeHtml(post.date) + '">' + formatDate(post.date) + "</time></a>";
    if (post.tags && post.tags.length) {
      html += '<ul class="chips chips-sm">' + post.tags.map(function (t) {
        return '<li class="chip">' + escapeHtml(t) + "</li>";
      }).join("") + "</ul>";
    }
    html += "</div>";
    if (post.title) html += '<h2 class="post-title">' + escapeHtml(post.title) + "</h2>";
    if (post.body) {
      html += '<div class="post-body">' + String(post.body).trim().split(/\n\s*\n/).map(function (p) {
        return "<p>" + linkify(p.trim()).replace(/\n/g, "<br>") + "</p>";
      }).join("") + "</div>";
    }
    if (post.image && post.image.src) {
      html += '<figure class="post-image"><img src="' + escapeHtml(post.image.src) + '" alt="' +
        escapeHtml(post.image.alt || "") + '" loading="lazy">' +
        (post.image.caption ? "<figcaption>" + escapeHtml(post.image.caption) + "</figcaption>" : "") +
        "</figure>";
    }
    if (post.video) html += renderVideo(post.video);
    if (post.link && post.link.url) html += renderLink(post.link);
    html += "</article>";
    return html;
  }

  function render(tag) {
    var list = tag === "all" ? posts : posts.filter(function (p) {
      return (p.tags || []).indexOf(tag) !== -1;
    });
    if (!list.length) {
      feed.innerHTML = '<div class="card empty-state"><p>No posts yet. Check back soon.</p></div>';
      return;
    }
    feed.innerHTML = list.map(renderPost).join("");
    // Rendered after script.js ran, so reveal these immediately
    feed.querySelectorAll(".reveal").forEach(function (el) {
      el.classList.add("visible");
    });
  }

  // Tag filter buttons
  var tags = [];
  posts.forEach(function (p) {
    (p.tags || []).forEach(function (t) {
      if (tags.indexOf(t) === -1) tags.push(t);
    });
  });
  if (filterBar && tags.length > 1) {
    filterBar.innerHTML = ["all"].concat(tags).map(function (t) {
      return '<button class="filter-btn" type="button" data-tag="' + escapeHtml(t) + '" aria-pressed="' +
        (t === "all") + '">' + (t === "all" ? "All" : escapeHtml(t)) + "</button>";
    }).join("");
    filterBar.addEventListener("click", function (e) {
      var btn = e.target.closest(".filter-btn");
      if (!btn) return;
      filterBar.querySelectorAll(".filter-btn").forEach(function (b) {
        b.setAttribute("aria-pressed", String(b === btn));
      });
      render(btn.getAttribute("data-tag"));
    });
  } else if (filterBar) {
    filterBar.hidden = true;
  }

  render("all");

  // Jump to a linked post (e.g. Vlog.html#2025-04-new-chapter...) once it exists
  if (location.hash) {
    var target = document.getElementById(location.hash.slice(1));
    if (target) target.scrollIntoView();
  }
})();
