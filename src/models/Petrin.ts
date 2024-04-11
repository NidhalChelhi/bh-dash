interface Petrin {
  _id: string;
  category: "Pétrin Spirale";
  name: string;
  description: string;
  stock: "available" | "out_of_stock";
  images: string[];
  slug: string;
  model: string;
  farineCapacity: string;
  patteCapacity: string;
  volume: string;
  puissance: string;
  poids: string;
  dimensions: string;
}

export default Petrin;
