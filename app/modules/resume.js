(function(){

    angular
        .module('modResume', [])
        .controller('Resume', ['$scope','BioData', '$window', resumeController])
        .factory('BioData', ['$window', '$http', '$q', resumeFactory])

        /*--------- Controller */
        function resumeController($scope, BioData, $window){
            
            document.title = 'Resume | UI Developer | Surendra Vikram Singh';


            var localResume = $window.sessionStorage.getItem('bioData');

            if (typeof (Storage) !== 'undefined' && localResume !== null) {

                $scope.resumeData = angular.fromJson(localResume);

            } else {
                BioData.getData()
                .then(function (resp, stat) {
                    $scope.resumeData = resp;
                });
            }

            trackDownload();
        }

        /*--------- factory */
        function resumeFactory($window, $http, $q) {

            var resume = {};

            resume.getData = function () {

                q = $q.defer();
                $http({
                    method: 'get',
                    url: 'app/data/resume.json'
                })
                .success(function (data) {
                    $window.sessionStorage.setItem('bioData', JSON.stringify(data));
                    q.resolve(data);
                });
                return q.promise;
            };
            return resume;
        }

        /*--------- Google Analytics resume download tracking */
        function trackDownload() {
            var downloadElem = document.getElementById('resume_download');

            downloadElem.addEventListener('click', function(e) {
                // Event tracking
                console.log(this.href);
                ga('send', 'event', 'download', 'click', 'resume-downloaded');

            });
        }

})();
