<?php
// Achievement model for handling achievement data

class Achievement {
    public $id;
    public $name;
    public $description;
    public $icon;
    public $points;
    public $category;
    public $progress_max;
    public $achievement_order;

    public function __construct($id, $name, $description, $icon, $points, $category = 'general', $progress_max = 1, $achievement_order = 0) {
        $this->id = $id;
        $this->name = $name;
        $this->description = $description;
        $this->icon = $icon;
        $this->points = $points;
        $this->category = $category;
        $this->progress_max = $progress_max;
        $this->achievement_order = $achievement_order;
    }
}