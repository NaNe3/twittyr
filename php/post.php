<?php
    session_start();

    $mode = $_GET["typ"];
    $servername = "localhost";
    $username = "u485947687_twyytyr";
    $password = "Wess2434$$";
    $dbname = "u485947687_twittyr";

    if ($mode == "twyyt") {
        $conn = new mysqli($servername, $username, $password, $dbname);
        if ($conn->connect_error) {
            die("Connection failed: " . $conn->connect_error);
        }
        
        $datObj = getdate();
        $date = $datObj['month'] . " " . $datObj['mday'] . ", " . $datObj['year'];
        
        if ($_GET['re'] == -1) {
            $type = "normal";
            $sid = "[]";
        } else {
            $type = "re";
            $sql = "SELECT id, name, pic, handle, time, twyyt, sources FROM twyyts WHERE id=" . $_GET['re'];
            $result = $conn->query($sql) or die($conn->error);

            $arr = array();
            while($row = $result->fetch_assoc()) {
                $arr[] = $row;
            }
            $sid = json_encode($arr);

            $sql = "SELECT retwyyts, handle, twyyt FROM twyyts WHERE id = " . $_GET['re'];
            $result = $conn->query($sql) or die($conn->error);
            while($row = $result->fetch_assoc()) {
                $retwyyts = json_decode($row["retwyyts"]);
                $folhandle = $row['handle'];
                $content = $row['twyyt'];

                array_push($retwyyts, array('handle' => $_SESSION['handle']));
            }
            
    //        NOTIFICATION
            $sql = "SELECT notifications FROM users WHERE handle = '" . $folhandle . "'";
            $result = $conn->query($sql) or die($conn->error);
            while($row = $result->fetch_assoc()) {
                $not = json_decode($row["notifications"]);

                $twyyt = str_replace('"', '\"', $_GET['re']);
                $twyyt = str_replace("'", "\'", $twyyt);
                $twyyt = str_replace("\n", "<br>", $twyyt);
                $twyyt = str_replace("\r", "", $twyyt);
                
                array_push($not, array('handle' => $_SESSION['handle'], 'type' => 'retwyyted', 'pic' => $_SESSION['img'], 'name' => $_SESSION['name'], 'content' => 'retwyyted a twyyt of yours', 'twyyt' => $twyyt, 'text' => $content, 'status' => 'unseen'));
            }
            $not = json_encode($not);

            $sql = "UPDATE users SET notifications='" . $not . "' WHERE handle='" . $folhandle . "'";
            $result = $conn->query($sql) or die($conn->error);  
    //        NOTIFICATION

            $retwyyts = json_encode($retwyyts);

            $sql = "UPDATE twyyts SET retwyyts='" . $retwyyts . "' WHERE id=" . $_GET['re'];
            $result = $conn->query($sql) or die($conn->error);
        }
        
        if (isset($_GET['co'])) {
            $type = "co";
            $sql = "SELECT id, name, pic, handle, time, twyyt, sources FROM twyyts WHERE id=" . $_GET['co'];
            $result = $conn->query($sql) or die($conn->error);

            $arr = array();
            while($row = $result->fetch_assoc()) {
                $arr[] = $row;
            }
            $sid = json_encode($arr);

            $sql = "SELECT comments, handle, twyyt FROM twyyts WHERE id = " . $_GET['co'];
            $result = $conn->query($sql) or die($conn->error);
            while($row = $result->fetch_assoc()) {
                $comments = json_decode($row["comments"]);
                $folhandle = $row['handle'];
                $thetwyyt = $row['twyyt'];
                
                array_push($comments, array('handle' => $_SESSION['handle']));
            }
    //        NOTIFICATION

            if ($folhandle != $_SESSION['handle']) {
                $sql = "SELECT notifications FROM users WHERE handle = '" . $folhandle . "'";
                $result = $conn->query($sql) or die($conn->error);
                while($row = $result->fetch_assoc()) {
                    $not = json_decode($row["notifications"]);
                    
                    $twyyt = str_replace('"', '\"', $_GET['co']);
                    $twyyt = str_replace("'", "\'", $twyyt);
                    $twyyt = str_replace("\n", "<br>", $twyyt);
                    $twyyt = str_replace("\r", "", $twyyt);

                    array_push($not, array('handle' => $_SESSION['handle'], 'type' => 'commented', 'pic' => $_SESSION['img'], 'name' => $_SESSION['name'], 'content' => 'commented on your twyyt', 'twyyt' => $twyyt, 'text' => $thetwyyt, 'status' => 'unseen'));
                }
                $not = json_encode($not);

                $sql = "UPDATE users SET notifications='" . $not . "' WHERE handle='" . $folhandle . "'";
                $result = $conn->query($sql) or die($conn->error);
            }
    //        NOTIFICATION

            //TRENDING
//            $words = explode(" ", $_POST['hard-text']);
//            
//            $sql = "SELECT word FROM trending WHERE 1=1";
//            $result = $conn->query($sql) or die($conn->error);
//            
//            $arr = array();
//            while($row = $result->fetch_assoc()) {
//                $arr[] = $row;
//            }
//
//            valid = false;
//            $sql = "UPDATE trending SET ";
//            foreach($words as $item) {
//                if (array_search($item, $arr) != '') {
//                    if (valid == true) {
//                        $sql .= " AND " .     
//                    } else {
//                        $sql .=
//                        valid = true;   
//                    }
//                }
//            }
            
            //TRENDING
            
            $comments = json_encode($comments);

            $sql = "UPDATE twyyts SET comments='" . $comments . "' WHERE id=" . $_GET['co'];
            $result = $conn->query($sql) or die($conn->error);
        }
        
//        START TREND
        $wurds = explode(" ", $_POST['hard-text']);
        $trends = array();
        for ($i = 0; $i < count($wurds); $i++) {
            if (substr($wurds[$i], 0, 1) == "#" && strlen($wurds[$i]) > 1) {
                array_push($trends, $wurds[$i]);
            }
        }
        
        if (count($trends) > 0) {
            for ($i = 0; $i < count($trends); $i++) {
                $sql = "SELECT id FROM trends WHERE trend='" . $trends[$i] . "'";
                $result = $conn->query($sql) or die($conn->error);
                
                if ($result->num_rows > 0) {
                    $sql = "UPDATE trends SET twyyts=twyyts+1 WHERE trend='" . $trends[$i] . "'";
                } else {
                    $sql = "INSERT INTO trends (trend, twyyts, img) VALUES ('" . $trends[$i] . "', 1, '')";
                }
                    
                $result = $conn->query($sql) or die($conn->error);
            }
        }
        
//        END TREND
        $twyyt = str_replace('"', '\"', $_POST['hard-text']);
        $twyyt = str_replace("'", "\'", $twyyt);
        $twyyt = str_replace("<", "nice try", $twyyt);
        $twyyt = str_replace(">", "nice try", $twyyt);
        
        $twyyt = preg_replace("/(\r?\n){2,}/", "\n\n", $twyyt);
        $twyyt = str_replace("<br>", "", $twyyt);
        
        $twyyt = str_replace("\n", "<br>", $twyyt);
        $twyyt = str_replace("\r", "", $twyyt);
        
        
        $sql = "INSERT INTO twyyts (type, sid, name, handle, twyyt, time, date, sources, pic, likes, comments, retwyyts) VALUES ('" . $type . "', '" . $sid . "', '" . $_SESSION['name'] ."', '" . $_SESSION['handle'] . "', '" . $twyyt . "', " . time() . ", '" . $date . "', '', '" . $_SESSION['img'] . "', '[]', '[]', '[]')";
        $result = $conn->query($sql) or die($conn->error);
        
        $sql = "SELECT id FROM twyyts ORDER BY id DESC LIMIT 1";
        $result = $conn->query($sql) or die($conn->error);
        
        while($row = $result->fetch_assoc()) {
            $thecount = $row["id"];
        }
        
        $sql = "UPDATE users SET twyyts=twyyts+1 WHERE handle='" . $_SESSION['handle'] . "'";
        $result = $conn->query($sql) or die($conn->error);
        
        if(isset($_FILES['image'])) {
            $target_file = "../res/twyyt/" . $thecount . "." . pathinfo($_FILES["image"]["name"], PATHINFO_EXTENSION);
            
            $uploadOk = 1;
            $imageFileType = strtolower(pathinfo($target_file,PATHINFO_EXTENSION));
            // Check if image file is a actual image or fake image
            if(isset($_POST["submit"])) {
                $check = getimagesize($_FILES["image"]["tmp_name"]);
                if($check !== false) {
                    $uploadOk = 1;
                } else {
                    $uploadOk = 0;
                }
            }

            // Check if file already exists
//            while (1 == 1) {
//                if (file_exists($target_file)) {
//                    $target_file = substr_replace($target_file, "1", strlen($target_file) -strpos($target_file, ".")+1, 0);
//                } else {
//                    break;
//                }
//            }

            // Check file size
//            if ($_FILES["image"]["size"] > 40000000) {
//                $uploadOk = 0;
//            }

            // Allow certain file formats
//            if($imageFileType != "jpg" && $imageFileType != "png" && $imageFileType != "jpeg"
//            && $imageFileType != "gif" && $imageFileType != "mp4") {
//                $uploadOk = 0;
//            }

            // Check if $uploadOk is set to 0 by an error
            if ($uploadOk == 0) {
                echo "twyyt has failed";
                // if everything is ok, try to upload file
            } else {
                if (move_uploaded_file($_FILES["image"]["tmp_name"], $target_file)) {
                    echo "[{\"msg\": \"twyyt was successful\", \"id\": \"" . $thecount . "\", \"image\": \"" . $thecount . "." . $imageFileType . "\"}]";

                    $sql = "UPDATE twyyts SET sources='" . $thecount . "." . $imageFileType . "' WHERE id=" . $thecount;
                    
                    $result = $conn->query($sql) or die($conn->error);
                } else {
                    echo "[{\"msg\": \"twyyt was successful\", \"id\": \"" . $thecount . "\", \"image\": \"none\"}]";
                }
            }   
        } else {
            echo "[{\"msg\": \"twyyt was successful\", \"id\": \"" . $thecount . "\", \"image\": \"none\"}]";
        }
        
        $conn->close();
    }

?>