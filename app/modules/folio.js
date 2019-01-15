(function () {

    angular.module('folio', ['ngRoute', 'ngAnimate', 'modResume', 'modWeb', 'modHome'])

        .run(['$rootScope', '$window', '$location', '$routeParams', 'Behance', function ($rootScope, $window, $location, $routeParams, Behance) {
            //console.log('run');
            $rootScope.$on('$routeChangeSuccess', function (newRoute, oldRoute) {
                 check.hashPath = $location.path();
             });
       
            headerScroll();

        // Calling all the Robots
        window.onload = function () {
            Behance.getProjects();

            /*FiveHundred.getPhotos(function (fhPx) {
                if (fhPx.success) {
                } else {
                    alert('Unable to complete request: ' + fhPx.status + ' - ' + fhPx.error_message);
                }
            });*/

        };
    }])

        .config(['$routeProvider', '$locationProvider', '$httpProvider', function ($routeProvider, $locationProvider, $httpProvider) {
            //console.log('congig');
        $routeProvider.when('/', {
            templateUrl: 'app/views/home.html',
            controller: 'Home'
        })
            .when('/web', {
            templateUrl: 'app/views/web.html',
            controller: 'Web'
        })

            .when('/photos', {
            templateUrl: 'app/views/photos.html',
            controller: 'Photos'
        })
            .when('/resume', {
            templateUrl: 'app/views/resume.html',
            controller: 'Resume'
        })
            .otherwise({
            redirectTo: '/'
        });
    }])

        .directive('offcanvasMenu', function () {
        return {
            restrict: 'A',
            scope: {},
            templateUrl: 'app/directives/menu.html',
            controller: ['$scope', '$rootScope', '$window', '$location', '$routeParams', function ($scope, $rootScope, $window, $location, $routeParams) {

                hamMenu();

                $scope.menu_items = document.querySelectorAll('.nav_primary li');

                // Hash change 
                $rootScope.$on('$routeChangeSuccess', function (newRoute, oldRoute) {

                    $rootScope.currentPath = $location.path();
                    $scope.currentPath = $rootScope.currentPath;
                    // Selected link called
                    currSelect($rootScope.currentPath, $scope.menu_items);

                    //Google analytics page view
                    ga('send', 'pageview', {
                        page: $location.path()
                    });

                });
            }]
        };
    });


    /*--------- All onload functions --------------*/

    

    var check = {
        hashPath: ''
    }

    // 500px key for ajax request
    /*_500px.init({
        sdk_key: 'b3cf6701a6a5014444ee58f00fa11afd54ae6356'
    });*/

    // Checking for touch devices
    var is_touch_device = (function is_touch_device() {
        return (('ontouchstart' in window) || (navigator.MaxTouchPoints > 0) || (navigator.msMaxTouchPoints > 0));
    })();

    // Close Menu on document click
    document.addEventListener('click', function () {
        if (document.body.classList.contains('menu_open')) {
            document.body.classList.remove('menu_open');
        }
    });

    // Adding classes to touch related classes
    if (!is_touch_device) {
        document.body.classList.add('no-touch');
    } else {
        document.body.classList.add('touch');
    }

    //Hamburger click event
    function hamMenu() {

        var ham = document.getElementById('hamburger');
        ham.addEventListener('click', function (e) {

            // Event tracking
            ga('send', 'event', 'button', 'click', 'menu-click');

            // Menu toggle
            document.body.classList.toggle('menu_open');
            e.stopPropagation();
        });
    }

    // Check which link is selected in menu
    function currSelect(path, itemList) {

        for (var i = 0, len = 4; i < len; i++) {

            var attrHref = itemList[i].lastElementChild.hash.split('#')[1];
            if (attrHref === path) {
                itemList[i].classList.add('current');
            } else {
                itemList[i].classList.remove('current');
            }
        }
    }

    // Header scroll animation
    function headerScroll() {
        if (!is_touch_device) {

            var heg = window.innerHeight;

            window.addEventListener('scroll', function () {
                //console.log(check.hashPath);
                if (check.hashPath !== '/resume') {

                    var scrlPosition = document.body.scrollTop ? document.body.scrollTop : document.documentElement.scrollTop,
                        svs = 1 - (scrlPosition / heg)*2,
                        header = document.querySelector('.hero'),
                        heading = document.querySelector('.hero h1'),
                        tp = (100 - (svs * 100))*0.25;
                    //header.style.backgroundPosition = '0 ' + tp + 'px';
                    if (svs > 0) {
                        heading.style.WebkitTransform = "translate3d(0, " + tp + "px, 0) rotate(-10deg)";
                        heading.style.MozTransform = "translate3d(0, " + tp + "px, 0) rotate(-10deg)";
                        heading.style.transform = "translate3d(0, " + tp + "px, 0) rotate(-10deg)";
                        heading.style.opacity = svs;
                        heading.style.opacity = svs;
                    }
                }

            });

        }
    }

})();