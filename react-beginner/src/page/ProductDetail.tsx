import { useParams } from "react-router-dom";
import { products } from "../data/product";

export default function ProductDetail() {
  const { id } = useParams();
  const product = products.find((p) => p.id === id);

  if (!product) return <h1>Product not found</h1>;

  return (
    <div>
      <h1 className="text-xl font-bold">{product.name}</h1>
      <p>IDR {product.price}</p>
    </div>
  );
}
