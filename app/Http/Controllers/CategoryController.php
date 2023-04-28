<?php

namespace App\Http\Controllers;

use App\Models\Category;
use Illuminate\Http\Request;
use Inertia\Inertia;

class CategoryController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $emFilter=new \stdClass();
        $emFilter->name="";

        $filter=$request->session()->get("categories_filter",$emFilter);

        $emOrder=new \stdClass();
        $emOrder->field="";
        $emOrder->dir="";

        $order=$request->session()->get("categories_order",$emOrder);

        return Inertia::render('Categories/Index', [
            'categories'=>Category::filter($filter)->order($order)->with('books')->get(),
            'fil'=>$filter,
            'ord'=>$order
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return inertia("Categories/Create");
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate(
            [
                'name'=>'required|min:3'

            ],

        );
        $Category= new Category();
        $Category->create($request->all());

        return to_route('categories.index');
    }

    /**
     * Display the specified resource.
     */
    public function show(Category $category, Request $request)
    {
        $emFilter=new \stdClass();
        $emFilter->name="";

        $filter=$request->session()->get("book_filter",$emFilter);

        return Inertia::render('Categories/Show', [

            'category'=>Category::with('books')->where("id","like",$category->id)->first(),
            //'hotelies'=>$filter->name!=""?$category->books()->where('name', 'like', "%$filter->name%")->get():null,

            'fil'=>$filter
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Category $category)
    {
        return inertia("Categories/Edit",[
                'category'=>$category,

            ]
        );
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Category $category)
    {
        $category->fill($request->all());
        $category->save();
        return to_route('categories.index');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Category $category)
    {
        $category->delete();
        return to_route('categories.index');
    }

    public function filter(Request $request){
        $filter=new \stdClass();
        $filter->name=$request->name;
        $request->session()->put("categories_filter",$filter);
        to_route('categories.index');
    }

    public function filterBooks(Request $request){
        $filter=new \stdClass();
        $filter->name=$request->name;
        $request->session()->put("book_filter",$filter);
        to_route('categories.show',$request->category_id);
    }

    public function order($field,$dir, Request $request){
        $order=new \stdClass();
        $order->field=$field;
        $order->dir=$dir;
        $request->session()->put("book_filter",$order);
        to_route('categories.index');
    }
}
