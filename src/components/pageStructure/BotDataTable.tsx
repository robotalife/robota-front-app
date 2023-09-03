import { Box, Grid, Typography } from "@mui/material";
import { useContext } from "react";

import { BotContext } from "../../shared/providers/BotProvider";
import { IconArrowDownRight, IconArrowUpRight } from "../../shared/icons/Icons";
import getDateTimeString from "../../shared/helpers/getDateTimeString";
import Table from "../shared/table/Table";
import TableBody from "../shared/table/TableBody";
import TableRow from "../shared/table/TableRow";
import TableCell from "../shared/table/TableCell";
import classes from "./BotDataTable.module.scss";
import TextBadge from "../shared/TextBadge";

const BotDataTable = () => {
  const { botData } = useContext(BotContext);

  return (
    <Box>
      <Table>
        <TableBody>
          <TableRow>
            <TableCell>
              <Typography component={"span"}>Name</Typography>
            </TableCell>
            <TableCell sx={{ textAlign: "end" }} className={classes.botBaseInfo}>{botData.name}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>
              <Typography component={"span"}>Pair</Typography>
            </TableCell>
            <TableCell sx={{ textAlign: "end" }} className={classes.botBaseInfo}>{botData.pair}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>
              <Typography component={"span"}>Exchange</Typography>
            </TableCell>
            <TableCell sx={{ textAlign: "end" }} className={classes.botBaseInfo}>
              {botData.exchangeType}
            </TableCell>
          </TableRow>

          <TableRow>
            <TableCell>
              <Typography component={"span"}>Strategy</Typography>
            </TableCell>
            <TableCell sx={{ textAlign: "end" }}>
              {botData.strategy === "LONG" ? (
                <>
                  <TextBadge variation={"primary"}>
                    Long{" "}
                  <IconArrowUpRight
                    style={{ marginLeft: 10, height: 8, width: 8 }}
                  />
                  </TextBadge>
                </>
              ) : (
                <>
                <TextBadge variation={"primary"}>
                  Short{" "}
                  <IconArrowDownRight
                    style={{ marginLeft: 10, height: 8, width: 8 }}
                  />
                </TextBadge>
                </>
              )}
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>
              <Typography component={"span"}>Leverage Value</Typography>
            </TableCell>
            <TableCell sx={{ textAlign: "end" }}>
              <Typography className={classes.values}>
                10X
              </Typography>
              </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>
              <Typography component={"span"}>Margin Type</Typography>
            </TableCell>
            <TableCell sx={{ textAlign: "end" }} className={classes.values}>Cross</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>
              <Typography component={"span"}>Created by</Typography>
            </TableCell>
            <TableCell sx={{ textAlign: "end" }} className={classes.values}>{botData.createdBy}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>
              <Typography component={"span"}>Started at</Typography>
            </TableCell>
            <TableCell sx={{ textAlign: "end" }}>
              <Typography className={classes.values}>
              {getDateTimeString(botData.createdAt)}
              </Typography>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </Box>
  );
};

export default BotDataTable;
