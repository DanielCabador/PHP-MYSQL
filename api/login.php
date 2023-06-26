
<?php
    include 'config.php';

    if ($_SERVER['REQUEST_METHOD'] === 'POST') {
        $data = json_decode(file_get_contents('php://input'), true);

        $email = $data['email'];
        $password = $data['password'];


        // Check if the user exists in the database
        $sql = "SELECT * FROM users WHERE email = '$email'";
        $result = $conn->query($sql);

        if ($result->num_rows === 1) {
            $row = $result->fetch_assoc();
            $hashedPassword = $row['password'];
            $user_id = $row['id'];
            $email = $row['email'];
            $firstname = $row['firstname'];
            $lastname = $row['lastname'];
            $birthdate = $row ['birthdate'];

            // Verify the password
            if (password_verify($password, $hashedPassword)) {
                $response = array(
                    'success' => true,
                    'message' => 'Login successful.',
                    'user_id' =>  $user_id,
                    'email' => $email,
                    'firstname' => $firstname,
                    'lastname' => $lastname,
                    'birthdate' => $birthdate,
                );
                echo json_encode($response);
            } else {
               
                $response = array(
                    'success' => false,
                    'message' => 'Incorrect email or password.'
                );
                echo json_encode($response);
            }
        } else {
            $response = array(
                'success' => false,
                'message' => 'Incorrect email or password.'
            );
            echo json_encode($response);
        }
    }
?>
