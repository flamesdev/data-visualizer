/* global data title document window */
let screenId = null;
const maxIndex = data.datasets.length - 1;

function setScreen(newValue) {
  if (screenId !== null) {
    const screen = this[`screen${screenId}`];
    screen.style.visibility = 'hidden';
    screen.style.display = 'none';
  }

  screenId = newValue;
  const screen = this[`screen${screenId}`];
  title.innerHTML = data.datasets[screenId].name;
  screen.style.visibility = 'visible';
  screen.style.display = 'block';
}

function goToNextScreen() {
  setScreen(screenId < maxIndex ? screenId + 1 : 0);
}

window.addEventListener('load', () => {
  function numberToText(number, beginRound, decimal) {
    function truncateToDecimals(number2, decimal2) {
      const pow = 10 ** decimal2;
      return Math.trunc(number2 * pow) / pow;
    }

    const suffixes = [ '', 'K', 'M', 'B', 'T' ];
    const id = Math.trunc((number.toString().length - 1) / 3);
    const adjustedNumber = number / (10 ** (id * 3));

    return (beginRound && id - 1 >= beginRound ? truncateToDecimals(adjustedNumber, decimal) : Math.trunc(adjustedNumber)) + suffixes[id];
  }

  for (let i = 0; i < data.datasets.length; i++) {
    const screen = document.createElement('div');
    screen.id = `screen${i}`;
    screen.className = 'screen';

    const dataset = data.datasets[i];
    const datasetData = dataset.data;
    const iconset = data.iconsets[dataset.iconsetId];
    const max = datasetData[0].value;
    datasetData.forEach((x) => {
      const text = document.createElement('span');
      text.innerHTML = `${x.name} - ${numberToText(parseInt(x.value * dataset.scale, 10), dataset.beginRound, dataset.toDecimal)}`;

      const div = document.createElement('div');
      const icon = document.createElement('img');
      if (iconset) {
        icon.src = `icons/${iconset.directory}/${iconset.items.includes(x.name) ? x.name.toLowerCase().replace(/ /g, '_') : 'placeholder'}.svg`;
      }

      div.appendChild(icon);
      div.appendChild(text);

      const bar = document.createElement('div');
      bar.style.width = `${x.value / max * 100}%`;
      bar.className = 'bar';

      screen.appendChild(div);
      screen.appendChild(bar);
      screen.style.visibility = 'hidden';
      screen.style.display = 'none';
    });

    const button = document.createElement('button');
    button.innerHTML = 'Next screen';
    button.addEventListener('click', goToNextScreen);

    screen.appendChild(button);
    document.body.append(screen);
  }

  setScreen(0);
  document.body.style.visibility = 'visible';
});

document.addEventListener('keydown', (event) => {
  const { key } = event;
  if (key === 'ArrowLeft') {
    setScreen(screenId <= 0 ? maxIndex : screenId - 1);
  } else if (key === 'ArrowRight') {
    goToNextScreen();
  }
});
