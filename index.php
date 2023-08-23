<?php
    session_start();
    if (!isset($_SESSION['handle'])) {
        echo "<script>window.location = './gate'</script>";
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
        
        <!-- Global site tag (gtag.js) - Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=UA-180639992-1"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());

  gtag('config', 'UA-180639992-1');
</script>

    </head>
    <body>
        <div id="body-cont">
<!--            LEFT COLUMN-->
            <div id="nav-bar">
                
            </div>
            
<!--            RIGHT COLUMN-->
            <div id="info-col">
                
            </div>
            
<!--            CONTNET MIDDLE-->
            <div id="content-col">
                
            </div>
        </div>
        
        <div id="profile-modal" class="modal" style="display: none;">
            <!-- Modal content -->
            <div class="modal-content" style="width: 600px; margin-top: 40px; padding: 0px; border-radius: 15px;">
                <div style="width: 100%; border-bottom: 1px solid #38444d; padding: 4px 8px; overflow: auto;">
                    <div class="opt-img" onclick='document.getElementById("profile-modal").style.display = "none";'><span style="font-size: 32px; line-height: 32px; color: #1DA1F2; padding: 0px 5px; margin: 0;">&times;</span></div>
                    
                    <button style="float: right; margin-top: 5px;" onclick="document.getElementById('prof-save-but').click()">Save</button>
                    
                    <p class="info-header" style="padding: 11px; margin-left: 50px;">Edit Profile</p>
                </div>
                
                <form id="edit-profile-modal" method="post" enctype="multipart/form-data">
                    <div style="width: 100%; height: 175px; overflow: hidden; margin: 0; background-color: #162d40; padding: 2px; position: relative;">
                        <img id="profile-landing" style="width: 100%; height: 175px; margin: 0;">
                        <div class="set-cont" style="left: 285px; top: 70px;" onclick="document.getElementById('landing-input').click()">
                            <div class="nav-opt">
                                <img src="./res/ast/add.png" id="landing-input-img">
                            </div>
                        </div>

                        <input type="file" id="landing-input" name="landing-input" style="display: none;" onchange="editpro(this)"accept="image/x-png,image/jpeg">
                    </div>

                    <div style="width: 100%; padding: 15px; position: relative; z-index: 100;">
                        <div style="position: relative;">
                            <img id="profile-pic" src="./res/usr/Opx5_fZ4_400x400.jpg" style="width: 125px; height: 125px; background-color: white; border-radius: 100px; border: 5px solid #15202b; margin: -65px 0px 0px 0px;">
                            <div class="set-cont" style="left: 39px; top: -12px; margin-top: -12px;" onclick="document.getElementById('pic-input').click()">
                                <div class="nav-opt">
                                    <img src="./res/ast/add.png" id="profile-input-img">
                                </div>
                            </div>

                            <input type="file" id="pic-input" name="pic-input" style="display: none;" onchange="editpro(this)"accept="image/x-png,image/jpeg">
                        </div>

                        <div class="input-container">
                            <label for="pass">Name</label>
                            <input type="text" name="name" id="profile-name" placeholder="Add your name">
                        </div>

                        <div class="input-container">
                            <label for="pass">Bio</label>
                            <textarea id="profile-bio" name="bio" placeholder="Add your bio"></textarea>
                        </div>
                    </div>
                    
                    <input type="submit" id="prof-save-but" style="display: none;">
                </form>
                
            </div>
        </div>
        
        <div id="twyyt-modal" class="modal" style="display: none;">
            <!-- Modal content -->
            <div class="modal-content" style="width: 600px; margin-top: 40px; padding: 0px; border-radius: 15px;">
                <div style="width: 100%; border-bottom: 1px solid #38444d; padding: 4px 8px; overflow: auto;">
                    <div class="opt-img" onclick='document.getElementById("twyyt-modal").style.display = "none"; document.getElementById("twyyt-but-modal").innerHTML = "Twyyt"; document.getElementById("retwyyt").style.display = "none"; document.getElementById("twyyt-form-modal").action = "./php/post.php?typ=twyyt?"; document.getElementById("cont-twyyt").style.minHeight = "260px"; document.getElementById("temp-image").style.display = "none";document.getElementById("comment-sub").style.display = "none";'><span style="font-size: 32px; line-height: 32px; color: #1DA1F2; padding: 2px 5px; margin: 0;">&times;</span></div>
                </div>
                
                <div id="comment-sub" style="display: none;">
                    <div style="width: 60px; display: inline-block; float: left; overflow: hidden; position: absolute; z-index: 100;">
                        <img id="comment-img" src="./res/usr/7.png" style="width: 58px; background-color: white; border-radius: 100px; margin: 10px 7px; border: 5px solid #15202b;">
                    </div>    
                    
                    <div style="width: 530px; display: inline-block; position: relative; padding-left: 34px; border-left: 2px solid #3d5466; margin: 17px 0px 0px 36px;">
                        <p id="comment-info" style="display: inline-block; margin: 0px 0px 6px 0px; padding: 0px; line-height: 14px; float: left; width: 100%;"><span style="font-weight: 600; color: white;">Eli Summers</span><span style="font-weight: 100; color: #7d8e9b;"> @the_pauper • 12m</span></p>
                        
                        <p id="comment-twyyt" style="color: white;">Happy 80th birthday to longtime YAF ally Dr. Art Laffer! Thank you for inspiring thousands of students year after year with your lessons that bring economics to life. https://pic.twitter.com/4lSptwdIpo</p>
                        
                        <p style="color: #7d8e9b;">Replying to <span id="comment-reply" class="link">@esummers</span></p>
                    </div>
                </div>
                
                
                <div style="width: 60px; display: inline-block; float: left; overflow: hidden;">
                    <img src="./res/usr/<?php echo $_SESSION['img']; ?>" style="width: 48px; background-color: white; border-radius: 100px; margin: 10px 12px;">
                </div>

                <div id="cont-twyyt" style="width: 530px; display: inline-block; margin-bottom: 8px; min-height: 260px; position: relative;">
                    <form id="twyyt-form-modal" method="post" enctype="multipart/form-data" action="./php/post.php?typ=twyyt">
                        <textarea id="hard-text-modal" form="twyyt-form-modal" name="hard-text" style="width: 100%; margin: 20px 0px auto 5px" placeholder="twyyt goes here :)" oninput="twyytCheck(this.value, '-modal')"></textarea>
                        <input id="image-modal" type="file" name="image" style="display: none;" accept="image/x-png,image/gif,image/jpeg,video/mp4">
                        
                        <div id="retwyyt" class="retwyyt" style="width: 500px; display: none; margin-bottom: 62px; max-height: 300px; overflow: hidden; margin-left: 20px;">
                            <div style="width: 100%; overflow: auto; margin: 10px 10px 0px 10px;">
                                <img id="temp-img" src="#" style="width: 22px; border-radius: 100px; background-color: white; border: 1px solid #38444d; margin: 0px; padding: 0px; float: left;">
                                <p id="temp-info" style="display: inline-block; margin: 6px; padding: 0px; line-height: 14px; float: left;"><span style="font-weight: 600; color: white;">Eli Summers</span><span style="font-weight: 100; color: #7d8e9b;"> @the_pauper • 12m</span></p>
                            </div>
                            <p id="temp-twyyt" style="color: white; margin: 2px 10px 10px 10px;"></p>
                            
                            <img id="temp-image" src="#" style="display: none; width: 100%; margin: 0; padding: 0;">
                            <video id="temp-video" src="#" controls="true" autoplay style="display: none; width: 100%; margin: 0; padding: 0;"></video>
                        </div>
                        
                        <div id="image-cont-modal" style="width: 500px; position: relative; border: 1px solid #38444d; border-radius: 15px; display: none; overflow: hidden; max-height: 300px;  margin-bottom: 62px; margin-left: 20px; padding: 0px;">
                            <img id="image-pre-modal" src="#" style="width: 100%; padding: 0;">

                            <span class="edit" style="position: absolute; top: 10px; left: 10px;" onclick="document.getElementById('image-pre-modal').src = ''; this.parentElement.style.display = 'none'; document.getElementById('image-modal').value = '';">&times;</span>
                        </div>
                        
                        <div id="video-cont-modal" style="width: 500px; position: relative; border: 1px solid #38444d; border-radius: 15px; display: none; overflow: hidden; max-height: 300px;  margin-bottom: 62px; margin-left: 20px; padding: 0px;">
                            <video id="video-pre-modal" src="#" controls="true" autoplay style="width: 100%;"></video>

                            <span class="edit" style="position: absolute; top: 10px; left: 10px;" onclick="document.getElementById('video-pre-modal').src = ''; this.parentElement.style.display = 'none'; document.getElementById('image-modal').value = '';">&times;</span>
                        </div>

                        <div style="width: 100%; padding: 0px 10px; position: absolute; bottom: 0; left: 0;">
                            <div class="opt-img" onclick="document.getElementById('image-modal').click()"><img src="res/ast/pic.png"></div>
                            <div class="opt-img"><img src="res/ast/gif.png"></div>
                            <div class="opt-img"><img src="res/ast/poll.png"></div>
                            <div class="opt-img"><img src="res/ast/emoji.png"></div>

                            <div style="float: right;">
                                <p id="twyyt-char-modal" style="font-size: 12px; color: indianred; display: inline; border-right: 1px solid grey; padding: 12px 16px; display: none;">280</p>
                                <button id="twyyt-but-modal" type="button" style="margin-left: 10px;" onclick='document.getElementById("sub-but-modal").click();document.getElementById("twyyt-modal").style.display = "none"; document.getElementById("twyyt-but-modal").innerHTML = "Twyyt"; document.getElementById("retwyyt").style.display = "none"; document.getElementById("twyyt-form-modal").action = "./php/post.php?typ=twyyt?"; document.getElementById("cont-twyyt").style.minHeight = "260px"; document.getElementById("temp-image").style.display = "none";document.getElementById("comment-sub").style.display = "none";'>Twyyt</button>
                            </div>
                        </div>
                        <input type="submit" id="sub-but-modal" style="display: none;">
                    </form>
                </div>
            </div>
        </div>
        
        <div id="pic-modal" class="modal" style="max-width: 100%; max-height: 100%; overflow: hidden; display: none; background-color:rgba(255,255,255,0.25);">
            <div class="opt-img" onclick='document.getElementById("pic-modal").style.display = "none";' style="position: absolute; top: 20px; left: 20px;">
                <span style="font-size: 32px; line-height: 32px; color: #1DA1F2; padding: 0px 5px; margin: 0;">&times;</span>
            </div>
            
            <img id="pic-modal-pic" src="res/twyyt/249.gif" style="display: block; margin: auto;">
        </div>
        
        <div id="load-modal" class="modal">
<!--             Modal content -->
            <div class="modal-content" style="width: 100%; height: 100%;">
                <img id="twittyr-pic" src="./res/ast/twitterer.png" style="width: 100px; height: 100px;">
            </div>
        </div>
        
        <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
        <script src="./js/backbone.js"></script>
        <script src="./js/resize.js"></script>
        <script src="./js/load.js"></script>
    </body>
</html>
























