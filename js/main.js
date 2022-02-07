"use strict";

const whiteKeyWidth = 80;
const pianoHeight = 400;

const naturalNotes = ["C", "D", "E", "F", "G", "A", "B"];
const naturalNotesSharps = ["C", "D", "F", "G", "A"];
const naturalNotesFlats = ["D", "E", "G", "A", "B"];

const range = ["A0", "C8"];

const app = {
  setupPiano() {
    const piano = document.querySelector("#piano");
    const allNaturalNotes = this.getAllNaturalNotes(range);
    const pianoWidth = allNaturalNotes.length * whiteKeyWidth;

    const SVG = this.createMainSVG(pianoWidth, pianoHeight);

    // Add white keys
    let whiteKeyPositionX = 0;

    allNaturalNotes.forEach((noteName) => {
      const whiteKeyTextGroup = utils.createSVGElement("g");
      const whiteKey = this.createKey({className: "white-key", width: whiteKeyWidth, height: pianoHeight});
      const text = utils.createSVGElement("text");
    });
    for (let i = 0; i < allNaturalNotes.length; i++) {
      const whiteKey = this.createKey({className: "white-key", width: whiteKeyWidth, height: pianoHeight});
      utils.setAttributes(whiteKey, {
        "x": whiteKeyPositionX,
        "data-note-name": allNaturalNotes[i]
      });
      whiteKeyPositionX += whiteKeyWidth;
      SVG.appendChild(whiteKey);
    }
    // Add black keys
    let blackKeyPositionX = 60;
    allNaturalNotes.forEach((naturalNote, index, array) => {
      const blackKey = this.createKey({className: "black-key", width: whiteKeyWidth / 2, height: pianoHeight / 1.6});
      utils.setAttributes(blackKey, {
        "x": blackKeyPositionX
      });

      for (let i = 0; i < naturalNotesSharps.length; i++) {
        let naturalSharpNoteName = naturalNotesSharps[i];
        let naturalFlatNoteName = naturalNotesFlats[i];

        if (naturalSharpNoteName === naturalNote[0]) {
          utils.setAttributes(blackKey, {
            "data-sharp-name": `${naturalSharpNoteName}#${naturalNote[1]}`,
            "data-flat-name": `${naturalFlatNoteName}b${naturalNote[1]}`
          });

          // Add double spacing between D# and A#
          if (naturalSharpNoteName === "D" || naturalSharpNoteName === "A") {
            blackKeyPositionX += whiteKeyWidth * 2;
          } else {
            blackKeyPositionX += whiteKeyWidth;
          }
          // If last iteration of keys, do not add black key
          if (index !== array.length - 1) {
            SVG.appendChild(blackKey);
          }

        }
      }
    });
    // Add main SVG to piano div
    piano.appendChild(SVG);
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
    utils.setAttributes(key, {
      "width": width,
      "height": height
    });
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

    utils.setAttributes(svg, {
      "width": "100%",
      "version": "1.1",
      "xmlns": "http://www.w3.org/2000/svg",
      "xmlns:xlink": "http://www.w3.org/1999/xlink",
      "viewBox": `0 0 ${pianoWidth} ${pianoHeight}`
    });

    return svg;
  }
}

const utils = {
  createSVGElement(el) {
    const element = document.createElementNS("http://www.w3.org/2000/svg", el);
    return element;
  },
  setAttributes(el, attrs) {
    for (let key in attrs) {
      el.setAttribute(key, attrs[key]);
    }
  },
  addTextContent(el, content) {
    el.textContent = content;
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
