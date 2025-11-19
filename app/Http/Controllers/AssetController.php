<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Asset;
use Illuminate\Support\Facades\Session;
use Inertia\Inertia;
use Illuminate\Support\Facades\Storage;
class AssetController extends Controller
{
    //
    function create(Request $request){
        $user=Session::get('account');
        $validated = $request->validate([
        'name'=> 'required|min:5',
        'description'=> 'required',
        'price'=> 'required|numeric',
        'files' => 'required|array|min:1',
        'files.*' => 'file|max:10240',
        'images' => 'required|array|min:1',
        'images.*' => 'image|mimes:jpg,jpeg,png,gif|max:5120',
        'tags' => 'required|min:5|max:255',
        'category'=>'required',
        'license'=>'required',
        'size'=>'required',
        'format'=>'required'
        
        ]);
        $asset = Asset::create([
            'name' => $validated['name'],
            'description' => $validated['description'],
            'price' => $validated['price'],
            'tags' => $validated['tags'],
            'category'=>$validated['category'],
            'user_id'=>$user->id,
            'license'=>$validated['license'],
            'size'=>$validated['size'],
            'format'=>$validated['format']

        ]);
        
        foreach($request->file('files') as $file){
            $filename = time().'_'.$file->getClientOriginalName();
            $path = $file->storeAs('asset/files', $filename,'public');

            $asset->files()->create([
                'filename' => $filename,
                'filepath' => $path,
            ]);
        }
        foreach($request->file('images') as $image){
            $imagename = time().'_'.$image->getClientOriginalName();
            $path = $image->storeAs('asset/images', $imagename,'public');

            $asset->images()->create([
                'filename' => $imagename,
                'filepath' => $path,
            ]);
        }
        return redirect('/account/assets');

    }
    function update(Request $request){
        $asset = Asset::findOrFail($id);
        $validated = $request->validate([
            'name'=> 'required|min:5',
            'description'=> 'required',
            'price'=> 'required|numeric',
            'files' => 'nullable|array',
            'files.*' => 'file|max:10240',
            'images' => 'nullable|array',
            'images.*' => 'image|mimes:jpg,jpeg,png,gif|max:5120',
            'tags' => 'required|min:5|max:255',
            'category'=>'required',
            'license'=>'required',
            'size'=>'required',
            'format'=>'required'
        ]);
        $asset->update([
            'name' => $validated['name'],
            'description' => $validated['description'],
            'price' => $validated['price'],
            'language' => $validated['language'],
            'category' => $validated['category'],
            'license'=>$validated['license'],
            'size'=>$validated['size'],
            'format'=>$validated['format'],
            'tags'=>$validate['tags']
        ]);
        if($request->hasFile('files')){
            foreach($request->file('files') as $file){
                $filename = time().'_'.$file->getClientOriginalName();
                $path = $file->storeAs('asset/files', $filename,'public');

                $asset->files()->create([
                    'filename' => $filename,
                    'filepath' => $path,
                ]);
            }
        }
        if($request->hasFile('images')){
            foreach($request->file('images') as $image){
                $imagename = time().'_'.$image->getClientOriginalName();
                $path = $image->storeAs('asset/images', $imagename ,'public');

                $asset->images()->create([
                    'filename' => $imagename,
                    'filepath' => $path,
                ]);
            }
        }   
        foreach($asset->files as $file){
            Storage::delete($file->filepath);
            $file->delete();
        }
        return redirect('/account/assets');
    }
    function DeleteAssets(){
        


    }
    function OwnedAssetsPage(){
        $user=Session::get('account');
        $allownedassets=Asset::with('images')->where('user_id',$user->id)->get();
        return Inertia::render('OtherPages/account/OwnedAssetsPage',['assets'=>$allownedassets]);
    }
    public function AssetsPage() {
    $assets = Asset::with('images')->get();
    return Inertia::render('OtherPages/AssetsPage', [
        'assets' => $assets
    ]);
}
}
