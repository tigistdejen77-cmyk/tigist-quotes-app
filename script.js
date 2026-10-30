const API_URL = "https://tigist-quotes-app.onrender.com/api/quotes";

let allQuotes = [];
let currentLang = 'am'; // ነባሪ ቋንቋ አማርኛ
let currentCat = 'love';
let currentIndex = 0;

const categoryNames = {
    love: { am: "❤️ ፍቅር", en: "❤️ Love" },
    friendship: { am: "🤝 ጓደኝነት", en: "🤝 Friendship" },
    work: { am: "💼 ስራ", en: "💼 Work" },
    knowledge: { am: "📚 ዕውቀት", en: "📚 Knowledge" },
    country: { am: "🇪🇹 ሀገር", en: "🇪🇹 Country" },
    motivation: { am: "🌱 ተነሳሽነት", en: "🌱 Motivation" }
};

const quoteTextEl = document.getElementById("quote-text");
const authorEl = document.getElementById("quote-author");
const nextBtn = document.getElementById("next-btn");
const prevBtn = document.getElementById("prev-btn");
const langBtn = document.getElementById("lang-btn");
const subtitleEl = document.getElementById("app-subtitle");
const catStripEl = document.getElementById("cat-strip");

async function loadQuotesFromBackend() {
    try {
        const response = await fetch(API_URL);
        const result = await response.json();
        
        if (result.success && result.data.length > 0) {
            allQuotes = result.data;
            renderCategories();
            updateUI();
        }
    } catch (error) {
        console.error("Error loading quotes:", error);
        quoteTextEl.textContent = "መረጃውን ማምጣት አልተቻለም።";
    }
}

function renderCategories() {
    catStripEl.innerHTML = '';
    const categories = Object.keys(categoryNames);

    categories.forEach(catKey => {
        const btn = document.createElement('button');
        btn.className = `cat-btn ${catKey === currentCat ? 'active' : ''}`;
        btn.textContent = currentLang === 'am' ? categoryNames[catKey].am : categoryNames[catKey].en;
        btn.addEventListener('click', () => {
            currentCat = catKey;
            currentIndex = 0;
            renderCategories();
            updateUI();
        });
        catStripEl.appendChild(btn);
    });
}

function updateUI() {
    const filteredQuotes = allQuotes.filter(q => q.category === currentCat);
    if (filteredQuotes.length === 0) return;

    if (currentIndex >= filteredQuotes.length) {
        currentIndex = 0;
    }

    const current = filteredQuotes[currentIndex];

    if (currentLang === 'am') {
        subtitleEl.textContent = "ለዕለታዊ ስሜታዊ ጉዞዎ የሚሆን የጥቅስ መተግበሪያ።";
        quoteTextEl.textContent = current.amText;
        authorEl.textContent = "- " + current.amAuthor;
        prevBtn.textContent = "ያለፈው";
        nextBtn.textContent = "ቀጣይ";
        langBtn.textContent = "🇺🇸 English";
    } else {
        subtitleEl.textContent = "A mood journal app for daily emotional journey.";
        quoteTextEl.textContent = current.enText;
        authorEl.textContent = "- " + current.enAuthor;
        prevBtn.textContent = "Previous";
        nextBtn.textContent = "Next";
        langBtn.textContent = "🇪🇹 አማርኛ";
    }
}

langBtn.addEventListener("click", () => {
    currentLang = currentLang === 'am' ? 'en' : 'am';
    renderCategories();
    updateUI();
});

nextBtn.addEventListener("click", () => {
    const filteredQuotes = allQuotes.filter(q => q.category === currentCat);
    currentIndex = (currentIndex + 1) % filteredQuotes.length;
    updateUI();
});

prevBtn.addEventListener("click", () => {
    const filteredQuotes = allQuotes.filter(q => q.category === currentCat);
    currentIndex = (currentIndex - 1 + filteredQuotes.length) % filteredQuotes.length;
    updateUI();
});

// አፑ ሲጀመር ዳታውን ከሰርቨር ማምጣት
loadQuotesFromBackend();