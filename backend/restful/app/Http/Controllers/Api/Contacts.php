<?php
/**
 * @file Contacts.php
 * @author jmquijano (https://github.com/jmquijano)
 */

namespace App\Http\Controllers\Api;
use \App\Http\Controllers\Controller;
use App\Quijano\IPAddress;
use Illuminate\Http\Response;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\DB;
use ReCaptcha\ReCaptcha;


/**
 * Class Contacts
 * @package App\Http\Controllers\Api
 */
class Contacts extends Controller
{
    protected $contactModel;
    protected $captcha;

    function __construct() {
        $this->contactModel = new \App\Models\Contacts();
        $this->captcha = new ReCaptcha(env('gcaptcha_secret_key', 'null'));

    }

    protected function footprint() {
        $ip_address = new IPAddress();
        $device = get_browser();

        return (array) [
            "network" => $ip_address->getIPInfo(),
            "device" => $device
        ];

    }

    private function verifycaptcha($response) {
        $ipaddr = new IPAddress();
        $verify = $this->captcha->verify($response, $ipaddr->getIP());

        if ($verify->isSuccess()) {
            return (bool) true;
        } else {
            return (bool) false;
        }
    }

    private function saveContactFormToDatabase($request) {
        $this->contactModel->firstname = $request->json()->get('firstname');
        $this->contactModel->lastname = $request->json()->get('lastname');
        $this->contactModel->emailaddress = $request->json()->get('emailaddress');
        $this->contactModel->subject = $request->json()->get('subject');
        $this->contactModel->message = $request->json()->get('message');
        $this->contactModel->footprint = json_encode($this->footprint());
        $this->contactModel->save();
    }
    public function submitContactForm(Request $request) {
        $response = (object) [
            'status' => intval(400),
            'message' => 'There was an error submitting the data'
        ];

        $validator = Validator::make($request->json()->all(), \App\Models\Contacts::$rules);

        if (!$validator->fails()) {
            // $this->saveContactFormToDatabase($request);

            if ($this->verifycaptcha($request->json()->get('recaptcha'))) {
                $response->status = intval(200);
                $response->message = "Your message was successfully received. An email will be sent to your email address for confirmation.";
            } else {
                $response->status = intval(401);
                $response->message = "Invalid captcha";
            }


        } else {
            $response->message = $validator->errors()->all();
        }

        return response()->json($response, $response->status, []);
    }
}