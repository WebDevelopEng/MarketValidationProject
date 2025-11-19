<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\InertiaController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\AssetController;
use App\Http\Controllers\TransactionController;
use App\Http\Controllers\ConversationController;
use Inertia\Inertia;
Route::get('/', 
    [InertiaController::class, 'ShowLandingPage']
);
Route::get('/login',
    [InertiaController::class,'ShowLoginPage']
)->name('login');

Route::post('/login',
    [InertiaController::class,'Login']
);
Route::get('/designers', 
    [InertiaController::class, 'DesignersPage']
);

Route::get('/assets', 
    [AssetController::class, 'AssetsPage']
);
Route::get('/asset/{i}',
    [AssetController::class,'ViewAssetInformation']
);

Route::get('/products', [InertiaController::class, 'ShowProductsPage']);
Route::get('/products/website-templates', [InertiaController::class, 'WebsiteTemplatesPage']);
Route::get('/products/custom-design', [InertiaController::class, 'CustomDesignPage']);
Route::get('/products/company-profile', [InertiaController::class, 'CompanyProfilePage']);
Route::get('/products/professional-design', [InertiaController::class, 'ProfessionalDesignPage']);


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
Route::get('/forgot-password',
    [InertiaController::class,'ForgotPasswordPage']
);

// everything here requires authentication
Route::middleware('CheckAuth')->group(function (){
    // account stuff
    Route::post('/account/profile',
        [UserController::class,'UpdateProfile']
    );
    Route::get('/account/profile', 
        [InertiaController::class, 'ProfilePage']
    );

    Route::get('/account/orders', 
        [InertiaController::class, 'OrdersPage']
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

    // Payment process
    Route::get('/cart', [TransactionController::class, 'GetOrOpenTransaction']);
    Route::get('/payment/checkout-summary', [InertiaController::class, 'CheckoutSummaryPage']);
    Route::get('/payment/checkout', [InertiaController::class, 'CheckoutPage']);
    Route::get('/payment/bill', [InertiaController::class, 'BillPage']);
    // Messaging/Chat
    Route::get('/messages',[InertiaController::class,'MessagesPage']);
    Route::get('/api/conversations', [ConversationController::class, 'GetConversations']);
    Route::post('/api/messages/send', [ConversationController::class, 'SendMessage']);
    Route::get('/api/conversations/{id}/messages', [ConversationController::class, 'GetConversationMessages']);
        // transaction API
        Route::get('/api/transaction', [TransactionController::class, 'GetTransaction']);
    Route::get('/asset/{i}/purchase',[TransactionController::class,'UpdateTransaction']);

    // Subfooter / static pages
    Route::get('/customer-service', function(){
        return Inertia::render('OtherPages/CustomerService');
    });

    Route::get('/our-team', function(){
        return Inertia::render('OtherPages/OurTeam');
    });

    Route::get('/about-us', function(){
        return Inertia::render('OtherPages/AboutUs');
    });
});

