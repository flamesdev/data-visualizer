/*global $*/
$.getJSON("https://raw.githubusercontent.com/flamesdev/population-visualizer/master/data.json", function (json) {
	"use strict";
	var max = json[0].Value;
	json.forEach(item => {
		var p = document.createElement("p");
		p.innerHTML = item.Name + " - " + item.DisplayValue;
		var div = document.createElement("div");
		div.style.width = item.Value / max * (screen.width / screen.width) * 100 + "%";
		var color = item.Colors;
		if (color != null) {
			var colorText = "linear-gradient(to right,";
			if (color.length != 1) {
				var lastPercentage;
				for (var i = 0; i < color.length; i++) {
					if (lastPercentage != null)
						colorText += "#" + color[i] + " " + lastPercentage + ",";
					lastPercentage = (i + 1) / color.length * 100 + "%";
					colorText += "#" + color[i] + " " + lastPercentage;
					if (i != color.length - 1)
						colorText += ",";
				}
			} else
				colorText = color[0];
			colorText += ")";
			div.style.background = colorText;
		}
		document.body.append(p);
		document.body.append(div);
	});
});

const ItemData = class {
	constructor(Name, Value, DisplayValue, Colors) {
		this.Name = Name;
		this.Value = Value;
		this.DisplayValue = DisplayValue;
		this.Colors = Colors;
	}
}