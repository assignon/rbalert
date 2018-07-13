var users = {

   template: `

    <div class="users">

      <div class="usersGlobe">

        <div v-if="userCount == 0">

         <img src="img/user.svg" alt="" class="noUserImg">
         <h3> Geen Gebruikers!</h3>

        </div>

        <div class="usersContainer" v-else></div>

           <div class="usersEntireContainer" :class="[user.username, user.useremail]" v-for="user in users" @click="userHistory">

               <img src="img/userRed.svg" alt="" class="usericon">

               <div class="userInfo">

                  <h4>{{user.username}}</h4>
                  <p>{{user.useremail}}</p>

              </div>

              <div class="userAlerts">

               <img src="img/notificationsicons/sos.svg" alt="" v-if="user.usersSosCount > 0">
               <img src="img/text.svg" alt="" v-if="user.usersSosText > 0">
               <img src="img/camera.svg" alt="" v-if="user.usersSosFoto > 0">
               <img src="img/video.svg" alt="" v-if="user.usersSosVideo > 0">

              </div>

           </div>

         </div>

      </div>

    </div>

   `,

   data ()
   {

      return {

         userCount: '',
         users: [],
         userCount: '',
         soscount: ''

      }

   },

   created ()
   {

      this.$parent.loadStyle('users');
      var self = this;
      this.$store.state.users.forEach(function(usersdata){

        self.users.push(usersdata);

      });

      this.userCount = this.$store.state.users.length+1;

   },


   mounted ()
   {

     Animations.callStaggerElems('usersEntireContainer');

   },


   computed: {



   },


   methods: {


      userHistoryData (collection, email, type, arr)
      {

        var self = this;
        fb.fireStore().collection(collection)
        .where("useremail", "==", email)
        .where("type", "==", type)
        .where("helped", "==", false)
        .get().then(function(snapshot){

           var sosDocLen = snapshot.docs.length;
           snapshot.forEach(function(sosData){

             var data;

             if(collection == 'sos')
             {

                 data = {

                   docId: sosData.id,
                   dateAdded: sosData.data().dateAdded,
                   helped: sosData.data().helped,
                   sos: sosData.data().sos,
                   type: sosData.data().type,
                   useremail: sosData.data().useremail

                 };

             }else{

               fb.fireStorage().ref(sosData.data().type+'Sos/'+sosData.data().fileName).getDownloadURL()
               .then(function(url){

                  var fileData = {

                    docId: sosData.id,
                    fileName: sosData.data().fileName,
                    dateAdded: sosData.data().dateAdded,
                    helped: sosData.data().helped,
                    sos: sosData.data().sos,
                    type: sosData.data().type,
                    useremail: sosData.data().useremail,
                    fileSrc: url

                  };
                  //arr.push(fileData);

               }).catch(function(error){

                   console.log(error);

               });

             }
             arr.push(data);
             //self.$store.dispatch('commitCurUserData', arr);

           })

        });

      },


       userHistory (e)
       {

          var curUsername = e.currentTarget.classList[1];
          var curUseremail = e.currentTarget.classList[2];
          var self = this;
          var sosArr = [];
          var sosTextArr = [];
          var sosFotoArr = [];
          var sosVideoArr = [];

          /*this.$http.get(this.$parent.host+'/RBA/requests/users_history.php?useremail='+curUseremail+'&username='+curUsername).then(function(res){

              res.data.forEach(function(sosData){

                 self.$store.dispatch('commitCurUserData', sosData);
                 self.$store.state.curUserName = curUsername;
                 self.$store.state.curUserEmail = curUseremail;

              })
              this.$store.state.users = [];
              this.$parent.templateName = 'userHistory';

          });

       }*/

         /*fb.fireStore().collection('userProfile').where('useremail','==',curUseremail).where('userIsAdmin','==', false)
         .get().then(function(snapshot){



         });*/

         this.userHistoryData ('sos', curUseremail, 'sos', sosArr);
         this.userHistoryData ('sos', curUseremail, 'text_sos', sosTextArr);
         //this.userHistoryData ('cameraSos', curUseremail, 'foto', sosFotoArr);
         //this.userHistoryData ('cameraSos', curUseremail, 'video', sosVideoArr);

         this.$store.dispatch('commitCurUserData', sosArr);
         this.$store.dispatch('commitCurUserData', sosTextArr);
         //this.$store.dispatch('commitCurUserData', sosFotoArr);
        // this.$store.dispatch('commitCurUserData', sosVideoArr);
         this.$store.state.curUserName = curUsername;
         this.$store.state.curUserEmail = curUseremail;
         this.$store.state.users = [];
         this.$parent.templateName = 'userHistory';

      }

   }

}
