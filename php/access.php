<?php
    $mode = $_GET["mod"];
    $servername = "localhost";
    $username = "u485947687_twyytyr";
    $password = "Wess2434$$";
    $dbname = "u485947687_twittyr";
    
// ini_set("SMTP","smtp.hostinger.com");
// ini_set("smtp_port","587");

    if ($mode == "in") {
        if (empty($_POST['email']) != true && empty($_POST['pass']) != true) {
            $conn = new mysqli($servername, $username, $password, $dbname);
            // Check connection
            if ($conn->connect_error) {
                die("Connection failed: " . $conn->connect_error);
            } 

            $sql = "SELECT * FROM users WHERE email = '" . $_POST['email'] . "' AND pass = '" . $_POST['pass'] . "'";

            $arr = array();
            $result = $conn->query($sql) or die($conn->error);
            while ($row = $result->fetch_assoc()) {
                $arr[] = $row;
                session_start();
                
                $_SESSION['handle'] = $row['handle'];
                $_SESSION["name"] = $row['name'];
                $_SESSION["img"] = $row['img'];
                $_SESSION['id'] = $row['id'];
            }
            if (isset($_SESSION['handle'])) {
                $sql = "SELECT LENGTH(notifications) - LENGTH(REPLACE(notifications, 'unseen', 'unsee')) FROM users WHERE handle='" . $_SESSION['handle'] . "'";
                $result = $conn->query($sql) or die($conn->error);
                while ($row = $result->fetch_assoc()) {
                    $_SESSION['notifications'] = $row["LENGTH(notifications) - LENGTH(REPLACE(notifications, 'unseen', 'unsee'))"];
                }   
            }
            
            $conn->close();
            
            if (count($arr) == 0) {
                echo "failed";
            } else {
                echo "success";
            }
        }
    } else if ($mode == "up") {
        if (empty($_POST['handle']) != true && empty($_POST['email']) != true) {
            $conn = new mysqli($servername, $username, $password, $dbname);
            // Check connection
            if ($conn->connect_error) {
                die("Connection failed: " . $conn->connect_error);
            }
			
			$bet = array("a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z");
            
            $pass = substr(md5(uniqid(mt_rand(), true)), 0, 12);
            echo $pass;
            
            $sql = "INSERT INTO users (status, notifications, name, handle, bio, email, pass, img, landing, following, followers, twyyts) VALUES ('unverified', '[]', 'John Dude', '" . $_POST['handle'] . "', 'just \'cause you put syrup on something dont make it pancakes', '" . $_POST['email'] . "', '" . $pass . "', '" . $bet[array_rand($bet)] . ".png', '', '[]', '[]', 0)";
            $result = $conn->query($sql) or die($conn->error);
            
            $to = $_POST['email'];
            $subject = "Welcome to Twittyr..";
            $msg = "PASSWORD: " . $pass . "\n\n\nTwittyr.com is still under development so if you encounter any problems, let me know by replying to this email. Thank you :) <img src='https://media1.tenor.com/images/be8fb55b84ccd537d3b0140fd84abb4b/tenor.gif?itemid=17033528' style='width: 250px;'>\n-Eli Summers (@esumme1)\n\n\n\nLEGAL: this website was made as an academic project and is no way meant to be a competitor to twitter.com";
            $headers = "From: gatekeeper@twittyr.com";
         
            mail($to,$subject,$msg,$headers);
        }
    }
    


















?>