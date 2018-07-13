var msgsContents = {



     template: `

     <div class="msgscontentContainer">

        <div v-if="msgsCount == 0">

         <img src="img/msgs.svg" alt="" class="noMsgImg">
         <h3> U hebt geen bericht!</h3>

        </div>

        <div class="usersMsgsContainer" v-else>

           <div class="msgEntireContainer" v-for="userMsg in userMsgs">

             <div class="usersMsgs" :class="[userMsg.readed == 1 ? readed : '', unreaded]">

               <img src="img/notificationsIcons/msgsred.svg" alt="">
               <p class="content"v-if="userMsg.readed">Gelezen...</p>
               <p class="content"v-else>{{ userMsg.msg | sniped }}</p>
               <!--<small class="date"> {{userMsg.date_added}}</small>-->
               <img class="readmore" src="img/more-options.svg" alt="" @click="readMore($event)"/>

             </div>

             <div class="entireMsg" :id="userMsg.id">

               <p class="entireContent">{{ userMsg.msg }}</p>
               <small class="entireDate">{{userMsg.date_sended}}</small>
               <button @click="msgreaded($event)">Gelezen</button>

             </div>

           </div>

       </div>

     </div>

     `,


     data ()
     {

       return {

         msgs: window.localStorage.getItem('messages'),
         msgsCount: '',
         userMsgs: [],
         useremail: this.$parent.userEmail,
         readed: 'readed',
         unreaded: 'unreaded',
         msgReaded: false

       }

     },


     created ()
     {

        this.$parent.loadStyle('msgsContent');
        this.msgCount();
        this.displayMsgs();
     },


     mounted ()
     {


     },


     methods:{

      /*   displayMsgs ()
         {

             //var messagesArr = ['hallooo'];
             Db.getMsgs(this.useremail, function(data){

              // Users.usersMessages.push(data);
              var usersMsgsContainer = document.querySelector('.usersMsgsContainer');

                 data.forEach(function(msgs){

                    //userMessages.push(msgs);
                    var usersMsgs = document.createElement('div');
                    usersMsgs.className = 'usersMsgs';
                    usersMsgs.id = msgs.id;

                    var msgIcon = document.createElement('img');
                    msgIcon.src = "img/notificationsIcons/msgs.svg";

                    var msgLen = msgs.msg;
                    var sliceMsg;

                    if(msgLen.length > 10)
                    {

                       sliceMsg = msgLen.slice(0,15)+'...';

                    }else{

                      sliceMsg = msgs.msg;

                    }


                    var content = document.createElement('p');
                    content.className = 'content';
                    content.innerHTML = sliceMsg;

                    var date = document.createElement('p');
                    date.className = 'date';
                    date.innerHTML = msgs.date_sended;


                    //var usersMsgs = document.querySelector('.usersMsgs');

                    usersMsgs.appendChild(msgIcon);
                    usersMsgs.appendChild(content);
                    usersMsgs.appendChild(date);

                    usersMsgsContainer.appendChild(usersMsgs);

                    usersMsgs.addEventListener('click', function(e){

                       Db.userMsgReaded(this.useremail, e.currentTarget.id);

                    })

                 })

             });
//return userMessages;
}*/

          msgCount: function()
          {

            /*  this.$http.get(this.$parent.host+'/RBA/requests/msgsCountRows.php?useremail='+this.useremail).then(function(res){

                 this.msgsCount = res.data;

               })*/
               var self = this;
               fb.fireStore().collection('messages').where('useremail','==',self.useremail)
               .get().then(function(snapshot){

                  self.msgsCount = snapshot.docs.length;

               })
               console.log(self.msgsCount);

           },


          displayMsgs ()
          {

            /* this.$http.get(this.$parent.host+'/RBA/requests/users_msgs.php?useremail='+this.useremail).then(function(res){

                var self = this;
                res.data.forEach(function(msgdata){

                  self.userMsgs.push(msgdata);

                })

             })*/

             var self = this;
             fb.fireStore().collection('messages').where('useremail','==',this.useremail)
             .get().then(function(snapshot){

                self.$parent.loaderOut();
                snapshot.forEach(function(msdData){

                  var data = {

                    date_added: msdData.data().date_added,
                    msg: msdData.data().msg,
                    readed: msdData.data().readed,
                    useremail: msdData.data().useremail,
                    id:msdData.id

                  };
                  self.userMsgs.push(data);
                  //Animations.callStaggerElems('msgEntireContainer');

                })

             })

          },


          readMore (e)
          {

            //e.currentTarget.parentNode.childNodes[2].style.display = 'flex';
            //this.msgReaded = state;
            e.currentTarget.parentNode.parentNode.childNodes[2].style.display = 'flex';

          },


          msgreaded (e)
          {

             e.currentTarget.parentNode.parentNode.childNodes[2].style.display = 'none';
             var msgId = e.currentTarget.parentNode.id;
             fb.fireStore().collection('messages').doc(msgId).update({

               readed: true

             }).then(function(){

               

             })

          }

    }

}
