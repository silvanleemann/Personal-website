//function to make items draggable
var chooseElement;
var currentIndex = 1
const elements = document.querySelectorAll(".draggable")
const index = document.querySelectorAll (".movies")



  function move (element) {
    elements.forEach(element => {
      element.addEventListener("mousedown", () =>{
        element.style.position = "absolute"
        chooseElement = element

        document.onmousemove = (e) => {
          var x = e.pageX
          var y = e.pageY

          chooseElement.style.left =  x -20 + "px"
          chooseElement.style.top =  y -20 + "px"

    
            
          

        }

      })
    })
    document.onmouseup = function(e){
      document.onmousemove = null;
    }
    index.forEach((popElement) => {
      popElement.addEventListener("mousedown", () => {
        currentIndex += 2;
        popElement.style.zIndex = currentIndex;
      })
    })
  }

  
  
  function highlight(element) {
    const items = document.querySelectorAll(".img");
    items.forEach((item) => {
      let isHighlighted = false; // Track the highlight state
  
      item.addEventListener("click", () => {
        if (isHighlighted) {
          item.style.backgroundColor = "rgb(0, 40, 190, 0)"; // Remove highlight
        } else {
          item.style.backgroundColor = "rgb(88, 115, 219)"; // Apply highlight
        }
        
        isHighlighted = !isHighlighted; // Toggle the highlight state
      });

      item.addEventListener("mousedown", () => {
       
          item.style.backgroundColor = "rgb(88, 115, 219)"; // Apply highlight
      });
    });
    
    
}

// stacking function for pop-ups
function stack () {
  document.querySelectorAll('.pop').forEach(el => {
    el.addEventListener('mousedown', () => {
      currentIndex += 1
      el.style.zIndex = currentIndex
      
    })
  })
}


// stacking function for folders
function stackFolder () {
  document.querySelectorAll('.draggable').forEach(el => {
    el.addEventListener('mousedown', () => {
      currentIndex += 1
      el.style.zIndex = currentIndex
      
    })
  })
}

// function for opening on dblclick
function open() {
  document.querySelectorAll('.draggable').forEach(img => {
    img.addEventListener('dblclick', () => {
      const popToOpen = img.querySelector('.pop');
      popToOpen.style.display = "block";
    });
  });
}

// function to close by clicking red btn
function close() {
  document.querySelectorAll('.red').forEach(btn => {
    btn.addEventListener('click', () => {
      const parentDiv = btn.closest('.pop');
      if (parentDiv) {
        parentDiv.style.display = "none";
      }
    });
  });
}

//onlaod blue color slide + loading all functions
window.addEventListener('load', function() {
  move(); // draggable function
  highlight();
  stack();
  stackFolder ();
  open ();
  close();




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



