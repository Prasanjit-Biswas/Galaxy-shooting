const player = document.getElementById("player");
const game = document.getElementById("game");
const aline = document.getElementById("aline");


//result section
var result = document.getElementById("result");
var score = document.getElementById("score");
var counter = 0;


//sound
const shoot = document.getElementById("shoot");
const gameover = document.getElementById("gameOver");



window.addEventListener("keydown", function (e) {
    // right
    if (e.keyCode == "39") {
        var playerLeft = parseInt(window.getComputedStyle(player).getPropertyValue("left"));
        if (playerLeft < 260) {
            player.style.left = (playerLeft + 130) + "px";
        }
    }

    // left
    if (e.keyCode == "37") {
        var playerLeft = parseInt(window.getComputedStyle(player).getPropertyValue("left"));
        if (playerLeft > 0) {
            player.style.left = (playerLeft - 130) + "px";
        }

    }
})


//fire Button
window.addEventListener("keydown", function (e) {
    if (e.keyCode == "32") {
        var cannon = this.document.createElement("div");
        var img = this.document.createElement("img");
        img.src = "fireball.gif";
        img.classList.add("bulletImg");
        cannon.classList.add("bullet");
        cannon.style.left = player.style.left;
        cannon.appendChild(img);
        game.appendChild(cannon);
        shoot.play();

        //when bullet hit aline
        this.setInterval(function collision() {
            var cannonLeft = parseInt(window.getComputedStyle(cannon).getPropertyValue("left"));
            var cannonTop = parseInt(window.getComputedStyle(cannon).getPropertyValue("top"));
            var alineLeft = parseInt(window.getComputedStyle(aline).getPropertyValue("left"));
            var alineTop = parseInt(window.getComputedStyle(aline).getPropertyValue("top"));

            if (((cannonTop - alineTop) < 50) && (alineTop < cannonTop) && (alineLeft === cannonLeft)) {
                cannon.style.display = "none";
                aline.style.display = "none";
            }
        }, 10)

        setTimeout(function () { cannon.remove() }, 1000)

    }


})

//aline move
function alineMove() {
    aline.style.display = "block";
    var random = ((Math.floor(Math.random() * 3)) * 130);
    aline.style.left = random + "px";
    aline.classList.add("alineMove");
    counter++;
    if (counter > 20) {
        aline.style.animationDuration = '0.7s';
    }
}
setInterval(alineMove, 1000);

//game over
function gameOver() {
    var alineTop = parseInt(window.getComputedStyle(aline).getPropertyValue("top"));
    if (alineTop > 400) {
        result.style.display = "block";
        game.style.display = 'none';
        score.innerHTML = `score : ${counter}`;
        counter = 0;
        gameover.play();
    }
}

setInterval(gameOver, 10);