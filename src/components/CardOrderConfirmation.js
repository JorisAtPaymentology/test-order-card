import React, { useEffect, useState } from "react";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";
import { useHistory } from "react-router-dom";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function CardOrderConfirmation() {
  const history = useHistory();
  const [balance, setBalance] = useState({});
  const [cardOrder, setCardOrder] = useState({});
  const [cardPrice, setCardPrice] = useState({});

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  // TODO use redux
  useEffect(() => {
    fetch("http://localhost:8000/cardPrice/1")
      .then((res) => res.json())
      .then((data) => setCardPrice(data));

    fetch("http://localhost:8000/card-orders/f2kVPvt")
      .then((res) => res.json())
      .then((data) => setCardOrder(data));

    fetch("http://localhost:8000/balance/1")
      .then((res) => res.json())
      .then((data) => setBalance(data));
  }, []);

  const handleGoBack = () => {
    history.push("/");
  };

  const handleConfirmation = () => {
    handleOpen();
  };

  const handleModalConfirmation = () => {
    history.push("/order-invoice");
  };

  return (
    <Container size="sm">
      <Grid container spacing={3} margin>
        <Grid item xs={12}>
          <Typography variant="h2" component="h2">
            Confirm card order
          </Typography>
        </Grid>
        <Grid item xs={12}>
          {balance && (
            <Typography variant="h5" component="h3">
              Your balance is currently {balance.currency}
              {balance.balance}. You have{" "}
              {balance.balance > cardOrder.totalPrice
                ? "sufficient"
                : "insufficient"}{" "}
              funds.<br></br> Your card order will be processed once sufficient
              funds have been added.
            </Typography>
          )}
        </Grid>
        <Grid item xs={12}>
          <TableContainer>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              {cardOrder && cardPrice && (
                <TableBody>
                  <TableRow>
                    <TableCell>Number of cards</TableCell>
                    <TableCell>
                      {cardOrder.numberOfCards} @ {cardPrice.currency}
                      {cardPrice.price} per card = {cardPrice.currency}
                      {cardOrder.totalPrice}
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Delivery fee</TableCell>
                    <TableCell>
                      {cardOrder.numberOfCards} @ {cardPrice.currency}
                      {cardPrice.unitPrice} per card + {cardPrice.currency}
                      {cardPrice.deliveryFee} for face-to-face delivery ={" "}
                      {cardPrice.currency}
                      {cardOrder.numberOfCards * cardPrice.unitPrice +
                        cardPrice.deliveryFee}
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Total cost</TableCell>
                    <TableCell>
                      {cardPrice.currency}
                      {cardOrder.numberOfCards * cardPrice.unitPrice +
                        cardPrice.deliveryFee +
                        cardOrder.totalPrice}
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Receiver name</TableCell>
                    <TableCell>{cardOrder.name}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Receiver ID number</TableCell>
                    <TableCell>{cardOrder.idNumber}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Contact number</TableCell>
                    <TableCell>{cardOrder.contactNumber}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Alternative contact number</TableCell>
                    <TableCell>{cardOrder.altContactNumber}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Delivery method</TableCell>
                    <TableCell>NOT DEFINED IN QUESTIONNAIRE</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Address</TableCell>
                    <TableCell>{cardOrder.address}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>City</TableCell>
                    <TableCell>{cardOrder.city}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Code</TableCell>
                    <TableCell>{cardOrder.code}</TableCell>
                  </TableRow>
                </TableBody>
              )}
            </Table>
          </TableContainer>
        </Grid>
        <Grid item xs={12}>
          <Button variant="contained" margin="normal" onClick={handleGoBack}>
            Go back
          </Button>
          <Button
            variant="contained"
            margin="normal"
            onClick={handleConfirmation}
          >
            Confirm
          </Button>
          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={style}>
              {/*<Typography id="modal-modal-title" variant="h6" component="h2">
                Text in a modal
              </Typography> */}
              <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                You have insufficient funds to process this order. Your card
                order will only be processed once you have used internet banking
                to deposit sufficient funds into the "Credit Outstanding:
                PayCard".<br></br>Beneficiary with your profile number as the
                reference. <br></br>Instructions are available after clicking
                confirm.
              </Typography>
              <Button
                variant="contained"
                margin="normal"
                onClick={handleModalConfirmation}
              >
                Confirm
              </Button>
            </Box>
          </Modal>
        </Grid>
      </Grid>
    </Container>
  );
}
