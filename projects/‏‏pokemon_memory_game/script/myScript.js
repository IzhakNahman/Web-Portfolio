var boxes = 0;
var imagesArr = [];
var randomArr = [];
var equalCounter = 0;
var stepsCounter = 0;
var doubleStepsCounter = 0;
var rankSymbol = 0;
var userId = 1;
var winFlag = 0;
var userName = "";
var userLogo = "";
var userPass = "";

var allUsers = [];

var userGame = {
    userPass: "",
    id: 0,
    userName: "",
    userLogo: "",
    level: []
};

var levelsArr = [{
    level: 0,
    steps: 0,
    potential: 0,
    date: ""
}, {
    level: 1,
    steps: 0,
    potential: 3,
    date: ""
}, {
    level: 2,
    steps: 0,
    potential: 6,
    date: ""
}, {
    level: 3,
    steps: 0,
    potential: 9,
    date: ""
}];






$(document).ready(function () {





    $("#winDiv").hide();
    $("#rankChoose").hide();
    $("#logOut").hide();


    $("#chooseLogo").click(function () {
        $("#pokemonLogos").fadeToggle("slow");
        PlaySoundClick();
    });

    $(".logoCards").click(function () {
        console.log("this 1: " + this)

        var xId = $(this).attr('id');
        console.log(xId);
        if (xId == "logoCard1" || xId == "logoCard4" || xId == "logoCard7")
            PlaySoundPokemon("music/fire.mp3");
        if (xId == "logoCard2" || xId == "logoCard5" || xId == "logoCard8")
            PlaySoundPokemon("music/grass.mp3");
        if (xId == "logoCard3" || xId == "logoCard6" || xId == "logoCard9")
            PlaySoundPokemon("music/water.mp3");

        for (var i = 1; i <= 9; i++) {
            $("#logoCard" + i).removeClass("border-red");
        }

        $(this).addClass("border-red");



        $("#pokemonLogos").hide();
        userLogo = $(this).attr('src');
        console.log(userLogo);

    });

    function PlaySoundPokemon(src) {
        console.log("play pokemon ");

        var flipSound3 = document.createElement("audio");
        flipSound3.src = src;
        flipSound3.style.display = "none";
        flipSound3.play();
    }

    checkUserStorage();

    function checkUserStorage() {



        if (localStorage.getItem("pokemonUser") != undefined && localStorage.getItem("pokemonLogo") != undefined) {

            if (localStorage.getItem("gameData") != undefined) {

                var text = (localStorage.getItem("gameData"));
                var obj = JSON.parse(text);

                console.log("obj ");
                console.log(obj);
                allUsers = obj;

                for (var i = 0; i < allUsers.length; i++) {

                    if (allUsers[i].userName == (localStorage.getItem("pokemonUser"))) {

                        userGame = allUsers[i];

                        $("#logOut").show();
                        userPass = userGame.userPass;
                        userName = userGame.userName;
                        userLogo = userGame.userLogo;
                        levelsArr = userGame.level;

                        console.log(levelsArr);
                        addTable();


                        $("#logIn").hide();
                        $("#welcome").hide();


                        $("#userLogoTop").attr('src', userLogo);
                        $("#userNameTop").text(userName);
                        localStorage.setItem("pokemonUser", userName);
                        localStorage.setItem("pokemonLogo", userLogo);

                        $("#rankChoose").show();

                        $("#rankChoose").show();
                    }
                }


            }




        }





    }



    $("#logOut").click(function () {
        PlaySoundClick();
        localStorage.removeItem("pokemonUser");
        localStorage.removeItem("pokemonLogo");
        location.reload();
        

    });

    $("#showTable").click(function () {
        $("#myTable").fadeToggle("slow");
        PlaySoundClick();
    });

    $("#sendData").click(function () {


        PlaySoundClick();

        userName = $("#userName").val();
        userPass = $("#userPass").val();
        if (userName == "" || userLogo == "" || userPass == "") {

            if (userName == "")
                $("#errorUser").text("הקלד שם משתמש");
            else
                $("#errorUser").text("");

            if (userPass == "")
                $("#errorPass").text("הזן סיסמה");
            else
                $("#errorPass").text("");

            if (userLogo == "")
                $("#errorLogo").text("בחר פוקימון");
            else
                $("#errorLogo").text("");



        } else {



            if (localStorage.getItem("gameData") != undefined) {

                var text = (localStorage.getItem("gameData"));
                var obj = JSON.parse(text);

                allUsers = obj;

                var counterCheck = 0;
                for (var i = 0; i < allUsers.length; i++) {

                    if (allUsers[i].userName == userName) {
                        counterCheck++;

                        $("#errorUser").text("שם משתמש תפוס");
                    }
                }

                if (counterCheck == 0) {

                    levelsArr = [{
                        level: 0,
                        steps: 0,
                        potential: 0,
                        date: ""
                    }, {
                        level: 1,
                        steps: 0,
                        potential: 3,
                        date: ""
                    }, {
                        level: 2,
                        steps: 0,
                        potential: 6,
                        date: ""
                    }, {
                        level: 3,
                        steps: 0,
                        potential: 9,
                        date: ""
                    }];

                    userGame = {
                        userPass: "",
                        id: 0,
                        userName: "",
                        userLogo: "",
                        level: []
                    };
                    userGame.userPass = userPass;
                    userGame.id = allUsers.length;
                    userGame.userName = userName;
                    userGame.userLogo = userLogo;
                    userGame.level = levelsArr;


                    allUsers.push(userGame);

                    var myJason = JSON.stringify(allUsers);
                    localStorage.setItem('gameData', myJason);

                    console.log("allUsers");
                    console.log(allUsers);
                    $("#logIn").hide();
                    $("#welcomeFade").text("ברוך הבא " + userName);
                    $("#welcome").hide();
                    $("#welcome").fadeIn(3000);
                    $("#welcome").fadeOut(2000);

                    $("#userLogoTop").attr('src', userLogo);
                    $("#userNameTop").text(userName);
                    localStorage.setItem("pokemonUser", userName);
                    localStorage.setItem("pokemonLogo", userLogo);

                    $("#rankChoose").show();
                    $("#logOut").show();


                    addTable();
                    location.reload();



                }


            } else {



                levelsArr = [{
                    level: 0,
                    steps: 0,
                    potential: 0,
                    date: ""
                }, {
                    level: 1,
                    steps: 0,
                    potential: 3,
                    date: ""
                }, {
                    level: 2,
                    steps: 0,
                    potential: 6,
                    date: ""
                }, {
                    level: 3,
                    steps: 0,
                    potential: 9,
                    date: ""
                }];

                userGame = {
                    userPass: "",
                    id: 0,
                    userName: "",
                    userLogo: "",
                    level: []
                };
                userGame.userPass = userPass;
                userGame.id = allUsers.length;
                userGame.userName = userName;
                userGame.userLogo = userLogo;
                userGame.level = levelsArr;

                allUsers.push(userGame);

                var myJason = JSON.stringify(allUsers);
                localStorage.setItem('gameData', myJason);

                $("#logIn").hide();
                $("#welcomeFade").text("ברוך הבא " + userName);
                $("#welcome").hide();
                $("#welcome").fadeIn(3000);
                $("#welcome").fadeOut(2000);

                $("#userLogoTop").attr('src', userLogo);
                $("#userNameTop").text(userName);
                localStorage.setItem("pokemonUser", userName);
                localStorage.setItem("pokemonLogo", userLogo);

                $("#rankChoose").show();
                $("#logOut").show();

                addTable();
                location.reload();



            }









        }


    });

    $("#sendDataLogIn").click(function () {


        PlaySoundClick();

        userName = $("#userName").val();
        userPass = $("#userPass").val();
        if (userName == "" || userLogo == "" || userPass == "") {

            if (userName == "")
                $("#errorUser").text("הקלד שם משתמש");
            else
                $("#errorUser").text("");

            if (userPass == "")
                $("#errorPass").text("הזן סיסמה");
            else
                $("#errorPass").text("");

            if (userLogo == "")
                $("#errorLogo").text("בחר פוקימון");
            else
                $("#errorLogo").text("");



        } else {



            if (localStorage.getItem("gameData") != undefined) {

                var text = (localStorage.getItem("gameData"));
                var obj = JSON.parse(text);

                allUsers = obj;

                var counterCheck = 0;
                for (var i = 0; i < allUsers.length; i++) {

                    if (allUsers[i].userName == userName && allUsers[i].userPass == userPass) {

                        counterCheck++;



                        userGame = allUsers[i];

                        $("#logOut").show();
                        userPass = userGame.userPass;
                        userName = userGame.userName;
                        userLogo = userGame.userLogo;
                        levelsArr = userGame.level;

                        console.log(levelsArr);
                        addTable();


                        $("#logIn").hide();
                        $("#welcome").hide();


                        $("#userLogoTop").attr('src', userLogo);
                        $("#userNameTop").text(userName);
                        localStorage.setItem("pokemonUser", userName);
                        localStorage.setItem("pokemonLogo", userLogo);

                        $("#rankChoose").show();

                        $("#rankChoose").show();


                        location.reload();

                    }
                }

                if (counterCheck == 0) {
                    $("#errorUser").text("משתמש / סיסמה לא נכונים");
                    $("#errorPass").text("");
                    $("#errorLogo").text("");


                }


            } else {

                $("#errorUser").text("משתמש לא קיים");
                $("#errorPass").text("");
                $("#errorLogo").text("");


            }









        }


    });




    function addTable() {
        for (var j = 1; j < 4; j++) {
            if (levelsArr != undefined) {
                if (levelsArr[j] != undefined) {
                    console.log(levelsArr);
                    var row = $("<tr></tr>");
                    var thCol = $("<th></th>").text(levelsArr[j].level);
                    thCol.attr('scope', 'row');
                    var tdCol1 = $("<td></td>").text(levelsArr[j].steps);
                    var tdCol2 = $("<td></td>").text(levelsArr[j].potential);
                    var tdCol3 = $("<td></td>").text(levelsArr[j].date);
                    row.append(thCol);
                    if (j == 1) row.addClass("table-success");
                    if (j == 2) row.addClass("table-warning");
                    if (j == 3) row.addClass("table-danger");
                    row.addClass("tr-hover");

                    row.append(tdCol1);
                    row.append(tdCol2);
                    row.append(tdCol3);

                    $("#myTbody").append(row);
                }

            }


        }
    }


    $(".ranks").click(function () {

        console.log("this: " + this);

        switch ($(this).attr('id')) {
            case "rank1":
                $("#rank").text("רמה: 1");
                boxes = 6;
                rankSymbol = 1;
                break;
            case "rank2":
                $("#rank").text("רמה: 2");
                boxes = 12;
                rankSymbol = 2;
                break;
            case "rank3":
                $("#rank").text("רמה: 3");
                boxes = 18;
                rankSymbol = 3;
                break;
        }

        console.log("this: " + $(this));
        console.log("rank " + $('#test').attr('id'));

        PlaySoundClick();
        $("#rankChoose").hide();
        createImagesArr();
        randomArrImages();
        boxesFixed();



    });

    function createImagesArr() {
        for (var i = 1; i <= boxes / 2; i++) {
            imagesArr[i] = ({
                image: 'url("images/card' + i + '.png")',
                id: i,
                flip: "no"
            });
        }
        console.log(imagesArr);
    }

    function randomArrImages() {
        console.log(imagesArr);



        for (var i = 1; i <= (boxes); i++) {


            var num2 = Math.floor(Math.random() * (boxes / 2)) + 1;
            //console.log(num2);
            while (check(num2) > 1) {
                var num2 = Math.floor(Math.random() * (boxes / 2)) + 1;
            }
            // console.log(num2);
            var a = {
                image: "",
                id: 0,
                flip: "no"
            };
            a.image = imagesArr[num2].image;
            a.id = imagesArr[num2].id;
            a.flip = imagesArr[num2].flip;
            randomArr[i] = a;
        }
        console.log(randomArr);



    }

    function check(numb) {

        var count = 0;

        for (var i = 0; i < boxes; i++) {
            if (randomArr[i] != undefined) {
                if (randomArr[i].id == numb)
                    count++;
            }
        }



        return count;
    }



    function boxesFixed() {

        console.log("boxesFixed");
        console.log("boxes :" + boxes);
        console.log("imagesArr");
        console.log(imagesArr);
        console.log("randomArr");
        console.log(randomArr);

        for (var i = 1; i <= boxes; i++) {
            var div = $("<div></div>");
            div.attr('id', 'box' + i);
            if (boxes == 6) {
                div.addClass("myCard-big");
                var divFront = $("<div></div>");
                var divBack = $("<div></div>");
                divFront.addClass("front");
                divBack.addClass("back");
                divBack.css('background-image', '' + randomArr[i].image);
                div.append(divFront);
                div.append(divBack);
                div.attr('onclick', 'flip(this)');
                $("#myCards").append(div);

                if (i % 3 == 0)
                    $("#myCards").append($("<br/>"));
            } else if (boxes == 12) {
                div.addClass("myCard-med");
                var divFront = $("<div></div>");
                var divBack = $("<div></div>");
                divFront.addClass("front");
                divBack.addClass("back");
                divBack.css('background-image', '' + randomArr[i].image);
                div.append(divFront);
                div.append(divBack);
                div.attr('onclick', 'flip(this)');
                $("#myCards").append(div);

                if (i % 4 == 0)
                    $("#myCards").append($("<br/>"));
            } else {
                div.addClass("myCard");
                var divFront = $("<div></div>");
                var divBack = $("<div></div>");
                divFront.addClass("front");
                divBack.addClass("back");
                divBack.css('background-image', '' + randomArr[i].image);
                div.append(divFront);
                div.append(divBack);
                div.attr('onclick', 'flip(this)');
                $("#myCards").append(div);

                if (i % 6 == 0)
                    $("#myCards").append($("<br/>"));
            }


        }
    }



    function PlaySoundClick() {
        console.log("play click ");

        var flipSound4 = document.createElement("audio");
        flipSound4.src = "music/click.wav";
        flipSound4.style.display = "none";
        flipSound4.play();
    }



});

function flip(element) {
    console.log(element);
    console.log(element.id);
    console.log("allUsers");
    console.log(allUsers);

    var txt = element.id;
    console.log(txt);
    var id = txt.replace('box', '');
    console.log(Number(id));

    var front = $("#" + element.id + " .front");
    var back = $("#" + element.id + " .back");
    console.log(randomArr);
    if (randomArr[Number(id)].flip == "no" && checkFlip() == true) {
        doubleStepsCounter++;
        if (doubleStepsCounter == 2) {
            stepsCounter++;
            $("#steps").text("מהלכים: " + stepsCounter);
            doubleStepsCounter = 0;
        }
        PlaySoundFlip();
        randomArr[Number(id)].flip = "yes";
        console.log($("#" + element.id)[0]);
        $("#" + element.id).addClass('is-flipped');




        checkEqual();
        checkFlip();


        setTimeout(function () {

            checkWin();
        }, 5000);


    }
}

function checkFlip() {
    var count = 0;

    for (var i = 1; i < randomArr.length; i++) {

        if (randomArr[i].flip == "yes")
            count++;

    }
    if (count == 2) {

        setTimeout(function () {
            flipAllNo();
        }, 1000);
        return false;


    }


    return true;

}



function checkWin() {
    console.log("checkWin");
    if (equalCounter == (boxes / 2) && winFlag == 0) {
        winFlag = 1;
        $("#gameBoard").css("visibility", "hidden");

        $("#stepsWon").text(" כל הכבוד! ניצחת ב " + stepsCounter + " מהלכים את רמה " + rankSymbol + " ! ");

        PlaySoundWin();

        $("#winDiv").show();

        console.log(allUsers);
        for (var i = 0; i < allUsers.length; i++) {

            if (allUsers[i].userName == userName && allUsers[i].userPass == userPass) {

                console.log("yes");

                console.log((allUsers[i].level[rankSymbol].steps));

                console.log("stepsCounter " + stepsCounter);
                if (allUsers[i].level[rankSymbol].steps > stepsCounter || allUsers[i].level[rankSymbol].steps == 0) {


                    console.log("yes2");
                    allUsers[i].level[rankSymbol].steps = stepsCounter;
                    allUsers[i].level[rankSymbol].date = getMyDate();

                }
            }
        }


        // levelsArr[rankSymbol].steps = stepsCounter;
        //levelsArr[rankSymbol].date = getMyDate();

        /*


        console.log(allUsers);
        for (var i = 0; i < allUsers.length; i++) {

            if (allUsers[i].userName == userName && allUsers[i].userLogo == userLogo) {
                if (allUsers[i].level[rankSymbol].steps != 0) {

                    console.log(allUsers[i].level[rankSymbol].steps);
                    console.log(userGame.level[rankSymbol].steps);
                    
                    if (allUsers[i].level[rankSymbol].steps < userGame.level[rankSymbol].steps) {
                        allUsers[i] = userGame;
                    }

                } else {
                    allUsers[i] = userGame;
                }

            }

        }
        */

        var myJason = JSON.stringify(allUsers);
        localStorage.setItem('gameData', myJason);



        /*
          level: 0,
    steps: 0,
    potential: 0,
    date: ""
        */

    }

}


function checkEqual() {
    console.log("checkEqual");
    for (var i = 1; i < randomArr.length; i++) {

        if (randomArr[i].flip == "yes") {

            for (var j = 1; j < randomArr.length; j++) {

                if (j != i && randomArr[j].flip == "yes") {

                    if (randomArr[j].id == randomArr[i].id) {
                        randomArr[i].flip = "equal";
                        randomArr[j].flip = "equal";
                        console.log("equal");
                        equalCounter++;
                    }


                }

            }
        }


    }

    console.log("randomArr");
    console.log(randomArr);

}



function flipAllNo() {



    for (var i = 1; i < randomArr.length; i++) {

        console.log("flipAllNo");

        var div = $("#box" + i)[0];
        var front = $("#" + div.id + " .front");
        var back = $("#" + div.id + " .back");

        if (randomArr[i].flip == "yes") {
            randomArr[i].flip = "no";
            $("#" + div.id).removeClass('is-flipped');
        }




    }
}

function refresh() {
    location.reload();
}

function getMyDate() {
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth() + 1; //January is 0!
    var yyyy = today.getFullYear();

    if (dd < 10) {
        dd = '0' + dd;
    }

    if (mm < 10) {
        mm = '0' + mm;
    }

    today = mm + '/' + dd + '/' + yyyy;

    return today;
}


function PlaySoundFlip() {
    console.log("play Flip");

    var flipSound = document.createElement("audio");
    flipSound.src = "music/flip.wav";
    flipSound.style.display = "none";
    flipSound.play();
}


function PlaySoundWin() {
    console.log("play win ");

    var flipSound2 = document.createElement("audio");
    flipSound2.src = "music/win.mp3";
    flipSound2.style.display = "none";
    flipSound2.play();
}

