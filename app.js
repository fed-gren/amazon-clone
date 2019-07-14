import Carousel from "./Jungle/components/Carousel/index.js";
import Autocomplete from "./Jungle/components/Autocomplete/index.js";

window.addEventListener("DOMContentLoaded", () => {
  //DOM
  const carousel_div = document.querySelector(".carousel");
  const autocomplete_div = document.querySelector(".autocomplete");

  new Carousel({
    carouselElement: carousel_div,
    options: {
      width: 700,
      height: 300,
      duration: 300,
      navigation: true
    }
  });

  const categories = [
    "All",
    "Arts & Crafts",
    "Automotive",
    "Baby",
    "Beauty & Personal Care",
    "Books"
  ];

  new Autocomplete({ autocompleteElement: autocomplete_div, categories });
});
