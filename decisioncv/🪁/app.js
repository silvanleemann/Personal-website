var jet = document.getElementById("jet");
var board = document.getElementById("board");
var start = document.getElementById("startbutton")
var count = 1



// typing effect Pop Up
var i = 0;
var txt = 'Congratulations, you have successfully traveled back in time to the year 2003. Two decades ago, not only was the internet still in its infancy, but the owner of this website was also taking his first steps in the world. On this page, you have the opportunity to get to know Silvan better and to indulge in nostalgia for the internet of the past.'; /* The text */
var speed = 20; /* The speed/duration of the effect in milliseconds */

function typeWriter() {
  if (i < txt.length) {
    document.getElementById("texttyping").innerHTML += txt.charAt(i);
    i++;
    setTimeout(typeWriter, speed);
  }
}

// Age calculator
function calculateAge(birthDate) {
  var today = new Date();
  var birthDateObj = new Date(birthDate);
  var age = today.getFullYear() - birthDateObj.getFullYear();
  var monthDiff = today.getMonth() - birthDateObj.getMonth();
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDateObj.getDate())) {
    age--;
    monthDiff += 12;
  }
  var dayDiff = today.getDate() - birthDateObj.getDate();
  if (dayDiff < 0) {
    monthDiff--;
    var daysInLastMonth = new Date(today.getFullYear(), today.getMonth(), 0).getDate();
    dayDiff += daysInLastMonth;
  }
  var hourDiff = today.getHours() - birthDateObj.getHours();
  if (hourDiff < 0) {
    dayDiff--;
    hourDiff += 24;
  }
  var minDiff = today.getMinutes() - birthDateObj.getMinutes();
  if (minDiff < 0) {
    hourDiff--;
    minDiff += 60;

  }
  var secDiff = today.getSeconds()- birthDateObj.getSeconds();
 if (secDiff < 0) {
    minDiff--;
    secDiff += 60;
 }

  var ageObj = { years: age, months: monthDiff, days: dayDiff, hours: hourDiff, minutes: minDiff, seconds: secDiff };
  return ageObj;
}



// writes age into sketch
function buttonAge (){
var myAge = calculateAge('2003-07-22 18:05:05');
console.log('My age is ' + myAge.years + ' years, ' + myAge.months + ' month(s), ' + myAge.days + ' day(s), ' + myAge.hours + ' hour(s), ' + myAge.minutes + ' minute(s), and ' + myAge.seconds + ' seconds');
document.getElementById('age').innerHTML = '<button onclick="buttonAge()" style="margin-right: 10px"> calculate age</button>';
document.getElementById('age').innerHTML += 'I`m ' + myAge.years + ' years, ' + myAge.months + ' month(s), ' + myAge.days + ' day(s), ' + myAge.hours + ' hour(s), ' + myAge.minutes + ' minute(s), and ' + myAge.seconds + ' seconds old.';
}

// hides the start div when game starts
function hide1(){
   var hidethis = document.getElementById('start');
   hidethis.style.display = "none";

   var body = document.getElementsByTagName('body')
   body.classList.add('no-scroll');
  
   console.log("it worksds")
}





// starts game 
function game() {
  window.addEventListener("keydown", function(e) {
    // space and arrow keys
    if([32, 37, 38, 39, 40].indexOf(e.keyCode) > -1) {
        e.preventDefault();
    }
}, false);

window.addEventListener("keydown", (e) => {
  var left = parseInt(window.getComputedStyle(jet).getPropertyValue("left"));
  if (e.key == "ArrowLeft" && left > -30) {
    jet.style.left = left - 10 + "px";
  }
  //460  =>  board width - jet width
  else if (e.key == "ArrowRight" && left <= 210) {
    jet.style.left = left + 10 + "px";
  }

  if (e.key == "ArrowUp" || e.keyCode == 32) {
    //32 is for space key
    var bullet = document.createElement("div");
    bullet.classList.add("bullets");
    board.appendChild(bullet);

    var movebullet = setInterval(() => {
      var rocks = document.getElementsByClassName("rocks");

      for (var i = 0; i < rocks.length; i++) {
        var rock = rocks[i];
        if (rock != undefined) {
          var rockbound = rock.getBoundingClientRect();
          var bulletbound = bullet.getBoundingClientRect();
      
          
          //Condition to check whether the rock/alien and the bullet are at the same position..!
          //If so,then we have to destroy that rock
          
          if (
            bulletbound.left >= rockbound.left &&
            bulletbound.right <= rockbound.right &&
            bulletbound.top <= rockbound.top &&
            bulletbound.bottom <= rockbound.bottom
          ) {
            

            rock.parentElement.removeChild(rock);
         
            // function should create explosion -> doesn't work so far
            function createExplosion(){ 
            var explosion = document.createElement("div");
            explosion.classList.add("exploded");
            board.appendChild(bullet);
            }

            setInterval(createExplosion,1000);
         
            
            

            //Scoreboard
            document.getElementById("points").innerHTML =
             parseInt(document.getElementById("points").innerHTML) + 1; 
            
         
          }
        }
        
      }

    
      var bulletbottom = parseInt(
        window.getComputedStyle(bullet).getPropertyValue("bottom")
      );

      //Stops the bullet from moving outside the gamebox
      if (bulletbottom >= 500) {
        clearInterval(movebullet);
      }

      bullet.style.left = left + 22 + "px"; //bullet should always be placed at the top of my jet..!
      bullet.style.bottom = bulletbottom + 3 + "px";
    });
  }
});

// var time = decreasing time interval for rocks 

var time = 2000;
  function generaterocks() {
    // create rock element
    var rock = document.createElement("div");
    rock.classList.add("rocks");

    // Just getting the left of the rock to place it in random position...
    var rockleft = parseInt(
      window.getComputedStyle(rock).getPropertyValue("left")
    );

    // Generate value between 0 to 220 where 220 => board width - rock width
    rock.style.left = Math.floor(Math.random() * 220 ) + "px";

    board.appendChild(rock);

    // decrease time interval by 50 milliseconds
    time -= 50;

    // set minimum time interval to 500 milliseconds
    if (time < 300) {
      time = 300;
    }

    // store current time interval in new variable
    var currentInterval = setTimeout(generaterocks, time);

    // when rock is created, clear current interval and update with new time interval
    clearTimeout(currentInterval);
    currentInterval = setTimeout(generaterocks, time);
  }

  // start generating rocks with initial time interval
  var generaterocksInterval = setTimeout(generaterocks, time);



var moverocks = setInterval(() => {
  var rocks = document.getElementsByClassName("rocks");

  if (rocks != undefined) {
    for (var i = 0; i < rocks.length; i++) {
      //Now I have to increase the top of each rock,so that the rocks can move downwards..
      var rock = rocks[i]; //getting each rock
      var rocktop = parseInt(
        window.getComputedStyle(rock).getPropertyValue("top")
      );
      //475 => boardheight - rockheight + 25
      if (rocktop >= 475) {
        alert("Game Over :(");
        clearInterval(moverocks);
        window.location.reload();
        console.log(count);
      }

      rock.style.top = rocktop + 25 + "px";
    }
  }
}, 450);
}

// function again resets local storage
function again (){
  window.localStorage.clear();
  location.reload();
  }



// only show Popup the first time loading the 
function showOnLoad() {
 
  // Check if the flag is set in local storage
  var hasShown = localStorage.getItem('hasShown');

  // If the flag is not set, trigger the function and set the flag in local storage
  if (!hasShown) {
    show('pop1');
    show('pop3');
    show('pop4');
    show('pop5');
    localStorage.setItem('hasShown', true);
  }
}

// shows popup
$ = function(id) {
  return document.getElementById(id);
}

var show = function(id) {
	$(id).style.display ='block';
}

// hides pop up when pressing the button
var hide = function(id) {
	$(id).style.display ='none';
}


// movable pop ups
var currentIndex = 1
const index = document.querySelectorAll(".up")
const elements = document.querySelectorAll('.up')


function move(element) {
  element.style.position = "absolute";

  element.onmousedown = function (e) {
    currentIndex += 2;
    element.style.zIndex = currentIndex;

    var startX = e.clientX;
    var startY = e.clientY;

    var startLeft = parseInt(window.getComputedStyle(element).getPropertyValue("left"));
    var startTop = parseInt(window.getComputedStyle(element).getPropertyValue("top"));

    document.onmousemove = function (e) {
      var x = startLeft + e.clientX - startX;
      var y = startTop + e.clientY - startY;

      element.style.left = x + "px";
      element.style.top = y + "px";
    };

    document.onmouseup = function () {
      document.onmousemove = null;
    };
  };
}

// stacking function for pop-ups
function stack() {
  document.querySelectorAll('.pop').forEach(el => {
    el.addEventListener('mousedown', () => {
      currentIndex += 1;
      el.style.zIndex = currentIndex;
    });
  });
}

function stacky() {
  document.querySelectorAll('.pop').forEach(el => {
    el.addEventListener('click', () => {
      currentIndex += 1;
      el.style.zIndex = currentIndex;
      console.log(el)
    });
  });
}

window.addEventListener('load', function () {
  elements.forEach(element => {
    element.addEventListener('mousedown', () => {
      stack();
      move(element);
      stacky();
    });
  });
});


// Audio play on load


document.addEventListener('DOMContentLoaded', function() {
  var audio = document.getElementById('myAudio');

  // Unmute the audio
  audio.muted = false;
  audio.volume = 0.1;

  // Play the audio
  audio.play();
});