var APIMoneda;
(async function () {
  const requestUrl = "https://www.mycurrency.net/US.json";
  let response = await fetch(requestUrl)
    .then((response) => response.json())
    .then((data) => (APIMoneda = data.rates));
  return response;
})();

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

export function getPrice(countryCode, basePrice) {
  let countryRate =
    countryCode === "US"
      ? 1
      : APIMoneda.find(({ code }) => code === countryCode).rate;
  let finalPrice = countryRate * basePrice;
  return (
    getCurrency(countryCode) + Math.round(finalPrice).toLocaleString("de-DE")
  );
}
