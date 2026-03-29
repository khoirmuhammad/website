import { Link } from "react-router-dom";
import { products } from "../data/product";

export default function Products() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {products.map((p) => (
        <Link
          to={`/products/${p.id}`}
          key={p.id}
          className="bg-white p-4 rounded shadow"
        >
          <div className="h-40 bg-gray-200 flex items-center justify-center">
            {p.image ? (
              <img src={p.image} alt={p.name} />
            ) : (
              <span>No Image</span>
            )}
          </div>
          <h2 className="mt-2 font-bold">{p.name}</h2>
          <p>IDR {p.price}</p>
        </Link>
      ))}
    </div>
  );
}
