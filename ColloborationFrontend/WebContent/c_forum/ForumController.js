myApp.controller("ForumController", function($scope,$location,$rootScope,$http,$route) {
	
	$scope.forum={forumId:0,forumName:'', forumContent:'',username:'',createDate:'',status:''};
	$scope.forumdata;
	$rootScope.forumId;
	
	$scope.addForum=function() {
	      
	      $scope.forum.username=$rootScope.currentUser.username;
	      $http.post('http://localhost:8080/Middleware/addForum',$scope.forum)
	      .then(function(response) {
	    	  console.log("Forum added");
	    	  alert("Forum added");
	    	  $route.reload();
	          $location.path("/addForum");
	      },
	      function(errresponse) {
	    	  console.log("Error adding Forum");
	    	  alert("Error while adding Forum");
	    	  $location.path("/addForum");
	      });
      }
	
	$scope.updateMyForum=function(forumId)
	{
		console.log("Editing a forum");
		$rootScope.forumId=forumId;
		$location.path("/updateForum");
	}
	
	$scope.updateForum=function()
	{
		$http.post('http://localhost:8080/Middleware/updateForum',$scope.forum)
		.then(function(response) {
			 console.log("Forum updated");
	    	 alert("Forum updated");
		     $location.path("/updateForum");
		},
		 function(errresponse) {
	    	  console.log("Error updating Forum");
	    	  alert("Error while updating Forum");
	    	  $location.path("/updateForum");
	      });
	   
	}
	
	$scope.deleteForum=function(forumId) {
		 $http.get('http://localhost:8080/Middleware/deleteForum/'+forumId)
		 .then(function(response) {
			 console.log("Forum deleted");
			 listForums();
			 $location.path("/showForum");
		 },
		 function(errresponse) {
			 console.log("Error deleting Forum");
		 });
	}
	
	$scope.adminDeleteForum=function(forumId) {
		 $http.get('http://localhost:8080/Middleware/deleteForum/'+forumId)
		 .then(function(response) {
			 console.log("Forum deleted");
			 listForums();
			 $location.path("/manageForum");
		 },
		 function(errresponse) {
			 console.log("Error deleting Forum");
		 });
	}
	
	$scope.deleteMyForum=function(forumId) {
		 $http.get('http://localhost:8080/Middleware/deleteForum/'+forumId)
		 .then(function(response) {
			 console.log("Forum deleted");
			 listForums();
			 $location.path("/myForum");
		 },
		 function(errresponse) {
			 console.log("Error deleting Forum");
		 });
	}
	
	$scope.approveForum=function(forumId) {
		 $http.get('http://localhost:8080/Middleware/approveForum/'+forumId)
		 .then(function(response) {
			 console.log("Forum approved");
			 listForums();
			 $location.path("/manageForum");
		 },
		 function(errresponse) {
			 console.log("Error approving Forum");
		 });
	}
	
	$scope.rejectForum=function(forumId) {
		 $http.get('http://localhost:8080/Middleware/rejectForum/'+forumId)
		 .then(function(response) {
			 console.log("Forum rejected");
			 listForums();
			 $location.path("/manageForum");
		 },
		 function(errresponse) {
			 console.log("Error rejecting Forum");
		 });
	}
	
	function listForums() 
	{
		console.log("list forum method");
		$http.get('http://localhost:8080/Middleware/getForums')
		.then(function(response) {
			console.log("Showing all Forums");
			$scope.forumdata=response.data;
		},
		function(errresponse) {
			console.log("Error showing Forums");
		});	
	}
	
	function getForum()
	{
		$http.get('http://localhost:8080/Middleware/getForum/'+$rootScope.forumId)
		.then(function(response) {
			$scope.forum=response.data;
			console.log("getting forum");
		},
		function(errresponse)
		{
			console.log("error getting forum");
		});
	}
	getForum();
	listForums();
});