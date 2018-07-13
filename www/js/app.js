/*var app = {
    // Application Constructor
    initialize: function() {
        document.addEventListener('deviceready', this.onDeviceReady.bind(this), false);
    },


    onDeviceReady: function() {
        this.receivedEvent('deviceready');
    }

};*/


new Vue ({

  store: store,

  el: "#app",

  data: {

    host: /*'http://192.168.0.104',*/ 'http://127.0.0.1:8888',
    userLoggegStatus: Users.isUserLogged(),
    isUseradmin: Users.isUserAdmin(),
    childs: null,
    userEmail: window.localStorage.getItem('userEmail'),
    templateName: 'sos',
    msgsCounts: ""

  },


  components: {

    'headermenu': headerMenu,
    'notifications': notification,
    'sos': alerts,
    'lrform': forms,
    'msg': messages,
    'msgscontents': msgsContents,
    'novelty': novelty,
    'info': info,
    'sosalert': soss,
    'textsos': textSos,
    'camerasos': cameraSos,
    'videosos': videoSos,
    'users': users,
    'userHistory': userHistory,
    'userProfil': userProfil,
    'appmenu': appMenu

  },


  created ()
  {

     //Animations.displaySos();
     this.usersAuth();

     //Helpers.renderTemplate(this.templateName);

  },



  mounted (){

    Animations.launchScreen();
    this.childs = this.$children;//this.notification('img/camera.svg', 'cameraaaaaaa');

  },



  methods: {


    loadStyle (styleFiles)
    {

      var stylesheet = document.createElement('link');
      stylesheet.setAttribute('type', 'text/css');
      stylesheet.setAttribute('rel', 'stylesheet');
      stylesheet.setAttribute('href', 'css/'+styleFiles+'.css');
      document.head.appendChild(stylesheet);

    },



    usersAuth ()
    {

        var userState = Db.onAuthStateChanged();

        if (userState != null) {

            this.userLoggegStatus = true;

        }else {

          this.userLoggegStatus = false

        }

    },



    chgUserState (userGrade)
    {

        var appChilds = this.$children;

        appChilds.forEach(function(childs)
        {

          childs.userLogged = true;
          childs.userIsAadmin = userGrade;

        })

    },



    notification (icon, content)
    {

      Animations.callNotification();
      this.childs[1].notifContent = content;
      this.childs[1].notificationIcon = icon;

    },

    loaderIn (icon, content)
    {

      Animations.callLoader();
      this.childs[1].notifContent = content;
      this.childs[1].notificationIcon = icon;

    },


    loaderOut ()
    {

      Animations.hideLoader();

    },


    templateName (name)
    {

       return name;

    },


    getMsgCount (useremail, callback)
    {

      this.$http.get(this.host+'/RBA/requests/msgsCountRows.php?useremail='+useremail).then(function(res){

         callback(res.data);
         //this.$store.state.msgscount = res.data;
         //this.$store.commit('updateCount', res.data);

      })

    }


  }


});
