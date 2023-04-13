import { useNavigate } from "react-router-dom";
import CreateBotForm from "../../components/forms/CreateBotForm";
import PageTitle from "../../components/pageStructure/PageTitle";
import { useContext, useEffect } from "react";
import { ExchangeContext } from "../../shared/providers/ExchangeProvider";
import routes from "../../shared/consts/routes";

const NewBot = () => {
  const navigate = useNavigate();
  const { exchangeList } = useContext(ExchangeContext);

  useEffect(() => {
    if (exchangeList.length === 0) {
      // navigate(routes.exchangeNew);
    }
  }, [exchangeList]);

  return (
    <>
      <PageTitle title="Add a New Bot" />
      <CreateBotForm />
    </>
  );
};

export default NewBot;
