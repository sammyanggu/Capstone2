<?php
// Badge model for handling badge data

class Badge {
    public $id;
    public $name;
    public $description;
    public $icon;
    public $tier;
    public $category;
    public $required_achievements;

    public function __construct($id, $name, $description, $icon, $tier = 'bronze', $category = 'general', $required_achievements = '') {
        $this->id = $id;
        $this->name = $name;
        $this->description = $description;
        $this->icon = $icon;
        $this->tier = $tier;
        $this->category = $category;
        $this->required_achievements = $required_achievements;
    }
}