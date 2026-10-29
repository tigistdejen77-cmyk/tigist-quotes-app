// 1. DOM Elements Selection
const quoteTextEl = document.getElementById("quote-text");
const quoteAuthorEl = document.getElementById("quote-author");
const nextQuoteBtn = document.getElementById("next-quote-btn");
const copyQuoteBtn = document.getElementById("copy-quote-btn");

const inputQuoteText = document.getElementById("input-quote-text");
const inputQuoteAuthor = document.getElementById("input-quote-author");
const submitQuoteBtn = document.getElementById("submit-quote-btn");

const dynamicGreetingEl = document.getElementById("dynamic-greeting");
const userNameInput = document.getElementById("user-name-input");
const userGenderSelect = document.getElementById("user-gender-select");
const saveConfigBtn = document.getElementById("save-config-btn");

// User Context State
let currentUserState = {
    name: "ትግስት",
    gender: "female"
};

let viewedQuoteIds = [];

// 2. Dynamic Humanized Greeting Logic
function renderHumanizedGreeting() {
    const dateNow = new Date();
    const currentHour = dateNow.getHours();
    const dayIndex = dateNow.getDay();
    
    const amharicDays = ["እሁድ", "ሰኞ", "ማክሰኞ", "ረቡዕ", "ሐሙስ", "አርብ", "ቅዳሜ"];
    const dayName = amharicDays[dayIndex];
    const isFemale = currentUserState.gender === "female";

    let timePhrase = "";
    if (currentHour >= 5 && currentHour < 12) {
        timePhrase = isFemale ? "እንደምን አደሽ" : "እንደምን አዳርህ";
    } else if (currentHour >= 12 && currentHour < 17) {
        timePhrase = isFemale ? "እንደምን ዋልሽ" : "እንደምን ዋልክ";
    } else if (currentHour >= 17 && currentHour < 22) {
        timePhrase = isFemale ? "እንደምን አመሸሽ" : "እንደምን አመሸህ";
    } else {
        timePhrase = isFemale ? "ሰላማዊ ምሽት ይሁንልሽ" : "ሰላማዊ ምሽት ይሁንልህ";
    }

    dynamicGreetingEl.textContent = `${timePhrase} ${currentUserState.name}! ዛሬ ${dayName} ነው`;
}

// 3. Fetch Random Quote from Backend
async function fetchRandomQuote() {
    try {
        const response = await fetch('http://localhost:5000/api/quotes');
        const result = await response.json();
        
        if (result.success) {
            const allQuotes = result.data;

            if (viewedQuoteIds.length >= allQuotes.length) {
                viewedQuoteIds = [];
            }

            const availableQuotes = allQuotes.filter(q => !viewedQuoteIds.includes(q.id));

            if (availableQuotes.length > 0) {
                const randomIndex = Math.floor(Math.random() * availableQuotes.length);
                const selectedQuote = availableQuotes[randomIndex];

                viewedQuoteIds.push(selectedQuote.id);

                quoteTextEl.innerHTML = `
                    <div style="font-size: 1.15rem; font-weight: 500; margin-bottom: 8px; color: #2d3748;">${selectedQuote.amText}</div>
                    <div style="font-size: 0.95rem; color: #4a5568; font-style: italic; border-top: 1px dashed #cbd5e0; padding-top: 6px;">${selectedQuote.enText}</div>
                `;
                quoteAuthorEl.textContent = `- ${selectedQuote.author}`;
            }
        }
    } catch (error) {
        console.error("ሰርቨሩን ማግኘት አልተቻለም:", error);
        quoteTextEl.textContent = "ሰርቨሩ ጋር መገናኘት አልተቻለም!";
        quoteAuthorEl.textContent = "- ስህተት";
    }
}

// 4. Copy Quote Logic
function copyQuoteToClipboard() {
    const textToCopy = `${quoteTextEl.innerText} ${quoteAuthorEl.textContent}`;
    navigator.clipboard.writeText(textToCopy).then(() => {
        copyQuoteBtn.textContent = "ተቀድቷል!";
        setTimeout(() => {
            copyQuoteBtn.textContent = "ጥቅሱን ቅዳ (Copy)";
        }, 2000);
    });
}

// 5. Add New Quote to Backend
async function addNewQuoteToBackend() {
    const textVal = inputQuoteText.value.trim();
    const authorVal = inputQuoteAuthor.value.trim();
    const isFemale = currentUserState.gender === "female";

    if (!textVal || !authorVal) {
        const warningMsg = isFemale ? "እባክዎ ሁለቱንም ሳጥኖች ይሙሉ!" : "እባክዎ ሁለቱንም ሳጥኖች ይሙሉ!";
        alert(warningMsg);
        return;
    }

    try {
        const response = await fetch('http://localhost:5000/api/quotes', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ amText: textVal, enText: "User added quote", author: authorVal })
        });

        const result = await response.json();

        if (result.success) {
            quoteTextEl.innerHTML = `
                <div style="font-size: 1.15rem; font-weight: 500; margin-bottom: 8px;">${result.data.amText}</div>
                <div style="font-size: 0.95rem; color: #4a5568; font-style: italic;">${result.data.enText}</div>
            `;
            quoteAuthorEl.textContent = `- ${result.data.author}`;

            inputQuoteText.value = "";
            inputQuoteAuthor.value = "";

            const successMsg = isFemale ? "አዲሱ ጥቅስ በሰርቨሩ ላይ ተመዝግቧል!" : "አዲሱ ጥቅስ በሰርቨሩ ላይ ተመዝግቧል!";
            alert(successMsg);
        }
    } catch (error) {
        console.error("ጥቅስ መመዝገብ አልተቻለም:", error);
        alert("ጥቅሱን ወደ ሰርቨር መላክ አልተቻለም።");
    }
}

// 6. Event Listeners
nextQuoteBtn.addEventListener("click", fetchRandomQuote);
copyQuoteBtn.addEventListener("click", copyQuoteToClipboard);
submitQuoteBtn.addEventListener("click", addNewQuoteToBackend);

saveConfigBtn.addEventListener("click", () => {
    const nameVal = userNameInput.value.trim();
    if (nameVal) {
        currentUserState.name = nameVal;
        currentUserState.gender = userGenderSelect.value;
        renderHumanizedGreeting();
    }
});

// 7. Application Initialization
window.addEventListener("DOMContentLoaded", () => {
    renderHumanizedGreeting();
    fetchRandomQuote();
});