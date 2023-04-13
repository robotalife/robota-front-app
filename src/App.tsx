import { SnackbarProvider } from "notistack";
import RoutingComp from "./routes/RoutingComp";
import { AuthProvider } from "./shared/providers/AuthProvider";
import { UserProvider } from "./shared/providers/UserProvider";
import { ExchangeProvider } from "./shared/providers/ExchangeProvider";

function App() {
  return (
    <SnackbarProvider>
      <AuthProvider>
        <UserProvider>
          <ExchangeProvider>
            <RoutingComp />
          </ExchangeProvider>
        </UserProvider>
      </AuthProvider>
    </SnackbarProvider>
  );
}

export default App;
