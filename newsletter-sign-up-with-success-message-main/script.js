"use strict";

// Selection of HTML elements
const sectionMessage = document.querySelector(".message-container");
sectionMessage.style.display = "none";

const sectionSignUp = document.querySelector(".signUp-container");

const inputEmail = document.querySelector("#email");

// Function to display error message
const showErrorMessage = () => {
	console.log("error");
	const form = document.querySelector(".form");

	const existingErrorMessage = document.querySelector(".error-message");
	if (!existingErrorMessage) {
		const spanError = document.createElement("span");
		spanError.textContent = "Valid email required";
		spanError.classList.add("error-message");
		form.appendChild(spanError);
	}

	inputEmail.classList.add("error-input");
	inputEmail.classList.remove("email");
};

// Function to remove error message
const removeErrorMessage = () => {
	const form = document.querySelector(".form");
	const spanError = document.querySelector(".error-message");

	if (spanError) {
		form.removeChild(spanError);
		inputEmail.classList.remove("error-input");
		inputEmail.classList.add("email");
	}
};

// Function to validate if email is valid
const validateEmail = email => {
	console.log(typeof email);
	console.log(email.length);
	if (email.length > 0 && email.includes("@") && email.includes(".")) {
		subscribe(email);
	} else {
		showErrorMessage();
	}
};

// Function for dismiss button
const demiss = () => {
	sectionSignUp.style.display = "flex";
	sectionMessage.style.display = "none";
	document.querySelector("#email").value = "";
	inputEmail.classList.remove("error-input");
	inputEmail.classList.add("email");
	removeErrorMessage();
};

// Function for subscribe button
const subscribe = email => {
	console.log(email);
	sectionSignUp.style.display = "none";
	sectionMessage.style.display = "flex";
	document.querySelector("#spnEmail").textContent = email;
};

// Click event for the subscribe button
document.querySelector("#submit").addEventListener("click", function () {
	let inputEmailValue = document.querySelector("#email").value;
	validateEmail(inputEmailValue);
});

// Click event for the dismiss button
document.querySelector("#demiss").addEventListener("click", demiss);

// Event for the subscribe button
inputEmail.addEventListener("keydown", function (e) {
	let inputEmailValue = document.querySelector("#email").value;
	if (e.key === "Enter") {
		validateEmail(inputEmailValue);
	}
});
