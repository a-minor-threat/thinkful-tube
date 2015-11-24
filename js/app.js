$(document).ready(function () { 
	// This function gets the data from the YouTube API and displays it on the page
	function getResults(searchTerm) {
		$.getJSON("https://www.googleapis.com/youtube/v3/search",
			{
				"part": "snippet",
				"key": "AIzaSyCY22HWrK9gjuAsxV8aMbINCozaypD8sWo",
				"q": searchTerm,
				"maxResults": 50
			},
			function (data) {
				if (data.pageInfo.totalResults == 0) {
					alert("Nothing! Please search for something else.");
				}
				// If no results, empty the list
				displayResults(data.items);
			}
		);
	}

	//Display results in ul
	function displayResults(videos) {
		var html = "";
		$.each(videos, function (index, video) {
			// Append results li to ul
			html = html + "<li><p class='line-clamp'>" + video.snippet.title +
				"</p><a target='_blank' href='https://www.youtube.com/watch?v=" + video.id.videoId + "'><img src='" +  video.snippet.thumbnails.high.url + "'/></a></li>" ;
		});
		$("#search-results ul").html(html);
	}

	//Use search term
	$("#search-form").submit(function (event) {
		event.preventDefault();
		getResults($("#search-term").val());
	});
});