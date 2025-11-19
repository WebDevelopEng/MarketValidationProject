<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Conversation extends Model
{
    //
    // migrations use column name `ReceiverID` so make fillable match DB
    protected $fillable = ['ReceiverID', 'SenderID'];

    public function messages()
    {
        return $this->hasMany(Message::class, 'ConvoID');
    }
}
