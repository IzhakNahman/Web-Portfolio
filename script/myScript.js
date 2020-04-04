var position = 0;
window.onscroll = function () {
    
    scrollFunction()

};

function scrollFunction() {



    var scroll = $(window).scrollTop();

    if (document.body.scrollTop > 50 || document.documentElement.scrollTop > 50) {

        $("header").css('position', 'fixed');
        // $(".navbar").css('padding', '0');
        $(".bg-black-op").css('background-color', 'rgba(0, 0, 0, 0.8)');
        $(".my-logo").css('width', '30');
        $(".my-logo").css('height', '30');
        $(".navbar-brand").css('font-size', '1rem');
        $(".nav-links").css('font-size', '0.85rem');




    } else {
        $("header").css('position', 'static');
        $(".navbar").css('padding', '.5rem 1rem');
        $(".bg-black-op").css('background-color', 'rgba(0, 0, 0, 1)');
        var width = $(window).width();
        $(".my-logo").css('width', '40');
        $(".my-logo").css('height', '40');
        if (width < 600) {
            $(".my-logo").css('width', '35');
            $(".my-logo").css('height', '35');
        }
        $(".navbar-brand").css('font-size', '1.25rem');
        $(".nav-links").css('font-size', '1rem');

    }
 
    if (scroll < position) {
        
        if ((document.documentElement.scrollTop > 555) && (document.documentElement.scrollTop < 600)) {

            console.log('hello');

            var me1 = $("h1");
            var me2 = $("h2");
            var me3 = $(".text3");
            me1.css('animation', 'none');
            setTimeout(function () {
                me1.css('animation', '');
            }, 10);

            me2.css('animation', 'none');
            setTimeout(function () {
                me2.css('animation', '');
            }, 10);

            me3.css('animation', 'none');
            setTimeout(function () {
                me3.css('animation', '');
            }, 10);





        }
    }


   position = $(window).scrollTop();
}






var counterForm = 0;
var objArrForm = [
    {stat:-1, obj: ""},
    {stat:-1, obj: ""},
    {stat:-1, obj: ""},
    {stat:-1, obj: ""},
    {stat:-1, obj: ""},
    {stat:-1, obj: ""}
];
var pointer = -1;
var formObject = { firstName: "", lastName: "", email: "", Phone: "", subject: "", content: "" };

$(document).ready(function () {


    /*
    $('#userFName').on('keyup blur', function () {
        var node = $(this);
        node.val(node.val().replace(/[^a-z]/g, ''));
    });

    $('#userLName').on('keyup blur', function () {
        var node = $(this);
        node.val(node.val().replace(/[^a-z]/g, ''));
    });*/


    function createObjArrForm(){
        objArrForm[0].obj = $("#userFName");
        objArrForm[1].obj = $("#userLName");
        objArrForm[2].obj = $("#userEmail");
        objArrForm[3].obj = $("#userPhone");
        objArrForm[4].obj = $("#userSubject");
        objArrForm[5].obj = $("#userContent");       
    }

    createObjArrForm();
    disableSubmit();


    function isSubject(str) {

        if (str.length > 3) {
            return true;
        } else {
            return false;
        }
    }


    function isPhone(str) {

        if (str.match('([0-9]{10})|(\([0-9]{3}\)\s+[0-9]{3}\-[0-9]{4})')) {
            return true;
        } else {
            return false;
        }
    }

    function IsEmail(email) {
        var regex = /^([a-zA-Z0-9_\.\-\+])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
        if (!regex.test(email)) {
            return false;
        } else {
            return true;
        }
    }


    
    $("#userEmail").focusout(function () {


        if (IsEmail($(this).val())) {
            objArrForm[2].stat=1;
        } else {
            objArrForm[2].stat=0;

        }
        
        
        changePointer();
        disableSubmit();


    });


    $("#userFName").focusout(function () {


        if (($(this).val().length > 2 && $(this).val().length < 12)) {
            objArrForm[0].stat=1;

        } else {
            objArrForm[0].stat=0;


        }
        changePointer();
        disableSubmit();
       
    });
    $("#userLName").focusout(function () {


        if (($(this).val().length > 2 && $(this).val().length < 12)) {
            objArrForm[1].stat=1;

        } else {
            objArrForm[1].stat=0;


        }
        changePointer();
        disableSubmit();
   
    });

    $("#userSubject").focusout(function () {



        if (($(this).val().length > 2 && $(this).val().length < 40) && isSubject($(this).val())==true) {
            objArrForm[4].stat=1;

        } else {
            objArrForm[4].stat=0;

        }
        changePointer();
        disableSubmit();

    });

    $("#userPhone").focusout(function () {



        if (($(this).val().length > 0)) {

            if (isPhone($(this).val())) {
                objArrForm[3].stat=1;
            } else {
                objArrForm[3].stat=0;
            }

        } else {
            $(this).css("border-color", "white");
            objArrForm[3].stat = -1;
        }

        changePointer();
        disableSubmit();

    });

    function changePointer() {
        flag123=0;
        pointer=-1;
        for (var i = 0; i < objArrForm.length; i++) {
            if (objArrForm[i].stat == 0&&flag123==0) {
                pointer=i;
                flag123=1;
            }

            if (objArrForm[i].stat == 1) {
                objArrForm[i].obj.css("border-color", "#28a745")
            }

        }
        
        var str = "Your ";
        
        switch (pointer) {
            case 0:
                objArrForm[0].obj.css("border-color", "#dc3545");
                str += "First name ";
                break;
            case 1:
                objArrForm[1].obj.css("border-color", "#dc3545");
                str += "Last name ";
                break;
            case 2:
                objArrForm[2].obj.css("border-color", "#dc3545");
                str += "Email ";
                break;
            case 3:
                objArrForm[3].obj.css("border-color", "#dc3545");
                str += "Phone ";
                break;
            case 4:
                objArrForm[4].obj.css("border-color", "#dc3545");
                str += "Subject ";
                break;
            case 5:
                objArrForm[5].obj.css("border-color", "#dc3545");
                str += "content ";
                break;

        }

        if (pointer>-1) {
            str += "is not valid.."
            $("#invalidText").text(str);
        } else {
            $("#invalidText").text("");
        }

       
    }

    
    function disableSubmit() {
        var num=3;
        var counterForm = 0;
        for (var i = 0; i < objArrForm.length; i++) {
            if (objArrForm[i].stat == 1) {
                counterForm++;
            }

        }

        if(objArrForm[3].stat==1)
            num=4;
        else
            num=3;
        if (counterForm > num) {
            $("#submitForm").prop('disabled', false);
        } else {
            $("#submitForm").prop('disabled', true);
        }

    }


});

function checkForm() {

    formObject.firstName = $("#userFName").val();
    formObject.lastName = $("#userLName").val();
    formObject.email = $("#userEmail").val();
    formObject.Phone = $("#userPhone").val();
    formObject.subject = $("#userSubject").val();
    formObject.content = $("#userContent").val();

    var link = "mailto:naizhak@gmail.com"
             + "?cc=naizhak@gmail.com"
             + "&subject=" + escape(formObject.subject)
             + "&body=" + escape(formObject.content)
    ;

    window.location.href = link;


    $("#userFName").val('');
    $("#userLName").val('');
    $("#userEmail").val('');
    $("#userPhone").val('');
    $("#userSubject").val('');
    $("#userContent").val('');

    $("#userFName").css("border-color", "white");
    $("#userLName").css("border-color", "white");
    $("#userEmail").css("border-color", "white");
    $("#userPhone").css("border-color", "white");
    $("#userSubject").css("border-color", "white");
    $("#userContent").css("border-color", "white");

   
    for(var i=0;i<objArrForm.length;i++){
        objArrForm[i].stat=-1;
    }

    $("#submitForm").prop('disabled', true);
    console.log(formObject);


}