import { useContext } from "react";
import { AuthContext } from "../../provider/AuthProvider"; // adjust path

export default function Layout({ children }: { children: React.ReactNode }) {
  const auth = useContext(AuthContext);

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

      <main className="flex-1 p-4">{children}</main>
    </div>
  );
}
