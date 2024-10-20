const quotes = JSON.parse(localStorage.getItem("quotes")) || [
    { text: "The only limit to our realization of tomorrow is our doubts of today.", category: "Motivation" },
    { text: "In the end, we will remember not the words of our enemies, but the silence of our friends.", category: "Wisdom" },
    { text: "Life is 10% what happens to us and 90% how we react to it.", category: "Life" }
  ];
  
  function showRandomQuote() {
    const randomIndex = Math.floor(Math.random() * quotes.length);
    const quoteDisplay = document.getElementById("quoteDisplay");
    quoteDisplay.innerHTML = `<p>${quotes[randomIndex].text}</p><small>Category: ${quotes[randomIndex].category}</small>`;
    sessionStorage.setItem("lastViewedQuote", JSON.stringify(quotes[randomIndex]));
  }
  
  document.getElementById("newQuote").addEventListener("click", showRandomQuote);
  
  function addQuote() {
    const newQuoteText = document.getElementById("newQuoteText").value;
    const newQuoteCategory = document.getElementById("newQuoteCategory").value;
  
    if (newQuoteText && newQuoteCategory) {
      quotes.push({ text: newQuoteText, category: newQuoteCategory });
      saveQuotes();
      document.getElementById("newQuoteText").value = "";
      document.getElementById("newQuoteCategory").value = "";
      alert("New quote added successfully!");
      populateCategories();
    } else {
      alert("Please enter both a quote and a category.");
    }
  }
  
  function createAddQuoteForm() {
    const formContainer = document.createElement("div");
    formContainer.innerHTML = `
      <input id="newQuoteText" type="text" placeholder="Enter a new quote" />
      <input id="newQuoteCategory" type="text" placeholder="Enter quote category" />
      <button onclick="addQuote()">Add Quote</button>
      <button onclick="exportToJsonFile()">Export Quotes</button>
      <input type="file" id="importFile" accept=".json" onchange="importFromJsonFile(event)" />
      <select id="categoryFilter" onchange="filterQuotes()">
        <option value="all">All Categories</option>
      </select>
    `;
    document.body.appendChild(formContainer);
  }
  
  function saveQuotes() {
    localStorage.setItem("quotes", JSON.stringify(quotes));
  }
  
  function exportToJsonFile() {
    const dataStr = JSON.stringify(quotes, null, 2);
    const blob = new Blob([dataStr], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "quotes.json";
    link.click();
    URL.revokeObjectURL(url);
  }
  
  function importFromJsonFile(event) {
    const fileReader = new FileReader();
    fileReader.onload = function(event) {
      const importedQuotes = JSON.parse(event.target.result);
      quotes.push(...importedQuotes);
      saveQuotes();
      alert('Quotes imported successfully!');
      populateCategories();
    };
    fileReader.readAsText(event.target.files[0]);
  }
  
  function populateCategories() {
    const categoryFilter = document.getElementById("categoryFilter");
    const uniqueCategories = [...new Set(quotes.map(quote => quote.category))];
  
    categoryFilter.innerHTML = '<option value="all">All Categories</option>';
    uniqueCategories.forEach(category => {
      const option = document.createElement("option");
      option.value = category;
      option.textContent = category;
      categoryFilter.appendChild(option);
    });
  }
  
  function filterQuotes() {
    const selectedCategory = document.getElementById("categoryFilter").value;
    const quoteDisplay = document.getElementById("quoteDisplay");
    let filteredQuotes = quotes;
  
    if (selectedCategory !== "all") {
      filteredQuotes = quotes.filter(quote => quote.category === selectedCategory);
    }
  
    if (filteredQuotes.length > 0) {
      const randomIndex = Math.floor(Math.random() * filteredQuotes.length);
      quoteDisplay.innerHTML = `<p>${filteredQuotes[randomIndex].text}</p><small>Category: ${filteredQuotes[randomIndex].category}</small>`;
    } else {
      quoteDisplay.innerHTML = `<p>No quotes available for this category.</p>`;
    }
  
    localStorage.setItem("selectedCategory", selectedCategory);
  }
  
  window.addEventListener("load", () => {
    populateCategories();
    const savedCategory = localStorage.getItem("selectedCategory");
    if (savedCategory) {
      document.getElementById("categoryFilter").value = savedCategory;
      filterQuotes();
    }
  });
  
  createAddQuoteForm();
  