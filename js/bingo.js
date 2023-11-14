const machine = document.getElementById('bingo-machine')
const button = document.getElementById('bingButton')
const numList = document.getElementById('pres-numbers')
var bingoNumList = [];

for (var i = 1; i <= 99; i++) {
   bingoNumList.push(i);
}

for(let i = bingoNumList.length - 1; i > 0; i--){
  const j = Math.floor(Math.random() * i)
  const temp = bingoNumList[i]
  bingoNumList[i] = bingoNumList[j]
  bingoNumList[j] = temp
}

function bingo(){
	var num = machine.getAttribute('data-number')
	disableButton()
	if (num < 0){
		generateNumber()
	} else {
		saveNumber(num)
		generateNumber()
	}
}

function saveNumber(num){
	var li = document.createElement("li")
	li.appendChild(document.createTextNode(num))
	numList.appendChild(li)
}

function generateNumber(){
	machine.innerHTML="<img class='img-fluid' src='img/machine.gif'>"
	window.setTimeout(function() {
		fillNum()
		enableButton()
  	}, 6000); 
}

function getRandomNum(){
	var popped = bingoNumList.pop()
	return popped
}

function fillNum(num){
	var num = getRandomNum()
	machine.innerHTML = "<span class='circle'>" + num.toString() + "</span>";
	playNumberSound(num)
	document.getElementById('num' + num).innerHTML = num
	machine.setAttribute('data-number', num)
}

function disableButton(){
	button.innerHTML = "Picking up next number......"
	button.disabled = true
	button.removeAttribute("onclick")
}

function enableButton(){
	button.innerHTML = 'Get next number'
	button.disabled = false
	button.onclick = bingo
}

function playNumberSound(num) {
	var x = document.createElement("audio");
	x.setAttribute("src", "sounds/en_num_" + num.toString() + ".mp3")
	x.setAttribute("controls", "controls")
	x.autoplay = true;
	x.hidden = true;
	document.body.appendChild(x);
}

function tableCreate() {
	var div = document.getElementById("internal");
	var table = document.createElement("table");
	div.appendChild(table);
	table.style.width = '50px'
	var rowLength = 10;
	var colLength = 10;

	for (var i = 0; i < rowLength; i++) {

		var rows = document.createElement("td");
		table.appendChild(rows);

		for (var j = 0; j < colLength; j++) {

			var columns = document.createElement("tr");
			var text = document.createTextNode(i + j * rowLength + 1);
			columns.appendChild(text);
			rows.appendChild(columns);
		}
	}
}

// window.onbeforeunload = function() {
//         return "Refreshing the website will restart the game, continue?";
//     }