import React, { useEffect, useState } from "react";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useHistory } from "react-router-dom";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
//import * as regex from "./Regex";
//import {useDispatch, useSelector} from "react-redux";

export default function CardOrderForm() {
  // TODO change to real max number of cards
  const MAX_NUMBER_OF_CARDS = 500;
  const history = useHistory();
  //const dispatch = useDispatch();
  //const cardPrice = useSelector(state => state);
  const [cardPrice, setCardPrice] = useState({});

  const [numberOfCards, setNumberOfCards] = useState(0);
  const [numberOfCardsError, setNumberOfCardsError] = useState(false);
  const [numberOfCardsErrorText, setNumberOfCardsErrorText] = useState();

  const [name, setName] = useState("");
  const [nameError, setNameError] = useState(false);
  const [nameErrorText, setNameErrorText] = useState();

  const [idNumber, setIdNumber] = useState("");
  const [idError, setIdError] = useState(false);
  const [idErrorText, setIdErrorText] = useState();

  const [contactNumber, setContactNumber] = useState("");
  const [contactNumberError, setContactNumberError] = useState(false);
  const [contactNumberErrorText, setContactNumberErrorText] = useState();

  const [altContactNumber, setAltContactNumber] = useState("");
  const [altContactNumberError, setAltContactNumberError] = useState(false);
  const [altContactNumberErrorText, setAltContactNumberErrorText] = useState();

  const [deliveryMethods, setDeliveryMethods] = useState([]);
  const [selectedDeliveryMethod, setSelectedDeliveryMethod] = useState([]);

  const [address, setAddress] = useState("");
  const [addressError, setAddressError] = useState(false);
  const [addressErrorText, setAddressErrorText] = useState();

  const [addressLine2, setaddressLine2] = useState("");
  const [addressLine2Error, setaddressLine2Error] = useState(false);
  const [addressLine2ErrorText, setaddressLine2ErrorText] = useState();

  const [city, setCity] = useState("");
  const [cityError, setCityError] = useState(false);
  const [cityErrorText, setCityErrorText] = useState();

  const [code, setCode] = useState("");
  const [codeError, setCodeError] = useState(false);
  const [codeErrorText, setCodeErrorText] = useState();

  /*
    useEffect(() => {
        dispatch(ACTION())
    }, []);
    */

  // TODO use redux
  useEffect(() => {
    fetch("http://localhost:8000/cardPrice/1")
      .then((res) => res.json())
      .then((price) => setCardPrice(price));

    fetch("http://localhost:8000/users/1")
      .then((res) => res.json())
      .then((user) => {
        setName(user.name);
        setIdNumber(user.idNumber);
        setContactNumber(user.contactNumber);
        setAltContactNumber(user.altContactNumber);
        setAddress(user.address);
        setCity(user.city);
        setCode(user.code);
        setDeliveryMethods(user.deliveryMethods);
      });
  }, []);

  const validateNumberOfCards = () => {
    setNumberOfCardsError(false);
    setNumberOfCardsErrorText("");
    if (numberOfCards === 0 || numberOfCards > MAX_NUMBER_OF_CARDS) {
      setNumberOfCardsError(true);
      setNumberOfCardsErrorText("Please choose one or more cards.");
    }
    console.log("number of card: " + numberOfCards);
    console.log("number of card error: " + numberOfCardsError);
  };

  const validateName = () => {
    setNameError(false);
    setNameErrorText("");
    if (true /*name === "" || name.length > 50*/) {
      setNameError(true);
      setNameErrorText("Please fill in a valid name.");
    }
    console.log("name error: " + nameError);
  };

  const validateId = () => {
    setIdError(false);
    setIdErrorText("");
    if (
      idNumber === "" ||
      idNumber.length < 9 /* || !regex.validId.test(idNumber)*/
    ) {
      setIdError(true);
      setIdErrorText("Please fill in a valid ID.");
    }
    console.log("id error: " + idError);
  };

  const validateContactNumber = () => {
    setContactNumberError(false);
    setContactNumberErrorText("");
    if (
      contactNumber === "" /* || !regex.validContactNumber.test(contactNumber)*/
    ) {
      setContactNumberError(true);
      setContactNumberErrorText("Please fill in a valid contact number.");
    }
    console.log("contact error: " + contactNumberError);
  };

  const validateAltContactNumber = () => {
    setAltContactNumberError(false);
    setAltContactNumberErrorText("");
    if (false /*!regex.validContactNumber.test(altContactNumber)*/) {
      setAltContactNumberError(true);
      setAltContactNumberErrorText("Please fill in a valid contact number.");
    }
    console.log("alt contact error: " + altContactNumberError);
  };

  const validateAddress = () => {
    setAddressError(false);
    setAddressErrorText("");
    if (address === "" /*|| !regex.validAddress.test(address)*/) {
      setAddressError(true);
      setAddressErrorText(
        "Please fill in a valid adress (streetname and number)."
      );
    }
    console.log("address error: " + addressError);
  };

  const validateAddressLine2 = () => {
    setAddressError(false);
    setAddressErrorText("");
    if (false) {
      setAddressError(true);
      setAddressErrorText(
        "Please fill in a valid adress (streetname and number)."
      );
    }
    console.log("address error: " + addressError);
  };

  const validateCity = () => {
    setCityError(false);
    setCityErrorText("");
    if (city === "" || city.length > 50) {
      setCityError(true);
      setCityErrorText("Please fill in a valid City name.");
    }
    console.log("city error: " + cityError);
  };

  const validateCode = () => {
    setCodeError(false);
    setCodeErrorText("");
    if (code === "" /* || !regex.validCode.test(code)*/) {
      setCodeError(true);
      setCodeErrorText("Please fill in a valid code.");
    }
    console.log("code error: " + codeError);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("handleSubmit started...");
    validateNumberOfCards();
    validateName();
    validateId();
    validateContactNumber();
    validateAltContactNumber();
    validateAddress();
    validateAddressLine2();
    validateCity();
    validateCode();
    console.log("validation ended...");

    if (
      !numberOfCardsError &&
      !nameError &&
      !idError &&
      !contactNumberError &&
      !altContactNumberError &&
      !addressError &&
      !addressLine2Error &&
      !cityError &&
      !codeError
    ) {
      const cardOrder = {
        reference: "8802404305",
        numberOfCards: numberOfCards,
        totalPrice: cardPrice.price * numberOfCards,
        name,
        idNumber,
        contactNumber,
        altContactNumber,
        address,
        addressLine2,
        city,
        code,
        selectedDeliveryMethod,
      };
      fetch("http://localhost:8000/card-orders", {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify(cardOrder),
      })
        .then((res) => res.json())
        .then((order) => history.push("/order-confirmation/" + order.id));
    }
  };

  return (
    <Container size="sm">
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Typography variant="h4" component="h4">
            *Required fields
          </Typography>
          <Typography variant="h3" component="h3">
            1. Card order cost
          </Typography>
        </Grid>
        <Grid item xs={12} md={4}>
          <TextField
            label="Number of cards"
            value={numberOfCards}
            onChange={e => setNumberOfCards(+e.target.value)}
            variant="outlined"
            type="number"
            fullWidth
            required
            error={numberOfCardsError}
            helperText={numberOfCardsErrorText}
          />
        </Grid>
        <Grid item xs={12} md={8}>
          {cardPrice && (
            <div>
              <p>
                Total cost of cards at: {cardPrice.currency}
                {cardPrice.price} per card: {cardPrice.currency}
                {cardPrice.price * numberOfCards}
                <br></br>
                Cost including: {cardPrice.currency}
                {cardPrice.deliveryFee} delivery fee: {cardPrice.currency}
                {cardPrice.deliveryFee * numberOfCards}
              </p>
            </div>
          )}
        </Grid>
        <Grid item xs={12}>
          <Typography variant="h3" component="h3">
            2. Delivery information
          </Typography>
          <form noValidate autoComplete="off" onSubmit={handleSubmit}>
            <TextField
              label="Receiver name"
              value={name}
              margin="normal"
              onChange={e => setName(e.target.value)}
              variant="outlined"
              type="text"
              fullWidth
              required
              error={nameError}
              helperText={nameErrorText}
            />

            <TextField
              label="Receiver id number"
              value={idNumber}
              margin="normal"
              onChange={e => setIdNumber(e.target.value)}
              variant="outlined"
              type="text"
              fullWidth
              required
              error={idError}
              helperText={idErrorText}
            />
            <TextField
              label="Contact number"
              value={contactNumber}
              margin="normal"
              onChange={e => setContactNumber(e.target.value)}
              variant="outlined"
              type="text"
              fullWidth
              required
              error={contactNumberError}
              helperText={contactNumberErrorText}
            />
            <TextField
              label="Alternative contact number"
              value={altContactNumber}
              margin="normal"
              onChange={e => setAltContactNumber(e.target.value)}
              variant="outlined"
              type="text"
              fullWidth
              error={altContactNumberError}
              helperText={altContactNumberErrorText}
            />

            <FormControl>
              <FormLabel id="delivery-method-group-label">
                Delivery method*
              </FormLabel>
              <RadioGroup
                row
                required
                aria-labelledby="delivery-method-group-label"
                name="delivery-method-group"
              >
                {deliveryMethods &&
                  deliveryMethods.map((method) => (
                    <FormControlLabel
                      key={method}
                      value={method}
                      control={<Radio />}
                      label={method}
                      onChange={e => setSelectedDeliveryMethod(e.target.value)} 
                    />
                  ))}
              </RadioGroup>
            </FormControl>

            <TextField
              label="Delivery address"
              value={address}
              margin="normal"
              onChange={e => setAddress(e.target.value)}
              variant="outlined"
              type="text"
              fullWidth
              required
              error={addressError}
              helperText={addressErrorText}
            />
            <TextField
              label="Address line 2"
              value={addressLine2}
              margin="normal"
              onChange={e => setaddressLine2(e.target.value)}
              variant="outlined"
              type="text"
              fullWidth
              error={addressError}
              helperText={addressErrorText}
            />
            <TextField
              label="City"
              value={city}
              margin="normal"
              onChange={e => setCity(e.target.value)}
              variant="outlined"
              type="text"
              fullWidth
              required
              error={cityError}
              helperText={cityErrorText}
            />
            <TextField
              label="Code"
              value={code}
              margin="normal"
              onChange={e => setCode(e.target.value)}
              variant="outlined"
              type="text"
              fullWidth
              required
              error={codeError}
              helperText={codeErrorText}
            />
            <Button type="submit" variant="contained" margin="normal">
              Submit card order
            </Button>
          </form>
        </Grid>
      </Grid>
    </Container>
  );
}
