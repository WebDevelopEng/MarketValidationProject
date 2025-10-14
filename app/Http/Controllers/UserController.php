<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Session;
class UserController extends Controller
{
    //
    function Register(Request $req){
        
        $user = new User();
        $validated=$req->validate([
            

        ]);
        $user->name=$req->name;
        $user->email=$req->email;
        $user->password=Hash::make($req->password);
        $user->phonenumber=$req->phonenumber;
        $user->linkedin=$req->linkedin;
        $user->save();

    }
    function Login(Request $req){
        $validated=$req->validate([
            'email'=>'required|email',
            'password'=>'required'
        ]);
        $useremail=$req->email;
        $userpassword=$req->password;
        $user=User::where('email',$req->email)->first();
        if(Hash::check($user->password,$userpassword)){
            Session::set('ID',$user->id);
            return redirect('/');
        }
        else{
            return redirect('/login')->withErrors(['error'=>'Password does not match.']);
        }
    }

    function Change_Profile_Image(Request $req){
        $validated=$req->validate([
            'image'=>'required|image'
        ]);
        $userid=Session::get('ID');
        $user=User::find($userid);
        $user->$image=$req->image;
        Storage::storeAs($req->image,"Storage");
        $user->save();
    }

}
