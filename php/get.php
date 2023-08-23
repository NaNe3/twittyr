<?php
    session_start();

    $type = $_GET["typ"];
    $servername = "localhost";
    $username = "u485947687_twyytyr";
    $password = "Wess2434$$";
    $dbname = "u485947687_twittyr";
    

    //AVERAGE RATING

    if ($type == "home") {
        $conn = new mysqli($servername, $username, $password, $dbname);
        $sql = "SELECT following FROM users WHERE handle = '" . $_SESSION['handle'] . "'";
        $result = $conn->query($sql) or die($conn->error);
        while($row = $result->fetch_assoc()) {
            $foll = json_decode($row["following"], true);
        }
        
        $sql = "SELECT * FROM twyyts WHERE handle ='" . $_SESSION['handle'] . "'";
        
        if (count($foll) > 0) {
            foreach($foll as $json){
                $sql .= " OR handle ='" . $json['handle'] . "'";
            }   
        }
        
        $sql .= " ORDER BY id DESC LIMIT 50 OFFSET " . $_GET['off'];
        
        
        $result = $conn->query($sql) or die($conn->error);
        $arr = array();
        
        while($row = $result->fetch_assoc()) {
            $arr[] = $row;
        }
        
        echo json_encode($arr);
        
        $conn->close();
    } else if ($type == "popup-user") {
        $conn = new mysqli($servername, $username, $password, $dbname);
        $sql = "SELECT name, handle, following, followers, bio, img FROM users WHERE handle = '" . $_GET['handle'] . "'";
        
        $result = $conn->query($sql) or die($conn->error);
        $arr = array();
        
        while($row = $result->fetch_assoc()) {
            $arr[] = $row;
        }
        
        echo json_encode($arr);
        
        $conn->close();
    } else if ($type == "single") {
        $conn = new mysqli($servername, $username, $password, $dbname);
        $sql = "SELECT * FROM twyyts WHERE id = '" . $_GET['twyyt'] . "'";
        
        $result = $conn->query($sql) or die($conn->error);
        $arr = array();
        
        while($row = $result->fetch_assoc()) {
            $arr[] = $row;
        }
        
        echo json_encode($arr);
        
        $conn->close();
    } else if ($type == "user") {
        $conn = new mysqli($servername, $username, $password, $dbname);
        $sql = "SELECT * FROM users WHERE handle = '" . $_GET['handle'] . "'";
        
        $result = $conn->query($sql) or die($conn->error);
        $arr = array();
        
        while($row = $result->fetch_assoc()) {
            $arr[] = $row;
        }
        
        echo json_encode($arr);
        
        $conn->close();
    } else if ($type == "connect") {
        $conn = new mysqli($servername, $username, $password, $dbname);
        $sql = "SELECT following FROM users WHERE handle = '" . $_SESSION['handle'] . "'";
        $result = $conn->query($sql) or die($conn->error);
        while($row = $result->fetch_assoc()) {
            $foll = json_decode($row["following"], true);
        }
        
        $sql = "SELECT id, name, handle, bio, following, followers, img FROM users WHERE handle <> '" . $_SESSION['handle'] . "'";
        
        if (count($foll) > 0) {
            foreach($foll as $json){
                $sql .= " AND handle <> '" . $json['handle'] . "'";
            }   
        }
        
        $sql .= " ORDER BY RAND() DESC LIMIT 3";
        
        $result = $conn->query($sql) or die($conn->error);
        $arr = array();
        
        while($row = $result->fetch_assoc()) {
            $arr[] = $row;
        }
        
        echo json_encode($arr);
        
        $conn->close();
    } else if ($type == "trending") {
        $conn = new mysqli($servername, $username, $password, $dbname);
        $sql = "SELECT * FROM trends ORDER BY twyyts DESC LIMIT 5";
        
        $result = $conn->query($sql) or die($conn->error);
        $arr = array();
        
        while($row = $result->fetch_assoc()) {
            $arr[] = $row;
        }
        
        echo json_encode($arr);
        
        $conn->close();
    } else if ($type == "profile-twyyts") {
        $conn = new mysqli($servername, $username, $password, $dbname);
        $sql = "SELECT * FROM twyyts WHERE handle = '" . $_GET['handle'] . "' ORDER BY id DESC LIMIT 50 OFFSET " . $_GET['off'];
        
        $result = $conn->query($sql) or die($conn->error);
        $arr = array();
        
        while($row = $result->fetch_assoc()) {
            $arr[] = $row;
        }
        
        echo json_encode($arr);
        
        $conn->close();
    } else if ($type == "profile-sources") {
        $conn = new mysqli($servername, $username, $password, $dbname);
        $sql = "SELECT sources FROM twyyts WHERE sources <> '' AND sources NOT LIKE '%.mp4%' AND handle='" . $_GET['handle'] . "' ORDER BY id DESC LIMIT 6";
        
        $result = $conn->query($sql) or die($conn->error);
        $arr = array();
        
        while($row = $result->fetch_assoc()) {
            $arr[] = $row;
        }
        
        echo json_encode($arr);
        
        $conn->close();
    } else if ($type == "profile-likes") {
        $conn = new mysqli($servername, $username, $password, $dbname);
        $sql = 'SELECT * FROM twyyts WHERE likes LIKE \'%{"handle":"' . $_GET['handle'] . '"}%\' ORDER BY id DESC LIMIT 50 OFFSET ' . $_GET['off'];
        
        $result = $conn->query($sql) or die($conn->error);
        $arr = array();
        
        while($row = $result->fetch_assoc()) {
            $arr[] = $row;
        }
        
        echo json_encode($arr);
        
        $conn->close();
    } else if ($type == "comments") {
        $conn = new mysqli($servername, $username, $password, $dbname);
        $sql = 'SELECT * FROM twyyts WHERE type="co" and sid LIKE \'%"' . $_GET['twyyt'] . '"%\'  ORDER BY id DESC LIMIT 10';
        
        $result = $conn->query($sql) or die($conn->error);
        $arr = array();
        
        while($row = $result->fetch_assoc()) {
            $arr[] = $row;
        }
        
        echo json_encode($arr);
        
        $conn->close();
    } else if ($type == "not") {
        $_SESSION['notifications'] = 0;
        
        $conn = new mysqli($servername, $username, $password, $dbname);
        $sql = 'SELECT notifications FROM users WHERE handle="' . $_GET['handle'] . '"';
        
        $result = $conn->query($sql) or die($conn->error);
        $arr = array();
        
        while($row = $result->fetch_assoc()) {
            $arr[] = $row;
        }
        
        $sql = "UPDATE users SET notifications=REPLACE(notifications, 'unseen', 'seen') WHERE handle='" . $_GET['handle'] . "'";
        $result = $conn->query($sql) or die($conn->error);
        
        echo json_encode($arr);
        
        $conn->close();
    } else if ($type == "search-bar") {
        $conn = new mysqli($servername, $username, $password, $dbname);
        $sql = 'SELECT img, id, name, handle FROM users WHERE handle LIKE "%' . $_GET['val'] . '%" OR name LIKE "%' . $_GET['val'] . '%" ORDER BY id DESC LIMIT 10';
        
        $result = $conn->query($sql) or die($conn->error);
        $arr = array();
        
        while($row = $result->fetch_assoc()) {
            $arr[] = $row;
        }
        
        echo json_encode($arr);
        
        $conn->close();
    } else if ($type == "search-twyyts") {
        $conn = new mysqli($servername, $username, $password, $dbname);
        
        if ($_GET['filter'] == "fol") {
            $sql = "SELECT following FROM users WHERE handle = '" . $_SESSION['handle'] . "'";
            $result = $conn->query($sql) or die($conn->error);
            while($row = $result->fetch_assoc()) {
                $foll = json_decode($row["following"], true);
            }

            $sql = "SELECT * FROM twyyts WHERE (handle ='" . $_SESSION['handle'] . "'";

            if (count($foll) > 0) {
                foreach($foll as $json){
                    $sql .= " OR handle ='" . $json['handle'] . "'";
                }   
            }

            $sql .= ") AND twyyt LIKE '%" . $_GET['q'] . "%' ORDER BY id DESC LIMIT 50 OFFSET " . $_GET['off'];   
        } else {
            $sql = 'SELECT * FROM twyyts WHERE twyyt LIKE "%' . $_GET['q'] . '%" ORDER BY id DESC LIMIT 50 OFFSET ' . $_GET['off'];   
        }
        
        $result = $conn->query($sql) or die($conn->error);
        $arr = array();
        
        while($row = $result->fetch_assoc()) {
            $arr[] = $row;
        }
        
        echo json_encode($arr);
        
        $conn->close();
    } else if ($type == "search-people") {
        $conn = new mysqli($servername, $username, $password, $dbname);
        
        if ($_GET['filter'] == "fol") {
            $sql = 'SELECT img, id, name, handle, followers FROM users WHERE (handle LIKE "%' . $_GET['q'] . '%" OR name LIKE "%' . $_GET['q'] . '%") AND followers LIKE "%' . $_SESSION['handle'] . '%" ORDER BY id DESC LIMIT 50';   
        } else {
            $sql = 'SELECT img, id, name, handle, followers FROM users WHERE handle LIKE "%' . $_GET['q'] . '%" OR name LIKE "%' . $_GET['q'] . '%" ORDER BY id DESC LIMIT 50';
        }
        
        $result = $conn->query($sql) or die($conn->error);
        $arr = array();
        
        while($row = $result->fetch_assoc()) {
            $arr[] = $row;
        }
        
        echo json_encode($arr);
        
        $conn->close();
    } else if ($type == "connect-page") {
        $conn = new mysqli($servername, $username, $password, $dbname);
        
        $sql = "SELECT img, id, name, handle, followers, bio FROM users WHERE followers NOT LIKE '%" . $_SESSION['handle'] . "%' AND handle != '" . $_SESSION['handle'] . "' ORDER BY CHAR_LENGTH(followers) DESC LIMIT 50 OFFSET " . $_GET['off'];
        $result = $conn->query($sql) or die($conn->error);
        $arr = array();
        
        while($row = $result->fetch_assoc()) {
            $arr[] = $row;
        }
        
        echo json_encode($arr);
        
        $conn->close();
    } else if ($type == "ispass") {
        $conn = new mysqli($servername, $username, $password, $dbname);
        
        $sql = "SELECT pass FROM users WHERE handle='" . $_GET['handle'] . "'";
        $result = $conn->query($sql) or die($conn->error);
        $arr = array();
        
        while($row = $result->fetch_assoc()) {
            $pass = $row["pass"];
        }
        
        if ($_GET['pass'] == $pass) {
            echo true;   
        } else {
            echo false;
        }
    } else if ($type == "recents") {
        $conn = new mysqli($servername, $username, $password, $dbname);
        $sql = "SELECT * FROM twyyts ORDER BY id DESC LIMIT 50 OFFSET " . $_GET['off'];
        
        $result = $conn->query($sql) or die($conn->error);
        $arr = array();
        
        while($row = $result->fetch_assoc()) {
            $arr[] = $row;
        }
        
        echo json_encode($arr);
        
        $conn->close();
    } else if ($type == "mentions") {
        $conn = new mysqli($servername, $username, $password, $dbname);
        $sql = 'SELECT * FROM twyyts WHERE twyyt LIKE \'%@' . $_SESSION['handle'] . '%\' ORDER BY id DESC LIMIT 50 OFFSET ' . $_GET['off'];
        
        $result = $conn->query($sql) or die($conn->error);
        $arr = array();
        
        while($row = $result->fetch_assoc()) {
            $arr[] = $row;
        }
        
        echo json_encode($arr);
        
        $conn->close();
    } else if ($type == "newhandle") {
        $conn = new mysqli($servername, $username, $password, $dbname);
        $sql = "SELECT COUNT(*) FROM users WHERE handle='" . $_GET['handle'] . "'";
        
        $result = $conn->query($sql) or die($conn->error);
        $arr = array();
        
        while($row = $result->fetch_assoc()) {
            echo $row['COUNT(*)'];
        }
        
        $conn->close();
    } else if ($type == "followers") {
        $conn = new mysqli($servername, $username, $password, $dbname);
        $sql = 'SELECT img, id, name, handle, followers, bio FROM users WHERE following LIKE \'%"' . $_GET['handle'] . '"%\' ORDER BY id DESC LIMIT 50 OFFSET ' . $_GET['off'];
        
        $result = $conn->query($sql) or die($conn->error);
        $arr = array();
        
        while($row = $result->fetch_assoc()) {
            $arr[] = $row;
        }
        
        echo json_encode($arr);
        
        $conn->close();
    } else if ($type == "following") {
        $conn = new mysqli($servername, $username, $password, $dbname);
        $sql = 'SELECT img, id, name, handle, followers, bio FROM users WHERE followers LIKE \'%"' . $_GET['handle'] . '"%\' ORDER BY id DESC LIMIT 50 OFFSET ' . $_GET['off'];
        
        $result = $conn->query($sql) or die($conn->error);
        $arr = array();
        
        while($row = $result->fetch_assoc()) {
            $arr[] = $row;
        }
        
        echo json_encode($arr);
        
        $conn->close();
    } else if($type == "relevence") {
        $conn = new mysqli($servername, $username, $password, $dbname);
        $sql = "SELECT img, name, handle, followers, bio FROM users WHERE handle='bagasoidjaiosjdoiajosidjasj'";
        
        $theboys = explode(",", $_GET['boys']);
        foreach($theboys as $boy){
            $sql .= " OR handle ='" . $boy . "'";
        }
        
        $sql .= ' ORDER BY id';
        
        $result = $conn->query($sql) or die($conn->error);
        $arr = array();
        
        while($row = $result->fetch_assoc()) {
            $arr[] = $row;
        }
        
        echo json_encode($arr);
        
        $conn->close();
    }
?>


























