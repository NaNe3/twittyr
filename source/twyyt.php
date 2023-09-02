<?php
    session_start();
    if (!isset($_SESSION['handle']) || !isset($_GET['twyyt'])) {
        //echo "<script>window.location = './gate'</script>";
    }
?>
<!DOCTYPE html>
<html>
    <head>
        <title>Twittyr</title>
        <meta charset="utf-8">
        <meta name="viewport" content="user-scalable=no, initial-scale=1, maximum-scale=1, minimum-scale=1" />
        
        <link rel="icon" type="image/png" href="../res/ast/fav.ico">
        <link href="../css/twittyr.css" type="text/css" rel="stylesheet">

        <script>
            var user = "<?php echo $_SESSION['name']?>";
            var theuser = "<?php echo $_SESSION['name']?>";
            var handle = "<?php echo $_SESSION['handle']?>";
            var theimage = "<?php echo $_SESSION['img']?>";
        </script>
    </head>
    <body>
        <div id="body-cont">
<!--            LEFT COLUMN-->
            <div id="nav-bar">
                <div id="nav-body" style="position: relative;">
                    <div class="opt-cont">
                        <div class="nav-opt">
                            <img src="../res/ast/byrd.svg" style="width: 30px; height: 30px;" onclick="teleport('../home', 'Home / Twittyr', './source/home.php', './js/twittyr.js')">

                        </div>
                    </div>

                    <div class="opt-cont" onclick="teleport('../home', 'Home / Twittyr', './source/home.php', './js/twittyr.js')">
                        <div class="nav-opt">
                            <img src="../res/ast/home.svg">
                            <p class="opt-text">Home</p>
                        </div>
                    </div>

                    <div class="opt-cont" onclick="teleport('../explore', 'Explore / Twittyr', './source/explore.php', './js/explore.js')">
                        <div class="nav-opt">
                            <img src="../res/ast/wyrld.svg">
                            <p class="opt-text">Explore</p>
                        </div>
                    </div>

                    <div class="opt-cont" onclick="teleport('../notifications', 'Notifications / Twittyr', './source/notifications.php', './js/notifications.js')" style="position: relative;">
                        <div class="nav-opt">
                            <img src="../res/ast/bell.svg">
                            <?php 
                                if ($_SESSION['notifications'] > 0) {
                                    echo '<p style="background-color: #1DA1F2; color:white; border-radius: 100px; font-size: 11px; padding: 2px 5px; line-height: 12px; font-weight: 100; position: absolute;  top: 6px; left: 8px;">' . $_SESSION['notifications'] . '</p>';
                                } 
                            ?>
                            <p class="opt-text">Notifications</p>
                        </div>
                    </div>
                    
                    <div class="opt-cont">
                        <div class="nav-opt">
                            <img src="../res/ast/messages.svg">
                            <p class="opt-text">Messages</p>
                        </div>
                    </div>
                    
                    <div class="opt-cont">
                        <div class="nav-opt">
                            <img src="../res/ast/mark.svg">
                            <p class="opt-text">Bookmarks</p>
                        </div>
                    </div>
                    
                    <div class="opt-cont">
                        <div class="nav-opt">
                            <img src="../res/ast/list.svg">
                            <p class="opt-text">Lists</p>
                        </div>
                    </div>

                    <div class="opt-cont">
                        <div class="nav-opt" onclick="teleport('../<?php echo $_SESSION['handle'] ?>', '<?php echo $_SESSION['name']?> (@<?php echo $_SESSION['handle'] ?>) / Twittyr', './source/profile.php', './js/profile.js')">
                            <img src="../res/ast/dude.svg">
                            <p class="opt-text">Profile</p>
                        </div>
                    </div>
                    
                    <div class="opt-cont" style="position: relative;" onclick="moretoggle(event)">
                        <div id="more-view" class="dropdown-content" style="padding: 10px 0px; pointerEvents: none; width: 200px; left: 0; bottom: 0; border-radius: 5px;">
                            <a href="#" style="border: 0; font-size: 15px;"><img src="../res/ast/invite.svg" style="width: 20px; float: left; margin-right: 5px;">Invite Center</a>
                            <a href="#" style="border: 0; font-size: 15px;"><img src="../res/ast/lemonade.svg" style="width: 20px; float: left; margin-right: 5px;">Lemonade stand</a>
                            
                            <a style="font-size: 15px;" onclick="teleport('../settings', 'Settings / Twittyr', './source/settings.php', './js/settings.js')"><img src="../res/ast/settings.svg" style="width: 20px; float: left; margin-right: 5px;">Settings and privacy</a>
                        </div>
                        
                        <div class="nav-opt">
                            <img src="../res/ast/more.svg">
                            <p class="opt-text">More</p>
                        </div>
                    </div>

                    <button id="twyyt-but" style="width: 100%; height:45px;  margin-top: 10px;" onclick="document.getElementById('twyyt-modal').style.display = 'block';">Twyyt</button>

                    <div id="profile-btn" class="opt-cont" onclick="toggle(event)" style="width: 100%; margin-bottom: 10px; display: none;">
                        <div id="user-drop" class="nav-opt dropbtn" style="width: 100%; position: absolute; bottom: 8px; left: 0; width: 100%;">
                            <img src="../res/usr/<?php echo $_SESSION['img']; ?>" style="background-color: white; border-radius: 100px; padding: 0px; width: 39px; height: 39px;" >
                            
                            <div id="profile-info" style="width: 100%;">
                                <img src="../res/ast/dywn.svg" style="height: 15px; width: 15px; float: right; margin: 13px 0px 0px 0px;">
                                <div style="width: 60%; overflow: hidden; height: 40px;">
                                    <div style="max-width: 600px;">
                                        <p style=" display: inline-block; margin-left: 10px; font-size: 15px; color: white; line-height: 16px;"><?php echo $_SESSION['name']; ?></p>
                                        <p style="display: inline-block; font-size: 14px; color: #6a8290; margin-left: 10px; line-height: 14px; font-weight: 100; margin-top: 5px;">@<?php echo $_SESSION['handle']; ?></p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <div id="profile-view" class="dropdown-content" style="padding: 10px 0px; pointerEvents: none;">
                        <div style="width: 100%; background-color: #15202b; padding: 10px; overflow: auto;">
                            <img src="../res/usr/<?php echo $_SESSION['img']; ?>" style="background-color: white; border-radius: 100px; padding: 0px; width: 55px; height: 55px; float: left;" >
                            <img src="../res/ast/check.svg" style="height: 20px; width: 20px; float: right; margin: 17px 10px 0px 0px;">
                            <p style="width: 50%; display: inline-block; font-size: 15px; color: white; line-height: 16px; margin: 7px 0px 0px 10px; font-weight: 600;"><?php echo $_SESSION['name']; ?></p>
                            <p style="display: inline-block; font-size: 14px; color: #6a8290; margin-left: 10px; line-height: 14px; font-weight: 100; margin-top: 5px;">@<?php echo $_SESSION['handle']; ?></p>
                        </div>
                        <a href="#about">Access another account</a>
                        <a href="#" onclick="logOut('./php/leave.php', './gate/')">Log out of @<?php echo $_SESSION['handle']; ?></a>
                    </div>
                </div>
            </div>
            
<!--            RIGHT COLUMN-->
            <div id="info-col">
                <div id="search-box">
                    <input id="search-input" type="text" placeholder="Search Twittyr" oninput="search(this.value)" onfocus="document.getElementById('search-drop').style.display = 'block';" onblur="document.getElementById('search-drop').style.display = 'none';" autocomplete="off">
                    <div id="search-drop" class="dropdown-content" style="top: 48px; position: absolute; width: 100%; min-height: 90px; padding: 0px; border-radius: 5px; left: 0px; overflow: auto;">
                        <span id="empty-search" style="color: #7d8e9b; display: block; text-align: center; font-size: 15px; margin-top: 15px;">Try searching for people, topics, or keywords</span>
                
                        <div id="fog" style="width: 100%; height: 600px; position: absolute; background-color: #7d8e9b; display: inline; z-index: 1000; opacity: 0.7; display: none;"></div>
                        <div id="search-res">
                        </div>
                    </div>
                </div>
                
                <div id="other-box" class="other-box" style="overflow: hidden;">
                    <p class="info-header">Relevant People</p>
                    
                </div>
                
                <div id="trending-rec" class="info-box">
                    <p class="info-header">What's happening</p>
                    
                    <img id="trend-loading" src="./res/ast/load.gif" style="width: 40px; height: 40px; display: block; margin: 20px auto;">
                    
                    <div class="info-box-link" style="border-radius: 0px 0px 15px 15px;" onclick="teleport('./explore', 'Explore / Twittyr', './source/explore.php', './js/explore.js')">
                        <p style="color: #1da1f2; margin: 0;">Show more</p>
                    </div>
                </div>
                
                <div style="width: 100%; margin-top: 20px; padding: 0px 10px;">
                    <a href="#" style="font-size: 13px; color: #6a8290;">Terms</a>
                    <a href="#" style="font-size: 13px; color: #6a8290; margin-left: 7px;">Privacy policy</a>
                    <a href="#" style="font-size: 13px; color: #6a8290; margin-left: 7px;">Cookies</a>
                    <a href="#" style="font-size: 13px; color: #6a8290; margin-left: 7px;">Ads info</a>
                    <a href="#" style="font-size: 13px; color: #6a8290; margin-left: 7px;">More</a>
                    <p style="font-size: 13px; color: #6a8290; margin: 7px 0px 0px 0px;">© 2020 Twittyr, LLC</p>
                </div>
            </div>
            
<!--            CONTNET MIDDLE-->
            <div id="content-col">
                <div id="head-cont" style="z-index: 100;">
                    <div class="opt-cont" style="float: left; width: auto; margin-top: 5px; margin-right: 20px;">
                        <div class="nav-opt">
                            <img src="../res/ast/back.svg" style="height: 24px; width: 24px; margin-right: 0px;" onclick="teleport('../home', 'Home / Twittyr', './source/home.php', './js/twittyr.js')">
                        </div>
                    </div>
                    <p>Twyyt</p>
                </div>
                
                <div id="twyyts" style="cursor: default; display: none;">
                    
                    <div id="comments-sub" style="display: none; padding: 0px 20px;">
                        <div style="width: 60px; display: inline-block; float: left; overflow: hidden; position: absolute; z-index: 98;">
                            <img id="comments-img" src="./res/usr/7.png" style="width: 58px; background-color: white; border-radius: 100px; margin: 10px 7px 10px -5px; border: 5px solid #15202b;">
                        </div>    

                        <div style="width: 530px; display: inline-block; position: relative; padding-left: 34px; border-left: 2px solid #3d5466; margin: 17px 0px 0px 24px; min-height: 100px;">
                            <p id="comments-info" style="display: inline-block; margin: 0px 0px 6px 0px; padding: 0px; line-height: 14px; float: left; width: 100%;"><span style="font-weight: 600; color: white;">Eli Summers</span><span style="font-weight: 100; color: #7d8e9b;"> @the_pauper • 12m</span></p>

                            <p id="comments-twyyt" style="color: white;"></p>
                            
                            <img id="comments-image" src="#" style="width: 100%; border: 1px solid #38444d; border-radius: 15px; overflow: hidden; display: none;">
                        </div>
                    </div>
                    
                    <div id="thetwyytinquestion" class="twyyts" style="padding: 0px 20px;">
                        <div style="max-width: 600px; display: inline-block; overflow: hidden; width: 100%; margin-bottom: 15px;">
                            <div class="opt-img" style="float: right; padding: 6px 10px; margin: 10px 0px;"><img src="../res/ast/dywn.svg" style="width: 10px; height: 10px;"></div>
                            <img id="usrPic" src="../res/usr/7.svg" style="width: 48px; background-color: white; border-radius: 100px; margin: 10px 12px 10px 0px; float: left;">
                            
                            <p id="usrName" style="margin: 0; font-weight: 600; color: white; margin-top: 20px;">Eli Summers</p>
                            <p id="usrHandle" style="font-weight: 100; color: #7d8e9b; margin: 0;">@esummers</p>
                        </div>
                        
                        <p id="thetwyyt" style="font-size: 22px; color: white; margin-top: 0px; line-height: 30px;"></p>
                        
                        <div id="twyyt-image-box" style="max-height: 500px; overflow: hidden; border: 1px solid #38444d; border-radius: 15px; display: none; width: 100%;">
                            <img id="twyyt-image" src="" style="width: 100%; margin-bottom: -4px;">
                        </div>
                        
                        <div id="twyyt-video-box" style="max-height: 500px; overflow: hidden; border: 1px solid #38444d; border-radius: 15px; display: none; width: 100%;">
                            <video id="twyyt-video" src="#" controls="true" autoplay style="width: 100%;"></video>
                        </div>
                        
                        <div id="retwyyt-box" class="retwyyt" style="width: 100%; display: none; max-height: 500px; overflow: hidden;">
                            <div style="width: 100%; overflow: auto; margin: 10px 10px 0px 10px;">
                                <img id="re-pic" src="#" style="width: 22px; border-radius: 100px; background-color: white; border: 1px solid #38444d; margin: 0px; padding: 0px; float: left;">
                                <p id="re-info" style="display: inline-block; margin: 6px; padding: 0px; line-height: 14px; float: left;"><span style="font-weight: 600; color: white;">Eli Summers</span><span style="font-weight: 100; color: #7d8e9b;"> @the_pauper • 12m</span></p>
                            </div>
                            <p id="re-twyyt" style="color: white; margin: 2px 10px 10px 10px;"></p>
                            
                            <img id="re-image" src="#" style="display: none; width: 100%; margin: 0; padding: 0;">
                            <video id="re-video" src="#" controls="true" autoplay style="display: none; width: 100%; margin: 0; padding: 0;"></video>
                        </div>
                        
                        <p id="timestamp" style="font-weight: 100; color: #7d8e9b;">7:28 AM · August 1, 2020 · <a href="#">Twittyr for Brick</a></p>
                        
                        <p style="border-top: 1px solid #38444d; border-bottom: 1px solid #38444d; padding: 15px 0px;"><a href="#" style="color: white;"><span id="recom" style="font-weight: 600;"></span> <span style="color: #7d8e9b; font-weight: 100;">Retwyyts and comments</span></a>&emsp;<a href="#" style="color: white;"><span id="likeNum" style="font-weight: 600;"></span> <span style="color: #7d8e9b; font-weight: 100;">Likes</span></a></p>
                        
                        <div style="width: 100%; padding: 0; margin: 0;">
                            <div style="width: 24%; margin: 0; padding: 0; display: inline-block;">
                                <div class="opt-cont" style="display: block; margin: auto; width: 40px;" onclick='commentTwyyt()'>
                                    <div class="nav-opt">
                                        <img src="../res/ast/comment.svg" style="width: 20px; height: 20px; display: block; margin: auto;">
                                    </div>
                                </div>
                            </div>
                            
                            <div style="width: 24%; margin: 0; padding: 0; display: inline-block;">
                                <div class="opt-cont" style="display: block; margin: auto; width: 40px;" onclick="retwyytTwyyt()">
                                    <div class="nav-opt">
                                        <img id="retwyyt-pic" src="../res/ast/retwyyt.svg" style="width: 20px; height: 20px; display: block; margin: auto;">
                                    </div>
                                </div>
                            </div>
                            
                            <div style="width: 24%; margin: 0; padding: 0; display: inline-block;">
                                <div class="opt-cont" style="display: block; margin: auto; width: 40px;" onclick="likeTwyyt()">
                                    <div class="nav-opt">
                                        <img id="like-pic" src="../res/ast/like.svg" style="width: 20px; height: 20px; display: block; margin: auto;">
                                    </div>
                                </div>
                            </div>
                            
                            <div style="width: 24%; margin: 0; padding: 0; display: inline-block;">
                                <div class="opt-cont" style="display: block; margin: auto; width: 40px;">
                                    <div class="nav-opt">
                                        <img src="../res/ast/share.svg" style="width: 20px; height: 20px; display: block; margin: auto;">
                                    </div>
                                </div>
                            </div>
                            
<!--
                            <div style="width: 25%; margin: 0; padding: 0; display: inline;"></div>
                            <div style="width: 25%; margin: 0; padding: 0; display: inline;"></div>
                            <div style="width: 25%; margin: 0; padding: 0; display: inline;"></div>
-->
                        </div>
                        
<!--
                        <div style="max-width: 530px; display: inline-block; margin-top: 12px; padding-left: 16px;">
                            <div class="opt-img" style="float: right; padding: 6px 10px;"><img src="./res/ast/dywn.svg" style="width: 10px; height: 10px;"></div>

                            <p style="margin: 0;"><span style="font-weight: 600; color: white;">Eli Summers</span><span style="font-weight: 100; color: #7d8e9b;"> @the_pauper • 12m</span></p>

                            <p style="color: white; margin-top: 5px;">Start painting MAGA on streets all across the country.</p>

                            <div style="width: 100%; margin-left: -10px;">
                                <div style="width: 25%; overflow: auto; float: left;"><div class="opt-img"><img src="./res/ast/comment.svg"></div> <span class="stat">45</span></div>
                                <div style="width: 25%; overflow: auto; float: left;"><div class="opt-img"><img src="./res/ast/retwyyt.svg"></div><span class="stat">45</span></div>
                                <div style="width: 25%; overflow: auto; float: left;"><div class="opt-img"><img src="./res/ast/like.svg"></div><span class="stat">45</span></div>
                                <div style="width: 25%; overflow: auto; float: left;"><div class="opt-img"><img src="./res/ast/share.svg"></div><span class="stat">45</span></div>
                            </div>

                        </div>
-->
                    </div>
                </div>
            </div>
        </div>
        
        <div id="load-modal" class="modal" style="display: none;">
            <!-- Modal content -->
            <div class="modal-content" style="width: 100%; height: 100%;">
                <img id="twittyr-pic" src="../res/ast/twitterer.svg" style="width: 100px; height: 100px;">
            </div>
        </div>
        
        <div id="twyyt-modal" class="modal" style="display: none;">
            <!-- Modal content -->
            <div class="modal-content" style="width: 600px; margin-top: 40px; padding: 0px; border-radius: 15px;">
                <div style="width: 100%; border-bottom: 1px solid #38444d; padding: 4px 8px; overflow: auto;">
                    <div class="opt-img" onclick='document.getElementById("twyyt-modal").style.display = "none"; document.getElementById("twyyt-but-modal").innerHTML = "Twyyt"; document.getElementById("retwyyt").style.display = "none"; document.getElementById("twyyt-form-modal").action = "../php/post.php?typ=twyyt?"; document.getElementById("cont-twyyt").style.minHeight = "260px"; document.getElementById("temp-image").style.display = "none";'><span style="font-size: 32px; line-height: 32px; color: #1DA1F2; padding: 2px 5px; margin: 0;">&times;</span></div>
                </div>
                
                <div style="width: 60px; display: inline-block; float: left; overflow: hidden;">
                    <img src="../res/usr/<?php echo $_SESSION['img']; ?>" style="width: 48px; background-color: white; border-radius: 100px; margin: 10px 12px;">
                </div>

                <div id="cont-twyyt" style="width: 530px; display: inline-block; margin-bottom: 8px; min-height: 260px; position: relative;">
                    <form id="twyyt-form-modal" method="post" enctype="multipart/form-data" action="../php/post.php?typ=twyyt">
                        <textarea id="hard-text-modal" form="twyyt-form-modal" name="hard-text" style="width: 100%; margin: 20px 0px auto 5px" placeholder="Your Thoughts (optional)" oninput="twyytCheck(this.value, '-modal')"></textarea>
                        <input id="image-modal" type="file" name="image" style="display: none;">
                        
                        <div id="retwyyt" class="retwyyt" style="width: 500px; display: none; margin-bottom: 62px; max-height: 300px; overflow: hidden; margin-left: 20px;">
                            <div style="width: 100%; overflow: auto; margin: 10px 10px 0px 10px;">
                                <img id="temp-img" src="#" style="width: 22px; border-radius: 100px; background-color: white; border: 1px solid #38444d; margin: 0px; padding: 0px; float: left;">
                                <p id="temp-info" style="display: inline-block; margin: 6px; padding: 0px; line-height: 14px; float: left;"><span style="font-weight: 600; color: white;">Eli Summers</span><span style="font-weight: 100; color: #7d8e9b;"> @the_pauper • 12m</span></p>
                            </div>
                            <p id="temp-twyyt" style="color: white; margin: 2px 10px 10px 10px;">Sometimes I think the United States only has one problem that causes all of our other problems: Teachers Unions remove competition from the system.<br><br>We are producing citizens who can't tell the difference between their biggest problems and their smallest.</p>
                            
                            <img id="temp-image" src="#" style="display: none; width: 100%; margin: 0; padding: 0;">
                        </div>
                        
                        <div id="image-cont-modal" style="width: 500px; position: relative; border: 1px solid #38444d; border-radius: 15px; display: none; overflow: hidden; max-height: 300px;  margin-bottom: 62px; margin-left: 20px; padding: 0px;">
                            <img id="image-pre-modal" src="#" style="width: 100%; padding: 0;">

                            <span class="edit" style="position: absolute; top: 10px; left: 10px;" onclick="document.getElementById('image-pre-modal').src = ''; this.parentElement.style.display = 'none'; document.getElementById('image-modal').value = '';">&times;</span>
                        </div>

                        <div style="width: 100%; padding: 0px 10px; position: absolute; bottom: 0; left: 0;">
                            <div class="opt-img" onclick="document.getElementById('image-modal').click()"><img src="../res/ast/pic.svg"></div>
                            <div class="opt-img"><img src="../res/ast/gif.svg"></div>
                            <div class="opt-img"><img src="../res/ast/poll.svg"></div>
                            <div class="opt-img"><img src="../res/ast/emoji.svg"></div>

                            <div style="float: right;">
                                <p id="twyyt-char-modal" style="font-size: 12px; color: indianred; display: inline; border-right: 1px solid grey; padding: 12px 16px; display: none;">280</p>
                                <button id="twyyt-but-modal" type="button" style="margin-left: 10px;" onclick="document.getElementById('sub-but-modal').click()">Twyyt</button>
                            </div>
                        </div>
                        <input type="submit" id="sub-but-modal" style="display: none;">
                    </form>
                </div>
            </div>
        </div>
        
        <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
        <script src="../js/twyyt.js"></script>
        <script src="../js/resize.js"></script>
    </body>
</html>
























