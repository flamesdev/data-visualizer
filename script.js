/*global $*/
$.getJSON("https://raw.githubusercontent.com/flamesdev/population-visualizer/master/data.json", function (json) {
	"use strict";
	var screen = document.createElement("div");
	screen.id = "screen1";
	document.body.append(CreateScreen(json.Country_Population, screen, true, "flag icons", "flag icons/Blank.svg"));
});

function CreateScreen(data, screen, showIcon, iconDir, defaultIcon) {
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
				icon.src = iconDir + "/" + item.Name + ".svg";
			else
				icon.src = defaultIcon;

		titleDiv.appendChild(icon);
		titleDiv.appendChild(p);

		screen.appendChild(titleDiv);
		screen.appendChild(div);
	});
	return screen;
}

function NumberToText(number) {
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