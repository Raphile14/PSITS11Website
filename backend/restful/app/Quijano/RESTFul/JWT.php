<?php


namespace App\Quijano\RESTFul;

class JWT
{
    protected $private_key;
    protected $jwt_token;
    protected $jwt_decode;

    public function __call($method, $args)
    {
        $method = strtolower($method);

        switch ($method) {
            case "set_private_key":
                call_user_func_array(array($this,'setprivatekey'), $args);
                break;
            case "sign":
                call_user_func_array(array($this,'sign'), $args);
                break;
            case "decode":
                call_user_func_array(array($this,'decodesignature'), $args);
                break;
        }

        return $this;
    }

    protected function setprivatekey($privatekey) {
        $this->private_key = $privatekey;

        return $this;
    }
    /**
     * @param $payload [array]
     */
    protected function sign($payload, $algo = "HS512") {
        if (isset($this->private_key)) {
            if (!empty($this->private_key)) {
                $_jwt = new \Firebase\JWT\JWT();
                $jwt = $_jwt::encode($payload, $this->private_key, $algo);

                $this->jwt_token = $jwt;
                return $this;
            } else {
                return "Private key is required to sign the JWT.";
            }
        } else {
            return "Private key is required to sign the JWT.";
        }

    }

    protected function decodesignature($jwt, $private_key, $algo = "HS512") {
        $_jwt = new \Firebase\JWT\JWT();

        try {
            $decode = $_jwt::decode($jwt, $private_key, array($algo));
        } catch (\Exception $e) {
            $decode = false;
        }

        $this->jwt_decode = $decode;

        return $this;
    }

    public function GetAccessToken() {
        if (!empty($this->jwt_token)) {
            return $this->jwt_token;
        } else {
            throw new \Exception("There's an error getting the access token");
        }
    }

    public function GetDecodeToken() {
        if (!empty($this->jwt_decode)) {
            return $this->jwt_decode;
        } else {
            return false;
        }
    }
}