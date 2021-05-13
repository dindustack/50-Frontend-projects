const numbers = document.querySelectorAll(".nums span");
const counter = document.querySelector(".counter");
const finalMessage = document.querySelector(".final");
const replay = document.querySelector("#replay");

runAnimation();
runReplay();

function runReplay() {
    counter.classList.remove('hide')
    finalMessage.classList.remove('show')

    numbers.forEach((number) => {
        number.classList.value = ""
    })

    numbers[0].classList.add('in')
}

function runAnimation() {
  numbers.forEach((number, index) => {
    const penultimate = numbers.length - 1;

    number.addEventListener("animationend", (e) => {
      if (e.animationName === "animateIn" && index !== penultimate) {
        number.classList.replace("in", "out");
      } else if (
        e.animationName === "animateOut" &&
        number.nextElementSibling
      ) {
        number.nextElementSibling.classList.add("in");
      } else {
        counter.classList.add("hide");
        finalMessage.classList.add("show");
      }
    });
  });
}

replay.addEventListener('click', () => {
    runReplay()
})