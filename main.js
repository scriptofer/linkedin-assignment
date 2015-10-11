linkedinLoaderApp.controller('mainCtrl',['$scope', 'serUser',
  function($scope, serUser) {
    var init;

    init = function() {
      $scope.config = {};
      $scope.config.url = "";
    };

    $scope.pullUrlData = function() {
      serUser.get( $scope.config.url ).then( function( resp ) {
        console.log( resp.data );
        $scope.user = resp.data;
      });
    };

    init();
  }]);

// Sample Urls:
// https://in.linkedin.com/pub/vishnudas-tekale-kulkarni/20/526/419
// https://in.linkedin.com/in/schandurkar
// https://in.linkedin.com/pub/rohit-raheja/68/a44/45a
