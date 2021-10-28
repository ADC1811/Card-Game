const section = document.querySelector("section");
const playerLivesCount = document.querySelector("span");
let playerLives =6;

playerLivesCount.textContent = playerLives;
const getData = () => [
    { imgSrc: "./pic.png", name: "PIC"},
    {imgSrc: "./pic2.png", name: "PIC2"},
    {imgSrc: "./pic3.png", name: "PIC3."},
    {imgSrc: "./pic4.png", name: "PIC4"},
    { imgSrc: "./pic.png", name: "PIC"},
    {imgSrc: "./pic4.png", name: "PIC4"},
    {imgSrc: "./pic2.png", name: "PIC2"},
    {imgSrc: "./pic3.png", name: "PIC3"},
    {imgSrc: "./pic5.png", name: "PIC5"},
    {imgSrc: "./pic6.png", name: "PIC6"},
    {imgSrc: "./pic7.png", name: "PIC7"},
    {imgSrc: "./pic8.png", name: "PIC8"},
    {imgSrc: "./pic6.png", name: "PIC6"},
    {imgSrc: "./pic8.png", name: "PIC8"},
    {imgSrc: "./pic5.png", name: "PIC5"},
    {imgSrc: "./pic7.png", name: "PIC7"},
];
const randomize = () => {
    const cardData = getData(); 
    cardData.sort(() => Math.random() -0.5);
    return cardData;
};
const cardGenerator = () => {
    const cardData = randomize();
    console.log(cardData);
    cardData.forEach((item) => {
        const card=document.createElement("div");
        const face = document.createElement("img");
        const back = document.createElement("div");
        card.classList="card";
        face.classList="face";
        back.classList="back";

        face.src=item.imgSrc;
        card.setAttribute("name",item.name);
        section.appendChild(card);
        card.appendChild(face);
        card.appendChild(back);
        card.addEventListener("click", (e) => {
            card.classList.toggle("toggleCard");
            checkCards(e);
        });
    }); 
};

const checkCards = (e) => {
    const clickedCard = e.target;
    clickedCard.classList.add("flipped");
    const flippedCards=document.querySelectorAll(".flipped");
    const toggleCard=document.querySelectorAll(".toggleCard");
    console.log(flippedCards);
//Logic
    if(flippedCards.length==2){
        if(flippedCards[0].getAttribute("name")=== flippedCards[1].getAttribute("name")
        ){
            console.log("match");
            flippedCards.forEach((card)=> {
                card.classList.remove("flipped");
                card.style.pointerEvents="none";
            });
        } else{
            console.log("wrong");
            flippedCards.forEach(card => {
                card.classList.remove("flipped");
                setTimeout(() => card.classList.remove("toggleCard"), 1000);
            });
            playerLives--;
            playerLivesCount.textContent=playerLives;
            if(playerLives===0){
                Restart("Try Again!!!");
            }
        }
    }
    //Run a check
    if(toggleCard.length===16){
        Restart("You Won!!!");
    }
};

//Restart
const Restart= (text) => {
    let cardData=randomize();
    let faces = document.querySelectorAll(".face");
    let cards = document.querySelectorAll(".card");
    section.style.pointerEvents="none";
    cardData.forEach((item,index) => {
        cards[index].classList.remove("toggleCard");
        //Randomize
        setTimeout(()=> {
            cards[index].style.pointerEvents="all";
            faces[index].src=item.imgSrc;
            cards[index].setAttribute("name", item.name);
        }, 1000);
        
    });
    playerLives=6;
    playerLives.textContent=playerLives;
    setTimeout(() => window.alert(text), 100);
};
cardGenerator();
