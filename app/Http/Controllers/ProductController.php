<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class ProductController extends Controller
{
    //
    function create(Request $request){
        $validated=$req->validate([
            'AssetName'=>'required|min:5',
            'AssetDescription'=>'nullable',
            'AssetPrice'=>'required|unique:users,email',
            'AssetImages'=>'required|min:5|max:255',
            'AssetLanguage'=>'required|min:5|max:255',
            'AssetFile'=>'required|min:5|max:255'
        ]);
        


    }
    function update(Request $request){  
        


    }
}
