import React, { useState } from "react";
import "./App.css";
import Container from "./components/Container";
import styled from "styled-components";
import {
  RadioGroup,
  FormControlLabel,
  FormControl,
  withStyles,
} from "@material-ui/core";
import StyledRadio from "./components/StyledRadio";
import CustomSlider from "./components/CustomSlider";
import planData from "./planData";
import { getPrice } from "./utils";

const Heading = styled.h3`
  font-family: "Montserrat", sans-serif;
  font-weight: bold;
  font-size: 23px;
  color: #fd5739;
  margin-bottom: 15px;
`;
const BlueHeading = styled(Heading)`
  font-size: 22px;
  color: #024c88;
  margin-bottom: 10px;
`;
const Quantity = styled.h4`
  font-family: "Montserrat", sans-serif;
  font-weight: bold;
  font-size: 18px;
  color: #024c88;
`;
const Price = styled.span`
  display: block;
  font-family: "Montserrat", sans-serif;
  font-weight: bold;
  font-size: 40px;
  color: #fd5739;
  line-height: 100%;
`;
const InputLabel = styled.label`
  font-family: "Montserrat", sans-serif;
  font-weight: 600;
  font-size: 14px;
  color: #024c88;
  margin-bottom: 0.5em;
  display: block;
`;
const RadioLabel = styled.label`
  font-family: "Montserrat", sans-serif;
  font-weight: 500;
  font-size: 12px;
  color: #58595b;
`;
const StyledRadioGroup = styled(RadioGroup)`
  column-gap: 1em;
`;
const FormWrapper = styled.div`
  width: 95%;
  padding: 2em 0;
  display: flex;
  flex-direction: column;
  row-gap: 1.3em;
`;
const PriceWrapper = styled.div`
  margin-top: 2em;
  display: flex;
  flex-direction: row;
  width: 100%;
`;
const PriceText = styled.span`
  display: block;
  font-size: 11px;
  line-height: 13px;
  color: #000000;
`;
const StyledButton = styled.button`
  border: 0;
  font-family: "Roboto", sans-serif;
  font-size: 14px;
  letter-spacing: 0.01em;
  color: #ffffff;
  background: #fd5739;
  border-radius: 25px;
  padding: 12px 15px;
  align-self: flex-end;
`;
const StyledFormControl = withStyles({
  root: {
    width: "100%",
    borderTop: "2px solid #999999",
    borderBottom: "2px solid #999999",
  },
})(FormControl);
function App() {
  var currencySelector = document.getElementById("currencySelector");
  var anualPayment = document.getElementById("anualPayment");
  var monthlyPayment = document.getElementById("monthlyPayment");

  const [quantity, setQuantity] = useState(10);
  const [price, setPrice] = useState(0);
  const [plan, setPlan] = useState(planData.free);
  const [currency, setCurrency] = useState(currencySelector.value);
  const [isAnual, setIsAnual] = useState(true);
  const [displayPrice, _setDisplayPrice] = useState("$0");
  const [basePrice, setBasePrice] = useState(0);

  currencySelector.addEventListener("change", (e) =>
    setCurrency(e.target.value)
  );
  anualPayment.addEventListener("change", (e) => {
    handlePaymentChange(e);
  });
  monthlyPayment.addEventListener("change", (e) => {
    handlePaymentChange(e);
  });

  const handlePaymentChange = (e) => {
    var value = e.target.value === "anual" ? true : false;
    setIsAnual(value);
    setBasePrice(value ? plan.anualPrice : plan.monthlyPrice);
  };

  const handlePlanChange = (e) => {
    var opt = e.target.value;
    var newPlan =
      opt === "free"
        ? planData.free
        : opt === "stan"
        ? planData.standard
        : opt === "pro"
        ? planData.professional
        : opt === "ent"
        ? planData.enterprise
        : planData.free;
    setPlan(newPlan);
    setPrice(isAnual ? newPlan.anualPrice : newPlan.monthlyPrice);
    setQuantity(newPlan.included);
  };
  
  const handleSliderChange = (e, val) => {
    setQuantity(val);
    setPrice(displayPrice);
  };
  const updatePrice = (val) => {
    var updatedPrice = val > plan.included ? basePrice + (plan.extraCpm * (quantity - plan.included)) / 1000 : basePrice;
    setPrice(updatedPrice);
    _setDisplayPrice(getPrice(currency, val));
  };
  return (
    <Container>
      <Heading>Definamos cual es tu plan ideal</Heading>
      <StyledFormControl>
        <FormWrapper>
          <div>
            <InputLabel>
              ¿Qué nivel de acompañamiento te hace falta?{" "}
            </InputLabel>
            <StyledRadioGroup
              onChange={handlePlanChange}
              defaultValue="free"
              aria-label="plan"
              name="plan"
              row
            >
              <FormControlLabel
                value="free"
                control={<StyledRadio />}
                label={<RadioLabel>Free</RadioLabel>}
              />
              <FormControlLabel
                value="stan"
                control={<StyledRadio />}
                label={<RadioLabel>Standard</RadioLabel>}
              />
              <FormControlLabel
                value="pro"
                control={<StyledRadio />}
                label={<RadioLabel>Professional</RadioLabel>}
              />
              <FormControlLabel
                value="ent"
                control={<StyledRadio />}
                label={<RadioLabel>Enterprise</RadioLabel>}
              />
            </StyledRadioGroup>
          </div>
          <div>
            <InputLabel>¿Cúantos envíos necesitas hacer por mes?</InputLabel>
            <CustomSlider
              defaultValue={10000}
              plan={plan}
              value={quantity}
              onChange={handleSliderChange}
            />
          </div>
          <Quantity>
            Cantidad de envios:{" "}
            <span style={{ color: "#FD5739" }}>
              {" "}
              {Number(quantity).toLocaleString("es-AR")}{" "}
            </span>
          </Quantity>
        </FormWrapper>
      </StyledFormControl>
      <PriceWrapper>
        <div style={{ flexGrow: 1 }}>
          <BlueHeading>Plan {plan.title}:</BlueHeading>
          <PriceText>
            Desde <Price>{displayPrice}</Price> por mes{" "}
            {isAnual ? `en un (1) pago anual` : `en 12 pagos`}{" "}
            <span style={{ color: "#FD5739" }}>(*)</span>
          </PriceText>
        </div>
        <StyledButton>Contacta a un representante</StyledButton>
      </PriceWrapper>
    </Container>
  );
}

export default App;
