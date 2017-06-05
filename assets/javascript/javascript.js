var terms =["The Virgin Suicides", "Lost in Translation", "Marie Antoinette", "Palo Alto", "Tree of Life", "Apocalypse Now", "Blue Velvet", "Stoker"];

window.onload = (function(){

	function buttonDisplay() {
		$('#buttons').empty();
		console.log('Buttons displayed');
		for (i = 0; i < terms.length; i++) {
			var giphyButtons = $('<button></button>  ');
			giphyButtons.addClass("searchThis");
			giphyButtons.addClass("btn");
			giphyButtons.addClass("btn-warning");
			giphyButtons.attr("data-name", terms[i]);
			giphyButtons.text(terms[i]);
			$('#buttons').append(giphyButtons);
			
		}
	}

	$('#buttons').on('click', '.searchThis', function (){
		$('.giphys').empty();
		console.log(this);
		console.log('This was clicked.');
		console.log($(this).data("name"));
		var name = $(this).attr("data-name");
      	var queryURL = "http://api.giphy.com/v1/gifs/search?q=" +
        name + "&api_key=dc6zaTOxFJmzC&limit=10";

        $.ajax({
        	url: queryURL,
        	method: "GET"
        })
        .done(function(response){
        	console.log(response);
        	var output = response.data;
        	for (var i = 0; i < output.length; i++) {
        		var giphyDiv = $('<div class="item">');
        		var rating = output[i].rating;
        		var p = $('<p>').text("Rating: " + rating);
        		var termImage = $("<img>");
        		termImage.attr("src", output[i].images.fixed_height_still.url);
        		termImage.attr('data-still', output[i].images.fixed_height_still.url);
        		termImage.attr('data-animate', output[i].images.fixed_height.url);
        		termImage.attr('data-state', 'still');
        		termImage.addClass("gif");
        		giphyDiv.prepend(p);
        		giphyDiv.prepend(termImage);

        		$('.giphys').append(giphyDiv);
        	}
        })
	});

	$('.giphys').on('click', '.gif', function(){
		var state = $(this).data('state');
		console.log('This data state is: ' + state);

		if (state === 'still'){
			$(this).attr('src', $(this).data('animate'));
			$(this).data('state', 'animate');
		} else {
			$(this).attr('src', $(this).data('still'));
			$(this).data('state', 'still');
		}

	})

	$('#submit').on('click', function(event){
		event.preventDefault();
		var newterm = $('#search').val().trim();
		terms.push(newterm);
		buttonDisplay();
	});

	buttonDisplay();

})




