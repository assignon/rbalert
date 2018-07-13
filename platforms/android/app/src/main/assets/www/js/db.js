
/*var Db = {

   dbConfig ()
   {

       var config = {
           apiKey: "AIzaSyCBsrELn5TShRC4CQ6_FMXJatd5WqX40fU",
           authDomain: "redbutton-alert.firebaseapp.com",
           databaseURL: "https://redbutton-alert.firebaseio.com",
           projectId: "redbutton-alert",
           storageBucket: "redbutton-alert.appspot.com",
           messagingSenderId: "554911665700"
         }

         return config;

   },


   initializeDb ()
   {

    //  var db = Firebase.initializeApp(this.config);
        var firebaseInit;

        if (!firebase.apps.length) {

          firebaseInit = firebase.initializeApp(Db.dbConfig());

        }else{

           firebaseInit = firebase;

        }
        return firebaseInit;

   }



}*/


var Db = {

  userstate: false,
  collectionCount: null,
  sosoSended: false,

  initXhr: function()
  {

      let xhr;

      if (window.XMLHttpRequest) {
          // code for IE7+, Firefox, Chrome, Opera, Safari
           xhr = new XMLHttpRequest();
         } else {
          // code for IE6, IE5
            xhr = new ActiveXObject("Microsoft.XMLHTTP");
        }

        return xhr;

  },



   host ()
   {

     return 'http://127.0.0.1:8888';/* 'http://192.168.0.104';*/

   },



  createUser: function(username, email, password, err, chguserstate)
  {

     var xhr = Db.initXhr();
     var formNotif = document.getElementById('formNotif');

     xhr.onreadystatechange = function(){

        if(this.readyState ==  4 && this.status == 200)
        {

            //Animations.showHideMsgs(xhr.responseText);

            if(xhr.responseText == 'Jouw account is met succes aangemaakt!')
            {

              Db.signInWithEmailAndPassword(email, password, err, chguserstate);
              Animations.hideForm();
              username = '';
              email = '';
              password = '';

            }else{

              alert(xhr.responseText);

            }

        }

     }

     if(username != "" && password != "" && email != "")
     {

       xhr.open('GET',Db.host()+"/RBA/requests/sign_up.php?username="+username+'&email='+email+'&password='+password,true);
       xhr.send();
     }else{

        alert("Vul de velden...");

     }

  },



  signInWithEmailAndPassword: function(email, password, err, callback)
  {

     var xhr = Db.initXhr();
     var formNotif = document.getElementById('formNotif');
     var userstate = false;

     xhr.onreadystatechange = function(){

          if(this.readyState ==  4 && this.status == 200)
          {

              var userData = JSON.parse(xhr.responseText);

              if(userData.logged)
              {

                userstate = true;
                var userGrade = userData.sessionAdmin;
                window.localStorage.setItem('userId',userData.sessionId);

                //window.localStorage.setItem('userName',userData.sessionUsername);
                window.localStorage.setItem('userEmail',userData.sessionEmail);
                window.localStorage.setItem('admin',userData.sessionAdmin);
                userIsAdmin = window.localStorage.getItem('admin');
                Animations.hideForm();

                callback(userstate, userGrade);

              }else{

                alert(userData.error);

              }

          }

     }

     if(email != "" && password != "")
     {

       xhr.open('GET', Db.host()+"/RBA/requests/sign_in.php?email="+email+'&password='+password,true);
       xhr.send();
     }else{

        err = "Vul de velden...";

     }


  },



  onAuthStateChanged ()
  {

     return window.localStorage.getItem('userId');

  },



/*  count (collectionName)
  {

    var xhr = Db.initXhr();

    xhr.onreadystatechange = function(){

       if(this.readyState ==  4 && this.status == 200)
       {

           window.localStorage.setItem(collectionName, xhr.responseText);


       }

    }

    xhr.open('GET', Db.host()+"/RBA/requests/countRows.php?collectionName="+collectionName,true);
    xhr.send();


  },*/


  /*msgCount (collectionName, value1, value2, count)
  {

    var xhr = Db.initXhr();
    //clause = [];
    //value = [];

    xhr.onreadystatechange = function(){

       if(this.readyState ==  4 && this.status == 200)
       {

           //window.localStorage.setItem(collectionName, xhr.responseText);
           //callback(xhr.responseText);
           count = xhr.responseText;


       }

    }

    xhr.open('GET', Db.host()+"/RBA/requests/prepareCountRows.php?collectionName="+collectionName+'&value1='+value1+'&value2='+value2,true);
    xhr.send();


  },*/



  sendSOS: function(useremail, callback)
  {

      var xhr = Db.initXhr();

      xhr.onreadystatechange = function(){

         if(this.readyState ==  4 && this.status == 200)
         {

             //Animations.showHideMsgs(xhr.responseText);
           if(xhr.responseText == "SOS met succes vestuurd! Uw wordt zo spoedig mogelijk geholpen.")
           {

             Animations.hidePopups('sosAlertContainer');
             Animations.hideForm();
             sosoSended = true;
             callback(sosoSended);

           }

         }

      }

      xhr.open('GET', Db.host()+"/RBA/requests/sos.php?useremail="+useremail,true);
      xhr.send();

    },



    sendTextSOS: function(useremail, content, callback)
    {

        var xhr = Db.initXhr();
        //var textFormNotif = document.querySelector('.textFormNotif');

        xhr.onreadystatechange = function(){

           if(this.readyState ==  4 && this.status == 200)
           {

               //Animations.showHideMsgs(xhr.responseText);
               if(xhr.responseText == "Text SOS met succes vestuurd! Uw wordt zo spoedig mogelijk geholpen.")
               {

                 callback();

               }

           }

        }

       xhr.open('GET', Db.host()+"/RBA/requests/text_sos.php?useremail="+useremail+'&content='+content,true);
       xhr.send();


    },


    selectQuery (collection, callback)
    {

        var xhr = Db.initXhr();
        //var textFormNotif = document.querySelector('.textFormNotif');

        xhr.onreadystatechange = function(){

           if(this.readyState ==  4 && this.status == 200)
           {

               callback(JSON.parse(xhr.responseText));

           }

        }

       xhr.open('GET', Db.host()+"/RBA/requests/selectQuery.php?collection="+collection,true);
       xhr.send();

    },



    getMsgs (useremail, callback)
    {

        var xhr = Db.initXhr();
        //var textFormNotif = document.querySelector('.textFormNotif');

        xhr.onreadystatechange = function(){

           if(this.readyState ==  4 && this.status == 200)
           {

               callback(JSON.parse(xhr.responseText));


           }

        }

       xhr.open('GET', Db.host()+"/RBA/requests/users_msgs.php?useremail="+useremail,true);
       xhr.send();

    },


    userMsgReaded (useremail, id)
    {

        var xhr = Db.initXhr();
        //var textFormNotif = document.querySelector('.textFormNotif');

        xhr.onreadystatechange = function(){

           if(this.readyState ==  4 && this.status == 200)
           {

               //callback(JSON.parse(xhr.responseText));


           }

        }

        xhr.open('GET', Db.host()+"/RBA/requests/users_msgs_read.php?useremail="+useremail+'&id='+id,true);
        xhr.send();

    },


    insertCameraSos (useremail, imgSrc, imgDesc, callback)
    {

        var xhr = Db.initXhr();
        //var textFormNotif = document.querySelector('.textFormNotif');

        xhr.setRequestHeader("Content-Type","multipart/form-data");

        xhr.onreadystatechange = function(){

           if(this.readyState ==  4 && this.status == 200)
           {

               callback(xhr.responseText);

           }

        }

        xhr.open('GET', Db.host()+"/RBA/requests/insertCameraSos.php?imgSrc="+imgSrc+'&imgDesc='+imgDesc+'&useremail='+useremail,true);
        xhr.send();

    },


    getUsers: function()
    {



    }

}
