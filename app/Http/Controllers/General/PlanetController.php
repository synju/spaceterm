<?php

namespace App\Http\Controllers\General;

use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\DB;

class PlanetController extends Controller {
	public $generalController;

	public function __construct() {
		$this->generalController = new GeneralController();
	}

	public function assignPlanet($data) {
		$response = ['success' => false];

		try {
			// Establish a Location
			$location_established = false;
			$location = null;
			while(!$location_established) {
				$location = $this->generateRandomLocation();
				$planet_request = $this->planetIsUntouched($location);
				if($planet_request['success']) {
					$location_established = true;
				}
			}

			// Create Planet
			if($location_established) {
				// Buildings & Resources
				$buildings = json_encode([]);
				$resources = json_encode([[1,10000]]);

				// Insert User
				$sql = "INSERT INTO `planets` (`location`,`user_id`,`buildings`,`resources`) VALUES (?,?,?,?)";
				DB::insert($sql, [$location, $data['user_id'], $buildings, $resources]);

				// Get the last inserted ID
				$insertId = DB::getPdo()->lastInsertId();

				$response['success'] = true;
				$response['user_id'] = $data['user_id'];
				$response['planet_id'] = $insertId;
			}
		}
		catch(\Exception $e) {
			$response['error'] = $e;
		}

		return $response;
	}

	public function planetIsUntouched($location) {
		$response = ['success' => false];

		try {
			// Try get user
			$sql = "SELECT * FROM `planets` WHERE `location` = ?";
			$planet = DB::select($sql, [$location]);
			if(empty($planet)) {
				$response['success'] = true;
			}
			else {
				$response['error'] = "planet not untouched";
			}
		}
		catch(\Exception $e) {
			$response['error'] = $e;
		}

		return $response;
	}

	public function generateRandomLocation() {
		$numbers = [];

		for($i = 0; $i < 3; $i++) {
			$numbers[] = rand(0, 99);  // Generate a random number between 0 and 99
		}

		return implode(',', $numbers);  // Join the numbers with a comma
	}

	public function getUserPlanets($user_id) {
		$response = ['success' => false];

		try {
			// Try get user
			$sql = "SELECT * FROM `planets` WHERE `user_id` = ?";
			$planets = DB::select($sql, [$user_id]);
			if(!empty($planets)) {
				$response['success'] = true;
				$response['planets'] = $planets;
			}
			else {
				$response['error'] = "no planets found for user.";
			}
		}
		catch(\Exception $e) {
			$response['error'] = $e;
		}

		return $response;
	}
}
