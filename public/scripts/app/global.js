/**

  @global javascript
--------------------------------------------------------

  Global js, plugin settings etc.

-----------------------------------------------------  */

$(function(){


  // Resize gallery thumbs
  // ----------------------------------------------------
  function resizeGalleryThumbs() {
    if ($(window).width() > 768) {
      var el = $(".js-gallery-thumbs"),
          siblingGridHeight = el.parents(".g").siblings(".g").height(),
          headingHeight = el.position().top;
      console.log("GALLERY THUMBS", "siblingGridHeight", siblingGridHeight, "headingHeight", headingHeight);
      $(".js-gallery-thumbs").css({
        "height": siblingGridHeight - headingHeight,
        "overflow": "auto"
      });
    }
    else {
      $(".js-gallery-thumbs").css({
        "height": "auto",
        "overflow": "visible"
      });
    }
  }

  // Initialize Gallery Thumbs
  $(window).smartresize(function(){
    resizeGalleryThumbs();
  });
  resizeGalleryThumbs();


});
