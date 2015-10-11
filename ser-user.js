linkedinLoaderApp.factory('serUser', ['$http', function($http) {
  var url = 'users',
      loadUrlData;

  loadUrlData = function( linkUrl ) {
    return $http( {
      method: 'POST',
      url: url,
      data: {
        linkUrl: linkUrl
      }
    } );
  };

  return {
    get: loadUrlData
  };
}]);
