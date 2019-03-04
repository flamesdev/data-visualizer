var screenID = 0;

var json;
$.getJSON("https://raw.githubusercontent.com/flamesdev/population-visualizer/master/data.json", function (data) {
	"use strict";
	json = data;
	document.body.append(CreateScreen(0, true, true, "flag icons", "Blank"));
});

function CreateScreen(id, show, showIcon, iconDir, defaultIcon) {
	"use strict";
	iconDir += "/";
	var screen = document.createElement("div");
	screen.id = "screen" + id;
	var data = json[id];
	var max = data[0].Value;
	data.forEach(item => {
		var p = document.createElement("p");
		p.innerHTML = item.Name + " - " + NumberToText(parseInt(item.Value));

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
	});
	if (show)
		screen.style.visibility = "show";
	else {
		screen.style.visibility = "hidden";
		screen.style.display = "none";
	}
	return screen;
}

function NumberToText(number) {
	"use strict"
	if (number >= 1000000000)
		return (number / 1000000000).toFixed(3) + "B";
	else
		return Math.floor(number / 1000000) + "M";
}

const ItemData = class {
	constructor(Name, Value, HasIcon) {
		this.Name = Name;
		this.Value = Value;
		this.HasIcon = HasIcon;
	}
}