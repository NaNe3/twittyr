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
            var handle = "<?php echo $_SESSION['handle']?>";
            var img = "<?php echo $_SESSION['img']?>";
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

                    <div class="opt-cont" onclick="teleport('./<?php echo $_SESSION['handle'] ?>', '<?php echo $_SESSION['name']?> (@<?php echo $_SESSION['handle'] ?>) / Twittyr', './source/profile.php', './js/profile.js')">
                        <div class="nav-opt">
                            <img src="./res/ast/dude.svg">
                            <p class="opt-text">Profile</p>
                        </div>
                    </div>
                    
                    <div class="opt-cont" style="position: relative;" onclick="moretoggle(event)">
                        <div id="more-view" class="dropdown-content" style="padding: 10px 0px; pointerEvents: none; width: 200px; left: 0; bottom: 0; border-radius: 5px;">
                            <a href="#" style="border: 0; font-size: 15px;"><img src="./res/ast/invite.svg" style="width: 20px; float: left; margin-right: 5px;">Invite Center</a>
                            <a href="#" style="border: 0; font-size: 15px;"><img src="./res/ast/lemonade.svg" style="width: 20px; float: left; margin-right: 5px;">Lemonade stand</a>
                            
                            <a style="font-size: 15px;" onclick="teleport('./settings', 'Settings / Twittyr', './source/settings.php', './js/settings.js')"><img src="./res/ast/settings.svg" style="width: 20px; float: left; margin-right: 5px;">Settings and privacy</a>
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
                
            </div>
            
<!--            CONTNET MIDDLE-->
            <div id="content-col">
                <div id="head-cont" style="z-index: 100;">
                    <p class="info-header">Settings</p>
                </div>
                
                <div id="twyyts" style="cursor: default; padding:  10px 33px;">
                    
                    <div id="cur-pas-div" style="width: 100%; margin-bottom: 15px;">
                        <p class="info-header" style="padding: 15px 0px;">Change Password</p>
                        <div class="input-container" style="margin-bottom: 15px;">
                            <label for="email">Current Password</label>
                            <input type="password" class="input" name="curpass" id="curpass" placeholder="">
                        </div>
                        
                        <button onclick="checkPass()">Next</button>
                    </div>
                    
                    <div id="new-pas-div" style="width: 100%; margin-bottom: 15px; display: none;">
                        <p class="info-header" style="padding: 15px 0px;">Change Password</p>
                        <div class="input-container">
                            <label for="email">Password</label>
                            <input type="password" class="input" name="newpass" id="newpass" placeholder="something cool but unbreakable">
                        </div>
                        <div class="input-container">
                            <label for="email">Password Confirmation</label>
                            <input type="password" class="input" name="conpass" id="conpass">
                        </div>
                        
                        <button onclick="changePass()">Change</button>
                    </div>
                    
                    <p id="passchanged" style="color: white; display: none;">Password Changed!</p>
                    
                    
                </div>
            </div>
        </div>
        
        <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
        <script src="../js/notifications.js"></script>
        <script src="../js/resize.js"></script>
    </body>
</html>
























