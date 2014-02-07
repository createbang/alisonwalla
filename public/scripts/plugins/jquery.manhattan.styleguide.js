/**

  jQuery.manhattan.styleguide.js
--------------------------------------------------------

  This generates a styleguide based on comments in
  your CSS

  This is in-progress.  We still need to...

  1. Turn this into a jQuery function so we can do
     something like
     $("body").styleguide();

  2. Add the <style> tag with content from the styles
     located at the bottom of this file

  3. Eliminate the need for any markup in the target
     HTML file, this js should generate everything and
     be the only thing you need to create a styleguide

     <section class="sg container">

      <header class="sg-header">
        <nav class="sg-nav">
          <h1 class="sg-title">Styleguide</h1>
          <p class="sg-subtitle">Styleguide to show to use the Manhattan resources and to show how everything looks in this app</p>
          <ul class="sg-nav nav--list">
            <!-- filled with js -->
          </ul>
        </nav>
      </header>


        <main class="sg-main">
          <!-- filled with js -->
        </main>

    </section>

    <!-- Styleguide specific stylesheet -->
    <%= stylesheet_link_tag "styleguide" %>
    <!-- Styleguide js for prettyprint -->
    <script src="https://google-code-prettify.googlecode.com/svn/loader/run_prettify.js"></script>

-----------------------------------------------------  */





$(function(){

  // Hide site header and footer
  $(".site__header, .site__footer").hide();

  // If styleguide page NOTE: this would be better if this was a jquery plugin and this js could
  // be called on the body
  if($(".sg").length > 0) {

    // Empty out the target div
    $(".sg-main").empty();

    // Get the stylesheet
    var file_path = "/css/",
        file_name = "screen.css";
    $.get(file_path+file_name, null, function(data) {

      // Find all comments in css
      var comments = data.match(/\/\*[\s\S]*?\*\//g);

      // Define markup
      var markup                       = "";

      // Class line flag
      var flag_class_exists            = false;
      var section_active               = "";

      // For each comment
      $.each(comments, function(c){

        // Comment
        var comment = comments[c];

        // Reset lineFlags
        var flag_class                = false,
            flag_category             = false,
            flag_item                 = false,
            flag_example              = false,
            flag_description          = false,
            flag_class_partial        = false,
            flag_category_partial     = false,
            flag_paragraph            = "",
            processed_line            = "",
        // Reset description vars
            description               = "",
            example                   = "";


        // Split comment into lines
        commentLines = comments[c].split("\n");

        // For each line in this commment
        $.each(commentLines, function(l){

          var line = commentLines[l];

          // Class
          // -------------------------------------------
          // detect class
          if ( line == "/***") {
            flag_class = true;
            if (flag_class_exists) {
              markup += "</section>";
              section_active = "";
            } else {
              section_active = "is-active";
            }
            markup += "<section class='sg-section--class "+section_active+"' ";
            flag_class_exists = true;
            return true; // continues to next iteration
          }
          // while class is true
          if (flag_class == true){

            // if this line is empty, continue
            if(line.length < 1 ) {
              line = "";
              return true; // continues to next iteration
            }

            // if we come to a @waypoint title
            if (line.substring(0, 3) == "  @") {
              var slug = string_to_slug(line.substr(3));
              // complete class beginning markup
              markup += " id='"+slug+"'><h1 class='sg-class'>"+line.substr(3)+"</h1>";
              // add to nav
              $(".sg-nav__links").append("<li class='sg-nav__title'><a href='#"+slug+"'>"+line.substr(3)+"</a><li>");
              return true; // continues to next iteration
            }

            // begin description
            if(line.substr(0, 4) == "----" ) {
              flag_description = true;
              return true; // continues to next iteration
            }

            // close out the class and end description
            if(line.substr(0, -2) == "*/") {
              flag_class = false;
              flat_description = false;
              return true; // continues to next iteration
            }

          } // end creating a class



          // Categories
          // -------------------------------------------
          // detect category
          if ( line == "/**") {
            flag_category = true;
            return true; // continues to next iteration
          }
          // while category is true
          if (flag_category == true) {
            // if this line is empty, continue
            if(line.length < 1 ) {
              line = "";
            }
            // and if we come to a @waypoint title
            if (line.substring(0, 3) == "  @") {
              var slug = string_to_slug(line.substr(3));
              // define h2 markup
              markup += "<div class='sg-section--category'><h2 class='sg-section__title l-"+l+"'>"+line.substr(3)+"<a class='sg-category__anchor' id='"+slug+"'></a>";
              // add to sub nav
              $(".sg-nav__links").append("<li><a href='#"+line.substr(3)+"'>"+line.substr(3)+"</a><li>");
              return true; // continues to next iteration
            }

            // If making a partial, add to cat h2
            if (line.substr(0, 3) == "  _") {
              markup += "<span class='sg-partial sg-partial--class'>"+line+"</span></h2>";
              return true; // continues to next iteration
            }

            // begin description
            if(line.substr(0, 4) == "----" && l == 5) {
              flag_description = true;
              return true; // continues to next iteration
            }

            // close out the category and end description
            if(line.substr(0, -2) == "*/") {
              flag_category = false;
              markup += "</div>";
            }

          } // end if creating category


          // Item logic
          // -------------------------------------------
          if ( line.substring(0, 4) == "/* @") {
            // Remove those characters and create heading
            var slug = string_to_slug(line.substr(4));
            markup += "<h3 class='sg-subsection__title' id='"+slug+"'>"+line.substr(4)+"</h3>";
            flag_item = true;
            return true; // continues to next iteration
          }
          // while in item
          if(flag_item == true) {
            // begin description
            if(line.substr(0, 4) == "----") {
              flag_description = true;
              return true; // continues to next iteration
            }

            // close out the item and end description
            if(line.substr(0, -2) == "*/") {
              flag_item = false;
              flag_description = false;
              return true; // continues to next iteration
            }
          }


          // While in description
          // -------------------------------------------
          if(flag_description == true) {

            // Paragraphs
            // -----------------------------------------
            // If line is a separator
            if (line.substr(0, 4) == "----") {
              line = "";
              // console.log('line was separator');
              if(flag_paragraph == "open") {
                // console.log('separator: p was open');
                line = line + "</div>";
                flag_paragraph = "closed";
                // close out description
                flag_description = false;

              } else {
                // console.log('separator: p was not open');
                line = line + "";
                flag_paragraph = "closed";
                // console.log('separator: p is now closed');
              }
            }
            // If line is empty
            if (line.length < 1) {
              // console.log('empty line', 'pflag is', flag_paragraph);
              // if paragraph is open, close it
              if (flag_paragraph == "open") {
                // console.log('p was open');
                //line = "</div><div class='sg-desc was-open'>"+line;
              }
              // paragrph is closed, open it
              if (flag_paragraph == "closed") {
                // console.log('p was closed');
                //line = line+"<div class='sg-desc was-closed'>";
                flag_paragraph = "open";
                // console.log('p now open');
              }
              // if we're making an example, close example, add to examples
              if ( flag_example == true ) {
                // close example article and subsection
                example = example+"</article>";
                flag_example = false;
                // console.log('EXAMPLE', example.substr(0, 70));
                markup += example;
              }

            }

            // If line is not empty
            else {
              // If separator
              if(line.substr(4) == "----") {
                line = "";
              }

              // Example logic
              // -------------------------------------------
              if ( line.substr(0, 10) == "  Example:") {
                example = "";
                flag_example = true;
              }

              // if making an example and we're coding
              if ( flag_example == true ) {
                 if (line.substr(0, 10) == "  Example:") {
                    example = example+"<article class='sg-example' title='"+line+"'>";
                 } else {
                   example = example + line+"\n";
                 }
              }

            } // end if description line is not empty

            // append description if not example
            // -------------------------------------------
            if( flag_example == false) {
              // Process the line
              processed_line = "";
              var line_is_note = false;
              lines = line.split(" ");
              lines.forEach(function( word ){
                // wrap code
                if( word.substr(0,1) == ".") { word = "<code class='classname'>"+word+"</code>"; }
                if( word.substr(0,1) == "$") { word = "<code class='variable'>"+word+"</code>"; }
                if( word.substr(0,1) == "%") { word = "<code class='silent-classname'>"+word+"</code>"; }
                if( word.substr(0,4) == "http") { word = "<a href='"+word+"'>"+word+"</a>"; }
                if( word.substr(0,5) == "Note:") { word = "<b>"+word+"</b>"; }
                processed_line = processed_line + " " + word;
              });

              markup += processed_line;
            }
          } // end while in description

        }); // each line in comment

      }); // each comment

      // Close the last class
      console.log('closing last class');
      markup += "</section>";
      // Append markup
      console.log('appending markup');
      $(".sg-main").append(markup);


    });  // get stylesheet







    /* @helper functions
    --------------------------------------------------------
      Helper functions used in main script
    ------------------------------------------------------ */

    // Convert string to slug
    function string_to_slug(str) {
      str = str.replace(/^\s+|\s+$/g, ''); // trim
      str = str.toLowerCase();

      // remove accents, swap ñ for n, etc
      var from = "àáäâèéëêìíïîòóöôùúüûñç·/_,:;";
      var to   = "aaaaeeeeiiiioooouuuunc------";
      for (var i=0, l=from.length ; i<l ; i++) {
        str = str.replace(new RegExp(from.charAt(i), 'g'), to.charAt(i));
      }

      str = str.replace(/[^a-z0-9 -]/g, '') // remove invalid chars
        .replace(/\s+/g, '-') // collapse whitespace and replace by -
        .replace(/-+/g, '-'); // collapse dashes

      return str;
    }




     /* @styleguide hash
    --------------------------------------------------------
      Jump to hash if in url
    ------------------------------------------------------ */
    setTimeout(function(){
      if( location.hash ) {
        var desiredLocation = location.hash;
        location.hash = "";
        location.hash = desiredLocation;
        $("a[href="+desiredLocation+"]").addClass("active");
      }
    }, 500);


    /* @styleguide nav
    --------------------------------------------------------
      UI/Behavior for styleguide nav
    ------------------------------------------------------ */

    $("body").delegate(".sg-nav__links a", "click", function(){
      $(".sg-nav a.active").removeClass("active");
      $(this).addClass("active");
    });
    $("body").delegate(".sg-nav__links .sg-nav__title a", "click", function(){
      var target = $(this).attr("href");
      $(".sg-section--class").removeClass("is-active");
      $(".sg-section--class"+target).addClass("is-active");
    });




    /* @prettyprint
    --------------------------------------------------------
      Make the code examples purdy
    ------------------------------------------------------ */

    $(".prettyprint").each(function(){
      $this = $(this);
      $this.html( $this.html().replace(/</g,'&lt;') );
      $this.html( $this.html().replace(/>/g,'&gt;') );
    });




    /* @examples
    --------------------------------------------------------
      UI/Behavior for examples
    ------------------------------------------------------ */

    setTimeout(function(){
      $(".sg-example").each(function(){
        $this = $(this);
        $sgShowCodeEncoded = $this.html().replace(/>/g,'&gt;');
        $sgShowCodeEncoded = $sgShowCodeEncoded.replace(/</g,'&lt;');
        $sgShowCodeControl = $("<a href='#' class='sg-show-code__control'></a>");
        $sgShowCodeContent = $("<pre class='prettyprint sg-show-code__content'>"+$sgShowCodeEncoded+"</pre>");
        $this.append($sgShowCodeControl).append($sgShowCodeContent);
      });
      $(".sg-show-code__control").click(function(){
        $(this).toggleClass("active").next('.sg-show-code__content').toggleClass("active");
      });
    }, 500);



 } // end if .sg element exisist


}); // jquery on ready
