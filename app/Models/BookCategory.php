<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class BookCategory extends Model
{
    use HasFactory;
    public function users(){
        return $this->hasMany(User::class,'id','user_id');
    }

    public function books(){
        return $this->hasMany(Book::class,'id','book_id');
    }
}
