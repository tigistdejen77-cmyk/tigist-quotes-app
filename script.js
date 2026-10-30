const API_URL = "https://tigist-quotes-app.onrender.com/api/quotes";

let quotes = [];
let currentIndex = 0;
let currentLang = 'am'; // ነባሪ ቋንቋ አማርኛ (am = Amharic, en = English)

const quoteTextEl = document.getElementById("quote-text");
const authorEl = document.getElementById("author");
const nextBtn = document.getElementById("next-btn");
const prevBtn = document.getElementById("prev-btn");
const langToggleBtn = document.getElementById("lang-toggle-btn");
const appTitleEl = document.getElementById("app-title");
const appSubtitleEl = document.getElementById("app-subtitle");

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
        quoteTextEl.textContent = "መረጃውን ማምጣት አልተቻለም።";
    }
}

function showQuote(index) {
    if (quotes.length === 0) return;
    
    const current = quotes[index];
    
    // እንደ ተመረጠው ቋንቋ አማርኛ ወይም እንግሊዝኛ ያሳያል (ምንም መብረቅ/flicker የለም)
    if (currentLang === 'am') {
        quoteTextEl.textContent = current.amText;
        appTitleEl.textContent = "Lightly";
        appSubtitleEl.textContent = "A mood journal app for daily emotional journey.";
        nextBtn.textContent = "ቀጣይ (Next)";
        prevBtn.textContent = "ያለፈው (Previous)";
        langToggleBtn.textContent = "🇺🇸 English";
    } else {
        quoteTextEl.textContent = current.enText;
        appTitleEl.textContent = "Lightly";
        appSubtitleEl.textContent = "A mood journal app for daily emotional journey.";
        nextBtn.textContent = "Next";
        prevBtn.textContent = "Previous";
        langToggleBtn.textContent = "🇪🇹 አማርኛ";
    }
    
    authorEl.textContent = "- " + current.author;
}

// ቋንቋ መቀየሪያ ቁልፍ ሲጫን
langToggleBtn.addEventListener("click", () => {
    currentLang = currentLang === 'am' ? 'en' : 'am';
    showQuote(currentIndex);
});

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