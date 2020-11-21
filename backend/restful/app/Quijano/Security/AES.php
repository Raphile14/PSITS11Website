<?php


namespace App\Quijano\Security;


class AES
{
    protected $encryption_key;
    protected $encrypted_value;
    protected $decrypted_value;



    public function key($key) {
        $this->encryption_key = $key;

        return $this;
    }

    public function encrypt($value) {
        $aes = new \PhpAes\Aes($this->encryption_key, 'CBC', substr(strrev($this->encryption_key), 0, 16));
        $this->encrypted_value = $aes->encrypt($value);

        return $this;
    }

    public function decrypt($value) {
        $value = base64_decode($value);
        $aes = new \PhpAes\Aes($this->encryption_key, 'CBC', substr(strrev($this->encryption_key), 0, 16));
        $this->decrypted_value = $aes->decrypt($value);

        return $this;
    }

    public function GetEncryptedData() {
        if (!empty($this->encrypted_value)) {
            return base64_encode($this->encrypted_value);
        } else {
            return false;
        }
    }

    public function GetDecryptedData() {
        if (!empty($this->decrypted_value)) {
            return $this->decrypted_value;
        } else {
            return false;
        }
    }

}