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
connect();
trending("trending-rec");

mo  = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

function connect() {
    url = "../php/get.php?typ=connect-page&off=" + limit;
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
        div.className = "info-box-link-other";
        div.id = "rec-" + rec[i].id;

        pic = document.createElement("img");
        pic.src = "../res/usr/" + rec[i].img;
        pic.style = "width: 48px; height: 48px; background-color: white; border-radius: 100px; float: left;";
        
        usrname = document.createElement("p");
        usrname.innerHTML = rec[i].name;
        usrname.id = "info-" + rec[i].handle + "-" + rec[i].name.replace(/ /g, "_");
        usrname.className = "user-name";
        usrname.style = "font-weight: 600; color: white; font-size: 17px; line-height: 17px; margin: 6px 10px 2px 60px; display: block;";
        usrname.onmousedown = function() {
            teleport('../' + this.id.split("-")[1], this.id.split("-")[2] + " (@" + this.id.split("-")[1] + ') / Twittyr', './source/profile.php', './js/profile.js');
        }
        
        usrname.onmouseover = function(event) {
            hoverUser(this, event, this.parentElement.id.split("-")[1], this.parentElement.childNodes[3].id, "rec");
        }
        usrname.onmouseout = function(event) {
            unhoverUser(this, event, this.parentElement.id.split("-")[1], 'rec-');
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
}


















