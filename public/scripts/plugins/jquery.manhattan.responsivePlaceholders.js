/**

  Data mobile placeholder
--------------------------------------------------------

  Change the placeholder attribute value at a
  certain breakpoint.

  For instance, on large screens your placeholder
  might be "Enter your email address"

  On mobile, you might want "your email", for
  size reasons.

  NOTE: This should be altered to be mobile-first
  NOTE: This could be abstracted to affect any attribute

  data-attribute-at-desk="placeholder"
  data-attribute-value-at-desk="Enter Yor Email Address Here"

-----------------------------------------------------  */



/* Data mobile placeholder utility script
  ----------------------------------------------------------- */

// DEFINE PIXEL BREAKPOINT
// NOTE: It'd be nice to change this to an em breakpoint
var dataMobilePlaceholderBreakpoint = 500;

$("[data-mobile-placeholder]").each(function() {
  var input = $(this);
  input.attr("data-original-placeholder", input.attr("placeholder"));
});

$(window).on("load resize", function() {
  if ($(window).width() < dataMobilePlaceholderBreakpoint) {
    $("[data-mobile-placeholder]").each(function() {
      var input = $(this);
      input.attr("placeholder", input.attr("data-mobile-placeholder"));
    });
  } else {
    return $("[data-mobile-placeholder]").each(function() {
      var input = $(this);
      input.attr("placeholder", input.attr("data-original-placeholder"));
    });
  }
});