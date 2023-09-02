var lastScrollTop = 0;
var lastType = "";
var barrierTop = 0;
var barrierBottom = 0;
limit = 0;


//window.onload
document.getElementById("nav-body").style.height = window.innerHeight + "px";
document.getElementById("user-drop").style.display = "block";
document.getElementById("profile-btn").style.display = "block";

dude = window.location.href.split("/");
selection = (dude[dude.length-1]).replace(/#/g, '');
dude = dude[dude.length-2];

if (dude == handle) {
    document.getElementById("profile-select").style.color = "#1DA1F2";
    document.getElementById("profile-select-img").src = "../res/ast/dude-s.svg";
}

resize();
resize();
getUserInfo();
recommend();
trending("trending-rec");

if (selection == "followers") {
    switchView(document.getElementById("followers-select"));
} else {
    switchView(document.getElementById("following-select"));
}

mo  = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

function switchView(dest) {
    if (dest.style.color != "#7d8e9b") {
        document.getElementById("followers-select").style.color = "#7d8e9b";
        document.getElementById("followers-select").style.borderBottom = "2px solid transparent";
        document.getElementById("following-select").style.color = "#7d8e9b";
        document.getElementById("following-select").style.borderBottom = "2px solid transparent";

        dest.style.color = "#1DA1F2";
        dest.style.borderBottom = "2px solid #1DA1F2";

        document.getElementById("twyyts").innerHTML = "";
        
        load = document.createElement("img");
        load.id = "twyyts-loading";
        load.src = "../res/ast/load.gif";
        load.style = "width: 40px; height: 40px; display: block; margin: 20px auto;";
        document.getElementById("twyyts").appendChild(load);

        limit = 0;
        if (dest.id == "followers-select") {
            getFollowers();
        } else {
            getFollowing();
        }
    }
}

function getUserInfo() {
    url = "../php/get.php?typ=user&handle=" + dude;
    $.ajax({
        type: 'GET',
        data:$(this).serialize(),
        dataType: 'html',
        url: url,
        success: function (d) {
            user = JSON.parse(d);
            
            document.getElementById("name-head").innerHTML = user[0].name;
            document.getElementById("twyyts-head").innerHTML = user[0].twyyts + " Twyyts";
            document.getElementById("profile-back-but").onclick = function() {
                teleport("../" + user[0].handle, user[0].name + " (@" + user[0].handle + ") / Twittyr", './source/profile.php', './js/profile.js');
            }
            
        }
    });
}

function getFollowers() {
    dude = window.location.href.split("/");
    dude = dude[dude.length-2];
    
    url = "../php/get.php?typ=followers&handle=" + dude + "&off=" + limit;
    $.ajax({
        type: 'GET',
        data:$(this).serialize(),
        dataType: 'html',
        url: url,
        success: function (d) {
            rec = JSON.parse(d);
            createFollowing(rec);
        }
    });
}

function getFollowing() {
    dude = window.location.href.split("/");
    dude = dude[dude.length-2];
    
    url = "../php/get.php?typ=following&handle=" + dude + "&off=" + limit;
    $.ajax({
        type: 'GET',
        data:$(this).serialize(),
        dataType: 'html',
        url: url,
        success: function (d) {
            rec = JSON.parse(d);
            createFollowing(rec);
        }
    });
}

function createFollowing(rec) {
    for (var i=0; i<rec.length; i++) {
        div = document.createElement("div");
        div.id = "rec-" + rec[i].id;
        div.className = "info-box-link-other";

        pic = document.createElement("img");
        pic.src = "../res/usr/" + rec[i].img;
        pic.style = "width: 48px; background-color: white; border-radius: 100px; float: left;";
        
        usrname = document.createElement("p");
        usrname.innerHTML = rec[i].name;
        usrname.id = "info-" + rec[i].handle + "-" + rec[i].name.replace(/ /g, "_");
        usrname.className = "user-name";
        usrname.style = "font-weight: 600; color: white; font-size: 17px; line-height: 17px; margin: 6px 10px 2px 60px; display: block;";
        
        usrname.onmousedown = function() {
            teleport('../' + this.id.split("-")[1], (this.id.split("-")[2]).replace(/_/g, " ") + " (@" + this.id.split("-")[1] + ') / Twittyr', './source/profile.php', './js/profile.js');
        }
        
        usrname.onmouseover = function(event) {
            hoverUser(this, event, this.parentElement.id, this.id, "other");
        }
        usrname.onmouseout = function(event) {
            unhoverUser(this, event, this.parentElement.id, 'rec');
        }
        
//        onmouseover='hoverUser(this, event)' onmouseout='unhoverUser(this, event)'

        handlef = document.createElement("p");
        handlef.id = "rechan-" + rec[i].handle;
        handlef.innerHTML = "@" + rec[i].handle;
        handlef.style = "font-weight: 100; color: #7d8e9b; font-size: 15px; line-height: 15px; margin: 2px 10px; display: inline-block;";
        
        btn = document.createElement("button");
        btn.id = rec[i].handle + "-btn";
        btn.className = rec[i].handle + "-btn";
        if (rec[i].followers.indexOf('"' + handle + '"') > -1) {
            btn.innerHTML = "Following";
            btn.style = "background-color: #1DA1F2; float: right; width: 100px; border: 1px solid transparent; color: white;";

            btn.onmouseover = function() {
                this.style = "background-color: #ca2055; float: right; width: 100px; border: 1px solid transparent; color: white;";
                this.innerHTML = "Unfollow";
            }

            btn.onmouseout = function() {
                this.style = "background-color: #1DA1F2; float: right; width: 100px; border: 1px solid transparent; color: white;";
                this.innerHTML = "Following";
            }
        } else {
            btn.innerHTML = "Follow";
            btn.style = "background-color: transparent; float: right; border: 1px solid #1DA1F2; color: #1DA1F2;";

            btn.onmouseover = function() {
                this.style = "background-color: #20394d; float: right; border: 1px solid #1DA1F2;; color: #1DA1F2;";
            }

            btn.onmouseout = function() {
                this.style = "background-color: transparent; float: right; border: 1px solid #1DA1F2; color: #1DA1F2;";
            }
        }
        
        btn.onclick = function() {
            if (this.innerHTML == "Follow") {
                follow(this.parentElement.childNodes[3].innerHTML.substr(1));
                this.innerHTML = "Following";
                this.style = "background-color: #ca2055; float: right; width: 100px; border: 1px solid transparent; color: white;";

                this.onmouseover = function() {
                    this.style = "background-color: #ca2055; float: right; width: 100px; border: 1px solid transparent; color: white;";
                    this.innerHTML = "Unfollow";
                }

                this.onmouseout = function() {
                    this.style = "background-color: #1DA1F2; float: right; width: 100px; border: 1px solid transparent; color: white;";
                    this.innerHTML = "Following";
                }   
                
                btns = document.getElementsByClassName(this.id);
                for (var j=0; j<btns.length; j++) {
                    btnswitch(btns[j], "follow");
                }
            } else {
                unfollow(this.parentElement.childNodes[3].innerHTML.substr(1));
                this.innerHTML = "Follow";
                this.style = "background-color: transparent; float: right; border: 1px solid #1DA1F2; color: #1DA1F2;";

                this.onmouseover = function() {
                    this.style = "background-color: #20394d; float: right; border: 1px solid transparent; color: white;";
                }

                this.onmouseout = function() {
                    this.style = "background-color: transparent; float: right; border: 1px solid #1DA1F2; color: #1DA1F2;";
                }
                
                btns = document.getElementsByClassName(this.id);
                for (var j=0; j<btns.length; j++) {
                    btnswitch(btns[j], "unfollow");
                }
            }
        }
        
        if (rec[i].handle == handle) {
            btn.style.display = "none";
        }
        
        bio = document.createElement("p");
        bio.innerHTML = reference(rec[i].bio);
        bio.style = "color: white; font-size: 17px; font-weight: 500; margin: 10px 0px 0px 60px";

        div.appendChild(btn);
        
        div.appendChild(pic);
        div.appendChild(usrname);
        div.appendChild(handlef);
        div.appendChild(bio);
        
        document.getElementById("twyyts").appendChild(div);
    }
    if (document.getElementById("twyyts-loading") != null) {
        document.getElementById("twyyts-loading").style.display = "none";   
    }
}















