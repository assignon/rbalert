var messages = {

   template: `

   <div class="messages" v-if="userLogged">

     <div class="msgNotif" v-if="userIsAadmin">

       <!--<div class="sosAlert" v-if="sosCount > 0"><img src="img/notificationsIcons/sos.svg" alt=""></div>-->
       <img src="img/users.svg" alt="" @click="displayUsers">

      </div>

      <div class="msgNotif pageLink" v-else @click="displayMsgsPage">

         <img src="img/notificationsIcons/msgs.svg" alt="">
         <span v-if="msgsCount > 0">{{ msgsCount }}</span>

      </div>

   </div>

   `,

   data ()
   {

      return {

        userLogged: this.$parent.userLoggegStatus,
        userIsAadmin: this.$parent.isUseradmin,
        msgsCount: "",
        allMsgsCount: '',
        sosCount: window.localStorage.getItem('sos'),
        useremail: this.$parent.userEmail

      }

   },


   created ()
   {

      this.$parent.loadStyle('messages');
      this.msgCount();
      //this.$store.dispatch('updateMsgCount', this.userEmail);
    /*  this.$parent.getMsgCount(this.useremail, function(count){

         this.msgsCount = count;

      });*/

      //this.$store.commit('updateCount', this.useremail);console.log(this.msgsCount);

   },


   mounted ()
   {

    // Db.count('sos');
     //Db.count('messages');
     Animations.sosAlarm();
     //this.$store.commit('updateCount', this.useremail);

   },


   computed: {



   },


   methods: {

       displayMsgsPage ()
       {

        /*  if(this.allMsgsCount > 0)
          {*/

            //Helpers.renderPages('msgscontentContainer');
            this.$parent.loaderIn('img/loaders/gettingData.svg', 'De berichten worden ingeladen...');
            this.$parent.templateName = 'msgscontents';
            var usersMsgs = document.querySelector('.usersMsgs');

        /*  }*/


       },


       msgCount: function()
       {

           /*this.$http.get(this.$parent.host+'/RBA/requests/msgsCountRows.php?useremail='+this.useremail).then(function(res){

             this.msgsCount = res.data.count;
             this.allMsgsCount = res.data.allCount;

           })*/

        },


        displayUsers: function()
        {

           this.$parent.loaderIn('img/loaders/gettingData.svg', 'De gebruikers worden ingeladen...');
           var self = this;
           /*this.$http.get(this.$parent.host+'/RBA/requests/users.php').then(function(res){

              /*res.json().then(function(data){

                 console.log(data);

              })*/
            /*  console.log(res.data);
              Helpers.GoHome();
              this.$store.dispatch('commitUserData', res.data);
              self.$parent.templateName = 'users';

            })*/

            fb.fireStore().collection('usersProfile').where('userIsAdmin', "==", false)
            .get().then(function(snapshot){

              self.$parent.loaderOut();
              snapshot.forEach(function(users){

                Helpers.GoHome();
                self.$store.dispatch('commitUserData', users.data());//gebruikersdata opslaan in de appStore
                self.$parent.templateName = 'users';//ga naar de gebruikers pagina

              })

            })

        }

   }

}
