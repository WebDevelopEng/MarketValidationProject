<?php

namespace App\Http\Controllers;
use Inertia\Inertia;
use Illuminate\Http\Request;
use App\Http\Controllers\AssetController;
class InertiaController extends Controller
{
    public function ShowLandingPage(){
        return Inertia::render('LandingPage');
    }
    public function ShowLoginPage(){
        return Inertia::render('OtherPages/LoginPage');
    }
    public function ShowProductsPage(){
        return Inertia::render('OtherPages/ProductsSearchPage');
    }
    public function DesignersPage(){
        return Inertia::render('OtherPages/DesignersPage');
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
    public function RegisterPage(){
        return Inertia::render('RegisterPage');
    }
    public function ForgotPasswordPage(){
        return Inertia::render('OtherPages/ForgotPasswordPage');
    }

    public function AssetCreatePage(){

        return Inertia::render('CreateAssetsPage');

    }
    public function CartPage(){
        return Inertia::render('OtherPages/payment/CartPage');
    }
    public function CheckoutPage(){
        return Inertia::render('OtherPages/payment/CheckoutPage');
    }
    public function BillPage(){
        return Inertia::render('OtherPages/payment/BillPage');
    }
     public function CheckoutSummaryPage(){
        return Inertia::render('OtherPages/payment/CheckoutSummaryPage');
    }
    public function MessagesPage(){
        return Inertia::render('OtherPages/MessagesPage');
    }
}
