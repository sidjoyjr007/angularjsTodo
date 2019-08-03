const todoCtrl=angular.module('todoCtrl',[]);
todoCtrl.controller('todocontroller',($scope,$http,$rootScope,myservice,$window,$timeout)=>{
    $scope.todos=[];
    $scope.loaderVisibility=false;
    $scope.date=new Date().toISOString().split('T')[0];

    //Listen to the event changes (generated by date controller when date is changed)
    $rootScope.$on("changes",()=>{
      $scope.todos=[];
      let date=myservice.getData(); // calls "myservice's" getData() function to get the changed date
      $scope.date=new Date(date).toISOString().split('T')[0];
      $scope.begin($scope.date)
    })


   $scope.begin=(d)=>{
    $scope.loaderVisibility=true;
    $(":input").attr("disabled", true)
     $http.get("/todo/"+d).then(response=>{
      if(response.data.data=="ok"){
        console.log(response)
        if(response.data.response.length>0){ 
          let todoData=response.data.response
          angular.forEach(todoData,(value,key)=>{
              $scope.todos.push({
                id:value._id,
                todo:value.todo,
                date:value.date,
                completed:value.completed
              });
          })
        }
        $scope.loaderVisibility=false;
         $(":input").attr("disabled", false);
      }
      else{
        $scope.loaderVisibility=false;
        $(":input").attr("disabled", false);
      }
     })
   }


   $scope.todosubmit=(e)=>{
       e.preventDefault();
       let today=new Date().toISOString().split('T')[0];
       console.log($scope.date)
       let todo=$scope.todo.trim();
       if(todo===null || todo === undefined || todo===""){
             $scope.todo=null;
       }else if(today > $scope.date){
        $scope.showSnackBar("Selected Date is already over");
         $scope.todo=null;
       }else{
         $scope.todo=null;
         let data={'id':new Date().valueOf(),'todo':todo,date:$scope.date}
         $(":input").attr("disabled", true);
         $scope.loaderVisibility=true;
         $http.post("/todo",data).then(response=>{
           console.log(response)
              if(response.data.data=="ok"){
                $scope.todos.push(data);
                $scope.loaderVisibility=false;
                 $(":input").attr("disabled", false);
              }
         }).catch(err=>{
         $scope.showSnackBar("Unable to add new Todo Try again")
         })
       }
      
   }

   

   $scope.deleteTodo=(id,index)=>{
     console.log(id)
    $scope.loaderVisibility=true;
    $(":input").attr("disabled", true);
    let data={'id':id}
    $http.post("/todo/delete",data).then(response=>{
         if(response.data.data=="ok"){
           $scope.todos.splice(index,1);
           $scope.loaderVisibility=false;
            $(":input").attr("disabled", false);
         }
    }).catch(err=>{
      $scope.showSnackBar("Unable to delete a Todo Try again")
    })
   }

  $scope.markAsComplete=(id,index)=>{
    $scope.loaderVisibility=true;
    $(":input").attr("disabled", true);
    let data={'id':id}
    $http.post("/todo/update",data).then(response=>{
         if(response.data.data=="ok"){
           $scope.todos[index].completed=true;
           $scope.loaderVisibility=false;
            $(":input").attr("disabled", false);
         }
    }).catch(err=>{
      $scope.showSnackBar("Unable to Mark a Todo as completed Try again")
    })
  }


$scope.showSnackBar=(msg)=>{
  $scope.msg=msg
  var x = document.getElementById("snackbar");
  x.className = "show";
  setTimeout(function(){ x.className = x.className.replace("show", ""); }, 3000);
}
   $scope.begin(new Date().toISOString().split('T')[0]);

});
