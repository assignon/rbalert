var soss = {

    template: `

      <div class="sosAlertContainer">

         <h3>Wil u de sos sturen?</h3>
         <div class="confirmCont">

           <!--<button class="yes" @click="sendSos">Sturen</button>-->
           <img src="img/sender.svg" class="sender" @click="sendSos">
           <button class="no" @click="cancelsos">Annuleren</button>

         </div>

       </div>

    `,


    data ()
    {

       return {

         useremail: this.$parent.userEmail

       }

    },


    created ()
    {

       this.$parent.loadStyle('sos');

    },


    methods: {


      /*sendSos ()
      {

         var self = this;
         Db.sendSOS(this.useremail, function(status){

           if(status)
           {

              self.$parent.notification('img/notificationsIcons/sosnoti.svg', "Sos met succes verzonden. We nemen zo spoedig mogelijk contact met u op.");

           }

         });

      },*/


      sendSos ()
      {

        Animations.hidePopups('sosAlertContainer');
        Animations.hideForm();
        var self = this;
        fb.fireStore().collection('sos').add({

           sos: 'Help....',
           useremail: self.useremail,
           helped: false,
           type: 'sos',
           dateAdded: new Date()

        })
        .then(function(docRef){

          self.$parent.notification('img/redbuttonLogo.svg', "Sos met succes verzonden. We nemen zo spoedig mogelijk contact met u op.");

        })
        .catch(function(error){

          self.$parent.notification('img/redbuttonLogo.svg', error);

        })

      },


      cancelsos ()
      {

         Animations.hidePopups('sosAlertContainer');

      }


    }

}
