
/* Cross browser popstate */

// for browsers only
if (typeof top != "object") return;

var currentHash,
  pops = riot.observable({}),
  listen = window.addEventListener,
  doc = document;

function pop(hash) {
  hash = hash.type ? location.hash : hash;
  if (hash != currentHash) pops.trigger("pop", hash);
  currentHash = hash;
}

/* Always fire pop event upon page load (normalize behaviour across browsers) */

// standard browsers
if (listen) {
  listen("popstate", pop, false);
  doc.addEventListener("DOMContentLoaded", pop, false);

// IE
} else {
  doc.attachEvent("onreadystatechange", function() {
    if (doc.readyState === "complete") pop("");
  });
}

/* Change the browser URL or listen to changes on the URL */
riot.route = function(to) {
  // listen
  if (typeof to === "function") return pops.on("pop", to);

  // fire
  if (history.pushState) history.pushState(0, 0, to);
  pop(to);

};