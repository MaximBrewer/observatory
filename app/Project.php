<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use App\Http\Resources\Folder as FolderResource;
use App\Http\Resources\Project as ProjectResource;
use Illuminate\Support\Facades\Auth;

class Project extends Model
{

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'title', 'user_id', 'site_id', 'higher_deviation', 'lower_deviation', 'frequency', 'company_id', 'active'
    ];
    //
    public function user()
    {
        return $this->belongsTo('App\User');
    }
    public function company()
    {
        return $this->belongsTo('App\Company');
    }
    public function site()
    {
        return $this->belongsTo('App\Site');
    }
    public function products()
    {
        return $this->hasMany('App\Product');
    }

    public function setLowerDeviationAttribute($value)
    {
        $this->attributes['lower_deviation'] = ceil((float) $value * 100);
    }

    public function getLowerDeviationAttribute($value)
    {
        return (float) $value / 100;
    }

    public function setHigherDeviationAttribute($value)
    {
        $this->attributes['higher_deviation'] = ceil((float) $value * 100);
    }

    public function getHigherDeviationAttribute($value)
    {
        return (float) $value / 100;
    }
    public static function returnProjects()
    {
        $projects = Project::where('visibility', 'public')
            ->where('company_id', Auth::user()->company_id)
            ->where(function ($query) {
                $query->whereRaw('`id` NOT IN (SELECT project_id from folder_project WHERE folder_id IN (SELECT id FROM folders WHERE company_id = ' . Auth::user()->company_id . '))');
            })
            ->get();


        return [
            'folders' => FolderResource::collection(Folder::where('company_id', Auth::user()->company_id)->get()),
            'projects' => ProjectResource::collection($projects)
        ];
    }
}
