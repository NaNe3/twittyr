<?php
    session_start();

    $type = $_GET["typ"];
    $servername = "localhost";
    $username = "u485947687_twyytyr";
    $password = "Wess2434$$";
    $dbname = "u485947687_twittyr";
    

    //AVERAGE RATING

    if ($type == "like") {
        $conn = new mysqli($servername, $username, $password, $dbname);
        
        $sql = "SELECT likes, handle, twyyt FROM twyyts WHERE id = " . $_GET['id'];
        $result = $conn->query($sql) or die($conn->error);
        while($row = $result->fetch_assoc()) {
            $likes = json_decode($row["likes"]);
            $usrhandle = $row["handle"];
            $twyyt = $row['twyyt'];
            
            array_push($likes, array('handle' => $_SESSION['handle']));
        }
        
        $likes = json_encode($likes);
        
        $sql = "UPDATE twyyts SET likes='" . $likes . "' WHERE id=" . $_GET['id'];
        $result = $conn->query($sql) or die($conn->error);
        
        if ($usrhandle != $_SESSION['handle']) {
            $sql = "SELECT notifications FROM users WHERE handle = '" . $usrhandle . "'";
            $result = $conn->query($sql) or die($conn->error);
            while($row = $result->fetch_assoc()) {
                $not = json_decode($row["notifications"]);

                $twyyt = str_replace('"', '\"', $twyyt);
                $twyyt = str_replace("'", "\'", $twyyt);
                $twyyt = str_replace("\n", "<br>", $twyyt);
                $twyyt = str_replace("\r", "", $twyyt);
                
                echo $twyyt;
                
                array_push($not, array('handle' => $_SESSION['handle'], 'type' => 'liked', 'pic' => $_SESSION['img'], 'name' => $_SESSION['name'], 'content' => 'liked your twyyt', 'twyyt' => $_GET['id'], 'text' => $twyyt, 'status' => 'unseen'));
            }

            $not = json_encode($not);

//            $not = str_replace("\n", "<br>", $not);
            
            $sql = "UPDATE users SET notifications='" . $not . "' WHERE handle='" . $usrhandle . "'";
            $result = $conn->query($sql) or die($conn->error);   
        }
        
        $conn->close();
    } else if ($type == "unlike") {
        $conn = new mysqli($servername, $username, $password, $dbname);
        
        $sql = "SELECT likes FROM twyyts WHERE id = " . $_GET['id'];
        $result = $conn->query($sql) or die($conn->error);
        while($row = $result->fetch_assoc()) {
            $likes = json_decode($row["likes"], true);
            
            $loc = array_search($_SESSION['handle'], array_column($likes, 'handle'));
        }
        
        if ($loc != FALSE || $loc == 0) {
            array_splice($likes, $loc, 1);
            
            $likes = json_encode($likes);
            $sql = "UPDATE twyyts SET likes='" . $likes . "' WHERE id=" . $_GET['id'];
            $result = $conn->query($sql) or die($conn->error);
        }
        
        $conn->close();
    } else if ($type == "follow") {
        //add follower to person being followed
        
        $conn = new mysqli($servername, $username, $password, $dbname);
        
        $sql = "SELECT followers, handle, img FROM users WHERE handle = '" . $_GET['following'] . "'";
        $result = $conn->query($sql) or die($conn->error);
        while($row = $result->fetch_assoc()) {
            $followers = json_decode($row["followers"]);
            
            array_push($followers, array('handle' => $_SESSION['handle'], 'img' => $_SESSION['img']));
            
            $folhandle = $row['handle'];
            $folimg = $row['img'];
        }
        
        $followers = json_encode($followers);
        
        $sql = "UPDATE users SET followers='" . $followers . "' WHERE handle= '" . $_GET['following'] . "'";
        $result = $conn->query($sql) or die($conn->error);
        
        //add following to person following
        $sql = "SELECT following FROM users WHERE handle = '" . $_GET['follower'] . "'";
        $result = $conn->query($sql) or die($conn->error);
        while($row = $result->fetch_assoc()) {
            $following = json_decode($row["following"]);
            
            array_push($following, array('handle' => $folhandle, 'img' => $folimg));  
        }
        
//        NOTIFICATION
        $sql = "SELECT notifications FROM users WHERE handle = '" . $folhandle . "'";
        $result = $conn->query($sql) or die($conn->error);
        while($row = $result->fetch_assoc()) {
            $not = json_decode($row["notifications"]);

            array_push($not, array('handle' => $_SESSION['handle'], 'type' => 'followed', 'pic' => $_SESSION['img'], 'name' => $_SESSION['name'], 'content' => 'followed you', 'twyyt' => '', 'text' => '', 'status' => 'unseen'));
        }
        $not = json_encode($not);

        $sql = "UPDATE users SET notifications='" . $not . "' WHERE handle='" . $folhandle . "'";
        $result = $conn->query($sql) or die($conn->error);  
//        NOTIFICATION

        $not = json_encode($not);

        $sql = "UPDATE users SET notifications='" . $not . "' WHERE handle='" . $usrhandle . "'";
        $result = $conn->query($sql) or die($conn->error); 
        
        $following = json_encode($following);
        
        $sql = "UPDATE users SET following='" . $following . "' WHERE handle= '" . $_GET['follower'] . "'";
        $result = $conn->query($sql) or die($conn->error);
        
        $conn->close();
    } else if ($type == "unfollow") {
        $conn = new mysqli($servername, $username, $password, $dbname);
        
        //remove follower from person following
        $sql = "SELECT followers FROM users WHERE handle = '" . $_GET['unfollowing'] . "'";
        $result = $conn->query($sql) or die($conn->error);
        while($row = $result->fetch_assoc()) {
            $followers = json_decode($row["followers"], true);
            
            $loc = array_search($_GET['unfollower'], array_column($followers, 'handle'));
        }
        
        echo $_GET['unfollowing'];
        
        if ($loc != FALSE || $loc == 0) {
            array_splice($followers, $loc, 1);
            
            $followers = json_encode($followers);
            $sql = "UPDATE users SET followers='" . $followers . "' WHERE handle='" . $_GET['unfollowing'] . "'";
            $result = $conn->query($sql) or die($conn->error);
        } else {
            die();
        }
        
        //remove person following from following
        $sql = "SELECT following FROM users WHERE handle = '" . $_GET['unfollower'] . "'";
        $result = $conn->query($sql) or die($conn->error);
        while($row = $result->fetch_assoc()) {
            $following = json_decode($row["following"], true);
            
            $loc = array_search($_GET['unfollowing'], array_column($following, 'handle'));
        }
        echo $loc;
        
        if ($loc != FALSE || $loc == 0) {
            array_splice($following, $loc, 1);
            
            $following = json_encode($following);
            $sql = "UPDATE users SET following='" . $following . "' WHERE handle='" . $_GET['unfollower'] . "'";
            $result = $conn->query($sql) or die($conn->error);
        } else {
            die();
        }
        
        $conn->close();
    } else if ($type == "profile") {
        $conn = new mysqli($servername, $username, $password, $dbname);
        
        $name = str_replace('"', '', $_POST['name']);
        $name = str_replace("'", "", $name);
        $name = str_replace("\n", "", $name);
        $name = str_replace("\r", "", $name);
        $name = str_replace("<", "", $name);
        
        
        $bio = str_replace('"', '\"', $_POST['bio']);
        $bio = str_replace("'", "\'", $bio);
        $bio = str_replace("<", "MWAHAHAHA", $bio);
        $bio = str_replace("\n", "<br>", $bio);
        $bio = str_replace("\r", "", $bio);
        
        
        
        //UPDATE USERS DATABASE
        $sql = "UPDATE users SET name='" . $name . "', bio='" . $bio . "' WHERE handle = '" . $_SESSION['handle'] . "'";
        $result = $conn->query($sql) or die($conn->error);
        
        //UPDATE TWYYTS DATABASE
        $sql = "UPDATE twyyts SET name='" . $name . "' WHERE handle='" . $_SESSION['handle'] . "'";
        $result = $conn->query($sql) or die($conn->error);
        $_SESSION["name"] = $_POST['name'];
        
        //replace images
        if (file_exists($_FILES['landing-input']['tmp_name']) || is_uploaded_file($_FILES['landing-input']['tmp_name'])) {            
            $target_file = "../res/landing/land-" . $_SESSION['handle'] . "." . pathinfo($_FILES["landing-input"]["name"], PATHINFO_EXTENSION);
            $base = "land-" . $_SESSION['handle'];
            $uploadOk = 1;
            $imageFileType = strtolower(pathinfo($target_file,PATHINFO_EXTENSION));
            // Check if image file is a actual image or fake image
            if(isset($_POST["submit"])) {
                $check = getimagesize($_FILES["landing-input"]["tmp_name"]);
                if($check !== false) {
                    $uploadOk = 1;
                } else {
                    $uploadOk = 0;
                }
            }
            
            if ($_FILES["landing-input"]["size"] > 40000000) {
                $uploadOk = 0;
            }
            
            if ($uploadOk == 0) {
                echo "twyyt has failed";
                // if everything is ok, try to upload file
            } else {
                if (move_uploaded_file($_FILES["landing-input"]["tmp_name"], $target_file)) {
//                    echo "[{\"msg\": \"twyyt was successful\", \"id\": \"" . $thecount . "\", \"image\": \"" . $thecount . "." . $imageFileType . "\"}]";

                    $sql = "UPDATE users SET landing='" . $base . "." . $imageFileType . "' WHERE handle='" . $_SESSION['handle'] . "'";
                    
                    $result = $conn->query($sql) or die($conn->error);
                    echo $result;
                } else {
                    echo "twyyt was unsuccessful";
                }
            }
        }
        
        if (file_exists($_FILES['pic-input']['tmp_name']) || is_uploaded_file($_FILES['pic-input']['tmp_name'])) {
            $sql = "SELECT id FROM users WHERE handle='" . $_SESSION['handle'] . "'";
            $result = $conn->query($sql) or die($conn->error);
            while($row = $result->fetch_assoc()) {
                $thecount = $row['id'];
            }
            
            $target_file = "../res/usr/" . $thecount . "." . pathinfo($_FILES["pic-input"]["name"], PATHINFO_EXTENSION);
            $uploadOk = 1;
            $imageFileType = strtolower(pathinfo($target_file,PATHINFO_EXTENSION));
            // Check if image file is a actual image or fake image
            if(isset($_POST["submit"])) {
                $check = getimagesize($_FILES["pic-input"]["tmp_name"]);
                if($check !== false) {
                    $uploadOk = 1;
                } else {
                    $uploadOk = 0;
                }
            }
            
            if ($_FILES["pic-input"]["size"] > 40000000) {
                $uploadOk = 0;
            }
            
            if ($uploadOk == 0) {
                echo "twyyt has failed";
                // if everything is ok, try to upload file
            } else {
                if (move_uploaded_file($_FILES["pic-input"]["tmp_name"], $target_file)) {
//                    echo "[{\"msg\": \"twyyt was successful\", \"id\": \"" . $thecount . "\", \"image\": \"" . $thecount . "." . $imageFileType . "\"}]";
                    $_SESSION["img"] = $thecount . "." . $imageFileType;
                    $sql = "UPDATE users SET img='" . $thecount . "." . $imageFileType . "' WHERE handle='" . $_SESSION['handle'] . "'";
                    $result = $conn->query($sql) or die($conn->error);
                    
                    $sql = "UPDATE twyyts SET pic='" . $_SESSION['img'] . "' WHERE handle='" . $_SESSION['handle'] . "'";
                    $result = $conn->query($sql) or die($conn->error);
                } else {
                    echo "twyyt was unsuccessful";
                }
            }
        }
        
    } else if ($type == "alter-profile") {
        $conn = new mysqli($servername, $username, $password, $dbname);
        
        $sql = "SELECT pass FROM users WHERE handle='" . $_SESSION['handle'] . "'";
        $result = $conn->query($sql) or die($conn->error);
        $arr = array();
        
        while($row = $result->fetch_assoc()) {
            $pass = $row["pass"];
        }
        
        if ($_GET['otherpass'] == $pass) {
            $sql = "UPDATE users SET pass='" . $_GET['pass'] . "' WHERE handle='" . $_SESSION['handle'] . "'";
            $result = $conn->query($sql) or die($conn->error);
        } else {
            echo "badaboosh";
        }
    }
?>


























