import { SnackbarProvider } from "notistack";
import RoutingComp from "./routes/RoutingComp";
import { AuthProvider } from "./shared/providers/AuthProvider";
import { UserProvider } from "./shared/providers/UserProvider";

function App() {
  return (
    <SnackbarProvider>
      <AuthProvider>
        <UserProvider>
          <RoutingComp />
        </UserProvider>
      </AuthProvider>
    </SnackbarProvider>
  );
}

export default App;
