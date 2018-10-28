// This allows the Javascript code inside this block to only run when the page
// has finished loading in the browser.
var currentPair; 

$( document ).ready(function() {
  var country_capital_pairs = pairs;
  updatePair();

  $('#pr2__submit').click(function() {
    evaluateAnswer();
    updatePair();
  });
});

function evaluateAnswer() {
  var answer = $('#pr2__answer').val();
  console.log('answer: ' + answer);
  console.log('capital: ' + currentPair['capital']);
  if (currentPair['capital'] == answer) {
    console.log('correcteroni');
  }
  else {
    console.log('wrongo');
  }
}

function updatePair() {
  var question = $('#pr2__question');
  var answer = $('#pr2__answer');

  var randNum = Math.floor(Math.random() * 170);
  currentPair = pairs[randNum];
  question.html(currentPair['country']);
  answer.focus();
  answer.val('');
}