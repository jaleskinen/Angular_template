//Create own directive with name, NOTE camelcase syntax!
main_module.directive('navBar', function () {
    
    //Create empty object.
    var directive = {};
    
    //Define how directive can be used using the strict attribute
    //Possible values are:
    //'A' as attribute
    //'C' as class
    //'E' as element
    //'M' as comment
    //or combination of previous like 'AE'
    directive.restrict = 'AEC';
    
    //Define the template code
    directive.templateUrl = "/FrontEnd/views/navbar.html";
    
    //Always return an object from directive!
    return directive;
});