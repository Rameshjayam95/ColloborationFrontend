myApp.controller("BlogController", function($scope,$location,$rootScope,$http) 
		{
	
	$scope.blog={blogId:0,blogName:'', blogContent:'',username:'',createDate:'',status:'',likes:0,dislikes:0};
	$scope.blogdata;
$rootScope.blogId;
	
	$scope.addBlog=function() 
	{
	      
	      $scope.blog.username=$rootScope.currentUser.username;
	      $http.post('http://localhost:8080/ColloborationMiddleEnd/addBlog',$scope.blog)
	      .then(function(response) 
	    		  {
	    	  console.log("Blog added");
	    	  alert("Blog added");
	    	  $route.reload();
	          $location.path("/addBlog");
	      },
	      function(errresponse) 
	      {
	    	  console.log("Error adding Blog");
	    	  
	    	  alert("Error while adding Blog");
	    	  $location.path("/addBlog");
	      });
      }
	
	$scope.updateMyBlog=function(blogId)
	{
		console.log("Editing a blog");
		$rootScope.blogId=blogId;
		$location.path("/updateBlog");
	}
	
	$scope.updateBlog=function()
	{
		$http.post('http://localhost:8080/ColloborationMiddleEnd/updateBlog',$scope.blog)
		.then(function(response) 
				{
			 console.log("Blog updated");
	    	 alert("Blog updated");
	    	 $route.reload();
		     $location.path("/updateBlog");
		},
		 function(errresponse) 
		 {
	    	  console.log("Error updating Blog");
	    	  alert("Error while updating Blog");
	    	  $location.path("/updateBlog");
	      });
	   
	}
	
	$scope.incrementLikes=function(blogId) 
	{
		 $http.get('http://localhost:8080/ColloborationMiddleEnd/'+blogId)
		 .then(function(response) 
				 {
			 console.log("Incremented Likes");
			 listBlogs();
			 $location.path("/showBlog");
		 },
		 function(errresponse) 
		 {
			 console.log("Error Incrementing Likes");
		 });
	}
	
	$scope.incrementDislikes=function(blogId) 
	{
		 $http.get('http://localhost:8080/ColloborationMiddleEnd/'+blogId)
		 .then(function(response) 
				 {
			 console.log("Incremented Dislikes");
			 listBlogs();
			 $location.path("/showBlog");
		 },
		 function(errresponse) 
		 {
			 console.log("Error Incrementing Dislikes");
		 });
	}
	
	$scope.deleteBlog=function(blogId) 
	{
		 $http.get('http://localhost:8080/Middleware/deleteBlog/'+blogId)
		 .then(function(response) {
			 console.log("Blog deleted");
			 listBlogs();
			 $location.path("/showBlog");
		 },
		 function(errresponse) 
		 {
			 console.log("Error deleting Blog");
		 });
	}
	
	$scope.adminDeleteBlog=function(blogId) 
	{
		 $http.get('http://localhost:8080/Middleware/deleteBlog/'+blogId)
		 .then(function(response) 
				 {
			 console.log("Blog deleted");
			 listBlogs();
			 $location.path("/manageBlog");
		 },
		 function(errresponse) 
		 {
			 console.log("Error deleting Blog");
		 });
	}
	
	$scope.deleteMyBlog=function(blogId) 
	{
		 $http.get('http://localhost:8080/ColloborationMiddleEnd/deleteBlog/'+blogId)
		 .then(function(response) 
				 {
			 console.log("Blog deleted");
			 listBlogs();
			 $location.path("/myBlog");
		 },
		 function(errresponse) 
		 {
			 console.log("Error deleting Blog");
		 });
	}
	
	$scope.approveBlog=function(blogId) 
	{
		 $http.get('http://localhost:8080/ColloborationMiddleEnd/sapproveBlog/'+blogId)
		 .then(function(response) 
				 {
			 console.log("Blog approved");
			 listBlogs();
			 $location.path("/manageBlog");
		 },
		 function(errresponse) 
		 {
			 console.log("Error approving Blog");
		 });
	}
	
	$scope.rejectBlog=function(blogId) 
	{
		 $http.get('http://localhost:8080/ColloborationMiddleEnd/rejectBlog/'+blogId)
		 .then(function(response) 
				 {
			 console.log("Blog rejected");
			 listBlogs();
			 $location.path("/manageBlog");
		 },
		 function(errresponse) 
		 {
			 console.log("Error rejecting Blog");
		 });
	}
	
	function listBlogs() 
	{
		console.log("list blog method");
		$http.get('http://localhost:8080/ColloborationMiddleEnd/getBlogs')
		.then(function(response) 
				{
			console.log("Showing all Blogs");
			$scope.blogdata=response.data;
		},
		function(errresponse) 
		{
			console.log("Error showing Blogs");
		});	
	}
	
	function getBlog()
	{
		$http.get('http://localhost:8080/ColloborationMiddleEnd/getBlog/'+$rootScope.blogId)
		.then(function(response) 
				{
			$scope.blog=response.data;
			console.log("getting blog");
		},
		function(errresponse)
		{
			console.log("error getting blog");
		});
	}
	getBlog();
	listBlogs();
});