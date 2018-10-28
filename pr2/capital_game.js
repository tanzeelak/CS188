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

  var answer = $("#pr2__answer");
  console.log(answer.val());
  answer.autocomplete({
    source: country_capital_pairs.map(x => x["capital"]),
    minLength: 2
  });
});

function evaluateAnswer() {
  var question = $("#pr2__question").text();
  var correctAnswer = currentPair["capital"];
  var answer = $("#pr2__answer").val();
  if (correctAnswer == answer) {
    resultsArray.unshift({
      country: question,
      capital: correctAnswer,
      userAnswer: answer,
      correct: true
    });
  } else {
    resultsArray.unshift({
      country: question,
      capital: correctAnswer,
      userAnswer: answer,
      correct: false
    });
  }
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
  var resHTML, answer;
  var country = resultsArray[0].country;
  var capital = resultsArray[0].capital;
  var correctness = resultsArray[0].correct;

  if (correctness) {
    // country, capital, checkmark
    answer = '<i class="fa fa-check" aria-hidden="true"></i>';
    resHTML = `
      <tr class="correct">
      <td>${country}</td>
      <td>${capital}</td>
      <td>${answer}</td>
      </tr>
      `;
  } else {
    // country, user answer, correct capital
    answer = resultsArray[0].userAnswer;
    resHTML = `
      <tr class="incorrect">
      <td>${country}</td>
      <td><s>${answer}<s></td>
      <td>${capital}</td>
      </tr>
      `;
  }

  $("#currentQuestion").after(resHTML);
}
