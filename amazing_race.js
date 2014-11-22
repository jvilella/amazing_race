$(document).ready(function() {	

	function buildFlickerUrl(p) {
		var url = "https://farm";
		url += p.farm;
		url += ".staticflickr.com/"
		url += p.server;
		url += "/";
		url += p.id;
		url += "_";
		url += p.secret;
		url += ".jpg";
		
		return url;
	}



// event listener  
var iPlayer1 = 60;
var iPlayer2 = 60;
var win = false;
var gameStart = false;
var count = 5;
var counter = 0;
//var start_time = new Date();
//var end_time = new Date();

//$(".player1").css("visibilaty:hidden");
//$(".player2").css("visibilaty:hidden");
	function anim() {
			    if (count > 0) {
			    	$("h2").text("");
			        $("<h2></h2>").text(count).appendTo($("body"));
			        count--;
			        setTimeout(anim, 700);
			    }
			    else {
			    	$("h2").text("");
			        $("<h2></h2>").text("START").appendTo($("body"));
			        $("h2").css("background-color","green");
			        return false;		        
			    }
			}

	$(".pl1").click(function() {
		var newUrlFlickerPlayer1 = "https://www.flickr.com/services/rest/?method=flickr.photos.search&format=json&api_key=4ef070a1a5e8d5fd19faf868213c8bd0&nojsoncallback=1&text="+$("#player1Picture").val();
			
			$.get(newUrlFlickerPlayer1, function(response) { 
    			for (var i=0; i<6; i++) {
    				var picture = buildFlickerUrl(response.photos.photo[i]);
    				$("img").eq(i).attr('src',picture);
    				$("input.player1Avatar1").eq(i).val(picture);
    			}
			});
	});
	$(".pl2").click(function() {
		var newUrlFlickerPlayer2 = "https://www.flickr.com/services/rest/?method=flickr.photos.search&format=json&api_key=4ef070a1a5e8d5fd19faf868213c8bd0&nojsoncallback=1&text="+$("#player2Picture").val();
			
			$.get(newUrlFlickerPlayer2, function(response) { 
    			for (var i=0; i<6; i++) {
    				var picture2 = buildFlickerUrl(response.photos.photo[i]);
    				$("img").eq(6+i).attr('src',picture2);
    				$("input.player2Avatar1").eq(i).val(picture2);
    			}
			});
	});
	$("#players").submit(function() {
			$(".playersNames").addClass("hidden");
			var player1Name = $("#player1Name").val();
			var player2Name = $("#player2Name").val();
			$(".player1").append("<p>"+player1Name+"</p>");
			$(".player2").append("<p>"+player2Name+"</p>");
			$(".player1").append("<img src="+$("input.player1Avatar1:checked").val()+">");
			$(".player2").append("<img src="+$("input.player2Avatar1:checked").val()+">");
			anim();
			gameStart = true;
			return false;
		
	});

	$("body").keydown(function(event) {
		$("h2").addClass("hidden");
		var myInterval = setInterval(function () {
  			++counter;
		}, 1000);
		if (gameStart === true) {
			if (win === true) {
				return false;
			} else if (event.which === 83) {
				iPlayer1 = iPlayer1 + 10;
				$(".player1").css({"margin-left":iPlayer1+"px"});
				//$(".player-1 td").eq(iPlayer1-1).removeClass('active');
				//$(".player-1 td").eq(iPlayer1).addClass('active');
				//iPlayer1 = iPlayer1 + 10;
				if (iPlayer1 === 1000) {
					$("<h1></h1>").text($(".player1 p").text()+" is the winner with a time of:"+counter+" milliseconds").appendTo($("body"));
					iPlayer1 = 0;
					win = true;
					clearInterval(myInterval);
				}
				
			} else if (event.which === 76) {
				iPlayer2 = iPlayer2 + 10;
				$(".player2").css({"margin-left":iPlayer2+"px"});
				//$(".player-2 td").eq(iPlayer2-1).removeClass('active');
				//$(".player-2 td").eq(iPlayer2).addClass('active');
				//iPlayer2 = iPlayer2 + 1;
				if (iPlayer2 === 1000) {
					$("<h1></h1>").text($(".player2 p").text()+" is the winner with a time of:"+counter+" milliseconds").appendTo($("body"));
					iPlayer2 = 0;
					win = true;
					clearInterval(myInterval);
				}
			}
		}
	});
});



