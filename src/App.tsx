import { SnackbarProvider } from "notistack";
import RoutingComp from "./routes/RoutingComp";
import { AuthProvider } from "./shared/providers/AuthProvider";
import { UserProvider } from "./shared/providers/UserProvider";
import { ExchangeProvider } from "./shared/providers/ExchangeProvider";
import { MyBotsProvider } from "./shared/providers/MyBotsProvider";

function App() {
  return (
    <SnackbarProvider>
      <AuthProvider>
        <UserProvider>
          <ExchangeProvider>
            <MyBotsProvider>
              <RoutingComp />
            </MyBotsProvider>
          </ExchangeProvider>
        </UserProvider>
      </AuthProvider>
    </SnackbarProvider>
  );
}

export default App;
