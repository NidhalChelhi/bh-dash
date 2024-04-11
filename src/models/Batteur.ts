interface Batteur {
  _id: string;
  category: "Batteur Mélangeur";
  name: string;
  description: string;
  stock: "available" | "out_of_stock";
  images: string[];
  slug: string;
  model: string;
  cuveCapacity: string;
  puissance: string;
  poids: string;
  alimentation: string;
  vitesse: string;
  dimensions: string;
}

export default Batteur;
