(function () {

    var is_touch_device = (function is_touch_device() {
        return (('ontouchstart' in window) || (navigator.MaxTouchPoints > 0) || (navigator.msMaxTouchPoints > 0));
    })();



    angular.module('folio', ['ngRoute', 'ngAnimate'])

    .run(['$rootScope', '$window', '$location', '$routeParams', function($rootScope, $window, $location, $routeParams) {

        var menu_items = document.querySelectorAll('.nav_primary li');

        function currSelect(path) {

            for(var i =0, len = 4; i < len; i++) {

                var mh = menu_items[i].lastElementChild.hash.split('#')[1];
                if(mh === path) {
                    menu_items[i].classList.add('current');
                }
                else{
                    menu_items[i].classList.remove('current');
                }
            }
        }

        $rootScope.$on('$routeChangeSuccess', function(newRoute, oldRoute) {

            $rootScope.currentPath = $location.path();

            currSelect($rootScope.currentPath);

            $window.ga('send', 'pageview', { page: $location.path() });

        });
    }])

    /*--------- Controllers --------------*/
    .controller('Main', ['$scope','$rootScope', '$location', 'Behance', 'FiveHundred', function ($scope, $rootScope, $location, Behance, FiveHundred) {

        if(!is_touch_device) {
            document.body.classList.add('no-touch');
        }
        else{
            document.body.classList.add('touch');
        }

        //Hamburger click event
        var ham = document.getElementById('hamburger');
        ham.addEventListener('click', function (e) {
            document.body.classList.toggle('menu_open');
            e.stopPropagation();
        });

        // Select current item in menu
        // var menu_items = document.querySelector('.nav_primary');
        // menu_items.addEventListener('click', function (e) {

        //     var tar = e.target,
        //         tarName = e.target.nodeName,
        //         tarParent = tar.parentNode.nodeName,
        //         parentClass = tar.parentNode.classList,

        //         childs = e.currentTarget.childNodes;

        //     for (var i = 0; i < childs.length; i++) {
        //         if (childs[i].nodeType === 1 && childs[i].classList.contains('current')) {
        //             e.currentTarget.childNodes[i].classList.remove('current');
        //         }
        //     }

        //     if (tarName === 'A' && tarParent === 'LI') {
        //         parentClass.add('current');

        //     }

        // });

        // Close Menu on document click
        document.addEventListener('click', function(){
            if(document.body.classList.contains('menu_open')) {
                document.body.classList.remove('menu_open');
            }
        })

        if(!is_touch_device){

            var heg = window.innerHeight;

            window.addEventListener('scroll', function () {

                if($rootScope.currentPath !== '/resume'){

                    var scrlPosition = document.body.scrollTop ? document.body.scrollTop : document.documentElement.scrollTop,
                        svs = 1 - (scrlPosition / heg),
                        header = document.querySelector('.hero'),
                        heading = document.querySelector('.hero h1'),
                        tp = (100 - (svs * 100))*7;

                    header.style.backgroundPosition = '0 ' + tp + 'px';
                    if (svs > 0) {
                        heading.style.opacity = svs;
                        header.style.opacity = svs;
                    }
                }

            });

        }

        // Calling all the Robots
        Behance.getProjects();

        FiveHundred.getPhotos(function (fhPx) {
            if (fhPx.success) {
                console.log('Data Received');
            } else {
                alert('Unable to complete request: ' + fhPx.status + ' - ' + fhPx.error_message);
            }
        });
    }])


    /*--------- Home */
    .controller('Home', ['$scope', 'Behance', 'FiveHundred', function ($scope, Behance, FiveHundred) {
        $scope.naam = "Surendra Vikram Singh";
        $scope.intro = "Front-End Developer/Designer";
        document.title = "SVS Designs: Surendra Vikram Singh's Portfolio | UI Developer | India ";
        $scope.social = [
            {'name': 'Dribbble', 'url': 'https://dribbble.com/svsdesigns'},
            {'name': 'Behance', 'url': 'https://www.behance.net/svsdesigns'},
            {'name': 'Flickr', 'url': 'https://www.flickr.com/photos/svsclicks'},
            {'name': 'Linkedin', 'url': 'https://in.linkedin.com/in/svsdesigns'},
            {'name': 'Facebook', 'url': 'https://www.facebook.com/svsdesigns'},
            ]
    }])

     /*--------- Resume */
    .controller('Resume', ['$scope', 'Behance', 'FiveHundred', function ($scope, Behance, FiveHundred) {
        $scope.naam = "Surendra Vikram Singh";
        $scope.intro = "Front-End Developer/Designer";
        document.title = 'Resume | UI Developer | Surendra Vikram Singh';
    }])

    /*--------- Design */
    .controller('Web', ['$scope', 'Behance', '$window', function ($scope, Behance, $window) {
        $scope.heading = "Frontend Dev";
        document.title = 'Portfolio | Design | Development';

        var localProjects = $window.sessionStorage.getItem('beData');

        if (typeof (Storage) !== 'undefined' && localProjects !== null) {
            var svs = angular.fromJson(localProjects);
            $scope.projects = svs.projects;
        } else {
            Behance.getProjects().then(function (resp, stat) {
                $scope.projects = resp.projects;
            });
        }

    }])

    /*--------- Photography */
    .controller('Photos', ['$scope', 'FiveHundred', function ($scope, FiveHundred) {
        $scope.heading = "Photography";
        document.title = 'Portfolio | Photography';
        FiveHundred.getPhotos(function (fhPx) {
            if (fhPx.success) {
                $scope.pics = fhPx.data.photos;
            } else {
                alert('Unable to complete request: ' + fhPx.status + ' - ' + fhPx.error_message);
            }
        });
    }])

    /*--------- Configuration --------------*/
    .config(['$routeProvider', '$locationProvider', '$httpProvider', function ($routeProvider, $locationProvider, $httpProvider) {

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

    /*--------- Factories --------------*/

    /*--------- Factory for 500px data */
    .factory('FiveHundred', ['$rootScope', '$window', function ($rootScope, $window) {

        var photography = {};

        photography.getPhotos = function (callback) {

            var localPhotos = $window.sessionStorage.getItem('pxData');

            if (typeof (Storage) !== 'undefined' && localPhotos !== null) {

                return callback(JSON.parse(localPhotos));

            } else {

                _500px.api('/photos', {
                    feature: 'user',
                    username: 'svsclicks',
                    image_size: '3',
                    sort: 'votes_count',
                    rpp: '63'
                }, function (response) {

                    $window.sessionStorage.setItem('pxData', JSON.stringify(response));
                    $rootScope.$apply(function () {
                        return callback(response);
                    });


                });

            }
        };

        return photography;

    }])

    /*--------- Factory for Behance data */
    .factory('Behance', ['$rootScope', '$window', '$http', '$q', function ($rootScope, $window, $http, $q) {

        var webDesign = {};

        webDesign.getProjects = function () {

            var user = 'svsdesigns',
                apiKey = 'ZLBxK9rEfHwJf9K0rmseNr2fS2gS2HJW';
            q = $q.defer();
            $http({
                method: 'jsonp',
                url: 'http://www.behance.net/v2/users/' + user + '/projects',
                params: {
                    client_id: apiKey,
                    callback: 'JSON_CALLBACK',
                    per_page: 21,
                    time: 'all'
                }
            }).success(function (data) {
                $window.sessionStorage.setItem('beData', JSON.stringify(data));
                q.resolve(data);
            });
            return q.promise;
        };

        return webDesign;
    }])

    // 500px key for ajax request
    _500px.init({
        sdk_key: 'b3cf6701a6a5014444ee58f00fa11afd54ae6356'
    });

})();