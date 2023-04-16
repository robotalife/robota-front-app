import { useContext } from "react";
import { MyBotsContext } from "../../shared/providers/MyBotsProvider";
import { Link } from "react-router-dom";
import routes from "../../shared/consts/routes";

const Bots = () => {
  const { botsList } = useContext(MyBotsContext);

  return (
    <div>
      My Bots:
      <br />
      {Array.isArray(botsList) && botsList.length
        ? botsList.map((bot) => (
            <>
              <Link to={`${routes.botOverview}/${bot.id}`} key={bot.id}>
                {bot.name}
              </Link>
              <br />
            </>
          ))
        : "There is no bots for you"}
    </div>
  );
};

export default Bots;
