var lastScrollTop = 0;
var lastType = "";
var barrierTop = 0;
var barrierBottom = 0;
limit = 0;


//window.onload
document.getElementById("nav-body").style.height = window.innerHeight + "px";
document.getElementById("user-drop").style.display = "block";
document.getElementById("profile-btn").style.display = "block";

resize();
resize();

mo  = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

function checkPass() {
    url = "./php/get.php?typ=ispass&handle=" + handle + "&pass=" + document.getElementById("curpass").value;
    $.ajax({
        type: 'GET',
        data:$(this).serialize(),
        dataType: 'html',
        url: url,
        success: function (d) {
            if (d == true) {
                document.getElementById("cur-pas-div").style.display = "none";
                document.getElementById("new-pas-div").style.display = "block";
            }
        }
    });
}

function changePass() {
    
    if (document.getElementById("newpass").value == document.getElementById("conpass").value) {
        url = "./php/change.php?typ=alter-profile&pass=" + document.getElementById("newpass").value + "&otherpass=" + document.getElementById("curpass").value;
        $.ajax({
            type: 'GET',
            data:$(this).serialize(),
            dataType: 'html',
            url: url,
            success: function (d) {
                document.getElementById("passchanged").style.display = "block";
                document.getElementById("new-pas-div").style.display = "none";
            }
        });
    }
}


















