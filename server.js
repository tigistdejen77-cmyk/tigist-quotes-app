const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());

let quotesData = [
    { id: 1, amText: "ትዕግስት የሁሉም ስኬት መሠረት ናት።", enText: "Patience is the foundation of all success.", author: "ጥንታዊ አባባል" },
    { id: 2, amText: "ዛሬ የሰራኸው ስራ የነገው ስኬትህ መሠረት ነው።", enText: "The work you do today is the foundation of your success tomorrow.", author: "ዘመናዊ ፍልስፍና" },
    { id: 3, amText: "ዕውቀት በሥራ ሲተገበር ትርጉም ይኖረዋል።", enText: "Knowledge has meaning when it is applied in practice.", author: "ትምህርታዊ አስተሳሰብ" },
    { id: 4, amText: "መማር ማቆም አይደለም፤ አዳዲስ ነገሮችን ማወቅ ነው።", enText: "Learning never stops; it is about discovering new things.", author: "ምሁራዊ እይታ" }
];

app.get('/api/quotes', (req, res) => {
    res.json({
        success: true,
        count: quotesData.length,
        data: quotesData
    });
});

app.get('/', (req, res) => {
    res.json({
        success: true,
        message: "Tigist Quotes Backend API is running successfully"
    });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});