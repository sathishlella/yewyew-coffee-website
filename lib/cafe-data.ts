export type MenuItem = {
  id: string;
  name: string;
  eyebrow: string;
  price: string;
  image?: string;
  video?: string;
  accent: string;
  memory: string;
  quote: string;
  notes: string[];
};

export const heroTextureUrls = [
  "https://images.unsplash.com/photo-1511920170033-f8396924c348?auto=format&fit=crop&w=1600&q=90",
  "https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=1600&q=90",
  "https://images.unsplash.com/photo-1442512595331-e89e73853f31?auto=format&fit=crop&w=1600&q=90",
  "https://images.unsplash.com/photo-1517701604599-bb29b565090c?auto=format&fit=crop&w=1600&q=90",
  "https://images.unsplash.com/photo-1461023058943-07fcbe16d735?auto=format&fit=crop&w=1600&q=90"
];

export const menuItems: MenuItem[] = [
  {
    id: "lagoon-brew",
    name: "Lagoon Brew",
    eyebrow: "Cold Brew Signatures",
    price: "$12.00",
    image: "/images/instagram/Names/Lagoon Brew.jpg",
    accent: "#6ba5c2",
    memory: "Crafted for clarity, brewed for calm. Our Ethiopia single-origin cold brew carries jasmine and juicy blueberry notes, balanced with coconut water’s refreshing sweetness.",
    quote: "A drink that moves with your day - bright, smooth, unforgettable.",
    notes: ["ethiopia origin", "coconut water", "blueberry notes"]
  },
  {
    id: "pistachio-dream",
    name: "Pistachio Dream",
    eyebrow: "Nutty Embrace",
    price: "$14.50",
    image: "/images/instagram/Names/Pistachio Dream.jpg",
    accent: "#a7b889",
    memory: "A bold double shot espresso, silky milk, crowned with a cloud of Creamy Pistachio. A nutty embrace for coffee lovers seeking warmth.",
    quote: "Sometimes, comfort is just a texture.",
    notes: ["double shot", "silky milk", "pistachio cloud"]
  },
  {
    id: "matcha-grapefruit",
    name: "Matcha Grapefruit",
    eyebrow: "Citrus Green Harmony",
    price: "$13.00",
    image: "/images/instagram/Names/Matcha Grapefruit.jpg",
    accent: "#f4a289",
    memory: "A glass of sparkled Citrus Green Harmony with Grapefruit layered in Matcha’s calm. Crafted to refresh, awakes and brings the balance of your day!",
    quote: "Where the bright morning meets the quiet earth.",
    notes: ["uji matcha", "grapefruit zest", "sparkled water"]
  },
  {
    id: "matcha-pink-coral",
    name: "Matcha Pink Coral",
    eyebrow: "Floral Creations",
    price: "$13.50",
    image: "/images/instagram/Names/Matcha Pink Coral.jpg",
    accent: "#e2a9b3",
    memory: "A creamy matcha creation, delicately layered with rose and coconut. Smooth, floral, and intimately refreshing for the afternoon lull.",
    quote: "Beauty you can taste in every single layer.",
    notes: ["creamy matcha", "rose layer", "coconut infusion"]
  },
  {
    id: "croffle-waffle",
    name: "Biscoff Croffle",
    eyebrow: "Baked Rituals",
    price: "$16.00",
    video: "/images/instagram/Names/waffle.mp4",
    accent: "#c78652",
    memory: "The layered crispiness of a croissant, in the shape of a delicious waffle. Our favourite way to have it is topping it with Biscoff!",
    quote: "The best sweetness is the one that crunches before it melts.",
    notes: ["croissant layers", "waffle pressed", "biscoff topping"]
  }
];
