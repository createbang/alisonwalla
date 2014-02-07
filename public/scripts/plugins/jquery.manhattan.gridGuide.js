/**

   Manhattan Grid Guide
--------------------------------------------------------

  Show grid guides by pressing the 'g' key
  Highlight other things somehow - haha - todo

  NOTE: The relative CSS for this plugin should be in 4_modules/_grid-guide.scss

-----------------------------------------------------  */

// ADD MARKUP TO PAGE
$("body").prepend("<section class='mnhttn-grid-guide'><div class='mnhttn-grid-guide__baselines'></div><div class='container'></div></section>");
$(".mnhttn-grid-guide .container").append("<div class='gw sm-six-up md-twelve-up'/>");
var i = 0,
    glines = "";
while( i < 12) {
  i++;
  glines += "<div class='g'><div></div></div>";
}

var i = 0,
    blines = "";
while( i < 800) {
  i++;
  blines += "<div class='mnhttn-grid-guide__baseline'></div>";
}

$(".mnhttn-grid-guide .container .gw").append(glines);
$(".mnhttn-grid-guide .mnhttn-grid-guide__baselines").append(blines);

// TOGGLE ACTIVE CLASS
$(document).keypress(function(e){
  console.log('keypress', e.which);
  if(e.which == 103) {
    $(".mnhttn-grid-guide").toggleClass("is-active");
  }
});