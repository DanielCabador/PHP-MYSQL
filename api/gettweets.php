<?php

    include "config.php";

    $sql = "SELECT tweets.id AS tweet_id, tweets.content, users.firstname, users.lastname, tweets.user_id
    FROM tweets
    JOIN users ON users.id = tweets.user_id
    ORDER BY tweets.date_tweeted DESC";

    $results = $conn->query($sql);

    if($results->num_rows > 0){

        $tweets = array();

        while($row = $results->fetch_assoc()){
            $todo = array(
                'tweet_id' => $row['tweet_id'],
                'content' => $row['content'],
                'user_id' => $row['user_id'],
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