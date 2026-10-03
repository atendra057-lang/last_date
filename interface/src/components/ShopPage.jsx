import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft, Search, ShoppingBag, Heart, Star, ArrowUpRight,
  X, ChevronRight, Headphones, Shirt, Home as HomeIcon, Dumbbell,
  Sparkles, BookOpen, Gamepad2, UtensilsCrossed, Baby, PawPrint,
  Laptop, Watch, Play, Eye
} from "lucide-react";

// One featured/sponsored product at the top
const FEATURED_PRODUCT = {
  name: "Sony WH-1000XM5",
  brand: "Sony",
  tagline: "Industry-Leading Noise Cancelling",
  desc: "Exceptional sound quality with Auto NC Optimizer, crystal clear hands-free calling, and 30-hour battery life.",
  price: "$348",
  rating: 4.8,
  reviews: "12.4k",
  colors: ["#1a1a1a", "#C4B5A0", "#3B82F6"],
  img: "https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?w=600&q=80",
};

// Product categories
const CATEGORIES = [
  {
    id: "electronics",
    name: "Electronics",
    subtitle: "Gadgets, phones & accessories",
    icon: Laptop,
    color: "#6366F1",
    img: "https://images.unsplash.com/photo-1498049794561-7780e7231661?w=400&q=80",
    itemCount: "2.4k",
    reels: [
      { id: "e1", thumb: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=300&q=80", views: "124k", user: "techguy" },
      { id: "e2", thumb: "https://images.unsplash.com/photo-1550009158-9ebf69173e03?w=300&q=80", views: "89k", user: "gadgetpro" },
      { id: "e3", thumb: "https://images.unsplash.com/photo-1468495244123-6c6c332eeece?w=300&q=80", views: "201k", user: "unboxer" },
      { id: "e4", thumb: "https://images.unsplash.com/photo-1531297484001-80022131f5a1?w=300&q=80", views: "56k", user: "techreviews" },
      { id: "e5", thumb: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=300&q=80", views: "312k", user: "laptopguru" },
      { id: "e6", thumb: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=300&q=80", views: "78k", user: "applefan" },
      { id: "e7", thumb: "https://images.unsplash.com/photo-1593642702821-c8da6771f0c6?w=300&q=80", views: "145k", user: "pcbuild" },
      { id: "e8", thumb: "https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?w=300&q=80", views: "92k", user: "worksetup" },
      { id: "e9", thumb: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=300&q=80", views: "67k", user: "circuits" },
    ],
  },
  {
    id: "fashion",
    name: "Fashion",
    subtitle: "Clothing, shoes & streetwear",
    icon: Shirt,
    color: "#EC4899",
    img: "https://images.unsplash.com/photo-1445205170230-053b83016050?w=400&q=80",
    itemCount: "5.8k",
    reels: [
      { id: "f1", thumb: "https://images.unsplash.com/photo-1509631179647-0177331693ae?w=300&q=80", views: "340k", user: "styleguru" },
      { id: "f2", thumb: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=300&q=80", views: "189k", user: "ootd_daily" },
      { id: "f3", thumb: "https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=300&q=80", views: "96k", user: "streetwear" },
      { id: "f4", thumb: "https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=300&q=80", views: "421k", user: "fashionweek" },
      { id: "f5", thumb: "https://images.unsplash.com/photo-1495385794356-15371f348c31?w=300&q=80", views: "78k", user: "minimalist" },
      { id: "f6", thumb: "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=300&q=80", views: "253k", user: "shopaholic" },
      { id: "f7", thumb: "https://images.unsplash.com/photo-1529139574466-a303027c1d8b?w=300&q=80", views: "167k", user: "runway" },
      { id: "f8", thumb: "https://images.unsplash.com/photo-1485230895905-ec40ba36b9bc?w=300&q=80", views: "54k", user: "vintage" },
      { id: "f9", thumb: "https://images.unsplash.com/photo-1487222477894-8943e31ef7b2?w=300&q=80", views: "198k", user: "trendsetter" },
    ],
  },
  {
    id: "home",
    name: "Home & Living",
    subtitle: "Decor, furniture & kitchen",
    icon: HomeIcon,
    color: "#F59E0B",
    img: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&q=80",
    itemCount: "3.1k",
    reels: [
      { id: "h1", thumb: "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=300&q=80", views: "112k", user: "homedecor" },
      { id: "h2", thumb: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=300&q=80", views: "87k", user: "interiors" },
      { id: "h3", thumb: "https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?w=300&q=80", views: "234k", user: "cozyliving" },
      { id: "h4", thumb: "https://images.unsplash.com/photo-1615873968403-89e068629265?w=300&q=80", views: "45k", user: "diycraft" },
      { id: "h5", thumb: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=300&q=80", views: "156k", user: "bedroom" },
      { id: "h6", thumb: "https://images.unsplash.com/photo-1556228453-efd6c1ff04f6?w=300&q=80", views: "91k", user: "minimal" },
      { id: "h7", thumb: "https://images.unsplash.com/photo-1540518614846-7eded433c457?w=300&q=80", views: "178k", user: "scandihome" },
      { id: "h8", thumb: "https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?w=300&q=80", views: "67k", user: "sofaworld" },
      { id: "h9", thumb: "https://images.unsplash.com/photo-1507089947368-19c1da9775ae?w=300&q=80", views: "203k", user: "plantmom" },
    ],
  },
  {
    id: "fitness",
    name: "Fitness & Sports",
    subtitle: "Gym gear, activewear & equipment",
    icon: Dumbbell,
    color: "#10B981",
    img: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=400&q=80",
    itemCount: "1.9k",
    reels: [
      { id: "fi1", thumb: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=300&q=80", views: "456k", user: "gymrat" },
      { id: "fi2", thumb: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=300&q=80", views: "123k", user: "yogaflow" },
      { id: "fi3", thumb: "https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?w=300&q=80", views: "89k", user: "crossfit" },
      { id: "fi4", thumb: "https://images.unsplash.com/photo-1549060279-7e168fcee0c2?w=300&q=80", views: "312k", user: "runner" },
      { id: "fi5", thumb: "https://images.unsplash.com/photo-1518611012118-696072aa579a?w=300&q=80", views: "67k", user: "pilates" },
      { id: "fi6", thumb: "https://images.unsplash.com/photo-1576678927484-cc907957088c?w=300&q=80", views: "234k", user: "fitlife" },
      { id: "fi7", thumb: "https://images.unsplash.com/photo-1540497077202-7c8a3999166f?w=300&q=80", views: "178k", user: "boxing" },
      { id: "fi8", thumb: "https://images.unsplash.com/photo-1574680096145-d05b474e2155?w=300&q=80", views: "91k", user: "swimmer" },
      { id: "fi9", thumb: "https://images.unsplash.com/photo-1552674605-db6ffd4facb5?w=300&q=80", views: "145k", user: "outdoor" },
    ],
  },
  {
    id: "beauty",
    name: "Beauty & Care",
    subtitle: "Skincare, makeup & wellness",
    icon: Sparkles,
    color: "#A855F7",
    img: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=400&q=80",
    itemCount: "4.2k",
    reels: [
      { id: "b1", thumb: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=300&q=80", views: "567k", user: "makeupqueen" },
      { id: "b2", thumb: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=300&q=80", views: "234k", user: "skincare" },
      { id: "b3", thumb: "https://images.unsplash.com/photo-1512496015851-a90fb38ba796?w=300&q=80", views: "178k", user: "glowup" },
      { id: "b4", thumb: "https://images.unsplash.com/photo-1596755389378-c31d21fd1273?w=300&q=80", views: "89k", user: "nailart" },
      { id: "b5", thumb: "https://images.unsplash.com/photo-1571781926291-c477ebfd024b?w=300&q=80", views: "345k", user: "hairstyle" },
      { id: "b6", thumb: "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=300&q=80", views: "123k", user: "facemask" },
      { id: "b7", thumb: "https://images.unsplash.com/photo-1516975080664-ed2fc6a32937?w=300&q=80", views: "201k", user: "spa" },
      { id: "b8", thumb: "https://images.unsplash.com/photo-1540555700478-4be289fbec6d?w=300&q=80", views: "78k", user: "wellness" },
      { id: "b9", thumb: "https://images.unsplash.com/photo-1612817288484-6f916006741a?w=300&q=80", views: "156k", user: "serum" },
    ],
  },
  {
    id: "books",
    name: "Books & Stationery",
    subtitle: "Bestsellers, journals & art supplies",
    icon: BookOpen,
    color: "#0EA5E9",
    img: "https://images.unsplash.com/photo-1524578271613-d550eacf6090?w=400&q=80",
    itemCount: "6.3k",
    reels: [
      { id: "bk1", thumb: "https://images.unsplash.com/photo-1512820790803-83ca734da794?w=300&q=80", views: "89k", user: "bookworm" },
      { id: "bk2", thumb: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&q=80", views: "234k", user: "booktok" },
      { id: "bk3", thumb: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=300&q=80", views: "156k", user: "library" },
      { id: "bk4", thumb: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=300&q=80", views: "67k", user: "journal" },
      { id: "bk5", thumb: "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=300&q=80", views: "345k", user: "studygram" },
      { id: "bk6", thumb: "https://images.unsplash.com/photo-1519682337058-a94d519337bc?w=300&q=80", views: "112k", user: "reading" },
      { id: "bk7", thumb: "https://images.unsplash.com/photo-1532012197267-da84d127e765?w=300&q=80", views: "178k", user: "novels" },
      { id: "bk8", thumb: "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?w=300&q=80", views: "91k", user: "shelfie" },
      { id: "bk9", thumb: "https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=300&q=80", views: "203k", user: "artsy" },
    ],
  },
  {
    id: "gaming",
    name: "Gaming",
    subtitle: "Consoles, peripherals & merch",
    icon: Gamepad2,
    color: "#EF4444",
    img: "https://images.unsplash.com/photo-1612287230202-1ff1d85d1bdf?w=400&q=80",
    itemCount: "1.5k",
    reels: [
      { id: "g1", thumb: "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=300&q=80", views: "890k", user: "proplayer" },
      { id: "g2", thumb: "https://images.unsplash.com/photo-1593305841991-05c297ba4575?w=300&q=80", views: "456k", user: "pcgamer" },
      { id: "g3", thumb: "https://images.unsplash.com/photo-1606144042614-b2417e99c4e3?w=300&q=80", views: "234k", user: "console" },
      { id: "g4", thumb: "https://images.unsplash.com/photo-1511512578047-dfb367046420?w=300&q=80", views: "567k", user: "esports" },
      { id: "g5", thumb: "https://images.unsplash.com/photo-1552820728-8b83bb6b2b28?w=300&q=80", views: "123k", user: "retro" },
      { id: "g6", thumb: "https://images.unsplash.com/photo-1600861194942-f883de0dfe96?w=300&q=80", views: "345k", user: "setup" },
      { id: "g7", thumb: "https://images.unsplash.com/photo-1586182987320-4f376d39d787?w=300&q=80", views: "178k", user: "streaming" },
      { id: "g8", thumb: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=300&q=80", views: "91k", user: "nintendofan" },
      { id: "g9", thumb: "https://images.unsplash.com/photo-1625805866449-3589571f1647?w=300&q=80", views: "412k", user: "gamingclips" },
    ],
  },
  {
    id: "food",
    name: "Food & Gourmet",
    subtitle: "Snacks, organic & speciality foods",
    icon: UtensilsCrossed,
    color: "#F97316",
    img: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=400&q=80",
    itemCount: "980",
    reels: [
      { id: "fd1", thumb: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=300&q=80", views: "678k", user: "foodie" },
      { id: "fd2", thumb: "https://images.unsplash.com/photo-1482049016688-2d3e1b311543?w=300&q=80", views: "345k", user: "chef" },
      { id: "fd3", thumb: "https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=300&q=80", views: "234k", user: "baking" },
      { id: "fd4", thumb: "https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=300&q=80", views: "123k", user: "healthy" },
      { id: "fd5", thumb: "https://images.unsplash.com/photo-1476224203421-9ac39bcb3327?w=300&q=80", views: "456k", user: "brunch" },
      { id: "fd6", thumb: "https://images.unsplash.com/photo-1484723091739-30a097e8f929?w=300&q=80", views: "89k", user: "toast" },
      { id: "fd7", thumb: "https://images.unsplash.com/photo-1499028344343-cd173ffc68a9?w=300&q=80", views: "567k", user: "bbq" },
      { id: "fd8", thumb: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=300&q=80", views: "201k", user: "salads" },
      { id: "fd9", thumb: "https://images.unsplash.com/photo-1551024601-bec78aea704b?w=300&q=80", views: "312k", user: "desserts" },
    ],
  },
  {
    id: "kids",
    name: "Kids & Baby",
    subtitle: "Toys, clothing & essentials",
    icon: Baby,
    color: "#38BDF8",
    img: "https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?w=400&q=80",
    itemCount: "2.7k",
    reels: [
      { id: "k1", thumb: "https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=300&q=80", views: "234k", user: "momblog" },
      { id: "k2", thumb: "https://images.unsplash.com/photo-1596461404969-9ae70f2830c1?w=300&q=80", views: "167k", user: "toys" },
      { id: "k3", thumb: "https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?w=300&q=80", views: "89k", user: "kidsfun" },
      { id: "k4", thumb: "https://images.unsplash.com/photo-1472162072942-cd5147eb3902?w=300&q=80", views: "345k", user: "parenting" },
      { id: "k5", thumb: "https://images.unsplash.com/photo-1587654780014-1d643c6e8932?w=300&q=80", views: "56k", user: "newborn" },
      { id: "k6", thumb: "https://images.unsplash.com/photo-1506765515384-028b60a970df?w=300&q=80", views: "178k", user: "playtime" },
      { id: "k7", thumb: "https://images.unsplash.com/photo-1604580864964-0462f5d5b1a8?w=300&q=80", views: "123k", user: "crafts" },
      { id: "k8", thumb: "https://images.unsplash.com/photo-1489710437720-ebb67ec84dd2?w=300&q=80", views: "91k", user: "family" },
      { id: "k9", thumb: "https://images.unsplash.com/photo-1471286174890-9c112ffca5b4?w=300&q=80", views: "201k", user: "lego" },
    ],
  },
  {
    id: "pets",
    name: "Pets",
    subtitle: "Food, toys & accessories",
    icon: PawPrint,
    color: "#84CC16",
    img: "https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=400&q=80",
    itemCount: "1.1k",
    reels: [
      { id: "p1", thumb: "https://images.unsplash.com/photo-1543466835-00a7907e9de1?w=300&q=80", views: "890k", user: "dogsofig" },
      { id: "p2", thumb: "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=300&q=80", views: "567k", user: "catlovers" },
      { id: "p3", thumb: "https://images.unsplash.com/photo-1548199973-03cce0bbc87b?w=300&q=80", views: "345k", user: "puppies" },
      { id: "p4", thumb: "https://images.unsplash.com/photo-1573865526739-10659fec78a5?w=300&q=80", views: "234k", user: "kittens" },
      { id: "p5", thumb: "https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=300&q=80", views: "123k", user: "goldens" },
      { id: "p6", thumb: "https://images.unsplash.com/photo-1425082661507-6af1b166e55a?w=300&q=80", views: "456k", user: "petfood" },
      { id: "p7", thumb: "https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?w=300&q=80", views: "178k", user: "bulldog" },
      { id: "p8", thumb: "https://images.unsplash.com/photo-1574158622682-e40e69881006?w=300&q=80", views: "312k", user: "meow" },
      { id: "p9", thumb: "https://images.unsplash.com/photo-1537151625747-768eb6cf92b2?w=300&q=80", views: "201k", user: "petlife" },
    ],
  },
  {
    id: "audio",
    name: "Audio",
    subtitle: "Headphones, speakers & earbuds",
    icon: Headphones,
    color: "#8B5CF6",
    img: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&q=80",
    itemCount: "870",
    reels: [
      { id: "a1", thumb: "https://images.unsplash.com/photo-1545127398-14699f92334b?w=300&q=80", views: "234k", user: "audiophile" },
      { id: "a2", thumb: "https://images.unsplash.com/photo-1558089687-f282ffcbc126?w=300&q=80", views: "178k", user: "basshead" },
      { id: "a3", thumb: "https://images.unsplash.com/photo-1484704849700-f032a568e944?w=300&q=80", views: "345k", user: "speaker" },
      { id: "a4", thumb: "https://images.unsplash.com/photo-1524678606370-a47ad25cb82a?w=300&q=80", views: "89k", user: "djlife" },
      { id: "a5", thumb: "https://images.unsplash.com/photo-1613040809024-b4ef7ba99bc3?w=300&q=80", views: "567k", user: "earbuds" },
      { id: "a6", thumb: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=300&q=80", views: "123k", user: "studio" },
      { id: "a7", thumb: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&q=80", views: "456k", user: "concert" },
      { id: "a8", thumb: "https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=300&q=80", views: "201k", user: "piano" },
      { id: "a9", thumb: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=300&q=80", views: "312k", user: "vinyl" },
    ],
  },
  {
    id: "watches",
    name: "Watches & Wearables",
    subtitle: "Smartwatches, bands & luxury",
    icon: Watch,
    color: "#14B8A6",
    img: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&q=80",
    itemCount: "640",
    reels: [
      { id: "w1", thumb: "https://images.unsplash.com/photo-1524805444758-089113d48a6d?w=300&q=80", views: "345k", user: "watchfam" },
      { id: "w2", thumb: "https://images.unsplash.com/photo-1434056886845-dac89ez39b7a?w=300&q=80", views: "178k", user: "luxury" },
      { id: "w3", thumb: "https://images.unsplash.com/photo-1522312346375-d1a52e2b99b3?w=300&q=80", views: "234k", user: "timepiece" },
      { id: "w4", thumb: "https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?w=300&q=80", views: "89k", user: "smartwatch" },
      { id: "w5", thumb: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=300&q=80", views: "567k", user: "minimal" },
      { id: "w6", thumb: "https://images.unsplash.com/photo-1542496658-e33a6d0d50f6?w=300&q=80", views: "123k", user: "rolex" },
      { id: "w7", thumb: "https://images.unsplash.com/photo-1547996160-81dfa63595aa?w=300&q=80", views: "456k", user: "wristgame" },
      { id: "w8", thumb: "https://images.unsplash.com/photo-1539874754764-5a96559165b0?w=300&q=80", views: "201k", user: "vintage" },
      { id: "w9", thumb: "https://images.unsplash.com/photo-1533139502658-0198f920d8e8?w=300&q=80", views: "91k", user: "fitness" },
    ],
  },
];

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.05 } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0, transition: { duration: 0.35, ease: "easeOut" } },
};

const reelStagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.04 } },
};

const reelFade = {
  hidden: { opacity: 0, scale: 0.92 },
  show: { opacity: 1, scale: 1, transition: { duration: 0.3, ease: "easeOut" } },
};

/* ═══════════════════════════════════════════════════
   CategoryReelsView — 9:16 reel tile grid
   ═══════════════════════════════════════════════════ */
function CategoryReelsView({ category, onBack }) {
  const Icon = category.icon;

  return (
    <motion.div
      initial={{ opacity: 0, x: 60 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 60 }}
      transition={{ type: "spring", damping: 26, stiffness: 280 }}
      className="absolute inset-0 bg-[#f4f3ef] z-30 flex flex-col"
    >
      {/* Header */}
      <div className="shrink-0 px-4 pt-3 pb-3 flex items-center gap-3">
        <button
          onClick={onBack}
          className="w-9 h-9 rounded-full bg-white/80 backdrop-blur-md border border-slate-200/60 flex items-center justify-center active:scale-90 transition-all shadow-sm"
        >
          <ArrowLeft size={18} className="text-slate-800" />
        </button>
        <div className="flex items-center gap-2 flex-1 min-w-0">
          <div
            className="w-8 h-8 rounded-xl flex items-center justify-center shrink-0"
            style={{ background: category.color + "22" }}
          >
            <Icon size={16} style={{ color: category.color }} />
          </div>
          <div className="min-w-0">
            <h2 className="text-[15px] font-extrabold text-slate-900 truncate">{category.name}</h2>
            <p className="text-[10px] text-slate-500 font-medium">{category.itemCount} items</p>
          </div>
        </div>
      </div>

      {/* Reel Tiles Grid */}
      <motion.div
        className="flex-1 overflow-y-auto scrollbar-none px-3 pb-24"
        variants={reelStagger}
        initial="hidden"
        animate="show"
      >
        <div className="grid grid-cols-3 gap-2">
          {category.reels.map((reel) => (
            <motion.div
              key={reel.id}
              variants={reelFade}
              className="relative rounded-[16px] overflow-hidden bg-slate-200 cursor-pointer active:scale-[0.96] transition-transform group"
              style={{ aspectRatio: "9/16" }}
            >
              {/* Thumbnail */}
              <img
                src={reel.thumb}
                alt=""
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />

              {/* Dark gradient overlay */}
              <div
                className="absolute inset-0 pointer-events-none"
                style={{
                  background:
                    "linear-gradient(to top, rgba(0,0,0,0.65) 0%, rgba(0,0,0,0.1) 40%, transparent 100%)",
                }}
              />

              {/* Play icon center */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                <div className="w-10 h-10 rounded-full bg-white/25 backdrop-blur-md flex items-center justify-center">
                  <Play size={18} className="text-white ml-0.5" fill="white" />
                </div>
              </div>

              {/* Views — bottom left */}
              <div className="absolute bottom-2 left-2 flex items-center gap-1">
                <Play size={10} className="text-white" fill="white" />
                <span className="text-[10px] font-bold text-white drop-shadow-md">
                  {reel.views}
                </span>
              </div>

              {/* Username — bottom right */}
              <div className="absolute bottom-2 right-2">
                <span
                  className="text-[9px] font-semibold text-white/80 drop-shadow-md"
                >
                  @{reel.user}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
}

/* ═══════════════════════════════════════════════════
   ShopPage — main export
   ═══════════════════════════════════════════════════ */
export default function ShopPage({ onBack }) {
  const [liked, setLiked] = useState(false);
  const [searchFocused, setSearchFocused] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);

  return (
    <div className="relative w-full h-full bg-[#f4f3ef] overflow-hidden flex flex-col">
      {/* ── TOP BAR ── */}
      <div className="shrink-0 px-4 pt-3 pb-2 flex items-center gap-3">
        <button
          onClick={onBack}
          className="w-9 h-9 rounded-full bg-white/80 backdrop-blur-md border border-slate-200/60 flex items-center justify-center active:scale-90 transition-all shadow-sm"
        >
          <ArrowLeft size={18} className="text-slate-800" />
        </button>

        {/* Search bar */}
        <div className="flex-1 relative">
          <div
            className={`flex items-center gap-2 px-3.5 py-2 rounded-2xl border transition-all duration-200 ${
              searchFocused
                ? "bg-white border-slate-300 shadow-md"
                : "bg-white/70 backdrop-blur-md border-slate-200/60 shadow-sm"
            }`}
          >
            <Search size={16} className="text-slate-400 shrink-0" />
            <input
              type="text"
              placeholder="Search products..."
              className="flex-1 bg-transparent text-[13px] text-slate-800 placeholder:text-slate-400 outline-none font-medium"
              onFocus={() => setSearchFocused(true)}
              onBlur={() => setSearchFocused(false)}
            />
          </div>
        </div>

        <button className="w-9 h-9 rounded-full bg-white/80 backdrop-blur-md border border-slate-200/60 flex items-center justify-center active:scale-90 transition-all shadow-sm relative">
          <ShoppingBag size={17} className="text-slate-800" />
          <div className="absolute -top-0.5 -right-0.5 w-4 h-4 rounded-full bg-rose-500 flex items-center justify-center">
            <span className="text-[9px] font-bold text-white">3</span>
          </div>
        </button>
      </div>

      {/* ── SCROLLABLE CONTENT ── */}
      <motion.div
        className="flex-1 overflow-y-auto scrollbar-none px-4 pb-24"
        variants={stagger}
        initial="hidden"
        animate="show"
      >
        {/* ── HERO: FEATURED PRODUCT ── */}
        <motion.div
          variants={fadeUp}
          className="relative rounded-[28px] overflow-hidden mb-5 bg-[#e8e6df] border border-white/60 shadow-sm"
          style={{ minHeight: 270 }}
        >
          <div className="flex h-full min-h-[270px]">
            <div className="flex-1 p-5 flex flex-col justify-between z-10">
              <div>
                <span className="inline-flex items-center self-start px-2.5 py-1 rounded-full bg-white/70 backdrop-blur-sm text-[10px] font-bold text-slate-700 shadow-sm border border-white/50 mb-3">
                  🎵 Featured Product
                </span>
                <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1">
                  {FEATURED_PRODUCT.brand}
                </p>
                <h2 className="text-[20px] font-extrabold text-slate-900 leading-tight tracking-tight mb-1.5">
                  {FEATURED_PRODUCT.name}
                </h2>
                <p className="text-[11px] text-slate-500 font-medium leading-snug mb-1 max-w-[170px]">
                  {FEATURED_PRODUCT.tagline}
                </p>
              </div>
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-[18px] font-extrabold text-slate-900">
                    {FEATURED_PRODUCT.price}
                  </span>
                  <div className="flex items-center gap-0.5 px-2 py-0.5 rounded-full bg-amber-50 border border-amber-200">
                    <Star size={10} className="text-amber-500 fill-amber-500" />
                    <span className="text-[10px] font-bold text-amber-700">{FEATURED_PRODUCT.rating}</span>
                  </div>
                </div>
                <button className="inline-flex items-center self-start gap-1.5 px-4 py-2 rounded-full bg-[#d4e157] text-slate-900 font-bold text-[12px] shadow-sm active:scale-95 transition-all border border-[#c5d24e]">
                  Buy Now
                  <ArrowUpRight size={14} strokeWidth={2.5} />
                </button>
              </div>
            </div>
            <div className="w-[45%] relative">
              <img src={FEATURED_PRODUCT.img} alt={FEATURED_PRODUCT.name} className="absolute inset-0 w-full h-full object-cover" />
              <button
                onClick={() => setLiked((l) => !l)}
                className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/70 backdrop-blur-md border border-white/50 flex items-center justify-center shadow-sm active:scale-90 transition-all z-10"
              >
                <Heart size={16} className={liked ? "text-rose-500 fill-rose-500" : "text-slate-600"} strokeWidth={2} />
              </button>
            </div>
          </div>
          <div className="absolute bottom-4 right-[46%] flex gap-1.5 z-10">
            {FEATURED_PRODUCT.colors.map((c, i) => (
              <div key={i} className="w-4 h-4 rounded-full border-2 border-white shadow-sm cursor-pointer active:scale-90 transition-all" style={{ background: c }} />
            ))}
          </div>
        </motion.div>

        {/* ── SECTION HEADER ── */}
        <motion.div variants={fadeUp} className="flex items-center justify-between mb-3">
          <h3 className="text-[15px] font-extrabold text-slate-800 tracking-tight">Browse Categories</h3>
          <span className="text-[11px] font-semibold text-slate-400">{CATEGORIES.length} categories</span>
        </motion.div>

        {/* ── CATEGORY TILES BENTO GRID ── */}
        <div className="grid grid-cols-2 gap-3 mb-4">
          {CATEGORIES.map((cat, i) => {
            const Icon = cat.icon;
            const isWide = i === 0 || i === 5;

            return (
              <motion.div
                key={cat.id}
                variants={fadeUp}
                onClick={() => setSelectedCategory(cat)}
                className={`rounded-[22px] overflow-hidden bg-white/80 backdrop-blur-md border border-white/60 shadow-sm active:scale-[0.97] transition-transform cursor-pointer relative group ${
                  isWide ? "col-span-2" : ""
                }`}
              >
                <div className={`relative ${isWide ? "h-36" : "h-32"}`}>
                  <img src={cat.img} alt={cat.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                  <div
                    className="absolute inset-0"
                    style={{
                      background: isWide
                        ? "linear-gradient(to right, rgba(0,0,0,0.65) 0%, rgba(0,0,0,0.2) 60%, transparent 100%)"
                        : "linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.2) 50%, transparent 100%)",
                    }}
                  />
                  <div
                    className="absolute top-3 left-3 w-8 h-8 rounded-xl flex items-center justify-center backdrop-blur-md border border-white/20 shadow-sm"
                    style={{ background: cat.color + "33" }}
                  >
                    <Icon size={16} style={{ color: cat.color }} strokeWidth={2} />
                  </div>
                  <div className="absolute top-3 right-3 px-2 py-0.5 rounded-full bg-white/20 backdrop-blur-sm border border-white/15">
                    <span className="text-[9px] font-bold text-white">{cat.itemCount} items</span>
                  </div>
                  <div className="absolute bottom-3 right-3 w-7 h-7 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center border border-white/20 group-hover:bg-white/40 transition-all">
                    <ArrowUpRight size={13} className="text-white" strokeWidth={2.5} />
                  </div>
                  <div className={`absolute ${isWide ? "bottom-4 left-4" : "bottom-3 left-3"}`}>
                    <h3
                      className={`font-extrabold text-white leading-tight tracking-tight ${isWide ? "text-[17px]" : "text-[14px]"}`}
                      style={{ textShadow: "0 1px 8px rgba(0,0,0,0.4)" }}
                    >
                      {cat.name}
                    </h3>
                    <p
                      className={`text-white/70 font-medium ${isWide ? "text-[11px]" : "text-[10px]"}`}
                      style={{ textShadow: "0 1px 6px rgba(0,0,0,0.3)" }}
                    >
                      {cat.subtitle}
                    </p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* ── BOTTOM PROMO BANNER ── */}
        <motion.div
          variants={fadeUp}
          className="rounded-[22px] p-4 mb-4 flex items-center gap-4"
          style={{ background: "linear-gradient(135deg, #1e1b4b 0%, #312e81 50%, #4338ca 100%)" }}
        >
          <div className="flex-1">
            <p className="text-[10px] font-bold text-indigo-300 uppercase tracking-widest mb-1">Limited Time</p>
            <h3 className="text-[16px] font-extrabold text-white leading-tight mb-1">Free Shipping Weekend</h3>
            <p className="text-[11px] text-indigo-200/80 font-medium mb-3">On all orders above $50. Use code FREESHIP</p>
            <button className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white text-indigo-900 font-bold text-[11px] active:scale-95 transition-all shadow-sm">
              Shop Now <ChevronRight size={13} strokeWidth={2.5} />
            </button>
          </div>
          <div className="text-[42px] leading-none">🚚</div>
        </motion.div>
      </motion.div>

      {/* ── CATEGORY REELS OVERLAY ── */}
      <AnimatePresence>
        {selectedCategory && (
          <CategoryReelsView
            category={selectedCategory}
            onBack={() => setSelectedCategory(null)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
