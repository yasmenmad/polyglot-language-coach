import { useTranslation } from 'react-i18next';
import { useState } from 'react';
import { ArrowLeft, Star, Shield, Clock, MessageSquare, Coffee, Cpu, Info, Utensils } from 'lucide-react';
import { LanguageCode, getLanguageInfo } from '../data/courses';
import Flag from '../components/Flag';

interface CultureProps {
  onBack: () => void;
  lang?: string;
}

interface FactItem {
  title: string;
  text: string;
}

interface HistoryItem {
  date: string;
  title: string;
  text: string;
  color: 'blue' | 'green' | 'purple';
}

interface CultureItem {
  title: string;
  text: string;
}

interface FoodItem {
  name: string;
  desc: string;
}

interface CultureData {
  label: string;
  flag: string;
  subtitle: string;
  facts: FactItem[];
  history: HistoryItem[];
  culture: CultureItem[];
  language: {
    title: string;
    text: string;
    highlight: string;
    highlightDesc: string;
  };
  food: FoodItem[];
  tech: {
    title: string;
    text: string;
  };
}

const CULTURE_DATA_BY_LANG: Record<LanguageCode, CultureData> = {
  zh: {
    label: "China",
    flag: "ZH",
    subtitle: "Explore dynasties, culinary secrets, linguistic trivia, and modern tech",
    facts: [
      { title: "Ice Cream Origin", text: "Ice cream was invented in China around 200 BC when a milk and rice mixture was frozen by packing it into snow." },
      { title: "Giant Pandas", text: "All pandas in the world are on loan from China. If a baby panda is born, it is flown back to expand the gene pool." },
      { title: "The Great Wall", text: "The Great Wall of China is 21,196 kilometers long, and it took over 2,000 years to build various stages of it." },
      { title: "Compass & Printing", text: "China invented the compass, gunpowder, paper-making, and printing, which are known historically as the Four Great Inventions." },
      { title: "Paper Money Origin", text: "China was the first country in the world to use paper money, introduced during the Tang Dynasty in the 7th century." }
    ],
    history: [
      { date: "221 – 206 BC", title: "Qin Dynasty", text: "Unified China for the first time, built the Terracotta Army, and standardized coins and writing scripts.", color: "blue" },
      { date: "206 BC – 220 AD", title: "Han Dynasty", text: "Golden Age of Chinese history. Confucianism became official, and the Silk Road was opened.", color: "green" },
      { date: "618 – 907 AD", title: "Tang Dynasty", text: "A massive cultural expansion. Famous for classical Chinese poetry, woodblock printing, and open global trade.", color: "purple" },
      { date: "1368 – 1644 AD", title: "Ming Dynasty", text: "Built the Forbidden City, finished the majority of the Great Wall, and produced delicate blue-and-white porcelain.", color: "green" }
    ],
    culture: [
      { title: "Lunar New Year", text: "Also known as Spring Festival, it's the biggest annual celebration with family reunions, red envelopes, and fireworks." },
      { title: "Tea Ceremonies", text: "Tea is a way of life. Gongfu tea ceremony concentrates on mindful brewing to respect and honor guests." },
      { title: "Chinese Zodiac", text: "A 12-year cycle represented by animal signs. The year of birth determines traits and compatibility in relationship matching." },
      { title: "Feng Shui", text: "The ancient practice of positioning buildings and objects to optimize the flow of energy (Qi) and bring good luck." }
    ],
    language: {
      title: "Hanzi and Pinyin",
      text: "Chinese characters are logograms, meaning each character represents a word or a meaningful component. Unlike phonetic alphabets, Hanzi indicates meaning directly.",
      highlight: "字",
      highlightDesc: "'Zì' means character. There are over 50,000 recorded characters, but learning just 2,500 will let you read 98% of standard Chinese newspapers!"
    },
    food: [
      { name: "Dim Sum", desc: "Bite-sized tea snacks steamed in bamboo baskets." },
      { name: "Hotpot", desc: "Boiling broth sharing dish featuring meats and greens." },
      { name: "Peking Duck", desc: "Crispy skin roasted delicacy served with pancakes." },
      { name: "Xiaolongbao", desc: "Delicate soup dumplings filled with rich broth." },
      { name: "Jiaozi", desc: "Traditional Chinese dumplings filled with minced meat and vegetables." }
    ],
    tech: {
      title: "Digital China",
      text: "China has become a nearly cashless society. Applications like WeChat Pay and Alipay allow people to buy everything from groceries to high-speed train tickets via QR codes. It is also leading in clean energy transition, producing massive solar arrays."
    }
  },
  es: {
    label: "Spain & Latin America",
    flag: "ES",
    subtitle: "Explore Hispanic festivals, imperial timelines, linguistic roots, and modern innovations",
    facts: [
      { title: "Olive Oil Empire", text: "Spain produces over 40% of the world's olive oil, double the amount of Italy." },
      { title: "Global Tongue", text: "Spanish is the official language in 21 countries and is the world's second-most spoken native language." },
      { title: "Lucky Grapes", text: "A tradition in Spain is to eat 12 grapes at midnight on New Year's Eve for good luck." },
      { title: "The Eiffel Rival", text: "Barcelona originally rejected the Eiffel Tower design, thinking it would be too ugly for the city's architecture." },
      { title: "No Tooth Fairy", text: "In Spanish culture, instead of the Tooth Fairy, a mouse named 'Ratoncito Pérez' collects children's teeth in exchange for small gifts." }
    ],
    history: [
      { date: "1492 AD", title: "Golden Age", text: "Columbus reaches America, and the Spanish empire becomes one of the first global empires.", color: "blue" },
      { date: "1810 – 1826 AD", title: "Independence Wars", text: "Latin American nations rise up against Spanish rule to establish independent republics.", color: "blue" },
      { date: "1936 – 1939", title: "Civil War", text: "A pivotal historical conflict that shaped modern Spanish politics and culture.", color: "green" },
      { date: "1978 – Present", title: "Democratic Transition", text: "Spain returns to democracy, establishing a constitutional monarchy and joining the EU.", color: "purple" }
    ],
    culture: [
      { title: "Flamenco", text: "A passionate art form combining singing, guitar playing, dance, and handclaps, originating in Andalusia." },
      { title: "Siesta", text: "The traditional afternoon rest or nap, designed to avoid the intense midday heat and rest after lunch." },
      { title: "Dia de los Muertos", text: "A beautiful Mexican celebration honoring deceased loved ones with colorful altars, sugar skulls, and marigolds." },
      { title: "La Tomatina", text: "The world's biggest food fight festival held in Buñol, Spain, where participants throw tomatoes at each other." }
    ],
    language: {
      title: "Phonetic Spelling",
      text: "Spanish is highly phonetic, meaning words are written exactly as they are pronounced. It uses the letter 'ñ' which is unique and represents a soft 'n' sound.",
      highlight: "ñ",
      highlightDesc: "The letter eñe. Its tilde mark historically represented a double-n (nn) contraction in medieval Latin manuscripts."
    },
    food: [
      { name: "Paella", desc: "Rice dish cooked with saffron, vegetables, and seafood." },
      { name: "Tapas", desc: "Small savory dishes served with drinks as a social custom." },
      { name: "Tacos", desc: "Hand-sized corn tortillas topped with meats and fresh cilantro." },
      { name: "Churros", desc: "Fried dough pastries dusted in cinnamon and dipped in hot chocolate." },
      { name: "Empanadas", desc: "Baked or fried pastries stuffed with spiced meat, onions, or sweet fruit." }
    ],
    tech: {
      title: "Renewable Energy Leader",
      text: "Spain is one of the world's leading countries in wind and solar power generation, consistently setting records for clean energy capacity. It is also a key hub for high-speed rail engineering, connecting its major cities with bullet-style AVE trains."
    }
  },
  fr: {
    label: "France & Francophonie",
    flag: "FR",
    subtitle: "Explore European arts, revolutionary historical events, culinary heights, and tech hubs",
    facts: [
      { title: "The Eiffel Tower", text: "Built in 1889, it was initially disliked by French intellectuals and was meant to be temporary." },
      { title: "Cheese Abundance", text: "France produces over 1,000 distinct varieties of cheese, from Camembert to Roquefort." },
      { title: "Timezones", text: "Due to its overseas territories, France uses 12 different timezones, more than any other country." },
      { title: "Baguette Law", text: "A French law states that a traditional baguette can only contain four ingredients: flour, water, yeast, and salt." },
      { title: "Eiffel Paint", text: "The Eiffel Tower is repainted by hand every 7 years, requiring 60 tons of paint to prevent rust." }
    ],
    history: [
      { date: "1789 AD", title: "French Revolution", text: "Monarchy was overthrown, giving birth to the Declaration of the Rights of Man.", color: "blue" },
      { date: "1804 – 1815", title: "Napoleonic Era", text: "Napoleon Bonaparte expands French borders and establishes the civil Napoleonic Code.", color: "green" },
      { date: "1940 – 1944 AD", title: "The Resistance", text: "French citizens organize resistance networks against Nazi occupation, culminating in the Liberation of Paris.", color: "green" },
      { date: "1958 – Present", title: "Fifth Republic", text: "Charles de Gaulle introduces the current presidential system.", color: "purple" }
    ],
    culture: [
      { title: "Art de Vivre", text: "The art of living, which emphasizes appreciating fine cuisine, wine, fashion, literature, and art." },
      { title: "La Rentrée", text: "The nationwide return to work and school in September after the August summer holidays." },
      { title: "Café Culture", text: "Parisian cafés serve as social hubs, where writers, artists, and locals spend hours discussing philosophy and art." },
      { title: "Fête de la Musique", text: "A nationwide music festival on the summer solstice where musicians perform for free in streets." }
    ],
    language: {
      title: "L'Accent and Accords",
      text: "French spelling features several accent marks (é, è, ê, ç) which modify pronunciation. Adjectives must agree in gender and number with nouns.",
      highlight: "ç",
      highlightDesc: "La Cédille. It tells the reader to pronounce 'c' as 's' even before vowels like 'a', 'o', and 'u'."
    },
    food: [
      { name: "Croissant", desc: "Buttery, flaky, crescent-shaped puff pastry." },
      { name: "Baguette", desc: "Long, thin loaf of crusty bread eaten daily." },
      { name: "Escargots", desc: "Snails served in a delicious garlic and parsley butter." },
      { name: "Ratatouille", desc: "Stewed vegetable dish featuring zucchini, eggplant, and peppers." },
      { name: "Crêpes", desc: "Thin pancakes served sweet with chocolate, or savory with ham and cheese." }
    ],
    tech: {
      title: "La French Tech",
      text: "France pioneered online services with the Minitel in the 1980s. Today, 'La French Tech' is a booming startup hub in Paris and Lyon, backing AI and green technologies. The French TGV train network is also a hallmark of European high-speed transport."
    }
  },
  de: {
    label: "Germany & Central Europe",
    flag: "DE",
    subtitle: "Explore central European traditions, unifications, linguistic structures, and engineering",
    facts: [
      { title: "Fairytale Castles", text: "Germany has over 20,000 castles, including Neuschwanstein, which inspired Disney." },
      { title: "Autobahn Speed", text: "Around 65% of the German highway network has no federally mandated speed limit." },
      { title: "Bread Variety", text: "German bread culture includes over 3,000 unique styles of bread and bread rolls." },
      { title: "Gummy Bear Origin", text: "The world-famous Haribo Goldbears were invented in Bonn in 1922 by Hans Riegel." },
      { title: "Fanta Origin", text: "Fanta was created in Germany during World War II due to imports restrictions on Coca-Cola syrup." }
    ],
    history: [
      { date: "1848 AD", title: "March Revolution", text: "A series of liberal protests demanding democratic reforms, freedom of the press, and German national unity.", color: "blue" },
      { date: "1871 AD", title: "German Empire", text: "Otto von Bismarck unifies Germany under Prussian leadership.", color: "blue" },
      { date: "1949 – 1989", title: "Divided Nation", text: "Cold War split into East (GDR) and West (FRG) Germany, separated by the Berlin Wall.", color: "green" },
      { date: "1990 AD", title: "Reunification", text: "The Berlin Wall falls, leading to the reunification of modern Germany.", color: "purple" }
    ],
    culture: [
      { title: "Oktoberfest", text: "The world's largest Volksfest, celebrating Bavarian culture, music, traditional dress, and beer." },
      { title: "Feierabend", text: "The German concept of leaving work behind to enjoy leisure time and evening relaxation." },
      { title: "Weihnachtsmärkte", text: "Traditional Christmas markets with wooden booths, hot spiced wine, gingerbread, and handmade ornaments." },
      { title: "Schultüte", text: "A large cone filled with toys, sweets, and school supplies given to children on their first school day." }
    ],
    language: {
      title: "Compound Words & Cases",
      text: "German is famous for compound words where smaller words are joined together. It has three genders and four grammatical cases.",
      highlight: "ß",
      highlightDesc: "Eszett. It represents a double-s sound and is only used after long vowels or diphthongs."
    },
    food: [
      { name: "Bratwurst", desc: "Seasoned grilled pork sausage served with mustard." },
      { name: "Brezel", desc: "Baked twisted pretzel sprinkled with coarse salt." },
      { name: "Black Forest Cake", desc: "Traditional cherry-infused chocolate cake with whipped cream." },
      { name: "Sauerkraut", desc: "Finely cut fermented cabbage with a distinct sour taste." },
      { name: "Schnitzel", desc: "Thinly pounded meat, breaded and pan-fried to golden perfection." }
    ],
    tech: {
      title: "Industrie 4.0",
      text: "Germany is renowned for its high-tech precision manufacturing and automotive engineering, leading the charge in industrial automation, robotic assembly lines, and smart grid infrastructures."
    }
  },
  ja: {
    label: "Japan & Zen Tradition",
    flag: "JA",
    subtitle: "Explore Shinto rituals, samurai history, three writing scripts, and robotics",
    facts: [
      { title: "Vending Machines", text: "Japan has one of the highest densities of vending machines, selling hot canned coffee, umbrellas, and fresh fruit." },
      { title: "Mount Fuji", text: "An active stratovolcano that is sacred in Shinto and Buddhism, standing as Japan's tallest peak." },
      { title: "Punctual Trains", text: "The average delay of a Japanese bullet train (Shinkansen) is less than 36 seconds." },
      { title: "Blue Traffic Lights", text: "Due to historical linguistic overlaps, Japan uses a very blue shade of green for its traffic lights." },
      { title: "Melon Luxury", text: "High-quality melons are gifted as luxury items in Japan, with perfect cantaloupes sometimes auctioning for thousands." }
    ],
    history: [
      { date: "794 – 1185 AD", title: "Heian Period", text: "Classical golden age of literature, art, and poetry (e.g., The Tale of Genji).", color: "blue" },
      { date: "1603 – 1867", title: "Edo Period", text: "A peaceful era under the Tokugawa Shogunate with isolationist foreign policies.", color: "green" },
      { date: "1868 – 1912", title: "Meiji Restoration", text: "Japan modernizes rapidly, opening its borders and embracing Western technologies.", color: "purple" },
      { date: "1945 – 1952 AD", title: "Post-War Recovery", text: "A period of reconstruction that laid the foundations for Japan's high-tech economic miracle.", color: "purple" }
    ],
    culture: [
      { title: "Tea Ceremony", text: "The ritual preparation and consumption of matcha, emphasizing harmony, respect, and tranquility." },
      { title: "Hanami", text: "The traditional custom of enjoying the transient beauty of cherry blossoms in spring." },
      { title: "Matsuri", text: "Traditional festivals held by local shrines, featuring colorful parades, food stalls, and dancing." },
      { title: "Kintsugi", text: "The art of repairing broken pottery with lacquer dusted or mixed with powdered gold." }
    ],
    language: {
      title: "Three Writing Systems",
      text: "Japanese uses Hiragana (phonetic), Katakana (foreign loanwords), and Kanji (characters). It incorporates honorifics (keigo) to show respect.",
      highlight: "の",
      highlightDesc: "Hiragana 'no'. It is the possessive particle used to connect nouns, similar to 's in English."
    },
    food: [
      { name: "Sushi", desc: "Vinegared rice served with raw seafood and soy sauce." },
      { name: "Ramen", desc: "Wheat noodles served in rich meat or fish broth." },
      { name: "Dango", desc: "Sweet skewered rice dumplings glazed with sweet soy sauce." },
      { name: "Tempura", desc: "Lightly battered and deep-fried seafood and vegetables." },
      { name: "Takoyaki", desc: "Savory ball-shaped snacks made of wheat batter filled with octopus." }
    ],
    tech: {
      title: "Robotics & Shinkansen",
      text: "Japan is a global leader in humanoid robotics, bullet train transit grids, and state-of-the-art interactive gaming. It pioneers consumer electronics and smart city initiatives."
    }
  },
  ko: {
    label: "Korea & Hallyu Wave",
    flag: "KO",
    subtitle: "Explore dynasty cultures, scientific alphabets, culinary arts, and K-Tech",
    facts: [
      { title: "Age Reckoning", text: "Historically, Koreans were born at 1 year old, including gestation time (though legally changing now)." },
      { title: "Kimchi Love", text: "The average Korean eats about 40 pounds of Kimchi annually, using it in soups, stews, and side dishes." },
      { title: "High-Speed Net", text: "South Korea consistently ranks at the top for global internet connection speed and mobile network connectivity." },
      { title: "Metal Movable Type", text: "Koreans invented metal movable type printing in the 13th century, predating Gutenberg by over 70 years." },
      { title: "Hangul Day", text: "South Korea celebrates Hangul Day on October 9th to honor the invention and proclamation of the native alphabet." }
    ],
    history: [
      { date: "918 – 1392 AD", title: "Goryeo Dynasty", text: "The dynasty that gave Korea its English name, famous for celadon pottery and metal movable type.", color: "blue" },
      { date: "1392 – 1910", title: "Joseon Dynasty", text: "Longest-running dynasty. Han-geul was invented, and Confucian ideals became deeply embedded.", color: "green" },
      { date: "1950 – 1953", title: "Korean War", text: "Led to the division of the peninsula into North and South Korea along the DMZ.", color: "purple" },
      { date: "1392 AD", title: "Founding of Joseon", text: "General Yi Seong-gye establishes the Joseon Dynasty, beginning a golden era of literature and science.", color: "blue" }
    ],
    culture: [
      { title: "Norebang", text: "Korean singing rooms where friends rent private booths to sing karaoke and eat snacks." },
      { title: "Chuseok", text: "The autumn harvest festival, where families gather to pay respects to ancestors and eat songpyeon." },
      { title: "Hallyu Wave", text: "The global spread of South Korean pop culture, spanning K-pop music, K-dramas, and cinema." },
      { title: "Hanbok", text: "The traditional Korean dress characterized by vibrant colors and simple lines, worn during holidays." }
    ],
    language: {
      title: "Hangul Alphabet",
      text: "Hangul was created by King Sejong in 1443. The characters are grouped into syllable blocks, designed to mirror the shape of the mouth when speaking.",
      highlight: "한",
      highlightDesc: "Han. Written in Hangul, it combines 'h', 'a', and 'n' elements to mean Korean or great."
    },
    food: [
      { name: "Bibimbap", desc: "Warm rice topped with seasoned vegetables and chili paste." },
      { name: "Bulgogi", desc: "Thinly sliced marinated grilled beef with sesame." },
      { name: "K-Fried Chicken", desc: "Ultra-crispy double-fried chicken glazed with sweet glaze." },
      { name: "Kimchi Jjigae", desc: "Rich stew cooked with fermented kimchi, tofu, and pork." },
      { name: "Tteokbokki", desc: "Chewy cylindrical rice cakes simmered in a spicy, sweet gochujang chili sauce." }
    ],
    tech: {
      title: "Smart Cities & Chips",
      text: "South Korea is home to tech giants like Samsung and LG, pioneering smart cities, semiconductor manufacturing, and state-of-the-art display technologies."
    }
  },
  it: {
    label: "Italy & Renaissance",
    flag: "IT",
    subtitle: "Explore ancient empires, artistic renaissances, coffee habits, and design engineering",
    facts: [
      { title: "Active Volcanoes", text: "Italy has three active volcanoes: Etna, Stromboli, and Vesuvius." },
      { title: "Espresso Customs", text: "Italians never drink milk-heavy coffees like Cappuccino after 11:00 AM." },
      { title: "Heritage Capital", text: "Italy has the highest number of UNESCO World Heritage sites in the world (58)." },
      { title: "University of Bologna", text: "Founded in 1088, it is the oldest continuously operating university in the Western world." },
      { title: "Tipping Custom", text: "Tipping is not customary in Italy. Instead, restaurants add a small 'coperto' (cover charge) to the bill." }
    ],
    history: [
      { date: "753 BC – 476 AD", title: "Roman Empire", text: "The foundational empire of Western civilization, law, architecture, and engineering.", color: "blue" },
      { date: "14th – 17th Century", title: "The Renaissance", text: "A massive cultural rebirth in art, science, and literature, led by Da Vinci and Michelangelo.", color: "green" },
      { date: "1861 AD", title: "Risorgimento", text: "The consolidation of various states into the single Kingdom of Italy.", color: "purple" },
      { date: "1946 AD", title: "Birth of Republic", text: "Italians vote in a referendum to abolish the monarchy, establishing the modern Italian Republic.", color: "purple" }
    ],
    culture: [
      { title: "La Passeggiata", text: "The slow, social evening stroll taken through the town center to see and be seen by neighbors." },
      { title: "Opera", text: "Born in Italy in the late 16th century, defining dramatic classical vocal performances." },
      { title: "Venice Carnival", text: "A world-famous festival held in Venice, known for its intricate porcelain masks." },
      { title: "Ferragosto", text: "A major public holiday on August 15th, marking the start of summer vacation where locals head to beaches." }
    ],
    language: {
      title: "Vowels and Melodies",
      text: "Italian has 7 vowel sounds and is famously melodic. Almost all words end in a vowel, making it musical and rhyming.",
      highlight: "ch",
      highlightDesc: "Pronounced as 'k' (hard sound). In Italian, 'c' before 'h' becomes hard, unlike English."
    },
    food: [
      { name: "Pizza Margherita", desc: "Simple pizza topped with tomatoes, mozzarella, and fresh basil." },
      { name: "Carbonara", desc: "Pasta cooked with egg yolk, pecorino cheese, and crispy guanciale." },
      { name: "Gelato", desc: "Premium dense Italian ice cream churned with less air." },
      { name: "Lasagna", desc: "Layered flat pasta baked with ragù, béchamel, and cheese." },
      { name: "Tiramisu", desc: "Coffee-flavored dessert made of ladyfingers layered with whipped mascarpone." }
    ],
    tech: {
      title: "Supercars & Design",
      text: "Italy leads in high-end automotive design (Ferrari, Lamborghini) and industrial fashion design technology. It is also expanding in aerospace engineering."
    }
  },
  en: {
    label: "English & Anglosphere",
    flag: "EN",
    subtitle: "Explore global industrial eras, democratic frameworks, and modern web tech",
    facts: [
      { title: "Tea Trade", text: "Although famous in Britain, English tea actually originated as a Portuguese import via Catherine of Braganza." },
      { title: "Statue of Liberty", text: "A gift from France to the US in 1886, representing freedom and democracy." },
      { title: "Global Tongue", text: "English is the official language of aviation, maritime communications, and international science." },
      { title: "Shakespeare's Words", text: "William Shakespeare is credited with inventing over 1,700 words in the English language." },
      { title: "Postage Stamps", text: "Great Britain was the first country to issue postage stamps, and is the only nation exempt from putting its name on them." }
    ],
    history: [
      { date: "1215 AD", title: "Magna Carta", text: "Signed in England, limiting the power of the king and laying the foundation for modern democracy.", color: "blue" },
      { date: "1776 AD", title: "Independence Day", text: "The American colonies break away from Great Britain, founding the United States.", color: "green" },
      { date: "18th – 19th Century", title: "Industrial Era", text: "Started in Britain, shifting agrarian economies to manufacturing and mechanical power.", color: "purple" },
      { date: "1940 AD", title: "The Blitz", text: "The Battle of Britain and aerial bombardments test British resolve, fostering the 'Keep Calm' spirit.", color: "green" }
    ],
    culture: [
      { title: "Cinema & Hollywood", text: "The global dominance of English-language cinema, music, television, and literature." },
      { title: "Tea & Diner Culture", text: "Traditions ranging from high tea to cozy late-night American diners." },
      { title: "Pub Culture", text: "The local pub serves as a community gathering place for social drinks and trivia nights." },
      { title: "Thanksgiving", text: "A harvest festival in North America celebrating gratitude, family, and roasted turkey dinners." }
    ],
    language: {
      title: "Varied Origins",
      text: "English is a Germanic language heavily influenced by French and Latin. It is famous for irregular spelling rules due to its varied roots.",
      highlight: "the",
      highlightDesc: "The definite article. It is the most frequently used word in the English language."
    },
    food: [
      { name: "Fish & Chips", desc: "Deep-fried battered fish served with thick-cut chips." },
      { name: "Hamburger", desc: "Classic beef patty inside a sliced bun with fresh dressings." },
      { name: "Apple Pie", desc: "Traditional sweet baked fruit pie covered with flaky pastry." },
      { name: "Roast Beef", desc: "Roasted beef joint served with Yorkshire pudding and gravy." },
      { name: "Shepherd's Pie", desc: "Savory dish of minced lamb topped with a thick, golden layer of mashed potatoes." }
    ],
    tech: {
      title: "Silicon Valley",
      text: "The birthplace of the modern internet, personal computing, social networks, and artificial intelligence models. It represents the frontier of global software development."
    }
  },
  ar: {
    label: "Arab World",
    flag: "AR",
    subtitle: "Explore Islamic golden ages, desert architecture, mathematical roots, and future cities",
    facts: [
      { title: "Arabic Numerals", text: "The modern numeral system (0, 1, 2, 3...) was developed by Arab mathematicians like Al-Khwarizmi." },
      { title: "Coffee Discovery", text: "Coffee drinking was pioneered in Yemen in the 15th century, spreading across the Ottoman empire." },
      { title: "Windcatchers", text: "Ancient windcatchers (Barjeel) acted as natural air conditioning in hot arid zones." },
      { title: "Library of Alexandria", text: "Founded in Egypt, it was once the largest and most significant library of the ancient world." },
      { title: "Sahara Forest", text: "The Sahara Desert was once a lush, green savanna with rivers and lakes, populated by wildlife." }
    ],
    history: [
      { date: "750 – 1258 AD", title: "Islamic Golden Age", text: "A period of massive scientific advancement, algebra, medicine, and philosophy centered in Baghdad.", color: "blue" },
      { date: "15th – 20th Century", title: "Ottoman Rule", text: "Shared cultural and trade roots across North Africa, Levant, and the Arabian Peninsula.", color: "green" },
      { date: "1916 AD", title: "Great Arab Revolt", text: "Arabs rise against Ottoman rule to establish unified independent states across the region.", color: "blue" },
      { date: "1970s – Present", title: "Modern Gulf Renaissance", text: "Rapid modernization and urban expansion (e.g. Dubai, Doha) alongside historical preservation.", color: "purple" }
    ],
    culture: [
      { title: "Arab Hospitality", text: "The cultural obligation to welcome guests with Arabic coffee (gahwa), dates, and incense." },
      { title: "Calligraphy (Khatt)", text: "The highly artistic practice of writing Arabic script, treated as a major fine art form." },
      { title: "Souqs", text: "Traditional bustling open-air marketplaces where merchants sell spices, jewelry, and textiles." },
      { title: "Majlis", text: "A traditional gathering place where community members meet to discuss affairs, socialize, and recite poetry." }
    ],
    language: {
      title: "Root System & Abjad",
      text: "Arabic words are built from a 3-letter consonantal root system. It is written from right to left and is an Abjad, where vowels are marked with diacritics.",
      highlight: "ع",
      highlightDesc: "The letter 'Ayn'. It represents a deep voiced pharyngeal sound unique to Semitic languages."
    },
    food: [
      { name: "Shawarma", desc: "Marinated meat roasted on a vertical spit, wrapped in flatbread." },
      { name: "Falafel", desc: "Deep-fried balls made from spiced chickpeas and herbs." },
      { name: "Baklava", desc: "Sweet layered pastry filled with chopped nuts and syrup." },
      { name: "Hummus", desc: "Creamy dip made from mashed chickpeas, tahini, and lemon juice." },
      { name: "Kabsa", desc: "A mixed rice dish popular in the Gulf, cooked with spiced meat, raisins, and almonds." }
    ],
    tech: {
      title: "Future Energy & Megacities",
      text: "The Middle East is investing heavily in futuristic megaprojects (like NEOM), aerospace, large-scale solar arrays, and desalination technologies."
    }
  }
};

export default function Culture({ onBack, lang }: CultureProps) {
  const { t } = useTranslation();

  const activeLang = (lang || 'zh') as LanguageCode;
  const langInfo = getLanguageInfo(activeLang);
  const data = CULTURE_DATA_BY_LANG[activeLang] || CULTURE_DATA_BY_LANG.zh;

  const [activeTab, setActiveTab] = useState<'facts' | 'history' | 'culture' | 'language' | 'food' | 'tech'>('facts');

  return (
    <div className="w-full max-w-[1000px] px-6 py-8 space-y-6 text-left ml-0">
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <button
          onClick={onBack}
          className="w-10 h-10 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex items-center justify-center hover:bg-slate-50 dark:hover:bg-slate-850 active:scale-95 transition-all text-slate-700 dark:text-slate-300"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <div>
          <h1 className="text-2xl font-black text-slate-800 dark:text-white flex items-center gap-2.5">
            <div className="w-8 h-8 flex items-center justify-center rounded-xl overflow-hidden flex-shrink-0">
              <Flag code={activeLang} size={26} />
            </div>
            {data.label} {t('culture_history', 'Culture & History')}
          </h1>
          <p className="text-xs text-slate-400 dark:text-slate-500 font-bold">
            {data.subtitle}
          </p>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex bg-slate-100 dark:bg-slate-900 p-1.5 rounded-3xl gap-1 border border-slate-200/50 dark:border-slate-800 mb-6 overflow-x-auto no-scrollbar">
        {[
          { id: 'facts', label: 'Fun Facts', icon: Star },
          { id: 'history', label: 'History', icon: Clock },
          { id: 'culture', label: 'Culture', icon: Shield },
          { id: 'language', label: 'Language', icon: MessageSquare },
          { id: 'food', label: 'Food', icon: Coffee },
          { id: 'tech', label: 'Modern Era', icon: Cpu }
        ].map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex-1 min-w-[95px] py-2 rounded-2xl font-black text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-1.5 ${
                activeTab === tab.id
                  ? 'bg-white dark:bg-slate-800 text-slate-800 dark:text-white shadow-sm'
                  : 'text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200'
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Tab content area */}
      <div className="space-y-6">
        {activeTab === 'facts' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {data.facts.map((fact, index) => (
              <div key={index} className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-3xl p-6 shadow-sm space-y-2 flex items-start gap-4">
                <div className="w-10 h-10 rounded-2xl bg-brand-blue-bg/40 dark:bg-brand-blue/10 flex items-center justify-center flex-shrink-0 text-brand-blue">
                  <Info className="w-5 h-5" />
                </div>
                <div className="space-y-1">
                  <h3 className="font-extrabold text-sm text-slate-800 dark:text-white">{fact.title}</h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 font-medium leading-relaxed">
                    {fact.text}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'history' && (
          <div className="relative border-l-2 border-slate-200 dark:border-slate-800 pl-6 ml-4 space-y-8">
            {data.history.map((hist, index) => {
              const bgClass = hist.color === 'blue' ? 'bg-brand-blue-bg text-brand-blue' : hist.color === 'green' ? 'bg-brand-green-bg text-brand-green' : 'bg-brand-purple-bg text-brand-purple';
              const dotColor = hist.color === 'blue' ? 'bg-brand-blue' : hist.color === 'green' ? 'bg-brand-green' : 'bg-brand-purple';
              return (
                <div key={index} className="relative">
                  <div className={`absolute -left-[31px] top-1.5 w-4 h-4 rounded-full ${dotColor} border-4 border-white dark:border-slate-950`} />
                  <span className={`text-[10px] font-black uppercase px-2 py-0.5 rounded-md ${bgClass}`}>
                    {hist.date}
                  </span>
                  <h3 className="font-black text-slate-800 dark:text-white mt-1">{hist.title}</h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 font-medium leading-relaxed">
                    {hist.text}
                  </p>
                </div>
              );
            })}
          </div>
        )}

        {activeTab === 'culture' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {data.culture.map((cult, index) => (
              <div key={index} className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-3xl p-6 shadow-sm space-y-2 flex items-start gap-4">
                <div className="w-10 h-10 rounded-2xl bg-brand-purple-bg/40 dark:bg-brand-purple/10 flex items-center justify-center flex-shrink-0 text-brand-purple">
                  <Shield className="w-5 h-5" />
                </div>
                <div className="space-y-1">
                  <h3 className="font-extrabold text-sm text-slate-800 dark:text-white">{cult.title}</h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 font-medium leading-relaxed">
                    {cult.text}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'language' && (
          <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-3xl p-6 shadow-sm space-y-4">
            <h3 className="font-extrabold text-slate-800 dark:text-white flex items-center gap-2">
              <MessageSquare className="w-5 h-5 text-brand-blue" />
              {data.language.title}
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 font-medium leading-relaxed">
              {data.language.text}
            </p>
            <div className="bg-slate-50 dark:bg-slate-850 p-4 rounded-2xl border border-slate-100 dark:border-slate-800 flex gap-4">
              <div className="text-3xl font-black text-brand-blue">{data.language.highlight}</div>
              <div className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                {data.language.highlightDesc}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'food' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            {data.food.map((fd, index) => (
              <div key={index} className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-3xl p-5 text-center shadow-sm space-y-3 flex flex-col items-center">
                <div className="w-10 h-10 rounded-2xl bg-brand-orange/10 flex items-center justify-center flex-shrink-0 text-brand-orange">
                  <Utensils className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-sm text-slate-800 dark:text-white">{fd.name}</h4>
                  <p className="text-[11px] text-slate-400 mt-1">{fd.desc}</p>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'tech' && (
          <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-3xl p-6 shadow-sm space-y-4">
            <h3 className="font-extrabold text-slate-800 dark:text-white flex items-center gap-2">
              <Cpu className="w-5 h-5 text-brand-green" />
              {data.tech.title}
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 font-medium leading-relaxed">
              {data.tech.text}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
