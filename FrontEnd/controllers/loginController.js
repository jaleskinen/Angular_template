//The main_module variable is defined in mainModule.js file (located in module folder)
//The first argument is the name of the controller. 
main_module.controller('loginController',function($scope,loginFactory,$location,Flash){
    
    //This is called when login button is pressed in login.html
    $scope.loginClicked = function(){
        console.log('login was pressed');
        
        var temp = {
            username:$scope.user,
            password:$scope.pass
        }
        
        var waitPromise = loginFactory.startLogin(temp);
        
        //Wait the response from server. Create token after success response from server receives.
        waitPromise.then(function(data){
            console.log('token: ' + data.secret);
            sessionStorage['token'] = data.secret;
            $location.path('/list');
        },function(data){
            Flash.create('danger', 'Wrong user name or password given', 'custom-class');            
        });
    }
    
    $scope.registerClicked = function(){
        console.log('register was pressed');
        
         var temp = {
            username:$scope.user,
            password:$scope.pass
        }
         
        var response = loginFactory.startRegister(temp);
        
        response.then(success,error)
    }
    
    function success(data){
    
        Flash.create('success', 'New user added!', 'custom-class'); 
    }

    function error(data){

        Flash.create('danger', 'Username already in use!', 'custom-class');
    }
});

