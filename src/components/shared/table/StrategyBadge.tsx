import {ReactNode} from "react";
import {IconArrowDownRight, IconArrowUpRight} from "../../../shared/icons/Icons";
import TextBadge from "../TextBadge";

interface Props {
    strategy: ReactNode;
}

const TableStrategy = ({strategy}: Props) => {
    return (
        <TextBadge variation="secondary">
            {strategy === "LONG" ? (
                <>
                    Long{" "}
                    <IconArrowUpRight
                        style={{marginLeft: 8, height: 5, width: 5}}
                    />
                </>
            ) : (
                <>
                    Short{" "}
                    <IconArrowDownRight
                        style={{marginLeft: 8, height: 5, width: 5}}
                    />
                </>
            )}
        </TextBadge>
    );
};

export default TableStrategy;