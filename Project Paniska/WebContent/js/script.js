var channelName = 'amielskie1';
var vidWidth = '320';
var vidHeight = '180';
var maxVidResults = '20';
var videoTitle= 'title';
var videoId ="0000";
var videoDesc ="description";
var filterKeyword = "paniska";
	
$(document).ready(function() {
	
	// Hide contents of youtube player div when not being used.
	document.getElementById("youtubePlayer").style.visibility = "hidden";
	
	$.get(
		"https://www.googleapis.com/youtube/v3/channels", {
			part: 'contentDetails',
			forUsername: channelName,
			key: 'AIzaSyDL43K350UOkRgLo-_i4Kys2WsnrT4ekTE'},
			
			function(data){

				$.each(data.items, function(i , item){
					//console.log(item);
					pid = item.contentDetails.relatedPlaylists.uploads;
					getVids(pid);
				});
				
			}
		
	); // get 
	
	function getVids(pid){
		
		$.get(
				"https://www.googleapis.com/youtube/v3/playlistItems", {
					part: 'snippet',
					maxResults: maxVidResults,
					playlistId: pid,
					key: 'AIzaSyDL43K350UOkRgLo-_i4Kys2WsnrT4ekTE'},
					
					function(data){
						var output;
						output = '<ul data-role="listview" data-filter="true" data-inset="true">';
						$.each(data.items, function(i , item){
							//console.log(item);
							
							// Video variables
							videoTitle = item.snippet.title;
							videoId = item.snippet.resourceId.videoId;
							videoDesc = item.snippet.description;
							videoThumbnail = item.snippet.thumbnails.standard.url;
							
							
							// Filter the results to be display
							// indexOf returns -1 if no match is found on the strings
							var x = videoTitle.indexOf(filterKeyword);
							var y = videoDesc.indexOf(filterKeyword);
							
							if(x >= 0 || y >= 0){
								// Passing values to youtubePlayer Page
								output += '<li><a href="#youtubePlayer" data-rel="dialog" data-transition="pop" onClick="playVideo(\''+ videoTitle +'\', \''+ videoId +'\', \''+ videoDesc +'\')">';
								
								// Link Properties
								output += '<img src="'+videoThumbnail+'"  alt = "'+videoTitle+'"/>';
								output += '<h3>'+ unescape(videoTitle) +'</h3>';
								output += '<p>'+ unescape(videoDesc) +'</p>';
								output += '<p class="ui-li-count">00:00</p>';
								output += '</a></li>';			
							}
						
						});
						
						output += '</ul>';
						$('#videoResults').html(output);
					}
				
			); // get function
		
	} // function getVids
	
	
	// use window.playVideo = function to avoid undefined reference on "onclick= playVideo"
	window.playVideo = function (videoTitle,videoId,videoDesc){
		var output;
		output = '<h3>'+ unescape(videoTitle) +'</h3>';
		output += '<iframe width = "'+vidWidth+'" height = "'+vidHeight +'" src=\"//www.youtube.com/embed/'+videoId +'\"> ';
		output += '<iframe/>';
		output += '<br><p><i>'+ unescape(videoDesc)+'</i</p><p></p>';
		
		$("#myPlayer").html(output);
		// Show the contents of youtubePlayer div
		document.getElementById("youtubePlayer").style.visibility = "visible";
		
		
	}; // playVIdeo function
	
});// Document ready


function jsonFlickrFeed(data){
	console.log(data);
	
	var output = '';
	
	for(var i = 0; i < data.items.length; i++ ){
		
		// Image variables
		var title = data.items[i].title;
		var link = data.items[i].media.m;
		var modLink = link.replace("m.jpg" , "q.jpg");
		var blocktype = 
				((i%3)===2) ? 'c' :
					((i%3)===1) ? 'b':
						'a';
		
		output += '<div class="ui-block-' + blocktype + '" >';
		output += '<a href = "#photoViewer" data-transition="pop" onClick="showPhoto(\''+link+'\', \''+title+'\')">';
		output += '<img src = "' + modLink + '" alt = "' + title + '" />';
		output += '</a>'
		output += '</div>';
		// Goes through image
		
	}// for loop
	$('#photoList').html(output);
	
}// jsonFlickFeed function



	function showPhoto(link,title){
		var output = '<a href = "#photos" data-transition="fade">';
		var modLink = link.replace("m.jpg" , "c.jpg");
		output += '<img src = "' + modLink + '" alt = "' + title + '" />';
		output += '</a>';
		$('#viewPhoto').html(output);
		
	}















