myApp.controller("ForumCommentController", function($scope,$location,$rootScope,$http,$route) {
	
	$scope.forumComment={commentId:0, forumId:0, forumComment:'', commentDate:'', username:''};
	$scope.forumcomment={commentId:0, forumId:0, forumComment:'', commentDate:'', username:''};
	$scope.forumcommentdata;
	$rootScope.commentId;
	$rootScope.forumComId;
	
	$scope.showComments=function(forumId)
	{
		console.log("Showing a forum");
		$rootScope.forumComId=forumId;
		getForumComments();
		$location.path("/forumComment");
	}
	
	function getForumComments()
	{
		$http.get('http://localhost:8080/Middleware/getForumComments/'+$rootScope.forumComId)
		.then(function(response) {
			$scope.forumcommentdata=response.data;
			console.log("getting forum comments");
		},
		function(errresponse)
		{
			console.log("error getting forum comments");
		});
	}
	
	$scope.deleteForumComment=function(commentId) {
		 $http.get('http://localhost:8080/Middleware/deleteForumComment/'+commentId)
		 .then(function(response) {
			 console.log("Forum Comment deleted");
			 getForumComments();
			 $location.path("/forumComment");
		 },
		 function(errresponse) {
			 console.log("Error deleting Forum Comment");
		 });
	}
	
	$scope.updateComment=function(commentId)
	{
		console.log("Editing a forum comment");
		$rootScope.commentId=commentId;
		$location.path("/updateForumComment");
	}
	
	$scope.updateForumComment=function() {
		 $http.post('http://localhost:8080/Middleware/updateForumComment',$scope.forumcomment)
		 .then(function(response) {
			 console.log("Forum Comment updated");
			 $location.path("/updateForumComment");
		 },
		 function(errresponse) {
			 console.log("Error updating Forum Comment");
			 alert("Error while updating Forum Comment");
	    	 $location.path("/updateForumComment");
		 });
	}
	
	$scope.addComment=function(forumId) {
	      
	      $scope.forumComment.username=$rootScope.currentUser.username;
	      $scope.forumComment.forumId=forumId;
	      $http.post('http://localhost:8080/Middleware/addForumComment',$scope.forumComment)
	      .then(function(response) {
	    	  alert("Forum Comment added");
	    	  $route.reload();
	          $location.path("/showForum");
	      },
	      function(errresponse) {
	    	  alert("Error while adding Forum Comment");
	    	  $location.path("/showForum");
	      });
    }
	
	function getForumComment()
	{
		$http.get('http://localhost:8080/Middleware/getForumComment/'+$rootScope.commentId)
		.then(function(response) {
			$scope.forumcomment=response.data;
			console.log("getting forum comment");
		},
		function(errresponse)
		{
			console.log("error getting forum comment");
		});
	}
	
	getForumComment();
	getForumComments();

});