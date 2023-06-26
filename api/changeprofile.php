<?php

include 'config.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $data = json_decode(file_get_contents('php://input'), true);

    $user_id = $data['user_id'];
    $firstname = $data['firstname'];
    $lastname = $data['lastname'];
    $email = $data['email'];
    $birthdate = $data['birthdate'];

    // Check if the user exists in the database
    $sql = "SELECT * FROM users WHERE id = '$user_id'";
    $result = $conn->query($sql);

    if ($result->num_rows === 1) {
        // Update the user's profile
        $updateSql = "UPDATE users SET firstname = '$firstname', lastname = '$lastname', email = '$email', birthdate = '$birthdate' WHERE id = '$user_id'";

        if ($conn->query($updateSql)) {
            $response = array(
                'success' => true,
                'message' => 'Profile updated successfully.'
            );
            echo json_encode($response);
        } else {
            $response = array(
                'success' => false,
                'message' => 'Failed to update profile.'
            );
            echo json_encode($response);
        }
    } else {
        $response = array(
            'success' => false,
            'message' => 'User does not exist.'
        );
        echo json_encode($response);
    }
}

?>
