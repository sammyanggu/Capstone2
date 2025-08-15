<?php
// Lesson model for handling lesson data

class Lesson {
    public $id;
    public $title;
    public $content;
    public $xp;

    public function __construct($id, $title, $content, $xp = 0) {
        $this->id = $id;
        $this->title = $title;
        $this->content = $content;
        $this->xp = $xp;
    }
}