<?php

use App\Http\Controllers\BookCategoryController;
use App\Http\Controllers\BookController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return Inertia::render('First');
});

Route::get('/dashboard', function () {
    return Inertia::render('First',
        [
        ]);
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

Route::post('/categories/filter',[CategoryController::class,"filter"])->name("categories.filter");
Route::post('/books/filter',[CategoryController::class,"filterBooks"])->name("books.filter");

Route::get('/categories/order/{field}/{dir}',[CategoryController::class,"order"])->name("categories.order");


Route::resource('categories', CategoryController::class);
Route::resource('books', BookController::class);

Route::get('books/create/{id}', [BookController::class,'create'])->name('books.create');

Route::resource('books_category', BookCategoryController::class);

Route::get('books_category/store/{user_id}/{book_id}',[BookCategoryController::class,'store'])->name('books_category.store');
Route::get('book_category/myBooks/{user_id}',[BookCategoryController::class,'myBooks'])->name('category_book.myBooks');


require __DIR__.'/auth.php';
