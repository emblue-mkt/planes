"use strict";
function setCookie(cname, cvalue, exdays) {
  var d = new Date();
  d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1000);
  var expires = "expires=" + d.toUTCString();
  document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

function getCookie(cname) {
  var name = cname + "=";
  var decodedCookie = decodeURIComponent(document.cookie);
  var ca = decodedCookie.split(";");
  for (var i = 0; i < ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) == " ") {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}

function getRefQueryParam(name) {
  name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
  var regex = new RegExp("[\\?&]" + name + "=([^&#]*)");
  var results = regex.exec(location.search);
  return results === null
    ? ""
    : decodeURIComponent(results[1].replace(/\+/g, " "));
}

// Get all the UTM parameters before the page finishes rendering
//Variables

var utm_source = getRefQueryParam("utm_source");
var utm_medium = getRefQueryParam("utm_medium");
var utm_content = getRefQueryParam("utm_content");
var utm_campaign = getRefQueryParam("utm_campaign");
var cook = getCookie("embluemail.com");
var url = "&utm_source=" + cook;
var utm_complete = utm_source + '&utm_medium=' + utm_medium + '&utm_campaign=' + utm_campaign  + '&utm_content=' + utm_content;

if (cook=="" && utm_source != "") {
  setCookie('embluemail.com',utm_complete,1);
}

var contactBttns = document.getElementsByClassName("contactBttn");
Array.prototype.forEach.call(contactBttns, (el) => {
  el.href = el.href + url;
})
