angular.module('blogController', [])

	// inject the Blog service factory into our controller
	.controller('mainController', ['$scope','$http','Blogs', function($scope, $http, Blogs) {
		$scope.formData = {};
		$scope.loading = true;
		$scope.showbtn = false;

		// GET =====================================================================
		// when landing on the page, get all blogs and show them
		// use the service to get all the blogs
		Blogs.get()
		.success(function(data) {
			$scope.blogs = data;
			$scope.loading = false;
		});

		$scope.formatDate = function(date){
			return date.substring(0, 10);
		}
		// CREATE ==================================================================
		// when submitting the add form, send the text to the node API
		$scope.createBlog = function() {

			// validate the formData to make sure that something is there
			// if form is empty, nothing will happen
			if ($scope.formData.text != undefined) {
				$scope.loading = true;

				// call the create function from our service (returns a promise object)
				Blogs.create($scope.formData)

					// if successful creation, call our get function to get all the new blogs
					.success(function(data) {
						$scope.loading = false;
						$scope.formData = {}; // clear the form so our user is ready to enter another
						$scope.blogs = data; // assign our new list of blogs
					});
				}
				$scope.showbtn = false;
			};

			$scope.showControls = function(){
				if($scope.showbtn == false){
					$scope.showbtn = true;
				}else{
					$scope.showbtn = false;
					
				}

			}

		// DELETE ==================================================================
		// delete a blog after checking it
		$scope.deleteBlog = function(id) {
			$scope.loading = true;
			if(confirm("are you sure")){
				Blogs.delete(id)
				// if successful creation, call our get function to get all the new blogs
				.success(function(data) {
					$scope.loading = false;
					$scope.blogs = data; // assign our new list of blogs
				});
			}
			getAll();
		};

		var getAll = function(){
		Blogs.get()
			.success(function(data) {
				$scope.blogs = data;
				$scope.loading = false;
			});
		}

		$scope.create = function(that){
			alert(that);
			alert(that.visible);
			that.visible=display;

		}
	}]);