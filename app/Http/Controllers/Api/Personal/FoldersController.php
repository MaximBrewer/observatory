<?php

namespace App\Http\Controllers\Api\Personal;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Http\Resources\Folder as FolderResource;
use App\Project;
use App\Http\Resources\Project as ProjectResource;
use App\Folder;
use Illuminate\Support\Facades\Auth;

class FoldersController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        //
        if ($request->post('title')) {
            Folder::create([
                'title' => $request->post('title'),
                'user_id' => Auth::user()->id
            ]);
        }
        return [
            'folders' => FolderResource::collection(Folder::where('user_id', Auth::user()->id)->get()),
            'projects' => ProjectResource::collection(Project::where('visibility', 'public')->where('company_id', Auth::user()->profile->company_id)->where(function ($query) {
                $query->whereRaw('`id` NOT IN (SELECT project_id from folder_project WHERE folder_id IN (SELECT id FROM folders WHERE user_id = ' . Auth::user()->id . '))');
            })->get())
        ];
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        //
        if ($request->post('title')) {
            $folder = Folder::find($id);
            if ($folder)
                $folder->update([
                    'title' => $request->post('title'),
                    'user_id' => Auth::user()->id
                ]);
        }
        return [
            'folders' => FolderResource::collection(Folder::where('user_id', Auth::user()->id)->get()),
            'projects' => ProjectResource::collection(Project::where('visibility', 'public')->where('company_id', Auth::user()->profile->company_id)->where(function ($query) {
                $query->whereRaw('`id` NOT IN (SELECT project_id from folder_project WHERE folder_id IN (SELECT id FROM folders WHERE user_id = ' . Auth::user()->id . '))');
            })->get())
        ];
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $model = Folder::findOrFail($id);
        $model->delete();
        return [
            'folders' => FolderResource::collection(Folder::where('user_id', Auth::user()->id)->get()),
            'projects' => ProjectResource::collection(Project::where('visibility', 'public')->where('company_id', Auth::user()->profile->company_id)->where(function ($query) {
                $query->whereRaw('`id` NOT IN (SELECT project_id from folder_project WHERE folder_id IN (SELECT id FROM folders WHERE user_id = ' . Auth::user()->id . '))');
            })->get())
        ];
    }
}
