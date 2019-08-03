const todoservice=angular.module("todoservice",[]);
todoservice.service("myservice",function($rootScope){
    var svc=this;
    svc.tempData;
    svc.setData=(d)=>{
        svc.tempData=d;
        $rootScope.$emit("changes")
    }

    svc.getData=()=>{
        return svc.tempData
    }
})