(function(){

    angular
        .module('modWeb', [])
        .controller('Web', ['$scope', 'Behance', '$window', webController])
        .factory('Behance', ['$window', '$http', '$q', webFactory])


    /*--------- Controller */
    function webController($scope, Behance, $window) {

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
    }
    

    /*--------- Factory */
    function webFactory($window, $http, $q) {

        var webDesign = {};

        webDesign.getProjects = function () {

            var user = 'svsdesigns',
                apiKey = 'Up1roNu2wpr0SAWvLkMkaE8d2sS2KWE1';
            q = $q.defer();
            $http({
                method: 'jsonp',
                url: 'https://www.behance.net/v2/users/' + user + '/projects',
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
    }

    

})();