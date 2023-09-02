allLoaded = true;

function teleport(url, title, loc, jsloc) {
    if (allLoaded == true) {
        allLoaded = false;
        document.body.scrollTop = 0;
        document.documentElement.scrollTop = 0;

        document.title = title;
        window.history.pushState( {} , title, url);
        
        $("#info-col").empty();
        $("#content-col").empty();
        
        loadimg = document.createElement("img");
        loadimg.src = "./res/ast/load.gif";
        loadimg.style = "display: block; width: 50px; margin: auto; padding-top: 50px;";
        loadimg2 = loadimg;
        
        document.getElementById("info-col").appendChild(loadimg);
        document.getElementById("content-col").appendChild(loadimg2);
        
        $.get(loc, null, function(text) {
            //succ = $('html').find('script').remove();

            $("#info-col").empty();
            newInfo = $($(text).find('#info-col')).clone().children();
            newInfo.appendTo('#info-col');

            $("#content-col").empty();
            newContent = $($(text).find('#content-col')).clone().children();
            newContent.appendTo('#content-col');

            $("#nav-bar").empty();
            newBar = $($(text).find('#nav-bar')).clone().children();
            newBar.appendTo('#nav-bar');
            
            $.getScript(jsloc, function(){});
            //document.getElementById("info-col").appendChild(newInfo);
            //$('#info-col').load('./twittyr/twyyt/index.php#info-col');
            allLoaded = true;
            if (window.innerWidth < 1300 && window.innerWidth > 640) {
                //document.getElementsByClassName("opt-text").style.display = "none";
                varBars = document.getElementsByClassName("opt-text");
                for (i = 0; i < varBars.length; i++) {
                    varBars[i].style.display = "none";
                }
                //document.getElementById("twyyt-but").innerHTML = "<img src='./res/ast/twyyt-small.svg' style='width: 25px; height: 25px; margin-top: 2px;'>";
                //document.getElementById("twyyt-but").style.width = "45px";
                //document.getElementById("twyyt-but").style.height = "45px";
            }
        });
        setTimeout(function () {
            document.getElementById("load-modal").style.display = "none";
        }, 1000);
    }
}