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
getNotifications();
recommend();
trending("trending-rec");

mo  = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

function getNotifications() {
    theurl = "./php/get.php?typ=not&handle=" + handle;
    $.ajax({
         type: 'GET',
         data:$(this).serialize(),
         dataType: 'html',
         url: theurl,
         success: function (d) {
             data = JSON.parse(d);
             
             notify(data);
         }
    });
}

function notify(data) {
    data = JSON.parse(data[0].notifications);
    for(var i=data.length-1; i>-1; i--) {
        div = document.createElement("div");
        div.className = "twyyt";
        if (data[i].status == "unseen") {
            div.style.backgroundColor = "#153044";
        }
        
        imgDiv = document.createElement("div");
        imgDiv.style = "width: 60px; display: inline-block; float: left; overflow: hidden;";

        pic = document.createElement("img");
        pic.src = "./res/ast/" + data[i].type + ".png";
        pic.style = "width: 30px; margin: 10px 0px; float: right; border-radius: 100px;";

        imgDiv.appendChild(pic);

        textDiv = document.createElement("div");
        textDiv.style = "max-width: 524px; width: 100%; display: inline-block; margin-top: 0px; padding-left: 16px; overflow: hidden;";
        
        theimg = document.createElement("img");
        theimg.src = "./res/usr/" + data[i].pic;
        theimg.style = "width: 30px; margin: 10px 0px 0px 0px; border-radius: 100px; background-color: white;";
        
        notification = document.createElement("p");
        notification.style = "font-size: 15px; color: white; margin: 8px 0px;";
        notification.innerHTML = "<span style='font-weight: 700;'>" + data[i].name + "</span> " + data[i].content;
        
        subject = document.createElement("p");
        subject.style = "font-weight: 100; color: #7d8e9b; font-size: 15px; margin: 8px 0px;";
        subject.innerHTML = data[i].text;
        
        textDiv.appendChild(theimg);
        textDiv.appendChild(notification);
        textDiv.appendChild(subject);
        
        div.appendChild(imgDiv);
        div.appendChild(textDiv);
        
        document.getElementById("twyyts").appendChild(div);
    }
    document.getElementById("twyyts-loading").style.display = "none";
}

function switchNotify(dest) {
    if (dest.style.color != "#7d8e9b") {
        document.getElementById("not-select").style.color = "#7d8e9b";
        document.getElementById("not-select").style.borderBottom = "2px solid transparent";
        document.getElementById("men-select").style.color = "#7d8e9b";
        document.getElementById("men-select").style.borderBottom = "2px solid transparent";

        dest.style.color = "#1DA1F2";
        dest.style.borderBottom = "2px solid #1DA1F2";

        document.getElementById("twyyts").innerHTML = "";
        
        load = document.createElement("img");
        load.id = "twyyts-loading";
        load.src = "./res/ast/load.gif";
        load.style = "width: 40px; height: 40px; display: block; margin: 20px auto;";
        document.getElementById("twyyts").appendChild(load);

        limit = 0;
        if (dest.id == "not-select") {
            getNotifications();
        } else {
            getMentions();
        }
    }
}

window.addEventListener("scroll", function(){
    if($(window).scrollTop() + $(window).height() > $(document).height() - 100) {
        if (document.title.indexOf("Home") > -1) {

            if (isReady == true) {
                isReady = false;
                getMentions();
            }
        }
    }
}, false);

function getMentions() {
    url = "../php/get.php?typ=mentions&off=" + limit;
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


















