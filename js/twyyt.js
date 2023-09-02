var lastScrollTop = 0;
var lastType = "";
var barrierTop = 0;
var barrierBottom = 0;
limit = 0;
theboys = [];


//window.onload
document.getElementById("nav-body").style.height = window.innerHeight + "px";
document.getElementById("user-drop").style.display = "block";
document.getElementById("profile-btn").style.display = "block";

resize();
//recommend();
trending("trending-rec");
getTwyyt();
getComments();

mo  = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];


function getTwyyt() {
    twyyt = window.location.href.split("/");
    twyyt = twyyt[twyyt.length-1];
    
    url = "../php/get.php?typ=single&twyyt=" + twyyt;
    $.ajax({
        type: 'GET',
        data:$(this).serialize(),
        dataType: 'html',
        url: url,
        success: function (d) {
            twyyt = JSON.parse(d);

            document.getElementById("usrPic").src = "../res/usr/" + twyyt[0].pic;
            document.getElementById("usrName").innerHTML = twyyt[0].name;
            document.getElementById("usrHandle").innerHTML = "@" + twyyt[0].handle;
            document.getElementById("thetwyyt").innerHTML = reference(twyyt[0].twyyt);
            theboys.push(twyyt[0].handle);
            
            var d = new Date(twyyt[0].time*1000);
            if (d.getHours() > 11) {
                time = (d.getHours()-11) + ":" + (d.getMinutes()+1) + " PM";
            } else {
                time = (d.getHours()+1) + ":" + (d.getMinutes()+1) + " AM";
            }
            document.getElementById("timestamp").innerHTML = time + " · " + twyyt[0].date + " · <a href='#'>Twittyr for Brick</a>";

            document.getElementById("recom").innerHTML = ((twyyt[0].retwyyts.match(/"handle"/g) || []).length + (twyyt[0].comments.match(/"handle"/g) || []).length);
            document.getElementById("likeNum").innerHTML = (twyyt[0].likes.match(/"handle"/g) || []).length;

            if (twyyt[0].likes.indexOf(handle) > -1) {
                document.getElementById("like-pic").src = "../res/ast/liked.svg";
            } else {
                document.getElementById("like-pic").src = "../res/ast/like.svg";
            }
            
            if (twyyt[0].retwyyts.indexOf(handle) > -1) {
                document.getElementById("retwyyt-pic").src = "../res/ast/retwyyted.svg";
            } else {
                document.getElementById("retwyyt-pic").src = "../res/ast/retwyyt.svg";
            }
            
            if (twyyt[0].sources != "") {
                
                if (twyyt[0].sources.indexOf(".mp4") > -1) {
                    document.getElementById("twyyt-video-box").style.display = "block";
                    document.getElementById("twyyt-video").src = "../res/twyyt/" + twyyt[0].sources;
                } else {
                    document.getElementById("twyyt-image-box").style.display = "block";
                    document.getElementById("twyyt-image").src = "../res/twyyt/" + twyyt[0].sources;
                }
            }
            
            theinfo = JSON.parse(twyyt[0].sid);
            if (twyyt[0].type == "re") {
                theboys.push(theinfo[0].handle);
                document.getElementById("retwyyt-box").style.display = "block";
                
                document.getElementById("re-pic").src = "../res/usr/" + theinfo[0].pic;
                document.getElementById("re-info").innerHTML = '<span style="font-weight: 600; color: white;">' + theinfo[0].name + '</span><span style="font-weight: 100; color: #7d8e9b;"> @' + theinfo[0].handle + ' • ' + calcTime(d, theinfo[0].time) + '</span>';
                document.getElementById("re-twyyt").innerHTML = theinfo[0].twyyt;
                
                if (theinfo[0].sources != "") {
                    if (theinfo[0].sources.indexOf(".mp4") > -1) {
                        document.getElementById("re-video").style.display = "block";
                        document.getElementById("re-video").src = "../res/twyyt/" + theinfo[0].sources;
                    } else {
                        document.getElementById("re-image").style.display = "block";
                        document.getElementById("re-image").src = "../res/twyyt/" + theinfo[0].sources;
                    }   
                }
            } else if (twyyt[0].type == "co") {
                theboys.push(theinfo[0].handle);
                document.getElementById("comments-sub").style.display = "block";
                
                document.getElementById("comments-img").src = "../res/usr/" + theinfo[0].pic;
                document.getElementById("comments-info").innerHTML = '<span style="font-weight: 600; color: white;">' + theinfo[0].name + '</span><span style="font-weight: 100; color: #7d8e9b;"> @' + theinfo[0].handle + ' • ' + calcTime(d, theinfo[0].time) + '</span>';
                document.getElementById("comments-twyyt").innerHTML = theinfo[0].twyyt;
                
                if (theinfo[0].sources != "") {
                    document.getElementById("comments-image").style.display = "block";
                    document.getElementById("comments-image").src = "../res/twyyt/" + theinfo[0].sources;   
                }
            }
            document.getElementById("twyyts").style.display = "block";
            getRelevence(theboys);
            
        }
    });
}

function getRelevence(theboys) {
    thegroup = theboys.splice(",");
    
    url = "../php/get.php?typ=relevence&boys=" + thegroup;
    $.ajax({ 
         type: 'GET',
         data:$(this).serialize(),
         dataType: 'html',
         url: url,
         success: function (d) {
             data = JSON.parse(d);
             
             createRelevent(data);
         }
    });
}

function getComments() {
    twyyt = window.location.href.split("/");
    twyyt = twyyt[twyyt.length-1];
    
    url = "../php/get.php?typ=comments&twyyt=" + twyyt + "&off=" + limit;
    $.ajax({ 
         type: 'GET',
         data:$(this).serialize(),
         dataType: 'html',
         url: url,
         success: function (d) {
             data = JSON.parse(d);
             limit += data.length;
             
             for (var i=0; i<data.length; i++) {
                construct(data[i]);   
             }
         }
    });
}

function createRelevent(data) {
    for (var i=0; i<data.length; i++) {
        div = document.createElement("div");
        div.id = "rec-" + data[i].id;
        div.className = "info-box-link-other";
        div.style.borderTop = "1px solid #38444d";
        div.style.borderBottom = "0px solid #38444d";

        pic = document.createElement("img");
        pic.src = "../res/usr/" + data[i].img;
        pic.style = "width: 48px; height: 48px; background-color: white; border-radius: 100px; float: left;";

        usrname = document.createElement("p");
        usrname.innerHTML = data[i].name;
        usrname.id = "info-" + data[i].handle + "-" + data[i].name.replace(/ /g, "_");
        usrname.className = "user-name";
        usrname.style = "font-weight: 600; color: white; font-size: 17px; line-height: 17px; margin: 6px 10px 2px 60px; display: block;";

        usrname.onmousedown = function() {
            teleport('../' + this.id.split("-")[1], (this.id.split("-")[2]).replace(/_/g, " ") + " (@" + this.id.split("-")[1] + ') / Twittyr', './source/profile.php', './js/profile.js');
        }

    //        onmouseover='hoverUser(this, event)' onmouseout='unhoverUser(this, event)'

        handlef = document.createElement("p");
        handlef.id = "rechan-" + data[i].handle;
        handlef.innerHTML = "@" + data[i].handle;
        handlef.style = "font-weight: 100; color: #7d8e9b; font-size: 15px; line-height: 15px; margin: 2px 10px; display: inline-block;";

        btn = document.createElement("button");
        btn.id = data[i].handle + "-btn";
        btn.className = data[i].handle + "-btn";
        if (data[i].followers.indexOf('"' + handle + '"') > -1) {
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

        if (data[i].handle == handle) {
            btn.style.display = "none";
        }

        bio = document.createElement("p");
        bio.innerHTML = reference(data[i].bio);
        bio.style = "color: white; font-size: 17px; font-weight: 500; margin: 10px 0px 0px 60px";

        div.appendChild(btn);

        div.appendChild(pic);
        div.appendChild(usrname);
        div.appendChild(handlef);
        div.appendChild(bio);

        document.getElementById("other-box").appendChild(div);   
    }
}

function construct(data) {
    twyyt = document.createElement("div");
    twyyt.id = data.id;
    twyyt.className = "twyyt teleport";
    twyyt.onclick = function(event) {
        if (event.target.classList.contains('teleport')) {
            teleport('../twyyt/' + this.id, user + ' / Twittyr', '../source/twyyt.php', '../js/twyyt.js');
        }
    }
    
    imgDiv = document.createElement("div");
    imgDiv.className = "teleport";
    imgDiv.style = "width: 60px; height: 60px; display: inline-block; float: left; overflow: hidden;";

    pic = document.createElement("img");
    pic.className = "teleport";
    pic.src = "../res/usr/" + data.pic;
    pic.style = "width: 48px; height: 48px; background-color: white; border-radius: 100px; margin: 10px 12px;";

    imgDiv.appendChild(pic);

    textDiv = document.createElement("div");
    textDiv.className = "teleport";
    textDiv.style = "max-width: 524px; width: 100%; display: inline-block; margin-top: 0px; padding-left: 16px; overflow: hidden;";

    dwnDiv = document.createElement("div");
    dwnDiv.className = "opt-img";
    dwnDiv.style = "float: right; padding: 6px 10px; margin-top: 8px;";
    dwn = document.createElement("img");
    dwn.src = "../res/ast/dywn.svg";
    dwn.style = "width: 10px; height: 10px;";
    dwnDiv.appendChild(dwn);

    info = document.createElement("p");
    info.id = "info-" + data.handle + "-" + data.id + "-" + data.name.replace(/ /g, "_");
    info.style = "margin-bottom: 4px; display: inline-block;";
    info.innerHTML = "<span style='font-weight: 600; color: white;' class='user-name' onmouseover='hoverUser(this, event, this.parentElement.parentElement.parentElement.id, this.parentElement.id, null)' onmouseout='unhoverUser(this, event, this.parentElement.parentElement.parentElement.id, \"user-\")'>" + data.name + "</span><span style='font-weight: 100; color: #7d8e9b;'> @" + data.handle + " • " + calcTime(d, data.time) + "</span>";
    info.onclick = function() {
        teleport('../' + this.id.split("-")[1], this.id.split("-")[3].replace(/_/g, " ") + " (@" + this.id.split("-")[1] + ') / Twittyr', './source/profile.php', './js/profile.js');
    }

    text = document.createElement("p");
    text.className = "teleport";
    text.style = "color: white; margin-top: 0px; font-size: 15px; margin-bottom: 4px; width: 100%;";

    changed = reference(data.twyyt);


    text.innerHTML = changed.replace(/\n\s*\n/g, '\n\n').replace(/\n/g, "<br>");

    if (data.likes.indexOf(handle) > -1) {
        likeStat = "liked";
    } else {
        likeStat = "like";
    }

    if (data.retwyyts.indexOf(handle) > -1) {
        reStat = "retwyyted";
    } else {
        reStat = "retwyyt";
    }

    bar = document.createElement("div");
    bar.style = "width: 100%; margin-left: -10px;";
    bar.innerHTML = '<div style="width: 25%; overflow: auto; float: left;" class="teleport"><div class="opt-img" onclick="comment(this.parentElement.parentElement.parentElement.parentElement.id)"><img src="../res/ast/comment.svg"></div> <span class="stat">' + (data.comments.match(/"handle"/g) || []).length + '</span></div><div style="width: 25%; overflow: auto; float: left;" class="teleport"><div class="opt-img" onclick="retwyyt(this.parentElement.parentElement.parentElement.parentElement.id)"><img src="../res/ast/' + reStat + '.svg"></div><span class="stat">' + (data.retwyyts.match(/"handle"/g) || []).length + '</span></div><div style="width: 25%; overflow: auto; float: left;" class="teleport"><div class="opt-img" onclick="like(this);"><img src="../res/ast/' + likeStat + '.svg"></div><span class="stat">' + (data.likes.match(/"handle"/g) || []).length + '</span></div><div style="width: 25%; overflow: auto; float: left;" class="teleport"><div class="opt-img"><img src="../res/ast/share.svg"></div></div>';

    textDiv.appendChild(dwnDiv);
    textDiv.appendChild(info);
    textDiv.appendChild(text);

    if (data.sources != "") {
        mediaDiv = document.createElement("div");
        mediaDiv.style = "width: 100%; border: 1px solid #38444d; border-radius: 15px; margin-top: 20px; max-height: 600px; overflow: hidden;";
        
        image = document.createElement("img");
        image.src = "../res/twyyt/" + data.sources;
        image.style = "width: 100%;";
        
        mediaDiv.appendChild(image);

        textDiv.appendChild(mediaDiv);
    }

    textDiv.appendChild(bar);

    twyyt.appendChild(imgDiv);
    twyyt.appendChild(textDiv);
    
    document.getElementById("twyyts").appendChild(twyyt);
}

function commentTwyyt() {
    twyyt = window.location.href.split("/");
    twyyt = twyyt[twyyt.length-1];
    
    document.getElementById("twyyt-modal").style.display = "block";
    document.getElementById("twyyt-but-modal").innerHTML = "Reply";
    
    document.getElementById("comment-sub").style.display = "block";
    sessionStorage.setItem("co", twyyt);
    
    document.getElementById("comment-img").src = document.getElementById("usrPic").src;
    
    document.getElementById("comment-info").innerHTML = '<span style="font-weight: 600; color: white;">' + document.getElementById("usrName").innerHTML + '</span><span style="font-weight: 100; color: #7d8e9b;"> ' + document.getElementById("usrHandle").innerHTML + ' • 4h</span>';
    
    document.getElementById("comment-twyyt").innerHTML = document.getElementById("thetwyyt").innerHTML;
    
    document.getElementById("comment-reply").innerHTML = document.getElementById("usrHandle").innerHTML;
}

function retwyytTwyyt() {
    twyyt = window.location.href.split("/");
    twyyt = twyyt[twyyt.length-1];
    
    document.getElementById("twyyt-modal").style.display = "block";
    document.getElementById("twyyt-but-modal").innerHTML = "Retwyyt";
    document.getElementById("cont-twyyt").style.minHeight = "0px";
    
    document.getElementById("retwyyt").style.display = "block";
    sessionStorage.setItem("re", twyyt);
    
    document.getElementById("temp-img").src = document.getElementById("usrPic").src;
    
    document.getElementById("temp-info").innerHTML = '<span style="font-weight: 600; color: white;">' + document.getElementById("usrName").innerHTML + '</span><span style="font-weight: 100; color: #7d8e9b;"> ' + document.getElementById("usrHandle").innerHTML + ' • 4h</span>';
    
    document.getElementById("temp-twyyt").innerHTML = document.getElementById("thetwyyt").innerHTML;

    if (document.getElementById("twyyt-image-box").style.display != "none") {
        document.getElementById("temp-image").style.display = "block";
        document.getElementById("temp-image").src = document.getElementById("twyyt-image").src;
    }
    
    if (document.getElementById("twyyt-video-box").style.display != "none") {
        document.getElementById("temp-video").style.display = "block";
        document.getElementById("temp-video").src = document.getElementById("twyyt-video").src;
    } else {
        document.getElementById("temp-video").style.display = "none";
    }
}

function likeTwyyt() {
    action = document.getElementById("like-pic");
    twyyt = window.location.href.split("/");
    twyyt = twyyt[twyyt.length-1];
    
    if (action.src.indexOf("liked") > -1) {
        //unlike
        typ = "unlike";
        action.src = "../res/ast/like.svg";
        document.getElementById("likeNum").innerHTML = parseInt(document.getElementById("likeNum").innerHTML) -1;
    } else {
        //like
        
        typ = "like";
        action.src = "../res/ast/liked.svg";
        document.getElementById("likeNum").innerHTML = parseInt(document.getElementById("likeNum").innerHTML) +1;
    }
    url = "../php/change.php?typ=" + typ + "&id=" + twyyt;
    $.ajax({
         type: 'GET',
         data:$(this).serialize(),
         dataType: 'html',
         url: url,
         success: function (d) {
         }
    });
}













