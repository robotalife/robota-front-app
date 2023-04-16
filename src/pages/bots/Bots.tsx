import { useContext } from "react";
import { MyBotsContext } from "../../shared/providers/MyBotsProvider";
import { Link } from "react-router-dom";
import routes from "../../shared/consts/routes";
import { Grid } from "@mui/material";

const Bots = () => {
  const { botsList } = useContext(MyBotsContext);

  return (
    <div>
      My Bots:
      <Grid container spacing={3}>
        {Array.isArray(botsList) && botsList.length
          ? botsList.map((bot) => (
              <Grid item key={bot.id}>
                <Link to={`${routes.botOverview}/${bot.id}`}>
                  {bot.name}
                  <br />
                </Link>
              </Grid>
            ))
          : "There is no bots for you"}
      </Grid>
    </div>
  );
};

export default Bots;
