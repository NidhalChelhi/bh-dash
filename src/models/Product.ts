interface Product {
  _id: string;
  category: "Mixeurs" | "Mélangeurs";
  name: string;
  description: string;
  stock: "available" | "out_of_stock" | "coming_soon";
  images: string[];
  slug: string;
}

export default Product;
