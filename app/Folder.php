<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Auth;

class Folder extends Model
{
    //
    protected $fillable = [
        'title', 'user_id'
    ];

    public function projects()
    {
        return $this->belongsToMany('App\Project', 'folder_project');
    }
}
