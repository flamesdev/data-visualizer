/*global $*/
var array;
$.getJSON("https://raw.githubusercontent.com/flamesdev/population-visualizer/master/data.json", function (json) {
    "use strict";
	array = json;
});

window.onload = function () {
    "use strict";
    var max = 1418000000;
    array.forEach(item => {
        var p = document.createElement("p");
        p.innerHTML = item.Name + " - " + item.DisplayValue;
        var div = document.createElement("div");
        div.style.width = item.Value / max * 97 + "vw";
        document.body.append(p); 
        document.body.append(div);
    });
};

const ItemData = class {
    constructor(Name, Value, DisplayValue) {
        this.Name = Name;
        this.Value = Value;
        this.DisplayValue = DisplayValue;
    }
}