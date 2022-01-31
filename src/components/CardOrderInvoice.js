import React, { useEffect, useState } from "react";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { useHistory } from "react-router-dom";

export default function CardOrderInvoice() {
  const history = useHistory();
  const [user, setUser] = useState({});
  const [cardOrder, setCardOrder] = useState({});

  const handleFinnish = () => {
    history.push("/");
  };

  const handleDepositFunds = () => {
    history.push("/");
  };

  const handleViewStatement = () => {
    history.push("/");
  };

  // TODO use redux
  useEffect(() => {
    fetch("http://localhost:8000/card-orders/f2kVPvt")
      .then((res) => res.json())
      .then((data) => setCardOrder(data));

    fetch("http://localhost:8000/users/1")
      .then((res) => res.json())
      .then((data) => setUser(data));
  }, []);

  return (
    <Container size="sm">
      <Grid container spacing={3} margin>
        <Grid item xs={12}>
          <Typography variant="h2" component="h2">
            Invoice
          </Typography>
          {cardOrder && user && (
            <div>
              <Typography variant="p" component="p">
                Your unique reference number is {cardOrder.reference}.
              </Typography>
              <Typography variant="p" component="p">
                You currently have R{cardOrder.totalPrice - user.balance} funds
                available.
              </Typography>
              <Typography variant="p" component="p">
                {user.balance < cardOrder.totalPrice
                  ? "Your cards will be send as soon as possible."
                  : "Your card order will not be processed until you have depositedfunds into the Credits Outstanding: PayCard beneficiary using internet banking. Your cards will then be delivered, andyou can allocate cards and load funds."}
              </Typography>
            </div>
          )}
        </Grid>
        <Grid item xs={12}>
          <iframe
            src="/media/PayCardFin.pdf"
            title="invoice"
            width="80%"
            height="500px"
          ></iframe>
        </Grid>
        <Grid item xs={12}>
          <Button variant="contained" margin="normal" onClick={handleFinnish}>
            I'm finished
          </Button>
          <Button
            variant="outlined"
            margin="normal"
            onClick={handleDepositFunds}
          >
            Deposit funds
          </Button>
          <Button
            variant="outlined"
            margin="normal"
            onClick={handleViewStatement}
          >
            View statement
          </Button>
        </Grid>
      </Grid>
    </Container>
  );
}
