// This allows the Javascript code inside this block to only run when the page
// has finished loading in the browser.
var currentPair;
var resultsArray = [];

$(document).ready(function() {
  var country_capital_pairs = pairs;
  updatePair();

  $("#pr2__submit").click(function() {
    evaluateAnswer();
    updatePair();
  });
});

function evaluateAnswer() {
  var question = $("#pr2__question");
  var correctAnswer = currentPair["capital"];
  var answer = $("#pr2__answer").val();
  console.log("answer: " + answer);
  console.log("capital: " + currentPair["capital"]);
  if (correctAnswer == answer) {
    console.log("correcteroni");
  } else {
    console.log("wrongo");
  }
  resultsArray.unshift({
    country: question,
    capital: correctAnswer,
    answer: answer
  });
  console.log(resultsArray);

  appendResult();
}

function updatePair() {
  var question = $("#pr2__question");
  var answer = $("#pr2__answer");

  var randNum = Math.floor(Math.random() * 170);
  currentPair = pairs[randNum];
  question.html(currentPair["country"]);
  answer.focus();
  answer.val("");
}

function appendResult() {
  $("table").append(
    '<tr class="correct">  <td>Tokyo</td> <td> <i class="fa fa-check" aria-hidden="true"></i></td> </tr>'
  );
}

// <tr class="correct">
// <td>Japan</td>
// <td>Tokyo</td>
// <td>
//   <i class="fa fa-check" aria-hidden="true"></i>
// </td>
// </tr>
// <tr class="incorrect">
// <td>United States of America</td>
// <td>
//   <s>New York</s>
// </td>
// <td>Washington, D.C.</td>
// </tr>
