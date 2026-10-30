const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());

// ከ 100 በላይ ንጹህ እና በምድብ የተከፋፈሉ ጥቅሶች (Quotes categorized by topic)
let quotesData = [
    // 1. የፍቅር ጥቅሶች (Love Quotes)
    { id: 1, category: "love", amText: "ፍቅር እና ሰላም ዓለምን ይገዛሉ።", enText: "Love and peace rule the world.", author: "ዓለም አቀፍ እውነት" },
    { id: 2, category: "love", amText: "መልካም ቃላት እንደ ማር ጣፋጭ ናቸው።", enText: "Kind words are as sweet as honey.", author: "ምሳሌ" },
    { id: 3, category: "love", amText: "እውነተኛ ጓደኛ በቸርነት ጊዜ ይታወቃል።", enText: "A true friend is known in times of need.", author: "ማህበረሰብ" },
    { id: 4, category: "love", amText: "ፍቅር ማንም ሊያሸንፈው የማይችል ኃይል አለው።", enText: "Love has a power that no one can defeat.", author: "ፍልስፍና" },
    { id: 5, category: "love", amText: "መልካም ቃል የልብ መድኃኒት ነው።", enText: "A kind word is the medicine of the heart.", author: "ምሳሌ" },
    { id: 6, category: "love", amText: "መተሳሰብ የሰው ልጅ መለያ ነው።", enText: "Compassion is the hallmark of humanity.", author: "ሰብአዊነት" },
    { id: 7, category: "love", amText: "ጥሩ ጓደኛ የህይወት አጋር ነው።", enText: "A good friend is a life companion.", author: "ማህበር" },
    { id: 8, category: "love", amText: "ለሰዎች መልካም ማድረግ የተሻለ ስሜት ይሰጣል።", enText: "Doing good to people gives a better feeling.", author: "ሰብአዊነት" },

    // 2. የተነሳሽነት እና የድፍረት ጥቅሶች (Motivation & Courage)
    { id: 9, category: "motivation", amText: "ትዕግስት የሁሉም ስኬት መሠረት ናት።", enText: "Patience is the foundation of all success.", author: "ጥንታዊ አባባል" },
    { id: 10, category: "motivation", amText: "በራስ መተማመን ለስኬት የመጀመሪያው ጀማሪ ነው።", enText: "Self-confidence is the first step to success.", author: "ስነ-ልቦና" },
    { id: 11, category: "motivation", amText: "ማመን ማለት ከግማሽ በላይ ማሸነፍ ነው።", enText: "Believing is more than half the victory.", author: "ተነሳሽነት" },
    { id: 12, category: "motivation", amText: "ተስፋ አለመቁረጥ የድል መጀመሪያ ነው።", enText: "Never giving up is the beginning of victory.", author: "ጀግንነት" },
    { id: 13, category: "motivation", amText: "ድፍረት የፍርሃት አለመኖር ሳይሆን ድል መንሳት ነው።", enText: "Courage is not the absence of fear, but conquering it.", author: "ፍልስፍና" },
    { id: 14, category: "motivation", amText: "ትልቅ ህልም አለህ? ጠንክረህ ሰራለት።", enText: "Do you have a big dream? Work hard for it.", author: "ተነሳሽነት" },
    { id: 15, category: "motivation", amText: "ብሩህ አመለካከት በጨለማ ውስጥ ብርሃን ያያል።", enText: "An optimistic attitude sees light in the darkness.", author: "ተነሳሽነት" },
    { id: 16, category: "motivation", amText: "ጽናት የድል አክሊል ነው።", enText: "Perseverance is the crown of victory.", author: "ታሪክ" },

    // 3. የስራ እና የትጋት ጥቅሶች (Work & Diligence)
    { id: 17, category: "work", amText: "ዛሬ የሰራኸው ስራ የነገው ስኬትህ መሠረት ነው።", enText: "The work you do today is the foundation of your success tomorrow.", author: "ዘመናዊ ፍልስፍና" },
    { id: 18, category: "work", amText: "ትጋት የሌለው ተስፋ ፍሬ አይሰጥም።", enText: "Hope without diligence bears no fruit.", author: "ምሳሌያዊ አነጋገር" },
    { id: 19, category: "work", amText: "ጠንክሮ መስራት ፍሬውን በጊዜው ያመጣል።", enText: "Hard work brings its fruit in due time.", author: "ተሞክሮ" },
    { id: 20, category: "work", amText: "ስራን መውደድ የስኬት ቁልፍ ነው።", enText: "Loving one's work is the key to success.", author: "ሙያዊ ስነ-ምግባር" },
    { id: 21, category: "work", amText: "ተግባር ከቃል በላይ ድምጽ አለው።", enText: "Actions speak louder than words.", author: "ዓለም አቀፍ አባባል" },
    { id: 22, category: "work", amText: "አብሮ መስራት ውጤትን እጥፍ ያደርጋል።", enText: "Working together doubles the results.", author: "ንግድ" },
    { id: 23, category: "work", amText: "ትጋት ድህነትን ያርቃል።", enText: "Diligence keeps poverty away.", author: "ምሳሌ" },
    { id: 24, category: "work", amText: "ጠንካራ ስራ የከፍታ መሰላል ነው።", enText: "Hard work is the ladder to heights.", author: "ስኬት" },

    // 4. የጊዜ እና ጥበብ ጥቅሶች (Time & Wisdom)
    { id: 25, category: "time", amText: "ጊዜ ከወርቅ በላይ ውድ ነው።", enText: "Time is more precious than gold.", author: "የዘመናት እውነት" },
    { id: 26, category: "time", amText: "ትናንት ታሪክ ነው፣ ነገ ምሥጢር ነው፣ ዛሬ ስጦታ ነው።", enText: "Yesterday is history, tomorrow is a mystery, today is a gift.", author: "ጥበብ" },
    { id: 27, category: "time", amText: "ጊዜን ከንቱ ሆኖ እንዲያልፍ አትፍቀድ።", enText: "Do not let time pass in vain.", author: "ምክር" },
    { id: 28, category: "time", amText: "ጊዜን በአግባቡ መጠቀም ስኬትን ያመጣል።", enText: "Using time properly brings success.", author: "አስተዳደር" },
    { id: 29, category: "time", amText: "ዕውቀት በሥራ ሲተገበር ትርጉም ይኖረዋል።", enText: "Knowledge has meaning when it is applied in practice.", author: "ትምህርታዊ አስተሳሰብ" },
    { id: 30, category: "time", amText: "ማስተዋል የጥበብ ሁሉ መጀመሪያ ነው።", enText: "Prudence is the beginning of all wisdom.", author: "ጥንታዊ ጥበብ" },
    { id: 31, category: "time", amText: "ጊዜ ፈውስ ነው።", enText: "Time is a healer.", author: "የዘመናት ተሞክሮ" },

    // 5. የቤተሰብ እና ማህበራዊ እሴቶች (Family & Society)
    { id: 32, category: "family", amText: "ሰላም የሌለው ቤት ልብ የለውም።", enText: "A home without peace has no heart.", author: "ባህል" },
    { id: 33, category: "family", amText: "ትህትና የሰው ልጅ መለያ ማዕረግ ናት።", enText: "Humility is the hallmark of human character.", author: "ስነ-ምግባር" },
    { id: 34, category: "family", amText: "ለሰዎች የሚሰጡት ክብር ለራስህ የሚሰጥ ነው።", enText: "The respect you give to others is given to yourself.", author: "ባህል" },
    { id: 35, category: "family", amText: "ማህበራዊ ትብብር ተራሮችን ያንቀሳቅሳል።", enText: "Social cooperation moves mountains.", author: "ምሳሌ" }
];

// GET: All quotes
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
        message: "Tigist Quotes Backend API is running with categorized quotes"
    });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});