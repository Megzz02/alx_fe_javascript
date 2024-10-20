const quotes = [
    { text: "The only limit to our realization of tomorrow is our doubts of today.", category: "Motivation" },
    { text: "In the end, we will remember not the words of our enemies, but the silence of our friends.", category: "Wisdom" },
    { text: "Life is 10% what happens to us and 90% how we react to it.", category: "Life" }
  ];
  
  function showRandomQuote() {
    const randomIndex = Math.floor(Math.random() * quotes.length);
    const quoteDisplay = document.getElementById("quoteDisplay");
    quoteDisplay.innerHTML = `<p>${quotes[randomIndex].text}</p><small>Category: ${quotes[randomIndex].category}</small>`;
  }
  
  document.getElementById("newQuote").addEventListener("click", showRandomQuote);
  
  function addQuote() {
    const newQuoteText = document.getElementById("newQuoteText").value;
    const newQuoteCategory = document.getElementById("newQuoteCategory").value;
  
    if (newQuoteText && newQuoteCategory) {
      quotes.push({ text: newQuoteText, category: newQuoteCategory });
      document.getElementById("newQuoteText").value = "";
      document.getElementById("newQuoteCategory").value = "";
      alert("New quote added successfully!");
    } else {
      alert("Please enter both a quote and a category.");
    }
  }
  