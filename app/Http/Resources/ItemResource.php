<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class ItemResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
    public function toArray($request)
    {
        return [
            "id" => $this->id,
            "brand" => $this->brand,
            "model_number" => $this->model_number,
            "category" => $this->category,
            "price" => $this->price,
            "image" => $this->image,
            "frame_color" => $this->frame_color,
            "lens_color" => $this->lens_color,
            "frame_material" => $this->frame_material,
            "frame_design" => $this->frame_design,
            "lens_material" => $this->lens_material,
            "gender" => $this->gender,
            "updated_at" => $this->updated_at
        ];
    }
}
