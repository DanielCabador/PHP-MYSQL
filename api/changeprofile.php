<?php

include 'config.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $data = json_decode(file_get_contents('php://input'), true);

    $email = $data['email'];
    $newName = $data['new_name'];
    $newEmail = $data['new_email'];
    // Add more fields as needed

    // Check if the user exists in the database
    $sql = "SELECT * FROM users WHERE email = '$email'";
    $result = $conn->query($sql);

    if ($result->num_rows === 1) {
        // Update the user's profile
        $updateSql = "UPDATE users SET name = '$newName', email = '$newEmail' WHERE email = '$email'";

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
