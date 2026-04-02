import { QueryProvider } from "./provider/QueryProvider";
import AppRouter from "./router/AppRouter";

function App() {
  return (
    // Here is the QueryClient, All components can use it
    <QueryProvider>
      <main style={{ maxWidth: "600px", margin: "0 auto" }}>
        <AppRouter />
      </main>
    </QueryProvider>
  );
}

export default App;
