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

// Selector Plan Mobile 
var planSelector = document.getElementById("planSelector");
var priceTable = document.getElementById("priceTable");
var planSpecs = document.getElementById("planSpecs");
var breakdownTables = document.getElementsByClassName("breakdown");
window.onload = () => {
  if(document.documentElement.clientWidth < 700){
    handlePlanChange();
  }
}
// Logica planSection
anualPayment.onchange = () => handlePaymentChange();
monthlyPayment.onchange = () => handlePaymentChange();
currencySelector.onchange = () => handlePaymentChange();
planSelector.onchange = () => handlePlanChange();

function handlePaymentChange() {
  setPrices(anualPayment.checked ? "anual" : "monthly");
  setFontSizes(currencySelector.value);
}

function handlePlanChange(){
  clearClasses();
  setColumns(planSelector.value);
}
function setColumns(opt){
  handleTables(opt)
}
function handleTables(opt){
  priceTable.classList.add("price-"+opt);
  planSpecs.classList.add("data-"+opt);
  Array.from(breakdownTables).forEach(el => el.classList.add("data-"+opt));
}
function clearClasses(){
  planSpecs.className = '';
  priceTable.className = '';
  Array.from(breakdownTables).forEach(el => el.className = 'breakdown');
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



const toggleElement = (el) => {
  if(!el.style.height || el.style.height === "0px") {
    el.style.height = el.scrollHeight + "px"
  }else{
    el.style.height = '0px'
  }
}