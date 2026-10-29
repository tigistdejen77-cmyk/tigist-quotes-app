const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// እያንዳንዱ ጥቅስ አማርኛ (amText) እና እንግሊዝኛ (enText) እንዲኖረው ተደርጎ የተዘጋጀ
let quotesData = [
    { 
        id: 1, 
        amText: "ትዕግስት የሰመረች የወርቅ ማዕድን ናት፤ ጸንቶ የቆየ ዋጋውን ያገኛል።", 
        enText: "Patience is a refined gold mine; he who endures reaps its true value.", 
        author: "የኢትዮጵያ ምሳሌያዊ ንግግር" 
    },
    { 
        id: 2, 
        amText: "ትናንትን ማረም አትችልም፣ ግን ዛሬን ቀይረህ ነገን ማሳመር ትችላለህ።", 
        enText: "You cannot rewrite yesterday, but you can change today to make tomorrow better.", 
        author: "መሠረታዊ ጥበብ" 
    },
    { 
        id: 3, 
        amText: "በራስህ ላይ ኢንቨስት አድርግ፤ እሱ መቼም ከሳሪ ንግድ ውጪ ነው።", 
        enText: "Invest in yourself; it is an investment that never loses value.", 
        author: "ናቫል ራቪካንት" 
    },
    { 
        id: 4, 
        amText: "መውደቅ ውድቀት አይደለም፤ ከወደቁ በኋላ አለመነሳት ነው ውድቀት።", 
        enText: "Falling down is not failure; staying down is.", 
        author: "ምዕራባዊ ጥበብ" 
    },
    { 
        id: 5, 
        amText: "ፈገግታ የነፍስ ሐኪም ናት፤ የራስን እና የሌሎችን ቀን ታበራለች።", 
        enText: "A smile is the doctor of the soul; it brightens your day and others.", 
        author: "የህይወት ፍልስፍና" 
    },
    { 
        id: 6, 
        amText: "አንድ እርምጃ በድፍረት መጀመር ግማሽ ስኬት ነው።", 
        enText: "Taking a bold first step is already half of the success.", 
        author: "የጥንታዊ ጥበብ" 
    },
    { 
        id: 7, 
        amText: "ዝምታ ሁልጊዜ መልስ አይደለም፣ ግን ብዙ ጊዜ ጥልቅ ጥበብ ነው።", 
        enText: "Silence is not always an answer, but often it is profound wisdom.", 
        author: "የአገር ውስጥ ፍልስፍና" 
    },
    { 
        id: 8, 
        amText: "ትልቁ አደጋ ፈጣን ውሳኔ ሳይሆን፣ ምንም አለማድረግ ነው።", 
        enText: "The biggest risk is not making a fast decision, but doing nothing at all.", 
        author: "ቢዝነስ ጥበብ" 
    },
    { 
        id: 9, 
        amText: "እውነት ሁልጊዜ ታሸንፋለች፤ ጊዜ ብቻ ይወስዳል።", 
        enText: "Truth always prevails; it just takes a little time.", 
        author: "የታሪክ እውነት" 
    },
    { 
        id: 10, 
        amText: "ጉዞው ረጅም ቢሆንም መጀመርህ ግማሽ መንገድ አቋርጠሃል ማለት ነው።", 
        enText: "Even if the journey is long, starting means you have covered half the distance.", 
        author: "የተስፋ ቃል" 
    }
];

// GET /api/quotes
app.get('/api/quotes', (req, res) => {
    res.json({
        success: true,
        count: quotesData.length,
        data: quotesData
    });
});

// GET /api/quotes/random
app.get('/api/quotes/random', (req, res) => {
    const randomIndex = Math.floor(Math.random() * quotesData.length);
    res.json({
        success: true,
        data: quotesData[randomIndex]
    });
});

// POST /api/quotes
app.post('/api/quotes', (req, res) => {
    const { amText, enText, author } = req.body;

    if (!amText || !author) {
        return res.status(400).json({
            success: false,
            message: "እባክዎ የአማርኛውን ጥቅስ እና የፀሐፊውን ስም ያስገቡ!"
        });
    }

    const newQuote = {
        id: quotesData.length + 1,
        amText,
        enText: enText || "No translation provided.",
        author
    };

    quotesData.push(newQuote);

    res.status(201).json({
        success: true,
        message: "ጥቅሱ በተሳካ ሁኔታ ተመዝግቧል!",
        data: newQuote
    });
});

app.listen(PORT, () => {
    console.log(`🚀 ሰርቨሩ በ http://localhost:${PORT} ላይ ስራ ጀምሯል!`);
});