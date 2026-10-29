const API_URL = "https://tigist-quotes-app.onrender.com/api/quotes";

let quotesArray = [];
let currentIndex = 0;

const amTextElement = document.getElementById("am-text");
const enTextElement = document.getElementById("en-text");
const authorElement = document.getElementById("author");
const nextBtn = document.getElementById("next-btn");
const prevBtn = document.getElementById("prev-btn");

async function fetchQuotes() {
    try {
        const response = await fetch(API_URL);
        const result = await response.json();
        
        if (result.success && result.data.length > 0) {
            quotesArray = result.data;
            displayQuote(currentIndex);
        }
    } catch (error) {
        console.error("Error fetching quotes:", error);
        amTextElement.textContent = "መረጃውን ማምጣት አልተቻለም።";
    }
}

function displayQuote(index) {
    if (quotesArray.length === 0) return;
    
    const currentQuote = quotesArray[index];
    amTextElement.textContent = currentQuote.amText;
    enTextElement.textContent = currentQuote.enText;
    authorElement.textContent = "- " + currentQuote.author;
}

// Next button
nextBtn.addEventListener("click", () => {
    currentIndex++;
    if (currentIndex >= quotesArray.length) {
        currentIndex = 0;
    }
    displayQuote(currentIndex);
});

// Previous button
prevBtn.addEventListener("click", () => {
    currentIndex--;
    if (currentIndex < 0) {
        currentIndex = quotesArray.length - 1;
    }
    displayQuote(currentIndex);
});

fetchQuotes();