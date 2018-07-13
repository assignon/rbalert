var cameraSos = {

   template: `

     <div class="camerasos">

      <img src="img/close.svg" alt="" @click="hideCameraSos" class="closeCamera">

        <div class="fotoCont">

           <img src="" alt="" class="cameraFoto">

        </div>

        <form action="" method="">

          <textarea name="" rows="8" cols="80" placeholder="Beschrijving (niet verplicht)" v-model="cameraSosVal"></textarea>
          <img src="img/sender.svg" class="sender" @click.prevent="sendCameraSos">
          <!--<input type="submit" name="" value="Sturen" @click.prevent="sendCameraSos">-->

        </form>

     </div>

   `,


   data ()
   {

     return {

       userLogged: this.$parent.userLoggegStatus,
       userIsAadmin: this.$parent.isUseradmin,
       useremail: this.$parent.userEmail,
       cameraSosVal: '',
       uploadedImg: null

     }

   },


   created ()
   {

      this.$parent.loadStyle('cameraSos');

   },


   methods: {

     sendCameraSos ()
     {

      /*  Db.insertCameraSos(this.useremail, this.uploadedImg, this.cameraSosVal, function(response){

           self.$parent.notification('img/notificationsIcons/camerasos.svg', response);

        });*/
        var self = this;

        /*this.$http.get(this.$parent.host+'/RBA/requests/insertCameraSos.php?imgSrc='+this.$store.state.uploadedImg+'&imgDesc='+this.cameraSosVal+'&useremail='+this.useremail).then(function(res){

           self.$parent.notification('img/notificationsIcons/camerasos.svg', res);

        });*/

        var numbers = '0123456789';
        var numbersLen = numbers.length;
        var randNumber = '';
        var startNb = 0;

        while(startNb < 10)
        {

           randNumber += Math.floor(Math.random() * numbersLen);
           startNb++;

        }

        fb.fireStore().collection('cameraSos').add({

           fileName: 'fotosos'+randNumber,
           helped: false,
           sos: self.cameraSosVal,
           type: 'foto',
           useremail: self.useremail,
           dateAdded: new Date()

        }).then(function(docRef){

           self.$parent.notification('img/redbuttonLogo.svg', 'Camera sos met succes vestuurd');

        }).catch(function(error){

           self.$parent.notification('img/redbuttonLogo.svg', error);

        });

        console.log(randNumber);

        var imageDataUrl = 'data:text/plain;base64,'+self.$store.state.uploadedImg;
        var ref = fb.fireStorage().ref('fotoSos/fotosos'+randNumber);
        ref.putString(imageDataUrl, 'data_url')
        .then(function(snapshot){

          console.log('file succesfully uploaded to firebase storage');
          self.hideCameraSos();

        });

     },


     hideCameraSos ()
     {

       Animations.hidePopups('camerasos');
       var cameraFoto = document.querySelector('.cameraFoto');
       cameraFoto.src = '';

     }

   }

}
