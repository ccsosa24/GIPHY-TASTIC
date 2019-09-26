var topics = ["Maleficent", "Scar", "Evil Queen", "Ursula", "Gaston"];

//$("#addTopicsBtn").on("Click", function(){
  //var topicsTyped =$("#textInputID").val()

////  if (topicsTyped.length !=0){
    //topics,push(topicsTyped)
 // }
//});

function refreshPage(){
  window.location.reload();
}



function addSearchBtns() {
  $("#buttons").html("");
  for (i = 0; i < topics.length; i++) {
    var $button = $("<input type='button' class='btn-sm search-btn btn' />");
    $button.val(topics[i]);
    $("#buttons").append($button);
  }
}

addSearchBtns();

$(document).on("click", ".btn", function () {
  $("#results").html("")

  var queryURL = "https://api.giphy.com/v1/gifs/search?";
  var query;
  var params = {
    q: query,
    limit: 12,
    api_key: "ZaR3MVWtPtzFKvd4jAVqiL7NcKCXVqau",
    fmt: "json"
  };

  if ($(this).hasClass("search-btn")) {
    query = $(this).val();
  }
  else if ($("#user-serach").val() !== "") {
    query = $("#user-search").val();
    topics.push(query);
    if (topics.length > 6) {
      topics.shift();
    }
    addSearchBtns();
   delete params.q;

  }

 

  params.q = query;

  $.ajax({
    url: queryURL + $.param(params),
    method: "GET",
    success: function (r) {
      for (i = 0; i < params.limit; i++) {
        // $('results').append('<img src=' + r.data[i] + ' style="display: inline-block;" class="img-responsive thumbnail"/> ');
        var $img = $("<img>");
        var $div = $("<div>");
        var $rating = $("<h6 style='color:whitesmoke;'>");    //font size for ratings
        var gifObj = r.data[i];
        var gif = gifObj.images;


        $img.attr({
          src: gif.fixed_height_still.url,
          "data-animate": gif.fixed_height.url,
          "data-still": gif.fixed_height_still.url,
          "data-state": "still",
          class: "gif",
        });

        $div.addClass("gif-box");
        $rating.text("Rating: " + gifObj.rating);
        $div.append($img, $rating);
        $("#results").append($div);

      }

      $(".gif").on("click", function() {
        var state = $(this).attr("data-state");
        if (state === "still") {
          $(this).attr("src", $(this).attr("data-animate"));
          $(this).attr("data-state", "animate");

        }
        else {
          $(this).attr("src", $(this).attr("data-still"));
          $(this).attr("data-state", "still");
        }
      });


    }
  });

  

});



