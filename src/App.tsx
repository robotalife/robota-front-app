import RoutingComp from "./routes/RoutingComp";
import { AuthProvider } from "./shared/providers/AuthProvider";

function App() {
  return (
    <AuthProvider>
      <RoutingComp />
    </AuthProvider>
  );
}

export default App;
