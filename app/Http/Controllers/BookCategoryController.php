<?php

namespace App\Http\Controllers;


use App\Models\BookCategory;
use Illuminate\Http\Request;
use Inertia\Inertia;

class BookCategoryController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Inertia::render('BookCategories/Orders', [
            'orders'=>BookCategory::with('users','books')->get(),
            //'count'=>BookCategory::all()->where('approved','like',0)->count(),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        if($request->user_id !=null && $request->book_id != null){
            $old=BookCategory::all()->where('book_id','like',$request->book_id)->where('user_id','like',$request->user_id)->first();
            if($old!=null){
                $old->delete();
            }
        }
        $listing= new BookCategory();
        $listing->book_id=$request->book_id;
        $listing->user_id=$request->user_id;
        $listing->save();
        return to_route('category.index');
    }

    /**
     * Display the specified resource.
     */
    public function show(BookCategory $bookCategory)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(BookCategory $bookCategory)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, BookCategory $bookCategory)
    {
        $aproval=BookCategory::find($request->id);
        $aproval->save();
        return to_route('books_category.index');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        $order=BookCategory::find($id);
        $order->delete();
        return to_route('categories.index');
    }

    public function myBooks($id)
    {
        return Inertia::render('BookCategory/myBooks', [
            'favs'=>BookCategory::with('users','books')->where('user_id','like',$id)->get(),

        ]);
    }
}
