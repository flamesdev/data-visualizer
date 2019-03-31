"use strict";

var screenID = null;

var titleElement;
window.onload = function () {
	titleElement = document.getElementById("title");
};

var json;
$.getJSON("https://raw.githubusercontent.com/flamesdev/data-visualizer/master/data.json", function (data) {
	json = data;
	maxIndex = json.Datasets.length - 1;
	for (var i = 0; i < json.Datasets.length; i++)
		CreateScreen(i);
	UpdateScreen(0);
	document.body.style.visibility = "visible";
});

var maxIndex;
document.addEventListener("keydown", (event) => {
	if (event.keyCode === 37)
		if (screenID - 1 >= 0)
			UpdateScreen(screenID - 1);
		else
			UpdateScreen(maxIndex);
	if (event.keyCode === 39)
		NextScreen();
});

function NextScreen() {
	if (screenID + 1 <= maxIndex)
		UpdateScreen(screenID + 1);
	else
		UpdateScreen(0);
}

function CreateScreen(id) {
	var screen = document.createElement("div");
	screen.id = "screen" + id;
	screen.className = "screen";
	var datasetData = json.Datasets[id];
	var data = datasetData.Dataset;
	var iconset = json.Iconsets[datasetData.IconsetID];
	var max = data[0].Value;
	data.forEach(item => {
		var p = document.createElement("p");
		p.innerHTML = item.Name + " - " +
			NumberToText(parseInt(item.Value * datasetData.Scale), datasetData.BeginRound, datasetData.ToDecimal);

		var div = document.createElement("div");
		div.style.width = item.Value / max * 100 + "%";
		div.className = "bar";

		var span = document.createElement("span");

		var icon = document.createElement("img");
		if (iconset != null) {
			var iconDir = "icons/" + iconset.Directory + "/";
			if (iconset.Items.includes(item.Name))
				icon.src = iconDir + item.Name + ".svg";
			else
				icon.src = iconDir + "Blank.svg";
		}

		span.appendChild(icon);
		span.appendChild(p);

		screen.appendChild(span);
		screen.appendChild(div);
		screen.style.visibility = "hidden";
		screen.style.display = "none";
	});

	var button = document.createElement("button");
	button.innerHTML = "Next";
	button.onclick = NextScreen;

	screen.appendChild(button);

	document.body.append(screen);
}

function UpdateScreen(newValue) {
	if (screenID != null) {
		var screen = document.getElementById("screen" + screenID);
		screen.style.visibility = "hidden";
		screen.style.display = "none";
	}
	screenID = newValue;
	title.innerHTML = json.Datasets[screenID].Name;
	var screen = document.getElementById("screen" + screenID);
	screen.style.visibility = "visible";
	screen.style.display = "block";
}

var suffixes = ['', 'K', 'M', 'B', 'T']

function NumberToText(number, beginRound, decimal) {
	var length = number.toString().length;
	var id = Math.trunc((length - 1) / 3);
	console.log(id + "|" + beginRound);
	number /= Math.pow(10, id * 3);
	if (beginRound != null && id - 1 >= beginRound)
		return TruncateToDecimals(number, decimal) + suffixes[id];
	else
		return Math.trunc(number) + suffixes[id];
}

function TruncateToDecimals(number, decimal) {
	var pow = Math.pow(10, decimal);
	return Math.trunc(number * pow) / pow;
}

const ItemData = class {
	constructor(Name, Value) {
		this.Name = Name;
		this.Value = Value;
	}
}