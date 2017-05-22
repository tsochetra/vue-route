<template>
   <div>

    <nav class="navbar navbar-inverse navbar-fixed-top" role="navigation">
        <div class="container">
            <div class="navbar-header">
                <router-link class="navbar-brand" to="/">TSOCHETRA</router-link>
            </div>

        </div>
    </nav>
    <div class="container" id="fade">
        <div class="row">
            <div class="col-lg-12">
                <h1 class="page-header">{{watch.lesson}} :
                    <small>{{watch.title}}</small>
                </h1>
            </div>
        </div>

        <div class="row" id="fade">

            <div class="col-md-8">
                <iframe class="player" width="100%" height="100%" :src="'https://www.youtube.com/embed/'+watch.yt_id+'?modestbranding=1&controls=2&autohide=1&wmode=transparent&html5=1&autoplay=1'" frameborder="0" allowfullscreen="1"></iframe>
            </div>

            <div class="col-md-4">
               <appexercise></appexercise>
            </div>

        </div>

         <appcredit></appcredit>
        <hr>


        <footer>
            <div class="row">
                <div class="col-lg-12">
                    <p></p>
                </div>
            </div>

        </footer>

    </div>
<!--
    <script src="/js/jquery.js"></script>

    <script src="/js/bootstrap.min.js"></script>
    <script type="text/javascript">
    	var url = location.href;
    	var split = url.split("/");
    	var num = split.pop();
    	var type = split[split.length - 1];
    	if (type == "lesson") {
    		$(".lesson"+num+"").css({
    			"color": "red"
    		});
    	} else {
    		$(".exercise"+num+"").css({
    			"color": "red"
    		});
    	}



    </script> -->

   </div>
</template>

<script>

import Exercise from './watch/Nav.vue'
import Credit from './watch/Credit.vue'

   export default {
      components: {
         appexercise: Exercise,
         appcredit: Credit
      },
      data() {
         return {
            params : {
               lesson: "",
               type: "",
               num: 0
            },
            watch: {
               title: "",
               type: "",
               yt_id: ""
            }
         }
      },
      methods: {
         getData: function() {
            let route = this.$route
            let lesson = this.params.lesson = route.params.lesson
            let type = this.params.type = route.params.type
            let num = this.params.num = parseInt(route.params.num)
            this.$http.get("http://localhost:83/api/"+lesson+"/"+type+"/"+num).then((data) => {
               if (data.body.status = "OK") {
                  this.watch.title = data.body.title
                  this.watch.lesson = data.body.lesson
                  this.watch.yt_id = data.body.yt_id
               }
            })
         }
      },
      mounted() {
         this.getData()
      },
      watch: {
         '$route' (to, from) {
            this.getData()
         }
      }
   }
</script>
<style scoped>
   @import './assets/css/portfolio-item.css';
</style>
