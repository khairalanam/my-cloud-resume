var get = (selector, scope) => {
  scope = scope ? scope : document;
  return scope.querySelector(selector);
};

var getAll = (selector, scope) => {
  scope = scope ? scope : document;
  return scope.querySelectorAll(selector);
};

if (document.getElementsByClassName("demo").length > 0) {
  var i = 0;
  var speed = 25;
  var txt = `khairalanam
            [Entry mode; press Ctrl+D to save and quit; press Ctrl+C to quit without saving]

            ### about me

            - i am a web developer and a uiux designer
            - i like exploring many things in tech and sharing my learnings with the world!
            - email me at: anaambasheer@gmail.com
            - i like tea ☕`;

  function typeItOut() {
    if (i < txt.length) {
      document.getElementsByClassName("demo")[0].innerHTML += txt.charAt(i);
      i++;
      setTimeout(typeItOut, speed);
    }
  }

  setTimeout(typeItOut, 1000);
}

window.addEventListener("load", function () {
  var tabContainers = getAll(".tab__container");

  for (var i = 0; i < tabContainers.length; i++)
    get(".tab__menu", tabContainers[i]).addEventListener("click", tabClick);

  function tabClick(event) {
    var scope = event.currentTarget.parentNode;
    var clickedTab = event.target;
    var tabs = getAll(".tab", scope);
    var panes = getAll(".tab__pane", scope);
    var activePane = get(`.${clickedTab.getAttribute("data-tab")}`, scope);

    for (var i = 0; i < tabs.length; i++) tabs[i].classList.remove("active");

    for (var i = 0; i < panes.length; i++) panes[i].classList.remove("active");

    clickedTab.classList.add("active");
    activePane.classList.add("active");
  }
});

var btns = getAll(".js-btn");
var sections = getAll(".js-section");

function setActiveLink(event) {
  for (var i = 0; i < btns.length; i++) btns[i].classList.remove("selected");

  event.target.classList.add("selected");
}

function smoothScrollTo(i, event) {
  var element = sections[i];
  setActiveLink(event);

  window.scrollTo({
    behavior: "smooth",
    top: element.offsetTop - 20,
    left: 0,
  });
}

if (btns.length && sections.length > 0) {
  for (var i = 0; i < btns.length; i++)
    btns[i].addEventListener("click", smoothScrollTo.bind(this, i));
}

window.addEventListener("scroll", () => {
  var docNav = get(".doc__nav > ul");

  if (docNav) {
    if (window.scrollY > 63) docNav.classList.add("fixed");
    else docNav.classList.remove("fixed");
  }
});

var topNav = get(".menu");
var icon = get(".toggle");

window.addEventListener("load", () => {
  function showNav() {
    if (topNav.className === "menu") {
      topNav.className += " responsive";
      icon.className += " open";
    } else {
      topNav.className = "menu";
      icon.classList.remove("open");
    }
  }
  icon.addEventListener("click", showNav);
});

const counter = document.querySelector(".viewer__count");

async function updateCounter() {
  let response = await fetch(
    "https://q2vnuqsqtna42u7thtshlwmcsm0ihgtv.lambda-url.eu-north-1.on.aws/"
  );

  let views = await response.json();
  counter.textContent = `Views Count: ${views}`;
}

updateCounter();
