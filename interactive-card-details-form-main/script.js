// HTML element selection

const [
  inputCardName,
  inputCardNumber,
  inputCardMonth,
  inputCardYear,
  inputCardCode,
] = document.querySelectorAll("input");

const [, cardNumber, cardName] = document.querySelectorAll(".front div");

const [cardMonth, cardYear] = document.querySelectorAll("#card-date span");

const cardCode = document.querySelector("#card-cvc");

const [btnConfirm, btnContinue] = document.querySelectorAll("button");

const [, sectionForm, sectionComplete] = document.querySelectorAll("section");

// Initializations
sectionComplete.style.display = "none";

// Input field formatting functions

const formatCardNumber = (num) =>
  num.replace(/\D/g, "").replace(/(\d{4})(?=\d)/g, "$1 ");

const formatCardName = (name) => {
  let nameFormatted = name.replace(/\d/g, "");
  let nameFormattedArr = nameFormatted.toLocaleLowerCase().split(" ");
  let i = 0;
  for (let [first, ...others] of nameFormattedArr) {
    if (first) {
      let newString = first.toUpperCase() + [...others].join("");
      nameFormattedArr[i++] = newString;
    }
  }
  nameFormatted = nameFormattedArr.join(" ");
  return nameFormatted;
};

const formatCardMonth = (month) =>
  month.length === 1 ? "0" + month : month.slice(1, 3);

const formatCardYear = (year) => year.slice(0, 2);

const formatCardCode = (code) => code.slice(0, 3);

// Display functions

const display = (str, div) => (div.textContent = str);

const displayErrorMessage = (msg, div, input) => {
  if (!document.querySelector(`.${div.classList.value} .msg-error`)) {
    const msgError = document.createElement("div");
    msgError.textContent = msg;
    msgError.classList.add("msg-error");
    div.appendChild(msgError);
    input.classList.add("input-error");
  } else {
    document.querySelector(`.${div.classList.value} .msg-error`).textContent =
      msg;
  }
};

const removeErrorMessage = (div, input) => {
  if (document.querySelector(`.${div.classList.value} .msg-error`)) {
    const msgError = document.querySelector(
      `.${div.classList.value} .msg-error`
    );
    msgError.classList.remove("msg-error");
    input.classList.remove("input-error");
    div.removeChild(msgError);
  }
};

// Validation

const validate = (div, input) =>
  input.value === ""
    ? displayErrorMessage("Can't be blank", div, input)
    : removeErrorMessage(div, input);

// Input events

const inputs = [
  {
    input: inputCardNumber,
    format: formatCardNumber,
    divDisplay: cardNumber,
    divMsg: document.querySelector(".f-number"),
  },
  {
    input: inputCardName,
    format: formatCardName,
    divDisplay: cardName,
    divMsg: document.querySelector(".f-name"),
  },
  {
    input: inputCardCode,
    format: formatCardCode,
    divDisplay: cardCode,
    divMsg: document.querySelector(".f-code"),
  },
  {
    input: inputCardMonth,
    format: formatCardMonth,
    divDisplay: cardMonth,
    divMsg: document.querySelector(".f-date"),
  },
  {
    input: inputCardYear,
    format: formatCardYear,
    divDisplay: cardYear,
    divMsg: document.querySelector(".f-date"),
  },
];

inputs.forEach(({ input, format, divDisplay, divMsg }) => {
  input.addEventListener("input", function () {
    const x = format(this.value);
    display(x, divDisplay);
    this.value = x;

    validate(divMsg, this);
  });
});

// Button events

btnConfirm.addEventListener("click", function () {
  inputs.forEach(({ input, divMsg }) => {
    validate(divMsg, input);
  });

  if (!document.querySelector(".msg-error")) {
    sectionComplete.style.display = "flex";
    sectionForm.style.display = "none";
    sectionComplete.classList.add("opacity");
  }
});

btnContinue.addEventListener("click", function () {
  cardNumber.textContent = "0000 ".repeat(4);
  cardName.textContent = "Jane Appleseed";
  cardMonth.textContent = "00";
  cardYear.textContent = "00";
  cardCode.textContent = "000";
  inputs.forEach(({ input }) => (input.value = ""));
  sectionComplete.style.display = "none";
  sectionForm.style.display = "flex";
  sectionForm.classList.add("opacity");
});
