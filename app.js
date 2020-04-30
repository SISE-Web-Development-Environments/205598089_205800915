var context;
var shape = new Object();
var board;
var score;
var pac_color;
var start_time;
var time_elapsed;
var interval;
var localStorage;
var modal=document.getElementById("modal")


$(document).ready(function() {
	context = canvas.getContext("2d");
	localStorage.setItem('p','p');
	localStorage.setItem("aviel","avitaf");
	Start();
});





$(function() {
	// Initialize form validation on the registration form.
	// It has the name attribute "registration"

	$("form[name='registration']").validate({
		// Specify validation rules
		rules: {
			// The key name on the left side is the name attribute
			// of an input field. Validation rules are defined
			// on the right side
			user: {
				required:true,
			},
			name: {
				required:true,
			},
			mail: {
				required: true,
				// Specify that email should be validated
				// by the built-in "email" rule
				email: true,
			},
			pass: {
				required: true,
				minlength: 6,
				number:true
			},
			bday:{
				required:true
			}
		},
		// Specify validation error messages
		messages: {
			name: "Please enter your name",
			user: "Please enter a user name",
			pass: {
				required: "Please provide a password",
				minlength: "Your password must be at least 6 characters long"
			},
			mail: "Please enter a valid email address",
			bday:"Please enter a valid date "
		},
		// Make sure the form is submitted to the destination defined
		// in the "action" attribute of the form when valid

	});
});

function aboutOpen() {
	modal.style.display="block";
}


// Loginnnnnnnnnnnnn
function UserAndPassConfirm(){
	var txtbox1=document.getElementById("txtbox1");
	var txtbox2=document.getElementById("txtbox2");
	if(localStorage.getItem(txtbox1.value)!=null){
		//user exists
		if(localStorage.getItem(txtbox1.value)==txtbox2.value){
			//the user and password correct
			$(document).ready(function(){
				alert(txtbox1.value+" Welcome , you have login succecsfully");
				//$("plogin").append(" <b>"+txtbox1.value+" Welcome , you have login succecsfully</b>.");
				});
		}
		else{
			alert(txtbox1.value+" Welcome , your Password is incorrect");
		}
	}else {
		alert(" Welcome , your UserName is incorrect");
	}
}
/////// colors picker
$( function() {
	function hexFromRGB(r, g, b) {
		var hex = [
			r.toString( 16 ),
			g.toString( 16 ),
			b.toString( 16 )
		];
		$.each( hex, function( nr, val ) {
			if ( val.length === 1 ) {
				hex[ nr ] = "0" + val;
			}
		});
		return hex.join( "" ).toUpperCase();
	}
	function refreshSwatch() {
		var red = $( "#red" ).slider( "value" ),
			green = $( "#green" ).slider( "value" ),
			blue = $( "#blue" ).slider( "value" ),
			hex = hexFromRGB( red, green, blue );
		$( "#swatch" ).css( "background-color", "#" + hex );
	}

	$( "#red, #green, #blue" ).slider({
		orientation: "horizontal",
		range: "min",
		max: 255,
		value: 127,
		slide: refreshSwatch,
		change: refreshSwatch
	});
	$( "#red" ).slider( "value", 255 );
	$( "#green" ).slider( "value", 140 );
	$( "#blue" ).slider( "value", 60 );
} );

function addUser() {
	var user = document.getElementById("user").value;
	var pass = document.getElementById("pass").value;
	localStorage.setItem(user,pass)
}


function Start() {
	board = new Array();
	score = 0;
	pac_color = "yellow";
	var cnt = 100;
	var food_remain = 50;
	var pacman_remain = 1;
	start_time = new Date();
	for (var i = 0; i < 10; i++) {
		board[i] = new Array();
		//put obstacles in (i=3,j=3) and (i=3,j=4) and (i=3,j=5), (i=6,j=1) and (i=6,j=2)
		for (var j = 0; j < 10; j++) {
			if (
				(i == 3 && j == 3) ||
				(i == 3 && j == 4) ||
				(i == 3 && j == 5) ||
				(i == 6 && j == 1) ||
				(i == 6 && j == 2)
			) {
				board[i][j] = 4;
			} else {
				var randomNum = Math.random();
				if (randomNum <= (1.0 * food_remain) / cnt) {
					food_remain--;
					board[i][j] = 1;
				} else if (randomNum < (1.0 * (pacman_remain + food_remain)) / cnt) {
					shape.i = i;
					shape.j = j;
					pacman_remain--;
					board[i][j] = 2;
				} else {
					board[i][j] = 0;
				}
				cnt--;
			}
		}
	}
	while (food_remain > 0) {
		var emptyCell = findRandomEmptyCell(board);
		board[emptyCell[0]][emptyCell[1]] = 1;
		food_remain--;
	}
	keysDown = {};
	addEventListener(
		"keydown",
		function(e) {
			keysDown[e.keyCode] = true;
		},
		false
	);
	addEventListener(
		"keyup",
		function(e) {
			keysDown[e.keyCode] = false;
		},
		false
	);
	interval = setInterval(UpdatePosition, 250);
}

function findRandomEmptyCell(board) {
	var i = Math.floor(Math.random() * 9 + 1);
	var j = Math.floor(Math.random() * 9 + 1);
	while (board[i][j] != 0) {
		i = Math.floor(Math.random() * 9 + 1);
		j = Math.floor(Math.random() * 9 + 1);
	}
	return [i, j];
}

function GetKeyPressed() {
	if (keysDown[38]) {
		return 1;
	}
	if (keysDown[40]) {
		return 2;
	}
	if (keysDown[37]) {
		return 3;
	}
	if (keysDown[39]) {
		return 4;
	}
}

function Draw() {
	canvas.width = canvas.width; //clean board
	lblScore.value = score;
	lblTime.value = time_elapsed;
	for (var i = 0; i < 10; i++) {
		for (var j = 0; j < 10; j++) {
			var center = new Object();
			center.x = i * 60 + 30;
			center.y = j * 60 + 30;
			if (board[i][j] == 2) {
				context.beginPath();
				context.arc(center.x, center.y, 30, 0.15 * Math.PI, 1.85 * Math.PI); // half circle
				context.lineTo(center.x, center.y);
				context.fillStyle = pac_color; //color
				context.fill();
				context.beginPath();
				context.arc(center.x + 5, center.y - 15, 5, 0, 2 * Math.PI); // circle
				context.fillStyle = "black"; //color
				context.fill();
			} else if (board[i][j] == 1) {
				context.beginPath();
				context.arc(center.x, center.y, 15, 0, 2 * Math.PI); // circle
				context.fillStyle = "black"; //color
				context.fill();
			} else if (board[i][j] == 4) {
				context.beginPath();
				context.rect(center.x - 30, center.y - 30, 60, 60);
				context.fillStyle = "grey"; //color
				context.fill();
			}
		}
	}
}

function UpdatePosition() {
	board[shape.i][shape.j] = 0;
	var x = GetKeyPressed();
	if (x == 1) {
		if (shape.j > 0 && board[shape.i][shape.j - 1] != 4) {
			shape.j--;
		}
	}
	if (x == 2) {
		if (shape.j < 9 && board[shape.i][shape.j + 1] != 4) {
			shape.j++;
		}
	}
	if (x == 3) {
		if (shape.i > 0 && board[shape.i - 1][shape.j] != 4) {
			shape.i--;
		}
	}
	if (x == 4) {
		if (shape.i < 9 && board[shape.i + 1][shape.j] != 4) {
			shape.i++;
		}
	}
	if (board[shape.i][shape.j] == 1) {
		score++;
	}
	board[shape.i][shape.j] = 2;
	var currentTime = new Date();
	time_elapsed = (currentTime - start_time) / 1000;
	if (score >= 20 && time_elapsed <= 10) {
		pac_color = "green";
	}
	if (score == 50) {
		window.clearInterval(interval);
		window.alert("Game completed");
	} else {
		Draw();
	}
}

