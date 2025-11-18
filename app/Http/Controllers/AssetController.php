<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Asset;
class AssetController extends Controller
{
    //
    function create(Request $request){
        $asset=new Asset();
        $validated = $req->validate([
        'name'=> 'required|min:5',
        'description'=> 'nullable',
        'price'=> 'required|numeric',
        'images' => 'required|min:5|max:255',
        'language' => 'required|min:5|max:255',
        'file'=> 'required|min:5|max:255'
        ]);
        $asset->name=$req->name;
        $asset->description=$req->description;
        $asset->price=$req->price;
        $asset->images= $req->images;
        $asset->language= $req->language;
    }
}
