// Prices
const planInfo = [
  {
    id: "ent",
    monthly: 1800,
    anual: 1440,
  },
  {
    id: "pro",
    monthly: 900,
    anual: 720,
  },
  {
    id: "stan",
    monthly: 180,
    anual: 144,
  },
];

function getCurrency(countryCode) {
  return countryCode === "BR"
    ? "R$ "
    : countryCode === "PE"
    ? "S/ "
    : countryCode === "AR"
    ? "AR$ "
    : countryCode === "PY"
    ? "G. "
    : "$";
}

// API Moneda
var APIMoneda;
(async function () {
  const requestUrl = "https://www.mycurrency.net/US.json";
  let response = await fetch(requestUrl)
    .then((response) => response.json())
    .then((data) => (APIMoneda = data.rates));
})();

// Selector Anual/Mensual
var anualPayment = document.getElementById("anualPayment");
var monthlyPayment = document.getElementById("monthlyPayment");
var currencySelector = document.getElementById("currencySelector");
var entPrice = document.getElementById("entPrice");
var entCopy = document.getElementById("entCopy");
var proPrice = document.getElementById("proPrice");
var proCopy = document.getElementById("proCopy");
var stanPrice = document.getElementById("stanPrice");
var stanCopy = document.getElementById("stanCopy");
var freePrice = document.getElementById("freePrice");
var peruPsa = document.getElementById("peruPsa");

// Calculadora SMS
var smsCountry = document.getElementById("smsC");
var smsQuantity = document.getElementById("smsQ");
var smsValue = document.getElementById("smsV");

// Logica planSection

anualPayment.onchange = () => handlePaymentChange();
monthlyPayment.onchange = () => handlePaymentChange();
currencySelector.onchange = () => handlePaymentChange();

function handlePaymentChange() {
  setPrices(anualPayment.checked ? "anual" : "monthly");
  smsCountry.value = currencySelector.value;
  handleSMSChange();
  setFontSizes(currencySelector.value);
  togglePsa();
}

function setFontSizes(opt){
  if(opt === "PY" || opt === "AR"){
    addFontClass("fit-35px");
  }else if(opt === "CL" || opt === "CO"){
    addFontClass("fit-40px");
  }else{
    addFontClass();
  }
}
function togglePsa(){
  if(currencySelector.value === "PE"){
    peruPsa.style.display = "block"
  }else{
    peruPsa.style.display = "none"
  }
}

function addFontClass(cls){
  const priceElements = [entPrice, proPrice, stanPrice, freePrice];
  const classArray = ["fit-35px", "fit-38px", "fit-40px"];
  priceElements.forEach(el => el.classList.remove(...classArray));
  if(cls){
    priceElements.forEach(el => el.classList.add(cls));
  }
}

function setPrices(opt) {
  if (opt === "anual") {
    entPrice.innerHTML = getPrice(currencySelector.value, getPlan("ent").anual);
    entCopy.innerHTML = getCopy(
      opt,
      getPrice(currencySelector.value, getPlan("ent").monthly)
    );
    proPrice.innerHTML = getPrice(currencySelector.value, getPlan("pro").anual);
    proCopy.innerHTML = getCopy(
      opt,
      getPrice(currencySelector.value, getPlan("pro").monthly)
    );
    stanPrice.innerHTML = getPrice(
      currencySelector.value,
      getPlan("stan").anual
    );
    stanCopy.innerHTML = getCopy(
      opt,
      getPrice(currencySelector.value, getPlan("stan").monthly)
    );
  } else if (opt === "monthly") {
    entPrice.innerHTML = getPrice(
      currencySelector.value,
      getPlan("ent").monthly
    );
    entCopy.innerHTML = getCopy(
      opt,
      getPrice(currencySelector.value, getPlan("ent").anual)
    );
    proPrice.innerHTML = getPrice(
      currencySelector.value,
      getPlan("pro").monthly
    );
    proCopy.innerHTML = getCopy(
      opt,
      getPrice(currencySelector.value, getPlan("pro").anual)
    );
    stanPrice.innerHTML = getPrice(
      currencySelector.value,
      getPlan("stan").monthly
    );
    stanCopy.innerHTML = getCopy(
      opt,
      getPrice(currencySelector.value, getPlan("stan").anual)
    );
  }
}

function getPrice(countryCode, basePrice) {
  let countryRate =
    countryCode === "US"
      ? 1
      : APIMoneda.find(({ code }) => code === countryCode).rate;
  let finalPrice = countryRate * basePrice;
  return (
    getCurrency(countryCode) + Math.round(finalPrice).toLocaleString("de-DE")
  );
}

function getPlan(planId) {
  return planInfo.find(({ id }) => id === planId);
}

function getCopy(opt, price) {
  return opt === "anual"
    ? `<strong>Por mes en un 1 pago anual,</strong> o desde ${price} por mes en 12 pagos.`
    : `<strong>Por mes en 12 pagos</strong> o desde ${price} por mes en 1 pago anual`;
}

// Logica SMS

var smsInfo = [
  {
    countryCode: "AR",
    cpm: 45,
  },
  {
    countryCode: "PE",
    cpm: 45,
  },
  {
    countryCode: "UY",
    cpm: 88,
  },
  {
    countryCode: "PY",
    cpm: 29,
  },
  {
    countryCode: "MX",
    cpm: 26,
  },
  {
    countryCode: "EC",
    cpm: 150,
  },
  {
    countryCode: "CO",
    cpm: 3.5,
  },
  {
    countryCode: "CA",
    cpm: 59,
  },
  {
    countryCode: "CL",
    cpm: 30,
  },
  {
    countryCode: "BR",
    cpm: 108,
  },
  {
    countryCode: "BO",
    cpm: 108,
  },
];

smsCountry.onchange = () => handleSMSChange();
smsQuantity.onchange = () => handleSMSChange();

function getCpm(country) {
  var country = smsInfo.find(({ countryCode }) => countryCode === country);
  return country.cpm;
}

function handleSMSChange() {
  smsValue.innerHTML = `USD ${getCpm(smsCountry.value) * smsQuantity.value}`;
}
const toggleElement = (el) => {
  if(!el.style.height || el.style.height === "0px") {
    el.style.height = el.scrollHeight + "px"
  }else{
    el.style.height = '0px'
  }
}


var prefooterBttn = document.getElementById("prefooterBttn");
var postWrapper = document.getElementById("postWrapper");
console.log(postWrapper.style.height)
prefooterBttn.onclick = () => {
    if (postWrapper.style.height === "0px") {
        postWrapper.style.height = "145px";
    } else {
        postWrapper.style.height = "0px";
    }
}