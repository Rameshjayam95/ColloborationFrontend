myApp.controller("ChatController",function($scope,$location,$rootScope,chatService)
{
	console.log('Starting chat Controller')

	$scope.messages=[];
	$scope.message="";
	$scope.max=140;
	
	$scope.addMessage=function()
	{
		console.log('Adding Message Method');
		chatService.send($rootScope.currentUser.username+":"+$scope.message);
		$scope.message="";
	}
	
	chatService.receive().then(null,null,function(message){
		console.log('Receive Method');
		$scope.messages.push(message);
	});
});