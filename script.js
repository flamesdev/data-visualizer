/*global $*/
var max;
$.getJSON("https://raw.githubusercontent.com/flamesdev/population-visualizer/master/data.json", function (json) {
	"use strict";
	json.forEach(item => {
		var p = document.createElement("p");
		var div = document.createElement("div");

		if (!item.hasOwnProperty("APIName"))
			var APIName = item.Name;
		else
			var APIName = item.APIName;
		$.getJSON("http://api.population.io:80/1.0/population/" + APIName + "/2019-3-1/", function (json) {
			var population = json.total_population.population;
			p.innerHTML = item.Name + " - " + NumberToText(population);
			div.style.width = population / max * (screen.width / screen.width) * 100 + "%";
			if (item.Name === "China")
				max = population;
		});
		div.className = "bar";

		var titleDiv = document.createElement("div");

		var icon = document.createElement("img");
		if (item.ShowFlag != null)
			icon.src = "flag icons/" + item.Name + ".svg";
		else
			icon.src = "flag icons/Blank.svg";

		titleDiv.appendChild(icon);
		titleDiv.appendChild(p);

		document.body.append(titleDiv);
		document.body.append(div);
	});
});

function NumberToText(number) {
	if (number >= 1000000000)
		return (number / 1000000000).toFixed(3) + "B";
	else
		return Math.floor(number / 1000000) + "M";
}

const ItemData = class {
	constructor(Name, Value, DisplayValue, ShowFlag) {
		this.Name = Name;
		this.Value = Value;
		this.DisplayValue = DisplayValue;
		this.ShowFlag = ShowFlag;
	}
}
