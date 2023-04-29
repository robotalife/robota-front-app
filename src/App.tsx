import { SnackbarProvider } from "notistack";
import RoutingComp from "./routes/RoutingComp";
import { AuthProvider } from "./shared/providers/AuthProvider";
import { ExchangeProvider } from "./shared/providers/ExchangeProvider";
import { MyBotsProvider } from "./shared/providers/MyBotsProvider";
import { useEffect } from "react";
import { appVersion } from "./shared/consts";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";

function App() {
  useEffect(() => {
    console.log(appVersion);
  }, []);

  return (
    <LocalizationProvider dateAdapter={AdapterMoment}>
      <SnackbarProvider>
        <AuthProvider>
          <ExchangeProvider>
            <MyBotsProvider>
              <RoutingComp />
            </MyBotsProvider>
          </ExchangeProvider>
        </AuthProvider>
      </SnackbarProvider>
    </LocalizationProvider>
  );
}

export default App;
