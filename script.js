const API_URL = "https://tigist-quotes-app.onrender.com/api/quotes";

let quotes = [];
let currentIndex = 0;

const amTextEl = document.getElementById("am-text");
const enTextEl = document.getElementById("en-text");
const authorEl = document.getElementById("author");
const nextBtn = document.getElementById("next-btn");
const prevBtn = document.getElementById("prev-btn");

async function loadQuotes() {
    try {
        const response = await fetch(API_URL);
        const result = await response.json();
        
        if (result.success && result.data.length > 0) {
            quotes = result.data;
            showQuote(currentIndex);
        }
    } catch (error) {
        console.error("Error loading quotes:", error);
        amTextEl.textContent = "መረጃውን ማምጣት አልተቻለም።";
        enTextEl.textContent = "Failed to load data.";
    }
}

function showQuote(index) {
    if (quotes.length === 0) return;
    
    const current = quotes[index];
    
    // አማርኛ ከላይ፣ እንግሊዝኛ ከታች በትክክል እንዲገባ ይደረጋል
    amTextEl.textContent = current.amText;
    enTextEl.textContent = current.enText;
    authorEl.textContent = "- " + current.author;
}

nextBtn.addEventListener("click", () => {
    currentIndex++;
    if (currentIndex >= quotes.length) {
        currentIndex = 0;
    }
    showQuote(currentIndex);
});

prevBtn.addEventListener("click", () => {
    currentIndex--;
    if (currentIndex < 0) {
        currentIndex = quotes.length - 1;
    }
    showQuote(currentIndex);
});

loadQuotes();