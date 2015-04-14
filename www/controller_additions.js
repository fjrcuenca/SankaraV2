/*
 *
 *
 *
 * In:
 * app.config(function($stateProvider, $urlRouterProvider) {
 * $stateProvider
 *
 *
 *
 */
 
 	.state('search_by', {
		url: '/search_by',
		templateUrl: 'templates/search_by.html'
	})
	
	.state('add_screening_site_selection', {
		url: '/add_screening_site_selection',
		templateUrl: 'templates/add_screening_site_selection.html'
	})
	
	.state('add_camp_profile', {
		url: '/add_camp_profile',
		templateUrl: 'templates/add_camp_profile.html'
	})
	
	.state('add_anganwandi_profile', {
		url: '/add_anganwandi_profile',
		templateUrl: 'templates/add_anganwandi_profile.html'
	})
		
		
/*
 *
 *
 *
 * In:
 * app.controller('MainCtrl', function($scope, $state, $http, $ionicPopup) 
 *
 *
 *
 */
 
   	$scope.goSearchBy = function() {
        console.log('Go to Search By Page');
        $state.go('search_by');
  	}
	
	$scope.goToAddScreeningSiteSelection = function () {
	    console.log('Go to Selection Profile Page to add school, camp, or anganwandi');
        $state.go('add_screening_site_selection');
	}
	
	$scope.addCampProfile = function() {
		console.log('Add Camp Profile');
		$state.go('add_camp_profile');
	}
	
	$scope.addAnganwandiProfile = function() {
		console.log('Add Anganwandi Profile');
		$state.go('add_anganwandi_profile');
	}

	/*
	 *
	 * Insert Camp information into database.
	 * 	1. Post to db.php
	 * 	2. If successful:
	 * 		1. Reset Form
	 *		2. Display Information
	 *		3. Re-route to home page
	 *
	 */	
    $scope.campSubmit = function(data) {
       	$http.post('db.php?action=add_camp', 
        {
            'camp_name'     			: data.camp_name, 
            'screening_date'     		: data.screening_date, 
            'address' 					: data.address,
			'phone' 					: data.phone,
			'cosponsor' 				: data.cosponsor,
			'cosponsor_phone' 			: data.cosponsor_phone,
            'person_in_charge' 			: data.person_in_charge,
			'person_in_charge_phone' 	: data.person_in_charge_phone
        })
        .success(function (data, status, headers, config) {
			//TODO: Reset form
			//Attempt 1: $scope.reset_school_form(data);
			//Attempt 2: $scope.add_school.$setPristine();
			$state.go('tabs.home'); 
			//TODO: display data in pop up module and give options to go:
			//1. Search Camp
			//2. Go to home page
        })
        .error(function(data, status, headers, config){
			//TODO: if there is an error inserting, do something!
        });
    }

	/*
	 *
	 * Insert Anganwandi information into database.
	 * 	1. Post to db.php
	 * 	2. If successful:
	 * 		1. Reset Form
	 *		2. Display Information
	 *		3. Re-route to home page
	 *
	 */
    $scope.anganwandiSubmit = function(data) {
       	$http.post('db.php?action=add_anganwandi', 
        {
            'anganwandi_name'  			: data.anganwandi_name, 
            'screening_date'     		: data.screening_date, 
			'headmaster'    			: data.headmaster,
            'address' 					: data.address,
			'phone' 					: data.phone,
			'cosponsor' 				: data.cosponsor,
			'cosponsor_phone' 			: data.cosponsor_phone,
            'person_in_charge' 			: data.person_in_charge,
			'person_in_charge_phone' 	: data.person_in_charge_phone
        })
        .success(function (data, status, headers, config) {
			//TODO: Reset form
			//Attempt 1: $scope.reset_school_form(data);
			//Attempt 2: $scope.add_school.$setPristine();
			$state.go('tabs.home'); 
			//TODO: display data in pop up module and give options to go:
			//1. Search Anganwandi
			//2. Go to home page
        })
        .error(function(data, status, headers, config){
			//TODO: if there is an error inserting, do something!
        });
    }
	
	// Go back to add screening site profile selection 
	$scope.campCancel = function() {
		console.log('Cancel Camp Profile');
        $state.go('add_screening_site_selection');
	}

	// Go back to add screening site profile selection 
	$scope.anganwandiCancel = function() {
		console.log('Cancel Anganwandi Profile');
        $state.go('add_screening_site_selection');
	}