main_module.controller('personController',function($scope,personFactory,$location){
    
    console.log('personController loaded');
    
    personFactory.getPersonData(dataCallback);
    
    //$scope.name = "Jarmo Leskinen";
    
    
    $scope.rowCliked = function(id){
        
        personFactory.selected_id = id;
        $location.path('/edit').replace();
    }
    
    function dataCallback(personArray){
        
        $scope.personData = personArray;
    }
    
        //This is called when logoutClicked
    $scope.logoutClicked = function () {
        console.log('logout Clicked');
        window.location.href = "#/";
    };
    
    $scope.search = function(){
        personFactory.search($scope.search_term).then(function(data){
            console.log('data received: ' + data);
            $scope.personData = data;
        });
    }
    
     $scope.showAll = function () {
        location.reload();
    };
});