import MyFetch from "../../../Grenutil/MyFetch/index.js";

const FETCH_PATH = "https://fed-gren.github.io/amazone-clone/data/localData.json";
const CSS_PATH = "Jungle/components/Carousel/Carousel.css";

export default class CarouselController {
  constructor({ view, nav }) {
    this.view = view;

    view.on("prev", () => {
      this.view.currentItem -= 1;
      this.view.setItemSliderOffset(this.view.currentItem);
    });

    view.on("next", () => {
      this.view.currentItem += 1;
      this.view.setItemSliderOffset(this.view.currentItem);
    });

    view.on("moveend", () => {
      this.view.isMoving = false;
      this.view.moveToCorrectPosition();
    });

    this.createCarousel();
  }

  loadCarsouelCss() {
    const head = document.getElementsByTagName("HEAD")[0];
    const link = document.createElement("link");

    link.rel = "stylesheet";
    link.type = "text/css";
    link.href = CSS_PATH;

    head.appendChild(link);
  }

  createCarousel() {
    fetch(FETCH_PATH)
      .then(data => data.json())
      .then(data => {
        this.loadCarsouelCss();
        return data;
      })
      .then(data => this.view.initRender(data));
  }
}
