<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Http\Controllers\General\UserController;
use App\Http\Controllers\General\PlanetController;

class APIController extends Controller {
	public $userController;
	public $planetController;

	public function __construct() {
		$this->userController = new UserController;
		$this->planetController = new PlanetController;
	}

	# Users
	public function createUser(Request $request) {
		$response = $this->userController->createUser($request->all());
		if($response['success']) {
			$response = $this->planetController->assignPlanet($response);
		}
		return response()->json($response);
	}

	public function authUser(Request $request) {
		$response = $this->userController->authUser($request->all());
		return response()->json($response);
	}

	public function getUserById(Request $request) {
		$user = $this->userController->getUserById($request->input('id'));
		return response()->json($user);
	}

	public function getUserByEmailAddress(Request $request) {
		$user = $this->userController->getUserByEmailAddress($request->input('email_address'));
		return response()->json($user);
	}

	public function getUserPlanets(Request $request) {
		$response = $this->planetController->getUserPlanets($request->input('user_id'));
		return response()->json($response);
	}
}
