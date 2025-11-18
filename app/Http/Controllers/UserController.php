<?php

namespace App\Http\Controllers;
use Inertia\Inertia;
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
            'firstname'=>'required|min:5',
            'lastname'=>'nullable',
              'email'=>'required|unique:users,email',
              'password'=>'required|min:5|max:255',
              'phonenumber'=>'required'
              
        ]);
        $user->name=trim($validated['firstname'].' '.$validated['lastname']);
        $user->email=$req->email;
        $user->password=Hash::make($req->password);
        $user->phonenumber=$req->phonenumber;
        $user->save();
        return redirect('/login');
    }
    function Login(Request $req){
        $validated=$req->validate([
            'email'=>'required|email',
            'password'=>'required'
        ]);
        $useremail=$req->email;
        $userpassword=$req->password;
        $user=User::where('email',$req->email)->first();
        if($user!==null){
        if(Hash::check($userpassword,$user->password)){
            Session::put('account',$user);
            return redirect('/');
        }
        else{
            return redirect('/login')->withErrors(['error'=>'Password does not match.']);
        }}
        else{
            return redirect('/login')->withErrors(['error'=>'User does not exist.']);
        }
    }

    function UpdateProfile(Request $req){
        $userid=Session::get('account')->id;
        $validated=$req->validate([
            'image'=>'nullable|image',
            'firstname'=>'required|min:5',
            'lastname'=>'nullable',
            'email'=>'required|unique:users,email,'.$userid.',id',
            'phonenumber'=>'required',
            'linkedin'=>'nullable',
            'description'=>'nullable'
        ]);;
        $user=User::find($userid);
        if($req->hasFile('image')){
            if($user->image!=null){
                Storage::disk('public')->delete('ProfileImages/'.$user->image);
            }
            $imagename=$user->id.time().'.'.$req->image->getClientOriginalExtension();
            $user->image=$imagename;
            $req->image->storeAs('ProfileImages',$imagename,'public');
        }
        $user->name=$req->firstname.' '.$req->lastname;
        $user->email=$req->email;
        $user->phonenumber=$req->phonenumber;
        $user->linkedin=$req->linkedin;
        $user->description=$req->description;
        $user->save();
        Session::put('account',$user);
        return redirect('/account/profile');
    }
    function logout(Request $req){
        Session::flush();
        return redirect('/');
    }
    
}
