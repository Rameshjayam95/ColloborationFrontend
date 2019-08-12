myApp.controller("FriendController",function($scope,$location,$rootScope,$http,$cookieStore) {
	
	$scope.friend={friendId:0, username:'', userFirstName:'', userSurName:'', friendusername:'', friendFirstName:'', friendSurName:'', status:''};
    $scope.showFriends;
    $scope.friendRequests;
    $scope.suggestedFriends;
	
    function showFriends() {
    	 $http.get('http://localhost:8080/Middleware/showFriendList/'+$rootScope.currentUser.username)
    	 .then(function(response) {
    		 console.log("Showing Friends");
    		 $scope.showFriends=response.data;
    	 },
    	 function(errresponse) {
    		 console.log("Error showing Friends");
    		 $scope.showFriends=errresponse.data;
    	 }); 			 
    }
    
    function friendRequests() {
    	 $http.get('http://localhost:8080/Middleware/showPendingFriendRequest/'+$rootScope.currentUser.username)
    	 .then(function(response) {
    		 console.log("Showing Friend Requests");
    		 $scope.friendRequests=response.data;
    	 },
    	 function(errresponse) {
    		 console.log("Error showing Friend Requests");
    		 $scope.friendRequests=errresponse.data;
    	 }); 			 
    }
    
    function suggestedFriends() {
    	 $http.get('http://localhost:8080/Middleware/showSuggestedFriend/'+$rootScope.currentUser.username)
    	 .then(function(response) {
    		 console.log("Showing Suggested Friends");
    		 $scope.suggestedFriends=response.data;
    	 },
    	 function(errresponse) {
    		 console.log("Error showing Suggested Friends");
    		 $scope.suggestedFriends=errresponse.data;
    	 }); 		
    }
    
    $scope.acceptRequest=function(friendId) {
      	 $http.get('http://localhost:8080/Middleware/acceptFriendRequest/'+friendId)
      	 .then(function(response) {
      		 console.log("Friend accepted");
      		 friendRequests();
      		 $location.path("/friendRequests");
      	 },
      	 function(errresponse) {
      		 console.log("Error accepting Friend");
      	 }); 		
      }
    
    $scope.deleteRequest=function(friendId) {
   	 $http.get('http://localhost:8080/Middleware/deleteFriendRequest/'+friendId)
   	 .then(function(response) {
   		 console.log("Friend removed");
   		 friendRequests();
   		 $location.path("/friendRequests");
   	 },
   	 function(errresponse) {
   		 console.log("Error removing Friend");
   	 }); 		
   }
   
    $scope.deleteFriend=function(friendId) {
    	 $http.get('http://localhost:8080/Middleware/deleteFriendRequest/'+friendId)
    	 .then(function(response) {
    		 console.log("Friend removed");
    		 showFriends();
    		 $location.path("/showFriends");
    	 },
    	 function(errresponse) {
    		 console.log("Error removing Friend");
    	 }); 		
    }
    
    $scope.sendRequest=function(username,firstname,surname) {
    	 $scope.friend.username=$rootScope.currentUser.username;
    	 $scope.friend.userFirstName=$rootScope.currentUser.firstname;
    	 $scope.friend.userSurName=$rootScope.currentUser.surname;
    	 $scope.friend.friendusername=username;
    	 $scope.friend.friendFirstName=firstname;
    	 $scope.friend.friendSurName=surname;
    	 $scope.friend.status="NA";
    	 $http.post('http://localhost:8080/Middleware/sendFriendRequest',$scope.friend)
    	 .then(function(response) {
    		 console.log("Friend request sent");
    		 suggestedFriends();
    		 $location.path("/suggestedFriends");
    	 },
    	 function(errresponse) {
    		 console.log("Error sending Friend request");
    	 }); 		
    }
    
    showFriends();
    friendRequests();
    suggestedFriends();

});