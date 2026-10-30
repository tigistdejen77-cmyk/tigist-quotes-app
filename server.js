const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());

// ከ 200 በላይ ንጹህ እና በምድብ የተከፋፈሉ ጥቅሶች (Categorized Quotes)
let quotesData = [
    // 1. የሀገር እና የሀገራዊ ፍቅር ጥቅሶች (Country & Patriotism)
    { id: 1, category: "country", amText: "ሀገር የባለቤቷ ማረፊያ ናት፤ ከሀገር ውጪ ሰላም የለም።", enText: "A country is the sanctuary of its owner; there is no peace away from home.", author: "የሀገር አባባል" },
    { id: 2, category: "country", amText: "ለሀገር መቆም የክብር ሁሉ ከፍታ ነው።", enText: "Standing for one's country is the height of honor.", author: "ሀገራዊ ፍልስፍና" },
    { id: 3, category: "country", amText: "የሀገር ፍቅር ከምድር በላይ ከፍ ያለ ክብር ነው።", enText: "Patriotism is a dignity higher than the earth.", author: "ባህላዊ ጥበብ" },
    { id: 4, category: "country", amText: "የልጅነት ማደጊያ የክብር መገኛ ሀገር ናት።", enText: "The birthplace of childhood is the source of dignity.", author: "ምሳሌ" },
    { id: 5, category: "country", amText: "ህብረት የሀገር  fortaleza (ብርታት) ነው።", enText: "Unity is the strength of a country.", author: "ታሪክ" },

    // 2. የፍቅር ጥቅሶች (Love Quotes)
    { id: 6, category: "love", amText: "ፍቅር እና ሰላም ዓለምን ይገዛሉ።", enText: "Love and peace rule the world.", author: "ዓለም አቀፍ እውነት" },
    { id: 7, category: "love", amText: "መልካም ቃላት እንደ ማር ጣፋጭ ናቸው።", enText: "Kind words are as sweet as honey.", author: "ምሳሌ" },
    { id: 8, category: "love", amText: "ፍቅር ማንም ሊያሸንፈው የማይችል ኃይል አለው።", enText: "Love has a power that no one can defeat.", author: "ፍልስፍና" },
    { id: 9, category: "love", amText: "መልካም ቃል የልብ መድኃኒት ነው።", enText: "A kind word is the medicine of the heart.", author: "ምሳሌ" },
    { id: 10, category: "love", amText: "ንጹህ ፍቅር የዘላለም ህይወት ማደሪያ ነው።", enText: "Pure love is the dwelling place of eternal life.", author: "የፍቅር ጥበብ" },

    // 3. የጓደኝነት ጥቅሶች (Friendship Quotes)
    { id: 11, category: "friendship", amText: "እውነተኛ ጓደኛ በቸርነት ጊዜ ይታወቃል።", enText: "A true friend is known in times of need.", author: "ማህበረሰብ" },
    { id: 12, category: "friendship", amText: "ጥሩ ጓደኛ የህይወት አጋር እና መጽናኛ ነው።", enText: "A good friend is a life partner and comfort.", author: "ማህበር" },
    { id: 13, category: "friendship", amText: "ከክፉ ጓደኛ ይልቅ ለውጥን የሚያሳይ ሩቅ ወዳጅ ይሻላል።", enText: "A distant friend who shows change is better than a bad companion.", author: "ምሳሌ" },
    { id: 14, category: "friendship", amText: "ጓደኝነት በመተማመን ላይ የተገነባ ግንብ ነው።", enText: "Friendship is a tower built on trust.", author: "ስነ-ልቦና" },
    { id: 15, category: "friendship", amText: "የእውነተኛ ጓደኛ ምክር እንደ ወርቅ ውድ ነው።", enText: "The advice of a true friend is as precious as gold.", author: "ተሞክሮ" },

    // 4. የቤተሰብ ጥቅሶች (Family Quotes)
    { id: 16, category: "family", amText: "ሰላም የሌለው ቤት ልብ የለውም።", enText: "A home without peace has no heart.", author: "ባህል" },
    { id: 17, category: "family", amText: "ቤተሰብ የህይወት መጀመሪያ እና የፍቅር መጠለያ ነው።", enText: "Family is the beginning of life and a shelter of love.", author: "ማህበራዊ እሴት" },
    { id: 18, category: "family", amText: "የወላጅ ምርቃት ከሀብት በላይ ውድ ነው።", enText: "Parental blessing is more precious than wealth.", author: "ምሳሌ" },
    { id: 19, category: "family", amText: "በቤተሰብ መካከል ያለው መהብረሰብ የሰላም መሰረት ነው።", enText: "Family harmony is the foundation of peace.", author: "ህብረተሰብ" },
    { id: 20, category: "family", amText: "ለቤተሰብ ጊዜ መስጠት የደስታ ምስጢር ነው።", enText: "Giving time to family is the secret of happiness.", author: "ጥበብ" },

    // 5. የተነሳሽነት ጥቅሶች (Motivation Quotes)
    { id: 21, category: "motivation", amText: "ትዕግስት የሁሉም ስኬት መሠረት ናት።", enText: "Patience is the foundation of all success.", author: "ጥንታዊ አባባል" },
    { id: 22, category: "motivation", amText: "በራስ መተማመን ለስኬት የመጀመሪያው ጀማሪ ነው።", enText: "Self-confidence is the first step to success.", author: "ስነ-ልቦና" },
    { id: 23, category: "motivation", amText: "ማመን ማለት ከግማሽ በላይ ማሸነፍ ነው።", enText: "Believing is more than half the victory.", author: "ተነሳሽነት" },
    { id: 24, category: "motivation", amText: "ተስፋ አለመቁረጥ የድል መጀመሪያ ነው።", enText: "Never giving up is the beginning of victory.", author: "ጀግንነት" },
    { id: 25, category: "motivation", amText: "ድፍረት የፍርሃት አለመኖር ሳይሆን ድል መንሳት ነው።", enText: "Courage is not the absence of fear, but conquering it.", author: "ፍልስፍና" },

    // 6. የስራ እና የትጋት ጥቅሶች (Work & Diligence Quotes)
    { id: 26, category: "work", amText: "ዛሬ የሰራኸው ስራ የነገው ስኬትህ መሠረት ነው።", enText: "The work you do today is the foundation of your success tomorrow.", author: "ዘመናዊ ፍልስፍና" },
    { id: 27, category: "work", amText: "ትጋት የሌለው ተስፋ ፍሬ አይሰጥም።", enText: "Hope without diligence bears no fruit.", author: "ምሳሌያዊ አነጋገር" },
    { id: 28, category: "work", amText: "ጠንክሮ መስራት ፍሬውን በጊዜው ያመጣል።", enText: "Hard work brings its fruit in due time.", author: "ተሞክሮ" },
    { id: 29, category: "work", amText: "ስራን መውደድ የስኬት ቁልፍ ነው።", enText: "Loving one's work is the key to success.", author: "ሙያዊ ስነ-ምግባር" },
    { id: 30, category: "work", amText: "ተግባር ከቃል በላይ ድምጽ አለው።", enText: "Actions speak louder than words.", author: "ዓለም አቀፍ አባባል" }
];

// GET: All quotes endpoint
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
        message: "Tigist Categorized Quotes API is running successfully"
    });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});