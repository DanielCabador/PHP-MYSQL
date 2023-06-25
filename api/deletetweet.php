<?php

include "config.php";

// Check if the request is a POST request
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $data = json_decode(file_get_contents('php://input'), true);

    $id = $data['id'];
    $user_id = $data['user_id'];

    //Check if the tweet belongs to the user
    $sql = "SELECT * FROM tweets WHERE id = '$id' AND user_id = '$user_id'";
    $result = $conn->query($sql);
    
    if ($result->num_rows === 1){

        // The tweet belongs to the user, proceed with deletion
        $sql = "DELETE FROM tweets WHERE id = '$id' AND user_id = '$user_id'";

        if ($conn->query($sql)) {
            $response = array(
                'success' => true,
                'message' => 'Tweet deleted successfully'
            );
            
        } else {
            $response = array(
                'success' => false,
                'message' => 'Failed to delete tweet.'
            );
        
        }

        echo json_encode($response);
    }else{
        // The tweet does not belong to the user
        $response = array(
            'success' => false,
            'message' => 'You do not have permission to delete this tweet.'
        );
    }
    echo json_encode($response);
} else {
    echo "Invalid request! Only POST requests are allowed.";
}
?>