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
//hello aviel

$(document).ready(function() {
	showWelcome();
	context = canvas.getContext("2d");
	localStorage.setItem('p', 'p');
	ateMonster=false;
	song=new sound("resources/song.mp3");
	lives=5;
});

function KeyPressedDetective(event,a) {
	var x  = event.which|| event.keyCode;
	document.getElementById("result").innerHTML = "The Unicode value is: " + x;
	if(a==0)
		setting.right=x;
	else if(a==1)
		setting.left=x;
	else if(a==2)
		setting.down=x;
	else{
		setting.up=x;
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
		return(value>=60 );
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
			Start();
			showGame();
		}
});


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
	modal.style.display='block'
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

function CreateGhostsArray(){
	ghostArray=new Array();
	monster=new Object();
	for(let i=0;i<setting.monsters;i++){ //setting.monsters
		ghostArray[i]=new Object();
		if(i==0){
			ghostArray[i].x=0;
			ghostArray[i].y=0;
			monster.x=0;
			monster.y=1;
		}
		else if(i==1){
			ghostArray[i].x=9;
			ghostArray[i].y=9;
		}
		else if(i==2){
			ghostArray[i].x=9;
			ghostArray[i].y=0;
		}
		else if(i==3){
			ghostArray[i].x=0;
			ghostArray[i].y=9;
		}
	}
}

function Start() {
	board = new Array();
	score = 0;
	pac_color = "yellow";
	CreateGhostsArray();
	song.play();
	var cnt = 100;
	var food_remain = setting.balls;
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
			} else{
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
					if((i!=9&&j!=9)||(i!=0&&j!=0)||(i!=0&&j!=9)||(i!=9&&j!=0)) {
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
	while (board[i][j] != 0 ) {
		i = Math.floor(Math.random() * 9 + 1);
		j = Math.floor(Math.random() * 9 + 1);
	}
	return [i, j];
}

function findRandomFoodCell(board) {
	var i = Math.floor(Math.random() * 9 + 1);
	var j = Math.floor(Math.random() * 9 + 1);
	while (board[i][j] != 0 ||board[i][j]!=4) {
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
	lblLives.value=lives;
	lblUsername.value=username;
	for (var i = 0; i < 10; i++) {
		for (var j = 0; j < 10; j++) {
			var center = new Object();
			center.x = i * 60 + 30;
			center.y = j * 60 + 30;
			if((setting.monsters>0 && ghostArray[0].x==i &&ghostArray[0].y==j )||
				(setting.monsters>1 && ghostArray[1].x==i &&ghostArray[1].y==j ) ||
				(setting.monsters>2 && ghostArray[2].x==i &&ghostArray[2].y==j) ||
				(setting.monsters>2 && ghostArray[3].x==i &&ghostArray[3].y==j) ){
				context.beginPath();
				let ghostImage=new Image();
				ghostImage.src="resources/ghost.jpg";
				context.drawImage(ghostImage,center.x-15,center.y-15,40,40);
			}
			else if(!ateMonster&&monster.x==i&&monster.y==j){
				context.beginPath();
				let monsterImage=new Image();
				monsterImage.src="resources/monster.jpg";
				context.drawImage(monsterImage,center.x-15,center.y-15,40,40);
			}

			else if (board[i][j] == 2) {
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
				context.fillStyle = setting.firstcolor; //color of the food
				context.fill();
			} else if (board[i][j] == 4) {
				context.beginPath();
				context.rect(center.x - 30, center.y - 30, 60, 60);
				context.fillStyle = "grey"; //color of abstcile
				context.fill();
			}
			else if (board[i][j] == 5) {
			context.beginPath();
			context.arc(center.x, center.y, 15, 0, 2 * Math.PI); // circle
			context.fillStyle = setting.secondcolor; //color of the food
			context.fill();
		}else if (board[i][j] == 6) {
			context.beginPath();
			context.arc(center.x, center.y, 15, 0, 2 * Math.PI); // circle
			context.fillStyle = setting.thirdcolor; //color of the food
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
			UpdateGhostPosition();
			moveMonster();
		}
	}
	if (x == 2) {
		if (shape.j < 9 && board[shape.i][shape.j + 1] != 4) {
			shape.j++;
			angle=x;
			UpdateGhostPosition();
			moveMonster();
		}
	}
	if (x == 3) {
		if (shape.i > 0 && board[shape.i - 1][shape.j] != 4) {
			shape.i--;
			angle=x;
			UpdateGhostPosition();
			moveMonster();
		}
	}
	if (x == 4) {
		if (shape.i < 9 && board[shape.i + 1][shape.j] != 4) {
			shape.i++;
			angle=x;
			UpdateGhostPosition();
			moveMonster();
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
	for(let i=0;i<setting.monsters;i++){
		if(ghostArray[i].x !=9 && checkIfWall(ghostArray[i].x+1,ghostArray[i].y ) && shape.i>ghostArray[i].x){
			ghostArray[i].x=ghostArray[i].x+1;
			checkPacman();
		}else if (ghostArray[i].y !=0 && checkIfWall(ghostArray[i].x,ghostArray[i].y-1) && shape.j<ghostArray[i].y){
			ghostArray[i].y=ghostArray[i].y-1;
			checkPacman();
		}
		else if (ghostArray[i].x !=0 && checkIfWall(ghostArray[i].x-1,ghostArray[i].y ) && shape.i<ghostArray[i].x){
			ghostArray[i].x=ghostArray[i].x-1;
			checkPacman();
		}
		else if(ghostArray[i].y !=9 && checkIfWall(ghostArray[i].x,ghostArray[i].y+1 ) && shape.j>ghostArray[i].y){
			ghostArray[i].x=ghostArray[i].y+1;
			checkPacman();
		}
	}
}
	function checkPacman() {
		for(let i=0;i<setting.monsters;i++){
			if(ghostArray[i].x==shape.i&&ghostArray[i].y==shape.j){
				board[shape.i][shape.j] = 0;
				score=score-10;
				lives--;
				let emptyCell=findRandomEmptyCell(board);
				shape.i=emptyCell[0];
				shape.j=emptyCell[1];
				board[shape.i][shape.j] = 2;
				CreateGhostsArray();
				break;
			}
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
$('#manual-ajax').click(function(event) {
	event.preventDefault();
	this.blur(); // Manually remove focus from clicked link.
	$.get(this.href, function(html) {
		$(html).appendTo('body').modal();
	});
});


function getRandomInt(max) {
	return Math.floor(Math.random() * Math.floor(max));
}

function moveMonster(){
	while(1) {
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

function newGame(){
	endGame();
	Start();
	lives=5;
	score=0;
}

function endGame() {
	window.clearInterval(interval);
	song.stop();
}

function checkIfWall(i,j) {
	if(i<0 ||i>9 ||j<0 || j>9)
		return false;
	if(board[i][j]!==4){
		return true;
	}
	return false;
}

function sound(src) {
	this.sound = document.createElement("audio");
	this.sound.src = src;
	this.sound.loop=true;
	this.sound.setAttribute("preload", "auto");
	this.sound.setAttribute("controls", "none");
	this.sound.style.display = "none";
	document.body.appendChild(this.sound);
	this.play = function(){
		this.sound.play();
	}
	this.stop = function(){
		this.sound.pause();
	}
}
