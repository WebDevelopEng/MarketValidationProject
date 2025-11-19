<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class AssetFile extends Model {
    protected $fillable = ['asset_id', 'filename', 'filepath'];
}
