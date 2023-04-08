import RoutingComp from "./routes/RoutingComp";
import { AuthProvider } from "./shared/providers/AuthProvider";
import { UserProvider } from "./shared/providers/UserProvider";

function App() {
  return (
    <AuthProvider>
      <UserProvider>
        <RoutingComp />
      </UserProvider>
    </AuthProvider>
  );
}

export default App;
