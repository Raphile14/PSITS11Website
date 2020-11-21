<?php


namespace App\Quijano\RESTFul;

class Request
{
    public function parseJSON() {
        $json = file_get_contents('php://input');
        $data = json_decode($json);

        return $data;
    }

    public function Authorization($mode = "auto") {
        $headers = apache_request_headers();
        switch ($mode) {
            case "auto":
                $auth_token = (
                        isset($headers['Authorization'])
                            ?
                        (isset(explode(' ', $headers['Authorization'])[1]) ? explode(' ', $headers['Authorization'])[1] : false)
                            :
                        (isset($this->parseJSON()->access_token) ? $this->parseJSON()->access_token : false)
                );
                break;
            case "post":
                $auth_token = (isset($_POST['access_token']));
                break;
        }

        return $auth_token;

    }
}