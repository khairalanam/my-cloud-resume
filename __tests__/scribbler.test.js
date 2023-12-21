const fetchMock = require("jest-fetch-mock");
const { get, getAll, typeItOut } = require("../scribbler");
const { JSDOM } = require("jsdom");

beforeEach(() => {
  jest.clearAllMocks();
  fetchMock.resetMocks();
});

describe("Test the utility functions", () => {
  it("should get the element with the appropriate selector", () => {
    const mockElement = document.createElement("div");
    document.querySelector = jest.fn(() => mockElement);

    get(".test-selector");
    expect(document.querySelector).toHaveBeenCalledWith(".test-selector");
  });

  it("it should get all the elements with the given selector", () => {
    const mockElements = [
      document.createElement("div"),
      document.createElement("div"),
    ];
    document.querySelectorAll = jest.fn(() => mockElements);

    getAll(".test-selector");
    expect(document.querySelectorAll).toHaveBeenCalledWith(".test-selector");
  });
});

describe("Test the typewriter animation", () => {
  jest.useFakeTimers();

  const initialHTML = '<div class="demo"></div>';
  const { window } = new JSDOM(initialHTML);

  it("should type out the text with setTimeout", () => {
    const txt = `khairalanam
            [Entry mode; press Ctrl+D to save and quit; press Ctrl+C to quit without saving]

            ### about me

            - i am a creative web developer and a designer
            - i like exploring many things in tech and sharing my learnings with the world!
            - email me at: anaambasheer@gmail.com
            - i like tea ☕`;
    typeItOut(txt, "demo", 0, window.document, 25);

    jest.advanceTimersByTime(100);

    expect(window.document.querySelector(".demo").innerHTML).toBe("khair");
  });
});
