const router=angular.module("router",['ngRoute'])

router.config(function($routeProvider,$locationProvider){
    $routeProvider.
    when('/',{
        templateUrl:'views/todo.html'
    }).
    otherwise({
        templateUrl:'views/todo.html'
    })

    $locationProvider.html5Mode(true)
})