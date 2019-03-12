const fetch = require("node-fetch");
var fs = require('fs');
let cookieString = "";
let date = new Date();
let unRatedArray = [];
let ratedArray = [];
let formattedDate="";

fetch(
  "https://accounts.redbus.com/api/login?continue=https://m.redbus.pro/win/",
  {
    method: "post",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      UserName: "bluestartours",
      Password: "Pranisha918"
    })
  }
)
  .then(response => {
    return response.json();
  })
  .then(data => {
    cookieString = "auth_token=" + data.sessionid + ";path=/;";
    for (let i = 0; i < 365; i++) {
      date.setDate(date.getDate() - 1);
      formattedDate=formatDate(date);
      getEmailFromRatedCustomers();
      getEmailFromUnRatedCustomers();
     
    }
  });

function formatDate(date) {
  var d = new Date(date),
    month = "" + (d.getMonth() + 1),
    day = "" + d.getDate(),
    year = d.getFullYear();

  if (month.length < 2) month = "0" + month;
  if (day.length < 2) day = "0" + day;

  return [year, month, day].join("-");
}

function getEmailFromRatedCustomers() {
  fetch(
    "https://www.redbus.pro/win/api/ratingsReviews/getAllRatings/7/1/false/4/0/0/"+formattedDate,
    {
      method: "get",
      headers: { cookie: cookieString }
    }
  )
    .then(response => {
      return response.json();
    })
    .then(data => {
      data.map(record => {
        console.log(record.EmailId)
       
      });
    });

}

function getEmailFromUnRatedCustomers() {
  fetch(
    "https://www.redbus.pro/win/api/ratingsReviews/getUnratedCustomers/7/1/false/0/0/"+formattedDate,
    {
      method: "get",
      headers: { cookie: cookieString }
    }
  )
    .then(response => {
      return response.json();
    })
    .then(data => {
      data.map(record => {
        console.log(record.EmailId)
      });
    });

}

//https://www.redbus.pro/win/api/ratingsReviews/getAllRatings/7/1/false/4/0/0/2018-12-23
//https://www.redbus.pro/win/api/ratingsReviews/getUnratedCustomers/7/1/false/0/0/2018-12-01
