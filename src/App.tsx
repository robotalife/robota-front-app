import { SnackbarProvider } from "notistack";
import RoutingComp from "./routes/RoutingComp";
import { AuthProvider } from "./shared/providers/AuthProvider";
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
        <ExchangeProvider>
          <MyBotsProvider>
            <RoutingComp />
          </MyBotsProvider>
        </ExchangeProvider>
      </AuthProvider>
    </SnackbarProvider>
  );
}

export default App;
