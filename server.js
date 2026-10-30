const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());

// ከ 120 በላይ ንጹህ እና በምድብ የተከፋፈሉ ጥቅሶች (በሁለቱም ቋንቋዎች)
let quotesData = [
    // --- 1. የፍቅር (Love) ---
    { id: 1, category: "love", amText: "ፍቅር እና ሰላም ዓለምን ይገዛሉ።", enText: "Love and peace rule the world.", amAuthor: "ዓለም አቀፍ እውነት", enAuthor: "Universal Truth" },
    { id: 2, category: "love", amText: "መልካም ቃላት እንደ ማር ጣፋጭ ናቸው።", enText: "Kind words are as sweet as honey.", amAuthor: "ምሳሌ", enAuthor: "Proverb" },
    { id: 3, category: "love", amText: "ፍቅር ማንም ሊያሸንፈው የማይችል ኃይል አለው።", enText: "Love has a power that no one can defeat.", amAuthor: "ፍልስፍና", enAuthor: "Philosophy" },
    { id: 4, category: "love", amText: "መልካም ቃል የልብ መድኃኒት ነው።", enText: "A kind word is the medicine of the heart.", amAuthor: "ምሳሌ", enAuthor: "Proverb" },
    { id: 5, category: "love", amText: "ንጹህ ፍቅር የዘላለም ህይወት ማደሪያ ነው።", enText: "Pure love is the dwelling place of eternal life.", amAuthor: "የፍቅር ጥበብ", enAuthor: "Love Wisdom" },
    { id: 6, category: "love", amText: "ፍቅር ትዕግስተኛ እና ቸር ነው።", enText: "Love is patient and kind.", amAuthor: "ጥበብ", enAuthor: "Wisdom" },
    { id: 7, category: "love", amText: "በፍቅር የተሰራ ስራ ፍሬው ውብ ነው።", enText: "Work done with love bears beautiful fruit.", amAuthor: "ተሞክሮ", enAuthor: "Experience" },
    { id: 8, category: "love", amText: "የልብ ንግግር በዝምታም ጭምር ይሰማል።", enText: "Heart language is heard even in silence.", amAuthor: "ስነ-ልቦና", enAuthor: "Psychology" },
    { id: 9, category: "love", amText: "ፍቅር ጥላቻን ድል መንሳት ይችላል።", enText: "Love can conquer hatred.", amAuthor: "ፍልስፍና", enAuthor: "Philosophy" },
    { id: 10, category: "love", amText: "እውነተኛ ፍቅር ጊዜንና ርቀትን አያይም።", enText: "True love sees neither time nor distance.", amAuthor: "ህይወት", enAuthor: "Life" },
    { id: 11, category: "love", amText: "ርህራሄና ፍቅር የሰው ልጅ ማማ ናቸው።", enText: "Compassion and love are the pinnacle of humanity.", amAuthor: "ሰብአዊነት", enAuthor: "Humanity" },
    { id: 12, category: "love", amText: "ፍቅር የህይወት ትርጉም ነው።", enText: "Love is the meaning of life.", amAuthor: "ፍልስፍና", enAuthor: "Philosophy" },
    { id: 13, category: "love", amText: "የተዋደደ ልብ ፈጽሞ አይለያይም።", enText: "A loving heart never truly separates.", amAuthor: "ግጥም", enAuthor: "Poetry" },
    { id: 14, category: "love", amText: "ለሰው ልጅ ሁሉ የሚሆን ፍቅር ማካፈል ጸጋ ነው።", enText: "Sharing love for all mankind is a grace.", amAuthor: "ጥበብ", enAuthor: "Wisdom" },
    { id: 15, category: "love", amText: "ፍቅር ሲኖር በረከት ሞልቶ ይተርፋል።", enText: "Where love exists, blessings overflow.", amAuthor: "ምሳሌ", enAuthor: "Proverb" },
    { id: 16, category: "love", amText: "የለስላሳ ቃል ቁጣን ያበርዳል።", enText: "A gentle word turns away wrath.", amAuthor: "ምሳሌ", enAuthor: "Proverb" },
    { id: 17, category: "love", amText: "ፍቅር መሠረቱ እውነትና ቅንነት ነው።", enText: "The foundation of love is truth and sincerity.", amAuthor: "ስነ-ምግባር", enAuthor: "Ethics" },
    { id: 18, category: "love", amText: "በፍቅር ዓይን ስትመለከት ሁሉም ነገር ውብ ነው።", enText: "When you look through the eyes of love, everything is beautiful.", amAuthor: "ጥበብ", enAuthor: "Wisdom" },
    { id: 19, category: "love", amText: "የፍቅር ኃይል ከማንኛውም ጦር የጸና ነው።", enText: "The power of love is stronger than any weapon.", amAuthor: "ታሪክ", enAuthor: "History" },
    { id: 20, category: "love", amText: "ፍቅር የሰውን ልጅ አንድ የሚያደርግ ድልድይ ነው።", enText: "Love is the bridge that unites humanity.", amAuthor: "ፍልስፍና", enAuthor: "Philosophy" },

    // --- 2. ጓደኝነት (Friendship) ---
    { id: 21, category: "friendship", amText: "እውነተኛ ጓደኛ በቸርነት ጊዜ ይታወቃል።", enText: "A true friend is known in times of need.", amAuthor: "ማህበረሰብ", enAuthor: "Community" },
    { id: 22, category: "friendship", amText: "ጥሩ ጓደኛ የህይወት አጋር እና መጽናኛ ነው።", enText: "A good friend is a life partner and comfort.", amAuthor: "ማህበር", enAuthor: "Society" },
    { id: 23, category: "friendship", amText: "ከክፉ ጓደኛ ይልቅ ለውጥን የሚያሳይ ሩቅ ወዳጅ ይሻላል።", enText: "A distant friend who shows change is better than a bad companion.", amAuthor: "ምሳሌ", enAuthor: "Proverb" },
    { id: 24, category: "friendship", amText: "ጓደኝነት በመተማመን ላይ የተገነባ ግንብ ነው።", enText: "Friendship is a tower built on trust.", amAuthor: "ስነ-ልቦና", enAuthor: "Psychology" },
    { id: 25, category: "friendship", amText: "የእውነተኛ ጓደኛ ምክር እንደ ወርቅ ውድ ነው።", enText: "The advice of a true friend is as precious as gold.", amAuthor: "ተሞክሮ", enAuthor: "Experience" },
    { id: 26, category: "friendship", amText: "ጓደኛ በደስታ ጊዜ የሚሳተፍ በሀዘንም የሚደርስ ነው።", enText: "A friend shares in joy and reaches out in sorrow.", amAuthor: "ማህበረሰብ", enAuthor: "Community" },
    { id: 27, category: "friendship", amText: "ጥሩ ጓደኛ ልክ እንደ መስታወት ነው፤ እውነትን ያሳያል።", enText: "A good friend is like a mirror; they show the truth.", amAuthor: "ጥበብ", enAuthor: "Wisdom" },
    { id: 28, category: "friendship", amText: "ጓደኝነት ከሀብት በላይ ዋጋ አለው።", enText: "Friendship is worth more than wealth.", amAuthor: "ምሳሌ", enAuthor: "Proverb" },
    { id: 29, category: "friendship", amText: "አብሮ ማደግና መማር የጓደኝነት ውበት ነው።", enText: "Growing and learning together is the beauty of friendship.", amAuthor: "ትምህርት", enAuthor: "Education" },
    { id: 30, category: "friendship", amText: "ታማኝ ጓደኛ የህይወት ትልቁ ስጦታ ነው።", enText: "A loyal friend is life's greatest gift.", amAuthor: "ህይወት", enAuthor: "Life" },

    // --- 3. ስራ (Work) ---
    { id: 31, category: "work", amText: "ዛሬ የሰራኸው ስራ የነገው ስኬትህ መሠረት ነው።", enText: "The work you do today is the foundation of your success tomorrow.", amAuthor: "ዘመናዊ ፍልስፍና", enAuthor: "Modern Philosophy" },
    { id: 32, category: "work", amText: "ትጋት የሌለው ተስፋ ፍሬ አይሰጥም።", enText: "Hope without diligence bears no fruit.", amAuthor: "ምሳሌያዊ አነጋገር", enAuthor: "Idiom" },
    { id: 33, category: "work", amText: "ጠንክሮ መስራት ፍሬውን በጊዜው ያመጣል።", enText: "Hard work brings its fruit in due time.", amAuthor: "ተሞክሮ", enAuthor: "Experience" },
    { id: 34, category: "work", amText: "ስራን መውደድ የስኬት ቁልፍ ነው።", enText: "Loving one's work is the key to success.", amAuthor: "ሙያዊ ስነ-ምግባር", enAuthor: "Professional Ethics" },
    { id: 35, category: "work", amText: "ተግባር ከቃል በላይ ድምጽ አለው።", enText: "Actions speak louder than words.", amAuthor: "ዓለም አቀፍ አባባል", enAuthor: "Global Proverb" },
    { id: 36, category: "work", amText: "አብሮ መስራት ውጤትን እጥፍ ያደርጋል።", enText: "Working together doubles the results.", amAuthor: "ንግድ", enAuthor: "Business" },
    { id: 37, category: "work", amText: "ትጋት ድህነትን ያርቃል።", enText: "Diligence keeps poverty away.", amAuthor: "ምሳሌ", enAuthor: "Proverb" },
    { id: 38, category: "work", amText: "ጠንካራ ስራ የከፍታ መሰላል ነው።", enText: "Hard work is the ladder to heights.", amAuthor: "ስኬት", enAuthor: "Success" },
    { id: 39, category: "work", amText: "በሙያህ ታማኝ ሁን፤ ውጤቱ ራሱ ይናገራል።", enText: "Be faithful in your profession; the result will speak for itself.", amAuthor: "ስነ-ምግባር", enAuthor: "Ethics" },
    { id: 40, category: "work", amText: "ጊዜን አክብሮ መስራት ባለሙያነት ነው።", enText: "Working while respecting time is professionalism.", amAuthor: "ሙያ", enAuthor: "Profession" },

    // --- 4. ዕውቀት (Knowledge) ---
    { id: 41, category: "knowledge", amText: "ዕውቀት የሰው ልጅ የብርሃን መብራት ነው።", enText: "Knowledge is the light of mankind.", amAuthor: "ትምህርት", enAuthor: "Education" },
    { id: 42, category: "knowledge", amText: "መማር ማቆም ማለት ማደግ ማቆም ነው።", enText: "To stop learning is to stop growing.", amAuthor: "ፍልስፍና", enAuthor: "Philosophy" },
    { id: 43, category: "knowledge", amText: "ንባብ አእምሮን ያሰፋል።", enText: "Reading broadens the mind.", amAuthor: "ጥበብ", enAuthor: "Wisdom" },
    { id: 44, category: "knowledge", amText: "የዕውቀት ባለቤት የሆነ ሰው ሁልጊዜም አሸናፊ ነው።", enText: "A person of knowledge is always victorious.", amAuthor: "ታሪክ", enAuthor: "History" },
    { id: 45, category: "knowledge", amText: "ዕውቀት በሥራ ሲተገበር ኃይል ይሆናል።", enText: "Knowledge becomes power when applied.", amAuthor: "ሳይንስ", enAuthor: "Science" },

    // --- 5. ሀገር (Country) ---
    { id: 46, category: "country", amText: "ሀገር የባለቤቷ ማረፊያ ናት፤ ከሀገር ውጪ ሰላም የለም።", enText: "A country is the sanctuary of its owner; there is no peace away from home.", amAuthor: "የሀገር አባባል", enAuthor: "Country Proverb" },
    { id: 47, category: "country", amText: "ለሀገር መቆም የክብር ሁሉ ከፍታ ነው።", enText: "Standing for one's country is the height of honor.", amAuthor: "ሀገራዊ ፍልስፍና", enAuthor: "National Philosophy" },
    { id: 48, category: "country", amText: "የሀገር ፍቅር ከምድር በላይ ከፍ ያለ ክብር ነው።", enText: "Patriotism is a dignity higher than the earth.", amAuthor: "ባህላዊ ጥበብ", enAuthor: "Cultural Wisdom" },
    { id: 49, category: "country", amText: "ህብረት የሀገር ብርታት ነው።", enText: "Unity is the strength of a country.", amAuthor: "ታሪክ", enAuthor: "History" },
    { id: 50, category: "country", amText: "የሀገርን ሰላም መጠበቅ የሁሉ ሃላፊነት ነው።", enText: "Protecting the peace of the country is everyone's responsibility.", amAuthor: "ህብረተሰብ", enAuthor: "Society" },

    // --- 6. ተነሳሽነት (Motivation) ---
    { id: 51, category: "motivation", amText: "ትዕግስት የሁሉም ስኬት መሠረት ናት።", enText: "Patience is the foundation of all success.", amAuthor: "ጥንታዊ አባባል", enAuthor: "Ancient Saying" },
    { id: 52, category: "motivation", amText: "በራስ መተማመን ለስኬት የመጀመሪያው ጀማሪ ነው።", enText: "Self-confidence is the first step to success.", amAuthor: "ስነ-ልቦና", enAuthor: "Psychology" },
    { id: 53, category: "motivation", amText: "ተስፋ አለመቁረጥ የድል መጀመሪያ ነው።", enText: "Never giving up is the beginning of victory.", amAuthor: "ጀግንነት", enAuthor: "Courage" },
    { id: 54, category: "motivation", amText: "ድፍረት የፍርሃት አለመኖር ሳይሆን ድል መንሳት ነው።", enText: "Courage is not the absence of fear, but conquering it.", amAuthor: "ፍልስፍና", enAuthor: "Philosophy" },
    { id: 55, category: "motivation", amText: "ብሩህ አመለካከት በጨለማ ውስጥ ብርሃን ያያል።", enText: "An optimistic attitude sees light in the darkness.", amAuthor: "ተነሳሽነት", enAuthor: "Motivation" }
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
        message: "Tigist Lightly API Server is running successfully"
    });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});