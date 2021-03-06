<?php

namespace App\Http\Controllers\Api\Personal;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Product;
use App\Project;
use App\Http\Resources\Product as ProductResource;
use App\Http\Resources\FullProduct as FullProductResource;
use Illuminate\Support\Facades\Storage;

class ProductsController extends Controller
{
    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct(Request $request)
    {
        // echo $request->project_id;
        // die;
        // $this->middleware('project');
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index($project_id)
    {
        return ['products' => ProductResource::collection(Project::find($project_id)->products)];
    }


    public function getLogs(){

    }
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function xls(Request $r, $project_id)
    {
        $project = Project::find($project_id);
        $uploadedFile = $r->file('file');

        $uploadedFile = $r->file('file');
        $filename = md5(time()) . $uploadedFile->getClientOriginalName();
        $destinationPath = 'uploads';
        $file = $uploadedFile->move($destinationPath, $filename);

        $spreadsheet = \PhpOffice\PhpSpreadsheet\IOFactory::load($file);
        $worksheet = $spreadsheet->getActiveSheet();

        $keysList = [
            'article',
            'title',
            'price',
            'url',
            'higher_deviation',
            'lower_deviation',
            'frequency'
        ];

        //Наименование	Цена	Ссылка	Отклонение цены +	Отклонение цены -	Частота обновления

        $start = 0;
        foreach ($worksheet->getRowIterator() as $row) {
            $cellIterator = $row->getCellIterator();
            $cellIterator->setIterateOnlyExistingCells(FALSE);
            $productArray = [];
            $kc = 0;
            foreach ($cellIterator as $cell) {
                if (!$start) break;
                $productArray[$kc] = $cell->getValue();
                $kc++;
            }
            if ($start)
                Product::create([
                    'project_id' => $project->id,
                    'article' => $productArray[0],
                    'title' => $productArray[1],
                    'price' => $productArray[2],
                    'url' => $productArray[3],
                    'higher_deviation' => $productArray[4] ? $productArray[4] : $project->deviation,
                    'lower_deviation' => $productArray[5] ? $productArray[5] : $project->deviation,
                    'frequency' => $productArray[6] ? $productArray[6] : $project->frequency,
                ]);
            $start++;
        }

        return ['products' => ProductResource::collection(Project::find($project_id)->products)];
    }


    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request, $project_id)
    {
        Product::create([
            'article' => $request->post('article'),
            'title' => $request->post('title'),
            'url' => $request->post('url'),
            'brand' => $request->post('brand'),
            'price' => $request->post('price'),
            'higher_deviation' => $request->post('higher_deviation'),
            'lower_deviation' => $request->post('lower_deviation'),
            'frequency' => $request->post('frequency'),
            'project_id' => $project_id,
        ]);

        return ['products' => ProductResource::collection(Project::find($project_id)->products)];
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($project_id, $id)
    {
        $model = Product::findOrFail($id);
        return ['product' => new FullProductResource($model)];
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $project_id, $id)
    {
        $model = Product::findOrFail($id);
        $model->update($request->all());
        return ['products' => ProductResource::collection(Project::find($project_id)->products)];
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($project_id, $id)
    {
        $model = Product::findOrFail($id);
        $model->delete();
        return ['products' => ProductResource::collection(Project::find($project_id)->products)];
    }
}
