<?php

    include "config.php";

    $sql = "SELECT * FROM tweets JOIN users ON users.id = tweets.user_id ORDER BY tweets.date_tweeted DESC";

    $results = $conn->query($sql);

    if($results->num_rows > 0){

        $tweets = array();

        while($row = $results->fetch_assoc()){
            $todo = array(
                'id' => $row['id'],
                'content' => $row['content'],
                'firstname' => $row['firstname'],
                'lastname' => $row['lastname'],
            );
            $tweets[] = $todo;
        }

        $json = json_encode($tweets);
        header('Content-Type: application/json');
        echo $json;

    }else{
        echo "No tweets found.";
    }

?>