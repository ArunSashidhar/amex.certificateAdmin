(function () {
    'use strict';

    angular
        .module('certificate.admin')
        .factory('principal', ['$q', '$http', '$rootScope',
            function ($q, $http, $rootScope) {
                var _identity = undefined,
                    _authenticated = false;

                return {
                    isIdentityResolved: function () {
                        return angular.isDefined(_identity);
                    },
                    isAuthenticated: function () {
                        return _authenticated;
                    },
                    isInRole: function (role) {
                        if (!_authenticated || !_identity.authorities) return false;

                        var hasRole = false;
                        angular.forEach(_identity.authorities, function (authority) {
                            if (!hasRole && authority.authority === role) {
                                hasRole = true;
                            }
                        });
                        return hasRole;
                        //                        return _identity.authorities.indexOf(role) != -1;
                    },
                    isInAnyRole: function (roles) {
                        if (!_authenticated || !_identity.authorities) return false;
                        for (var i = 0; i < roles.length; i++) {
                            if (this.isInRole(roles[i])) return true;
                        }

                        return false;
                    },
                    authenticate: function (identity) {
                        _identity = identity;
                        _authenticated = identity != null;
                    },
                    identity: function (force) {
                        var deferred = $q.defer();

                        if (force === true) _identity = undefined;

                        // check and see if we have retrieved the identity data from the server. if we have, reuse it by immediately resolving
                        if (angular.isDefined(_identity)) {
                            deferred.resolve(_identity);

                            return deferred.promise;
                        }

                        // otherwise, retrieve the identity data from the server, update the identity object, and then resolve.
                        $http.get('user', {
                            ignoreErrors: true
                        })
                            .success(function (data) {
                                if (!data) {
                                    //                                    console.log("error1");
                                    _identity = null;
                                    _authenticated = false;
                                    deferred.resolve(_identity);
                                } else {
                                    //console.log("success");
                                    _identity = data;
                                    _authenticated = true;
                                    deferred.resolve(_identity);
                                }
                            })
                            .error(function () {
                                //                                console.log("error2");
                                _identity = null;
                                _authenticated = false;
                                deferred.resolve(_identity);
                            });
                        return deferred.promise;
                    },
                    logout: function () {
                        $http.post('logout', {}).then(function () {
                            //            console.log('logged out!');
                        }, function () {
                            //            console.log('error logging out');
                        }).finally(function () {
                            $rootScope.$broadcast('residency.loggedOut');
                            _identity = undefined;
                            _authenticated = false;
                            $rootScope.authenticated = false;
                        });
                    }
                };
            }
        ]);


    angular
        .module('certificate.admin')
        .factory('authorization', ['$rootScope', '$state', 'principal',
            function ($rootScope, $state, principal) {
                return {
                    authorize: function () {
                        return principal.identity(true)
                            .then(function () {
                                var isAuthenticated = principal.isAuthenticated();
                                if ($rootScope.toState.data.roles && $rootScope.toState.data.roles.length > 0 && !principal.isInAnyRole($rootScope.toState.data.roles)) {
                                    if (isAuthenticated) $state.go('realLogin'); // user is signed in but not authorized for desired state
                                    else {
                                        // user is not authenticated. stow the state they wanted before you
                                        // send them to the signin state, so you can return them when you're done
                                        $rootScope.returnToState = $rootScope.toState;
                                        $rootScope.returnToStateParams = $rootScope.toStateParams;

                                        // now, send them to the signin state so they can log in
                                        $state.go('realLogin');
                                    }
                                }

                            });
                    }
                };
            }]);

    angular
        .module('certificate.admin')
        .run(['$rootScope', '$state', '$stateParams', 'authorization', 'principal',
            function ($rootScope, $state, $stateParams, authorization, principal) {
                $rootScope.$on('$stateChangeStart', function (event, toState, toStateParams) {
                    // track the state the user wants to go to; authorization service needs this
                    $rootScope.toState = toState;
                    $rootScope.toStateParams = toStateParams;
                    // if the principal is resolved, do an authorization check immediately. otherwise,
                    // it'll be done when the state it resolved.
                    if (principal.isIdentityResolved()) authorization.authorize();
                });
            }
        ]);

})();
