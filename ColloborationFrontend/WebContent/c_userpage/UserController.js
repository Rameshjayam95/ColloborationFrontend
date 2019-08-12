myApp.controller("UserController", function($scope,$location,$rootScope,$http,$cookieStore) 
		{
	$scope.userDetail={username:'', firstname:'', surname:'', password:'', emailId:'', role:'', status:'', isOnline:''};
	
	$rootScope.currentUser;
	
    $scope.checkUser=function() {
    	
    	$http.post('http://localhost:8080/ColloborationMiddleEnd/checkUser',$scope.userDetail)
	      .then(function(response) {
	    	  console.log("User checked");
	    	  console.log(response.statusCode);
	    	  $rootScope.currentUser=response.data;
	    	  $cookieStore.put('userDetail',response.data);
	    	  console.log($rootScope.currentUser);
	    	  $location.path("/showBlog");
	      },
	      function(errresponse) {
	    	  $scope.error="Username or password is wrong";
	    	  console.log("Error checking user");
	    	  $location.path("/login");
	      });
      }
   
$scope.addUser= function() {
	  $scope.userDetail.role="ROLE_USER";
	  $scope.userDetail.status='A';
    $scope.userDetail.isOnline='Y';
    
    $http.post('http://localhost:8080/ColloborationMiddleEnd/addUser',$scope.userDetail)
    .then(function(response) {
  	  console.log("User added");
  	  console.log(response.data);
  	  $location.path("/login");
    }, 
    function(errresponse) {
  	  $scope.error="Error in Registering";
  	  console.log("Error adding user");
  	  console.log(errresponse.data);
  	  $location.path("/register");
   });
 }
$scope.upload=function()  {
	 $http.post('http://localhost:8080/ColloborationMiddleEnd/doUpload')
	 .then(function(response) {
		 console.log("Profile Picture Updated");
		 $location.path("/profile");
	 },
	 function(errresponse) {
		 console.log("Profile Picture not Updated");
	 });
}
$scope.logout=function()
{
console.log("Logging out");
delete $rootScope.currentUser;
$cookieStore.remove('userDetail');
alert("Logged out");
$location.path("/login");
}

});