var userHistory = {

   template: `

     <div class="userHistory">

       <div class="userHistoryGlobe">

           <div class="historyHead">

               <div class="alertsIcon" id="sosFilter" @click="alertFilter($event, 'userSos')"><img src="img/notificationsicons/sos.svg" alt=""></div>
               <div class="alertsIcon" id="sosTextFilter" @click="alertFilter($event, 'userSostext')"><img src="img/text.svg" alt=""></div>
               <div class="userInfo">

                  <div class="curAlert" id="sosAllFilter"><img src="img/allHistories.svg" alt="" class="curAlerticon"></div>
                  <h4>{{ username }}</h4>
                  <p>{{ useremail }}</p>

              </div>
               <div class="alertsIcon" id="sosCameraFilter" @click="alertFilter($event, 'userSosfoto')"><img src="img/camera.svg" alt=""></div>
               <div class="alertsIcon" id="sosvideoFilter" @click="alertFilter($event, 'userSosvideo')"><img src="img/video.svg" alt=""></div>
               <div class="alertsIcon" id="sosAllFilterclone" @click="alertFilter($event, 'userSosall')"><img src="img/allHistories.svg" alt=""></div>

           </div>

           <div class="historyBody">

              <div class="separator sosSeparator">

                 <hr/>
                 <img src="img/notificationsicons/sosdark.svg" alt="">
                 <hr/>

              </div>

              <div class="userhistoriessos" id="userSos">

                 <div class="noSosData" v-if="curUserSosCount == 0">

                    <h3>Geen sos vestuurd!!!</h3>

                 </div>

                 <div class="usersos" v-else v-for="sos in curUserSosData[0]">

                     <p>{{ sos.sos }}<small :class="sos.docId"> [{{ sos.dateAdded.toDate().toString().slice(0,15) }}] </small></p>
                     <img src="img/send.svg" class="sendsos" :id="sos.docId" @click="sosViewed($event,'sos', 'usersos')">
                     <!--<button :id="sos.docId" @click="sosViewed($event,'sos', 'usersos')">Helpen</button>-->
                     <!--<button v-else>Geholpen</button>-->

                 </div>

              </div>

              <div class="separator textSeparator">

                 <hr/>
                 <img src="img/textdark.svg" alt="">
                 <hr/>

              </div>

              <div class="userhistoriessos" id="userSostext">

                <div class="noSosData" v-if="curUserTextSosCount == 0">
                  <h3>Geen tekst sos vestuurd!!!</h3>
                </div>

                <div class="usersostext" v-else v-for="sostext in curUserSosData[1]">

                  <p v-if="viewmore" class="allMsg">{{sostext.sos}}<p>
                  <p v-if="!viewmore">{{sostext.sos | sniped}}<p>
                  <small :class="sostext.docId">{{sostext.dateAdded.toDate().toString().slice(0,15)}}</small>
                  <div class="sosTxtCtrl">

                    <img src="img/arrow.svg" alt="" v-if="viewmore" class="arrowtop" @click="viewMore(false)">
                    <img src="img/arrow.svg" alt="" v-if="!viewmore" class="arrowdown" @click="viewMore(true)">
                    <img src="img/send.svg" alt="" :id="sostext.docId" class="textVieuwed" @click="sosViewed($event,'sos', 'usersostext')" v-if="viewmore">

                  </div>

                </div>

              </div>

              <div class="separator fotoSeparator">

                 <hr/>
                 <img src="img/cameradark.svg" alt="">
                 <hr/>

              </div>

              <div class="userhistoriessos" id="userSosfoto">

                <div class="noSosData" v-if="curUserFotoSosCount == 0">
                 <h3>Geen foto sos vestuurd!!!</h3>
                </div>

                <div class="usersoscameraCont" v-else></div>

                <!--<div class="usersoscamera" v-else v-for="sosfoto in curUserSosData[2]">

                   <img :src="sosfoto.fileSrc" alt="">
                   <p>{{ sosfoto.sos}}</p>
                   <small :class="sosfoto.docId">{{sosfoto.dateAdded.toDate()}}</small>
                   <button :id="sosfoto.docId" @click="sosViewed($event,'camera_sos', 'usersoscamera')">Helpen</button>

                </div>-->

              </div>

              <div class="separator videoSeparator">

                 <hr/>
                 <img src="img/videodark.svg" alt="">
                 <hr/>

              </div>

              <div class="userhistoriessos" id="userSosvideo">

                  <div class="noSosData" v-if="curUserVideoSosCount == 0">
                   <h3>Geen video sos vestuurd!!!</h3>
                  </div>

                  <div class="usersosvideo" v-else v-for="sosvideo in curUserSosData[3]">

                    <video :src="sosvideo.fileSrc" alt=""></video>
                    <p>{{ sosvideo.sos}}</p>
                    <small :class="sosvideo.docId">{{sosvideo.dateAdded.toDate().toString().slice(0,15)}}</small>
                    <button :id="sosvideo.docId" @click="sosViewed($event,'camera_sos', 'usersosvideo')">Helpen</button>

                  </div>

              </div>

           </div>

       </div>

     </div>

   `,


   data ()
   {

      return {

        curUserSosData: [],
        username: null,
        useremail: null,
        curUserSosCount: null,
        curUserTextSosCount: null,
        curUserFotoSosCount: null,
        curUserVideoSosCount: null,
        viewmore: false,
        sosFilterArr: ['sosAllFilterclone']

      }

   },


   created ()
   {

      this.$parent.loadStyle('userHistory');
      this.username = this.$store.state.curUserName;
      this.useremail = this.$store.state.curUserEmail;

      var self = this;
      this.$store.state.curUser.forEach(function(curuserdata){

        self.curUserSosData.push(curuserdata);

      });
      //this.curUserSosCount =*/ this.curUserSosData[0].length;
      /*this.curUserSosCount =*/ fb.fireStore().collection('sos').where('useremail',"==", this.useremail).where("type", "==", 'sos').where("helped", "==", false).get().then(function(snapshot){self.curUserSosCount = snapshot.docs.length;});
      /*this.curUserTextSosCount =*/ fb.fireStore().collection('sos').where('useremail',"==", this.useremail).where("type", "==", 'text_sos').where("helped", "==", false).get().then(function(snapshot){self.curUserTextSosCount = snapshot.docs.length;});
      /*this.curUserFotoSosCount =*/ fb.fireStore().collection('cameraSos').where('useremail',"==", this.useremail).where("type", "==", 'foto').where("helped", "==", false).get().then(function(snapshot){self.curUserTextSosCount = snapshot.docs.length;});
      /*this.cueUserVideoSosCount =*/ fb.fireStore().collection('cameraSos').where('useremail',"==", this.useremail).where("type", "==", 'video').where("helped", "==", false).get().then(function(snapshot){self.curUserVideoSosCount = snapshot.docs.length;});
      console.log(this.curUserSosData);
      this.getFotoVideoSosUrl(this.useremail, 'foto');
      this.getFotoVideoSosUrl(this.useremail, 'video');

   },


   mounted ()
   {

     Animations.hide('#sosAllFilterclone', function(tl){tl.to('#sosAllFilterclone',0, {display: 'none', ease: Back.easeOut}, '-0.5');});

   },


   methods: {

       getFotoVideoSosUrl (email, type)
       {

         var self = this;
         fb.fireStore().collection('cameraSos')
         .where("useremail", "==", email)
         .where("type", "==", type)
         .where("helped", "==", false)
         .get().then(function(snapshot){

            snapshot.forEach(function(sosData){

              fb.fireStorage().ref(sosData.data().type+'Sos/'+sosData.data().fileName).getDownloadURL()
              .then(function(url){

                var usersoscameraCont = document.querySelector('.usersoscameraCont');
                var usersoscamera = document.createElement('div');
                usersoscamera.className = 'usersoscamera';

                var sosImg = document.createElement('img');
                sosImg.src = url;

                var sosImgConten = document.createElement('p');
                sosImgConten.textContent = sosData.data().sos;

                var sosImgDate = document.createElement('small');
                sosImgDate.className = sosData.id;
                //sosImgDate.textContent = sosData.data().dateAdded.toString().slice(0,16);
                sosImgDate.textContent = sosData.data().dateAdded.toDate().toString().slice(0,15);

                var sosImgVieuw = document.createElement('img');
                sosImgVieuw.id = sosData.id;
                sosImgVieuw.className = "fileVieuwed";
                sosImgVieuw.src = 'img/send.svg';

                if(sosData.data().sos != '')
                {

                  usersoscamera.appendChild(sosImg);
                  usersoscamera.appendChild(sosImgConten);
                  usersoscamera.appendChild(sosImgDate);
                  usersoscamera.appendChild(sosImgVieuw);

                }else{

                  usersoscamera.appendChild(sosImg);
                  usersoscamera.appendChild(sosImgDate);
                  usersoscamera.appendChild(sosImgVieuw);

                }
                usersoscameraCont.appendChild(usersoscamera);

                sosImgVieuw.addEventListener('click', function(e){self.sosViewed(e,'cameraSos', 'usersoscamera')})

              }).catch(function(error){

                  console.log(error);

              });

            })

          });

       },


       sosViewed (e,sosType,sosParent)
       {

          var doc = e.currentTarget.id;
          //var sosParent = e.currentTarget.parentNode;
          var self = this;
          //var date = document.querySelector('.'+doc).textContent;

        /*  this.$http.get(this.$parent.host+'/RBA/requests/sos_answered.php?collectionName='+sosType+'&sos_id='+sosId+'&userEmail='+this.useremail).then(function(res){


             self.$parent.notification('img/notificationsIcons/sosnoti.svg', res.data);

          })*/

          fb.fireStore().collection(sosType).doc(doc).update({

             "helped": true

          }).then(function(){

              self.$parent.notification('img/redbuttonLogo.svg', 'Een bericht is naar de hudige gebruiker verzonden..');
              fb.fireStore().collection('messages').add({

                 date_added: new Date(),
                 msg: 'Uw verzoek om hulp op date is nu in behandeling. Uw krijgt binnen 3 werkdagen een email.',
                 readed: false,
                 useremail: self.useremail

              }).then(function(docRef){

                //self.viewmore = false;
                console.log('Msg added succesfully');

              }).catch(function(error){

                console.log(usersEntireContainer);

              });

          })

          Animations.hide(e.currentTarget.parentNode, function(tl){

            tl.to(e.currentTarget.parentNode,0.7, {display: 'none', ease: Back.easeOut}, '-0.5');

          });
          //sosParent.style.display = "none";

       },



       alertFilter (e, sosType)
       {

          /* var curAlerticon = document.querySelector('.curAlerticon');
           var curAlerticonSrc = curAlerticon.src;*/

           var sosAllFilter = document.getElementById('sosAllFilter');
           var sosAllFilterImgSrc = sosAllFilter.childNodes[0].src;
           var sosAllFilterId = sosAllFilter.id;

           var clickedAlert = e.currentTarget;
           var clickedAlertSrc = clickedAlert.childNodes[0].src;
           var self = this;

           Animations.hide(clickedAlert, function(tl){

               tl.to(clickedAlert, 0.5, {display: 'none', ease: Back.easeOut});
               sosAllFilter.childNodes[0].src = clickedAlert.childNodes[0].src;

               if(self.sosFilterArr.length != 0)
               {

                 tl.to('#'+self.sosFilterArr[0], 0.7, {scale: 1, display: 'flex', ease: Back.easeOut});
                 self.sosFilterArr.shift();
                 self.sosFilterArr.push(clickedAlert.id);

               }

           });

           var userhistoriessos = document.querySelectorAll('.userhistoriessos');

/**** ja weet ik best lelijk maar was beetje lui om een goede algorhytme te bedenken. sorrryyy!!!!!****/
           var tl = new TimelineMax();
           if(sosType == 'userSos')
           {

             this.filterBysos(sosType, tl);

           }else if(sosType == 'userSostext')
           {

              this.filterBysostext(sosType, tl);

           }else if(sosType == 'userSosfoto')
           {

              this.filterBysoscamera(sosType, tl);

           }else if(sosType == 'userSosvideo')
           {

              this.filterBysosvideo(sosType, tl);

           }else if(sosType == 'userSosall')
           {

              this.filterByallsos(sosType, tl);

           }


          /* if(sosType != 'userSosall')
           {

             Animations.hide('.userhistoriessos', function(tl){

               //tl.to('.userhistoriessos', 0, {display: 'none', ease: Back.easeOut});
               tl.to('#'+sosType, 0, {scale: 1, ease: Back.easeOut});

             });

           }else{

             Animations.show('.userhistoriessos', function(tl){

               return false;

             });

           }*/

       },


       filterBysos (sosType,tl)
       {

         tl.to('#'+sosType+',.sosSeparator', 0, {scale: 1, display: 'flex', ease: Back.easeOut});
         tl.to('#userSosall', 0.5, {scale: 0, display: 'none', ease: Back.easeOut});
         tl.to('#userSostext, .textSeparator', 0.5, {scale: 0, display: 'none', ease: Back.easeOut});
         tl.to('#userSosfoto, .fotoSeparator', 0.5, {scale: 0, display: 'none', ease: Back.easeOut});
         tl.to('#userSosvideo, .videoSeparator', 0.5, {scale: 0, display: 'none', ease: Back.easeOut});

       },


       filterBysostext (sosType, tl)
       {

         tl.to('#'+sosType+',.textSeparator', 0, {scale: 1, display: 'flex', ease: Back.easeOut});
         tl.to('#userSosall', 0.5, {scale: 0, display: 'none', ease: Back.easeOut});
         tl.to('#userSos, .sosSeparator', 0.5, {scale: 0, display: 'none', ease: Back.easeOut});
         tl.to('#userSosfoto, .fotoSeparator', 0.5, {scale: 0, display: 'none', ease: Back.easeOut});
         tl.to('#userSosvideo, .videoSeparator', 0.5, {scale: 0, display: 'none', ease: Back.easeOut});

       },


       filterBysoscamera (sosType,tl)
       {

         tl.to('#'+sosType+',.fotoSeparator', 0, {scale: 1, display: 'flex', ease: Back.easeOut});
         tl.to('#userSosall', 0.5, {scale: 0, display: 'none', ease: Back.easeOut});
         tl.to('#userSostext, .textSeparator', 0.5, {scale: 0, display: 'none', ease: Back.easeOut});
         tl.to('#userSos, .sosSeparator', 0.5, {scale: 0, display: 'none', ease: Back.easeOut});
         tl.to('#userSosvideo, .videoSeparator', 0.5, {scale: 0, display: 'none', ease: Back.easeOut});

       },


       filterBysosvideo (sosType,tl)
       {

         tl.to('#'+sosType+',.videoSeparator', 0, {scale: 1, display: 'flex', ease: Back.easeOut});
         tl.to('#userSosall', 0.5, {scale: 0, display: 'none', ease: Back.easeOut});
         tl.to('#userSostext, .textSeparator', 0.5, {scale: 0, display: 'none', ease: Back.easeOut});
         tl.to('#userSosfoto, .fotoSeparator', 0.5, {scale: 0, display: 'none', ease: Back.easeOut});
         tl.to('#userSos, .sosSeparator', 0.5, {scale: 0, display: 'none', ease: Back.easeOut});

       },


       filterByallsos (sosType,tl)
       {

         tl.to('#userSos,.sosSeparator', 0.5, {scale: 1, display: 'flex', ease: Back.easeOut});
         tl.to('#userSosall', 0.5, {scale: 1, display: 'flex', ease: Back.easeOut});
         tl.to('#userSostext, .textSeparator', 0.5, {scale: 1, display: 'flex', ease: Back.easeOut});
         tl.to('#userSosfoto, .fotoSeparator', 0.5, {scale: 1, display: 'flex', ease: Back.easeOut});
         tl.to('#userSosvideo, .videoSeparator', 0.5, {scale: 1, display: 'flex', ease: Back.easeOut});

       },


       viewMore (state)
       {

         this.viewmore = state;

       }

   }


}
