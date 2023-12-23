const buttons = document.querySelectorAll(".rating-button");
const btnSubmit = document.querySelector("#submit");
const cardRating = document.querySelector(".rating");
const cardTnk = document.querySelector(".tnk");
const yourRated = document.querySelector(".your-rated");

buttons.forEach(function(button){
    button.addEventListener("click",function(){
        buttons.forEach(function(btn){
            btn.classList.remove("selected")
        });
        button.classList.add("selected");
        const btnValue = button.value;
        console.log(btnValue);

        btnSubmit.addEventListener("click",function(){
            submit(btnValue);
        });
    });
});

function submit(value){
    cardRating.style.display = "none";
    cardTnk.style.display = "flex";
    yourRated.textContent = `You selected ${value} out of 5`;
}


