import { useParams } from "react-router-dom";
import useAxios from "../../shared/hooks/useAxios";
import { useCallback, useEffect, useState } from "react";
import { AxiosResponse } from "axios";
import apiEndPoints from "../../shared/consts/apiEndpoints";
import { IBotOverview } from "../../shared/interfaces/bots";
import { Grid } from "@mui/material";
import WrapperBox from "../../components/shared/wrapperBox/WrapperBox";
import WrapperBoxSection from "../../components/shared/wrapperBox/WrapperBoxSection";
import BotOverviewCard from "../../components/shared/BotOverviewCard";

const BotOverView = () => {
  const { botId } = useParams();
  const { axios } = useAxios();
  const [overview, setOverview] = useState<IBotOverview>({} as IBotOverview);
  const [loading, setLoading] = useState(true);

  const getOverviewData = useCallback(async () => {
    setLoading(true);

    try {
      const response: AxiosResponse<IBotOverview, any> = await axios.get(
        apiEndPoints.getBotOverview(botId as string)
      );

      const overview = response.data;
      setOverview(overview);
    } catch (error) {
      // Handle error
    } finally {
      setLoading(false);
    }
  }, [setOverview, setLoading]);

  useEffect(() => {
    getOverviewData();
  }, [getOverviewData]);

  return (
    <Grid container spacing={2}>
      <Grid xs item>
        <WrapperBox>
          <WrapperBoxSection>
            <BotOverviewCard
              action={""}
              chart={""}
              content={"+ 18.5%"}
              description={""}
              title={"Total Profit"}
            />
          </WrapperBoxSection>
        </WrapperBox>
      </Grid>
      <Grid xs item>
        <WrapperBox>
          <WrapperBoxSection>
            <BotOverviewCard
              action={""}
              chart={""}
              content={"45%"}
              description={""}
              title={"Winrate"}
            />
          </WrapperBoxSection>
        </WrapperBox>
      </Grid>
      <Grid xs item>
        <WrapperBox>
          <WrapperBoxSection>
            <BotOverviewCard
              action={""}
              chart={""}
              content={"196"}
              description={""}
              title={"Closed Deals"}
            />
          </WrapperBoxSection>
        </WrapperBox>
      </Grid>
    </Grid>
  );
};

export default BotOverView;
