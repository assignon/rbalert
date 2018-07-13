var userProfil = {

  template: `

  <div class="profile">

    <div class="profileFoto"><img src="img/userRed.svg" alt="" class="avatar"><img src="img/edit.svg" alt="" class="edit"@click="editmode"></div>
    <h3>Yanick</h3>
    <h3>{{useremail}}</h3>

    <form method="" action="" v-if="editMode">

      <p class="error">{{updateErr}}</p>
      <input type="email" placeholder="Email" v-model="newEmail">
      <input type="password" placeholder="Wachtwoord" v-model="newPass">
      <input type="submit" id="editProfil" value="Aanpassen" @click.prevent="updateProfil">

    </form>


  </div>

 `,


  created ()
  {

     this.$parent.loadStyle('userProfil');console.log(this.curuser);

  },


  mounted ()
  {



  },


   data ()
   {

      return {

        userLogged: this.$parent.userLoggegStatus,
        useremail: this.$parent.userEmail,
        username: '',
        newEmail: '',
        newPass: '',
        updateErr: 'Pas je gegevens aan',
        editMode: false,
        curuser: fb.initializeDb().auth().currentUser

      }

   },


   methods: {

     updateProfil ()
     {

         var self = this;
         var user = fb.initializeDb().auth().currentUser;
         if(this.newEmail != '')
         {

             //email aanpassen:
             user.updateEmail(this.newEmail).then(function(){

               self.$parent.notification('img/redbuttonLogo.svg', "Email is aangepast.");
               this.useremail = this.newEmail;
               self.updateErr = 'Email met succes aangepast...';
               self.newEmail = '';

             }).catch(function(error){console.log(error); self.updateErr = error})


         }else if(this.newPass != '')
         {

           //update password
           user.updatePassword(this.newPass).then(function(){

             self.$parent.notification('img/redbuttonLogo.svg', "Wachtwoord is aangepast.");
             self.updateErr = 'Wachtwoord met succes aangepast...';
             self.newPass = '';

           }).catch(function(error){console.log(error); self.updateErr = error})


         } else if(this.newEmail == '' && this.newPass == '')
         {

            self.$parent.notification('img/redbuttonLogo.svg', "De velden zijn leeg!");

         }

     },


     editmode ()
     {

         this.editMode = !this.editMode;

         if(this.editMode)
         {

           var tl = new TimelineMax();
           tl.staggerTo('.profile form input', 0.3, {scale: 1, ease: Back.easeOut}, 0.2);

         }else{

          var tl = new TimelineMax();
          tl.staggerTo('.profile form input', 0.3, {scale: 0, ease: Back.easeOut}, 0.2);

         }

     }

   }

};
