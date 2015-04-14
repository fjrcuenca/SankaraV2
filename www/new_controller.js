angular.module('SankaraEye', ['ionic'])

/**
 * Use root scope if we want a global variable.
 * But decided to refresh every time it's on the search page
 *
.run(function($rootScope, $http) {

		$http.get("db.php?action=get_screening_sites").success(function(data)
		{
			$rootScope.screening_sites_master = data;
		});
})
*/


/******** DEPRICATED **********
 * Factory for retrieving all school information
 */
.factory('ScreeningSiteService', function ($http) {

	var screening_sites = [];
    $http.get("db.php?action=get_screening_sites").success(function(data)
    { 
		screening_sites = data;    
    });	
	
	return {
		all: function () {
			return screening_sites;
		},
		get: function (name, kind) {
			var url = "db.php?action=get_screening_site&name=";
			url = url.concat(name);
			url = url.concat("&kind=");
			url = url.concat(kind);
			$http.get(url).success(function(data)
			{ 
				screening_site = data;    
			});	
			return screening_site;
		}
	};
})

/*************** DEPRICATED **************
 * Factory for retrieving all student information
 */
.factory('StudentService', function ($http) {

	var students = [];
    $http.get("db.php?action=get_students").success(function(data)
    { 
		students = data;    
    });	
	
	return {
		all: function () {
			return students;
		},
		get: function (site, name, kind) {
			var url = "db.php?action=get_students&site=";
			url = url.concat(site);
			url = url.concat("&name=");
			url = url.concat(name);
			url = url.concat("&kind=");
			url = url.concat(kind);
			$http.get(url).success(function(data)
			{ 
				student = data;    
			});	
			return student;
		}
	};
})

/*****
 *
 * CONFIGURATION FUNCTION:
 * 	Holds all the states in order to reroute from one state to another
 *
 */
.config(function($stateProvider, $urlRouterProvider) {

	$stateProvider
// First page that the user views. Language selection page
		.state('main', {
			url: '/main',
			controller:'LanguageCtrl',
			templateUrl: "templates/main.html"
		})
// After language selection, user must sign in
		.state('sign_in', {
			url: '/sign_in',
			controller:'SignInCtrl',
			templateUrl: "templates/sign_in.html"
    	})
// Create a new account
		.state('create_account', {
			url: '/create_account',
			controller:'CreateAccountCtrl',
			templateUrl: "templates/create_account.html"
		})	
// Side menu
		.state('sidemenu', {
			url: "/side",
			abstract: true,
			templateUrl: "templates/side_menu.html"
		})
// Home Page after the user is logged on
		.state('sidemenu.home', {
			url: "/home",
			views: {
				'menuContent' :{
					templateUrl: "templates/home.html"
				}
			}
		})
		
// Search screening site state and controller
		.state('sidemenu.search_screening_site', {
			url: "/search_screening_site",
			views: {
				'menuContent' :{
					templateUrl: "templates/search_screening_site.html",
					controller: "SearchScreeningSiteCtrl"
				}
			}
		})
		
// Search school state and controller
		.state('sidemenu.search_school', {
			url: "/search_school",
			views: {
				'menuContent' :{
					templateUrl: "templates/search_school.html",
					controller: "SearchSchoolCtrl"
				}
			}
		})
/***
 * Screening Site Profile template: PRACTICE!!!
 */
		.state('detail', {
			url: "/detail/:name:kind",
			controller:'ScreeningSiteCtrl',
			templateUrl: "templates/detail.html"
		})
		
// Add school profile state and controller 
		.state('sidemenu.add_school_profile', {
			url: "/add_school_profile",
			views: {
				'menuContent' :{
					templateUrl: "templates/add_school_profile.html",
					controller: "AddSchoolProfileCtrl"
				}
			}
		})
		
// Add camp profile state and controller 
		.state('sidemenu.add_camp_profile', {
			url: "/add_camp_profile",
			views: {
				'menuContent' :{
					templateUrl: "templates/add_camp_profile.html",
					controller: "AddCampProfileCtrl"
				}
			}
		})
		
// Add anganwadi profile state and controller 
		.state('sidemenu.add_anganwadi_profile', {
			url: "/add_anganwadi_profile",
			views: {
				'menuContent' :{
					templateUrl: "templates/add_anganwadi_profile.html",
					controller: "AddAnganwadiProfileCtrl"
				}
			}
		})
		
/** Error? Not a side menu content **/
// Search Student state and controller
		.state('sidemenu.search_student', {
			url: "/search_student",
			views: {
				'menuContent' :{
					templateUrl: "templates/search_student.html",
					controller: "SearchStudentCtrl"
				}
			}
		})
  
		//$urlRouterProvider.otherwise("/side/home");
		$urlRouterProvider.otherwise("main");
})

/************* TODO ****************
 * Language Controller.
 *	1. Open a text file
 *	2. Read in key and value pairs to output proper language to app
 */
.controller('LanguageCtrl', function($scope, $state) {

  	$scope.ENGLISH = function() {
		// DO SOMETHING
        console.log('English');
        $state.go('sign_in');
  	};

})

/*************** Check COMMENTS FROM V6 IN LINUX **************
 * Sign In Controller. Checks:
 * 	1. If the username or password field is empty
 *	2. If the username and password combination is invalid
 * 	3. Else, go to main page
 */
.controller('SignInCtrl', function($scope, $state, $http, $ionicPopup) {
	$scope.signIn = function(data) {
    	console.log('Sign In');
// BUG: When username and password are initially blank and click on sign in, error!
        if (!data.username || !data.password ) {
			var alertPopup = $ionicPopup.alert({
				title: '<center> <b> Please fill in missing fields </b> </center>',
                template: '<center> <b> Try Again </b> </center>'
			});
            alertPopup.then(function(res) {
				console.log('Try Login Again');
            });
		} else { 
			$http.post('db.php?action=sign_in', 
			{
				'username'     	: data.username,
				'password'		: data.password
			}) 
			.success(function (data, status, headers, config) {
				if (String(data).valueOf() == String("no").valueOf()) {
					var alertPopup = $ionicPopup.alert({
						title: '<center> <b>Invalid Username or Password </b> </center>',
						template: '<center> <b> Please Try Again </b> </center>'
					});
					alertPopup.then(function(res) {
						console.log('Try Login Again');
					});
				} else {
					console.log('data:', data);
					$state.go('sidemenu.home');
				}
			})
			.error(function(){
				var alertPopup = $ionicPopup.alert({
					title: '<center> <b>Invalid Username or Password </b> </center>',
					template: '<center> <b> Please Try Again </b> </center>'
				});
				alertPopup.then(function(res) {
					console.log('Try Sign In Again');
				});
			});
		}
  	}
	$scope.createAccount = function() {
		console.log('Create New Account');
        $state.go('create_account');
	}
	$scope.selectAnotherLanguage = function() {
		console.log('Select Another Language');
    	$state.go('main');
	}
})

/** TODO: if data.new_username is undefined, does not display popup **/
/*************** CREATE NEW ACCOUNT **************
 * Create Account Controller. Checks
 * 	1. Checks if username or password field is empty
 * 	2. Checks if both passwords entered are equivalent
 *	3. Else, add username and password to the database 
 */
.controller('CreateAccountCtrl', function($scope, $state, $http, $ionicPopup) {

	$scope.createNewAccount = function(data) {
		console.log('Create New Account');
		if (!data.new_username || !data.new_password || !data.new_password2 ) {
			var alertPopup = $ionicPopup.alert({
				title: '<center> <b> Please fill in missing fields </b> </center>',
				template: '<center> <b> Try Again </b> </center>'
			});
			alertPopup.then(function(res) {
				console.log('Try Login Again');
			});
		} else if (data.new_password != data.new_password2) {
			var alertPopup2 = $ionicPopup.alert({
				title: '<center> <b> Passwords are not the same </b> </center>',
				template: '<center> <b> Try Again </b> </center>'
			});
			alertPopup2.then(function(res) {
				console.log('Try Login Again');
			});
		} else {
			var confirmPopup = $ionicPopup.confirm({
				title: '<center> <b> Confirm username and password </b> </center>'
			});
			confirmPopup.then(function(res) {
				if(res) {
					console.log('Confirm');
					$http.post('db.php?action=exists',
					{
						'username'      : data.new_username,
						'password'      : data.new_password
					})
					.success(function (data, status, headers, config) {
						var alertPopup2 = $ionicPopup.alert({
							title: '<center> <b>' + data + '</b> </center>'
						});
						alertPopup2.then(function(res) {
						});
						$state.go('sign_in');
					})
					.error(function(data, status, headers, config){
					});
				} else {
					console.log('Go Back');
				}
			});
		}
	}
	
	$scope.goSignIn = function() {
		$state.go('sign_in');
	}
})

/**
 * Search screening site names and student names from the beginning
 * BUT
 * Maybe should be when the search page is opened?????
 */
.controller('MainCtrl', function($scope, $http, $timeout) {
/*
	get_screening_sites();
	get_students();

	function get_screening_sites() {
		$http.get("db.php?action=get_screening_sites").success(function(data)
		{
			$scope.screening_sites_master = data;
		});
	}

	function get_students() {
		$http.get("db.php?action=get_students").success(function(data)
		{
			$scope.students_master = data;
		});
	}
	
	$scope.doRefresh = function () {
		console.log("Refreshing");
		$timeout( function() {
			$http.get("db.php?action=get_screening_sites").success(function(data)
			{
				$scope.screening_sites_master = data;
			});
			$scope.$broadcast('scroll.refreshComplete');
		}, 2000);
	}
*/
})

/********** SearchScreeningSiteCtrl ***********
 *	Retrieve all the school/camp/anganwadinames,
  *	headmasters, and date of screenings
 */
.controller('SearchScreeningSiteCtrl', function($scope, $ionicHistory, ScreeningSiteService, $http, $ionicLoading) {

	// $scope.on is used to clear cache history!
	$scope.$on('$ionicView.afterLeave', function(){
		$ionicHistory.clearCache();
	});
	
	$scope.$on('$ionicView.beforeEnter', function(){
		//$ionicHistory.clearCache();
	});
	
	$scope.$on('$ionicView.beforeLeave', function(){
		$ionicHistory.clearCache();
	});
	
	$scope.$on('$ionicView.afterEnter', function(){
		$ionicHistory.clearCache();
	});

	$ionicLoading.show({
		template: '<i class="button-icon icon ion-loading-a"></i> <br> Loading Screening Sites',
		content: 'Loading Data',
	    animation: 'fade-in',
	    showBackdrop: false,
	    maxWidth: 200,
	    showDelay: 500
	});
	
	get_screening_sites();
	
	function get_screening_sites() {
		$http.get("db.php?action=get_screening_sites")
		.success(function(data)
		{
			$scope.screening_sites_master = data;
			$ionicLoading.hide();
		});
		
	}

	//Factory services don't work well. Does not display initially
	//$scope.screening_sites = ScreeningSiteService.all();
})

/********** SearchSchoolCtrl ***********
 *	Retrieve all the school names,
  *	headmasters, and date of screenings
 */
.controller('SearchSchoolCtrl', function($scope, $ionicHistory, ScreeningSiteService, $http, $ionicLoading) {

	// $scope.on is used to clear cache history!
	$scope.$on('$ionicView.afterLeave', function(){
		$ionicHistory.clearCache();
	});
	
	$scope.$on('$ionicView.beforeEnter', function(){
		//$ionicHistory.clearCache();
	});
	
	$scope.$on('$ionicView.beforeLeave', function(){
		$ionicHistory.clearCache();
	});
	
	$scope.$on('$ionicView.afterEnter', function(){
		$ionicHistory.clearCache();
	});

	$ionicLoading.show({
		template: '<i class="button-icon icon ion-loading-a"></i> <br> Loading Schools',
		content: 'Loading Data',
	    animation: 'fade-in',
	    showBackdrop: false,
	    maxWidth: 200,
	    showDelay: 500
	});
	
	get_schools();
	
	function get_schools() {
		$http.get("db.php?action=get_schools")
		.success(function(data)
		{
			$scope.school_master = data;
			$ionicLoading.hide();
		});
		
	}

	//Factory services don't work well. Does not display initially
	//$scope.screening_sites = ScreeningSiteService.all();
})


/** TODO: Create template for screening sites **/
/********** ScreeningSiteCtrl ***********
 * Gets selected screening site data from the database and displays
 * the correct html page
 */
.controller('ScreeningSiteCtrl', function($scope, $stateParams, ScreeningSiteService, $http, $ionicLoading) {

	$ionicLoading.show({
		template: '<i class="button-icon icon ion-loading-a"></i> <br> Loading ' + $stateParams.name + ' data' ,
		content: 'Loading Data',
	    animation: 'fade-in',
	    showBackdrop: false,
	    maxWidth: 200,
	    showDelay: 500
	});
	
	get_screening_site();

	function get_screening_site() {
		var url = "db.php?action=get_screening_site&site_name=";
		url += $stateParams.name;
		url += "&kind="
		url += $stateParams.kind;
		$http.get(url)
		.success(function(data)
		{
			console.log("success", data);
			$scope.screening_site = data;
			$ionicLoading.hide();
		})
		.error(function(data){
			console.log("hi");
		});
	}


	//$scope.screening_site = ScreeningSiteService.get($stateParams.name, $stateParams.kind);
	
})

/********** AddSchoolProfileCtrl ***********
 ** School_Submit: Adds new school information to the database
 *	1. Pop up to ask if information is correct
 * 	2. Insert into the database
 *	3. If successful, go to school's profile!! (TODO) 
 ** Schoo_Cancel: Reroutes back to home page!
 *	(TODO) Should reroute back to previously visited page!
 */
.controller('AddSchoolProfileCtrl', function($scope, $http, $state, $ionicPopup) {

	$scope.school_submit = function(data) {
		var confirmPopup = $ionicPopup.confirm({
            title: '<center> <b> Is the information correct? </b> </center>',
			template: '<b> School Name: </b>' + data.school_name,
		});
        confirmPopup.then(function(res) {
			if(res) {
				console.log('Confirm School Information');
				$http.post('db.php?action=add_school', 
				{
					'school_name'     			: data.school_name, 
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
// Find a way to reset the form!!! Check controller.js for attempts
					var alertPopup2 = $ionicPopup.alert({
						title: '<center> <b> Successfully Added! </b> </center>'
                    });
                    alertPopup2.then(function(res) {
                    });				
// TODO: GO TO SCHOOL'S PROFILE! 
					$state.go('sidemenu.home');
				})
				.error(function(data, status, headers, config){
					// Do Something
				});
			} else {
				console.log('Go Back');
			}
		});
	}
	
	$scope.school_cancel = function() {
		console.log('Go Back');
		$state.go('sidemenu.home');
	}
})

/********** AddCampProfileCtrl ***********
 ** Camp_Submit: Adds new camp information to the database
 *	1. Pop up to ask if information is correct
 * 	2. Insert into the database
 *	3. If successful, go to camp's profile!! (TODO) 
 ** Camp_Cancel: Reroutes back to home page!
 *	(TODO) Should reroute back to previously visited page!
 */
.controller('AddCampProfileCtrl', function($scope, $http, $state, $ionicPopup) {

	$scope.camp_submit = function(data) {
		var confirmPopup = $ionicPopup.confirm({
            title: '<center> <b> Is the information correct? </b> </center>',
			template: '<b> Camp Name: </b>' + data.camp_name,
		});
        confirmPopup.then(function(res) {
			if(res) {
				console.log('Confirm Camp Information');
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
// Find a way to reset the form!!! Check controller.js for attempts
					var alertPopup2 = $ionicPopup.alert({
						title: '<center> <b> Successfully Added! </b> </center>'
                    });
                    alertPopup2.then(function(res) {
                    });
// TODO: GO TO CAMP'S PROFILE! 
					$state.go('sidemenu.home');
				})
				.error(function(data, status, headers, config){
					// Do Something
				});
			} else {
				console.log('Go Back');
			}
		});
	}
	
	$scope.camp_cancel = function() {
		console.log('Go Back');
		$state.go('sidemenu.home');
	}
})

/********** AddAnganwadiProfileCtrl ***********
 ** Anganwadi_Submit: Adds new anganwadi information to the database
 *	1. Pop up to ask if information is correct
 * 	2. Insert into the database
 *	3. If successful, go to anganwadi's profile!! (TODO) 
 ** Anganwadi_Cancel: Reroutes back to home page!
 *	(TODO) Should reroute back to previously visited page!
 */
.controller('AddAnganwadiProfileCtrl', function($scope, $http, $state, $ionicPopup) {

	$scope.anganwadi_submit = function(data) {
		var confirmPopup = $ionicPopup.confirm({
            title: '<center> <b> Is the information correct? </b> </center>',
			template: '<b> Anganwadi Name: </b>' + data.anganwadi_name,
		});
        confirmPopup.then(function(res) {
			if(res) {
				console.log('Confirm Anganwadi Information');
				$http.post('db.php?action=add_anganwadi', 
				{
					'anganwadi_name'   			: data.anganwadi_name, 
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
// Find a way to reset the form!!! Check controller.js for attempts
					var alertPopup2 = $ionicPopup.alert({
						title: '<center> <b> Successfully Added! </b> </center>'
                    });
                    alertPopup2.then(function(res) {
                    });
// TODO: GO TO ANGANWADI'S PROFILE! 
					$state.go('sidemenu.home');
				})
				.error(function(data, status, headers, config){
					// Do Something
				});
			} else {
				console.log('Go Back');
			}
		});
	}
	
	$scope.anganwadi_cancel = function() {
		console.log('Go Back');
		$state.go('sidemenu.home');
	}
})

/********** SearchStudentCtrl ***********
 *	Retrieve all the student names, profile pics,  
 */
.controller('SearchStudentCtrl', function($scope, $ionicHistory, $http) {

	// $scope.on is used to clear cache history!
	$scope.$on('$ionicView.afterLeave', function(){
		$ionicHistory.clearCache();
	});
	
	$scope.$on('$ionicView.beforeEnter', function(){
		//$ionicHistory.clearCache();
	});
	
	$scope.$on('$ionicView.beforeLeave', function(){
		$ionicHistory.clearCache();
	});
	
	$scope.$on('$ionicView.afterEnter', function(){
		$ionicHistory.clearCache();
	});
	
	get_students();

	function get_students() {
		$http.get("db.php?action=get_students").success(function(data)
		{
			$scope.students = data;
		});
	}
	
	//$scope.students = StudentService.all();
});