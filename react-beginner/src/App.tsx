import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./provider/AuthProvider";
import AppRouter from "./router/AppRouter";
import { QueryProvider } from "./provider/QueryProvider";

function App() {
  return (
    <QueryProvider>
      <AuthProvider>
        <BrowserRouter>
          <main style={{ maxWidth: "600px", margin: "0 auto" }}>
            <AppRouter />
          </main>
        </BrowserRouter>
      </AuthProvider>
    </QueryProvider>
  );
}

export default App;
