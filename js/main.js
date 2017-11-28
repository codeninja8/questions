var questions = document.querySelector('.questions');
var step = 1;
var rotation = 0;
var btnWrapper = document.getElementsByClassName("questions__btns-wrapper");
var butnYes = document.getElementsByClassName("questions__btn--yes");
var butnNo = document.getElementsByClassName("questions__btn--no");
var steps = document.getElementsByClassName("question__steps");
var isIE = /*@cc_on!@*/false || !!document.documentMode;
var func = ['btnYes', 'btnNo'];
var count = 1;
var interval = 5000;

setInterval(function () {
    window[func[Math.floor(Math.random() * func.length)]]();
}, interval);

function btnYes() {
    count++;
    rotation += 180;
    for (var i = 0; i < butnYes.length; i++) {
        butnYes[i].setAttribute("style", "-webkit-animation: hvr-push 0.3s linear 1;animation: hvr-push 0.3s linear 1;z-index: 999;");
    }
    setTimeout(function () {
        if (count == steps.length + 1) {
            initState();
        } else {
            isOPen();
            isEx();
            stepExists();
        }
    }, 200);
}

function btnNo() {
    count++;
    rotation -= 180;
    for (var i = 0; i < butnNo.length; i++) {
        butnNo[i].setAttribute("style", "-webkit-animation: hvr-push 0.3s linear 1;animation: hvr-push 0.3s linear 1;z-index: 999;");
    }
    setTimeout(function () {
        if (count == steps.length + 1) {
            initState();
        } else {
            isOPen();
            isEx();
            stepExists();
        }
    }, 200);
}

function stepExists() {
    var selection = document.querySelector('.question__steps--step-' + step) !== null;
    if (selection) {
        questions.querySelector('.question__steps--step-' + step).style.display = 'none';
        step++;
        nextSelection = document.querySelector('.question__steps--step-' + step) !== null;
        if (nextSelection) {
            for (var i = 0; i < btnWrapper.length; i++) {
                btnWrapper[i].style.display = 'none';
            }
            questions.setAttribute("style", "-webkit-transform: rotateY(" + rotation + "deg); transform: rotateY(" + rotation + "deg)");
            questions.setAttribute('data-direction', 'right');
            for (var i = 0; i < butnNo.length; i++) {
                butnNo[i].removeAttribute("style");
                butnYes[i].removeAttribute("style");
            }
            setTimeout(function () {
                questions.querySelector('.question__steps--step-' + step).style.display = 'block';
                for (var i = 0; i < btnWrapper.length; i++) {
                    btnWrapper[i].style.display = 'block';
                }
            }, 200);
        }
    }
}

function isOPen() {
    if (questions.classList.contains('questions--open')) {
        questions.classList.remove('questions--open');
    } else {
        questions.classList.add('questions--open');
    }
}

function isEx() {
    if (isIE) {
        if (questions.querySelector('.question__steps--step-' + step).parentNode.classList.contains('questions__questions-back')) {
            document.querySelector('.questions__questions-back').style.backgroundColor = 'transparent';
            document.querySelector('.questions__questions-front').style.backgroundColor = '#fff';
        } else {
            document.querySelector('.questions__questions-front').style.backgroundColor = 'transparent';
            document.querySelector('.questions__questions-back').style.backgroundColor = '#fff';
        }
    }
}

function initState() {
    for (var i = 0; i < btnWrapper.length; i++) {
        btnWrapper[i].style.display = 'none';
    }
    count = 1;
    step = 1;
    rotation = 0;
    questions.querySelector('.question__steps--step-7').style.display = 'none';
    questions.removeAttribute("style");
    questions.removeAttribute("data-direction");
    questions.classList.remove("questions--open");
    for (var i = 0; i < butnNo.length; i++) {
        butnNo[i].removeAttribute("style");
        butnYes[i].removeAttribute("style");
    }
    setTimeout(function () {
        questions.querySelector('.question__steps--step-' + 1).style.display = 'block';
        for (var i = 0; i < btnWrapper.length; i++) {
            btnWrapper[i].style.display = 'block';
        }
    }, 200);
}