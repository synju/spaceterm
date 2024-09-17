<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\APIController;

# Users
Route::post('/create_user', [APIController::class, 'createUser']);
Route::post('/auth_user', [APIController::class, 'authUser']);
Route::post('/get_user_by_id', [APIController::class, 'getUserById']);
Route::post('/get_user_by_email_address', [APIController::class, 'getUserByEmailAddress']);
Route::post('/get_user_planets', [APIController::class, 'getUserPlanets']);