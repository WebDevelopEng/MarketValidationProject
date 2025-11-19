<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Session;
use App\Models\Transaction;
use Inertia\Inertia;
use App\Models\TransactionItem;
class TransactionController extends Controller
{
    //

   public function GetOrOpenTransaction(Request $request)
    {
    $user = Session::get('account');

    if (!$user) {
        return redirect()->route('login');
    }
    $transaction = Transaction::with('items')->where('user_id', $user->id)->where('status', 'Pending')->first();

    if (!$transaction) {
        $transaction = Transaction::create([
            'user_id' => $user->id,
            'status' => 'Pending',
        ]);
    }
    return Inertia::render('OtherPages/payment/CartPage',['transaction'=>$transaction]);
}
    public function updateTransaction(Request $req,$assetid){
    $user = Session::get('account');
    if (!$user) {
        return response()->json(['error' => 'User not logged in'], 401);
    }
    $transaction = Transaction::where('user_id', $user->id)->where('status', 'Pending')->first();
    if (!$transaction) {
        $transaction = Transaction::create([
            'user_id' => $user->id,
            'status' => 'Pending',
        ]);
    }
    $item = TransactionItem::create([
        'transaction_id' => $transaction->id,
        'asset_id' => $assetid,
        'quantity' => 1
    ]);

    return redirect()->back();
}
}
