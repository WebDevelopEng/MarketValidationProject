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
Route::get('/designers', 
    [InertiaController::class, 'DesignersPage']
);

Route::get('/assets', 
    [InertiaController::class, 'AssetsPage']
);
Route::get('/account/profile', 
    [InertiaController::class, 'ProfilePage']
);
Route::get('/account/orders', 
    [InertiaController::class, 'OrdersPage']
);

Route::get('/products', [InertiaController::class, 'ShowProductsPage']);
Route::get('/products/website-templates', [InertiaController::class, 'WebsiteTemplatesPage']);
Route::get('/products/custom-design', [InertiaController::class, 'CustomDesignPage']);
Route::get('/products/company-profile', [InertiaController::class, 'CompanyProfilePage']);
Route::get('/products/professional-design', [InertiaController::class, 'ProfessionalDesignPage']);

// Route::get('/products', 
//     function () {
//         return view('products');
//     }
// );