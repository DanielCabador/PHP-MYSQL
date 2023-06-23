<?php
   
    include 'config.php';

    if ($_SERVER['REQUEST_METHOD'] === 'POST') {
        $data = json_decode(file_get_contents('php://input'), true);

        $email = $data['email'];
        $oldPassword = $data['old_password'];
        $newPassword = $data['new_password'];

       

        // Check if the user exists in the database
        $sql = "SELECT * FROM users WHERE email = '$email'";
        $result = $conn->query($sql);

        if ($result->num_rows === 1) {
            $row = $result->fetch_assoc();
            $hashedPassword = $row['password'];

            // Verify the old password
            if (password_verify($oldPassword, $hashedPassword)) {
                // Update the password
                $newHashedPassword = password_hash($newPassword, PASSWORD_DEFAULT);
                $updateSql = "UPDATE users SET password = '$newHashedPassword' WHERE email = '$email'";

                if ($conn->query($updateSql)) {
                    $response = array(
                        'success' => true,
                        'message' => 'Password updated successfully.'
                    );
                    echo json_encode($response);
                } else {
                    $response = array(
                        'success' => false,
                        'message' => 'Failed to update password.'
                    );
                    echo json_encode($response);
                }
            } else {
                $response = array(
                    'success' => false,
                    'message' => 'Incorrect old password.'
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
