/*global $*/
$.getJSON("https://raw.githubusercontent.com/flamesdev/population-visualizer/master/data.json", function (json) {
	"use strict";
	var max = json[0].Value;
	json.forEach(item => {
		var p = document.createElement("p");
		p.innerHTML = item.Name + " - " + NumberToText(parseInt(item.Value));
        
		var div = document.createElement("div");
		div.style.width = item.Value / max * (screen.width / screen.width) * 100 + "%";
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
	constructor(Name, Value, ShowFlag) {
		this.Name = Name;
		this.Value = Value;
		this.ShowFlag = ShowFlag;
	}
}