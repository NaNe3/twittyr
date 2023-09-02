if (typeof load == 'undefined') {
    load = [];   
}
isReady = true;
nextReady = true;

if (load.indexOf("twyyt-form-modal") == -1) {
    $("#twyyt-form-modal").submit(function(e) {
        
        if (nextReady == true) {
            nextReady = false;
            date = new Date();

            e.preventDefault();
            var formData = new FormData(this);

            document.getElementById('hard-text-modal').value = document.getElementById('hard-text-modal').value.replace(/\n\s*\n/g, '\n\n').replace(/\n/g, "<br>");

            if(document.getElementById("retwyyt").style.display != "none") {
                theurl = "./php/post.php?typ=twyyt&re=" + sessionStorage.getItem("re");
                sid = sessionStorage.getItem("re");
                
                //document.getElementById("ret-num-" + sid).innerHTML = parseInt(document.getElementById("ret-num-" + sid).innerHTML) + 1;
                //document.getElementById("ret-img-" + sid).src = "./res/ast/retwyyted.svg";
            } else if (document.getElementById("comment-sub").style.display != "none") {
                theurl = "./php/post.php?typ=twyyt&re=-1&co=" + sessionStorage.getItem("co");
                sid = sessionStorage.getItem("co");
                
                //document.getElementById("com-num-" + sid).innerHTML = parseInt(document.getElementById("com-num-" + sid).innerHTML) + 1;
            } else {
                theurl = "./php/post.php?typ=twyyt&re=-1";
                sid = -1;
            }

            if (window.location.href.indexOf("/i/connect") > -1 || window.location.href.indexOf("/twyyt/") > -1 || window.location.href.indexOf("/followers") > -1 || window.location.href.indexOf("/following") > -1) {
                theurl = "." + theurl;
            }

            $.ajax({
                url: theurl,
                type: 'POST',
                data: formData,
                success: function (data) {
                    msg = JSON.parse(data);

                    if (msg[0].msg == "twyyt was successful") {
                        if (msg[0].image == "none") {
                            imgTemp = '';
                        } else {
                            imgTemp = msg[0].image;
                        }

                        if (window.location.href.indexOf("/home") > -1) {
                            twyytFixed = document.getElementById("hard-text-modal").value.replace(/"/g, '\"').replace(/'/g, "\'").replace(/</g, "tough luck");

                            code = '[{"id":"' + msg[0].id + '","type":"normal","sid":"' + sid  + '","pic":"' + theimage + '","name":"' + theuser + '","handle":"' + handle + '","twyyt":"' + twyytFixed + '","time":"' + date.getTime() / 1000 + '","date":"' + (mo[date.getMonth()] + " " + date.getDate() + ", " + date.getFullYear()) + '","sources":"' + imgTemp + '","likes":"0","comments":"0","views":"0","retwyyts":"0"}]';


                            survey(JSON.parse(code), "new");
                        }


                        document.getElementById("hard-text-modal").value = "";
                        document.getElementById("image-modal").value = "";
                        document.getElementById("image-cont-modal").style.display = "none";
                        document.getElementById("twyyt-modal").style.display = "none";
                        document.getElementById("retwyyt").style.display = "none";

                        twyytCheck(document.getElementById("hard-text-modal").value, "-modal");
                        nextReady = true;
                    }
                },
                cache: false,
                contentType: false,
                processData: false
            });
            
        }

        return false;
    });
    load.push("twyyt-form-modal");
}

if (load.indexOf("edit-profile-modal") == -1) {
    $("#edit-profile-modal").submit(function(e) {
        date = new Date();

        e.preventDefault();
        var formData = new FormData(this);

        theurl = "./php/change.php?typ=profile";


        document.getElementById("profile-modal").style.display = "none";
        $.ajax({
            url: theurl,
            type: 'POST',
            data: formData,
            cache: false,
            contentType: false,
            processData: false,
            success: function(data){
                window.location.reload(true);
            }
        });
        //document.getElementById("landing-place").src = document.getElementById("profile-landing").src;
        //document.getElementById("pic-place").src = document.getElementById("profile-pic").src;
        //document.getElementById("name-place").innerHTML = document.getElementById("profile-name").value;
        //document.getElementById("bio-place").innerHTML = document.getElementById("profile-bio").value;
        
        //teleport('./' + handle, user[0].name + ' (@' + handle + ') / Twittyr', './source/profile.php', './js/profile.js');
        //window.location.href = window.location.href;
        
        return false;
    });
    load.push("edit-profile-modal");
}

document.getElementById('image-modal').addEventListener('change', function() {
    document.getElementById("video-cont-modal").style.display = "none";
    document.getElementById("image-cont-modal").style.display = "none";
    
    if (this.files && this.files[0]) {
        if (document.getElementById("image-modal").value.indexOf(".mp4") > -1) {
            var media = document.getElementById('video-pre-modal');
        } else {
            var media = document.getElementById('image-pre-modal');
        }
        media.src = URL.createObjectURL(this.files[0]); // set src to blob url
        
        if (document.getElementById("image-modal").value.indexOf(".mp4") > -1) {
            document.getElementById("video-cont-modal").style.display = "block";
        } else {  
            document.getElementById("image-cont-modal").style.display = "block";
        }
        
        twyytCheck(document.getElementById("hard-text-modal").value, '-modal');
        
//        var image = document.getElementById('image-pre-modal');  // $('img')[0]
//        image.src = URL.createObjectURL(this.files[0]); // set src to blob url
//        document.getElementById("image-cont-modal").style.display = "block";
    }
});

var lastScrollTop = 0;
var lastType = "";
var barrierTop = 0;
var barrierBottom = 0;

function toggle(event) {
    document.getElementById("profile-view").classList.toggle("show");
    event.stopPropagation();
}

function moretoggle(event) {
    document.getElementById("more-view").classList.toggle("show");
    event.stopPropagation();
}

// Close the dropdown if the user clicks outside of it
window.onclick = function(event) {
    if (!event.target.matches('.dropbtn')) {
        var dropdowns = document.getElementsByClassName("dropdown-content");
        for (i = 0; i < dropdowns.length; i++) {
            var openDropdown = dropdowns[i];
            if (openDropdown.classList.contains('show')) {
                openDropdown.classList.remove('show');
            }
        }
    }
}

if (load.indexOf("scroll") == -1) {
    window.addEventListener("scroll", function(){
        if (document.getElementById("info-col").offsetHeight > window.innerHeight) {

            infoCol = document.getElementById("info-col");

            var st = window.pageYOffset || document.documentElement.scrollTop;

            if (st > lastScrollTop){

                if (lastType != "down") {
                    lastType = "down";
                    if (barrierBottom <= st || barrierTop >= st) {
                        barrierTop = st - (infoCol.offsetHeight - window.innerHeight + 100);
                        barrierBottom = st + infoCol.offsetHeight - window.innerHeight+100;

                        document.getElementById("info-col").style.right = "0px";
                        document.getElementById("info-col").style.position = "absolute";
                        document.getElementById("info-col").style.top = st + "px";
                    }
                }
            } else {

                if (lastType != "up") {
                    lastType = "up";

                    if (barrierBottom <= st || barrierTop >= st) {
                        barrierTop = st - (infoCol.offsetHeight - window.innerHeight + 100);
                        barrierBottom = st + infoCol.offsetHeight - window.innerHeight+100;

                        document.getElementById("info-col").style.right = "0px";
                        document.getElementById("info-col").style.position = "absolute";
                        document.getElementById("info-col").style.top = st - (infoCol.offsetHeight - window.innerHeight + 100) + "px";
                    }
                }
            }

            if (barrierBottom <= st) {
                document.getElementById("info-col").style.top = (window.innerHeight - infoCol.offsetHeight-100) + "px";
                document.getElementById("info-col").style.position = "sticky";
            }
            if (barrierTop >= st) {
                document.getElementById("info-col").style.top = "0px";
                document.getElementById("info-col").style.position = "sticky";
            }

        //    console.log(st + " " + infoCol.style.top);
            if (st <= parseInt(infoCol.style.top) && lastType == "up") {
                document.getElementById("info-col").style.right = "0px";
                document.getElementById("info-col").style.position = "absolute";
                document.getElementById("info-col").style.top = st + "px";
            }

        //    console.log((parseInt(infoCol.style.top)+st+infoCol.offsetHeight) + " " + (st+window.innerHeight-100));
        //    if ((parseInt(infoCol.style.top)+st+infoCol.offsetHeight) > st+window.innerHeight-100 && lastType == "down") {
        //        console.log("weeeeeeee");
        //    }

            lastScrollTop = st <= 0 ? 0 : st; // For Mobile or negative scrolling
        } else {
            document.getElementById("info-col").style.top = "0px";
            document.getElementById("info-col").style.position = "sticky";
        }
        
        if($(window).scrollTop() + $(window).height() > $(document).height() - 100) {
            if (document.title.indexOf("Home") > -1) {
//                HOME
                if (isReady == true) {
                    isReady = false;
                    getTwyyts();
                }
            } else if (document.getElementById("name-head") != null) {
//                PROFILE
                if (isReady == true) {
                    isReady = false;
                    if (document.getElementById("twyyt-select").style.color == "rgb(29, 161, 242)") {
                        getProfileTwyyts();   
                    } else {
                        getProfileLikes();
                    }
                }
            } else if (document.title.indexOf("Twittyr Search") > -1) {
//                SEARCH
                if (isReady == true && document.getElementById("twyyt-select").style.color == "rgb(29, 161, 242)") {
                    isReady = false;
                    searchTwyyts();
                } else if (isReady == true && document.getElementById("people-select").style.color == "rgb(29, 161, 242)") {
                    isReady = false;
                    searchPeople();
                }
            } else if (window.location.href.indexOf("/i/") > -1) {
//                CONNECT
                if (isReady == true) {
                    isReady = false;
                    connect();
                }
            } else if (document.title.indexOf("People following @") > -1) {
                if (isReady == true && document.getElementById("followers-select").style.color == "rgb(29, 161, 242)") {
                    isReady = false;
                    getFollowers();
                } else if (isReady == true && document.getElementById("following-select").style.color == "rgb(29, 161, 242)") {
                    isReady = false;
                    getFollowing();
                }
            }
        }
        
    }, false);
    load.push("scroll");
}


if (screen.width < 640) {
    mobile = true;
    
    window.location = "./mobile/";
} else {
    mobile = false;
    
    url = window.location.href.replace(/#/g, "");
    url = url.split("://")[1];
    url = url.split("/");

    
    if (url[1] == "home" || url[1] == undefined || url[1] == "") {
        teleport('./home', 'Home / Twittyr', './source/home.php', './js/twittyr.js');
    } else if (url[1] == "explore") {
        teleport('./explore', 'Explore / Twittyr', './source/explore.php', './js/explore.js');
    } else if (url[1] == "notifications") {
        teleport('./notifications', 'Notifications / Twittyr', './source/notifications.php', './js/notifications.js');
    } else if (url[1] == "twyyt") {
        teleport('http://twittyr.com/twyyt/' + url[2], '@' + handle + ' on Twittyr: "coherent"', 'http://twittyr.com/source/twyyt.php', 'http://twittyr.com/js/twyyt.js');
    } else {
        if (url[2] == "followers" || url[2] == "following") {
            teleport("https://twittyr.com/" + url[1] + "/" + url[2], 'People following @' + url[1], 'https://twittyr.com/source/following.php', 'https://twittyr.com/js/following.js');
        } else {
            if (url[1] == handle) {
                teleport('./' + handle, user + ' / Twittyr', 'https://twittyr.com/source/profile.php', 'https://twittyr.com/js/profile.js');
            } else {
                teleport('./' + url[1], user + ' / Twittyr', 'https://twittyr.com/source/profile.php', 'https://twittyr.com/js/profile.js');
            }   
        }
    }
}

function getTwyyts() {
    url = "./php/get.php?typ=home&off=" + limit;
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
 
function logOut(url) {
    $.ajax({
         type: 'GET',
         data:$(this).serialize(),
         dataType: 'html',
         url: url,
         success: function (d) {
             document.write(d);
         }
    });
}

function twyytCheck(cont, ext) {
    if (cont.length == 0 || cont.length > 281) {
        if (ext == "") {
            document.getElementById("twyyt-char" + ext).style.color = "indianred";
            document.getElementById("twyyt-but" + ext).disabled = true;   
        }
    } else {
        document.getElementById("twyyt-char" + ext).style.color = "white";
        document.getElementById("twyyt-but" + ext).disabled = false;
    }
    
    if (!document.getElementById("image" + ext).files[0] == false) {
        if (document.getElementById("image" + ext).files[0].size/1024/1024 > 8) {
            document.getElementById("twyyt-but" + ext).disabled = true;
            alert("the uploaded file must be smaller than 24mb");
        } else {
            document.getElementById("twyyt-but" + ext).disabled = false;
        }
    }
    
    if (cont.length == 0) {
        document.getElementById("twyyt-char" + ext).style.display = "none";
    } else {
        document.getElementById("twyyt-char" + ext).style.display = "inline";
    }
    
    document.getElementById("twyyt-char" + ext).innerHTML = (281 - parseInt(cont.length)).toString();
}

function getUser(id, usrhandle, reason) {
    if (window.location.href.indexOf("/i/") > -1 || window.location.href.indexOf("/twyyt/") > -1 || window.location.href.indexOf("/followers") > -1 || window.location.href.indexOf("/following") > -1) {
        url = "../php/get.php?typ=popup-user&handle=" + usrhandle;   
    } else {
        url = "./php/get.php?typ=popup-user&handle=" + usrhandle;
    }
    $.ajax({
         type: 'GET',
         data:$(this).serialize(),
         dataType: 'html',
         url: url,
         success: function (d) {
             data = JSON.parse(d);
//             load.push(data[0].handle);
             
             createHover(id, reason, data);
         }
    });
}

function recommend() {
    if (window.location.href.indexOf('/followers') > -1 || window.location.href.indexOf('/following') > -1) {
        url = "../php/get.php?typ=connect&handle=" + handle;
    } else {
        url = "./php/get.php?typ=connect&handle=" + handle;
    }
    $.ajax({
         type: 'GET',
         data:$(this).serialize(),
         dataType: 'html',
         url: url,
         success: function (d) {
             rec = JSON.parse(d);
             create(rec, true, "follow-rec");
             
         }
    });
}

function trending(loc) {
    if (window.location.href.indexOf("/twyyt/") > -1 || window.location.href.indexOf("/i/") > -1 || window.location.href.indexOf('/followers') > -1 || window.location.href.indexOf('/following') > -1) {
        url = "../php/get.php?typ=trending";
    } else {
        url = "./php/get.php?typ=trending";
    }
    $.ajax({
         type: 'GET',
         data:$(this).serialize(),
         dataType: 'html',
         url: url,
         success: function (d) {
             rec = JSON.parse(d);
             produce(rec, loc);
             
         }
    });
}

function produce(rec, loc) {
    for (var i=0; i<rec.length; i++) {
        div = document.createElement("div");
        if (window.location.href.indexOf("/explore") > -1) {
            div.className = "info-box-link-other";
        } else {
            div.className = "info-box-link";   
        }
        div.style = "padding: 10px 15px;";
        div.onclick = function() {
            squery = this.childNodes[2].innerHTML.replace(/#/g, "");
            if (window.location.href.indexOf("/twyyt/") > -1 || window.location.href.indexOf("/i/") > -1 || window.location.href.indexOf('/followers') > -1 || window.location.href.indexOf('/following') > -1) {
                teleport("../search?q=" + squery + "&src=trend_click", squery + " - Twittyr Search / Twittyr", "./source/search.php", "./js/search.js");
            } else {
                teleport("./search?q=" + squery + "&src=trend_click", squery + " - Twittyr Search / Twittyr", "./source/search.php", "./js/search.js");
            }
        }
        
        arrow = document.createElement("div");
        arrow.className = "opt-img";
        arrow.style = "float: right; padding: 6px 10px; margin: -6px -10px 0px 0px;";
        
        arrowImg = document.createElement("img");
        if (window.location.href.indexOf("/twyyt/") > -1 || window.location.href.indexOf("/i/") > -1 || window.location.href.indexOf('/followers') > -1 || window.location.href.indexOf('/following') > -1) {
            arrowImg.src = "../res/ast/dywn.svg";
        } else {
            arrowImg.src = "./res/ast/dywn.svg";   
        }
        arrowImg.style = "width: 10px; height: 10px;";
        
        arrow.appendChild(arrowImg);
        
        genre = document.createElement("p");
        genre.style = "font-size: 12px; color: #6a8290; margin: 0px;";
        genre.innerHTML = "Current events · Trending";
        
        trend = document.createElement("p");
        trend.style = "color: white; margin: 0; font-weight: 800;";
        trend.innerHTML = rec[i].trend;
        
        num = document.createElement("p");
        num.style = "font-size: 12px; color: #6a8290; margin-bottom: 0px;";
        num.innerHTML = rec[i].twyyts + " Twyyts"
        
        div.appendChild(arrow);
        div.appendChild(genre);
        div.appendChild(trend);
        div.appendChild(num);
        
        if (loc == "trending-rec") {
            document.getElementById(loc).insertBefore(div, document.getElementById(loc).childNodes[document.getElementById(loc).childNodes.length-2]);
        } else {
            document.getElementById(loc).appendChild(div);
        }
    }
    if (document.getElementById("trend-loading") != null) {
        document.getElementById("trend-loading").style.display = "none";   
    }
}

function create(rec, recommended, loc) {
    for (var i=0; i<rec.length; i++) {
        div = document.createElement("div");
        div.className = "info-box-link";
        
        if (recommended == true) {
            div.id = "rec-" + rec[i].id;
        }

        pic = document.createElement("img");
        if (window.location.href.indexOf("/twyyt/") > -1 || window.location.href.indexOf("/i/") > -1 || window.location.href.indexOf('/followers') > -1 || window.location.href.indexOf('/following') > -1) {
            pic.src = "../res/usr/" + rec[i].img;
        } else {
            pic.src = "./res/usr/" + rec[i].img;
        }
        pic.style = "width: 48px; height: 48px; background-color: white; border-radius: 100px; float: left;";
        
        usrname = document.createElement("p");
        usrname.innerHTML = rec[i].name;
        if(recommended == true) {
            usrname.id = "info-" + rec[i].handle + "-" + rec[i].name.replace(/ /g, "_");
        } else {
            usrname.id = "srch-" + rec[i].handle + "-" + rec[i].name.replace(/ /g, "_");
        }
        usrname.className = "user-name";
        usrname.style = "font-weight: 600; color: white; font-size: 17px; line-height: 17px; margin: 6px 10px 2px 60px; display: block;";
        
        usrname.onmousedown = function() {
            if (window.location.href.indexOf("/twyyt/") > -1 || window.location.href.indexOf("/i/") > -1 || window.location.href.indexOf('/followers') > -1 || window.location.href.indexOf('/following') > -1) { 
                teleport('../' + this.id.split("-")[1], (this.id.split("-")[2]).replace(/_/g, " ") + " (@" + this.id.split("-")[1] + ') / Twittyr', './source/profile.php', './js/profile.js');
            } else {
                teleport('./' + this.id.split("-")[1], (this.id.split("-")[2]).replace(/_/g, " ") + " (@" + this.id.split("-")[1] + ') / Twittyr', './source/profile.php', './js/profile.js');
            }
        }
        
        if (recommended == true) {
            usrname.onmouseover = function(event) {
                hoverUser(this, event, this.parentElement.id.split("-")[1], this.parentElement.childNodes[3].id, "rec-");
            }
            usrname.onmouseout = function(event) {
                unhoverUser(this, event, this.parentElement.id.split("-")[1], 'rec-');
            }   
        }
        
//        onmouseover='hoverUser(this, event)' onmouseout='unhoverUser(this, event)'

        handlef = document.createElement("p");
        if (recommended == true) {
            handlef.id = "rechan-" + rec[i].handle;   
        } else {
            handlef.id = "search-" + rec[i].handle;
        }
        handlef.innerHTML = "@" + rec[i].handle;
        handlef.style = "font-weight: 100; color: #7d8e9b; font-size: 15px; line-height: 15px; margin: 2px 10px; display: inline-block;";
        
        if (recommended == true) {
            btn = document.createElement("button");
            btn.id = rec[i].handle + "-btn";
            btn.innerHTML = "Follow";
            btn.className = rec[i].handle + "-btn";
            btn.style = "background-color: transparent; float: right; border: 1px solid #1DA1F2; color: #1DA1F2;";

            btn.onmouseover = function() {
                this.style = "background-color: #20394d; float: right; border: 1px solid #1DA1F2; color: #1DA1F2;";
            }

            btn.onmouseout = function() {
                this.style = "background-color: transparent; float: right; border: 1px solid #1DA1F2; color: #1DA1F2;";
            }
            
            btn.onclick = function() {
                if (this.innerHTML == "Follow") {
                    follow(this.parentElement.childNodes[3].innerHTML.substr(1));
                    this.innerHTML = "Following";
                    this.style = "background-color: #1DA1F2; float: right; width: 100px; border: 1px solid transparent; color: white;";

                    this.onmouseover = function() {
                        this.style = "background-color: #ca2055; float: right; width: 100px; border: 1px solid #ca2055; color: white;";
                        this.innerHTML = "Unfollow";
                    }

                    this.onmouseout = function() {
                        this.style = "background-color: #1DA1F2; float: right; width: 100px; border: 1px solid #1DA1F2; color: white;";
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
                        this.style = "background-color: #20394d; float: right; border: 1px solid #1DA1F2; color: #1DA1F2;";
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

            div.appendChild(btn);   
        }
        
        div.appendChild(pic);
        div.appendChild(usrname);
        div.appendChild(handlef);
        
        cont = document.getElementById(loc);
        if (recommended == true) {
            cont.insertBefore(div, cont.childNodes[cont.childNodes.length-2]);   
        } else {
            
            cont.appendChild(div);
        }
    }
    if (document.getElementById("rec-loading") != null) {
        document.getElementById("rec-loading").style.display = "none";   
    }
}

function survey(data, type) {
    
    d = new Date();
    if (data.length > 0) {
        for (var i=0; i<data.length; i++) {
            if (data[i].type != "co") {
                build(data[i], type, null);   
            } else {
                build(data[i], type, JSON.parse(data[i].sid)[0].name);
            }
        }
        document.getElementById("twyyts").style.display = "block";
    } else if (limit == 0) {
        document.getElementById("connect").style.display = "block";
    }
}

function build(data, type, thesub) {
    twyyt = document.createElement("div");
    twyyt.id = data.id;
    twyyt.className = "twyyt teleport";
    twyyt.onclick = function(event) {
        if (event.target.classList.contains('teleport')) {
            teleport('./twyyt/' + this.id, '@' +  data.handle + ' on Twittyr: "' + data.twyyt.replace(/\n\s*\n/g, '\n\n').replace(/\n/g, " ") + '"', '../source/twyyt.php', '../js/twyyt.js');
        }
    }
    
    imgDiv = document.createElement("div");
    imgDiv.className = "teleport";
    imgDiv.style = "width: 60px; display: inline-block; float: left; overflow: hidden;";

    pic = document.createElement("img");
    pic.className = "teleport";
    pic.src = "./res/usr/" + data.pic;
    pic.style = "width: 48px; background-color: white; border-radius: 100px; margin: 10px 12px;";

    imgDiv.appendChild(pic);

    textDiv = document.createElement("div");
    textDiv.className = "teleport";
    textDiv.style = "max-width: 524px; width: 100%; display: inline-block; margin-top: 0px; padding-left: 16px; overflow: hidden;";

    dwnDiv = document.createElement("div");
    dwnDiv.className = "opt-img";
    dwnDiv.style = "float: right; padding: 6px 10px; margin-top: 8px;";
    dwn = document.createElement("img");
    dwn.src = "./res/ast/dywn.svg";
    dwn.style = "width: 10px; height: 10px;";
    dwnDiv.appendChild(dwn);

    info = document.createElement("p");
    info.id = "info-" + data.handle + "-" + data.id + "-" + data.name.replace(/ /g, "_");
    info.style = "margin-bottom: 4px; display: inline-block;";
    info.innerHTML = "<span id='name-" + data.handle + "' style='font-weight: 600; color: white;' class='user-name' onmouseover='hoverUser(this, event, this.parentElement.parentElement.parentElement.id, this.parentElement.id, null)' onmouseout='unhoverUser(this, event, this.parentElement.parentElement.parentElement.id, \"user-\")'>" + data.name + "</span><span style='font-weight: 100; color: #7d8e9b;'> @" + data.handle + " • " + calcTime(d, data.time) + "</span>";
    info.onclick = function() {
        teleport('./' + this.id.split("-")[1], this.id.split("-")[3].replace(/_/g, " ") + " (@" + this.id.split("-")[1] + ') / Twittyr', './source/profile.php', './js/profile.js');
    }

//            id = user.parentElement.parentElement.parentElement.id;
//    usrhandle = user.parentElement.id.split("-")[1];

//            info.onmouseover = function() {
//                id = this.parentElement.parentElement.id;
//                handle = this.id;
//                
//                if (document.getElementById("user-" + id) == null) {
//                    createHover(id, handle);
//                }
//                
//                $("#user-" + id).fadeIn(250);
//            }
//            
//            info.onmouseout = function() {
//                id = this.parentElement.parentElement.id;
//                
//                var isHovered = $('#user-' + id).is(":hover");
//                if (document.getElementById("user-" + id).style.display == "block" && isHovered != true) {
//                    $("#user-" + id).fadeOut(250);   
//                }
//            }

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
    bar.innerHTML = '<div style="width: 25%; overflow: auto; float: left;" class="teleport"><div class="opt-img" onclick="comment(this.parentElement.parentElement.parentElement.parentElement.id)"><img id="com-img-' + data.id + '" src="res/ast/comment.svg"></div> <span id="com-num-' + data.id + '" class="stat">' + (data.comments.match(/"handle"/g) || []).length + '</span></div><div style="width: 25%; overflow: auto; float: left;" class="teleport"><div class="opt-img" onclick="retwyyt(this.parentElement.parentElement.parentElement.parentElement.id)"><img  id="ret-img-' + data.id + '" src="res/ast/' + reStat + '.svg"></div><span id="ret-num-' + data.id + '" class="stat">' + (data.retwyyts.match(/"handle"/g) || []).length + '</span></div><div style="width: 25%; overflow: auto; float: left;" class="teleport"><div class="opt-img" onclick="like(this);"><img id="lik-img-' + data.id + '" src="res/ast/' + likeStat + '.svg"></div><span class="stat">' + (data.likes.match(/"handle"/g) || []).length + '</span></div><div style="width: 25%; overflow: auto; float: left;" class="teleport"><div class="opt-img"><img src="res/ast/share.svg"></div></div>';

    textDiv.appendChild(dwnDiv);
    textDiv.appendChild(info);
    textDiv.appendChild(text);

    if (data.sources != "") {
        if (data.sources.indexOf(".mp4") > -1) {
            media = document.createElement("video");
            media.controls = true;
            media.autoplay = false;
        } else {
            media = document.createElement("img");
            media.onclick = function() {
                document.getElementById("pic-modal-pic").src = this.src;
                scale = window.innerWidth / window.innerHeight;
                
                document.getElementById("pic-modal-pic").style.marginTop = "0px";
                if (this.height*scale > this.width) {
//                    scale = (window.innerHeight - 200) / this.style.height;
                    
                    document.getElementById("pic-modal-pic").style.height = (window.innerHeight - 200) + "px";
                    document.getElementById("pic-modal-pic").style.marginTop = "100px";
                } else {
                    document.getElementById("pic-modal-pic").style.width = (window.innerWidth - 200) + "px";
                }
                
                document.getElementById("pic-modal").style.display = "block";
            }
        }
        media.src = "./res/twyyt/" + data.sources;
        media.style = "width: 100%; border: 1px solid #38444d; border-radius: 15px; margin-top: 20px;";
        
        textDiv.appendChild(media);
    }

    if (data.type == "re") {
        resrc = JSON.parse(data.sid);
        
        re = document.createElement("div");
        re.className = "retwyyt";
        re.id = "retwyyt-" + data.id + "-" + resrc[0].id + "-" + resrc[0].handle;
        re.style = "width: 500px; max-height: 600px; overflow: hidden; margin: 15px 0px 5px 0px;";
        re.onclick = function() {
            infer = this.id.split("-");
            teleport('./twyyt/' + infer[2], '@' +  infer[3] + ' on Twittyr: "' + resrc[0].twyyt.replace(/\n\s*\n/g, '\n\n').replace(/\n/g, " ") + '"', '../source/twyyt.php', '../js/twyyt.js');
        }

        retop = document.createElement("div");
        retop.style = "width: 100%; overflow: auto; margin: 10px 10px 0px 10px;";

        repic = document.createElement("img");
        repic.src = "./res/usr/" + resrc[0].pic;
        repic.style = "width: 22px; border-radius: 100px; background-color: white; border: 1px solid #38444d; margin: 0px; padding: 0px; float: left;";

        reinfo = document.createElement("p");
        reinfo.style = "display: inline-block; margin: 6px; padding: 0px; line-height: 14px; float: left;";
        reinfo.innerHTML = '<span style="font-weight: 600; color: white;">' + resrc[0].name + '</span><span style="font-weight: 100; color: #7d8e9b;"> @' + resrc[0].handle + ' • ' + calcTime(d, resrc[0].time) + '</span>';

        retop.appendChild(repic);
        retop.appendChild(reinfo);

        recont = document.createElement("p");
        recont.style = "color: white; margin: 2px 10px 10px 10px;";
        recont.innerHTML = resrc[0].twyyt.replace(/\n\s*\n/g, '\n\n').replace(/\n/g, "<br>")

        re.appendChild(retop);
        re.appendChild(recont);
        if (resrc[0].sources != "") {
            if (resrc[0].sources.indexOf(".mp4") > -1) {
                reimg = document.createElement("video");
                reimg.src = "./res/twyyt/" + resrc[0].sources;
                
                reimg.controls = true;
                reimg.autoplay = false;
            } else {
                reimg = document.createElement("img");
                reimg.src = "./res/twyyt/" + resrc[0].sources;   
            }
            reimg.style = "width: 100%; margin: 0px 0px -4px 0px; padding: 0;";

            re.appendChild(reimg);
        }

        textDiv.appendChild(re);
    }

    textDiv.appendChild(bar);

    twyyt.appendChild(imgDiv);
    twyyt.appendChild(textDiv);
    
    if (thesub != null) {
//        topinfo = document.createElement("p");
//        topinfo.style = "font-size: 12px; color: #7d8e9b; margin: 4px 0px 0px 60px;";
//        topinfo.innerHTML = "This is a comment to " + thesub + "'s Twyyt";
        
        thread = document.createElement("div");
        thread.id = JSON.parse(data.sid)[0].id + "-show";
        thread.className = "info-box-link";
        thread.style = "border-top: 0px;";
        thread.innerHTML = '<p style="color: #1da1f2; margin: 0px 0px 0px 60px;">Show Parent Twyyt</p>';
        thread.onclick = function() {
            teleport('./twyyt/' + this.id.split("-")[0], user + ' / Twittyr', '../source/twyyt.php', '../js/twyyt.js');
        }
        
        twyyt.appendChild(thread);
    }
    
    if (type == "new") {

        $("#twyyts").prepend(twyyt);
        $("#twyyts").children(":first").hide(0);
        $("#twyyts").children(":first").fadeIn(1000);
    } else {
        document.getElementById("twyyts").appendChild(twyyt);
    }
    isReady = true;
    
    document.getElementById("twyyts-loading").style.display = "none";
}

function hoverUser(user, event, id, usrhandle, reason) {
//    event.stopPropagation();
//    id = user.parentElement.parentElement.parentElement.id;
//    usrhandle = user.parentElement.id.split("-")[1];
    
    usrhandle = usrhandle.split("-")[1];
    if (document.getElementById("user-" + id) == null) {
        getUser(id, usrhandle, reason);
    } else if (document.getElementById("user-" + id).style.display != "block") {
        $("#user-" + id).fadeIn(250);
    }
}

function unhoverUser(user, event, id, pre) {
//    event.stopPropagation($('#user-'+ id).is(":hover"));
//    id = user.parentElement.parentElement.parentElement.id;

    //usrhandle = usrhandle.split("-")[1];
    if (document.getElementById("user-" + id) != null) {
        var isHovered = $('#user-' + id).is(":hover");
        if (document.getElementById("user-" + id).style.display == "block" && isHovered != true) {
            $("#user-" + id).fadeOut(250);
        }
    }
}

function createHover(id, usrhandle, data) {
    hover = document.createElement("div");
    hover.className = "hover-box";
    hover.id = "user-" + id;
    
    hover.onmouseout = function(event) {
        if (this.parentElement.id.split("-")[0] == "rec") {
            var isHovered = $('#' + this.parentElement.childNodes[2].id).is(":hover");
        } else {
            var isHovered = $('#' + this.parentElement.childNodes[1].childNodes[1].childNodes[0].id).is(":hover");
        }
        var alsoHovered = $('#' + this.id).is(":hover");
        if (isHovered != true && alsoHovered != true) {
            $("#" + this.id).fadeOut(250);
        }
    }
    
    pic = document.createElement("img");
    if (window.location.href.indexOf("/i/") > -1 || window.location.href.indexOf("/twyyt/") > -1 || window.location.href.indexOf('/followers') > -1 || window.location.href.indexOf('/following') > -1) {
        pic.src = "../res/usr/" + data[0].img;   
    } else {
        pic.src = "./res/usr/" + data[0].img;
    }
    pic.style = "width: 60px; height: 60px; border-radius: 100px; display: block; background-color: white;";
    
    usrname = document.createElement("p");
    usrname.onclick = function() {
        thehandle = this.parentElement.childNodes[3].innerHTML.substr(1);
        thename = this.parentElement.childNodes[2].innerHTML;
        
        teleport('./' + thehandle, thename + " (@" + thehandle + ') / Twittyr', './source/profile.php', './js/profile.js');
    }
    usrname.innerHTML = data[0].name;
    usrname.style = "font-weight: 600; color: white; font-size: 17px; line-height: 17px; margin-bottom: 3px;";
    
    handlef = document.createElement("p");
    handlef.innerHTML = "@" + data[0].handle;
    handlef.style = "font-weight: 100; color: #7d8e9b; font-size: 15px; line-height: 15px; margin: 2px 0px;";
    
    bio = document.createElement("p");
    bio.innerHTML = data[0].bio;
    bio.style = "color: white;";
    
    finfo = document.createElement("p");
    finfo.innerHTML = "<span style='font-weight: 600; color: white;'>" + (data[0].following.match(/"handle"/g) || []).length + "</span><span style='font-weight: 100; color: #7d8e9b;'> Following</span><span style='font-weight: 600; color: white; padding-left: 20px;'>" + (data[0].followers.match(/"handle"/g) || []).length + "</span><span style='font-weight: 100; color: #7d8e9b;'> Followers</span>";
    
    btn = document.createElement("button");
    btn.id = data[0].handle + "-btn";
    btn.className = data[0].handle + "-btn";
    if (data[0].handle != handle) {
        
        if (data[0].followers.indexOf(handle) > -1) {
            btn.innerHTML = "Following";
            btn.style = "float: right; width: 100px";
            
            btn.onmouseover = function() {
                this.style = "background-color: #ca2055; float: right; width: 100px; border: 1px solid #ca2055; color: white;";
                this.innerHTML = "Unfollow";
            }

            btn.onmouseout = function() {
                this.style = "background-color: #1DA1F2; float: right; width: 100px; border: 1px solid #1DA1F2; color: white;";
                this.innerHTML = "Following";
            }

            btn.onclick = function() {
                btns = document.getElementsByClassName(this.id);
                unfollow(this.parentElement.childNodes[3].innerHTML.substr(1));
                for (var j=0; j<btns.length; j++) {
                    btnswitch(btns[j], "unfollow");
                }
            }
        } else {
            btn.innerHTML = "Follow";
            btn.style = "float: right; border: 1px solid #1DA1F2; color: #1DA1F2; background-color: transparent;";
            btn.onmouseover = function() {
                this.style.backgroundColor = "#20394d";

            }

            btn.onmouseout = function() {
                this.style.backgroundColor = "transparent";
            }

            btn.onclick = function() {
                btns = document.getElementsByClassName(this.id);
                follow(this.parentElement.childNodes[3].innerHTML.substr(1));
                for (var j=0; j<btns.length; j++) {
                    btnswitch(btns[j], "follow");
                }
            }
        }
    } else {
        btn.style.display = "none";
    }
    hover.appendChild(btn);
    
    hover.appendChild(pic);
    hover.appendChild(usrname);
    hover.appendChild(handlef);
    hover.appendChild(bio);
    hover.appendChild(finfo);
    
    if (usrhandle == "rec-" || usrhandle == "rec") {
        document.getElementById("rec-" + id).appendChild(hover);   
    } else {
        document.getElementById(id).appendChild(hover);
    }
    $("#user-" + id).fadeIn(250);
}

function search(val) {
    if (val == "") {
        document.getElementById("empty-search").style.display = "block";
        document.getElementById("search-res").innerHTML = "";
        document.getElementById("search-drop").style.height = "90px";
    } else {
        document.getElementById("empty-search").style.display = "none";
        document.getElementById("search-drop").style.height = "600px";
        document.getElementById("fog").style.display = "block";
        
        if (window.location.href.indexOf("/twyyt/") > -1 || window.location.href.indexOf("/i/") > -1 || window.location.href.indexOf("/followers") > -1 || window.location.href.indexOf("/following") > -1) {
            url = "../php/get.php?typ=search-bar&val=" + val;
        } else {
            url = "./php/get.php?typ=search-bar&val=" + val;
        }
        
        $.ajax({
            url: url,
            type: 'GET',
            data:$(this).serialize(),
            dataType: 'html',
            success: function (d) {
                data = JSON.parse(d);
                
                document.getElementById("fog").style.display = "none";
                document.getElementById("search-res").innerHTML = '<div class="info-box-link" style="border-bottom: 10px solid #253341;"><p style="color: white; margin: 0;">Search for "' + val + '"</p></div>';
                document.getElementById("search-res").childNodes[0].onmousedown = function() {
                    squery = document.getElementById("search-input").value;
                    teleport('./search?q=' + squery + "&src=typed_query", squery + ' - Twittyr Search / Twittyr', './source/search.php', './js/search.js');
                }
                create(data, false, "search-res");
            }
        });
    }
}

function btnswitch(btn, mode) {
    if (mode == "follow") {
        btn.innerHTML = "Following";
        btn.style = "background-color: #1DA1F2; float: right; width: 100px; border: 1px solid #1DA1F2; color: white;";

        btn.onmouseover = function() {
            this.style = "background-color: #ca2055; float: right; width: 100px; border: 1px solid #ca2055; color: white;";
            this.innerHTML = "Unfollow";
        }

        btn.onmouseout = function() {
            this.style = "background-color: #1DA1F2; float: right; width: 100px; border: 1px solid #1DA1F2; color: white;";
            this.innerHTML = "Following";
        }

        btn.onclick = function() {
            btns = document.getElementsByClassName(this.id);
            unfollow(this.parentElement.childNodes[3].innerHTML.substr(1));
            for (var j=0; j<btns.length; j++) {
                btnswitch(btns[j], "unfollow");
            }
        }
    } else {
        btn.innerHTML = "Follow";
        btn.style = "float: right; border: 1px solid #1DA1F2; color: #1DA1F2; background-color: transparent;";
            
        btn.onmouseover = function() {
            this.style.backgroundColor = "#20394d";

        }

        btn.onmouseout = function() {
            this.style.backgroundColor = "transparent";
        }

        btn.onclick = function() {
            btns = document.getElementsByClassName(this.id);
            follow(this.parentElement.childNodes[3].innerHTML.substr(1));
            for (var j=0; j<btns.length; j++) {
                btnswitch(btns[j], "follow");
            }
        }
    }
}

function retwyyt(id) {
    document.getElementById("twyyt-modal").style.display = "block";
    document.getElementById("twyyt-but-modal").innerHTML = "Retwyyt";
    document.getElementById("cont-twyyt").style.minHeight = "0px";
    
    document.getElementById("retwyyt").style.display = "block";
    sessionStorage.setItem("re", id);
    
    document.getElementById("temp-img").src = document.getElementById(id).childNodes[0].childNodes[0].src;
    
    document.getElementById("temp-info").innerHTML = document.getElementById(id).childNodes[1].childNodes[1].innerHTML;
    
    document.getElementById("temp-twyyt").innerHTML = document.getElementById(id).childNodes[1].childNodes[2].innerHTML;

    if (document.getElementById(id).childNodes[1].childNodes[3].tagName == "IMG") {
        document.getElementById("temp-image").style.display = "block";
        document.getElementById("temp-image").src = document.getElementById(id).childNodes[1].childNodes[3].src;
    }
}

function comment(id) {
    
    document.getElementById("twyyt-modal").style.display = "block";
    document.getElementById("twyyt-but-modal").innerHTML = "Reply";
    
    document.getElementById("comment-sub").style.display = "block";
    sessionStorage.setItem("co", id);
    
    document.getElementById("comment-img").src = document.getElementById(id).childNodes[0].childNodes[0].src;
    
    document.getElementById("comment-info").innerHTML = document.getElementById(id).childNodes[1].childNodes[1].innerHTML;
    
    document.getElementById("comment-twyyt").innerHTML = document.getElementById(id).childNodes[1].childNodes[2].innerHTML;
    
    document.getElementById("comment-reply").innerHTML = document.getElementById(id).childNodes[1].childNodes[1].childNodes[1].innerHTML.split(" ")[1];
}


function like(el) {
    action = el.childNodes[0].src;
    twyyt = el.parentElement.parentElement.parentElement.parentElement.id;
    
    if (action.indexOf("liked") > -1) {
        //unlike
        typ = "unlike";
        el.childNodes[0].src = "./res/ast/like.svg";
        el.nextSibling.innerHTML = parseInt(el.nextSibling.innerHTML) -1;
    } else {
        //like
        
        typ = "like";
        el.childNodes[0].src = "./res/ast/liked.svg";
        el.nextSibling.innerHTML = parseInt(el.nextSibling.innerHTML) +1;
    }
    url = "./php/change.php?typ=" + typ + "&id=" + twyyt;
    $.ajax({
         type: 'GET',
         data:$(this).serialize(),
         dataType: 'html',
         url: url,
         success: function (d) {
         }
    });
}

function calcTime(d, time) {
    timeYear = Math.floor(((d.getTime() / 1000) - time)/60/60/24/7/52);
    timeMonth = Math.floor(((d.getTime() / 1000) - time)/60/60/24/30);
    timeWeek = Math.floor(((d.getTime() / 1000) - time)/60/60/24/7);
    
    timeDay = Math.floor(((d.getTime() / 1000) - time)/60/60/24);
    timeHour = Math.floor(((d.getTime() / 1000) - time)/60/60);
    timeMin = Math.floor(((d.getTime() / 1000) - time)/60);
    timeSec = Math.floor(((d.getTime() / 1000) - time));
    if (timeSec < 60) {
        timeString = timeSec + "s";
    } else if (timeMin < 60) {
        timeString = timeMin + "m";
    } else if (timeHour < 24) {
        timeString = timeHour + "h";
    } else if (timeDay < 7) {
        timeString = timeDay + "d";
    } else if (timeDay < 30) {
        timeString = timeWeek + "w";
    } else {
        d = new Date(0);
        d.setUTCSeconds(time);
        timeString = m[d.getMonth()] + " " + d.getDate();
    }
    
    return timeString;
}

function reference(sub) {
    hashtags = sub.match(/#\S+/g);
    handles = sub.match(/@\S+/g);
    
    changed = sub;
    if (hashtags != null) {
        for (var j=0; j<hashtags.length; j++) {
            thequery = hashtags[j].split("#")[1];
            
            if (window.location.href.indexOf("/i/connect") > -1 || window.location.href.indexOf("/twyyt/") > -1 || window.location.href.indexOf("/followers") > -1 || window.location.href.indexOf("/following") > -1) {
                changed = changed.replace(hashtags[j], "<span class='link' onclick='teleport(\"../search?q=" + thequery + "&src=typed_query\", \"" + thequery + " - Twittyr Search / Twittyr\", \"./source/search.php\", \"./js/search.js\")'>" + hashtags[j] + "</span>");
            } else {
                changed = changed.replace(hashtags[j], "<span class='link' onclick='teleport(\"./search?q=" + thequery + "&src=typed_query\", \"" + thequery + " - Twittyr Search / Twittyr\", \"./source/search.php\", \"./js/search.js\")'>" + hashtags[j] + "</span>");   
            }
            
//            teleport("./search?q=" + squery + "&src=typed_query", squery + " - Twittyr Search / Twittyr", "./source/search.php", "./js/search.js")
        }
    }

    if (handles != null) {
        for (var j=0; j<handles.length; j++) {
            if (window.location.href.indexOf("/i/connect") > -1 || window.location.href.indexOf("/twyyt/") > -1 || window.location.href.indexOf("/followers") > -1 || window.location.href.indexOf("/following") > -1) {
                changed = changed.replace(handles[j], "<span class='link' onclick='teleport(\"../" + handles[j].split("@")[1] + "\", \"Somebody / Twittyr\", \"./source/profile.php\", \"./js/profile.js\")'>" + handles[j] + "</span>");
            } else {
                changed = changed.replace(handles[j], "<span class='link' onclick='teleport(\"./" + handles[j].split("@")[1] + "\", \"Somebody / Twittyr\", \"./source/profile.php\", \"./js/profile.js\")'>" + handles[j] + "</span>");   
            }
        }
    }
    
    return changed;
}

function follow(sub) {
    if (window.location.href.indexOf("/i/") > -1 || window.location.href.indexOf("/twyyt/") > -1 || window.location.href.indexOf("/followers") > -1 || window.location.href.indexOf("/following") > -1) {
        url = "../php/change.php?typ=follow&following=" + sub + "&follower=" + handle;   
    } else {
        url = "./php/change.php?typ=follow&following=" + sub + "&follower=" + handle;
    }
    $.ajax({
         type: 'GET',
         data:$(this).serialize(),
         dataType: 'html',
         url: url
    });
}

function unfollow(sub) {
    if (window.location.href.indexOf("/i/") > -1 || window.location.href.indexOf("/twyyt/") > -1 || window.location.href.indexOf("/followers") > -1 || window.location.href.indexOf("/following") > -1) {
        url = "../php/change.php?typ=unfollow&unfollowing=" + sub + "&unfollower=" + handle;   
    } else {
        url = "./php/change.php?typ=unfollow&unfollowing=" + sub + "&unfollower=" + handle;
    }
    $.ajax({
         type: 'GET',
         data:$(this).serialize(),
         dataType: 'html',
         url: url
    });
}
































