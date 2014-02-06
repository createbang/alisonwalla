/**

   @ Manhattan Utility Belt
----------------------------------------------------------------------------------

   Javascript for Manhattan Components

   Table of Contents

   - Toggles
   - Buttons

---------------------------------------------------------------------------------- */


$(function() {

 /*

    @toggles
  --------------------------------------------------------------------------------

    Toggle a class, if there is no data-target, the element itself gets that class
    toggled.

  -------------------------------------------------------------------------------- */

  $(".js-toggle").on("click", function(event) {
    event.preventDefault();
    var el = $(this),
        toggleState = el.attr("data-state");
    // If a target is specified
    if (el.attr("data-target")){
      // Target is the specified target
      var target = $(el.attr("data-target"));
    } else {
      // Else, target is the parent
      target = el;
    }
    target.toggleClass(toggleState);
  });





  /*

    @hide
  --------------------------------------------------------------------------------

    Hide, close buttons in alerts ect.

    Example: Close button in alerts
    <button type='button' class="btn--close" data-behavior='hide'>&times;</button>

  -------------------------------------------------------------------------------- */

  $("[data-behavior=hide]").on("click", function(event) {
    event.preventDefault();
    var el = $(this);
    // If a target is specified
    if (el.attr("data-target")){
      // Target is the specified target
      hideTarget = $(el.attr("data-target"));
    } else {
      // Target is the parent
      hideTarget = el.parent();
    }
    hideTarget.addClass("visually-hidden");
  });





  /* @buttons
  -------------------------------------------------------------------------------- */

  // Toggle text
  $("[data-toggle-text]").each(function(){
    var btn = $(this)
    btn.attr("data-original-text", btn.text());
    btn.on("click", function(){
      var thisBtn = $(this);
      if (thisBtn.text() == thisBtn.attr("data-original-text")){
        thisBtn.text(thisBtn.attr("data-toggle-text"));
      }
      else {
        thisBtn.text(thisBtn.attr("data-original-text"));
      }
    });
  });

  // Limit allowed number of clicks
  $("[data-allow-clicks]").each(function(){
    var btn = $(this);
    btn.attr("data-remaining-clicks", btn.attr("data-allow-clicks"));
    btn.on("click", function(event){
      var thisBtn = $(this),
          remainingClicks = parseInt(thisBtn.attr("data-remaining-clicks")),
          allowedClicks   = parseInt(thisBtn.attr("data-allow-clicks"));
      if (remainingClicks === allowedClicks) {
        thisBtn.addClass("no-click");
      }
      if (remainingClicks < allowedClicks){
        event.preventDefault();
      }
      else {
        thisBtn.attr("data-remaining-clicks", remainingClicks - 1);
      }
    });
  });


});
