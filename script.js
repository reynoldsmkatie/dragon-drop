// Checks if window has loaded and displays message that you should switch to Landscape on mobile for best gameplay:
window.addEventListener('load', () => {
    if(window.innerHeight > window.innerWidth){
        alert("Rotate your device horizontally for best gameplay mode!");
    }
  });

// Prevents you from accidentally dragging the Dragon, should only be able to drag coins
document.getElementById('dragon').ondragstart = function() { return false; };

// Sets newScore variable to 0 at at start of game
var newScore = 0;

// Controls the timer countdown / Start button
function startTimer () {
  // Moves the original start button from middle of screen to top when you click it, and adjusts some of its properties
    document.getElementById("overlaystartgame").style.display = "none";
    startButton = document.getElementById('startgame');
    startButton.style.fontSize = "30px";
    startButton.style.borderRadius = "15px";
    startButton.style.width = "275px";
    startButton.style.height = "50px";
    newStartButton = document.getElementById('gametimerafter');
    newStartButton.append(startButton);
    let timeleft = 10;

    document.getElementById('score').innerHTML = "Score: " + '<span style="color:#4CBB17">$' + newScore + '</span>';
    let gameTimer = setInterval(countdown, 1000);
    function countdown () {
    if (timeleft <= 0) {
        clearInterval(gameTimer);   document.getElementById("overlayend").style.display = "block";
        document.getElementById("finalscore").innerHTML = "Score: " + '<span style="color:#4CBB17;">$' + newScore + '</span>';
    } else {
        document.getElementById("startgame").innerHTML = timeleft; 
        document.getElementById("startgame").style.backgroundColor = "rgb(185, 42, 42)";
        document.getElementById("startgame").style.fontSize = "30px";
        document.getElementById("startgame").style.border = "0px";
        document.getElementById("startgame").style.color = "white";
        document.getElementById("startgame").style.width = "100px";
        document.getElementById("startgame").style.height = "50px";
    }
    timeleft -=1;
}
};

// Drag and Drop Functionality
var dragndrop = (function() {
    var myX = "";
    var myY = "";
    var whichArt = "";
    function resetZ() {
        var elements = document.getElementById('allcoins').getElementsByTagName('*');
        for (var i = elements.length - 1; i > 0; i--) {
            elements[i].style.zIndex = 5;
        };
    }
    function moveStart(e) {
        whichArt = e.target;
        myX = e.offsetX === undefined ? e.layerX : e.offsetX;
        myY = e.offsetY === undefined ? e.layerY : e.offsetY;
        resetZ();
        whichArt.style.zIndex = 10;
    }
    function moveDragOver(e) {
        e.preventDefault();
    }
    function moveDrop(e) {
        e.preventDefault ();
        whichArt.style.left = e.pageX - myX + 'px';
        whichArt.style.top = e.pageY - myY + 'px';
        var finalLeft = whichArt.style.left.substr(0, whichArt.style.left.length-2);
        var finalTop = whichArt.style.top.substr(0, whichArt.style.top.length-2);
        if (
            finalLeft > 845 && 
            finalLeft < 1115 && 
            finalTop > 100 && 
            finalTop < 350) {
         if (whichArt.classList.contains("galleoncoins")) {
            var cashSound = new Audio("images/cash-register.mp3");
            cashSound.play();
           newScore = newScore + 1000;
           whichArt.setAttribute("draggable", "false");
           document.getElementById('score').innerHTML = "Score: " + '<span style="color:#4CBB17;">$' + newScore + '</span>';
         }
         else if (whichArt.classList.contains("sicklecoins")) {
            var cashSound = new Audio("images/cash-register.mp3");
            cashSound.play();
            newScore = newScore + 500;
            whichArt.setAttribute("draggable", "false");
            document.getElementById('score').innerHTML = "Score: " + '<span style="color:#4CBB17">$' + newScore + '</span>';
          }
         else {
            var cashSound = new Audio("images/cash-register.mp3");
            cashSound.play();
           newScore = newScore + 250;
           whichArt.setAttribute("draggable", "false");
           document.getElementById('score').innerHTML = "Score: " + '<span style="color:#4CBB17">$' + newScore + '</span>';
         }
        }
    } 

    // Controls the touch functions for mobile
    
    function touchStart(e) {
        whichArt = e.target;
        if (whichArt.classList.contains("galleoncoins") || whichArt.classList.contains("sicklecoins") || whichArt.classList.contains("knutcoins") || whichArt.classList.contains("sackofcoins")) {
        const touch = e.touches[0];
        const moveOffsetX = whichArt.offsetLeft - touch.pageX;
        const moveOffsetY = whichArt.offsetTop - touch.pageY;

        whichArt.addEventListener("touchmove", touchMove, {passive: false});

        function touchMove(e) {
          e.preventDefault();
          resetZ();
          whichArt.style.zIndex = 10;
          const touch = e.touches[0];
          const positionX = touch.pageX + moveOffsetX;
          const positionY = touch.pageY + moveOffsetY;
          whichArt.style.left = `${positionX}px`;
          whichArt.style.top = `${positionY}px`;
          mobileFinalLeft = whichArt.style.left.substr(0, whichArt.style.left.length-2);
          mobileFinalTop = whichArt.style.top.substr(0, whichArt.style.top.length-2);
    }}}
    function touchEnd(e) {
        if (whichArt.classList.contains("galleoncoins") || whichArt.classList.contains("sicklecoins") || whichArt.classList.contains("knutcoins") || whichArt.classList.contains("sackofcoins")) {
        whichArt = e.target;
        if (
            mobileFinalLeft > 845 && 
            mobileFinalLeft < 1115 && 
            mobileFinalTop > 100 && 
            mobileFinalTop < 350) {
                if (whichArt.classList.contains("galleoncoins")) {
                    var cashSound = new Audio("images/cash-register.mp3");
                    cashSound.play();
                    whichArt.style.pointerEvents = "none";
                   newScore = newScore + 1000;
                   document.getElementById('score').innerHTML = "Score: " + '<span style="color:#4CBB17;">$' + newScore + '</span>';
                 }
                 else if (whichArt.classList.contains("sicklecoins")) {
                    var cashSound = new Audio("images/cash-register.mp3");
                    cashSound.play();
                    whichArt.style.pointerEvents = "none";
                    newScore = newScore + 500;
                    document.getElementById('score').innerHTML = "Score: " + '<span style="color:#4CBB17">$' + newScore + '</span>';
                  }
                 else {
                    var cashSound = new Audio("images/cash-register.mp3");
                    cashSound.play();
                    whichArt.style.pointerEvents = "none";
                   newScore = newScore + 250;
                   document.getElementById('score').innerHTML = "Score: " + '<span style="color:#4CBB17">$' + newScore + '</span>';
                 }
        }}}
    document.querySelector('body').addEventListener('dragstart', moveStart, false);
    document.querySelector('body').addEventListener('dragover', moveDragOver, false);
    document.querySelector('body').addEventListener('drop', moveDrop, false);
    document.querySelector('body').addEventListener('touchstart', touchStart, {passive: false});
    document.querySelector('body').addEventListener('touchend', touchEnd, {passive: false});
})();

// Ready to Play? Button
function readyToPlay () {
    overlayDiv = document.getElementById("overlay");
    overlayDiv.style.display = "none";
    document.getElementById("overlaystartgame").style.display = "block";
}


// Controls the dragon fire animation
let changeInterval;
let dragonImage;
window.addEventListener("load", function() {
  dragonImage = document.getElementById("dragon");
  changeInterval = setInterval(dragonColorChange, 300);
})

function dragonColorChange() {
    var toggle = dragonImage.dataset.toggle;
    if (toggle === "0") {
      src = "images/dragonfire2.svg"
      dragonImage.src = src;
      dragonImage.dataset.toggle = "1";
    }
    else if (toggle === "1") {
        src = "images/dragonfire1.svg"
        dragonImage.src = src;
        dragonImage.dataset.toggle = "2";
    }
    else if (toggle === "2") {
        src = "images/dragonfire3.svg"
        dragonImage.src = src;
        dragonImage.dataset.toggle = "3";
    }
    else {
        src = "images/dragon.svg"
        dragonImage.src = src;
        dragonImage.dataset.toggle = "0";
    }
}