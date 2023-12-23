const questions = document.querySelectorAll(".question");
const answer = document.querySelectorAll(".answer");
const icons = document.querySelectorAll(".icon");

let classe = Array(answer.length).fill("inativo");
classe[0] = "ativo";

icons[0].classList.add("icon-minus");

questions.forEach(function (question, index) {
  question.addEventListener("click", function () {
    abrirContainer(index);
  });
});

function abrirContainer(i) {
  if (classe[i] === "inativo") {
    answer[i].classList.remove("inativo");
    answer[i].classList.add("ativo");
    icons[i].classList.remove("icon-plus");
    icons[i].classList.add("icon-minus");
    classe[i] = "ativo";
  } else {
    answer[i].classList.remove("ativo");
    answer[i].classList.add("inativo");
    icons[i].classList.remove("icon-minus");
    icons[i].classList.add("icon-plus");
    classe[i] = "inativo";
  }
}
