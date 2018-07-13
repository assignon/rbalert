var forms = {

  template: `

  <div class="formsContainer">

     <div class="formBack">

     </div>


     <form class="loginOut" action="" method="">

       <img src="img/close.svg" alt="" @click="closeForm">

       <div class="errcont"><p v-if="account">{{ logMsg }}</p><img src="img/loaders/loader.svg" alt="" class="loginloader" v-if="loging"></div>
       <div class="errcont"><p v-if="!account">{{ logMsgregister }}</p><img src="img/loaders/loader.svg" alt="" class="registerloader" v-if="registering"></div>

       <input type="text" name="" v-model="username" placeholder="Gebruikersnaam" v-if="!account">
       <input type="email" name="" v-model="email" placeholder="Email">
       <input type="password" name="" v-model="password" placeholder="password">
       <input type="submit" name="" value="Login" v-if="account" @click.prevent="login">
       <input type="submit" name="" value="Registreren" v-if="!account" @click.prevent="register">

       <h3 v-if="account" @click="registerForm">Registreren</h3>
       <h3 v-else @click="loginForm">Login</h3>

     </form>

  </div>

 `,


  created ()
  {

     this.$parent.loadStyle('forms');

  },


   data ()
   {

      return {

        userLogged: this.$parent.userLoggegStatus,
        username: "",
        email: '',
        password: '',
        account: true,
        logMsg: 'Vul jouw inlog gegevens in...',
        logMsgregister: 'Maak een nieuw account aan...',
        loging: false,
        registering: false

      }

   },


   methods: {


       registerForm ()
       {

          // this.logMsg = 'Maak een nieuw account aan...';
           this.account = false;

       },


       loginForm ()
       {

          //this.logMsg = 'Vul jouw inlog gegevens in...';
          this.account = true;

       },


       register ()
       {

           var self = this;
           this.registering = true;
           self.logMsgregister = 'Uw account wordt aangemaakt...';
          fb.initializeDb().auth().createUserWithEmailAndPassword(this.email, this.password)
          .then(function(user){

             fb.fireStore().collection('usersProfile').add({

                userIsAdmin: false,
                useremail: self.email,
                username: self.username

             })
             .then(function(docRef){

                self.registering = false;
                self.$parent.notification('img/redbuttonLogo.svg', "Uw account is met succes aangemaakt!");
                self.login();
                self.username = '';
                //self.email = '';
                //self.password = '';

                Animations.hideForm();

             })

          }).catch(function(error){

             self.registering = false;
             self.logMsgregister = error.message;

          });

       },


      /* register ()
       {

          //Db.createUser(this.username, this.email, this.password, this.logMsg);
          var self = this;
          var logData = {

             username: self.username,
             email: self.email,
             password: self.password

          };

          if(logData.username != "" && logData.password != "" && logData.email != "")
          {

            //var logDataJson = JSON.stringify(logData);
            this.$http.get(this.$parent.host+'/RBA/requests/sign_up.php?username='+self.username+'&email='+self.email+'&password='+self.password).then(function(res){

              if(res.data == 'Jouw account is met succes aangemaakt!')
              {

                self.$parent.notification('img/notificationsIcons/user.svg', res.data);
                self.login();
                self.username = '';
                self.email = '';
                self.password = '';

                Animations.hideForm();

              }else{

                alert(res.data);

              }

            })

          }else{

            alert(this.logMsg);

          }


       },*/


      /* login ()
       {

          var self = this;
          Db.signInWithEmailAndPassword(this.email, this.password, this.logMsg,

          function(userstate, userGrade){

              if(userstate)
              {

                self.email = "";
                self.password = "";
                self.$parent.chgUserState(userGrade);
                self.$parent.$children[2].sosType();
                self.$parent.notification('img/notificationsIcons/user.svg', "U bent ingelogd!");

              }

          });


          /*this.$http.get('http://10.5.1.79:8888/RBA/requests/sign_in.php', {params: {email: this.email, password: this.password}, headers: {'X-Custom': '...'}})
          .then((response) =>{

             console.log(response.data);

          }, (response) => {

             console.log('err: '+response);

          })*/

      /*  },*/


        login ()
        {

           var self = this;
           this.loging = true;
           self.logMsg = 'U wordt ingelogd...';
           fb.initializeDb().auth().signInWithEmailAndPassword(this.email, this.password)
           .then(function(user){

             //var curUser = fb.initializeDb().auth().currentUser;

             firebase.auth().onAuthStateChanged(function(user) {
               if (user) {

                 fb.fireStore().collection('usersProfile').where("useremail", "==", self.email)
                 .get()
                 .then(function(snapshot){
                    snapshot.forEach(function(doc){
                      self.loging = false;
                      var userIsAdmin = doc.data().userIsAdmin;
                      self.$parent.isUseradmin = doc.data().userIsAdmin;
                      window.localStorage.setItem('admin', userIsAdmin);
                      self.$parent.chgUserState(self.$parent.isUseradmin);

                    })

                 })

                 window.localStorage.setItem('userId',user.uid);
                 window.localStorage.setItem('userEmail',user.email);
                 //window.localStorage.setItem('admin',userData.sessionAdmin);
                 self.password = "";
                 self.$parent.notification('img/redbuttonLogo.svg', "U bent ingelogd!");
                 Animations.hideForm();

               } else {

                 self.$parent.notification('img/redbuttonLogo.svg', "U bent niet ingelogd!");

               }
             });


           }, function(err){

             self.loging = false;
             self.logMsg = err.message;

           })

        },



        closeForm ()
        {

          Animations.hideForm();

        }


   }


};
