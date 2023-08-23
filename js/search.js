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
trending("trending-rec");
searchTwyyts();

mo  = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

function filterchange() {
    document.getElementById("twyyts").innerHTML = "";
    limit = 0;
    
    load = document.createElement("img");
    load.id = "twyyts-loading";
    load.src = "./res/ast/load.gif";
    load.style = "width: 40px; height: 40px; display: block; margin: 20px auto;";
    document.getElementById("twyyts").appendChild(load);
    document.getElementById("connect").style.display = "none";
    
    if (document.getElementById("twyyt-select").style.color == "rgb(29, 161, 242)") {
        searchTwyyts();
    } else {
        searchPeople();
    }
}

function switchSearch(dest) {
    if (dest.style.color != "#7d8e9b") {
        document.getElementById("connect").style.display = "none";
        document.getElementById("twyyt-select").style.color = "#7d8e9b";
        document.getElementById("twyyt-select").style.borderBottom = "2px solid transparent";
        document.getElementById("people-select").style.color = "#7d8e9b";
        document.getElementById("people-select").style.borderBottom = "2px solid transparent";

        dest.style.color = "#1DA1F2";
        dest.style.borderBottom = "2px solid #1DA1F2";

        document.getElementById("twyyts").innerHTML = "";
        
        load = document.createElement("img");
        load.id = "twyyts-loading";
        load.src = "./res/ast/load.gif";
        load.style = "width: 40px; height: 40px; display: block; margin: 20px auto;";
        document.getElementById("twyyts").appendChild(load);

        limit = 0;
        if (dest.id == "twyyt-select") {
            searchTwyyts();
        } else {
            searchPeople();
        }   
    }
}

function searchTwyyts() {
    squery = window.location.href.split("?")[1].split("&")[0].split("=")[1];
    document.getElementById("search-input").value = squery.replace(/%20/g, " ");
    document.getElementById("search-empty").innerHTML = squery.replace(/%20/g, " ");
    
    if (document.getElementById("anybody-radio").checked == true) {
        filter = "anybody";
    } else {
        filter = "fol";
    }
    
    url = "./php/get.php?typ=search-twyyts&off=" + limit + "&q=" + squery + "&filter=" + filter;
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

function searchPeople() {
    squery = window.location.href.split("?")[1].split("&")[0].split("=")[1];
    document.getElementById("search-input").value = squery.replace(/%20/g, " ");
    document.getElementById("search-empty").innerHTML = squery.replace(/%20/g, " ");
    
    if (document.getElementById("anybody-radio").checked == true) {
        filter = "anybody";
    } else {
        filter = "fol";
    }
    
    url = "./php/get.php?typ=search-people&off=" + limit + "&q=" + squery + "&filter=" + filter;
    $.ajax({
         type: 'GET',
         data:$(this).serialize(),
         dataType: 'html',
         url: url,
         success: function (d) {
             data = JSON.parse(d);
             limit += data.length;
             
             createFound(data);
         }
    });
}

function createFound(rec) {
    for (var i=0; i<rec.length; i++) {
        div = document.createElement("div");
        div.className = "info-box-link";
        div.id = "rec-" + rec[i].id;
        div.style.borderBottom = "1px solid #38444d";
        div.style.borderTop = "0px solid #38444d";
        
        pic = document.createElement("img");
        pic.src = "./res/usr/" + rec[i].img;
        pic.style = "width: 48px; background-color: white; border-radius: 100px; float: left;";
        
        usrname = document.createElement("p");
        usrname.innerHTML = rec[i].name;
        usrname.id = "info-" + rec[i].handle + "-" + rec[i].name.replace(/ /g, "_");
        usrname.className = "user-name";
        usrname.style = "font-weight: 600; color: white; font-size: 17px; line-height: 17px; margin: 6px 10px 2px 60px; display: block;";
        usrname.onmousedown = function() {
            teleport('./' + this.id.split("-")[1], this.id.split("-")[2] + " (@" + this.id.split("-")[1] + ') / Twittyr', './source/profile.php', './js/profile.js');
        }
        
        usrname.onmouseover = function(event) {
            hoverUser(this, event, this.parentElement.id.split("-")[1], this.parentElement.childNodes[3].id, "rec");
        }
        usrname.onmouseout = function(event) {
            unhoverUser(this, event, this.parentElement.id.split("-")[1], 'rec');
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
            }
        }
        if (rec[i].handle == handle) {
            btn.style.display = "none";
        }

        div.appendChild(btn);
        
        div.appendChild(pic);
        div.appendChild(usrname);
        div.appendChild(handlef);
        
        cont = document.getElementById("twyyts");
        cont.appendChild(div);
    }
    document.getElementById("twyyts-loading").style.display = "none";
}

















