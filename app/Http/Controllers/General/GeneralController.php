<?php

namespace App\Http\Controllers\General;

use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Validator;

class GeneralController extends Controller {
	public function validatePassword($password) {
		$validator = Validator::make(['password' => $password], [
			'password' => [
				'required',
				'string',
				'min:8', // Minimum length of 8 characters
				'regex:/[a-z]/', // Must contain at least one lowercase letter
				'regex:/[A-Z]/', // Must contain at least one uppercase letter
				'regex:/[0-9]/', // Must contain at least one digit
				'regex:/[@$!%*?&]/', // Must contain a special character
			],
		]);

		return !$validator->fails();
	}
}
