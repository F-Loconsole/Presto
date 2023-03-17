// console.log("Pass");
// control = document.querySelector("#control");
// console.log(control);
let mainNav = document.querySelector("#mainNav");

let logoYellow = document.querySelector('.logoYellow');
let logoBlue = document.querySelector('.logoBlue');

let ruotato=false;
let navIcon = document.querySelector("#navIcon");
navIcon.addEventListener('click', ()=>{
    if (! ruotato){
        navIcon.classList.remove('fa-flip-vertical');
    }
    else {
        navIcon.classList.add('fa-flip-vertical');
        ruotato = ! ruotato;
    }
});
window.addEventListener('scroll', ()=>{
    if (window.scrollY > 0){
        mainNav.style.backgroundColor = '#885100';
        mainNav.style.height = '90px';
        logoYellow.classList.add("d-none");
        logoBlue.classList.remove("d-none");
    }
    else{
        mainNav.style.backgroundColor = 'transparent';
        mainNav.style.height = '55px';
        logoYellow.classList.remove("d-none");
        logoBlue.classList.add("d-none");
   }
});