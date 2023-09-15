


window.addEventListener('load', function() {
    const content = document.querySelectorAll('.pre');
    console.log("content")
    for (let i = 0; i < content.length; i++) {
        content[i].classList.add('after');
    }
});

const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        console.log (entry)
        if (entry.isIntersecting) {
            entry.target.classList.add('show');
        } else {
            entry.target.classList.remove('show')
        }
    });
});



const hiddenElements = document.querySelectorAll('.hidden');
hiddenElements.forEach((el) => observer.observe(el));



var i = 0;
var txt = 'The purpose of this website is to teach myself the coding basics while creating a product that reflects who I am and that I am proud to share with others. It was designed to be colorful, appealing, abstract, playful, and entertaining, striking a balance between a business portfolio and a personal blog.'; /* The text */
var speed = 24; /* The speed/duration of the effect in milliseconds */

function typeWrite() {
  if (i < txt.length) {
    document.getElementById("type").innerHTML += txt.charAt(i);
    i++;
    setTimeout(typeWrite, speed);
  }

   if (i === txt.length){
    var expl = document.querySelectorAll(".explore")[0];
    expl.classList.add('pop');


  }
}

window.onload = typeWrite;