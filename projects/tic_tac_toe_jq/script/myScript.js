




var player1 = "";
var player2 = "";
var playerScore1 = 0;
var playerScore2 = 0;
var flagStart = 0;
var counterSteps = 1;
var flagWin = 0;
var playerTurn = 0;
var flagHuman = 0;
var flagComp = 0;
var roundTurn = 1;
var bigBoxArray = ["box1", "box2", "box3", "box4", "box5", "box6", "box7", "box8", "box9"];
var compLevel = "";
var gamesPlayed = 0;


$(document).ready(function () {

    $("#startGame").hide();
    $("#restartGame").hide();
    $("#chooseXO").hide();
    $("#chooseLevel").hide();

    $("#humanComputer button").click(function () {
        if ($(this).attr('id') == "human") {
            flagHuman = 1;
            console.log("flagHuman " + flagHuman);
            $("#chooseXO").show();
            $("#humanComputer").hide();
        } else {
            flagComp = 1;
            console.log("flagComp " + flagComp);
            $("#chooseLevel").show();
            $("#humanComputer").hide();
        }
    });


    $("#chooseLevel button").click(function () {
        compLevel = $(this).attr('id');
        $("#chooseXO").show();
        $("#chooseLevel").hide();

        console.log("compLevel: " + compLevel);

    });

    $("#chooseXO button").click(function () {

        if ($(this).attr('id') == "xChoosed") {
            player1 = "X";
            player2 = "O";
        } else {
            player1 = "O";
            player2 = "X";
        }


        playerTurn = 1;
        $("#chooseXO").hide();
        $("#startGame").show();

        console.log("player1: " + player1);
        console.log("player2: " + player2);

    });







});




function startTheGame() {
    $("#startGame").hide();
    $("#restartGame").show();
    $("#bigBox").css('visibility', 'visible');

    playersSection();
    playerTurnCheck();
    gamesPlayedCounter();
}

function playersSection() {
    if (flagComp == 1)
        var str = "computer";
    else
        var str = "player2";

    $("#player1Score").text("player1 (" + player1 + ") score: " + playerScore1);
    $("#player2Score").text(str + " (" + player2 + ") score: " + playerScore2);

    if (playerScore1 > playerScore2) {
        $("#player1Score").addClass("bg-success");
        $("#player2Score").removeClass("bg-success");
    } else if (playerScore1 < playerScore2) {
        $("#player2Score").addClass("bg-success");
        $("#player1Score").removeClass("bg-success");
    } else {
        $("#player2Score").removeClass("bg-success");
        $("#player1Score").removeClass("bg-success");
    }

}


function playerTurnCheck() {
    if (flagComp == 1)
        var str = "computer";
    else
        var str = "player2";

    if (playerTurn == 1)
        $("#playerTurnNew").text("player turn: player1 (" + player1 + ")");
    else
        $("#playerTurnNew").text("player turn: " + str + " (" + player2 + ")");
}




function gamesPlayedCounter() {
    $("#gamesCounter").text("Games played : " + gamesPlayed);
}

function checkPlayer() {
    if (playerTurn == 1) {
        playerTurn = 2;
        return player1;
    }
    else {
        playerTurn = 1;
        return player2;
    }

}



function addXO(boxId) {

    if ($("#" + boxId).text() != player1 && $("#" + boxId).text() != player2 && flagWin == 0) {
        humanTurn(boxId);
        if (checkDraw() == false)
            computerTurn();
        checkDraw();
        playerTurnCheck();
    }

}

function checkDraw() {
    if (counterSteps > 9 && flagWin == 0) {
        $("#whoWin").text("");
        $("#whoWin").append("<p> It's a draw.. try again! </p>");
        $('#exampleModal').modal('show');
        return true;
    }
    return false;
}

function humanTurn(boxId) {

    $("#" + boxId).text(checkPlayer());
    counterSteps++;
    if (counterSteps > 5) {
        checkWin(boxId);
        console.log(boxId);
    }

    console.log("counterSteps" + counterSteps);
    if ($("#" + boxId).text() == "O") {
        $("#" + boxId).addClass("text-danger");
        $("#" + boxId).removeClass("text-body");
    } else {
        $("#" + boxId).removeClass("text-danger");
        $("#" + boxId).addClass("text-body");
    }

}

function computerTurn() {
    removeHumanBoxes();
    var num = Math.floor(Math.random() * bigBoxArray.length);
    if (flagComp == 1 && flagWin == 0) {
        if (compLevel == "Beginner") {
            $("#" + bigBoxArray[num]).text(checkPlayer());

            if ($("#" + bigBoxArray[num]).text() == "O") {
                $("#" + bigBoxArray[num]).addClass("text-danger");
                $("#" + bigBoxArray[num]).removeClass("text-body");
            } else {
                $("#" + bigBoxArray[num]).removeClass("text-danger");
                $("#" + bigBoxArray[num]).addClass("text-body");
            }

            counterSteps++;
            console.log("counterSteps" + counterSteps);

            if (counterSteps > 5) {
                checkWin(bigBoxArray[num]);
            }


        } else {
            if (checkBestMove() == false) {
                $("#" + bigBoxArray[num]).text(checkPlayer());
                if ($("#" + bigBoxArray[num]).text() == "O") {
                    $("#" + bigBoxArray[num]).addClass("text-danger");
                    $("#" + bigBoxArray[num]).removeClass("text-body");
                } else {
                    $("#" + bigBoxArray[num]).removeClass("text-danger");
                    $("#" + bigBoxArray[num]).addClass("text-body");
                }

                counterSteps++;
                console.log("counterSteps" + counterSteps);

                if (counterSteps > 5) {
                    checkWin(bigBoxArray[num]);
                }
            }
        }



    }


}

function checkTwoComp(id1, id2, boxId, wichPlayer) {
    var x1 = $("#" + id1).text();
    var x2 = $("#" + id2).text();
    console.log("x1 " + x1 + " x2 " + x2 + "player1 " + player1);

    if (x1 == x2 && x1 == wichPlayer) {
        $("#" + boxId).text(checkPlayer());
        if ($("#" + boxId).text() == "O") {
            $("#" + boxId).addClass("text-danger");
            $("#" + boxId).removeClass("text-body");
        } else {
            $("#" + boxId).removeClass("text-danger");
            $("#" + boxId).addClass("text-body");
        }
        console.log("checkTwoComp " + true);
        counterSteps++;
        console.log("counterSteps" + counterSteps);

        if (counterSteps > 5) {
            checkWin(boxId);
        }
        return true;
    }
    return false;
}

function checkStopComp(boxId) {
    console.log("checkStopComp " + boxId);
    switch (boxId) {
        case "box1":
            if (checkTwoComp('box2', 'box3', boxId, player1) == true)
                return true;
            if (checkTwoComp('box5', 'box9', boxId, player1) == true)
                return true;
            if (checkTwoComp('box4', 'box7', boxId, player1) == true)
                return true;

            break;
        case "box2":
            if (checkTwoComp('box1', 'box3', boxId, player1) == true)
                return true;
            if (checkTwoComp('box5', 'box8', boxId, player1) == true)
                return true;
            break;
        case "box3":
            if (checkTwoComp('box1', 'box2', boxId, player1) == true)
                return true;
            if (checkTwoComp('box6', 'box9', boxId, player1) == true)
                return true;
            if (checkTwoComp('box5', 'box7', boxId, player1) == true)
                return true;

            break;
        case "box4":
            if (checkTwoComp('box5', 'box6', boxId, player1) == true)
                return true;
            if (checkTwoComp('box1', 'box7', boxId, player1) == true)
                return true;


            break;
        case "box5":
            if (checkTwoComp('box4', 'box6', boxId, player1) == true)
                return true;
            if (checkTwoComp('box2', 'box8', boxId, player1) == true)
                return true;
            if (checkTwoComp('box1', 'box9', boxId, player1) == true)
                return true;
            if (checkTwoComp('box3', 'box7', boxId, player1) == true)
                return true;

            break;
        case "box6":
            if (checkTwoComp('box3', 'box9', boxId, player1) == true)
                return true;
            if (checkTwoComp('box4', 'box5', boxId, player1) == true)
                return true;

            break;
        case "box7":
            if (checkTwoComp('box8', 'box9', boxId, player1) == true)
                return true;
            if (checkTwoComp('box3', 'box5', boxId, player1) == true)
                return true;
            if (checkTwoComp('box1', 'box4', boxId, player1) == true)
                return true;

            break;
        case "box8":
            if (checkTwoComp('box7', 'box9', boxId, player1) == true)
                return true;
            if (checkTwoComp('box2', 'box5', boxId, player1) == true)
                return true;

            break;
        case "box9":
            if (checkTwoComp('box3', 'box6', boxId, player1) == true)
                return true;
            if (checkTwoComp('box7', 'box8', boxId, player1) == true)
                return true;
            if (checkTwoComp('box1', 'box5', boxId, player1) == true)
                return true;

            break;
    }
    console.log("checkStopComp " + false);
    return false;


}

function checkWinComp(boxId) {
    console.log("checkStopComp " + boxId);
    switch (boxId) {
        case "box1":
            if (checkTwoComp('box2', 'box3', boxId, player2) == true)
                return true;
            if (checkTwoComp('box5', 'box9', boxId, player2) == true)
                return true;
            if (checkTwoComp('box4', 'box7', boxId, player2) == true)
                return true;

            break;
        case "box2":
            if (checkTwoComp('box1', 'box3', boxId, player2) == true)
                return true;
            if (checkTwoComp('box5', 'box8', boxId, player2) == true)
                return true;
            break;
        case "box3":
            if (checkTwoComp('box1', 'box2', boxId, player2) == true)
                return true;
            if (checkTwoComp('box6', 'box9', boxId, player2) == true)
                return true;
            if (checkTwoComp('box5', 'box7', boxId, player2) == true)
                return true;

            break;
        case "box4":
            if (checkTwoComp('box5', 'box6', boxId, player2) == true)
                return true;
            if (checkTwoComp('box1', 'box7', boxId, player2) == true)
                return true;


            break;
        case "box5":
            if (checkTwoComp('box4', 'box6', boxId, player2) == true)
                return true;
            if (checkTwoComp('box2', 'box8', boxId, player2) == true)
                return true;
            if (checkTwoComp('box1', 'box9', boxId, player2) == true)
                return true;
            if (checkTwoComp('box3', 'box7', boxId, player2) == true)
                return true;

            break;
        case "box6":
            if (checkTwoComp('box3', 'box9', boxId, player2) == true)
                return true;
            if (checkTwoComp('box4', 'box5', boxId, player2) == true)
                return true;

            break;
        case "box7":
            if (checkTwoComp('box8', 'box9', boxId, player2) == true)
                return true;
            if (checkTwoComp('box3', 'box5', boxId, player2) == true)
                return true;
            if (checkTwoComp('box1', 'box4', boxId, player2) == true)
                return true;

            break;
        case "box8":
            if (checkTwoComp('box7', 'box9', boxId, player2) == true)
                return true;
            if (checkTwoComp('box2', 'box5', boxId, player2) == true)
                return true;

            break;
        case "box9":
            if (checkTwoComp('box3', 'box6', boxId, player2) == true)
                return true;
            if (checkTwoComp('box7', 'box8', boxId, player2) == true)
                return true;
            if (checkTwoComp('box1', 'box5', boxId, player2) == true)
                return true;

            break;
    }
    console.log("checkWinComp " + false);
    return false;


}

function checkBestMove() {

    if (compLevel == "Legend") {
        for (var i = 0; i < bigBoxArray.length; i++) {
            console.log("checkBestMove " + bigBoxArray[i]);
            if (checkWinComp(bigBoxArray[i]) == true) {

                return true;

            }

        }
    }

    for (var i = 0; i < bigBoxArray.length; i++) {
        console.log("checkBestMove " + bigBoxArray[i]);
        if (checkStopComp(bigBoxArray[i]) == true) {

            return true;

        }

    }
    return false;

}



function removeHumanBoxes() {

    for (var i = 0; i < bigBoxArray.length; i++) {
        if ($("#" + bigBoxArray[i]).text() == "X" || $("#" + bigBoxArray[i]).text() == "O") {
            bigBoxArray.splice(i, 1);
            i = -1;
        }
    }
}



function checkWin(boxId) {
    console.log("checkWin");
    console.log(counterSteps);
    switch (boxId) {
        case "box1":
            checkthree('box1', 'box2', 'box3');
            checkthree('box1', 'box5', 'box9');
            checkthree('box1', 'box4', 'box7');
            break;
        case "box2":
            checkthree('box1', 'box2', 'box3');
            checkthree('box2', 'box5', 'box8');
            break;
        case "box3":
            checkthree('box1', 'box2', 'box3');
            checkthree('box3', 'box6', 'box9');
            checkthree('box3', 'box5', 'box7');
            break;
        case "box4":
            checkthree('box4', 'box5', 'box6');
            checkthree('box1', 'box4', 'box7');
            break;
        case "box5":
            checkthree('box4', 'box5', 'box6');
            checkthree('box2', 'box5', 'box8');
            checkthree('box1', 'box5', 'box9');
            checkthree('box3', 'box5', 'box7');
            break;
        case "box6":
            checkthree('box3', 'box6', 'box9');
            checkthree('box4', 'box5', 'box6');
            break;
        case "box7":
            checkthree('box7', 'box8', 'box9');
            checkthree('box3', 'box5', 'box7');
            checkthree('box1', 'box4', 'box7');
            break;
        case "box8":
            checkthree('box7', 'box8', 'box9');
            checkthree('box2', 'box5', 'box8');
            break;
        case "box9":
            checkthree('box3', 'box6', 'box9');
            checkthree('box7', 'box8', 'box9');
            checkthree('box1', 'box5', 'box9');
            break;

    }

}
function checkthree(boxId1, boxId2, boxId3) {
    console.log("checkthree");
    console.log(boxId1 + " " + boxId2 + " " + boxId3 + " ");
    id1 = $("#" + boxId1);
    id2 = $("#" + boxId2);
    id3 = $("#" + boxId3);

    if (id1.text() == id2.text() && id1.text() == id3.text()) {
        console.log("win");

        if (flagComp == 1)
            var str = "computer";
        else
            var str = "player2";


        $("#whoWin").text("");
        if (player1 == id1.text()) {
            $("#whoWin").append("<p> Player 1 (" + player1 + ") won!! </p>");
            playerScore1++;
        } else {
            $("#whoWin").append("<p> " + str + " (" + player2 + ") won!! </p>");
            playerScore2++;
        }

        $('#exampleModal').modal('show');
        playersSection();



        $('#exampleModal').modal('show');
        flagWin = 1;
        id1.addClass("btn-success");
        id2.addClass("btn-success");
        id3.addClass("btn-success");
        id1.removeClass("btn-secondary");
        id2.removeClass("btn-secondary");
        id3.removeClass("btn-secondary");

    }

}



function playAgain() {
    counterSteps = 1;
    flagWin = 0;

    playerTurnCheck();
    roundTurn++;


    for (var i = 1; i < 10; i++) {
        var id = "";
        id = "box" + i;

        $("#" + id).html("&nbsp");
        $("#" + id).removeClass("btn-success");
        $("#" + id).addClass("btn-secondary");
        $("#" + id).removeClass("text-danger");
        $("#" + id).addClass("text-body");

    }
    if (flagComp == 1) {
        bigBoxArray = ["box1", "box2", "box3", "box4", "box5", "box6", "box7", "box8", "box9"];
        var x = player1 + "";
        var y = player2 + "";
        player1 = y;
        player2 = x;
        if (roundTurn % 2 == 0) {
            playerTurn = 2;
            computerTurn();
            playerTurnCheck();
            playersSection();
        } else {
            playerTurn = 1;
        }
    } else {
        if (roundTurn % 2 == 0)
            playerTurn = 2;
        else
            playerTurn = 1;


    }
    console.log("playerTurn " + playerTurn);
    console.log("roundTurn " + roundTurn);
    playerTurnCheck();
    gamesPlayed++;
    gamesPlayedCounter();
    $("#whoWin").text("");
    $('#exampleModal').modal('hide')
}

function restartTheGame() {

    location.reload();

}

function finishGame() {
    var myP = document.createElement("P");
    var t;


    if (flagComp == 1)
        var str = "computer";
    else
        var str = "player2";

    $("#endGame").text("");
    if (playerScore1 > playerScore2) {
        $("#endGame").append("<p> Player 1 won the game </p>");
        playerScore1++;
    } else if (playerScore1 < playerScore2) {
        $("#endGame").append("<p> "+str + " won the game </p>");
    } else {
        $("#endGame").append("<p> Its a draw </p>");
    }

    playersSection();

    $('#finishModal').modal('show');


}





