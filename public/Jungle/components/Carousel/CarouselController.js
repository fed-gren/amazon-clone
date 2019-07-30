import MyFetch from "../../../Grenutil/MyFetch/index.js";
import config from "./config.js";

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
    link.href = config.cssPath;

    head.appendChild(link);
  }

  async createCarousel() {
    const data = await MyFetch(config.fecthPath);
    this.loadCarsouelCss();
    this.view.initRender(data);
  }
}
