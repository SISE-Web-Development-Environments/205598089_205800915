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
var setting =new Object();
var modal;
var angle;
var game;
var settingsDisplay;
var ghostArray;
var monster;
var ateMonster;
var lives;
var song;
var username;
var clock;
var ateClock;
//hello aviel
$(document).ready(function() {
	showWelcome();
	context = canvas.getContext("2d");
	localStorage.setItem('p', 'p');
	ateMonster=false;
	ateClock=false;
	song=new sound("resources/song.mp3");
	lives=5;
});
function CheckArrow(x){
	return x>=37 &&x<=40;
}

function KeyPressedDetective(event,a) {
	var x  = event.which|| event.keyCode;
	document.getElementById("result").innerHTML = "The Unicode value is: " + x;
	if(a==0) {
		setting.right = x;
		if(CheckArrow(x)){
			$('#right').val(getStringFromKeyCode(x));
		}
	}
	else if(a==1) {
		setting.left = x;
		if(CheckArrow(x)){
			$('#left').val(getStringFromKeyCode(x));
		}
	}
	else if(a==2) {
		setting.down = x;
		$('#down').val(getStringFromKeyCode(x));
	}
	else{
		setting.up=x;
		$('#up').val(getStringFromKeyCode(x));
	}
}
function getStringFromKeyCode(num){
	if(num==38)
		return "Arrow Up";
	else if(num==39)
		return "Arrow Right";
	else if(num==40)
		return "Arrow Down";
	else if(num==37)
	return "Arrow Left";
	else{
		return String.fromCharCode(num);
	}
}
function RegValid(){
	$.validator.addMethod("lettersOnly", function(value, element) {
		return this.optional(element) || /^[a-z]+$/i.test(value);
	});
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
		submitHandler: function (form) {
			addUser();
			showLogin();
		}


		// Make sure the form is submitted to the destination defined
		// in the "action" attribute of the form when vali

	});

}
function SettingValidate(){
	$.validator.addMethod("BallsNumberConstarint",function(value){
		return(value<=90 && value>=50);
	});
	$.validator.addMethod("TimeConstratint",function(value){
		return value>=60;
	});
	$.validator.addMethod("MonstConstraint",function(value){
		return(value>=1 && value<=4 );
	});
	$("form[name='settings']").validate({
		rules: {
			// The key name on the left side is the name attribute
			// of an input field. Validation rules are defined
			// on the right side
			right: {
				required: true,
			},
			left: {
				required: true,
			},
			up: {
				required: true,
			},
			down: {
				required: true,
			},
			firstcolor: {
				required: true
			},
			secondcolor: {
				required: true
			},
			thirdcolor: {
				required: true
			},
			Balls: {
				required: true,
				BallsNumberConstarint: true
			},
			tme: {
				required: true,
				TimeConstratint: true
			},
			Mons: {
				required: true,
				MonstConstraint: true
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
			Mons: "Please enter a valid number in the range of (Minmium :1 , Max:4)"
		},
		submitHandler: function (form) {
			UploadSetting();
			UpdateStaticSetting();
			Start();
			showGame();
		}
	});

}
function UpdateStaticSetting(){
	$("movementchosen").append("  Up: "+getStringFromKeyCode(setting.up)+"  | Down: "+getStringFromKeyCode(setting.down)
		+" |  Right: "+getStringFromKeyCode(setting.right)+" | Left: "+getStringFromKeyCode(setting.left)+" .");
	$("ballschosen").append(setting.balls+".");
	$("monsterschosen").append(setting.monsters+".");
	$("timechosen").append(setting.time+".");
	$("color1").css({backgroundColor: setting.firstcolor});
	$("color3").css({backgroundColor: setting.thirdcolor});
	$("color2").css({backgroundColor: setting.secondcolor});
}


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
	modal.style.display='block';
	modal.showModal();
}

function showSettings() {
	hideAllDivs();
	settingsDisplay=document.getElementById("setting");
	settingsDisplay.style.display='block';
}
function showGame() {
	hideAllDivs();
	game=document.getElementById("score");
	game.style.display='block';
	game=document.getElementById("game");
	game.style.display='block';
	game=document.getElementById("time");
	game.style.display='block';
	game=document.getElementById("ChosenSetting");
	game.style.display='block';

}


function addUser() {
	let user = document.getElementById("user");
	let pass = document.getElementById("pass");
	localStorage.setItem(user.value, pass.value);
}
function UploadSetting(){
	setting.firstcolor = document.getElementById("firstcolor").value;
	setting.secondcolor = document.getElementById("secondcolor").value;
	setting.thirdcolor = document.getElementById("thirdcolor").value;
	setting.time = document.getElementById("tme").value;
	setting.monsters = document.getElementById("Mons").value;
	setting.balls = document.getElementById("Balls").value;

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
				username=txtbox1.value;
				alert(txtbox1.value+" Welcome , you have login succecsfully");

			});
		}
		else{
			alert(txtbox1.value+" Welcome , your Password is incorrect");
		}
	}else {
		alert(" Welcome , your UserName is incorrect");
	}
}

function CreateGhostsArray(){
	ghostArray=new Array();
	monster=new Object();
	for(let x=0;x<4;x++){ //setting.monsters
		ghostArray[x]=new Object();
		if(x<setting.monsters){
		if(x==0){
			ghostArray[x].x=0;
			ghostArray[x].y=0;
			monster.x=0;
			monster.y=1;
		}
		else if(x==1){
			ghostArray[x].x=9;
			ghostArray[x].y=9;
		}
		else if(x==2){
			ghostArray[x].x=9;
			ghostArray[x].y=0;
		}
		else if(x==3){
			ghostArray[x].x=0;
			ghostArray[x].y=9;
		}
	}else {
			ghostArray[x].x=-100000;
			ghostArray[x].y=-100000;
		}

	}

}

function Start() {
	board = new Array();
	score = 0;
	pac_color = "yellow";
	clock=new Object();
	CreateGhostsArray();
	//song.play();
	var cnt = 100;
	var food_remain = setting.balls;
	var junkfood = Math.round(food_remain * 60 / 100);
	var food = Math.round(food_remain * 30 / 100);
	var superfood = Math.round(food_remain * 10 / 100);
	var pacman_remain = 1;
	while (junkfood + superfood + food > food_remain)
		junkfood--;
	while (junkfood + superfood + food < food_remain)
		junkfood++;
	start_time = new Date();
	for (var i = 0; i < 10; i++) {
		board[i] = new Array();
		//put obstacles in (i=3,j=3) and (i=3,j=4) and (i=3,j=5), (i=6,j=1) and (i=6,j=2)
		for (var j = 0; j < 10; j++) {
			if (
				(i == 1 && j == 1) ||
				(i == 2 && j == 1) ||

				(i == 8 && j == 1) ||
				(i == 9 && j == 1) ||

				(i == 3 && j == 3) ||
				(i == 6 && j == 3) ||

				(i == 9 && j == 3) ||

				(i == 6 && j == 5) ||

				(i == 7 && j == 8)
			) {
				board[i][j] = 4;
			} else {
				var randomNum = Math.random();
				if (randomNum <= (1.0 * food_remain) / cnt) {
					let randfood = getRandomInt(3);
					food_remain--;
					if (randfood == 0) {

								board[i][j] = 1;
							junkfood--;

					} else if (randfood == 1) {
							board[i][j] = 5;
							food--;
					} else if(randfood==2) {
						board[i][j] = 6;
						superfood--;
					}
				} else if (randomNum < (1.0 * (pacman_remain + food_remain)) / cnt) {
					if ((i != 9 && j != 9) || (i != 0 && j != 0) || (i != 0 && j != 9) || (i != 9 && j != 0)) {
						shape.i = i;
						shape.j = j;
						pacman_remain--;
						board[i][j] = 2;
					}
				} else {
					board[i][j] = 0;
				}
				cnt--;
			}
		}
	}
	while (food_remain > 0) {
		var emptyCell = findRandomEmptyCell(board);
		if(food_remain==1){
			board[emptyCell[0]][emptyCell[1]] = 7;
			food_remain--;
			clock.i=emptyCell[0];
			clock.j=emptyCell[1];
			break;
		}
		if (junkfood > 0) {
			board[emptyCell[0]][emptyCell[1]] = 1;
			junkfood--;
		} else if (food > 0) {
			board[emptyCell[0]][emptyCell[1]] = 5;
			food--;
		} else if (superfood > 0) {
			board[emptyCell[0]][emptyCell[1]] = 6;
			superfood--;
		}
		food_remain--;
	}
	keysDown = {};
	addEventListener(
		"keydown",
		function (e) {
			keysDown[e.keyCode] = true;
			e.preventDefault();
		},
		false
	);
	addEventListener(
		"keyup",
		function (e) {
			keysDown[e.keyCode] = false;
			e.preventDefault();
		},
		false
	);
	interval = setInterval(UpdatePosition, 250);
}



function findRandomEmptyCell(board) {
	var i = Math.floor(Math.random() * 9 + 1);
	var j = Math.floor(Math.random() * 9 + 1);
	while (board[i][j] != 0 && i<=9 && j<=9 ) {
		i = Math.floor(Math.random() * 9 + 1);
		j = Math.floor(Math.random() * 9 + 1);
	}
	return [i, j];
}


function GetKeyPressed() {
	if (keysDown[setting.up]) {
		return 1;
	}
	if (keysDown[setting.down]) {
		return 2;
	}
	if (keysDown[setting.left]) {
		return 3;
	}
	if (keysDown[setting.right]) {
		return 4;
	}
}
function Draw() {
	canvas.width = canvas.width; //clean board
	lblScore.value = score;
	lblTime.value = time_elapsed;
	lblLives.value = lives;
	lblUsername.value = username;
	for (var i = 0; i < 10; i++) {
		for (var j = 0; j < 10; j++) {
			var center = new Object();
			center.x = i * 60 + 30;
			center.y = j * 60 + 30;
			if ((setting.monsters > 0 && ghostArray[0].x == i && ghostArray[0].y == j) ||
				(setting.monsters > 1 && ghostArray[1].x == i && ghostArray[1].y == j) ||
				(setting.monsters > 2 && ghostArray[2].x == i && ghostArray[2].y == j) ||
				(setting.monsters > 3 && ghostArray[3].x == i && ghostArray[3].y == j)) {
				context.beginPath();
				let ghostImage = new Image();
				ghostImage.src = "resources/ghost.jpg";
				context.drawImage(ghostImage, center.x - 15, center.y - 15, 40, 40);
			} else if (!ateMonster && monster.x == i && monster.y == j) {
				context.beginPath();
				let monsterImage = new Image();
				monsterImage.src = "resources/monster.jpg";
				context.drawImage(monsterImage, center.x - 15, center.y - 15, 40, 40);
			} else if (board[i][j] == 2) {
				let angles = pacmanAngles();
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
				context.fillStyle = setting.firstcolor; //color of the food
				context.fill();
			} else if (board[i][j] == 4) {
				context.beginPath();
				context.rect(center.x - 30, center.y - 30, 60, 60);
				context.fillStyle = "grey"; //color of abstcile
				context.fill();
			} else if (board[i][j] == 5) {
				context.beginPath();
				context.arc(center.x, center.y, 15, 0, 2 * Math.PI); // circle
				context.fillStyle = setting.secondcolor; //color of the food
				context.fill();
			} else if (board[i][j] == 6) {
				context.beginPath();
				context.arc(center.x, center.y, 15, 0, 2 * Math.PI); // circle
				context.fillStyle = setting.thirdcolor; //color of the food
				context.fill();
			} else if (board[i][j] == 7 &&ateClock==false) {
				context.beginPath();
				let clockImage = new Image();
				clockImage.src = "resources/clock.jpg";
				context.drawImage(clockImage, center.x - 15, center.y - 15, 40, 40);
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
			UpdateGhostPosition();
			moveMonster();
			if(shape.i==clock.i&&shape.j==clock.j &&ateClock==false){
				ateClock=true;
				setting.time=setting.time+20;
			}
		}
	}
	if (x == 2) {
		if (shape.j < 9 && board[shape.i][shape.j + 1] != 4) {
			shape.j++;
			angle=x;
			UpdateGhostPosition();
			moveMonster();
			if(shape.i==clock.i&&shape.j==clock.j &&ateClock==false){
				ateClock=true;
				setting.time=setting.time+20;
			}
		}
	}
	if (x == 3) {
		if (shape.i > 0 && board[shape.i - 1][shape.j] != 4) {
			shape.i--;
			angle=x;
			UpdateGhostPosition();
			moveMonster();
			if(shape.i==clock.i&&shape.j==clock.j &&ateClock==false){
				ateClock=true;
				setting.time=setting.time+20;
			}
		}
	}
	if (x == 4) {
		if (shape.i < 9 && board[shape.i + 1][shape.j] != 4) {
			shape.i++;
			angle=x;
			UpdateGhostPosition();
			moveMonster();
			if(shape.i==clock.i&&shape.j==clock.j &&ateClock==false){
				ateClock=true;
				setting.time=setting.time+20;
			}
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
	if(shape.i==monster.x&&shape.j==monster.y&&ateMonster==false){
		ateMonster=true;
		score=score+50;
	}
	// for(let i=0;i<setting.monsters;i++){
	// 	if(ghostArray[i].x==shape.i&&ghostArray[i].y==shape.j){
	// 		board[shape.i][shape.j] = 0;
	// 		score=score-10;
	// 		lives--;
	// 		 let emptyCell=findRandomEmptyCell(board);
	// 		 shape.i=emptyCell[0];
	// 		 shape.j=emptyCell[1];
	// 		board[shape.i][shape.j] = 2;
	// 		 CreateGhostsArray();
	// 		 break;
	// 	}
	// }
	if (score >= 20 && time_elapsed <= 10) {
		pac_color = "green";
	}
	else if(time_elapsed>=setting.time || lives==0){
		endGame();
		if(lives==0)
			window.alert("Loser!");
		else if(score<100)
			window.alert("You are better than "+score+" points!");
		else
			window.alert("Winner!!!");
	}
	else {

			Draw();
	}
}

function UpdateGhostPosition(){
	for(let z=0;z<setting.monsters;z++) {
		if (ghostArray[z].x < 9 && board[ghostArray[z].x + 1] [ghostArray[z].y]!=4 && shape.i > ghostArray[z].x &&
			!checkIfGhostInThisPosition(ghostArray[z].x + 1, ghostArray[z].y)) {
			ghostArray[z].x = ghostArray[z].x + 1;
			checkPacman();
		} else if (ghostArray[z].y > 0 && board[ghostArray[z].x] [ghostArray[z].y - 1]!=4 && shape.j < ghostArray[z].y &&
			!checkIfGhostInThisPosition(ghostArray[z].x, ghostArray[z].y - 1)) {
			ghostArray[z].y = ghostArray[z].y - 1;
			checkPacman();
		} else if (ghostArray[z].y < 9 && board[ghostArray[z].x] [ghostArray[z].y + 1]!=4 && shape.j > ghostArray[z].y &&
			!checkIfGhostInThisPosition(ghostArray[z].x, ghostArray[z].y + 1)) {
			ghostArray[z].y = ghostArray[z].y + 1;
						checkPacman();
					}
		else if (ghostArray[z].x >0 && board[ghostArray[z].x-1] [ghostArray[z].y]!=4 && shape.i < ghostArray[z].y &&
			!checkIfGhostInThisPosition(ghostArray[z].x-1, ghostArray[z].y)) {
			ghostArray[z].y = ghostArray[z].x - 1;
			checkPacman();}
				}
			}
			function checkPacman() {
				for (let i = 0; i < setting.monsters; i++) {
					if (ghostArray[i].x == shape.i && ghostArray[i].y == shape.j) {
						board[shape.i][shape.j] = 0;
						score = score - 10;
						lives--;
						let emptyCell = findRandomEmptyCell(board);
						shape.i = emptyCell[0];
						shape.j = emptyCell[1];
						board[shape.i][shape.j] = 2;
						CreateGhostsArray();
						break;
					}
				}
			}
			function pacmanAngles() {
				let angles = [];
				if (angle == 1) {
					angles[0] = 1.8;
					angles[1] = 3.4;
				} else if (angle == 2) {
					angles[0] = 0.7;
					angles[1] = 2.3;
				} else if (angle == 3) {
					angles[0] = 1.25;
					angles[1] = 2.85;
				} else {
					angles[0] = 0.15;
					angles[1] = 1.85;
				}
				return angles;
			}


			function getRandomInt(max) {
				return Math.floor(Math.random() * Math.floor(max));
			}

			function checkIfGhostInThisPosition(x, y, ghostnum) {
				for (let k = 0; k < setting.monsters; k++) {
					if (ghostnum != k && ghostArray[k].x == x && ghostArray[k].y == y)
						return true;
				}
				return false;
			}


			function moveMonster() {
				while (1) {
					let random = getRandomInt(4);
					if (random == 0 && checkIfWall(monster.x + 1, monster.y)) {
						monster.x = monster.x + 1;
						return;
					}
					if (random == 1 && checkIfWall(monster.x - 1, monster.y)) {
						monster.x = monster.x - 1;
						return;
					}
					if (random == 2 && checkIfWall(monster.x, monster.y + 1)) {
						monster.y = monster.y + 1;
						return;
					}
					if (random == 3 && checkIfWall(monster.x, monster.y - 1)) {
						monster.y = monster.y - 1;
						return;
					}
				}
			}

			function newGame() {
				endGame();
				Start();
				lives = 5;
				score = 0;
			}

			function endGame() {
				window.clearInterval(interval);
				song.stop();
			}

			function checkIfWall(i, j) {
				if (i < 0 || i > 9 || j < 0 || j > 9)
					return false;
				if (board[i][j] !== 4) {
					return true;
				}
				return false;
			}

			function sound(src) {
				this.sound = document.createElement("audio");
				this.sound.src = src;
				this.sound.loop = true;
				this.sound.setAttribute("preload", "auto");
				this.sound.setAttribute("controls", "none");
				this.sound.style.display = "none";
				document.body.appendChild(this.sound);
				this.play = function () {
					this.sound.play();
				}
				this.stop = function () {
					this.sound.pause();
				}
			}


			function closeModal() {
				var modal= document.getElementById("About");
				modal.style.display="none";
			}
function randommateSetting(){
 setting.monsters=randomOneToFour();
 setting.firstcolor=getRandomColor();
 setting.secondcolor=getRandomColor();
 setting.thirdcolor=getRandomColor();
 setting.balls=randomBallNumber();
 setting.time=randomTime();
 setting.left=RandomKeyCode();
 setting.right=RandomKeyCode();
 while(setting.left==setting.right){
	 setting.right=RandomKeyCode();
 }
 setting.down=RandomKeyCode();
 while (setting.left == setting.down || setting.right == setting.down){
 	setting.down=RandomKeyCode();
 }
 setting.up=RandomKeyCode();
 while (setting.up==setting.down ||setting.up==setting.left || setting.up==setting.right) {
	 setting.up = RandomKeyCode();
 }
 UpdateStaticSetting();
	Start();
	showGame();
}
function randomOneToFour(){
	return Math.floor(Math.random() * 4) + 1;
}
function getRandomColor() {
	var letters = '0123456789ABCDEF';
	var color = '#';
	for (var i = 0; i < 6; i++) {
		color += letters[Math.floor(Math.random() * 16)];
	}
	return color;
}

			function randomBallNumber(){
				return getRandomInt(41)+50;
			}

			function randomTime(){
				return getRandomInt(80000)+60;
			}


			function RandomKeyCode() {
				let numbers=getRandomInt(10)+48;
				let letters=getRandomInt(26)+65;
				let arrows=getRandomInt(4)+37;
				let randomChooser=getRandomInt(3);

				if(randomChooser==0)
					return numbers;
				if(randomChooser==1)
					return letters;
				if(randomChooser==2)
					return arrows;

			}

