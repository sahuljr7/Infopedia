(function (window, document) {
  "use strict";

  const searchField = document.getElementById("searchField");
  const searchResults = document.getElementById("searchResults");
  const searchStatus = document.getElementById("searchStatus");
  if (!searchField || !searchResults || !searchStatus) return;

  let searchIndex;
  let selectedIndex = -1;

  function selectResult(index) {
    const options = searchResults.querySelectorAll("[role='option']");
    if (!options.length) return;
    selectedIndex = Math.max(0, Math.min(index, options.length - 1));

    options.forEach(function (option, optionIndex) {
      const isSelected = optionIndex === selectedIndex;
      option.setAttribute("aria-selected", String(isSelected));
      option.classList.toggle("is-selected", isSelected);
    });

    options[selectedIndex].scrollIntoView({ block: "nearest" });
  }

  function renderResults(query) {
    searchResults.innerHTML = "";
    selectedIndex = -1;
    const normalizedQuery = query.trim();

    if (!normalizedQuery) {
      searchStatus.textContent = "Type to search Infopedia";
      return;
    }

    if (!searchIndex) {
      searchStatus.textContent = "Search is loading…";
      return;
    }

    const results = searchIndex.search(normalizedQuery, {
      bool: "OR",
      expand: true,
    }).slice(0, 8);

    if (!results.length) {
      searchStatus.textContent = "No results for “" + normalizedQuery + "”.";
      return;
    }

    searchStatus.textContent = results.length + (results.length === 1 ? " result" : " results");
    results.forEach(function (result, index) {
      const documentData = searchIndex.documentStore.getDoc(result.ref);
      if (!documentData) return;

      const item = document.createElement("li");
      item.id = "search-result-" + index;
      item.setAttribute("role", "option");
      item.setAttribute("aria-selected", "false");

      const link = document.createElement("a");
      link.href = documentData.id;
      link.className = "search-result-link";

      const title = document.createElement("strong");
      title.textContent = documentData.title;
      link.appendChild(title);

      const description = document.createElement("span");
      description.textContent = documentData.description || "Open this Infopedia page";
      link.appendChild(description);

      item.appendChild(link);
      searchResults.appendChild(item);
    });
  }

  searchField.addEventListener("input", function (event) {
    renderResults(event.target.value);
  });

  searchField.addEventListener("keydown", function (event) {
    const options = searchResults.querySelectorAll("[role='option']");
    if (event.key === "ArrowDown" && options.length) {
      event.preventDefault();
      selectResult(selectedIndex + 1);
    } else if (event.key === "ArrowUp" && options.length) {
      event.preventDefault();
      selectResult(selectedIndex < 0 ? 0 : selectedIndex - 1);
    } else if (event.key === "Enter" && selectedIndex >= 0 && options[selectedIndex]) {
      event.preventDefault();
      options[selectedIndex].querySelector("a").click();
    }
  });

  searchResults.addEventListener("mousemove", function (event) {
    const option = event.target.closest("[role='option']");
    if (option) selectResult(Array.prototype.indexOf.call(searchResults.children, option));
  });

  window.addEventListener("load", function () {
    fetch("/search-index.json")
      .then(function (response) {
        if (!response.ok) throw new Error("Search index unavailable");
        return response.json();
      })
      .then(function (rawIndex) {
        if (!window.elasticlunr) throw new Error("Search engine unavailable");
        searchIndex = window.elasticlunr.Index.load(rawIndex);
        if (searchField.value) renderResults(searchField.value);
      })
      .catch(function () {
        searchStatus.textContent = "Search is temporarily unavailable.";
      });
  });
})(window, document);
