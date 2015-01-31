(function(){

    angular
        .module('modPhotos', [])
        .controller('Photos', ['$scope', 'FiveHundred', photosController])
        .factory('FiveHundred', ['$rootScope', '$window', photosFactory])


    /*--------- Controller */
    function photosController($scope, FiveHundred) {
        $scope.heading = "Photography";
        document.title = 'Portfolio | Photography';
        FiveHundred.getPhotos(function (fhPx) {
            if (fhPx.success) {
                $scope.pics = fhPx.data.photos;
            } else {
                alert('Unable to complete request: ' + fhPx.status + ' - ' + fhPx.error_message);
            }
        });
    }

    /*--------- Factory */
    function photosFactory($rootScope, $window) {

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
                    sort: 'times_viewed',
                    rpp: '30'
                }, function (response) {

                    $window.sessionStorage.setItem('pxData', JSON.stringify(response));
                    $rootScope.$apply(function () {
                        return callback(response);
                    });


                });

            }
        };

        return photography;
    }

})();