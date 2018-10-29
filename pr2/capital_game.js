// This allows the Javascript code inside this block to only run when the page
// has finished loading in the browser.
var currentPair;
var resultsArray = [];

$(document).ready(function() {
  var country_capital_pairs = pairs;
  updatePair();

  var userAnswer = $("#pr2__answer");

  $("#pr2__submit").click(function() {
    resetButton();
    resetFilter();
    evaluateAnswer(userAnswer.val());
    updatePair();
  });

  userAnswer.autocomplete({
    source: country_capital_pairs.map(x => x["capital"]),
    minLength: 2,
    select: function(event, ui) {
      resetButton();
      resetFilter();
      evaluateAnswer(ui.item.value);
      updatePair();
      return false;
    }
  });

  var filters = $("input[name='filter']");
  filters.change(function() {
    var checked = filters.filter(function() {
      return $(this).prop("checked");
    });
    var checkedVal = checked.val();
    resetFilter();
    if (checkedVal == "correct") {
      // add back if incorrect
      var resultsHTMLObjects = document.getElementsByClassName("result");
      for (var i = 0; i < resultsHTMLObjects.length; i++) {
        if ($(resultsHTMLObjects[i]).hasClass("incorrect")) {
          $(resultsHTMLObjects[i]).addClass("hide");
        }
      }
    } else if (checkedVal == "wrong") {
      // add back if incorrect
      var resultsHTMLObjects = document.getElementsByClassName("result");
      for (var i = 0; i < resultsHTMLObjects.length; i++) {
        if ($(resultsHTMLObjects[i]).hasClass("correct")) {
          $(resultsHTMLObjects[i]).addClass("hide");
        }
      }
    }
  });
});

function resetButton() {
  var radioButtons = $(":radio[value='all']");
  radioButtons[0].checked = true;
}

function resetFilter() {
  var resultsHTMLObjects = document.getElementsByClassName("result");
  for (var i = 0; i < resultsHTMLObjects.length; i++) {
    $(resultsHTMLObjects[i]).removeClass("hide");
  }
}

function evaluateAnswer(userAnswer) {
  var question = $("#pr2__question").text();
  var correctAnswer = currentPair["capital"];
  // var answer = $("#pr2__answer").val();
  if (correctAnswer == userAnswer) {
    resultsArray.unshift({
      country: question,
      capital: correctAnswer,
      userAnswer: userAnswer,
      correct: true
    });
  } else {
    resultsArray.unshift({
      country: question,
      capital: correctAnswer,
      userAnswer: userAnswer,
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
      <tr class="result correct">
      <td>${country}</td>
      <td>${capital}</td>
      <td>${answer}<button id="deleteButton">Delete</button> </td>
      </tr>
      `;
  } else {
    // country, user answer, correct capital
    answer = resultsArray[0].userAnswer;
    resHTML = `
      <tr class="result incorrect">
      <td>${country}</td>
      <td><s>${answer}<s></td>
      <td>${capital}<button id="deleteButton">Delete</button></td>
      </tr>
      `;
  }
  $("#filterSection").after(resHTML);
  $("#deleteButton").on("click", function(event) {
    $(this)
      .parent()
      .parent()
      .remove();
  });
}
