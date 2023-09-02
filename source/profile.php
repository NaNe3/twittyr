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
        
        <link rel="icon" type="image/png" href="./res/ast/fav.ico">
        <link href="./css/twittyr.css" type="text/css" rel="stylesheet">

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
                            <img src="./res/ast/byrd.svg" style="width: 30px; height: 30px;" onclick="teleport('./home', 'Home / Twittyr', './source/home.php', './js/twittyr.js')">

                        </div>
                    </div>

                    <div class="opt-cont" onclick="teleport('./home', 'Home / Twittyr', './source/home.php', './js/twittyr.js')">
                        <div class="nav-opt">
                            <img src="./res/ast/home.svg">
                            <p class="opt-text">Home</p>
                        </div>
                    </div>

                    <div class="opt-cont" onclick="teleport('./explore', 'Explore / Twittyr', './source/explore.php', './js/explore.js')">
                        <div class="nav-opt">
                            <img src="./res/ast/wyrld.svg">
                            <p class="opt-text">Explore</p>
                        </div>
                    </div>

                    <div class="opt-cont" onclick="teleport('./notifications', 'Notifications / Twittyr', './source/notifications.php', './js/notifications.js')" style="position: relative;">
                        <div class="nav-opt">
                            <img src="./res/ast/bell.svg">
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
                            <img src="./res/ast/messages.svg">
                            <p class="opt-text">Messages</p>
                        </div>
                    </div>
                    
                    <div class="opt-cont">
                        <div class="nav-opt">
                            <img src="./res/ast/mark.svg">
                            <p class="opt-text">Bookmarks</p>
                        </div>
                    </div>
                    
                    <div class="opt-cont">
                        <div class="nav-opt">
                            <img src="./res/ast/list.svg">
                            <p class="opt-text">Lists</p>
                        </div>
                    </div>

                    <div class="opt-cont">
                        <div class="nav-opt" onclick="teleport('./<?php echo $_SESSION['handle'] ?>', '<?php echo $_SESSION['name']?> (@<?php echo $_SESSION['handle'] ?>) / Twittyr', './source/profile.php', './js/profile.js')">
                            <img id="profile-select-img" src="./res/ast/dude.svg">
                            <p id="profile-select" class="opt-text">Profile</p>
                        </div>
                    </div>
                    
                    <div class="opt-cont" style="position: relative;" onclick="moretoggle(event)">
                        <div id="more-view" class="dropdown-content" style="padding: 10px 0px; pointerEvents: none; width: 200px; left: 0; bottom: 0; border-radius: 5px;">
                            <a href="#" style="border: 0; font-size: 15px;"><img src="./res/ast/invite.svg" style="width: 20px; float: left; margin-right: 5px;">Invite Center</a>
                            <a href="#" style="border: 0; font-size: 15px;"><img src="./res/ast/lemonade.svg" style="width: 20px; float: left; margin-right: 5px;">Lemonade stand</a>
                            
                            <a onclick="teleport('./settings', 'Settings / Twittyr', './source/settings.php', './js/settings.js')" style="font-size: 15px;"><img src="./res/ast/settings.svg" style="width: 20px; float: left; margin-right: 5px;">Settings and privacy</a>
                        </div>
                        
                        <div class="nav-opt">
                            <img src="./res/ast/more.svg">
                            <p class="opt-text">More</p>
                        </div>
                    </div>

                    <button id="twyyt-but" style="width: 100%; height:45px;  margin-top: 10px;" onclick="document.getElementById('twyyt-modal').style.display = 'block';">Twyyt</button>

                    <div id="profile-btn" class="opt-cont" onclick="toggle(event)" style="width: 100%; margin-bottom: 10px; display: none;">
                        <div id="user-drop" class="nav-opt dropbtn" style="width: 100%; position: absolute; bottom: 8px; left: 0; width: 100%;">
                            <img src="./res/usr/<?php echo $_SESSION['img']; ?>" style="background-color: white; border-radius: 100px; padding: 0px; width: 39px; height: 39px;" >
                            <div id="profile-info" style="width: 100%;">
                                <img src="./res/ast/dywn.svg" style="height: 15px; width: 15px; float: right; margin: 13px 0px 0px 0px;">
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
                            <img src="./res/usr/<?php echo $_SESSION['img']; ?>" style="background-color: white; border-radius: 100px; padding: 0px; width: 55px; height: 55px; float: left;" >
                            <img src="./res/ast/check.svg" style="height: 20px; width: 20px; float: right; margin: 17px 10px 0px 0px;">
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
                
                <div id="img-cont" style="margin-top: 15px; display: none;">
<!--
                    <img src="./res/twyyt/102.png">
                    <img src="./res/twyyt/125.png">
                    <img src="./res/twyyt/125.png">
                    <img src="./res/twyyt/102.png">
                    <img src="./res/twyyt/125.png">
                    <img src="./res/twyyt/102.png">
-->
                </div>
                
                <div id="follow-rec" class="info-box">
                    <p class="info-header">You might like</p>
                    
                    <img id="rec-loading" src="./res/ast/load.gif" style="width: 40px; height: 40px; display: block; margin: 20px auto;">
                    
                    <div class="info-box-link" style="border-radius: 0px 0px 15px 15px;" onclick="teleport('./i/connect', 'Connect / Twittyr', '../source/connect.php', '../js/connect.js');">
                        <p style="color: #1da1f2; margin: 0;">Show more</p>
                    </div>
                </div>
                
                <div id="trending-rec" class="info-box">
                    <p class="info-header">What's happening</p>
                    
                    <img id="trend-loading" src="./res/ast/load.gif" style="width: 40px; height: 40px; display: block; margin: 20px auto;">
                    
                    <div class="info-box-link" style="border-radius: 0px 0px 15px 15px;"  onclick="teleport('./explore', 'Explore / Twittyr', './source/explore.php', './js/explore.js')">
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
                <div id="head-cont" style="z-index: 100; margin: 0px;">
                    <div class="opt-cont" style="float: left; width: auto; margin-top: 5px; margin-right: 20px;">
                        <div class="nav-opt">
                            <img src="./res/ast/back.svg" style="height: 24px; width: 24px; margin-right: 0px;" onclick="teleport('./home', 'Home / Twittyr', './source/home.php', './js/twittyr.js')">
                        </div>
                    </div>
                    <div>
                        <p id="name-head" style="margin: 8px 0px 5px 0px;"></p>
                        <p id="twyyts-head" style="color: #6a8290; font-size: 12px; line-height: 12px; font-weight: 100; margin: 5px 0px 8px 0px;"></p>
                    </div>
                </div>
                
                <div style="width: 100%; display: block; overflow: auto; margin: 0; border-bottom: 1px solid #38444d;">
                    <div style="width: 100%; height: 200px; overflow: hidden; margin: 0; background-color: #162d40;">
                        <img id="landing-place" style="width: 100%; margin: 0;">
                    </div>
                    <div style="width: 100%; padding: 0px 15px;">
                        <div style="float: right; margin-top: 10px;"><button id="btn-place" style="display: none;"></button></div>
                        
                        <img id="pic-place" style="width: 150px; height: 150px; margin: -75px 0px 0px; border-radius: 100px; border: 5px solid #15202b; background-color: white;">
                        <p id="name-place" style="font-size: 20px; font-weight: 900; color: white; margin: 0;"></p>
                        <p id="handle-place" style="font-weight: 100; color: #7d8e9b; margin: 0;"></p>
                        
                        <p id="bio-place" style="color: white; font-size: 15px; line-height: 18px;"></p>
                        
                        <p id="info-place"></p>
                    </div>
                    
                    <div style="width: 100%; margin: 0; padding: 0;">
                        <div id="twyyt-select" class="opt-view" style="border-bottom: 2px solid #1DA1F2; color: #1DA1F2;" onclick="switchProfile(this)">
                            Twyyts
                        </div>
                        <div id="like-select" class="opt-view" onclick="switchProfile(this)">
                            Likes
                        </div>
                    </div>
                </div>
                <div id="twyyts" style="width: 100%; padding: 0; margin: 0;">
                    <img id="twyyts-loading" src="./res/ast/load.gif" style="width: 40px; height: 40px; display: block; margin: 20px auto;">
                </div>
                
            </div>
        </div>
        
        <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
        <script src="./js/resize.js"></script>
    </body>
</html>
























