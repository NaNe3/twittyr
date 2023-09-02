document.getElementById("nav-body").style.height = window.innerHeight + "px";
document.getElementById("user-drop").style.display = "block";
document.getElementById("profile-btn").style.display = "block";
limit = 0;

dude = window.location.href.split("/");
dude = dude[dude.length-1];

if (dude == handle) {
    document.getElementById("profile-select").style.color = "#1DA1F2";
    document.getElementById("profile-select-img").src = "./res/ast/dude-s.png";
}

resize();
resize();
getDude();
getProfileTwyyts();
getSources();
recommend();
trending("trending-rec");

window.onload = function() {
    $('textarea').autoResize();
}

document.getElementById("load-modal").style.display = "none";

mo  = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

document.getElementById('image-modal').addEventListener('change', function() {
    if (this.files && this.files[0]) {
        var image = document.getElementById('image-pre-modal');  // $('img')[0]
        image.src = URL.createObjectURL(this.files[0]); // set src to blob url
        document.getElementById("image-cont-modal").style.display = "block";
    }
});

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

function getDude() {
    url = "./php/get.php?typ=user&handle=" + dude;
    $.ajax({
        type: 'GET',
        data:$(this).serialize(),
        dataType: 'html',
        url: url,
        success: function (d) {
            user = JSON.parse(d);
            if (user[0].landing == "") {
                document.getElementById("landing-place").style.display = "none";
            } else {
                document.getElementById("landing-place").src = "./res/landing/" + user[0].landing;   
            }
            document.getElementById("pic-place").src = "./res/usr/" + user[0].img;
            document.getElementById("name-place").innerHTML = user[0].name;
            document.getElementById("name-head").innerHTML = user[0].name;
            document.getElementById("twyyts-head").innerHTML = user[0].twyyts + " Twyyts";
            document.getElementById("handle-place").innerHTML = "@" + user[0].handle;
            
            document.getElementById("landing-input").value = "";
            document.getElementById("pic-input").value = "";
            
            document.getElementById("")
            
            changed = reference(user[0].bio);
            document.getElementById("bio-place").innerHTML = changed.replace(/\n\s*\n/g, '\n\n').replace(/\n/g, "<br>");
            
            document.getElementById("info-place").innerHTML = "<a href='#' onclick='teleport(\"./" + user[0].handle + "/following\", \"People following @" + user[0].handle + "\", \"../source/following.php\", \"../js/following.js\")' style='color: white; cursor: pointer;'><span style='font-weight: 600; color: white;'>" + (user[0].following.match(/"handle"/g) || []).length + "</span><span style='font-weight: 100; color: #7d8e9b;'> Following</span></a><a  href='#' onclick='teleport(\"./" + user[0].handle + "/followers\", \"People following @" + user[0].handle + "\", \"../source/following.php\", \"../js/following.js\")' style='color: white'><span style='font-weight: 600; color: white; padding-left: 20px; cursor: pointer;'>" + (user[0].followers.match(/"handle"/g) || []).length + "</span><span style='font-weight: 100; color: #7d8e9b;'> Followers</span></a>";
            
//            teleport('./' + user[0].handle + '/followers', 'People following @' + user[0].handle, '../source/following.php', '../js/following.js');
            
            btn = document.getElementById("btn-place");
            btn.id = user[0].handle + "-btn";
            btn.className = "btn-follow " + user[0].handle + "-btn";
            if (user[0].handle != handle) {
                btn.parentElement.id = user[0].handle + "-btn";
                if (user[0].followers.indexOf(handle) > -1) {
                    btn.innerHTML = "Following";
                    btn.style = "float: right; width: 100px; background-color: #1DA1F2; color: white; border: 1px solid #1DA1F2;";

                    btn.onmouseover = function() {
                        this.style = "background-color: #ca2055; float: right; width: 100px; color: white; border: 1px solid #ca2055;";
                        this.innerHTML = "Unfollow";
                    }

                    btn.onmouseout = function() {
                        this.style = "background-color: #1DA1F2; float: right; width: 100px; color: white; border: 1px solid #1DA1F2;";
                        this.innerHTML = "Following";
                    }

                    btn.onclick = function() {
                        btns = document.getElementsByClassName(this.id);
                        unfollow(this.parentElement.id.split("-")[0]);
                        for (var j=0; j<btns.length; j++) {
                            if (typeof(btns[j].parentElement.childNodes[3]) != 'undefined') {
                                if (btns[j].parentElement.childNodes[3].innerHTML.substr(1) + "-btn" == btns[j].id) {  
                                    btnswitch(btns[j], "unfollow");
                                } else {
                                    proswitch(btns[j], "unfollow");
                                }
                            } else {
                                proswitch(btns[j], "unfollow");
                            }
                        }
                    }
                } else {
                    btn.innerHTML = "Follow";
                    btn.style = "float: right; border: 1px solid #1DA1F2; color: #1DA1F2; background-color: transparent;";
                    btn.onmouseover = function() {
                        this.style.backgroundColor = "#132d48";

                    }

                    btn.onmouseout = function() {
                        this.style.backgroundColor = "#15202b";
                    }

                    btn.onclick = function() {
                        btns = document.getElementsByClassName(this.id);
                        follow(this.parentElement.id.split("-")[0]);  
                        for (var j=0; j<btns.length; j++) {
                            if (typeof(btns[j].parentElement.childNodes[3]) != 'undefined') {
                                if (btns[j].parentElement.childNodes[3].innerHTML.substr(1) + "-btn" == btns[j].id) {
                                    btnswitch(btns[j], "follow");
                                } else {
                                    proswitch(btns[j], "follow");
                                }
                            } else {
                                proswitch(btns[j], "follow");
                            }
                        }
                    }
                }
            } else {
                btn.innerHTML = "Edit profile";
                btn.style = "float: right; border: 1px solid #1DA1F2; color: #1DA1F2; background-color: transparent;";
                btn.onmouseover = function() { this.style.backgroundColor = "#132d48"; }
                btn.onmouseout = function() { this.style.backgroundColor = "#15202b"; }
                
                btn.onclick = function() {
                    document.getElementById("profile-name").value = document.getElementById("name-place").innerHTML;
                    document.getElementById("profile-bio").value = user[0].bio;
                    
                    document.getElementById("profile-landing").src = document.getElementById("landing-place").src;
                    document.getElementById("profile-pic").src = document.getElementById("pic-place").src;
                    
                    document.getElementById("profile-modal").style.display = "block";
                }
            }
            btn.style.display = "block";
        }
    });
    
}

function proswitch(btn, mode) {
    if (mode == "follow") {
        btn.innerHTML = "Following";
        btn.style = "float: right; width: 100px; background-color: #1DA1F2; color: white; border: 1px solid #1DA1F2;";

        btn.onmouseover = function() {
            this.style = "background-color: #ca2055; float: right; width: 100px; color: white; border: 1px solid #ca2055;";
            this.innerHTML = "Unfollow";
        }

        btn.onmouseout = function() {
            this.style = "background-color: #1DA1F2; float: right; width: 100px; color: white; border: 1px solid #1DA1F2;";
            this.innerHTML = "Following";
        }

        btn.onclick = function() {
            btns = document.getElementsByClassName(this.id);
            unfollow(this.parentElement.id.split("-")[0]);
            for (var j=0; j<btns.length; j++) {
                if (typeof(btns[j].parentElement.childNodes[3]) != 'undefined') {
                    if (btns[j].parentElement.childNodes[3].innerHTML.substr(1) + "-btn" == btns[j].id) {  
                        btnswitch(btns[j], "unfollow");   
                    } else {
                        proswitch(btns[j], "unfollow");    
                    }
                } else {
                    proswitch(btns[j], "unfollow");
                }
            }
        }
    } else {
        btn.innerHTML = "Follow";
        btn.style = "float: right; border: 1px solid #1DA1F2; color: #1DA1F2; background-color: transparent;";
        btn.onmouseover = function() {
            this.style.backgroundColor = "#132d48";

        }

        btn.onmouseout = function() {
            this.style.backgroundColor = "#15202b";
        }

        btn.onclick = function() {
            btns = document.getElementsByClassName(this.id);
            follow(this.parentElement.id.split("-")[0]);
            for (var j=0; j<btns.length; j++) {
                if (typeof(btns[j].parentElement.childNodes[3]) != 'undefined') {
                    if (btns[j].parentElement.childNodes[3].innerHTML.substr(1) + "-btn" == btns[j].id) {
                        btnswitch(btns[j], "follow");   
                    } else {
                        proswitch(btns[j], "follow");    
                    }
                } else {
                    proswitch(btns[j], "follow");
                }
            }
        }
    }
}

function changeProfileState() {
    console.log("change profile now");
    //profile page
    //document.getElementById("landing-place").src = document.getElementById("profile-landing").src;
    //document.getElementById("pic-place").src = document.getElementById("profile-pic").src;
    //document.getElementById("name-place").innerHTML = document.getElementById("profile-name").value;
    //document.getElementById("bio-place").innerHTML = document.getElementById("profile-bio").value;

    //refLanding = document.getElementById("landing-place").src;
    caches.open('v1').then(function(cache) {
        cache.delete(theimage).then(function(response) {console.log("it is done");});
        //cache.delete(refLanding).then(function(response) {console.log("it is done");});
        //cache.delete(theimage);
    })

    //window.location.href = window.location.href;

    //account button on bottom left
    //document.getElementById("").src
    //document.getElementById("").innerHTML
}


function editpro(input) {
    if (input.files && input.files[0]) {
        var reader = new FileReader();
        
        reader.onload = function(e) {
            $('#profile-' + input.id.split("-")[0]).attr('src', e.target.result);
        }

        reader.readAsDataURL(input.files[0]); // convert to base64 string
    }
}

function switchProfile(dest) {
    if (dest.style.color != "#7d8e9b") {
        document.getElementById("twyyt-select").style.color = "#7d8e9b";
        document.getElementById("twyyt-select").style.borderBottom = "2px solid transparent";
        document.getElementById("like-select").style.color = "#7d8e9b";
        document.getElementById("like-select").style.borderBottom = "2px solid transparent";

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
            getProfileTwyyts();
        } else {
            getProfileLikes();
        }
    }
}

function getProfileTwyyts() {
    dude = window.location.href.split("/");
    dude = dude[dude.length-1];
    
    url = "./php/get.php?typ=profile-twyyts&handle=" + dude + "&off=" + limit;
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

function getProfileLikes() {
    dude = window.location.href.split("/");
    dude = dude[dude.length-1];
    
    url = "./php/get.php?typ=profile-likes&handle=" + dude + "&off=" + limit;
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

function getSources() {
    url = "./php/get.php?typ=profile-sources&handle=" + dude;
    $.ajax({
        type: 'GET',
        data:$(this).serialize(),
        dataType: 'html',
        url: url,
        success: function (d) {
            data = JSON.parse(d);
            
            if (data.length > 0) {
                document.getElementById("img-cont").style.display = "block";
            }
            
            for (var i=0; i<data.length; i++) {
                div = document.createElement("div");
                div.className = "img";
                
                img = document.createElement("img");
                img.src = "./res/twyyt/" + data[i].sources;
                img.onload = function() {
                    if (this.height > this.width) {
                        this.style.width = "111px";
                    } else {
                        this.style.height = "90px";
                    }
                }
                img.onclick = function() {
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
                
                div.appendChild(img);
                document.getElementById("img-cont").appendChild(div);
            }
        }
    });
}


















