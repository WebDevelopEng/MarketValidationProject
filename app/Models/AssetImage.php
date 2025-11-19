<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class AssetImage extends Model {
    protected $fillable = ['asset_id', 'filename', 'filepath'];
}
