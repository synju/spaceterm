<?php

namespace App\Http\Controllers\General;

use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

class UserController extends Controller {
	public $generalController;

	public function __construct() {
		$this->generalController = new GeneralController();
	}

	public function createUser($data) {
		$response = ['success' => false];

		try {
			// Check if user exists
			$result = $this->getUserByEmailAddress($data['email_address']);
			if($result['success'] !== true) {
				// Validate password
				if($this->generalController->validatePassword($data['password'])) {
					// Encrypt Password
					$data['password'] = bcrypt($data['password']);

					// Insert User
					$sql = "INSERT INTO `users` (
										`username`,
										`email_address`,
										`password`
									) VALUES (
										?,
										?,
										?
									)";
					DB::insert($sql, [$data['username'], $data['email_address'], $data['password']]);

					// Get the last inserted ID
					$insertId = DB::getPdo()->lastInsertId();

					$response['success'] = true;
					$response['user_id'] = $insertId;
				}
				else {
					// Password invalid
					$response['error'] = "Password must contain 8 or more chars, at least 1 digit, 1 lowercase letter, 1 uppercase letter & 1 special character.";
				}
			}
			else {
				// Email address not available or other error.
				$response['error'] = "email address in use already";
			}
		}
		catch(\Exception $e) {
			$response['error'] = $e;
		}

		return $response;
	}

	public function authUser($data) {
		$response = ['success' => false];

		try {
			// Check if user exists
			$result = $this->getUserByEmailAddress($data['email_address']);
			if($result['success'] === true) {
				// Check if password is correct
				if(Hash::check($data['password'], $result['user']['password'])) {
					$response['success'] = true;
					$response['user'] = $result['user'];
				}
				else {
					$response['error'] = "email or password incorrect";
				}
			}
			else {
				$response['error'] = "email or password incorrect";
			}
		}
		catch(\Exception $e) {
			$response['error'] = $e;
		}

		return $response;
	}

	public function getUserById($id) {
		$response = ['success' => false];

		try {
			// Try get user
			$sql = "SELECT
								*
							FROM
								`users`
							WHERE
								`id` = ?
								AND
								`active` = 1";
			$user = DB::select($sql, [$id]);
			if(!empty($user)) {
				$response['success'] = true;
				$response['user'] = (array)$user[0];
			}
			else {
				$response['error'] = "user not found";
			}
		}
		catch(\Exception $e) {
			$response['error'] = $e;
		}

		return $response;
	}

	public function getUserByEmailAddress($email) {
		$response = ['success' => false];

		try {
			// Try get user
			$sql = "SELECT
								*
							FROM
								`users`
							WHERE
								`email_address` = ?
								AND
								`active` = 1";
			$user = DB::select($sql, [$email]);
			if(!empty($user)) {
				$response['success'] = true;
				$response['user'] = (array)$user[0];
			}
			else {
				$response['error'] = "email address not found";
			}
		}
		catch(\Exception $e) {
			$response['error'] = $e;
		}

		return $response;
	}
}
