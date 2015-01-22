/* svsdesigns / Surendra V. Singh / 2015-01-22 */
!function(){var a=function(){return"ontouchstart"in window||navigator.MaxTouchPoints>0||navigator.msMaxTouchPoints>0}();angular.module("folio",["ngRoute","ngAnimate"]).run(["$rootScope","$window","$location","$routeParams",function(a,b,c){function d(a){for(var b=0,c=4;c>b;b++){var d=e[b].lastElementChild.hash.split("#")[1];d===a?e[b].classList.add("current"):e[b].classList.remove("current")}}var e=document.querySelectorAll(".nav_primary li");a.$on("$routeChangeSuccess",function(){a.currentPath=c.path(),d(a.currentPath),b.ga("send","pageview",{page:c.path()})})}]).controller("Main",["$scope","$rootScope","$location","Behance","FiveHundred",function(b,c,d,e,f){document.body.classList.add(a?"touch":"no-touch");var g=document.getElementById("hamburger");if(g.addEventListener("click",function(a){document.body.classList.toggle("menu_open"),a.stopPropagation()}),document.addEventListener("click",function(){document.body.classList.contains("menu_open")&&document.body.classList.remove("menu_open")}),!a){var h=window.innerHeight;window.addEventListener("scroll",function(){if("/resume"!==c.currentPath){var a=document.body.scrollTop?document.body.scrollTop:document.documentElement.scrollTop,b=1-a/h,d=document.querySelector(".hero"),e=document.querySelector(".hero h1"),f=7*(100-100*b);d.style.backgroundPosition="0 "+f+"px",b>0&&(e.style.opacity=b,d.style.opacity=b)}})}window.onload=function(){e.getProjects(),f.getPhotos(function(a){a.success?console.log("Data Received"):alert("Unable to complete request: "+a.status+" - "+a.error_message)})}}]).controller("Home",["$scope","$rootScope","$window","Behance","FiveHundred",function(a){a.naam="Surendra Vikram Singh",a.intro="Front-End Developer/Designer",document.title="SVS Designs: Surendra Vikram Singh's Portfolio | UI Developer | India ",a.social=[{name:"Dribbble",url:"https://dribbble.com/svsdesigns"},{name:"Behance",url:"https://www.behance.net/svsdesigns"},{name:"Flickr",url:"https://www.flickr.com/photos/svsclicks"},{name:"Linkedin",url:"https://in.linkedin.com/in/svsdesigns"},{name:"Facebook",url:"https://www.facebook.com/svsdesigns"}]}]).controller("Resume",["$scope","Behance","FiveHundred",function(a){a.naam="Surendra Vikram Singh",a.intro="Front-End Developer/Designer",document.title="Resume | UI Developer | Surendra Vikram Singh"}]).controller("Web",["$scope","Behance","$window",function(a,b,c){a.heading="Frontend Dev",document.title="Portfolio | Design | Development";var d=c.sessionStorage.getItem("beData");if("undefined"!=typeof Storage&&null!==d){var e=angular.fromJson(d);a.projects=e.projects}else b.getProjects().then(function(b){a.projects=b.projects})}]).controller("Photos",["$scope","FiveHundred",function(a,b){a.heading="Photography",document.title="Portfolio | Photography",b.getPhotos(function(b){b.success?a.pics=b.data.photos:alert("Unable to complete request: "+b.status+" - "+b.error_message)})}]).config(["$routeProvider","$locationProvider","$httpProvider",function(a){a.when("/",{templateUrl:"app/views/home.html",controller:"Home"}).when("/web",{templateUrl:"app/views/web.html",controller:"Web"}).when("/photos",{templateUrl:"app/views/photos.html",controller:"Photos"}).when("/resume",{templateUrl:"app/views/resume.html",controller:"Resume"}).otherwise({redirectTo:"/"})}]).factory("FiveHundred",["$rootScope","$window",function(a,b){var c={};return c.getPhotos=function(c){var d=b.sessionStorage.getItem("pxData");return"undefined"!=typeof Storage&&null!==d?c(JSON.parse(d)):void _500px.api("/photos",{feature:"user",username:"svsclicks",image_size:"3",sort:"votes_count",rpp:"63"},function(d){b.sessionStorage.setItem("pxData",JSON.stringify(d)),a.$apply(function(){return c(d)})})},c}]).factory("Behance",["$rootScope","$window","$http","$q",function(a,b,c,d){var e={};return e.getProjects=function(){var a="svsdesigns",e="Up1roNu2wpr0SAWvLkMkaE8d2sS2KWE1";return q=d.defer(),c({method:"jsonp",url:"http://www.behance.net/v2/users/"+a+"/projects",params:{client_id:e,callback:"JSON_CALLBACK",per_page:21,time:"all"}}).success(function(a){b.sessionStorage.setItem("beData",JSON.stringify(a)),q.resolve(a)}),q.promise},e}]),_500px.init({sdk_key:"b3cf6701a6a5014444ee58f00fa11afd54ae6356"})}();