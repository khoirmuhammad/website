import { Link } from "react-router-dom";

export default function Sidebar() {
  return (
    <aside className="w-60 bg-gray-800 text-white p-4 hidden md:block">
      <ul className="space-y-2">
        <li>
          <Link to="/product">Product</Link>
        </li>
        <li>
          <Link to="/customer">Customer</Link>
        </li>
      </ul>
    </aside>
  );
}
