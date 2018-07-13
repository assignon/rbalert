var userMessages = [];
var Users = {

  usersMessages: [],
  isUserLogged ()
  {

       var curUser = window.localStorage.getItem('userId');
       var userStatus;

       if(curUser != null)
       {

         userStatus = true;

       }else{

          userStatus = false;

       }

       return userStatus;

   },


  /* isUserLogged ()
   {

     var userStatus;
     var curUser = fb.initializeDb().auth().currentUser;

     if(curUser != null)
     {

        userStatus = true;

     }else{

       userStatus = false;

     }

     return userStatus;

   },*/


   curUserData ()
   {

     var curUser = fb.initializeDb().auth().currentUser;
     var userdata;

     firebase.auth().onAuthStateChanged(function(user) {
       if (user) {
         console.log(user.uid);
       } else {
         console.log('user not connected');
       }
     });


   },


   isUserAdmin ()
   {

        var curUserGrade = window.localStorage.getItem('admin');
        var userIsAdmin;

        if(!null)
        {

            if(curUserGrade == 'true')
            {

              userIsAdmin = true;

            }else {

               userIsAdmin = false;

            }

        }

        return userIsAdmin;

    },


    usersMsgs (useremail)
    {

        Db.getMsgs(useremail, function(data){

           // Users.usersMessages.push(data);

           data.forEach(function(msgs){

              userMessages.push(msgs);

            })

       });


    }


}
