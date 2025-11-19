<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Models\AssetImage;
use App\Models\AssetFile;
class Asset extends Model
{
    //
    protected $fillable = ['name', 'description', 'format', 'license','category','user_id','price','size','tags'];

    public function files() {
        return $this->hasMany(AssetFile::class);
    }

    public function images() {
        return $this->hasMany(AssetImage::class);
    }
}
