


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

console.log(windowWidth)