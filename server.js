const express = require('express');
const cors = require('cors');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// In-Memory Database / Quotes Array (Emoji-free & Clean)
let quotesData = [
    {
        id: 1,
        amText: "ትዕግስት የሁሉም ስኬት መሠረት ናት።",
        enText: "Patience is the foundation of all success.",
        author: "ጥንታዊ አባባል"
    },
    {
        id: 2,
        amText: "ዛሬ የሰራኸው ስራ የነገው ስኬትህ መሠረት ነው።",
        enText: "The work you do today is the foundation of your success tomorrow.",
        author: "ዘመናዊ ፍልስፍና"
    },
    {
        id: 3,
        amText: "ዕውቀት በሥራ ሲተገበር ትርጉም ይኖረዋል።",
        enText: "Knowledge has meaning when it is applied in practice.",
        author: "ትምህርታዊ አስተሳሰብ"
    },
    {
        id: 4,
        amText: "መማር ποቼ ማቆም አይደለም፤ አዳዲስ ነገሮችን ማወቅ ነው።",
        enText: "Learning never stops; it is about discovering new things.",
        author: "ምሁራዊ እይታ"
    }
];

// GET: Retrieve all quotes
app.get('/api/quotes', (req, res) => {
    res.json({
        success: true,
        data: quotesData
    });
});

// POST: Add a new quote
app.post('/api/quotes', (req, res) => {
    const { amText, enText, author } = req.body;

    if (!amText || !author) {
        return res.status(400).json({
            success: false,
            message: "እባክዎ ጥቅሱን እና ደራሲውን ሙሉ በሙሉ ይሙሉ"
        });
    }

    const newQuote = {
        id: quotesData.length + 1,
        amText: amText,
        enText: enText || "User added quote",
        author: author
    };

    quotesData.push(newQuote);

    res.status(201).json({
        success: true,
        data: newQuote
    });
});

// Root route handler
app.get('/', (req, res) => {
    res.json({
        success: true,
        message: "Tigist Quotes Backend API is running successfully"
    });
});

// Server Port Configuration (Render Compatible)
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});