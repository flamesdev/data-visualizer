/*global $*/
$.getJSON("https://raw.githubusercontent.com/flamesdev/population-visualizer/master/data.json", function (json) {
	"use strict";
	var max = json[0].Value;
	json.forEach(item => {
		var p = document.createElement("p");
		p.innerHTML = item.Name + " - " + item.DisplayValue;
		var div = document.createElement("div");
		div.style.width = item.Value / max * ((screen.width - 60) / screen.width) * 100 + "%";
		var color = item.Colors;
		if (color != null) {
			var colorText;
			if (color.length != 1)
				for (var i = 0; i < color.length; i++)
					colorText += "#" + color[i] + " " + i / color.length * 100 + "%";
            else
				colorText = color[0];
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