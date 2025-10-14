<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\InertiaController;

Route::get('/', 
    [InertiaController::class, 'ShowLandingPage']
);
Route::get('/login',
[InertiaController::class,'ShowLoginPage']
);

Route::post('/login',
[InertiaController::class,'Login']

);