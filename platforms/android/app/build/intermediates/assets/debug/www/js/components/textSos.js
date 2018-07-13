var textSos = {

   template: `

     <div class="sosTextContainer">

       <img src="img/close.svg" alt="" @click="hideTextSos">

        <form class="" action="" method="">

          <textarea name="" rows="8" cols="80" v-model="textSos" placeholder="beschrijf uw probleem..."></textarea>
          <img src="img/sender.svg" class="sender" @click.prevent="sendTextSos">
          <!--<input type="submit" name="" value="Sturen" @click.prevent="sendTextSos">-->

        </form>

     </div>

   `,


   data ()
   {

     return {

         textSos: '',
         useremail: this.$parent.userEmail

     }

   },


   created ()
   {

      this.$parent.loadStyle('textsos');

   },


   methods: {

        sendTextSos ()
        {

          var self = this;
          if(this.textSos != '')
          {

            Animations.hidePopups('sosTextContainer');
            fb.fireStore().collection('sos').add({

               sos: self.textSos,
               useremail: self.useremail,
               helped: false,
               type: 'text_sos',
               dateAdded: new Date()

            })
            .then(function(docRef){

              this.textSos = "";
              self.$parent.notification('img/redbuttonLogo.svg', 'Text SOS met succes vestuurd! Uw wordt zo spoedig mogelijk geholpen.');

            })
            .catch(function(error){

              self.$parent.notification('img/redbuttonLogo.svg', error);

            })

          }else{

            this.$parent.notification('img/redbuttonLogo.svg', 'De text veld is leeg...')

          }

        },

        /* sendTextSos ()
         {

           /*var sosTextData = {

             'date_sended': '03/04/2018 11:49:00 AM',
             'sosType': 'sosText',
             'sosContent': this.textSos,
             'user': Users.usersData.currentUser.email

             }

             if(this.textSos != '')
             {



               this.textSos = '';

             }else{

                alert('De text veld is leeg...');

             }*/

            /* if(this.textSos != '')
             {

                 var self = this;
                 Db.sendTextSOS(this.useremail, this.textSos, function(){

                   Animations.hidePopups('sosTextContainer');
                   self.$parent.notification('img/notificationsIcons/text.svg', 'Text SOS met succes vestuurd! Uw wordt zo spoedig mogelijk geholpen.');

                 });

             }else{

               this.$parent.notification('img/notificationsIcons/errormsg.svg', 'De text veld is leeg...')

             }

         },*/


         hideTextSos ()
         {

           Animations.hidePopups('sosTextContainer');

         }

     }

}
