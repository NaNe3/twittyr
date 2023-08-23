if (typeof load == 'undefined') {
    load = [];   
}

isReady = true;
readyFor = true;

limit = 0;

resize();
resize();
getTwyyts();
recommend();
trending("trending-rec");

document.getElementById("nav-body").style.height = window.innerHeight + "px";
document.getElementById("user-drop").style.display = "block";
document.getElementById("profile-btn").style.display = "block";

window.onload = function() {
    $('textarea').autoResize();
}

mo  = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
m = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

inputs = document.getElementsByTagName('input');
texts = document.getElementsByTagName('textarea');

for (var i=0; i<inputs.length; i++) {
    if (inputs[i].parentElement.className == "input-container") {
        inputs[i].onfocus = function() {
            inputAction(this);
        }

        inputs[i].oninput = function() {
            inputAction(this);
        }

        inputs[i].onblur = function() {
            this.style.borderBottom = "2px solid #8899a6";
        }
    }
}

for (var i=0; i<texts.length; i++) {
    if (texts[i].parentElement.className == "input-container") {
        texts[i].onfocus = function() {
            inputAction(this);
        }

        texts[i].oninput = function() {
            inputAction(this);
        }

        texts[i].onblur = function() {
            this.style.borderBottom = "2px solid #8899a6";
        }   
    }
}

function inputAction(el) {
    if (el.tagName == "TEXTAREA") {
        minlen = 0;
        len = 160;
    } else {
        minlen = 3;
        len = 50;
    }
    
    if (el.value.length > minlen && el.value.length < len) {
        el.style.borderBottom = "2px solid #1DA1F2";
//        el.parentElement.childNodes[0].style.color = "#1DA1F2";
    } else {
        el.style.borderBottom = "2px solid indianred";
//        el.parentElement.childNodes[0].style.color = "#1DA1F2";
    }
}

//if (load.indexOf("twyyt-form") == -1) {
$("#twyyt-form").submit(function(e) {
    if (readyFor == true && document.getElementById("hard-text").value != "") {
        readyFor = false;
        date = new Date();

        e.preventDefault();
        var formData = new FormData(this);

        document.getElementById('hard-text').value = document.getElementById('hard-text').value.replace(/\n\s*\n/g, '\n\n').replace(/</g, "tough luck");

        $.ajax({
            url: "./php/post.php?typ=twyyt&re=-1",
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

                    twyytFixed = document.getElementById("hard-text").value.replace(/"/g, '\"').replace(/'/g, "\'").replace(/</g, "tough luck").replace(/\n/g, "<br>");

                    code = '[{"id":"' + msg[0].id + '","type":"normal","sid":"0","pic":"' + theimage + '","name":"' + theuser + '","handle":"' + handle + '","twyyt":"' + twyytFixed + '","time":"' + date.getTime() / 1000 + '","date":"' + (mo[date.getMonth()] + " " + date.getDate() + ", " + date.getFullYear()) + '","sources":"' + imgTemp + '","likes":"0","comments":"0","views":"0","retwyyts":"0"}]';

                    survey(JSON.parse(code), "new");

                    document.getElementById("hard-text").value = "";
                    document.getElementById("image").value = "";
                    document.getElementById("image-cont").style.display = "none";
                    twyytCheck(document.getElementById("hard-text").value, "");
                    readyFor = true;
                }
            },
            cache: false,
            contentType: false,
            processData: false
        });
    }
    return false;
});
//    load.push("twyyt-form");   
//}

document.getElementById('image').addEventListener('change', function() {
    document.getElementById("video-cont").style.display = "none";
    document.getElementById("image-cont").style.display = "none";
    
    if (this.files && this.files[0]) {
        if (document.getElementById("image").value.indexOf(".mp4") > -1) {
            var media = document.getElementById('video-pre');  // $('img')[0]
            document.getElementById("video-cont").style.display = "block";
        } else {
            var media = document.getElementById('image-pre');  // $('img')[0]   
            document.getElementById("image-cont").style.display = "block";
        }
        media.src = URL.createObjectURL(this.files[0]); // set src to blob url
        
        if (document.getElementById("image").value.indexOf(".mp4") > -1) {
            document.getElementById("video-cont").style.display = "block";
        } else {  
            document.getElementById("image-cont").style.display = "block";
        }
    }
    
    twyytCheck(document.getElementById("hard-text").value, '');
});

var lastScrollTop = 0;
var lastType = "";
var barrierTop = 0;
var barrierBottom = 0;

function toggle(event) {
    document.getElementById("profile-view").classList.toggle("show");
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

//function logOut(url) {
//    $.ajax({
//         type: 'GET',
//         data:$(this).serialize(),
//         dataType: 'html',
//         url: url,
//         success: function (d) {
//             document.write(d);
//         }
//    });
//}

//function twyytCheck(cont, ext) {
//    if (cont.length == 0 || cont.length > 281) {
//        if (ext == "") {
//            document.getElementById("twyyt-char" + ext).style.color = "indianred";
//            document.getElementById("twyyt-but" + ext).disabled = "true";
//        }
//    } else {
//        document.getElementById("twyyt-char" + ext).style.color = "white";
//        document.getElementById("twyyt-but" + ext).disabled = "false";
//    }
//    
//    if (cont.length == 0) {
//        document.getElementById("twyyt-char" + ext).style.display = "none";
//    } else {
//        document.getElementById("twyyt-char" + ext).style.display = "inline";
//    }
//    
//    document.getElementById("twyyt-char" + ext).innerHTML = (281 - parseInt(cont.length)).toString();
//}



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

//function twyytComment(id) {
//    document.getElementById("twyyt-modal").style.display = "block";
//    document.getElementById("twyyt-but-modal").innerHTML = "Reply";
//    
//    sessionStorage.setItem("co", id);
//}


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
    } else if (timeMonth < 12) {
        d = new Date(0);
        d.setUTCSeconds(time);
        timeString = m[d.getMonth()] + " " + d.getDate();
    } else {
        d = new Date(0);
        d.setUTCSeconds(time);
        timeString = m[d.getMonth()] + " " + d.getDate() + ", " + d.getFullYear();
    }
    
    return timeString;
}
































