<template>
   <div>

      <h3>មេរៀន</h3>
      <ul style="list-style-type:none" id="ul">
         <li v-for="(nav, index) in navs">
             <router-link :to="url.nav[index]">{{nav}}</router-link>
         </li>
      </ul>

      <h3>លំហាត់</h3>
      <ul style="list-style-type:none">
          <li v-for="(nav, index) in navs1">
               <router-link :to="url.nav1[index]">{{nav}}</router-link>
          </li>
      </ul>
   </div>
</template>


<script>
   export default {
      props: {

      },
      data() {
         return {
            navs : [],
            navs1 : [],
            url: {
               lesson: "",
               type: "",
               num: 0,
               nav: [],
               nav1: []
            },
         }
      },
      created() {
         this.url.lesson = this.$route.params.lesson
         this.url.type = this.$route.params.type
         this.url.num = parseInt(this.$route.params.num)
         this.$http.get("http://localhost:83/api/getnav/"+this.url.lesson).then((data) => {
            this.navs = data.body.nav
            this.navs1 = data.body.nav1
            for (let i=1;i<= this.navs.length; i++) {
               this.url.nav.push('/'+this.url.lesson+"/"+ "lesson" +"/"+ i)
            }
            for (let i=1;i<= this.navs1.length; i++) {
               this.url.nav1.push('/'+this.url.lesson+"/"+"exercise" +"/"+ i)
            }
         })

      }
   }
</script>
