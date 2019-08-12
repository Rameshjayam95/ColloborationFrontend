myApp.controller("JobController", function($scope,$http,$route,$location,$rootScope) {
	$scope.job={ jobDesignation:'', companyName:'', ctc:0, jobLocation:'', lastDate:'', skills:'' };
	$scope.jobdata;
	
	$scope.addJob=function() {
		  
	      $http.post('http://localhost:8080/Middleware/addJob',$scope.job)
	      .then(function(response) {
	    	  console.log("Job added");
	    	  alert("Job added");
	    	  $route.reload();
	          $location.path("/addJob");
	      },
	      function(errresponse) {
	    	  console.log("Error adding Job");
	    	  alert("Error while adding Job");
	    	  $location.path("/addJob");
	      });
    }
	
	$scope.deleteBlog=function(jobId) {
		 $http.get('http://localhost:8080/Middleware/deleteJob/'+jobId)
		 .then(function(response) {
			 console.log("Job deleted");
			 listJobs();
			 $location.path("/showJob");
		 },
		 function(errresponse) {
			 console.log("Error deleting Job");
		 });
	}
	
	function listJobs() 
	{
		console.log("list Job method");
		$http.get('http://localhost:8080/Middleware/getJobs')
		.then(function(response) {
			console.log("Showing all Jobs");
			$scope.jobdata=response.data;
			console.log($scope.jobdata);
		},
		function(errresponse) {
			console.log("Error showing Jobs");
		});	
	}
	
	listJobs();
});