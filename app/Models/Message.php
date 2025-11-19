<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Message extends Model
{
    //
    // include ConvoID so Message::create(...) will work with mass assignment
    protected $fillable = ['content', 'sender', 'ConvoID'];
}
