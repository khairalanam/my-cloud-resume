// utils
const get = (selector, scope = document) => scope.querySelector(selector);
const getAll = (selector, scope = document) => scope.querySelectorAll(selector);
const typeItOut = (txt, selector, i = 0, scope = document, speed = 25) => {
  if (i < txt.length) {
    scope.getElementsByClassName(selector)[0].innerHTML += txt[i];
    i++;
    setTimeout(() => typeItOut(txt, selector, i, scope, speed), speed);
  }
};

// typewriter animation
if (document.getElementsByClassName("demo").length > 0) {
  let txt = `khairalanam
            [Entry mode; press Ctrl+D to save and quit; press Ctrl+C to quit without saving]

            ### about me

            - i am a creative web developer and a designer
            - i like exploring many things in tech and sharing my learnings with the world!
            - email me at: anaambasheer@gmail.com
            - i like tea ☕`;

  setTimeout(() => typeItOut(txt), 1000);
}

// tabs section
window.addEventListener("load", () => {
  let tabContainers = getAll(".tab__container");

  for (let i = 0; i < tabContainers.length; i++)
    get(".tab__menu", tabContainers[i]).addEventListener("click", tabClick);

  function tabClick(event) {
    const scope = event.currentTarget.parentNode;
    let clickedTab = event.target;
    let tabs = getAll(".tab", scope);
    let panes = getAll(".tab__pane", scope);
    let activePane = get(`.${clickedTab.getAttribute("data-tab")}`, scope);

    for (let i = 0; i < tabs.length; i++) tabs[i].classList.remove("active");

    for (let i = 0; i < panes.length; i++) panes[i].classList.remove("active");

    clickedTab.classList.add("active");
    activePane.classList.add("active");
  }
});

// views counter
const counter = document.querySelector(".viewer__count");

async function updateCounter() {
  let response = await fetch(
    "https://q2vnuqsqtna42u7thtshlwmcsm0ihgtv.lambda-url.eu-north-1.on.aws/"
  );

  let views = await response.json();
  if (counter) counter.textContent = `Views Count: ${views}`;
  return views;
}

updateCounter();

module.exports = { get, getAll, typeItOut };
