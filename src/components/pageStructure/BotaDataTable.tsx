import { Box, Grid, Typography } from "@mui/material";
import { useContext } from "react";

import { BotContext } from "../../shared/providers/BotProvider";
import { IconArrowDownRight, IconArrowUpRight } from "../../shared/icons/Icons";
import getDateTimeString from "../../shared/helpers/getDateTimeString";
import Table from "../shared/table/Table";
import TableBody from "../shared/table/TableBody";
import TableRow from "../shared/table/TableRow";
import TableCell from "../shared/table/TableCell";

const BotaDataTable = () => {
  const { botData } = useContext(BotContext);

  return (
    <Box>
      <Table>
        <TableBody>
          <TableRow>
            <TableCell>
              <Typography>Name</Typography>
            </TableCell>
            <TableCell sx={{ textAlign: "end" }}>{botData.name}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>
              <Typography>Price</Typography>
            </TableCell>
            <TableCell sx={{ textAlign: "end" }}>{botData.price}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>
              <Typography>Exchange</Typography>
            </TableCell>
            <TableCell sx={{ textAlign: "end" }}>
              {botData.exchangeType}
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>
              <Typography>Pair</Typography>
            </TableCell>
            <TableCell sx={{ textAlign: "end" }}>{botData.pair}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>
              <Typography>Strategy</Typography>
            </TableCell>
            <TableCell sx={{ textAlign: "end" }}>
              {botData.strategy === "LONG" ? (
                <>
                  Long{" "}
                  <IconArrowUpRight
                    style={{ marginLeft: 10, height: 8, width: 8 }}
                  />
                </>
              ) : (
                <>
                  Short{" "}
                  <IconArrowDownRight
                    style={{ marginLeft: 10, height: 8, width: 8 }}
                  />
                </>
              )}
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>
              <Typography>Leverage Value</Typography>
            </TableCell>
            <TableCell sx={{ textAlign: "end" }}>10X</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>
              <Typography>Margin Type</Typography>
            </TableCell>
            <TableCell sx={{ textAlign: "end" }}>Cross</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>
              <Typography>Created by</Typography>
            </TableCell>
            <TableCell sx={{ textAlign: "end" }}>{botData.createdBy}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>
              <Typography>Started at</Typography>
            </TableCell>
            <TableCell sx={{ textAlign: "end" }}>
              {getDateTimeString(botData.createdAt)}
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </Box>
  );
};

export default BotaDataTable;
