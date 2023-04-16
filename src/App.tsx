import { SnackbarProvider } from "notistack";
import RoutingComp from "./routes/RoutingComp";
import { AuthProvider } from "./shared/providers/AuthProvider";
import { UserProvider } from "./shared/providers/UserProvider";
import { ExchangeProvider } from "./shared/providers/ExchangeProvider";
import { MyBotsProvider } from "./shared/providers/MyBotsProvider";
import { useEffect } from "react";
import { appVersion } from "./shared/consts";

function App() {
  useEffect(() => {
    console.log(appVersion);
  }, []);

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
