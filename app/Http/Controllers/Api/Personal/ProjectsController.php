<?php

namespace App\Http\Controllers\Api\Personal;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Project;
use App\Http\Resources\ProjectCollection;
use App\Http\Resources\Project as ProjectResource;
use Illuminate\Support\Facades\Auth;
use App\Http\Resources\Folder as FolderResource;
use App\Folder;
use App\Profile;

class ProjectsController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return ProjectResource::collection(Project::all());
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
        $project = Project::create([
            'title' => $request->post('title'),
            'site_id' => $request->post('site_id'),
            'higher_deviation' => $request->post('higher_deviation'),
            'lower_deviation' => $request->post('lower_deviation'),
            'frequency' => $request->post('frequency'),
            'user_id' => Auth::user()->id,
        ]);
        return new ProjectResource($project);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        return new ProjectResource(Project::findOrFail($id));
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
        $project = Project::findOrFail($id);
        $project->update($request->all());

        return new ProjectResource($project);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $project = Project::findOrFail($id);
        $project->delete();
        return $this->getProjects();
    }

    public function getProjects()
    {
        return [
            'folders' => FolderResource::collection(Folder::where('user_id', Auth::user()->id)->get()),
            'projects' => ProjectResource::collection(Project::where('visibility', 'public')->where('company_id', Auth::user()->profile->company_id)->where(function ($query) {
                $query->whereRaw('`id` NOT IN (SELECT project_id from folder_project WHERE folder_id IN (SELECT id FROM folders WHERE user_id = ' . Auth::user()->id . '))');
            })->get())
        ];
    }

    public function setFolder(Request $request)
    {
        $intto = (int) str_replace('folder-', '', $request->post('to'));
        $intfrom = (int) str_replace('folder-', '', $request->post('from'));
        $from = Folder::find($intfrom);
        $to = Folder::find($intto);
        $project = Project::find((int) str_replace('project-', '', $request->post('project')));
        if (
            $to &&
            $project &&
            Auth::user()->id == $to->user_id &&
            ($project->visibility == 'public' || $project->user_id == Auth::user()->id)
        ) {
            if ($from) $from->projects()->detach($project->id);
            $to->projects()->attach($project->id);
        }
        return [
            'folders' => FolderResource::collection(Folder::where('user_id', Auth::user()->id)->get()),
            'projects' => ProjectResource::collection(Project::where('visibility', 'public')->where('company_id', Auth::user()->profile->company_id)->where(function ($query) {
                $query->whereRaw('`id` NOT IN (SELECT project_id from folder_project WHERE folder_id IN (SELECT id FROM folders WHERE user_id = ' . Auth::user()->id . '))');
            })->get())
        ];
    }
}
