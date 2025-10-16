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
    public function ShowProductsPage(){
        return Inertia::render('OtherPages/ProductsPage');
    }
    public function DesignersPage(){
        return Inertia::render('OtherPages/DesignersPage');
    }
    public function AssetsPage(){
        return Inertia::render('OtherPages/AssetsPage');
    }
    public function WebsiteTemplatesPage()
    {
        return Inertia::render('OtherPages/products/WebsiteTemplatesPage');
    }
    
    public function CustomDesignPage()
    {
        return Inertia::render('OtherPages/products/CustomDesignPage');
    }
    
    public function CompanyProfilePage()
    {
        return Inertia::render('OtherPages/products/CompanyProfilePage');
    }
    
    public function ProfessionalDesignPage()
    {
        return Inertia::render('OtherPages/products/ProfessionalDesignPage');
    }
    public function ProfilePage(){
        return Inertia::render('OtherPages/account/ProfilePage');
    }
    public function OrdersPage(){
        return Inertia::render('OtherPages/account/OrderPage');
    }
}
