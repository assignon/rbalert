var novelty = {

  template: `

     <div class="novelty page">

        <div class="noNovelty" v-if="novelties == 0">

           <h3> All nieuw technologieen bij Red Button </h3>

        </div>

        <div class="noveltiesCont" v-else>

          <div class="noveltyContent" v-if="this.$store.state.curnoveltycontent">
             <img src="img/leftarrow.svg" alt="" class="backToNovelty" @click="showNovelties">
             <div class="noveltyImg" :style="{backgroundImage: noveltyImg}"></div>
             <h2>{{noveltytitel}}</h2>
             <p class="content" v-html="noveltyContent"></p>

          </div>


          <div class="noveltys">

          </div>

        </div>

     </div>

  `,


  data ()
  {

     return {

       novelties: 1,
       curnoveltycontent: this.$store.state.curnoveltycontent,
       noveltiesdata: noveltiesdata,
       noveltyContent: '',
       noveltyImg: '',
       noveltytitel: ''

     }

  },


  created ()
  {

    this.$parent.loadStyle('novelty');
    console.log(this.noveltiesdata);

  },


  mounted ()
  {

   this.displayNovelties();

  },


  methods: {

    displayNovelties ()
    {

      var novelties = document.querySelector('.noveltys');
      var self = this;
      this.noveltiesdata.forEach(function(novelty){

          var novels = document.createElement('div');
          novels.className = 'novels';
          novels.style.backgroundColor = novelty.color;
          novels.style.border = '1px solid'+ novelty.color;

          var novelsImg = document.createElement('div');
          novelsImg.className = "novelsImg";
          novelsImg.id = novelty.imgSrc;
          //novelsImg.src = 'img/novelties/'+novelty.imgSrc;
          novelsImg.style.backgroundImage = "url(img/novelties/"+novelty.imgSrc+")";
          novelsImg.style.backgroundPosition= 'center';
          novelsImg.style.backgroundSize= 'cover';
          novelsImg.style.backgroundRepeat= 'no-repeat';

          var novelsTitel = document.createElement('h5');
          novelsTitel.textContent = novelty.name;

          var novelsIntro = document.createElement('p');
          novelsIntro.textContent = novelty.intro.substr(0,150)+'...';

          novels.appendChild(novelsImg);
          novels.appendChild(novelsTitel);
          novels.appendChild(novelsIntro);

          novelties.appendChild(novels);

          novels.addEventListener('click', function(e){

            var tl = new TimelineMax();
            tl.staggerTo('.novels', 0.3, {scale: 0, ease: Back.easeIn}, 0.2);
             var noveltyName = e.currentTarget.childNodes[1].textContent;
             var noveltyId = e.currentTarget.childNodes[0].id;
             self.noveltyImg = 'url(img/novelties/'+noveltyId+')';
             self.displayNoveltiescontent(noveltyName);

          })

      })

    },

    displayNoveltiescontent (noveltyName)
    {

      var content = document.querySelector('.content');
      var self = this;
      this.$store.state.curnoveltycontent = true;
      this.noveltytitel = noveltyName;
      this.noveltiesdata.filter(function(curNovelty){

         if(curNovelty.name == noveltyName)
         {

           self.noveltyContent = curNovelty.content;

         }

      })

    },

    showNovelties ()
    {

      this.$store.state.curnoveltycontent = false;
      var tl = new TimelineMax();
      tl.staggerTo('.novels', 0.5, {scale: 1, ease: Back.easeOut}, 0.3);

    }

  }

}
