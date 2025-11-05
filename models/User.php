<?php

class User {
    public $id;
    public $name;
    public $email;
    public $password;
    public $points;
    public $created_at;

    public function __construct($id, $name, $email, $points = 0, $created_at = null) {
        $this->id = $id;
        $this->name = $name;
        $this->email = $email;
        $this->points = $points;
        $this->created_at = $created_at ?? date('Y-m-d H:i:s');
    }

    public function toArray() {
        return [
            'id' => $this->id,
            'name' => $this->name,
            'email' => $this->email,
            'points' => $this->points,
            'created_at' => $this->created_at
        ];
    }
}