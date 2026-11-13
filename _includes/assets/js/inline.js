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
  const searchField = document.getElementById("searchField");
  const searchToggle = document.getElementById("searchToggle");
  if (!searchField || !searchToggle) return;

  const isOpening = searchField.classList.contains("hidden");
  searchField.classList.toggle("hidden", !isOpening);
  searchToggle.setAttribute("aria-expanded", String(isOpening));
  if (isOpening) {
    searchField.focus();
  } else {
    const searchResults = document.getElementById("searchResults");
    const noResultsFound = document.getElementById("noResultsFound");
    if (searchResults) searchResults.classList.add("hidden");
    if (noResultsFound) noResultsFound.classList.add("hidden");
  }
}

function activateDarkMode() {
  if (localStorage.getItem('darkmode') === 'true') {
    localStorage.setItem('darkmode', 'false')
    document.body.classList.remove("dark");
  } else {
    localStorage.setItem('darkmode', 'true')
    document.body.classList.add("dark");
  }
}
