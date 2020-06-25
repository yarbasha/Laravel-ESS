<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateItemsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('items', function (Blueprint $table) {
            $table->id();
            $table->string('brand');
            $table->string('model_number');
            $table->enum('category', ['Glasses', 'Sunglasses']);
            $table->double('price', 4, 2);
            $table->string('image');
            $table->string('frame_color')->nullable();
            $table->string('lens_color')->nullable();
            $table->enum('frame_material', ['Metal', 'Plastic'])->nullable();
            $table->enum('frame_design', ['Half Frame', 'Full Frame', 'Rimless'])->nullable();
            $table->enum('lens_material', ['Plastic', 'Glass'])->nullable();
            $table->enum('gender', ['Men', 'Women', 'Unisex'])->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('items');
    }
}
