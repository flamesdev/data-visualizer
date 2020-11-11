let screenId = null;
const maxIndex = data.datasets.length - 1;

function setScreen(newValue) {
  if (screenId !== null) {
    const screen = document.getElementById(`screen${screenId}`);
    screen.style.visibility = 'hidden';
    screen.style.display = 'none';
  }

  screenId = newValue;
  const screen = document.getElementById(`screen${screenId}`);
  title.innerHTML = data.datasets[screenId].name;
  screen.style.visibility = 'visible';
  screen.style.display = 'block';
}

function truncateToDecimals(number, decimal) {
  const pow = 10 ** decimal;
  return Math.trunc(number * pow) / pow;
}

const suffixes = [ '', 'K', 'M', 'B', 'T' ];
function numberToText(number, beginRound, decimal) {
  const { length } = number.toString();
  const id = Math.trunc((length - 1) / 3);
  number /= 10 ** (id * 3);
  if (beginRound !== null && id - 1 >= beginRound) {
    return truncateToDecimals(number, decimal) + suffixes[id];
  } else {
    return Math.trunc(number) + suffixes[id];
  }
}

function nextScreen() {
  setScreen(screenId < maxIndex ? screenId + 1 : 0);
}

function populateScreen(id) {
  const screen = document.createElement('div');
  screen.id = `screen${id}`;
  screen.className = 'screen';

  const dataset = data.datasets[id];
  const datasetData = dataset.data;
  const iconset = data.iconsets[dataset.iconsetId];
  const max = datasetData[0].value;
  datasetData.forEach((x) => {
    const p = document.createElement('p');
    p.innerHTML = `${x.name} - ${numberToText(parseInt(x.value * dataset.scale, 10), dataset.beginRound, dataset.toDecimal)}`;

    const div = document.createElement('div');
    div.style.width = `${x.value / max * 100}%`;
    div.className = 'bar';

    const span = document.createElement('span');

    const icon = document.createElement('img');
    if (iconset !== undefined) {
      icon.src = `icons/${iconset.directory}/${iconset.items.includes(x.name) ? x.name : 'Blank'}.svg`;
    }

    span.appendChild(icon);
    span.appendChild(p);

    screen.appendChild(span);
    screen.appendChild(div);
    screen.style.visibility = 'hidden';
    screen.style.display = 'none';
  });

  const button = document.createElement('button');
  button.innerHTML = 'Next Screen';
  button.onclick = nextScreen;

  screen.appendChild(button);

  document.body.append(screen);
}

window.addEventListener('load', () => {
  for (let i = 0; i < data.datasets.length; i++) {
    populateScreen(i);
  }

  setScreen(0);
  document.body.style.visibility = 'visible';
});

document.addEventListener('keydown', (event) => {
  const { key } = event;
  if (key === 'ArrowLeft') {
    setScreen(screenId <= 0 ? maxIndex : screenId - 1);
  } else if (key === 'ArrowRight') {
    nextScreen();
  }
});
