<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Category extends Model
{
    use HasFactory;
    protected $fillable = [
        'name',
        'name',
        'isbn',
        'pages',
        'summary',

    ];

    public function books(){
        return $this->hasMany(Book::class);
    }

    public function scopeFilter(Builder $query,$filter){
        if ($filter->name !=null){
            $query->where('name','like',"%$filter->name%");
        }
    }

    public function scopeOrder(Builder $query,$order){
        if ($order->field !=null){
            if ($order->dir !=null){
                $query->orderBy($order->field,$order->dir);
            }else{
                $order->orderBy($order->field);
            }

        }
    }
}
