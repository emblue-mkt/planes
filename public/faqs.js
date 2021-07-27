var listItems = document
  .getElementById("faqsContainer")
  .getElementsByClassName("faqItem");

const toggleFaq = (el) => {
  if (!el.style.height || el.style.height === "0px") {
    el.style.height = el.scrollHeight + "px";
  } else {
    el.style.height = "0px";
  }
};

for (let item of listItems) {
  var heading = item.getElementsByTagName("h5")[0];
  heading.addEventListener("click", () => {
    var itemContent = item.getElementsByClassName("faqContent")[0];
    toggleFaq(itemContent);
  });
}

