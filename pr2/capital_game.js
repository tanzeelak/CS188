// This allows the Javascript code inside this block to only run when the page
// has finished loading in the browser.
var currentPair;
var resultsArray = [];

$(document).ready(function() {
  var country_capital_pairs = pairs;

  // Generate a new question
  newQuestion();
  var userAnswer = $("#pr2__answer");
  $("#pr2__submit").click(function() {
    resetButton();
    displayAllElements();
    evaluateAnswer(userAnswer.val());
    newQuestion();
  });

  userAnswer.autocomplete({
    source: country_capital_pairs.map(x => x["capital"]),
    minLength: 2,
    select: function(event, ui) {
      resetButton();
      displayAllElements();
      evaluateAnswer(ui.item.value);
      newQuestion();
      return false;
    }
  });

  var filters = $("input[name='filter']");
  filters.change(function() {
    var checked = filters.filter(function() {
      return $(this).prop("checked");
    });
    var checkedVal = checked.val();

    // Reset filter
    displayAllElements();

    // Add ".correct" or ".incorrect" based on checkedVal
    if (checkedVal == "correct") {
      var resultsHTMLObjects = document.getElementsByClassName("result");
      for (var i = 0; i < resultsHTMLObjects.length; i++) {
        if ($(resultsHTMLObjects[i]).hasClass("incorrect")) {
          $(resultsHTMLObjects[i]).addClass("hide");
        }
      }
    } else if (checkedVal == "incorrect") {
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

function displayAllElements() {
  // Remove hide class from all ".result" HTML objects
  var resultsHTMLObjects = document.getElementsByClassName("result");
  for (var i = 0; i < resultsHTMLObjects.length; i++) {
    $(resultsHTMLObjects[i]).removeClass("hide");
  }
}

function evaluateAnswer(userAnswer) {
  var question = $("#pr2__question").text();
  var capital = currentPair["capital"];

  // Append new answer to beginning of array
  if (capital == userAnswer) {
    resultsArray.unshift({
      country: question,
      capital: capital,
      userAnswer: userAnswer,
      isCorrect: true
    });
  } else {
    resultsArray.unshift({
      country: question,
      capital: capital,
      userAnswer: userAnswer,
      isCorrect: false
    });
  }
  appendResultToHTML();
}

function newQuestion() {
  // Generate a random question and clear answer form
  var question = $("#pr2__question");
  var answer = $("#pr2__answer");
  var randNum = Math.floor(Math.random() * 170);
  currentPair = pairs[randNum];
  question.html(currentPair["country"]);
  answer.focus();
  answer.val("");
}

function appendResultToHTML() {
  var resHTML, userAnswer;
  var newResult = resultsArray[0];
  var country = newResult.country;
  var capital = newResult.capital;
  var isCorrect = newResult.isCorrect;

  // Create new HTML object depending on correctness
  if (isCorrect) {
    answer = '<i class="fa fa-check" aria-hidden="true"></i>';
    resHTML = `
      <tr class="result correct">
      <td>${country}</td>
      <td>${capital}</td>
      <td>${answer}<button id="deleteButton">Delete</button> </td>
      </tr>
      `;
  } else {
    userAnswer = newResult.userAnswer;
    resHTML = `
      <tr class="result incorrect">
      <td>${country}</td>
      <td><s>${userAnswer}<s></td>
      <td>${capital}<button id="deleteButton">Delete</button></td>
      </tr>
      `;
  }
  $("#filterSection").after(resHTML);

  // After dynamically creating delete button, add click function
  $("#deleteButton").click(function() {
    $(this)
      .parent()
      .parent()
      .remove();
  });
}
