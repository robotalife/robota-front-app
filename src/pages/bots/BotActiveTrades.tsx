import WrapperBox from "../../components/shared/wrapperBox/WrapperBox";
import WrapperBoxHeader from "../../components/shared/wrapperBox/WrapperBoxHeader";

const BotActiveTrades = () => {
  return (
    <WrapperBox>
      <WrapperBoxHeader
        title="Active Trades"
        description="Monitor active trades for this bot"
      />
    </WrapperBox>
  );
};

export default BotActiveTrades;
