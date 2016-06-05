//Angular main module. First argument is the name of the module, the second one
//the '[] array' contains the dependencies to other angular modules
var main_module = angular.module('main_module',['ngRoute','ngResource','flash']);

//This function will check if user is logged in or not. 
//This function is used in the rotuer below in resolve attribute
function loginRequired ($q, $resource, $location, $http){
    
    //Create a promise object
    var deferred = $q.defer();
    $http.defaults.headers.common['x-access-token'] = sessionStorage['token'];
    
    $resource('/islogged').query().$promise.then(function success(){
        console.log("Logged check OK");
        //Mark the promise to be solved (or resolved)
        deferred.resolve();
        return deferred;
        }, function fail(){
        console.log("Logged check FAIL");
        //Mark promise to be failed
        deferred.reject();
        //Go back to root content
        $location.path('/');
        return deferred;
    });
}

//Create basic configuration for Angular app.
//Configuration includes a router for views.
//The $routeProvider object comes from ngRoute module
main_module.config(function($routeProvider){
    
    $routeProvider.when('/',{
        
        templateUrl:'login.html',
        controller:'loginController',
        
    }).when('/list',{
        
        templateUrl:'personView.html',
        controller:'personController',
        resolve:{loginRequired:loginRequired}
        
    }).when('/edit',{
        
        templateUrl:'editView.html',
        controller:'editController',
        resolve:{loginRequired:loginRequired}
        
    }).when('/delete',{
        
        templateUrl:'deleteView.html',
        controller:'deleteController',
        resolve:{loginRequired:loginRequired}
        
    }).when('/insert',{
        
        templateUrl:'addView.html',
        controller:'addController',
        resolve:{loginRequired:loginRequired}
        
    });
    
});
