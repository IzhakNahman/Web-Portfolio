$(document).ready(function () {

    // $("h1").text("משחק לתרגול חשבון - " + prompt("הקלד את שמך"));




    myFunction();

    $("#showTable").click(function () {
        $("#imgRelated").fadeToggle("slow");
    });

    $("#hideButtonFirst").click(function () {
        var a = $("#hideButtonFirst");
        $("#firstMenu").fadeToggle("fast");

        if (a.html() == "הצג") {
            a.html("הסתר");
            console.log($("#firstMenu").html());
        } else {
            a.html("הצג");
        }

    });

    $("#showButtonSecond").click(function () {
        $("#secondMenu").fadeToggle("fast");
        var a = $("#showButtonSecond");
        if (a.html() == "הצג") {
            a.html("הסתר");
            console.log($("#firstMenu").html());
        } else {
            a.html("הצג");
        }
    });


    $("#showButtonSecond").hover(function () {
        $("#secondMenu").fadeToggle("fast");
        var a = $("#showButtonSecond");
        if (a.html() == "הצג") {
            a.html("הסתר");
            console.log($("#firstMenu").html());
        } else {
            a.html("הצג");
        }
    });



    $(document).on('keypress', function (e) {
        if (e.which == 13 && $("#result").val() != "" && $('#result').prop("disabled") == false) {
            check();
        }
    });

    $("#startEx").focus();
    $("#startEx").animate({
        opacity: '0.5'
    }, 500);
    $("#startEx").animate({
        opacity: '1'
    }, 500);
    $("#startEx").animate({
        opacity: '0.5'
    }, 500);
    $("#startEx").animate({
        opacity: '1'
    }, 500);
    $("#startEx").animate({
        opacity: '0.5'
    }, 500);
    $("#startEx").animate({
        opacity: '1'
    }, 500);





});





var methArray = [];
var maxNumber = 10;
var answear = 0;
var flagStart = 0;
var flagCheck = 0;
var playerPoints = 0;
var counterID = 1;
var trID = 1;
var myInterval;
var counter = 21;
var counterPoints = 0;
var counterStart = 21;


function animateStart() {
    $("#startEx").animate({
        opacity: '0.5'
    }, 500);
    $("#startEx").animate({
        opacity: '1'
    }, 500);
    $("#startEx").animate({
        opacity: '0.5'
    }, 500);
    $("#startEx").animate({
        opacity: '1'
    }, 500);
}

function startCount() {
    myInterval = setInterval(function () {
        if (counter > 0) {
            counter--;
            counterPoints = counter;
            startRun();
        }
        $("#counterSec").text(counter);
    }, 1000);
}

function startRun() {

    if (counter >= 19) {
        $("#second").css("margin-left", "0px");
    }
    if (counter > 0)
        $("#second").css("margin-left", "+=12px");



}




function stopCount() {
    clearInterval(myInterval);
    counter = 21;

}

function myFunction() {


    chooseMaxNum(10, $("#ten"), $("#hundred"), $("#thousand"));
    addMethToArray($("#pMeth")[0]);


}

function chooseMaxNum(num, element, element2, element3) {
    maxNumber = num;
    console.log("num" + num);
    var element = $("#" + element.id);
    var element2 = $("#" + element2.id);
    var element3 = $("#" + element3.id);

    element.css("border", "3px solid red");
    element2.css("border", "none");
    element3.css("border", "none");

}

function addMethToArray(element) {
    if (element.checked == true) {
        var flag = 0;
        for (var i = 0; i < methArray.length; i++) {
            if (methArray[i] == element.value) {
                flag = 1;
            }

        }
        if (flag == 0) {
            methArray.push(element.value);

        }
    } else {

        for (var i = 0; i < methArray.length; i++) {
            if (methArray[i] == element.value) {
                methArray.splice(i, 1);
            }
        }
    }
    console.log(methArray);

}





function startMath(num) {
    console.log('startMath');
    if (num == 1) {
        flagStart = 0;
        $("#startEx").prop("disabled", false);
        var txt = $("#firstNumberE").text() + " " + $("#methodE").text() + " " + $("#secondNumberE").text();
        var num = Number(calculate($("#methodE").text(), $("#firstNumberE").text(), $("#secondNumberE").text()));
        addToTableJump(txt, $("#methodE").text(), num);
        stopCount();
        flagStart = 0;

    }
    if (maxNumber > 0 && methArray.length > 0 && flagStart == 0) {

        $("#second").css('background-image', 'url("images/runer.gif")');
        $("#first").css('background-image', 'url("images/track.png');
        startCount();

        console.log("counter: " + counter);
        $("#result").prop("disabled", false);
        $("#result").val("");
        $("#textWinLose").text("");

        flagStart = 1;
        $("#startEx").prop("disabled", true);
        $("#checkEx").prop("disabled", false);
        $("#jumpEx").prop("disabled", false);

        var numMath = Math.floor(Math.random() * methArray.length);
        var num2 = Math.floor(Math.random() * maxNumber) + 1;
        var num1 = Math.floor(Math.random() * maxNumber) + 1;

        if (methArray[numMath] == "/") {
            while (Number.isInteger(num1 / num2) == false) {

                var num2 = Math.floor(Math.random() * maxNumber) + 1;
                var num1 = Math.floor(Math.random() * maxNumber) + 1;
            }
        }

        if (methArray[numMath] == "-" && Number(num1) - Number(num2) < 0) {

            var num3 = num1;
            num1 = num2;
            num2 = num3;
        }

        $("#firstNumberE").text(num1);
        $("#secondNumberE").text(num2);
        $("#methodE").text(methArray[numMath]);
        $("#result").css("background-color", "white");
        $("#result").focus();

    }
}

function methToHebrew(text) {

    switch (text) {
        case "/":
            return "חילוק";
            break;
        case "x":
            return "כפל";
            break;
        case "+":
            return "חיבור";
            break;
        case "-":
            return "חיסור";
            break;
    }
}

function trueFalseToHebrew(trueFalse) {

    switch (trueFalse) {
        case true:
            return "נכון";
            break;
        case false:
            return "לא נכון";
            break;
    }

    return "לא נכון";

}

function addToTable(numbers, meth, playerResult, resultEx, trueFalse, points) {
    var tbody = $("#tBody");
    var numBonus = 0;
    if (counterPoints > 0 && trueFalse == true) {
        points += 5;
        numBonus = 5;
    }

    var tr = $("<tr></tr>");
    console.log(tr);
    tbody.prepend("<tr id='tr" + trID + "'><th>" + counterID + "</th><td>" + numbers +
        "</td><td>" + methToHebrew(meth) + "</td><td>" + playerResult + "</td><td>" +
        resultEx + "</td><td>" + trueFalseToHebrew(trueFalse) + "</td><td>" + numBonus + "</td><td>" + points + "</td></tr>");

    if (trueFalse == true) {
        $("#tr" + trID).addClass("bg-success");
    } else {
        $("#tr" + trID).addClass("bg-danger");
    }



    trID++;
    counterID++;
    playerPoints += points;

    $("#sumPoints").text(playerPoints);



}

function addToTableJump(numbers, meth, resultEx) {
    //$("#firstNumberE").text()

    var tbody = $("#tBody");
    tbody.prepend("<tr><th>" + counterID + "</th><td>" + numbers +
        "</td><td>" + methToHebrew(meth) + "</td><td>-</td><td>" +
        resultEx + "</td><td>-</td><td>-</td><td>0</td></tr>");

    $("#tBody > tr").addClass("bg-secondary");


    counterID++;
    $("#sumPoints").text(playerPoints);
}

function check() {
    console.log("flagStart" + flagStart);
    if (flagStart == 1 && $("#result").val() != "") {
        console.log("counter: " + counter);
        //var counter = 0;
        stopCount();
        flagStart = 0;
        $("#checkEx").prop("disabled", true);
        $("#result").prop("disabled", true);
        $("#startEx").prop("disabled", false);
        $("#jumpEx").prop("disabled", true);
        var num = Number(calculate($("#methodE").text(), $("#firstNumberE").text(), $("#secondNumberE").text()));
        console.log(num);
        if (Number($("#result").val()) == num) {
            console.log("succses");
            $("#textWinLose").addClass("text-success");
            $("#textWinLose").removeClass("text-danger");
            $("#textWinLose").text("!תשובה נכונה");
            var txt = $("#firstNumberE").text() + " " + $("#methodE").text() + " " + $("#secondNumberE").text();
            addToTable(txt, $("#methodE").text(), $("#result").val(), num, true, 10);

        } else {
            console.log("failed");
            $("#textWinLose").addClass("text-danger");
            $("#textWinLose").removeClass("text-success");
            $("#textWinLose").text("תשובה שגויה");
            var txt = $("#firstNumberE").text() + " " + $("#methodE").text() + " " + $("#secondNumberE").text();

            addToTable(txt, $("#methodE").text(), $("#result").val(), num, false, 3);

        }

        $("#startEx").focus();
        animateStart();

    } else {
        alert("הזן תשובה");
        $("#result").focus();
        console.log($("result"));

    }


}


function calculate(sign, num1, num2) {

    switch (sign) {
        case "/":
            return Number(num1) / Number(num2);
            break;
        case "x":
            return Number(num1) * Number(num2);
            break;
        case "+":
            return Number(num1) + Number(num2);
            break;
        case "-":
            return Number(num1) - Number(num2);
            break;
    }

    return 0;
}


function refresh() {
    location.reload();
}