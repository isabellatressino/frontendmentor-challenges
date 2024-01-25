"use strict";

// Seleção dos elementos HTML
const btnReset = document.querySelector("#btn-reset");
const inputBill = document.querySelector("#bill");
const inputCustom = document.querySelector("#custom");
const inputNumberPeople = document.querySelector("#numPeople");
const radioInputButtons = document.querySelectorAll(".input-option");
const radioLabelButtons = document.querySelectorAll(".label-option");

// Variáveis e inicializações
let radioButtonValue = 0;
inputNumberPeople.value = 1;

const disableButton = () => {
	if (inputBill.value === "" && inputNumberPeople.value === "") {
		btnReset.disabled = true;
	} else {
		btnReset.disabled = false;
	}
};

// Função que reinicia todos os campos
const resetForm = () => {
	inputBill.value = "";
	inputNumberPeople.value = 1;
	radioButtonValue = 0;

	resetSpan();
	resetRadioButtons();
	resetCustom();
	disableButton();

	const errorMessage = document.querySelector(".errorMessage");
	if (errorMessage)
		document.querySelector(".f-number").removeChild(errorMessage);
	inputNumberPeople.classList.remove("error");
};

// Função que remove a classe "clicked" dos botões radio
const resetRadioButtons = () => {
	radioLabelButtons.forEach(function (label) {
		label.classList.remove("clicked");
	});
};

// Função que reinicia o input de classe "custom"
const resetCustom = () => {
	inputCustom.value = "";
	inputCustom.style.borderColor = "";
};

// Função que reinicia o total e a gorjeta
const resetSpan = () => {
	document.querySelector("#tipAmount").textContent = "$0.00";
	document.querySelector("#total").textContent = "$0.00";
};

// Função que calcula o valor da gorjeta por pessoa
const calcTipAmount = (bill, perc, numPeople) => {
	const tip = (bill * perc) / numPeople;
	document.querySelector("#tipAmount").textContent = `$${tip.toFixed(2)}`;
};

// Função que calcula o total à pagar por pessoa
const calcTotal = (bill, perc, numPeople) => {
	const total = (Number(bill) + Number(bill * perc)) / numPeople;
	document.querySelector("#total").textContent = `$${total.toFixed(2)}`;
};

// Função que valida o campo do número de pessoas
const validation = (numPeople) => {
	const fieldsetNumber = document.querySelector(".f-number");
	const existingErrorMessage = document.querySelector(".errorMessage");

	if (numPeople <= 0) {
		inputNumberPeople.classList.add("error");

		if (!existingErrorMessage) {
			const errorMessage = document.createElement("span");
			errorMessage.textContent = "Can't be zero";
			errorMessage.classList.add("errorMessage");
			fieldsetNumber.appendChild(errorMessage);
		}

		return false;
	} else {
		if (existingErrorMessage) fieldsetNumber.removeChild(existingErrorMessage);
		inputNumberPeople.classList.remove("error");
		return true;
	}
};

// Função para selecionar e alternar entre os botoes de radio
radioInputButtons.forEach(function (btn, index) {
	btn.addEventListener("click", function () {
		resetRadioButtons();
		resetCustom();

		radioButtonValue = btn.value;
		radioLabelButtons[index].classList.add("clicked");

		const val = validation(inputNumberPeople.value);

		if (val) {
			calcTipAmount(inputBill.value, radioButtonValue, inputNumberPeople.value);
			calcTotal(inputBill.value, radioButtonValue, inputNumberPeople.value);
		} else {
			resetSpan();
		}
	});
});

// Evento para o campo de input do valor da conta
inputBill.addEventListener("input", function () {
	const val = validation(inputNumberPeople.value);

	let perc = inputCustom.value / 100 || radioButtonValue;

	if (val) {
		calcTipAmount(inputBill.value, perc, inputNumberPeople.value);
		calcTotal(inputBill.value, perc, inputNumberPeople.value);
	} else {
		resetSpan();
	}

	disableButton();
});

// Evento para o campo de input do número de pessoas
inputNumberPeople.addEventListener("input", function () {
	const val = validation(inputNumberPeople.value);

	let perc = (inputCustom.value)/100 || radioButtonValue;

	if (val) {
		calcTipAmount(inputBill.value, perc, inputNumberPeople.value);
		calcTotal(inputBill.value, perc, inputNumberPeople.value);
	} else {
		resetSpan();
	}

	disableButton();
});

// Evento para o campo de input com o valor da porcentagem costumizada
inputCustom.addEventListener("input", function () {
	const inputCustomValue = Number(inputCustom.value) / 100;
	const val = validation(inputNumberPeople.value);

	resetRadioButtons();

	if (inputCustom.value !== "") {
		inputCustom.style.borderColor = "var(--Strong-cyan)";
	}

	if (val) {
		calcTipAmount(inputBill.value, inputCustomValue, inputNumberPeople.value);
		calcTotal(inputBill.value, inputCustomValue, inputNumberPeople.value);
	} else {
		resetSpan();
	}

	disableButton();
});

// Evento para o botao "reset"
btnReset.addEventListener("click", function () {
	resetForm();
});
