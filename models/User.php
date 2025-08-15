<?php
// User model for handling user data

class User {
    public $id;
    public $username;
    public $email;
    public $xp;

    public function __construct($id, $username, $email, $xp = 0) {
        $this->id = $id;
        $this->username = $username;
        $this->email = $email;
        $this->xp = $xp;
    }
}