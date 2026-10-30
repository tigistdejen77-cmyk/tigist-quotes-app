const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());

// ሙሉ በሙሉ በአማርኛ እና በእንግሊዝኛ ትርጉም የተስተካከሉ ጥቅሶች
let quotesData = [
    { id: 1, category: "love", amText: "ፍቅር እና ሰላም ዓለምን ይገዛሉ።", enText: "Love and peace rule the world.", author: "ዓለም አቀፍ እውነት" },
    { id: 2, category: "love", amText: "መልካም ቃላት እንደ ማር ጣፋጭ ናቸው።", enText: "Kind words are as sweet as honey.", author: "ምሳሌ" },
    { id: 3, category: "love", amText: "እውነተኛ ጓደኛ በቸርነት ጊዜ ይታወቃል።", enText: "A true friend is known in times of need.", author: "ማህበረሰብ" },
    { id: 4, category: "love", amText: "ፍቅር ማንም ሊያሸንፈው የማይችል ኃይል አለው።", enText: "Love has a power that no one can defeat.", author: "ፍልስፍና" },
    { id: 5, category: "motivation", amText: "ትዕግስት የሁሉም ስኬት መሠረት ናት።", enText: "Patience is the foundation of all success.", author: "ጥንታዊ አባባል" },
    { id: 6, category: "motivation", amText: "በራስ መተማመን ለስኬት የመጀመሪያው ጀማሪ ነው።", enText: "Self-confidence is the first step to success.", author: "ስነ-ልቦና" },
    { id: 7, category: "work", amText: "ዛሬ የሰራኸው ስራ የነገው ስኬትህ መሠረት ነው።", enText: "The work you do today is the foundation of your success tomorrow.", author: "ዘመናዊ ፍልስፍና" },
    { id: 8, category: "work", amText: "ዕውቀት በሥራ ሲተገበር ትርጉም ይኖረዋል።", enText: "Knowledge has meaning when it is applied in practice.", author: "ትምህርታዊ አስተሳሰብ" },
    { id: 9, category: "time", amText: "ጊዜ ከወርቅ በላይ ውድ ነው።", enText: "Time is more precious than gold.", author: "የዘመናት እውነት" },
    { id: 10, category: "time", amText: "ትናንት ታሪክ ነው፣ ነገ ምሥጢር ነው፣ ዛሬ ስጦታ ነው።", enText: "Yesterday is history, tomorrow is a mystery, today is a gift.", author: "ጥበብ" }
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