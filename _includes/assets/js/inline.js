if (window.netlifyIdentity) {
  window.netlifyIdentity.on("init", user => {
    if (!user) {
      window.netlifyIdentity.on("login", () => {
        document.location.href = "/admin/";
      });
    }
  });
}

document.addEventListener("DOMContentLoaded", function() {
  
  const el = document.getElementById("main");
  if (el) {
    el.addEventListener("click", closeNavigation, false)
  }

  if (localStorage.getItem('darkmode') === 'true') {
    document.body.classList.add("dark");
  } else {
    document.body.classList.remove("dark");
  }
});

function logout() {
  localStorage.removeItem("passphrase")
  window.location.href = "/";
}

function showNavigation() {
  const navigation = document.getElementById("navigation");
  if (!navigation) return;
  navigation.classList.remove("hidden", "sticky","pt-32"); 
  navigation.classList.add("absolute","right-0", "top-0", "-mt-0", "z-50", "pt-0", "bg-white","border-l", "border-gray-200"); 
}

function closeNavigation() {
  const navigation = document.getElementById("navigation");
  if (!navigation) return;
  navigation.classList.add("hidden"); 
  navigation.classList.remove("absolute","right-0","z-50", "bg-gray-100", "border-r", "border-gray-800" ); 
}

function toggleSearch() {
  const overlay = document.getElementById("searchOverlay");
  if (!overlay) return;
  if (overlay.classList.contains("hidden")) {
    openSearch();
  } else {
    closeSearch();
  }
}

function openSearch() {
  const overlay = document.getElementById("searchOverlay");
  const searchField = document.getElementById("searchField");
  if (!overlay || !searchField) return;

  overlay.classList.remove("hidden");
  overlay.setAttribute("aria-hidden", "false");
  const searchToggle = document.getElementById("searchToggle");
  if (searchToggle) searchToggle.setAttribute("aria-expanded", "true");
  document.body.classList.add("search-open");
  searchField.focus();
}

function closeSearch(event) {
  const overlay = document.getElementById("searchOverlay");
  if (!overlay || (event && event.target !== overlay)) return;

  overlay.classList.add("hidden");
  overlay.setAttribute("aria-hidden", "true");
  document.body.classList.remove("search-open");
  const searchToggle = document.getElementById("searchToggle");
  if (searchToggle) {
    searchToggle.setAttribute("aria-expanded", "false");
    searchToggle.focus();
  }
}

document.addEventListener("keydown", function(event) {
  const overlay = document.getElementById("searchOverlay");
  const isOpen = overlay && !overlay.classList.contains("hidden");
  const target = event.target;
  const isTyping = target && (target.matches("input, textarea, select") || target.isContentEditable);

  if (event.key === "Escape" && isOpen) {
    event.preventDefault();
    closeSearch();
    return;
  }

  if (event.key === "Tab" && isOpen) {
    const focusable = overlay.querySelectorAll("input, button, a[href]");
    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  }

  if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === "k") {
    event.preventDefault();
    if (!isOpen) openSearch();
    return;
  }

  if (event.key === "/" && !isTyping && !isOpen) {
    event.preventDefault();
    openSearch();
  }
});

function activateDarkMode() {
  if (localStorage.getItem('darkmode') === 'true') {
    localStorage.setItem('darkmode', 'false')
    document.body.classList.remove("dark");
  } else {
    localStorage.setItem('darkmode', 'true')
    document.body.classList.add("dark");
  }
}
