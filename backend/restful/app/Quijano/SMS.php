<?php


namespace App\Quijano;


class SMS
{
    protected $apiHost;
    protected $apiUsername;
    protected $apiPassword;
    protected $senderId;

    protected $recipientsArray;
    protected $message;

    protected $defaultSenderId;
    protected $allowedSenderId;



    /**
     * SMS constructor.
     * @param $apiUsername
     * @param $apiPassword
     * @param $apiHost
     */
    public function __construct($apiUsername, $apiPassword, $apiHost, $defaultSenderId, $allowedSenderId) {
        $this->apiUsername = $apiUsername;
        $this->apiPassword = $apiPassword;

        $this->apiHost = $apiHost;
        $this->defaultSenderId = $defaultSenderId;
        $this->allowedSenderId = $allowedSenderId;
        return $this;
    }

    public function sender($senderId = '') {
        $senderId = (isset($senderId) ?
            (!empty($senderId) ?
                (in_array($senderId, $this->allowedSenderId) ?
                    $senderId : $this->defaultSenderId)
                : $this->defaultSenderId)
            : $this->defaultSenderId);


        $this->senderId = rawurlencode($senderId);

        return $this;
    }

    public function to($recipient) {
        $recipient = (array) $recipient;
        if (isset($recipient[0])) {
            foreach ($recipient as $recipientLoop) {
                $this->recipientsArray[] = $recipientLoop;
            }
        } else {
            $this->recipientsArray[] = $recipient;
        }


        return $this;
    }

    public function message($message) {
        $this->message = $message;

        return $this;
    }

    public function send() {
        $recipient = $this->serializeRecipientNumbers();
        $message = $this->message;



        return $this->initsend();
    }

    protected function initsend() {
        $recipient = $this->serializeRecipientNumbers();
        $message = $this->message;

        $return_array = array();
        $check_balance = floatval($this->check_balance());

        /**
         * Must Check Balance First
         */
        if ($check_balance >= 1) {

            $call_url = "{$this->apiHost}/isms_send.php?un={$this->apiUsername}&pwd={$this->apiPassword}&dstno={$recipient}&msg={$this->message}&type=1&sendid={$this->senderId}&agreedterm=YES";


            $return_array["status"] = true;
            $return_array["message"] = "Sufficient Balance";
            $return_array["data"] = [
                "url" => $call_url,
                "response" => file_get_contents($call_url),
                "balance" => $check_balance
            ];
        } else {
            $return_array["status"] = false;
            $return_array["message"] = "Insufficient Balance";
            $return_array["data"] = [
                "balance" => $check_balance
            ];
        }

        return $return_array;
    }

    protected function check_balance() {
        $call = "{$this->apiHost}/isms_balance.php?un={$this->apiUsername}&pwd={$this->apiPassword}";
        $call = file_get_contents($call);

        return $call;
    }

    protected function serializeRecipientNumbers() {
        $recipientsArray = (array) $this->recipientsArray;
        if (isset($recipientsArray[0])) {
            $serializer = "";

            foreach ($recipientsArray As $recipient) {
                $serializer .= $recipient . ';';
            }

            $serializer = substr($serializer, 0, -1);

            return $serializer;
        } else {
            return false;
        }
    }
}