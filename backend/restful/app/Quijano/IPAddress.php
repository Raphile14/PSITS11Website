<?php
/**
 * @file IPAddress.php
 * @author jmquijano (https://github.com/jmquijano)
 */

namespace App\Quijano;


class IPAddress
{
    public function __construct()
    {
        return $this;
    }

    public function getIP() {
        if (isset($_SERVER["HTTP_CF_CONNECTING_IP"])) {
            $_SERVER['REMOTE_ADDR'] = $_SERVER["HTTP_CF_CONNECTING_IP"];
        }

        return $_SERVER['REMOTE_ADDR'];
    }

    public function getIPInfo() {
        $ip = $this->getIP();
        $ip = file_get_contents("http://ip-api.com/json/$ip?fields=status,as,asname,isp,country,continent,timezone,query");

        // Data
        $ipAddr = $this->getIP();
        $asNumber = "AS00000";
        $ispName = "Local";
        $country = "Local";
        $timezone = "Asia/Manila";

        if (json_decode($ip)) {
            $serialize = (array) json_decode($ip);

            if ($serialize['status'] === "success") {
                $asNumber = (isset($serialize['as']) ? explode(' ', $serialize['as'])[0] : $asNumber);
                $ispName = (isset($serialize['isp']) ? $serialize['isp'] : $ispName);
                $country = (isset($serialize['country']) ? $serialize['country'] : $country);
                $timezone = (isset($serialize['timezone']) ? $serialize['timezon'] : $timezone);
            }
        }

        return (array) [
            "ip_address" => $ipAddr,
            "as_number" => $asNumber,
            "isp_name" => $ispName,
            "country" => $country,
            "timezone" => $timezone
        ];
    }
}