var context;
var shape = new Object();
var board;
var score;
var pac_color;
var start_time;
var time_elapsed;
var interval;
var welcome;
var menu;
var register;
var login;
var registrationButton;
var loginButton;
var setting =new Object();
var modal;
var angle;
var game;
var settings;
//hello aviel

$(document).ready(function() {
	showWelcome();
	showGame();
	localStorage.setItem('p','p');
	localStorage.setItem("aviel","avitaf");
	welcome=document.getElementById("welcome");
});

function KeyPressedDetective(event) {
	var x = event.which|| event.keyCode;
	document.getElementById("result").innerHTML = "The Unicode value is: " + x;
}


$(function() {
	// Initialize form validation on the registration form.
	// It has the name attribute "registration"

	jQuery.validator.addMethod("lettersOnly", function(value, element) {
		return this.optional(element) || /^[a-z]+$/i.test(value);
	}, "Letters only please");
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
				lettersOnly:true
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
	$("form[name='settings']").validate({
		rules: {
			// The key name on the left side is the name attribute
			// of an input field. Validation rules are defined
			// on the right side
			right: {
				required:true,
			},
			left: {
				required:true,
			},
			up: {
				required: true,
			},
			down: {
				required: true,
			},
			firstcolor:{
				required:true
			},
			secondcolor:{
				required:true
			},
			thirdcolor:{
				required:true
			},
			Balls:{
				required:true,
				BallsNumberConstarint:true
			},
			tme:{
				required:true,
				TimeConstratint:true
			},
			Mons:{
				required:true,
				MonstConstraint:true
			}
		},
		// Specify validation error messages
		messages: {
			right: "Please enter Value",
			left: "Please enter Value",
			up: "Please enter Value",
			down: "Please enter Value",
			firstcolor: "Please enter a Value",
			secondcolor: "Please enter a Value",
			thirdcolor: "Please enter a Value",
			Balls: "Please enter a user name (Minmium :50 , Max:90)",
			tme: "Please enter a valid number (Minmum :60 secs)",
			Mons:"Please enter a valid number in the range of (Minmium :1 , Max:4)"
		},

		// Make sure the form is submitted to the destination defined
		// in the "action" attribute of the form when valid

	});
	$.validator.addMethod("BallsNumberConstarint",function(value){
		return(value<=90 && value>=50);
	});
	$.validator.addMethod("TimeConstratint",function(value){
		return(value>=60 );
	});
	$.validator.addMethod("MonstConstraint",function(value){
		return(value>=1 && value<=4 );
	});

});



function hideAllDivs() {
	var divs = document.getElementsByTagName("div");
	menu=document.getElementById("menu");
	for (var i = 0; i < divs.length; i++) {
		divs[i].style.display = 'none';
	}
	menu.style.display='block';
}

function showRegistration(){
	hideAllDivs();
	register=document.getElementById("register");
	register.style.display='block';
}

function showLogin(){
	hideAllDivs();
	login=document.getElementById("login");
	login.style.display='block';
}

function showWelcome(){
	hideAllDivs();
	welcome=document.getElementById("welcome");
	welcome.style.display='block';
}

function showAbout() {
	modal=document.getElementById("modal");
	modal.style.display='block'
	modal.showModal();
}

function showSettings() {
	hideAllDivs();
	settings=document.getElementById("setting");
	settings.style.display='block'
}
function showGame() {
	hideAllDivs();
	game=document.getElementById("score");
	game.style.display='block';
	game=document.getElementById("game");
	game.style.display='block';
	game=document.getElementById("time");
	game.style.display='block';
	context = canvas.getContext("2d");
	Start();
}


function addUser() {
	if($("#regForm").valid()) {
		let user = document.getElementById("user");
		let pass = document.getElementById("pass");
		localStorage.setItem(user.value, pass.value);
	}
}
function UploadSetting(){
	if($("#settings").valid()) {
		setting.left = document.getElementById("left").value;
		setting.up = document.getElementById("up").value;
		setting.right = document.getElementById("right").value;
		setting.down = document.getElementById("down").value;
		setting.firstcolor = document.getElementById("firstcolor").value;
		setting.secondcolor = document.getElementById("secondcolor").value;
		setting.thirdcolor = document.getElementById("thirdcolor").value;
		setting.time = document.getElementById("tme").value;
		setting.monsters = document.getElementById("Mons").value;
		setting.balls = document.getElementById("Balls").value;
		showGame();
	}
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
				showSettings();
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




function Start() {
	board = new Array();
	score = 0;
	pac_color = "yellow";
	var cnt = 100;
	var food_remain = 50;
	var junkfood=Math.round(food_remain*60/100);
	var food=Math.round(food_remain*30/100);
	var superfood=Math.round(food_remain*10/100);
	var pacman_remain = 1;
	while(junkfood+superfood+food>food_remain)
		junkfood--;
	while(junkfood+superfood+food<food_remain)
		junkfood++;
	start_time = new Date();
	for (var i = 0; i < 10; i++) {
		board[i] = new Array();
		//put obstacles in (i=3,j=3) and (i=3,j=4) and (i=3,j=5), (i=6,j=1) and (i=6,j=2)
		for (var j = 0; j < 10; j++) {
			if (
				(i == 1 && j == 1) ||
				(i == 2 && j == 1) ||
				(i == 4 && j == 1) ||
				(i == 5 && j == 1) ||
				(i == 6 && j == 1) ||
				(i == 8 && j == 1) ||
				(i == 9 && j == 1) ||
				(i == 1 && j == 3) ||
				(i == 3 && j == 3) ||
				(i == 4 && j == 3) ||
				(i == 6 && j == 3) ||
				(i == 7 && j == 3) ||
				(i == 9 && j == 3) ||
				(i == 4 && j == 4) ||
				(i == 4 && j == 5) ||
				(i == 6 && j == 4) ||
				(i == 6 && j == 5) ||
				(i == 0 && j == 5) ||
				(i == 9 && j == 5) ||
				(i == 1 && j == 7) ||
				(i == 2 && j == 7) ||
				(i == 3 && j == 7) ||
				(i == 2 && j == 8) ||
				(i == 6 && j == 7) ||
				(i == 7 && j == 7) ||
				(i == 8 && j == 7) ||
				(i == 7 && j == 8)
			) {
				board[i][j] = 4;
			} else {
				var randomNum = Math.random();
				if (randomNum <= (1.0 * food_remain) / cnt) {
					let randfood=getRandomInt(3);
					food_remain--;
					if(randfood==0) {
						board[i][j] = 1;
						junkfood--;
					}
					else if (randfood==1){
						board[i][j] = 5;
						food--;
					}
					else{
						board[i][j] = 6;
						superfood--;
					}
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
		if(junkfood>0) {
			board[emptyCell[0]][emptyCell[1]] = 1;
			junkfood--;
		}
		else if(food>0) {
			board[emptyCell[0]][emptyCell[1]] = 5;
			food--;
		}
		else if(superfood>0) {
			board[emptyCell[0]][emptyCell[1]] = 6;
			superfood--;
		}
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
				let angles=pacmanAngles();
				context.beginPath();
				context.arc(center.x, center.y, 30, angles[0] * Math.PI, angles[1] * Math.PI); // half circle
				context.lineTo(center.x, center.y);
				context.fillStyle = pac_color; //color
				context.fill();
				context.beginPath();
				context.arc(center.x + 5, center.y - 15, 5, 0, 2 * Math.PI); // circle
				context.fillStyle = "blue"; //color of packman eye
				context.fill();
			} else if (board[i][j] == 1) {
				context.beginPath();
				context.arc(center.x, center.y, 15, 0, 2 * Math.PI); // circle
				context.fillStyle = "black"; //color of the food
				context.fill();
			} else if (board[i][j] == 4) {
				context.beginPath();
				context.rect(center.x - 30, center.y - 30, 60, 60);
				context.fillStyle = "grey"; //color of abstcile
				context.fill();
			}
			else if (board[i][j] == 3) {
				context.beginPath();
				context.rect(center.x - 30, center.y - 30, 60, 60);
				context.fillStyle = "red"; //color of abstcile
				context.fill();
			}
			else if (board[i][j] == 5) {
			context.beginPath();
			context.arc(center.x, center.y, 15, 0, 2 * Math.PI); // circle
			context.fillStyle = "orange"; //color of the food
			context.fill();
		} else if (board[i][j] == 6) {
			context.beginPath();
			context.arc(center.x, center.y, 15, 0, 2 * Math.PI); // circle
			context.fillStyle = "green"; //color of the food
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
			angle=x;
		}
	}
	if (x == 2) {
		if (shape.j < 9 && board[shape.i][shape.j + 1] != 4) {
			shape.j++;
			angle=x;
		}
	}
	if (x == 3) {
		if (shape.i > 0 && board[shape.i - 1][shape.j] != 4) {
			shape.i--;
			angle=x;
		}
	}
	if (x == 4) {
		if (shape.i < 9 && board[shape.i + 1][shape.j] != 4) {
			shape.i++;
			angle=x;
		}
	}
	if (board[shape.i][shape.j] == 1) {
		score=score+5;
	}
	if (board[shape.i][shape.j] == 5) {
		score=score+15;
	}
	if (board[shape.i][shape.j] == 6) {
		score=score+25;
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

	function pacmanAngles(){
		let angles=[];
		if(angle==1){
			angles[0]=1.8
			angles[1]=3.4
		}
		else if(angle==2){
			angles[0]=0.7
			angles[1]=2.3
		}
		else if(angle==3){
			angles[0]=1.25
			angles[1]=2.85
		}
		else{
			angles[0]=0.15
			angles[1]=1.85
		}
	return angles;
	}


function getRandomInt(max) {
	return Math.floor(Math.random() * Math.floor(max));
}
