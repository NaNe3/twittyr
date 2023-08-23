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
recommend();
trending("twyyts");
document.getElementById("twyyts-loading").style.display = "none";

mo  = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

function switchExplore(dest) {
    if (dest.style.color != "#7d8e9b") {
        document.getElementById("trends-select").style.color = "#7d8e9b";
        document.getElementById("trends-select").style.borderBottom = "2px solid transparent";
        document.getElementById("everything-select").style.color = "#7d8e9b";
        document.getElementById("everything-select").style.borderBottom = "2px solid transparent";

        dest.style.color = "#1DA1F2";
        dest.style.borderBottom = "2px solid #1DA1F2";

        document.getElementById("twyyts").innerHTML = "";
        
        load = document.createElement("img");
        load.id = "twyyts-loading";
        load.src = "./res/ast/load.gif";
        load.style = "width: 40px; height: 40px; display: block; margin: 20px auto;";
        document.getElementById("twyyts").appendChild(load);

        limit = 0;
        if (dest.id == "trends-select") {
            trending("twyyts");
            document.getElementById("twyyts-loading").style.display = "none";
        } else {
            getRecents();
        }
    }
}

window.addEventListener("scroll", function(){
    if($(window).scrollTop() + $(window).height() > $(document).height() - 100) {
        if (document.title.indexOf("Home") > -1) {

            if (isReady == true) {
                isReady = false;
                getRecents();
            }
        }
    }
}, false);



function getRecents() {
    url = "../php/get.php?typ=recents&off=" + limit;
    $.ajax({
         type: 'GET',
         data:$(this).serialize(),
         dataType: 'html',
         url: url,
         success: function (d) {
             data = JSON.parse(d);
             limit += data.length;
             
             survey(data, "old");
         }
    });
}


















