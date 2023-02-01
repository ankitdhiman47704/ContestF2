let images_options = document.querySelectorAll(".image");
images_options[0].addEventListener("click", registerForm);

let data = JSON.parse(localStorage.getItem("data"));
let registerBool = false
function registerForm() {
  window.location = "form.html";
}

images_options[1].addEventListener("click", ()=>{
  if(data.length>0){
    showdetailsPage()
  }
});
let showDetailBool = false
function showdetailsPage() {
  if(showDetailBool===false){
    showDetailBool = true
    let div = document.querySelector(".details");
    div.style.display = "flex";
    let para1 = document.createElement("p");
    para1.innerHTML = `Name :  ${data[0].name}`;
    div.appendChild(para1);
    let para2 = document.createElement("p");
    para2.innerHTML = `UserName : ${data[0].username}`;
    div.appendChild(para2);
  }
}
let num = 0;
images_options[2].addEventListener("click",()=> {
  if(showDetailBool===true){
    playgame()
  }
});

function playgame() {
  num++;
  if (num == 1) {
    let detailsdiv = document.querySelector(".details");
    detailsdiv.style.display = "none";
    let game_container = document.querySelector(".game");
    // game_container.style.display = "flex";
    let diceimage = document.createElement("img");

    diceimage.src = "dice1.png";
    game_container.append(diceimage);
    diceimage.addEventListener("click", clicktheDice);
  }
}
let diceclicked = 0;
let sum = 0;
let chances = 0;
function clicktheDice() {
  diceclicked++;
  if (diceclicked <= 3) {
    let number = document.createElement("span");
    let randomnumber = Math.floor(Math.random() * 6) + 1;
    number.innerHTML = randomnumber;
    number.style.fontSize = "70px";
    number.style.fontWeight = "700";
    let div = document.querySelector(".game");
    div.append(number);

    sum += randomnumber;
    if (sum > 10) {
      images_options[3].addEventListener("click", coupongenerated);
    }
    else if (diceclicked == 3 && sum <= 10) {
      if (chances >= 1) {
        alert("BAD LUCK  , YOU DO NOT HAVE ANOTHER CHANCE");
      } else {
        alert("TRY AGAIN");
        sum = 0;
        diceclicked = 0;
        chances++;
        removeAllChildNodes(div)
        num = 0
        playgame();
      }
    }
  }
}
let coupanBool = false
function coupongenerated() {
  if(coupanBool===false){
    coupanBool= true
    let coupan = generateToken()
    let div = document.querySelector(".game");
    removeAllChildNodes(div)
    let coupanDetail = document.querySelector("#coupanDetail")
    let congratulate = document.querySelector("#congratulation")
    coupanDetail.innerHTML = coupan
    congratulate.src = "congratulation.jpg"
  }
}
function removeAllChildNodes(parent) {
  while (parent.firstChild) {
    parent.removeChild(parent.firstChild);
  }
}
function generateToken() {
  let capital_digit = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
  let small_digit = "abcdefghijklmnopqrstuvwxyz"
  let number = "0123456789"
  let special = "!@#$%^&*()_+"

  let characters = capital_digit + small_digit + number + special

  let token = ""
  for (let i = 0; i < 12; i++) {
    let random = Math.floor(Math.random() * characters.length) // 4
    token = token + characters[random]
  }
  return token //  store the token in the perosn object who logged in
}