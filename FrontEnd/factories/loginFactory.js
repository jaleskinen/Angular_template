main_module.factory('loginFactory',function($resource){
    
    var factory = {};
    
    //This function can be called from ANY controller using this factory
    //implementation
    
    factory.startLogin = function(data){
        console.log("startLogin");
        //Create a resource for context '/angular/login'
        var req = $resource('/users/login',{},{'post':{method:'POST'}});
        //Use POST method to send the usrename and password to above context
        //Note that we return an promise object from here
        return req.post(data).$promise;
    }
    
    factory.startRegister = function(data){
        console.log('factory.startRegister');
        var req = $resource('/users/register',{},{'post':{method:'POST'}});
        return req.post(data).$promise;
    }
    
    //Factory must always return an object!
    return factory;
    
});