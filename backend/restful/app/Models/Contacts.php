<?php
/**
 * @file Contacts.php
 * @author jmquijano (https://github.com/jmquijano)
 */

namespace App\Models;

use App\Quijano\IPAddress;
use Illuminate\Database\Eloquent\Model;

/**
 * Class Contacts
 * @package App\Models
 */
class Contacts extends Model
{
    protected $table = "tbl_cmscontent_inquiries";
    protected $primaryKey = "id";
    protected $fillable = ["firstname", "lastname", "emailaddress", "subject", "message", "footprint"];
    const CREATED_AT = "created_at";
    const UPDATED_AT = "updated_at";

    public static $rules = [
        'firstname' => 'required',
        'lastname' => 'required',
        'emailaddress' => 'required|email',
        'subject' => 'required',
        'message' => 'required',
        'recaptcha' => 'required'
    ];
}