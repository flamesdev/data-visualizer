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
			NumberToText(parseInt(item.Value * datasetData.Scale), datasetData.BeginRound, datasetData.ToFixed);

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

function NumberToText(number, beginRound, toFixed) {
	if (beginRound != null) {
		if (number >= 10 ** 12) {
			number /= 10 ** 12;
			var suffix = "T";
			var id = 3;
		} else if (number >= 10 ** 9) {
			number /= 10 ** 9;
			var suffix = "B";
			var id = 2;
		} else if (number >= 10 ** 6) {
			number /= 10 ** 6;
			var suffix = "M";
			var id = 1;
		} else if (number >= 10 ** 3) {
			number /= 10 ** 3;
			var suffix = "K";
			var id = 0;
		} else {
			var suffix = "";
			var id = -1;
		}
	} else {
		var suffix = "";
		var id = -1;
	}
	if (beginRound != null && id >= beginRound)
		return number.toFixed(toFixed) + suffix;
	else
		return Math.floor(number) + suffix;
}

const ItemData = class {
	constructor(Name, Value) {
		this.Name = Name;
		this.Value = Value;
		this.BeginRound = BeginRound;
	}
}