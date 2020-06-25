<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Item extends Model
{
    protected $fillable = ['brand', 'model_number', 'image', 'category', 'price'];
}
