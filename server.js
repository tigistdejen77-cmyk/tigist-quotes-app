const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());

// ከ 100 በላይ ንጹህ እና በምድብ የተከፋፈሉ ጥቅሶች (Categorized Quotes)
let quotesData = [
    // 1. የሀገር እና ሀገራዊ ፍቅር (Country)
    { id: 1, category: "country", amText: "ሀገር የባለቤቷ ማረፊያ ናት፤ ከሀገር ውጪ ሰላም የለም።", enText: "A country is the sanctuary of its owner; there is no peace away from home.", author: "የሀገር አባባል" },
    { id: 2, category: "country", amText: "ለሀገር መቆም የክብር ሁሉ ከፍታ ነው።", enText: "Standing for one's country is the height of honor.", author: "ሀገራዊ ፍልስፍና" },
    { id: 3, category: "country", amText: "የሀገር ፍቅር ከምድር በላይ ከፍ ያለ ክብር ነው።", enText: "Patriotism is a dignity higher than the earth.", author: "ባህላዊ ጥበብ" },
    { id: 4, category: "country", amText: "የልጅነት ማደጊያ የክብር መገኛ ሀገር ናት።", enText: "The birthplace of childhood is the source of dignity.", author: "ምሳሌ" },
    { id: 5, category: "country", amText: "ህብረት የሀገር ብርታት ነው።", enText: "Unity is the strength of a country.", author: "ታሪክ" },
    { id: 6, category: "country", amText: "የሀገርን ሰላም መጠበቅ የሁሉ ሃላፊነት ነው።", enText: "Protecting the peace of the country is everyone's responsibility.", author: "ህብረተሰብ" },
    { id: 7, category: "country", amText: "ባህልና ታሪክ የሀገር መገለጫ ጸጋዎች ናቸው።", enText: "Culture and history are the defining grace of a country.", author: "ଐቲሪክ" },
    { id: 8, category: "country", amText: "ለሀገር የሚሰጥ መስዋዕትነት ትልቁ ክብር ነው።", enText: "Sacrifice given for the country is the greatest honor.", author: "ታሪክ" },
    { id: 9, category: "country", amText: "የሀገር ልማት የሚጀምረው ከራሳችን ነው።", enText: "Country development starts from ourselves.", author: "ልማት" },
    { id: 10, category: "country", amText: "የሀገር አንድነት የማይበጠስ ကြိုး (ገመድ) ነው።", enText: "The unity of a country is an unbreakable cord.", author: "ጥበብ" },
    { id: 11, category: "country", amText: "ኢትዮጵያዊነት የክብርና የህብረት ምልክት ነው።", enText: "Ethiopianism is a symbol of honor and unity.", author: "ባህል" },
    { id: 12, category: "country", amText: "የሀገርን ፊት ማቀንናት የትውልድ ሃላፊነት ነው።", enText: "Brighter future of the country is a generation's responsibility.", author: "ትውልድ" },
    { id: 13, category: "country", amText: "ሰላም የሰፈነባት ሀገር የሁሉ ናፍቆት ናት።", enText: "A country filled with peace is everyone's longing.", author: "ሰላም" },
    { id: 14, category: "country", amText: "የሀገር ፍቅር በልብ የሚታረስ ክቡር ስሜት ነው።", enText: "Patriotism is a precious feeling cultivated in the heart.", author: "ፍልስፍና" },
    { id: 15, category: "country", amText: "የሀገር ሀብት የህዝብዋ ልፋት ነው።", enText: "The wealth of a country is the labor of its people.", author: "ኢኮኖሚ" },
    { id: 16, category: "country", amText: "በጋራ የቆመች ሀገር ፈጽሞ አትወድቅም።", enText: "A country standing together never falls.", author: "ህብረት" },
    { id: 17, category: "country", amText: "የአባት አጥንት ያረፈባት መሬት የተከበረች ናት።", enText: "The land where ancestors rested is sacred.", author: "ታሪክ" },
    { id: 18, category: "country", amText: "ለሀገር ዕድገት እውቀትና ትጋት ቀዳሚዎች ናቸው።", enText: "Knowledge and diligence are primary for country growth.", author: "ዕድገት" },
    { id: 19, category: "country", amText: "የሀገር ክብር የዜጎቿ ሰብአዊነት ይገለጻል።", enText: "Country honor is expressed through citizens' humanity.", author: "ሰብአዊነት" },
    { id: 20, category: "country", amText: "ትውልዱ ለሀገሩ ታማኝ ሲሆን ሀገር ታበራለች።", enText: "When the generation is loyal to its country, it shines.", author: "ወደፊት" },

    // 2. የፍቅር ጥቅሶች (Love)
    { id: 21, category: "love", amText: "ፍቅር እና ሰላም ዓለምን ይገዛሉ።", enText: "Love and peace rule the world.", author: "ዓለም አቀፍ እውነት" },
    { id: 22, category: "love", amText: "መልካም ቃላት እንደ ማር ጣፋጭ ናቸው።", enText: "Kind words are as sweet as honey.", author: "ምሳሌ" },
    { id: 23, category: "love", amText: "ፍቅር ማንም ሊያሸንፈው የማይችል ኃይል አለው።", enText: "Love has a power that no one can defeat.", author: "ፍልስፍና" },
    { id: 24, category: "love", amText: "መልካም ቃል የልብ መድኃኒት ነው።", enText: "A kind word is the medicine of the heart.", author: "ምሳሌ" },
    { id: 25, category: "love", amText: "ንጹህ ፍቅር የዘላለም ህይወት ማደሪያ ነው።", enText: "Pure love is the dwelling place of eternal life.", author: "የፍቅር ጥበብ" },
    { id: 26, category: "love", amText: "ፍቅር ትዕግስተኛ እና ቸር ነው።", enText: "Love is patient and kind.", author: "ጥበብ" },
    { id: 27, category: "love", amText: "በፍቅር የተሰራ ስራ ፍሬው ውብ ነው።", enText: "Work done with love bears beautiful fruit.", author: "ተሞክሮ" },
    { id: 28, category: "love", amText: "የልብ ንግግር በዝምታም ጭምር ይሰማል።", enText: "Heart language is heard even in silence.", author: "ስነ-ልቦና" },
    { id: 29, category: "love", amText: "ፍቅር ጥላቻን ድል መንሳት ይችላል።", enText: "Love can conquer hatred.", author: "ፍልስፍና" },
    { id: 30, category: "love", amText: "እውነተኛ ፍቅር ጊዜንና ርቀትን አያይም።", enText: "True love sees neither time nor distance.", author: "ህይወት" },
    { id: 31, category: "love", amText: "ርህራሄና ፍቅር የሰው ልጅ ማማ ናቸው።", enText: "Compassion and love are the pinnacle of humanity.", author: "ሰብአዊነት" },
    { id: 32, category: "love", amText: "ፍቅር የህይወት ትርጉም ነው።", enText: "Love is the meaning of life.", author: "ፍልስፍና" },
    { id: 33, category: "love", amText: "የተዋደደ ልብ ፈጽሞ አይለያይም።", enText: "A loving heart never truly separates.", author: "ግጥም" },
    { id: 34, category: "love", amText: "ለሰው ልጅ ሁሉ የሚሆን ፍቅር ማካፈል ጸጋ ነው።", enText: "Sharing love for all mankind is a grace.", author: "ጥበብ" },
    { id: 35, category: "love", amText: "ፍቅር ሲኖር በረከት ሞልቶ ይተርፋል።", enText: "Where love exists, blessings overflow.", author: "ምሳሌ" },
    { id: 36, category: "love", amText: "የለስላሳ ቃል ቁጣን ያበርዳል።", enText: "A gentle word turns away wrath.", author: "ምሳሌ" },
    { id: 37, category: "love", amText: "ፍቅር መሠረቱ እውነትና ቅንነት ነው።", enText: "The foundation of love is truth and sincerity.", author: "ስነ-ምግባር" },
    { id: 38, category: "love", amText: "በፍቅር ዓይን ስትመለከት ሁሉም ነገር ውብ ነው።", enText: "When you look through the eyes of love, everything is beautiful.", author: "ጥበብ" },
    { id: 39, category: "love", amText: "የፍቅር ኃይል ከማንኛውም ጦር የጸና ነው።", enText: "The power of love is stronger than any weapon.", author: "ታሪክ" },
    { id: 40, category: "love", amText: "ፍቅር የሰውን ልጅ አንድ የሚያደርግ ድልድይ ነው።", enText: "Love is the bridge that unites humanity.", author: "ፍልስፍና" },

    // 3. የጓደኝነት ጥቅሶች (Friendship)
    { id: 41, category: "friendship", amText: "እውነተኛ ጓደኛ በቸርነት ጊዜ ይታወቃል።", enText: "A true friend is known in times of need.", author: "ማህበረሰብ" },
    { id: 42, category: "friendship", amText: "ጥሩ ጓደኛ የህይወት አጋር እና መጽናኛ ነው።", enText: "A good friend is a life partner and comfort.", author: "ማህበር" },
    { id: 43, category: "friendship", amText: "ከክፉ ጓደኛ ይልቅ ለውጥን የሚያሳይ ሩቅ ወዳጅ ይሻላል።", enText: "A distant friend who shows change is better than a bad companion.", author: "ምሳሌ" },
    { id: 44, category: "friendship", amText: "ጓደኝነት በመተማመን ላይ የተገነባ ግንብ ነው።", enText: "Friendship is a tower built on trust.", author: "ስነ-ልቦና" },
    { id: 45, category: "friendship", amText: "የእውነተኛ ጓደኛ ምክር እንደ ወርቅ ውድ ነው።", enText: "The advice of a true friend is as precious as gold.", author: "ተሞክሮ" },
    { id: 46, category: "friendship", amText: "ጓደኛ በደስታ ጊዜ የሚሳተፍ በሀዘንም የሚደርስ ነው።", enText: "A friend shares in joy and reaches out in sorrow.", author: "ማህበረሰብ" },
    { id: 47, category: "friendship", amText: "ጥሩ ጓደኛ ልክ እንደ መስታወት ነው፤ እውነትን ያሳያል።", enText: "A good friend is like a mirror; they show the truth.", author: "ጥበብ" },
    { id: 48, category: "friendship", amText: "ጓደኝነት ከሀብት በላይ ዋጋ አለው።", enText: "Friendship is worth more than wealth.", author: "ምሳሌ" },
    { id: 49, category: "friendship", amText: "አብሮ ማደግና መማር የጓደኝነት ውበት ነው።", enText: "Growing and learning together is the beauty of friendship.", author: "ትምህርት" },
    { id: 50, category: "friendship", amText: "ታማኝ ጓደኛ የህይወት ትልቁ ስጦታ ነው።", enText: "A loyal friend is life's greatest gift.", author: "ህይወት" },
    { id: 51, category: "friendship", amText: "ጓደኛ ስህተትን በለስላሳ የሚነቅፍ ነው።", enText: "A friend gently points out mistakes.", author: "ስነ-ምግባር" },
    { id: 52, category: "friendship", amText: "በችግር ጊዜ የሚጸና ወዳጅ ከወንድም ይበልጣል።", enText: "A friend who stands firm in trouble is better than a brother.", author: "ምሳሌ" },
    { id: 53, category: "friendship", amText: "የጋራ እሴት ያላቸው ጓደኛሞች ረጅም ጉዞ ይጓዛሉ።", enText: "Friends with shared values travel a long journey.", author: "ተሞክሮ" },
    { id: 54, category: "friendship", amText: "መልካም ጓደኝነት ወደ ስኬት ይመራል።", enText: "Good friendship leads to success.", author: "ስኬት" },
    { id: 55, category: "friendship", amText: "ጓደኛን መምረጥ ህይወትን መምረጥ ነው።", enText: "Choosing a friend is choosing a life path.", author: "ጥበብ" },
    { id: 56, category: "friendship", amText: "በቅንነት የተሳሰረ ወዳጅነት ፈጽሞ አይሰበርም።", enText: "Friendship bound by sincerity never breaks.", author: "ህብረት" },
    { id: 57, category: "friendship", amText: "ጓደኛ የሌለው ሰው እንደ ገዳም ነው (ብቸኛ ነው)።", enText: "A person without friends is like a desert.", author: "ባህላዊ አባባል" },
    { id: 58, category: "friendship", amText: "የልጅነት ጓደኝነት የዘላለም ትዝታ ነው።", enText: "Childhood friendship is an eternal memory.", author: "ትዝታ" },
    { id: 59, category: "friendship", amText: "አብሮ መብላትና መጠጣት ብቻ ሳይሆን አብሮ መቆም ጓደኝነት ነው።", enText: "Friendship is not just eating and drinking together, but standing together.", author: "ማህበር" },
    { id: 60, category: "friendship", amText: "እውነተኛ ወዳጅ የነፍስ ጓደኛ ነው።", enText: "A true friend is a soul companion.", author: "ፍልስፍና" },

    // 4. የቤተሰብ ጥቅሶች (Family)
    { id: 61, category: "family", amText: "ሰላም የሌለው ቤት ልብ የለውም።", enText: "A home without peace has no heart.", author: "ባህል" },
    { id: 62, category: "family", amText: "ቤተሰብ የህይወት መጀመሪያ እና የፍቅር መጠለያ ነው።", enText: "Family is the beginning of life and a shelter of love.", author: "ማህበራዊ እሴት" },
    { id: 63, category: "family", amText: "የወላጅ ምርቃት ከሀብት በላይ ውድ ነው።", enText: "Parental blessing is more precious than wealth.", author: "ምሳሌ" },
    { id: 64, category: "family", amText: "በቤተሰብ መካከል ያለው መተሳሰብ የሰላም መሰረት ነው።", enText: "Family harmony is the foundation of peace.", author: "ህብረተሰብ" },
    { id: 65, category: "family", amText: "ለቤተሰብ ጊዜ መስጠት የደስታ ምስጢር ነው።", enText: "Giving time to family is the secret of happiness.", author: "ጥበብ" },
    { id: 66, category: "family", amText: "እናት የቤት ማዕዘን ናት።", enText: "A mother is the cornerstone of the home.", author: "ባህል" },
    { id: 67, category: "family", amText: "አባት የቤቱ ጸጥታና ብርታት ነው።", enText: "A father is the peace and strength of the home.", author: "ባህል" },
    { id: 68, category: "family", amText: "የወንድማማች ፍቅር እንደ ግንብ የጸና ነው።", enText: "Brotherly love is as firm as a wall.", author: "ምሳሌ" },
    { id: 69, category: "family", amText: "የልጅሳቅ የቤት ውስጥ ብርሃን ነው።", enText: "A child's laughter is the light of the home.", author: "ህይወት" },
    { id: 70, category: "family", amText: "ቤተሰብ ፈተናዎችን በጋራ የሚያልፍ ኃይል ነው።", enText: "Family is the power to overcome challenges together.", author: "ተሞክሮ" },
    { id: 71, category: "family", amText: "መልካም አስተዳደግ ከቤተሰብ ይጀምራል።", enText: "Good upbringing starts from the family.", author: "ስነ-ምግባር" },
    { id: 72, category: "family", amText: "የቤተሰብ አንድነት ማህበራዊ መሰረት ነው።", enText: "Family unity is the social foundation.", author: "ሶሺዮሎጂ" },
    { id: 73, category: "family", amText: "ለቤተሰብ መታዘዝ የክብር መገኛ ነው።", enText: "Obedience to family is the source of honor.", author: "ባህል" },
    { id: 74, category: "family", amText: "የቤቱ ሰው የችግር ጊዜ መታመኛ ነው።", enText: "Family is the reliance in times of trouble.", author: "ማህበረሰብ" },
    { id: 75, category: "family", amText: "ፍቅር የሞላበት ቤት ገነት ነው።", enText: "A home full of love is paradise.", author: "ፍልስፍና" },
    { id: 76, category: "family", amText: "ወላጆችን ማክበር የረጅም ዕድሜ ጸጋ ነው።", enText: "Honoring parents is the grace of long life.", author: "ጥበብ" },
    { id: 77, category: "family", amText: "የቤተሰብ መግባባት የልጆች የወደፊት ስኬት ነው።", enText: "Family understanding is children's future success.", author: "ስነ-ልቦና" },
    { id: 78, category: "family", amText: "እህትማማችነት የፍቅርና የትብብር ማሳያ ነው።", enText: "Sisterhood is a display of love and cooperation.", author: "ህብረት" },
    { id: 79, category: "family", amText: "በቤተሰብ ውስጥ ያለው መተባበር ትላልቅ ተራሮችን ያንቀሳቅሳል።", enText: "Cooperation within the family moves mountains.", author: "ምሳሌ" },
    { id: 80, category: "family", amText: "የቤተሰብ ፍቅር ጊዜ የማይሽረው ሀብት ነው።", enText: "Family love is a timeless wealth.", author: "ህይወት" },

    // 5. የተነሳሽነት እና የድፍረት ጥቅሶች (Motivation)
    { id: 81, category: "motivation", amText: "ትዕግስት የሁሉም ስኬት መሠረት ናት።", enText: "Patience is the foundation of all success.", author: "ጥንታዊ አባባል" },
    { id: 82, category: "motivation", amText: "በራስ መተማመን ለስኬት የመጀመሪያው ጀማሪ ነው።", enText: "Self-confidence is the first step to success.", author: "ስነ-ልቦና" },
    { id: 83, category: "motivation", amText: "ማመን ማለት ከግማሽ በላይ ማሸነፍ ነው።", enText: "Believing is more than half the victory.", author: "ተነሳሽነት" },
    { id: 84, category: "motivation", amText: "ተስፋ አለመቁረጥ የድል መጀመሪያ ነው።", enText: "Never giving up is the beginning of victory.", author: "ጀግንነት" },
    { id: 85, category: "motivation", amText: "ድፍረት የፍርሃት አለመኖር ሳይሆን ድል መንሳት ነው።", enText: "Courage is not the absence of fear, but conquering it.", author: "ፍልስፍና" },
    { id: 86, category: "motivation", amText: "ትልቅ ህልም አለህ? ጠንክረህ ሰራለት።", enText: "Do you have a big dream? Work hard for it.", author: "ተነሳሽነት" },
    { id: 87, category: "motivation", amText: "ብሩህ አመለካከት በጨለማ ውስጥ ብርሃን ያያል።", enText: "An optimistic attitude sees light in the darkness.", author: "ተነሳሽነት" },
    { id: 88, category: "motivation", amText: "ጽናት የድል አክሊል ነው።", enText: "Perseverance is the crown of victory.", author: "ታሪክ" },
    { id: 89, category: "motivation", amText: "ዛሬ የጀመርከው ትንሽ እርምጃ ነገ ትልቅ ለውጥ ያመጣል።", enText: "The small step you started today brings big change tomorrow.", author: "ስኬት" },
    { id: 90, category: "motivation", amText: "ውድቀት ከስኬት በፊት ያለው ትምህርት ቤት ነው።", enText: "Failure is the school before success.", author: "ጥበብ" },
    { id: 91, category: "motivation", amText: "አእምሮህን በድል ሀሳብ ሙላው።", enText: "Fill your mind with thoughts of victory.", author: "ስነ-ልቦና" },
    { id: 92, category: "motivation", amText: "ፈተናዎች ጠንካራ እንድንሆን ያደርጉናል።", enText: "Challenges make us stronger.", author: "ተሞክሮ" },
    { id: 93, category: "motivation", amText: "የራስህን ታሪክ ዛሬውኑ ጻፈው።", enText: "Write your own story starting today.", author: "ተነሳሽነት" },
    { id: 94, category: "motivation", amText: "እያንዳንዱ ቀን አዲስ ጀማሪ ሊሆን ይችላል።", enText: "Every day can be a new beginning.", author: "ህይወት" },
    { id: 95, category: "motivation", amText: "ዓላማ ያለው ሰው ማቆሚያ አያውቅም።", enText: "A person with a purpose knows no stop.", author: "ፍልስፍና" },
    { id: 96, category: "motivation", amText: "ለስኬት አቋራጭ መንገድ የለም፤ ትጋት ብቻ ነው።", enText: "There is no shortcut to success; only diligence.", author: "ስኬት" },
    { id: 97, category: "motivation", amText: "በራስህ እመን፤ ዓለምም በአንተ ታምናለች።", enText: "Believe in yourself; the world will believe in you too.", author: "ተነሳሽነት" },
    { id: 98, category: "motivation", amText: "ትናንትና ማስተካከል አይቻልም፣ ነገ ግን በእጅህ ላይ ነው።", enText: "Yesterday cannot be fixed, but tomorrow is in your hands.", author: "ጥበብ" },
    { id: 99, category: "motivation", amText: "ድል የሚገኘው በታላቅ መስዋዕትነትና ጥረት ነው።", enText: "Victory is found through great sacrifice and effort.", author: "ታሪክ" },
    { id: 100, category: "motivation", amText: "ፈገግታህ የጥንካሬህ መገለጫ ነው።", enText: "Your smile is a reflection of your strength.", author: "ስነ-ልቦና" },

    // 6. የስራ እና የትጋት ጥቅሶች (Work & Diligence)
    { id: 101, category: "work", amText: "ዛሬ የሰራኸው ስራ የነገው ስኬትህ መሠረት ነው።", enText: "The work you do today is the foundation of your success tomorrow.", author: "ዘመናዊ ፍልስፍና" },
    { id: 102, category: "work", amText: "ትጋት የሌለው ተስፋ ፍሬ አይሰጥም።", enText: "Hope without diligence bears no fruit.", author: "ምሳሌያዊ አነጋገር" },
    { id: 103, category: "work", amText: "ጠንክሮ መስራት ፍሬውን በጊዜው ያመጣል።", enText: "Hard work brings its fruit in due time.", author: "ተሞክሮ" },
    { id: 104, category: "work", amText: "ስራን መውደድ የስኬት ቁልፍ ነው።", enText: "Loving one's work is the key to success.", author: "ሙያዊ ስነ-ምግባር" },
    { id: 105, category: "work", amText: "ተግባር ከቃል በላይ ድምጽ አለው።", enText: "Actions speak louder than words.", author: "ዓለም አቀፍ አባባል" },
    { id: 106, category: "work", amText: "አብሮ መስራት ውጤትን እጥፍ ያደርጋል።", enText: "Working together doubles the results.", author: "ንግድ" },
    { id: 107, category: "work", amText: "ትጋት ድህነትን ያርቃል።", enText: "Diligence keeps poverty away.", author: "ምሳሌ" },
    { id: 108, category: "work", amText: "ጠንካራ ስራ የከፍታ መሰላል ነው።", enText: "Hard work is the ladder to heights.", author: "ስኬት" },
    { id: 109, category: "work", amText: "በሙያህ ታማኝ ሁን፤ ውጤቱ ራሱ ይናገራል።", enText: "Be faithful in your profession; the result will speak for itself.", author: "ስነ-ምግባር" },
    { id: 110, category: "work", amText: "ጊዜን አክብሮ መስራት ባለሙያነት ነው።", enText: "Working while respecting time is professionalism.", author: "ሙያ" },
    { id: 111, category: "work", amText: "ውጤታማ ስራ የሚሰራው በትኩረት ነው።", enText: "Effective work is done with focus.", author: "ተሞክሮ" },
    { id: 112, category: "work", amText: "የሰራተኛ እጅ የተባረከ ነው።", enText: "The hand of a worker is blessed.", author: "ምሳሌ" },
    { id: 113, category: "work", amText: "ትናንሽ ስራዎችን በጥራት መስራት ለታላቅ ስኬት ያበቃል።", enText: "Doing small tasks with quality leads to great success.", author: "ጥበብ" },
    { id: 114, category: "work", amText: "ስራ ክብር ነው።", enText: "Work is dignity.", author: "ህብረተሰብ" },
    { id: 115, category: "work", amText: "ፈጠራና ድካም ሲዋሃዱ ድንቅ ስራ ይወጣል።", enText: "When creativity and labor merge, wonderful work emerges.", author: "ቴክኖሎጂ" },
    { id: 116, category: "work", amText: "ለስራ ታማኝ መሆን ለራስ ክብር መስጠት ነው።", enText: "Being loyal to work is respecting oneself.", author: "ስነ-ምግባር" },
    { id: 117, category: "work", amText: "የዕለት ድካም የምሽት ዕረፍት ጣዕም ነው።", enText: "The day's toil is the flavor of evening rest.", author: "ምሳሌ" },
    { id: 118, category: "work", amText: "ትጋት የሌለው ዕውቀት እንደ የደረቀ ዛፍ ነው።", enText: "Knowledge without diligence is like a withered tree.", author: "ፍልስፍና" },
    { id: 119, category: "work", amText: "በጋራ የተሰራ ስራ በውጤቱ ያምራል።", enText: "Work done together is beautiful in its result.", author: "ትብብር" },
    { id: 120, category: "work", amText: "ዛሬ የሚሰራ ስራ ነገ ለሚመጣው ድል መሰረት ነው።", enText: "Work done today is the foundation for tomorrow's victory.", author: "ስኬት" }
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
        message: "Tigist 120+ Categorized Quotes API is running successfully"
    });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});