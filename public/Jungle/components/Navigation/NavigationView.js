import MyFetch from "../../../Grenutil/MyFetch/index.js";
import MyEventEmitter from "../../../Grenutil/MyEventEmitter/index.js";
import delegate from "../../../Grenutil/delegate.js";
import templates from "../../templates.js";
import config from "./config.js";

export default class NavigationView extends MyEventEmitter {
  constructor({ navigationElement, options, carousel }) {
    super();

    this.navigation = navigationElement;
    this.currentActivatedItem = 1;

    this.defaultOptions = {
      width: 500,
      height: 120,
      duration: 100
    };
    this.options = this.mergeOption(options);

    this.loadNavigationCss();
    this.init();

    this.carousel = carousel;

    this.carousel.on("prev", () => {
      this.setPrevItem();
    });
    this.carousel.on("next", () => {
      this.setNextItem();
    });
  }

  loadNavigationCss() {
    const head = document.getElementsByTagName("HEAD")[0];
    const link = document.createElement("link");

    link.rel = "stylesheet";
    link.type = "text/css";
    link.href = config.cssPath;

    head.appendChild(link);
  }

  mergeOption(userOptions) {
    return { ...this.defaultOptions, ...userOptions };
  }

  setNavigationStyle() {
    this.navigation.style.width = `${this.options.width}px`;
    this.navigation.style.height = `${this.options.height}px`;

    this.navItems.forEach((item, idx) => {
      const navBtn = item.querySelector("button");
      navBtn.style.backgroundColor = config.itemColors[idx];
      navBtn.style.color = "white";
    });
  }

  activateCurrentItem() {
    this.navItems = this.navigation.querySelectorAll("li");
    this.navItems.forEach(item => {
      item.classList.remove("active");
    });

    this.navItems[this.currentActivatedItem - 1].classList.add("active");
  }

  attachEvent() {
    delegate(this.navigation, "li", "click", ({ currentTarget }) => {
      this.currentActivatedItem = Number(currentTarget.dataset.itemnum);
      this.activateCurrentItem();
      this.carousel.setItemSliderOffset(this.currentActivatedItem);
    });
  }

  render(data) {
    const template = templates.getNavigationTemplate({ data });

    this.navigation.innerHTML = template;
    this.activateCurrentItem();
    this.setNavigationStyle();
    this.attachEvent();
  }

  async init() {
    console.log(config.fetchUrl);
    this.render(await MyFetch(config.fetchUrl));
  }

  setNextItem() {
    this.currentActivatedItem =
      this.currentActivatedItem >= this.navItems.length
        ? 1
        : this.currentActivatedItem + 1;
    this.activateCurrentItem();
  }

  setPrevItem() {
    this.currentActivatedItem =
      this.currentActivatedItem <= 1
        ? this.navItems.length
        : this.currentActivatedItem - 1;
    this.activateCurrentItem();
  }
}
