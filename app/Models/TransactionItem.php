<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class TransactionItem extends Model
{
    //
    protected $fillable = [
        'transaction_id',
        'asset_id',
        'quantity', // match column name in DB
    ];

    // Optional: define relationships
    public function transaction()
    {
        return $this->belongsTo(Transaction::class);
    }

    public function asset()
    {
        return $this->belongsTo(Asset::class);
    }
}
