function Slider(sliderEl: Element, slidesShow?: number) {
  if (!(sliderEl instanceof Element)) {
    throw new Error("No slider passed in");
  }

  let current: Element | null;
  let prev: Element | null;
  let next: Element | null;

  const slides = sliderEl.querySelector(".slides") as HTMLDivElement;
  const prevBtn = sliderEl.querySelector(".goToPrev") as HTMLDivElement;
  const nextBtn = sliderEl.querySelector(".goToNext") as HTMLDivElement;

  function startSlider() {
    current = sliderEl.querySelector(".current") || slides.firstElementChild;
    prev = slides.previousElementSibling || slides.lastElementChild;
    next = current?.nextElementSibling || slides.firstElementChild;
  }

  function applyClasses() {
    current?.classList.add("current");
    prev?.classList.add("prev");
    next?.classList.add("next");
  }

  function move(direction: "back" | "forward") {
    const classesToRemove = ["current", "prev", "next"];
    prev?.classList.remove(...classesToRemove);
    current?.classList.remove(...classesToRemove);
    next?.classList.remove(...classesToRemove);

    if (direction === "back") {
      [prev, current, next] = [
        prev?.previousElementSibling || slides.lastElementChild,
        prev,
        current,
      ];
    }
    if (direction === "forward") {
      [prev, current, next] = [
        current,
        next,
        next?.nextElementSibling || slides.firstElementChild,
      ];
    }

    applyClasses();
  }

  startSlider();
  applyClasses();

  prevBtn.addEventListener("click", () => move("back"));
  nextBtn.addEventListener("click", () => move("forward"));
}

Slider(document.querySelector(".slider") as HTMLDivElement);
Slider(document.querySelector(".dog-slider") as HTMLDivElement);
