/* audio */
window.onload = function () {
  document.getElementById("my_audio").play();
};

/* text greeting name */
GreetingAndName(
  [
    "Hello,",
    "Welcome to my CV",
    " My name is Thai Quoc Cuong.",
    "I'm a Frontend Developer.",
  ],
  "text",
  ["--heading"]
);
function GreetingAndName(words, id, colors) {
  if (colors === undefined) colors = ["#fff"];

  let visible = true,
    con = document.getElementById("control"),
    letterCount = 1,
    x = 1,
    waiting = false,
    target = document.getElementById(id);

  target.setAttribute("style", "color:" + colors[0]);

  window.setInterval(function () {
    if (letterCount === 0 && waiting === false) {
      waiting = true;
      target.innerHTML = words[0].substring(0, letterCount);
      window.setTimeout(function () {
        var usedColor = colors.shift();
        colors.push(usedColor);
        var usedWord = words.shift();
        words.push(usedWord);
        x = 1;
        target.setAttribute("style", "color:" + colors[0]);
        letterCount += x;
        waiting = false;
      }, 1000);
    } else if (letterCount === words[0].length + 1 && waiting === false) {
      waiting = true;
      window.setTimeout(function () {
        x = -1;
        letterCount += x;
        waiting = false;
      }, 1000);
    } else if (waiting === false) {
      target.innerHTML = words[0].substring(0, letterCount);
      letterCount += x;
    }
  }, 120);
  window.setInterval(function () {
    if (visible === true) {
      con.className = "control_underscore hidden";
      visible = false;
    } else {
      con.className = "control_underscore";
      visible = true;
    }
  }, 400);
}


/* animation blobby */
const box = document.querySelector('.box');

setInterval(setBorderRadius, 400);

function setBorderRadius() {
	box.style.setProperty('--br-blobby', generateBorderRadiusValue());
	box.style.setProperty('--br-blobby-after', generateBorderRadiusValue());
	box.style.setProperty('--br-blobby-before', generateBorderRadiusValue());
}

function generateBorderRadiusValue() {
	return `${getRandomValue()}% ${getRandomValue()}% ${getRandomValue()}% ${getRandomValue()}% / ${getRandomValue()}% ${getRandomValue()}% ${getRandomValue()}%`;
}
	
function getRandomValue() {
	return Math.floor(Math.random() * 50) + 20;
}

/* */


/* Acitve Button Side Navigation */

// let sideNav = document.getElementsByClassName('nav');
// let btnSideNav = document.getElementsByClassName('active')
