// This allows the Javascript code inside this block to only run when the page
// has finished loading in the browser.

$( document ).ready(function() {
  var country_capital_pairs = pairs;
  countryCapitalPair = updatePair();

  $('#pr2__submit').click(function() {
    countryCapitalPair = updatePair();
  });
});

function updatePair() {
  var question = $('#pr2__question');
  var answer = $('#pr2__answer');

  var randNum = Math.floor(Math.random() * 170);
  pair = pairs[randNum];
  question.html(pair['country']);
  answer.focus();
  answer.val('');
  return pair;
}