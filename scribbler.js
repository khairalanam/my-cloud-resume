// utils
const get = (selector, scope = document) => scope.querySelector(selector);
const getAll = (selector, scope = document) => scope.querySelectorAll(selector);

// typewriter animation
if (document.getElementsByClassName("demo").length > 0) {
  let i = 0;
  let speed = 25;
  let txt = `khairalanam
            [Entry mode; press Ctrl+D to save and quit; press Ctrl+C to quit without saving]

            ### about me

            - i am a creative web developer and a designer
            - i like exploring many things in tech and sharing my learnings with the world!
            - email me at: anaambasheer@gmail.com
            - i like tea ☕`;

  function typeItOut() {
    if (i < txt.length) {
      document.getElementsByClassName("demo")[0].innerHTML += txt[i];
      i++;
      setTimeout(typeItOut, speed);
    }
  }

  setTimeout(typeItOut, 1000);
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
  counter.textContent = `Views Count: ${views}`;
}

updateCounter();
