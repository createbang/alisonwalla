/**

  Zoom Base Font Size
--------------------------------------------------------

  In this app, all measurements are in rem units when possible
  and relate to the HTML element.  The HTML element has a
  minimum font-size of 62.5% at 768px viewport width.  The
  font-size value will respond as the viewport's width
  resizes. In effect, it resizes everything that uses rem units,
  and since the images are set to be 100% width, the result is a
  nice responsive experience where it almost appears that the site
  zooms in and out, as opposed to flexing content to the viewport.

-----------------------------------------------------  */

// DEFINE IF ZOOM BASE FONT SIZE IS USED
var useZoomBaseFontSize = false;

function zoomBaseFontSize(){
  // we want this to be 62.5 up until 1300
  var $win = $(window),
      minWidth = 1300,
      fontSizeAtMinWidth = 62.5,
      maxWidth = 1800,
      fontSizeAtMaxWidth = 85;
      zoomCoefficient = minWidth / fontSizeAtMinWidth,
      newFontSize = $(window).width() / zoomCoefficient;
  // Zoom of larger than minWidth
  if($win.width() > minWidth){
    // Don't zoom if less than than maxWidth
    if($win.width() < maxWidth){
      $("html").css("font-size", newFontSize+"%");
    } else {
      $("html").css("font-size", fontSizeAtMaxWidth+"%");
    }
  }
  else {
    $("html").css("font-size", fontSizeAtMinWidth+"%");
  }
}
if(useZoomBaseFontSize){
  zoomBaseFontSize();
}



/* On Dom Ready
--------------------------------------------------------- */

$(function(){


  // Zoom Resizing
  // ----------------------------------
  if(useZoomBaseFontSize){
    $(window).resize(function(){
      zoomBaseFontSize();
    });
  }

});