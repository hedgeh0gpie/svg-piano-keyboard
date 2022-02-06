"use strict";

let numberOfOctaves = 5;
const octaveWidth = 560;

const whiteKeyWidth = 80;
const pianoHeight = 400;

const naturalNotes = ["C", "D", "E", "F", "G", "A", "B"];
const range = ["G2", "A7"];

const piano = document.querySelector("#piano");

const app = {
  setupPiano() {
    const allNaturalNotes = this.getAllNaturalNotes(range);
    const pianoWidth = allNaturalNotes.length * whiteKeyWidth;

    const SVG = this.createMainSVG(pianoWidth, pianoHeight);
    // Add main SVG to piano div
    piano.appendChild(SVG);

    // Create octaves
    for (let i = 0; i < numberOfOctaves; i++) {
      const octave = this.createOctave(i);

      let whiteKeyXPosition = 0;
      let blackKeyXPosition = 60;

      // Add white keys to octave
      for (let i = 0; i < 7; i++) {
        const whiteKey = this.createKey({className: "white-key", width: whiteKeyWidth, height: 400});
        whiteKey.setAttribute("x", whiteKeyXPosition);
        whiteKeyXPosition += whiteKeyWidth;
        octave.appendChild(whiteKey);
      }

      // Add black keys to octave
      for (let i = 0; i < 5; i++) {
        const blackKey = this.createKey({className: "black-key", width: whiteKeyWidth / 2, height: 250});
        blackKey.setAttribute("x", blackKeyXPosition);
        if (i === 1) {
          blackKeyXPosition += whiteKeyWidth * 2;
        } else {
          blackKeyXPosition += whiteKeyWidth;
        }
        octave.appendChild(blackKey);

      }

      pianoKeyboard.appendChild(octave);
    }
  },
  createOctave(octaveNumber) {
    const octave = utils.createSVGElement("g");
    octave.classList.add("octave");
    octave.setAttribute("transform", `translate(${octaveNumber * octaveWidth}, 0)`);
    return octave;
  },
  createKey({className, width, height}) {
    const key = utils.createSVGElement("rect");
    key.classList.add(className);
    key.setAttribute("width", width);
    key.setAttribute("height", height);
    return key;
  },
  getAllNaturalNotes([firstNote, lastNote]) {
    // Assign octave number, notes and positions to variables
    const firstNoteName = firstNote[0];
    const firstOctaveNumber = parseInt(firstNote[1]);

    const lastNoteName = lastNote[0];
    const lastOctaveNumber = parseInt(lastNote[1]);

    const firstNotePosition = naturalNotes.indexOf(firstNoteName);
    const lastNotePosition = naturalNotes.indexOf(lastNoteName);

    const allNaturalNotes = [];

    for (let octaveNumber = firstOctaveNumber; octaveNumber <= lastOctaveNumber; octaveNumber++) {
      // Handle first octave
      if (octaveNumber === firstOctaveNumber) {
        naturalNotes.slice(firstNotePosition).forEach((noteName) => {
          allNaturalNotes.push(noteName + octaveNumber);
        });

        // Handle last octave
      } else if (octaveNumber === lastOctaveNumber) {
        naturalNotes.slice(0, lastNotePosition + 1).forEach((noteName) => {
          allNaturalNotes.push(noteName + octaveNumber);
        });

      } else {
        naturalNotes.forEach((noteName) => {
          allNaturalNotes.push(noteName + octaveNumber);
        });
      }
    }
    return allNaturalNotes;
  },
  createMainSVG(pianoWidth, pianoHeight) {
    const svg = utils.createSVGElement("svg");

    svg.setAttribute("width", "100%");
    svg.setAttribute("version", "1.1");
    svg.setAttribute("xmlns", "http://www.w3.org/2000/svg");
    svg.setAttribute("xmlns:xlink", "http://www.w3.org/1999/xlink");
    svg.setAttribute("viewBox", `0 0 ${pianoWidth} ${pianoHeight}`);

    return svg;
  }
}

const utils = {
  createSVGElement(el) {
    const element = document.createElementNS("http://www.w3.org/2000/svg", el);
    return element;
  }
}

app.setupPiano();
console.log(app.getAllNaturalNotes(range));;


// const octaveKeys = `<rect class="piano-key white-key" x="0" y="0" width="whiteKeyWidth" height="400"></rect>
//       <rect class="piano-key white-key" x="whiteKeyWidth" y="0" width="whiteKeyWidth" height="400"></rect>
//       <rect class="piano-key white-key" x="160" y="0" width="whiteKeyWidth" height="400"></rect>
//       <rect class="piano-key white-key" x="240" y="0" width="whiteKeyWidth" height="400"></rect>
//       <rect class="piano-key white-key" x="320" y="0" width="whiteKeyWidth" height="400"></rect>
//       <rect class="piano-key white-key" x="400" y="0" width="whiteKeyWidth" height="400"></rect>
//       <rect class="piano-key white-key" x="4whiteKeyWidth" y="0" width="whiteKeyWidth" height="400"></rect>
//
//       <rect class="piano-key black-key" x="60" y="0" width="40" height="250"></rect>
//       <rect class="piano-key black-key" x="140" y="0" width="40" height="250"></rect>
//       <rect class="piano-key black-key" x="300" y="0" width="40" height="250"></rect>
//       <rect class="piano-key black-key" x="3whiteKeyWidth" y="0" width="40" height="250"></rect>
//       <rect class="piano-key black-key" x="460" y="0" width="40" height="250"></rect>`;
//
// const piano = document.querySelector("#piano");
// piano.innerHTML = pianoSVG;
// const pianoKeyboard = document.querySelector("#piano-keyboard");
//
// for (let i = 0; i < numberOfOctaves; i++) {
//   const octave = document.createElementNS("http://www.w3.org/2000/svg","g");
//   octave.classList.add("octave");
//   octave.setAttribute("transform", `translate(${i * octaveWidth}, 0)`);
//   octave.innerHTML = octaveKeys;
//   pianoKeyboard.appendChild(octave);
// }
