<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\ItemResource;
use Illuminate\Http\Request;
use App\Item;
use Validator;

class ItemsController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return ItemResource::collection(Item::all());
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $v = Validator::make($request->all(), [
            'brand'=> 'required',
            'model_number'=> 'required|unique:items',
            'category'=> 'required',
            'price'=> 'required',
            'image'=> 'required'
        ]);
        if ($v->fails()) {
            return response()->json([
                'error' => true,
                'errors' => $v->errors()
            ], 403);
        }
        $item = Item::create([
            'brand'=> $request->brand,
            'model_number'=> $request->model_number,
            'category'=> $request->category,
            'price'=> $request->price,
            'image'=> $request->image->store('images','public'),
        ]);
        $item->frame_color = $request->frame_color !='' ? $request->frame_color :null;
        $item->lens_color = $request->lens_color !='' ? $request->lens_color :null;
        $item->frame_material = $request->frame_material !='' ? $request->frame_material :null;
        $item->frame_design = $request->frame_design !='' ? $request->frame_design :null;
        $item->lens_material = $request->lens_material !='' ? $request->lens_material :null;
        $item->gender = $request->gender !='' ? $request->gender :null;
        $item->save();
        return new ItemResource($item);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show(Item $item)
    {
        return new ItemResource($item);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Item $item)
    {
        $v = Validator::make($request->all(), [
            'brand'=> 'required',
            'model_number'=> 'required|unique:items',
            'category'=> 'required',
            'price'=> 'required',
            'image'=> 'required'
        ]);
        if ($v->fails()) {
            return response()->json([
                'error' => true,
                'errors' => $v->errors()
            ], 403);
        }
        $item->brand = $request->brand;
        $item->model_number = $request->model_number;
        $item->category = $request->category;
        $item->price = $request->price;
        $item->image = $request->image->store('images','public');
        $item->frame_color = $request->frame_color !='' ? $request->frame_color :null;
        $item->lens_color = $request->lens_color !='' ? $request->lens_color :null;
        $item->frame_material = $request->frame_material !='' ? $request->frame_material :null;
        $item->frame_design = $request->frame_design !='' ? $request->frame_design :null;
        $item->lens_material = $request->lens_material !='' ? $request->lens_material :null;
        $item->gender = $request->gender !='' ? $request->gender :null;
        $item->save();
        return new ItemResource($item);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy(Item $item)
    {
        $item->delete();
        return new ItemResource($item);
    }
}
