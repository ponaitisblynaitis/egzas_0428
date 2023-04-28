<?php

namespace App\Http\Controllers;

use App\Models\Book;
use Illuminate\Http\Request;

class BookController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create($id)
    {
        return inertia("Books/Create",[
            'category_id'=>$id,
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate(
            [
                'name'=>'required|min:3',
                'isbn'=>'required|min:3',
                'pages'=>'required|min:3',
                'summary'=>'required|min:3',

            ]);
        $book= new Book();
        $book->name=$request->name;
        $book->isbn=$request->isbn;
        $book->pages=$request->pages;
        $book->summary=$request->summary;
        $book->category_id=$request->category_id;

        if ($request->file("photo")!=null){
            $request->file("photo")->store("/public/books");
            $book->photo=$request->file("photo")->hashName();
        }

        $book->save();

        return to_route('categories.show',$request->category_id);
    }

    /**
     * Display the specified resource.
     */
    public function show(Book $book)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Book $book)
    {
        return inertia("Books/Edit",[
            'book'=>$book,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request)
    {
        $book= new Book();
        $book->name=$request->name;
        $book->isbn=$request->isbn;
        $book->pages=$request->pages;
        $book->summary=$request->summary;
        $book->category_id=$request->category_id;
        if ($request->file("photo")!=null){
            if ($book->photo!=null){
                unlink(storage_path()."/app/public/books/".$book->photo);
            }
            $request->file("photo")->store("/public/books");
            $book->photo=$request->file("photo")->hashName();
        }
        $book->save();

        return to_route('categories.show',$request->category_id);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Book $book)
    {
        $book->delete();
        return redirect()->back();
    }
}
