<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Session;
use Illuminate\Database\Query\Builder;
class ConversationController extends Controller
{
    //
    public function GetOrInitiateConvo(Request $request){
        $user=Session::get('account');
        //If conversation not found
        $validated = $request->validate([
           'RecipientID'=>'required',
           'message'=>'required'
        ]);
        $existing=Conversation::where(function(Builder $query)
        {$query->where('SenderID',$user->id)->
            where('RecipientID',$validated['RecipientID']);
        })->orWhere(function(Builder $query){
            $query->where('RecipientID',$user->id)->where('SenderID',$validate['RecipientID']);
        })
        ->get();
        if ($existing.isEmpty()){
        $conversation = Conversation::create([
           'RecipientID'=>$validate['RecipientID'],
            'SenderID'=>$user->id
        ]);
        }
        else{
           $conversation =$existing;
        }
        $msggingid=$conversation->id;
        Message::create([
            'content'=>'message',
            'sender'=>$user->id,
            'ConvoID'=>$conversation->id
        ]);
        return redirect('/messages');
        //if conversation found
    }
    public function LoadMessages(Request $request){
        $conversations=Conversation::with('messages')->get();
        return Inertia::render('OtherPages/MessagesPage',['conversations'->$conversations]);
    }
     public function LoadSpecificMessages(Request $request){
        $request->validate([
            'RecipientID'=>'required'
        ]);
        $existing=Conversation::where(function(Builder $query)
        {$query->where('SenderID',$user->id)->
            where('RecipientID',$validated['RecipientID']);
        })->orWhere(function(Builder $query){
            $query->where('RecipientID',$user->id)->where('SenderID',$validate['RecipientID']);
        })->first();
        if ($existing.isEmpty()){
            $convo=null;
        }
        else{
            $convo=$existing;
        }
     }   
    

}
