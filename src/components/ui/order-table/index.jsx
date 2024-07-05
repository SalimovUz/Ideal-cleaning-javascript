import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { order } from "@service";
import { Order } from "@modal";
import { useState } from "react";
import editImg from "../../../assets/edit.svg";
import deleteImg from "../../../assets/delete.svg";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "rgba(35, 137, 218, 1)",
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

export default function CustomizedTables({ data }) {
  const [edit, setEdit] = useState({});
  const [open, setOpen] = useState(false);

  const deleteItem = async (id) => {
    try {
      const response = await order.delete(id);
      response.status === 200 && window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };

  const editItem = (item) => {
    setEdit(item);
    setOpen(true);
  };
  return (
    <>
      <Order item={edit} open={open} handleClose={() => setOpen(false)} />
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell align="center">T / R</StyledTableCell>
              <StyledTableCell align="center">Order Name</StyledTableCell>
              <StyledTableCell align="center">Order Amount</StyledTableCell>
              <StyledTableCell align="center">Client Number</StyledTableCell>
              <StyledTableCell align="center">Service Name</StyledTableCell>
              <StyledTableCell align="center">Status</StyledTableCell>
              <StyledTableCell align="center">Actions</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((item, index) => (
              <StyledTableRow key={index}>
                <StyledTableCell align="center">{index + 1}</StyledTableCell>
                <StyledTableCell align="center">
                  {item.client_name}
                </StyledTableCell>
                <StyledTableCell align="center">{item.price}</StyledTableCell>
                <StyledTableCell align="center">
                  {item.client_phone_number}
                </StyledTableCell>
                <StyledTableCell align="center">{item.service_name}</StyledTableCell>
                <StyledTableCell align="center">{item.status}</StyledTableCell>
                <StyledTableCell align="center" className="flex space-x-4">
                  <div className="flex items-center space-x-4 justify-center">
                    <img
                      onClick={() => editItem(item)}
                      src={editImg}
                      alt="bir"
                      className="cursor-pointer hover:scale-125 transition-all duration-200"
                    />
                    <img
                      onClick={() => deleteItem(item.id)}
                      src={deleteImg}
                      alt=""
                      className="cursor-pointer hover:scale-125 transition-all duration-200"
                    />
                  </div>
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}

