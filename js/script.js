/* Loader page */
window.addEventListener("load",function(){
  document.querySelector(".preloader").classList.add("opacity-0");
  setTimeout(()=>{
    document.querySelector(".preloader").style.display = "none";
  },2000)
})
/* Loader page End*/

/* side navigation */
let nav = document.querySelector(".nav"),
navList = nav.querySelectorAll("li"),
totalNavList = navList.length,
allSection = document.querySelectorAll(".section"),
totalAllSection = allSection.length;

function SideNav() {
  for (let i = 0; i < totalNavList; i++) {
    let a = navList[i].querySelector("a");
    a.addEventListener("click", function () {
      for (let i = 0; i < totalAllSection; i++) {
        allSection[i].classList.remove("back_section");
      }
      for (let j = 0; j < totalNavList; j++) {
        if(navList[j].querySelector("a").classList.contains("active")){
          allSection[j].classList.add("back_section");
        }
        navList[j].querySelector("a").classList.remove("active");
      }
      this.classList.add("active");
      showSection(this);

      if(window.innerWidth < 1000){
        sideNaviSectionToggleBtn();
      }
    });
  }
}
SideNav();

function showSection(element){
  for (let i = 0; i < totalAllSection; i++) {
    allSection[i].classList.remove("active");
  }
  let target = element.getAttribute("href").split("#")[1];
  document.querySelector("#"+target).classList.add("active")
}
/* side navigation End*/
//----------------------------------------
/* nav-toggler */
let navToggleBtn = document.querySelector(".nav-toggler"),
    sideNavi = document.querySelector(".side_navigation");

    navToggleBtn.addEventListener("click",sideNaviSectionToggleBtn)
  function sideNaviSectionToggleBtn(){
    navToggleBtn.classList.toggle("open");
    sideNavi.classList.toggle("open");
    for (let i = 0; i < totalAllSection; i++) {
      allSection[i].classList.toggle("open");
    }
  }
/* Home Text greeting name */
GreetingAndName(
  [
    "Hello,",
    "Welcome to my CV",
    " My name is Quoc Cuong.",
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
/* Home Text greeting name End*/
/*------------------------------------*/
/* Animation blobby */
const box = document.querySelector(".box");

setInterval(setBorderRadius, 400);

function setBorderRadius() {
  box.style.setProperty("--br-blobby", generateBorderRadiusValue());
  box.style.setProperty("--br-blobby-after", generateBorderRadiusValue());
  box.style.setProperty("--br-blobby-before", generateBorderRadiusValue());
}

function generateBorderRadiusValue() {
  return `${getRandomValue()}% ${getRandomValue()}% ${getRandomValue()}% ${getRandomValue()}% / ${getRandomValue()}% ${getRandomValue()}% ${getRandomValue()}%`;
}

function getRandomValue() {
  return Math.floor(Math.random() * 50) + 20;
}
/* Animation blobby End*/
/*------------------------------------*/

/* Project item filter */
function FilterButton() {
  const filterContainer = document.querySelector(".project_filer"),
    filterBtns = filterContainer.children,
    totalFilterBtn = filterBtns.length,
    projectItems = document.querySelectorAll(".products"),
    totalProjectItem = projectItems.length;

  for (let i = 0; i < totalFilterBtn; i++) {
    filterBtns[i].addEventListener("click", function () {
      filterContainer.querySelector(".active").classList.remove("active");
      this.classList.add("active");

      const filterValue = this.getAttribute("data-filter");

      for (let j = 0; j < totalProjectItem; j++) {
        if (filterValue === projectItems[j].getAttribute("data-category")) {
          projectItems[j].classList.remove("hide");
          projectItems[j].classList.add("show");
        } else {
          projectItems[j].classList.remove("show");
          projectItems[j].classList.add("hide");
        }
        if (filterValue === "all") {
          projectItems[j].classList.remove("hide");
          projectItems[j].classList.add("show");
        }
      }
    });
  }
}
FilterButton();
/* Project item filter End*/
/*------------------------------------*/

/*Concat form*/
(function () {
  // get all data in form and return object
  function getFormData(form) {
    let elements = form.elements,
      honeypot;

    let fields = Object.keys(elements)
      .filter(function (k) {
        if (elements[k].name === "honeypot") {
          honeypot = elements[k].value;
          return false;
        }
        return true;
      })
      .map(function (k) {
        if (elements[k].name !== undefined) {
          return elements[k].name;
          // special case for Edge's html collection
        } else if (elements[k].length > 0) {
          return elements[k].item(0).name;
        }
      })
      .filter(function (item, pos, self) {
        return self.indexOf(item) == pos && item;
      });

    let formData = {};
    fields.forEach(function (name) {
      let element = elements[name];
      // singular form elements just have one value
      formData[name] = element.value;

      // when our element has multiple items, get their values
      if (element.length) {
        let data = [];
        for (let i = 0; i < element.length; i++) {
          let item = element.item(i);
          if (item.checked || item.selected) {
            data.push(item.value);
          }
        }
        formData[name] = data.join(", ");
      }
    });

    // add form-specific values into the data
    formData.formDataNameOrder = JSON.stringify(fields);
    formData.formGoogleSheetName = form.dataset.sheet || "responses"; // default sheet name
    formData.formGoogleSendEmail = form.dataset.email || ""; // no email by default

    return { data: formData, honeypot: honeypot };
  }

  function handleFormSubmit(event) {
    // handles form submit without any jquery
    event.preventDefault(); // we are submitting via xhr below
    let form = event.target,
      formData = getFormData(form),
      data = formData.data;

    // If a honeypot field is filled, assume it was done so by a spam bot.
    if (formData.honeypot) {
      return false;
    }

    disableAllButtons(form);
    let url = form.action,
      xhr = new XMLHttpRequest();
    xhr.open("POST", url);
    // xhr.withCredentials = true;
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhr.onreadystatechange = function () {
      if (xhr.readyState === 4 && xhr.status === 200) {
        form.reset();
        let formElements = form.querySelector(".form-elements");
        if (formElements) {
          formElements.style.display = "none"; // hide form
        }
        let thankYouMessage = form.querySelector(".thank_message");
        if (thankYouMessage) {
          thankYouMessage.style.display = "block";
        }
      }
    };
    // url encode form data for sending as post data
    let encoded = Object.keys(data)
      .map(function (k) {
        return encodeURIComponent(k) + "=" + encodeURIComponent(data[k]);
      })
      .join("&");
    xhr.send(encoded);
  }

  function loaded() {
    // bind to the submit event of our form
    let forms = document.querySelectorAll("form.contact_form"); //Get all the forms having class="contact_form" in the form tag

    for (let i = 0; i < forms.length; i++) {
      forms[i].addEventListener("submit", handleFormSubmit, false);
    }
  }
  document.addEventListener("DOMContentLoaded", loaded, false);

  function disableAllButtons(form) {
    let buttons = form.querySelectorAll("button");
    for (let i = 0; i < buttons.length; i++) {
      buttons[i].disabled = true;
    }
  }
})();

/*Concat form End*/
