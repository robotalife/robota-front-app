import { PropsWithChildren } from "react";

interface Props extends PropsWithChildren {
  noPadding?: boolean;
}

const WrapperBoxSection = ({ noPadding, children }: Props) => {
  return (
    <div
      className="wrapperBoxSection"
      style={{ padding: !!noPadding ? 0 : 24 }}
    >
      {children}
    </div>
  );
};

export default WrapperBoxSection;
