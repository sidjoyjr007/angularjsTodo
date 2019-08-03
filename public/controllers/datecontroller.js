const dateCtrl=angular.module("dateCtrl",['ngMaterial']);

dateCtrl.controller("datecontroller",function($scope,myservice,$window){
    $scope.date=new Date();

    $scope.hello=()=>{
        myservice.setData($scope.date);
        if(window.innerWidth<=500){
        $(".calendar").fadeOut(500)
        }
    }

    $scope.showCalendar=()=>{
        $(".calendar").fadeToggle(500)
    }
})