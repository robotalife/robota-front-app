import { Grid } from "@mui/material";
import FieldsetElement from "../../components/formElements/FieldsetElement";
import TextField from "../../components/formElements/TextField";
import Button from "../../components/formElements/Button";
import { FormEvent, useContext, useState } from "react";
import { AuthContext } from "../../shared/providers/AuthProvider";
import useAxios from "../../shared/hooks/useAxios";
import { AxiosResponse } from "axios";
import apiEndPoints from "../../shared/consts/apiEndpoints";
import useNotify from "../../shared/hooks/useNotify";
import useReturnTo from "../../shared/hooks/useReturnTo";
import { useNavigate, useParams } from "react-router-dom";
import routes from "../../shared/consts/routes";
import ViewArticle from "../../components/pageSpecific/ViewArticle";

const UpdateExchange = () => {
  const { userId } = useContext(AuthContext);
  const { axios } = useAxios();
  const navigate = useNavigate();
  const returnTo = useReturnTo();
  const notify = useNotify();
  const { exchangeType, exchangeId, exchnageLabel } = useParams();

  const [formData, setFormData] = useState<{
    exchangeId: string;
    apiKey: string;
    apiSecret: string;
    exchangeName: string;
    passPhrase?: string | null;
  }>({
    exchangeId: exchangeId || "",
    apiKey: "",
    apiSecret: "",
    exchangeName: exchnageLabel || "",
    passPhrase: "",
  });

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const response: AxiosResponse<any, any> = await axios.patch(
        apiEndPoints.exchange,
        formData
      );

      notify("The exchange added successfully", "info");
      navigate(routes.botsNew);
      // goBack();
    } catch (error) {
      // Handle error
    }
  };

  const goBack = () => {
    navigate(returnTo || routes.exchangeList);
  };

  return (
    <Grid container maxWidth={"xl"}>
      <Grid container columnSpacing={7}>
        <Grid item xs={12} lg={6}>
          <form
            noValidate
            onSubmit={(e) => handleSubmit(e)}
            id="UpdateExchangeForm"
          >
            <FieldsetElement label="Account Label">
              <TextField
                name="name"
                type="text"
                message="Example : John Smitt - Binance account"
                required
                value={formData.exchangeName}
                onChange={(e) =>
                  setFormData({ ...formData, exchangeName: e.target.value })
                }
              />
            </FieldsetElement>
            <FieldsetElement label="API Key">
              <TextField
                name="apiKey"
                type="text"
                required
                value={formData.apiKey}
                onChange={(e) =>
                  setFormData({ ...formData, apiKey: e.target.value })
                }
              />
            </FieldsetElement>
            <FieldsetElement label="Secret Key">
              <TextField
                name="apiSecret"
                type="text"
                required
                value={formData.apiSecret}
                onChange={(e) =>
                  setFormData({ ...formData, apiSecret: e.target.value })
                }
              />
            </FieldsetElement>
            {exchangeType === "KUCOIN" && (
              <FieldsetElement label="Passphrase">
                <TextField
                  name="apiSecret"
                  type="text"
                  required
                  value={formData.passPhrase || ""}
                  onChange={(e) =>
                    setFormData({ ...formData, passPhrase: e.target.value })
                  }
                />
              </FieldsetElement>
            )}
          </form>
        </Grid>
        <Grid item xs={12} lg={6}>
          <ViewArticle
            exchange={exchangeType === "KUCOIN" ? "Kucoin" : "Binance"}
            link={exchangeType === "KUCOIN" ? "/" : "/"}
          />
        </Grid>
        <Grid item xs={12}>
          <Grid container spacing={2}>
            <Grid item xs={6} md={"auto"}>
              <Button
                type="submit"
                variant="contained"
                size="small"
                fullWidth
                form="UpdateExchangeForm"
              >
                Update
              </Button>
            </Grid>
            <Grid item xs={6} md={"auto"}>
              <Button
                type="button"
                variant="outlined"
                size="small"
                fullWidth
                onClick={goBack}
              >
                Back
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default UpdateExchange;
