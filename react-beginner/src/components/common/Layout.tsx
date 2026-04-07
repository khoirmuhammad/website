import { useContext } from "react";
import { AuthContext } from "../../provider/AuthProvider"; // adjust path
import { navItems } from "../../config/navigation"; // adjust path
import { NavLink } from "react-router-dom";
import { usePermission } from "../../hooks/auth/usePermission";

export default function Layout({ children }: { children: React.ReactNode }) {
  const auth = useContext(AuthContext);
  const { can } = usePermission();

  if (!auth) return null;

  const handleLogout = async () => {
    try {
      await auth.logout();
    } catch (err) {
      console.error("Logout failed", err);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-gray-800 text-white p-4 flex justify-between items-center">
        <h1 className="text-xl font-bold">My App</h1>
        {auth.isAuthenticated && (
          <button
            onClick={handleLogout}
            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
          >
            Logout
          </button>
        )}
      </header>

      {/* Navigation */}
      <nav className="flex items-center gap-6">
        {navItems
          .filter((item) => can(item.permission))
          .map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `
                  text-sm font-medium transition
                  ${
                    isActive
                      ? "text-blue-600 border-b-2 border-blue-600 pb-1"
                      : "text-gray-600 hover:text-blue-600"
                  }
                `
              }
            >
              {item.label}
            </NavLink>
          ))}
      </nav>

      <main className="flex-1 p-4">{children}</main>
    </div>
  );
}
