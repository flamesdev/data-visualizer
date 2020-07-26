let screenId = null;
let maxIndex = data.Datasets.length - 1;
$(function () {
  for (let i = 0; i < data.Datasets.length; i++) {
    populateScreen(i);
  }
  setScreen(0);
  document.body.style.visibility = "visible";
});

document.addEventListener("keydown", (event) => {
  if (event.keyCode === 37) {
    setScreen(screenId <= 0 ? maxIndex : screenId - 1);
  } else if (event.keyCode === 39) {
    nextScreen();
  }
});

function nextScreen() {
  setScreen(screenId < maxIndex ? screenId + 1 : 0);
}

function populateScreen(id) {
  let screen = document.createElement("div");
  screen.id = "screen" + id;
  screen.className = "screen";

  let dataset = data.Datasets[id];
  let datasetData = dataset.Dataset;
  let iconset = data.Iconsets[dataset.IconsetId];
  let max = datasetData[0].Value;
  datasetData.forEach(item => {
    let p = document.createElement("p");
    p.innerHTML = item.Name + " - " +
      numberToText(parseInt(item.Value * dataset.Scale), dataset.BeginRound, dataset.ToDecimal);

    let div = document.createElement("div");
    div.style.width = item.Value / max * 100 + "%";
    div.className = "bar";

    let span = document.createElement("span");

    let icon = document.createElement("img");
    if (iconset !== undefined) {
      icon.src = "icons/" + iconset.Directory + "/" + (iconset.Items.includes(item.Name) ? item.Name : "Blank") + ".svg";
    }

    span.appendChild(icon);
    span.appendChild(p);

    screen.appendChild(span);
    screen.appendChild(div);
    screen.style.visibility = "hidden";
    screen.style.display = "none";
  });

  let button = document.createElement("button");
  button.innerHTML = "Next";
  button.onclick = nextScreen;

  screen.appendChild(button);

  document.body.append(screen);
}

function setScreen(newValue) {
  if (screenId !== null) {
    let screen = document.getElementById("screen" + screenId);
    screen.style.visibility = "hidden";
    screen.style.display = "none";
  }

  screenId = newValue;
  let screen = document.getElementById("screen" + screenId);
  title.innerHTML = data.Datasets[screenId].Name;
  screen.style.visibility = "visible";
  screen.style.display = "block";
}

const suffixes = ['', 'K', 'M', 'B', 'T'];

function numberToText(number, beginRound, decimal) {
  let length = number.toString().length;
  let id = Math.trunc((length - 1) / 3);
  number /= Math.pow(10, id * 3);
  if (beginRound !== null && id - 1 >= beginRound) {
    return truncateToDecimals(number, decimal) + suffixes[id];
  } else {
    return Math.trunc(number) + suffixes[id];
  }
}

function truncateToDecimals(number, decimal) {
  let pow = Math.pow(10, decimal);
  return Math.trunc(number * pow) / pow;
}
