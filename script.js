var screenID = null;

var titleElement;
window.onload = function () {
	titleElement = document.getElementById("title");
};

var json;
$.getJSON("https://raw.githubusercontent.com/flamesdev/data-visualizer/master/data.json", function (data) {
	"use strict";
	json = data;
	CreateScreen(0, true, "flag icons", "Blank", 1);
	CreateScreen(1, false, null, null, 1);
	CreateScreen(2, false, null, null, 1);
	CreateScreen(3, false, null, null, 1000000);
	UpdateScreen(0);
	document.body.style.visibility = "visible";
});

document.addEventListener("keydown", (event) => {
	if (event.keyCode === 37)
		if (screenID - 1 >= 0)
			UpdateScreen(screenID - 1);
		else
			UpdateScreen(3);
	if (event.keyCode === 39)
		if (screenID + 1 <= 3)
			UpdateScreen(screenID + 1);
		else
			UpdateScreen(0);
});

function CreateScreen(id, showIcon, iconDir, defaultIcon, scale) {
	"use strict";
	iconDir += "/";
	var screen = document.createElement("div");
	screen.id = "screen" + id;
	var data = json[id].Dataset;
	var max = data[0].Value;
	data.forEach(item => {
		var p = document.createElement("p");
		p.innerHTML = item.Name + " - " + NumberToText(parseInt(item.Value * scale));

		var div = document.createElement("div");
		div.style.width = item.Value / max * 100 + "%";
		div.className = "bar";

		var titleDiv = document.createElement("div");

		var icon = document.createElement("img");
		if (showIcon)
			if (item.HasIcon != null)
				icon.src = iconDir + item.Name + ".svg";
			else
				icon.src = iconDir + defaultIcon + ".svg";

		titleDiv.appendChild(icon);
		titleDiv.appendChild(p);

		screen.appendChild(titleDiv);
		screen.appendChild(div);
		screen.style.visibility = "hidden";
		screen.style.display = "none";
	});
	document.body.append(screen);
}

function UpdateScreen(newValue) {
	"use strict"
	if (screenID != null) {
		var screen = document.getElementById("screen" + screenID);
		screen.style.visibility = "hidden";
		screen.style.display = "none";
	}
	screenID = newValue;
	title.innerHTML = json[screenID].Name;
	var screen = document.getElementById("screen" + screenID);
	screen.style.visibility = "visible";
	screen.style.display = "block";
}

function NumberToText(number) {
	"use strict"
	if (number >= 10 ** 12)
		return (number / 10 ** 12).toFixed(3) + "T";
	else if (number >= 10 ** 9)
		return (number / 10 ** 9).toFixed(3) + "B";
	else
		return Math.floor(number / 10 ** 6) + "M";
}

const ItemData = class {
	constructor(Name, Value, HasIcon) {
		this.Name = Name;
		this.Value = Value;
		this.HasIcon = HasIcon;
	}
}