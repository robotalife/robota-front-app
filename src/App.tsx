import { SnackbarProvider } from "notistack";
import RoutingComp from "./routes/RoutingComp";
import { AuthProvider } from "./shared/providers/AuthProvider";
import { ExchangeProvider } from "./shared/providers/ExchangeProvider";
import { MyBotsProvider } from "./shared/providers/MyBotsProvider";
import { useEffect } from "react";
import { appVersion } from "./shared/consts";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import { StoreBotsProvider } from "./shared/providers/StoreBotsProvider";

function App() {
  useEffect(() => {
    console.log(appVersion);
  }, []);

  return (
    <LocalizationProvider dateAdapter={AdapterMoment}>
      <SnackbarProvider>
        <AuthProvider>
          <ExchangeProvider>
            <StoreBotsProvider>
              <MyBotsProvider>
                <RoutingComp />
              </MyBotsProvider>
            </StoreBotsProvider>
          </ExchangeProvider>
        </AuthProvider>
      </SnackbarProvider>
    </LocalizationProvider>
  );
}

export default App;
