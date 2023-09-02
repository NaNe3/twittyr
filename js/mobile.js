limit = 0;
isReady = false;
mo  = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
m = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

inputs = document.getElementsByTagName('input');

for (var i=0; i<inputs.length; i++) {
    inputs[i].onfocus = function() {
        inputAction(this);
    }
    
    inputs[i].oninput = function() {
        inputAction(this);
        if (this.id == "up-handle") {
            handleexists(this.value);
        }
    }
    
    inputs[i].onblur = function() {
        this.style.borderBottom = "2px solid #8899a6";
    }
}
getRecents();

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
    
    imgDiv = document.createElement("div");
    imgDiv.className = "teleport";
    imgDiv.style = "width: 60px; display: inline-block; float: left; overflow: hidden;";

    pic = document.createElement("img");
    pic.className = "teleport";
    pic.src = "../res/usr/" + data.pic;
    pic.style = "width: 48px; background-color: white; border-radius: 100px; margin: 10px 12px;";

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
    info.innerHTML = "<span style='font-weight: 600; color: white;' class='user-name'>" + data.name + "</span><span style='font-weight: 100; color: #7d8e9b;'> @" + data.handle + " • " + calcTime(d, data.time) + "</span>";

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

    likeStat = "like";
    reStat = "retwyyt";

    bar = document.createElement("div");
    bar.style = "width: 100%; margin-left: -10px;";
    bar.innerHTML = '<div style="width: 25%; overflow: auto; float: left;" class="teleport"><div class="opt-img"><img src="../res/ast/comment.svg"></div> <span class="stat">' + (data.comments.match(/"handle"/g) || []).length + '</span></div><div style="width: 25%; overflow: auto; float: left;" class="teleport"><div class="opt-img"><img src="../res/ast/' + reStat + '.svg"></div><span class="stat">' + (data.retwyyts.match(/"handle"/g) || []).length + '</span></div><div style="width: 25%; overflow: auto; float: left;" class="teleport"><div class="opt-img"><img src="../res/ast/' + likeStat + '.svg"></div><span class="stat">' + (data.likes.match(/"handle"/g) || []).length + '</span></div><div style="width: 25%; overflow: auto; float: left;" class="teleport"><div class="opt-img"><img src="../res/ast/share.svg"></div></div>';

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
        }
        media.src = "../res/twyyt/" + data.sources;
        media.style = "width: 100%; border: 1px solid #38444d; border-radius: 15px; margin-top: 20px;";
        
        textDiv.appendChild(media);
    }

    if (data.type == "re") {
        resrc = JSON.parse(data.sid);

        re = document.createElement("div");
        re.className = "retwyyt";
        re.style = "width: 100%; max-height: 600px; overflow: hidden; margin: 15px 0px 5px 0px;";

        retop = document.createElement("div");
        retop.style = "width: 100%; overflow: auto; margin: 10px 10px 0px 10px;";

        repic = document.createElement("img");
        repic.src = "../res/usr/" + resrc[0].pic;
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
                reimg.src = "../res/twyyt/" + resrc[0].sources;
                
                reimg.controls = true;
                reimg.autoplay = false;
            } else {
                reimg = document.createElement("img");
                reimg.src = "../res/twyyt/" + resrc[0].sources;   
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
            changed = changed.replace(hashtags[j], "<span class='link'>" + hashtags[j] + "</span>");
        }
    }

    if (handles != null) {
        for (var j=0; j<handles.length; j++) {
            changed = changed.replace(handles[j], "<span class='link'>" + handles[j] + "</span>");
        }
    }
    
    return changed;
}