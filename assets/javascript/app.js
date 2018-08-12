$(document).ready(function()
{
    var sportsArray = ["Soccer", "Archery", "Badminton", "Pickleball", "Ping Pong", "Volleyball", "Basketball", "Baseball", "Cricket", "Kickball", "Wiffleball", "Skateboarding", "Snowboarding", "Surfing", "Wakeboarding", "Dodgeball", "Pocket Billiards", "Snooker", "American Football", "Golf", "Handball", "Ice Hockey", "Skiing", "Snowboarding", "Lacrosse"]

    
    for(var i = 0; i < sportsArray.length; i++)
    {
        var newButton = $("<button>");
        newButton.attr
        (
            {
                "type": "button",
                "class": "btn btn-primary buttonMargin",
                "data-sport": sportsArray[i]
            }
        );
        newButton.text(sportsArray[i]);
        $("#buttonsHere").append(newButton);
    }

    $("button").on("click", function()
    {
        var sport = $(this).attr("data-sport");
        var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=wyzjfv91gXzOwS3rqmZNiHLTXWRTxD1b&q=" + sport + "&limit=10";
    
        console.log(queryURL);

        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function(response)
        {
            console.log(response);
            var results = response.data;

            for(var i = 0; i < results.length; i++)
            {
                var cardDiv = $("<div>");
                cardDiv.attr(
                {
                    "class": "card",
                    "style": "width: 18rem;"
                });
    
                var sportGifStill = $("<img>");
                sportGifStill.attr(
                {
                    "class": "card-img-top gif",
                    "alt": "Card image cap",
                    "src": results[i].images.fixed_height_still.url,
                    "data-still": results[i].images.fixed_height_still.url,
                    "data-animate": results[i].images.fixed_height.url,
                    "data-state": "still"
                });
    
                var cardBodyDiv = $("<div>");
                cardBodyDiv.attr("class", "card-body");
    
                var rating = results[i].rating;
                var ratingTitle = $("<h5>").text("Rating: " + rating);
                ratingTitle.attr("class", "card-title");
    
                cardBodyDiv.append(ratingTitle);
                cardDiv.append(sportGifStill);
                cardDiv.append(cardBodyDiv);

                $("#gifContent").prepend(cardDiv);
            }
        });
    });

    

    // $(".gif").on("click", function ()
    // {
    //     console.log("poop");
    //     var state = $(this).attr("data-state");

    //     if(state == "still")
    //     {
    //         $(this).attr
    //         (
    //         {
    //             "src":$(this).attr("data-animate"), 
    //             "data-state":"animate"
    //         }
    //         );
    //     }
    //     else
    //     {
    //         $(this).attr({"src":$(this).attr("data-still"), "data-state":"still"});
    //     }
    // });
});