// main.js





const cursor = document.querySelector('#cursor');
const elementsWithHover = document.querySelectorAll('.b1, .b2, .b3, .b4, .b5, .b6, .b7');
let isHovered = false;
let isClicked = false;


// delay of url click

function delay(URL) {
  setTimeout(function () {
    window.location = URL;
  }, 500);
}




// function that incldes everything concerning the cursor
document.addEventListener('mousemove', (event) => {

      if (!isClicked) {
      cursor.style.left = event.clientX + 'px';
      cursor.style.top = event.clientY + 'px';

      

      elementsWithHover.forEach((element) => {
        const rect = element.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;

        if (x >= 0 && x < rect.width && y >= 0 && y < rect.height) {
          isHovered = true;
          element.classList.add('hovered');
        } else {
          element.classList.remove('hovered');
        }
      });
    }

      // changes cursor style 
      if (isHovered) {
        cursor.id = 'cursorhover';
      } else {
        cursor.id = 'cursor';
      }

  
      // expanding animation if cursor is on no hover area
      document.addEventListener('mousedown', () => {
        if (!isHovered){
        cursor.id = 'cursordown';
        }
      });





    document.addEventListener('click', () => {
      if (isHovered) {
        
        isClicked = true;

        
        cursor.style.backgroundColor = "#dbff55";
        cursor.style.width = "200%";
        cursor.style.height = "200%";

        setTimeout(function() {
          cursor.style.backgroundColor = "dbff55";
          cursor.style.width = "80px";
          cursor.style.height = "80px";
          isClicked = false;
          isHovered = true;

          location.reload();
        }, 3500);
        } 

      
      else {
        cursor.id = 'cursor';
      }
    });;



    

}); 

// makes sure the cursor switches back to #cursor when it leaves the hovering area
elementsWithHover.forEach((element) => {
  element.addEventListener('mouseleave', () => {
    isHovered = false;
    element.classList.remove('hovered');
    cursor.id = 'cursor';
  });
});



setInterval(function() {
  console.log(isClicked);
}, 500);

// freezes the mouse after 'click'


// onload scaling animation
/*window.addEventListener('load', function() {
  var container = document.querySelector('.container');
  container.style.transform = 'scale(1)';
});*/

window.addEventListener('load', function() {
  const divs = document.querySelectorAll('.b1, .b2, .b3, .b7, .b5, .b6');

 

  // After a short delay, set the final positions
 
    divs.forEach(div => {
      div.style.transform = 'translate(0px, 0px)';
    });

});
