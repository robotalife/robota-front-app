import CreateBotForm from "../../components/forms/CreateBotForm";
import PageTitle from "../../components/pageStructure/PageTitle";

const NewBot = () => {
  return (
    <>
      <PageTitle title="Add a New Bot" />
      <CreateBotForm />
    </>
  );
};

export default NewBot;
