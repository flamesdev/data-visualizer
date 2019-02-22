/*global $*/
$.getJSON("https://raw.githubusercontent.com/flamesdev/population-visualizer/master/data.json", function (json) {
    "use strict";
    var max = json[0].Value;
    json.forEach(item => {
        var p = document.createElement("p");
        p.innerHTML = item.Name + " - " + item.DisplayValue;
        var div = document.createElement("div");
        div.style.width = item.Value / max * 97 + "vw";
        document.body.append(p);
        document.body.append(div);
    });
});

const ItemData = class {
    constructor(Name, Value, DisplayValue, Color) {
        this.Name = Name;
        this.Value = Value;
        this.DisplayValue = DisplayValue;
    }
}