let hideableDivs = document.querySelectorAll(".navbar-column-filler");

function fillerBarRemover () {
    if (window.innerWidth < 992) {
        hideableDivs[0].style.display = "none";
        hideableDivs[1].style.display = "none";
    }
}

function fillerBarShower () {
    if (window.innerWidth >= 992) {
        hideableDivs[0].style.display = "";
        hideableDivs[1].style.display = "";
    }
}

setInterval(function() {
    if(window.innerWidth < 992) {
        fillerBarRemover ();
    } else fillerBarShower();
}, 100);
