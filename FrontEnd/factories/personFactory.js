main_module.factory('personFactory',function($resource,$http, $http){
    
    var factory = {};
    factory.selected_id = null;
    //In this array we cache the friends information,
    //so that once stored in array we wont make any further request
    factory.personArray = [];
    
    factory.getPersonData = function(callbackFunc){
        console.log('factory.personArray.length: ' + factory.personArray.length);
        if(factory.personArray.length === 0){
            //Set your headers in request like this
            $http.defaults.headers.common['x-access-token'] = sessionStorage['token'];
            var resource = $resource('/users',{},{'get':{method:'GET'}});
            resource.query().$promise.then(function(data){
                
              factory.personArray = data;
              callbackFunc(factory.personArray);    
                
            },function(error){
                
                factory.personArray = [];
                callbackFunc(factory.personArray);
            });
        }
        else{
            
            callbackFunc(factory.personArray);
        }
    }
    //Updates the data to back end
    factory.updateData = function(data){
        $http.defaults.headers.common['x-access-token'] = sessionStorage['token'];
        var resource = $resource('/persons',{},{'put':{method:'PUT'}});
        return resource.put(data).$promise;
    }
    
    factory.deleteData = function(data){
        $http.defaults.headers.common['x-access-token'] = sessionStorage['token'];
        $http.defaults.headers.common['content-type'] = 'application/json'; 
        var resource = $resource('/persons',{},{'delete':{method:'DELETE'}});
        return resource.delete(data).$promise;
    }
    
    /**
      *This function searches a person from array containing an id
      *that was stored when user cliked the row in the partial_dataView
      *page. When it finds the correct one from the array, it returns
      *that object.
      */
    factory.getSelectedPerson = function(){
        
        for(var i = 0; i < factory.personArray.length; i++){
            
            if(factory.personArray[i]._id === factory.selected_id){
                
                return factory.personArray[i];
            }
        }
        
    }
    
    //Updates the data to back end
    factory.insertData = function(data){
        console.log('factory.insertData');
        $http.defaults.headers.common['x-access-token'] = sessionStorage['token'];
        var resource = $resource('/persons',{},{'post':{method:'POST'}});
        return resource.post(data).$promise;
    }
    
    factory.search = function(term){
        
        var resource = $resource('/persons/search/',{name:term},{'get':{method:'GET'}});
        console.log('factory.search');
        return resource.query().$promise;
    }
    
    return factory;
    
});