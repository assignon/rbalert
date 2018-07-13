var store = new Vuex.Store({

  state: {

     uploadedImg: null,
     uploadedVideo: null,
     curUserName: null,
     curUserEmail: null,
     collectionsCount: [],
     users: [],
     curUser: [],
     curnoveltycontent: false

  },

  getters: {



  },

  mutations: {

    userData: function(state, data){

        state.users.push(data);

    },

    curUserData: function(state, data){

        if(state.curUser.length < 4)
        {

          state.curUser.push(data);

        }else{

          state.curUser = [];
          state.curUser.push(data);

        }

    }

  },

  actions: {

     commitUserData: function(store, data)
     {

        store.commit('userData', data);

      },

      commitCurUserData: function(store, data)
      {

         store.commit('curUserData', data);

       }

  }

})
