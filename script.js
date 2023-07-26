"use strict";

const image_url = "image.json";

const sliderContainer = document.querySelector(".slider-container");

const sliderRight = document.querySelector(".right-slide");
const sliderLeft = document.querySelector(".left-slide");

const upButton = document.querySelector(".up-button");
const downButton = document.querySelector(".down-button");

fetch(image_url)
  .then((Response) => Response.json())
  .then((data) => {
    data.forEach((url) => {
      let dataLength = data.length;
      localStorage.setItem("Length", dataLength);

      let { heading, subheading, background_color } = url;

      let details = document.createElement("div");
      details.classList.add("detail-slide");
      details.style.backgroundColor = background_color;
      details.innerHTML = `<h1>${heading}</h1>
      <p>${subheading}</p>`;

      sliderLeft.appendChild(details);
    });

    data.reverse().forEach((url) => {
      let { img } = url;

      let images = document.createElement("div");
      images.classList.add("image-slide");
      images.style.backgroundImage = `url(${img})`;

      sliderRight.appendChild(images);
    });
  });

const sliderLength = localStorage.getItem("Length");
localStorage.clear();
let activeSlideIndex = 0;

sliderLeft.style.top = `-${(sliderLength - 1) * 100}vh  `;

upButton.addEventListener("click", () => changeSlide("up"));
downButton.addEventListener("click", () => changeSlide("down"));

const changeSlide = (direction) => {
  const sliderHeight = sliderContainer.clientHeight;
  if (direction === "up") {
    activeSlideIndex++;
    if (activeSlideIndex > sliderLength - 1) {
      activeSlideIndex = 0;
    }
  } else if (direction === "down") {
    activeSlideIndex--;
    if (activeSlideIndex < 0) {
      activeSlideIndex = sliderLength - 1;
    }
  }

  sliderRight.style.transform = `translateY(-${
    sliderHeight * activeSlideIndex
  }px)`;

  sliderLeft.style.transform = `translateY(${
    sliderHeight * activeSlideIndex
  }px)`;
};
