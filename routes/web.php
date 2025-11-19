<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\InertiaController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\AssetController;
use App\Http\Controllers\TransactionController;
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
    [AssetController::class, 'AssetsPage']
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

Route::get('/register',
    [InertiaController::class,'RegisterPage']
);

Route::post('/register',
    [UserController::class,'Register']

);
Route::post('/login',
    [UserController::class,'Login']
);
Route::get('/logout',
    [UserController::class,'Logout']
);
Route::post('/account/profile',
    [UserController::class,'UpdateProfile']
);

Route::get('/account/assets',
    [AssetController::class,'OwnedAssetsPage']
);

Route::post('/account/assets/create',
    [AssetController::class,'create']
);
Route::get('/account/assets/create',
[InertiaController::class,'AssetCreatePage']
);
Route::get('/asset/{i}',
    [AssetController::class,'ViewAssetInformation']
);
Route::get('/cart', [TransactionController::class, 'GetOrOpenTransaction']);
Route::get('/payment/checkout-summary', [InertiaController::class, 'CheckoutSummaryPage']);
Route::get('/payment/checkout', [InertiaController::class, 'CheckoutPage']);
Route::get('/payment/bill', [InertiaController::class, 'BillPage']);
Route::get('/messages',[InertiaController::class,'MessagesPage']);
Route::get('/asset/{i}/purchase',[TransactionController::class,'UpdateTransaction']);

