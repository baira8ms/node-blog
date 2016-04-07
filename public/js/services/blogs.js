angular.module('blogService', [])

	// super simple service
	// each function returns a promise object 
	.factory('Blogs', ['$http',function($http) {
		return {
			get : function() {
				return $http.get('/api/blogs');
			},
			create : function(blogData) {
				return $http.post('/api/blogs', blogData);
			},
			update : function(blog) {
				return $http.put('/api/blogs', blog);
			},
			delete : function(id) {
				return $http.delete('/api/blogs/' + id);
			},
			completeBlogInfo : function(id){
				return $http.get('/api/blogs/' + id);
			}
		}
	}]);