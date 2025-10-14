<?php

namespace App\Http\Controllers;
use Inertia\Inertia;
use Illuminate\Http\Request;

class InertiaController extends Controller
{
    public function ShowLandingPage(){
        return Inertia::render('LandingPage');
    }
    public function ShowLoginPage(){
        return Inertia::render('OtherPages/LoginPage');
    }
}
