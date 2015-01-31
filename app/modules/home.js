(function(){

    angular
        .module('modHome', [])
        .controller('Home', ['$scope', homeController])

    /*--------- Controller */
    function homeController($scope) {

        $scope.naam = "Surendra Vikram Singh";
        $scope.intro = "Front-End Developer/Designer";
        document.title = "SVS Designs: Surendra Vikram Singh's Portfolio | UI Developer | India ";
        $scope.social = [
            {'name': 'Dribbble', 'url': 'https://dribbble.com/svsdesigns'},
            {'name': 'Behance', 'url': 'https://www.behance.net/svsdesigns'},
            {'name': 'Flickr', 'url': 'https://www.flickr.com/photos/svsclicks'},
            {'name': 'Linkedin', 'url': 'https://in.linkedin.com/in/svsdesigns'},
            {'name': 'Facebook', 'url': 'https://www.facebook.com/svsdesigns'},
            ];
    }

})();