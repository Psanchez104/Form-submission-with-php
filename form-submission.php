<html>
    <head>
    <link rel="stylesheet" href="styles.css" />
    </head>
    <body>
    <?php 
    $name = $_REQUEST['name'];
    $email = $_REQUEST['email'];
    $username = $_REQUEST['username'];
    $password1 = $_REQUEST['password1'];
    $password2 = $_REQUEST['password2'];

    $formElements = array($name, $email, $username, $password1, $password2);
    $complete = false;

    function scanElements($inputArray) {
        
        for($i = 0; $i < count($inputArray); $i++){
            if(empty($inputArray[$i])) {
                echo "<p>There was a problem submitting the form, please go back and try again</p>";
                $complete = false;
                break;
            } else $complete = true;
        }
    }

    scanElements($formElements);
?>
    </body>
</html>

