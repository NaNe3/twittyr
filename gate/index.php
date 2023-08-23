<?php
    session_start();
    if (isset($_SESSION['handle'])) {
        echo "<script>window.location = '../'</script>";
    }
?>
<!DOCTYPE html>
<html>
    <head>
        <title>Twittyr | Home</title>
        <meta charset="utf-8">
        <meta name="viewport" content="user-scalable=no, initial-scale=1, maximum-scale=1, minimum-scale=1" />
        
        <link rel="icon" type="image/png" href="../res/ast/fav.ico">
        <link href="../css/twittyr.css" type="text/css" rel="stylesheet">
        <link href="../css/gate.css" type="text/css" rel="stylesheet">
        
<!--        <script src="../js/twittyr.js"></script>-->
        <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>

    </head>
    <body>
        
<!--
        <div id="sign-box" style="display: none;">
            <img src="../res/ast/byrd.png" style="width: 50px; height: 50px; display: block; margin: auto; margin-bottom: 10px;">
            <form id="sign-form" method="post" action="../php/access.php?mod=in">
                <div class="input-container">
                    <label for="email">Email</label>
                    <input class="input" name="email" id="email" placeholder="example@email.com">
                </div>
                
                <div class="input-container">
                    <label for="pass">Password</label>
                    <input type="password" name="pass" id="pass" placeholder="password">
                </div>
                
                <input id="sub-but" type="submit" style="display: none;">
            </form>
            
            <button class="alt-but" onclick="verify()">Sign In</button>
        </div>
-->
        
        <div id="twyyts-prev">
            <div id="head-cont" style="z-index: 100;">
                <div style="float: right; margin-top: 8px;">
                    <button onclick="document.getElementById('sign-in-modal').style.display = 'block';" style="background-color: #15202b; color: #1DA1F2; border: 1px solid #1DA1F2;">Sign in</button>
                    <button onclick="document.getElementById('sign-up-modal').style.display = 'block';">Sign Up</button>
                </div>

                <p>Latest from twittyr</p>
            </div>
            
            <div id="twyyts">
                <img id="twyyts-loading" src="../res/ast/load.gif" style="width: 40px; height: 40px; display: block; margin: 20px auto;">
            </div>
        </div>
        
        
        <div id="sign-in-modal" class="modal" style="display: none;" onclick="if (event.target.id == 'sign-in-modal') { this.style.display = 'none'; }">
            <div class="modal-content sign-box" style="max-width: 400px;">
<!--
                <div class="opt-cont" style="float: left; width: auto; margin-top: 5px; margin-right: 20px;">
                    <div class="nav-opt">
                        <img src="../res/ast/back.png" style="height: 24px; width: 24px; margin-right: 0px;" onclick="document.getElementById('sign-in-modal').style.display = 'none';">
                    </div>
                </div>
-->
                <img src="../res/ast/byrd.png" style="width: 50px; height: 50px; display: block; margin: auto; margin-bottom: 10px;">
                <form id="sign-form" method="post" action="../php/access.php?mod=in">
                    <div class="input-container">
                        <label for="email">Email</label>
                        <input class="input" name="email" id="email" placeholder="example@email.com">
                    </div>

                    <div class="input-container">
                        <label for="pass">Password</label>
                        <input type="password" name="pass" id="pass" placeholder="password">
                    </div>

                    <input id="sub-but" type="submit" style="display: none;">
                </form>

                <button class="alt-but" onclick="verify()">Sign In</button>
            </div>
        </div>
        
        <div id="sign-up-modal" class="modal" style="display: none;" onclick="if (event.target.id == 'sign-up-modal') { this.style.display = 'none'; }">
            <div class="modal-content sign-box" style="width: 550px; padding: 20px; height: 500px;">
                <img src="../res/ast/byrd.png" style="width: 50px; height: 50px; display: block; margin: auto; margin-bottom: 10px;">
                <form id="sign-up-form" method="post" action="../php/access.php?mod=up">
                    <div id="up-page-one">
                        <div class="input-container" style="margin-bottom: 20px;">
                            <label for="email">Username</label>
                            <input class="input" name="handle" id="up-handle" placeholder="something rad ( e.g. @handle)">
                            <p id="avail-text" style="font-weight: 100; color: #79818d; visibility: hidden;">@handle is not available</p>
                        </div>
<!--
                        <p class="info-header" style="padding: 0px 0px 10px 0px;">Password</p>
                        <div class="input-container">
                            <label for="email">Password</label>
                            <input class="input" name="up-pass" id="up-pass" placeholder="something cool but unbreakable">
                        </div>
                        <div class="input-container">
                            <label for="email">Verify Password</label>
                            <input class="input" name="up-pass-2" id="up-pass-2" placeholder="repeat">
                        </div>
-->

                    </div>
                    <div id="up-page-two" style="display: none;">
                        <div class="input-container">
                            <label for="email">Email</label>
                            <input class="input" name="email" id="up-email" placeholder="example@email.com">
                        </div>
                        <span style="width: 100%; margin-top: 0px;">
                            <div class="radio-cont" style="float: left; padding: 10px; margin: -20px 10px -10px -10px;">
                                <input id="age-check" type="checkbox" name="age" style="float: left;">
                            </div>
                            <p style="color: white; font-size: 19px; font-weight: 100; margin: -10px auto 40px auto;">I am a human being over the age of 18 years old.. I promise :))))</p>
                        </span>
                    </div>

                    <input id="up-sub-but" type="submit" style="display: none;">
                </form>

                <div id="alt-buts" style="display: none;">
                    <button id="alt-but" class="alt-but" onclick='document.getElementById("up-page-one").style.display = "block";document.getElementById("up-page-two").style.display = "none";document.getElementById("alt-buts").style.display = "none";document.getElementById("next-but").style.display = "block";'>Back</button>
                    <button id="alt-but" class="alt-but" onclick="check(2)">Sign Up</button>
                </div>
                <button id="next-but" class="next-but" onclick="check(1)">Next</button>
            </div>
        </div>


        <script src="../js/gate.js"></script>
    </body>
</html>
























