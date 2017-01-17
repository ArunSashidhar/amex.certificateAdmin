'use strict';

angular.module('app.auth').factory('User', function ($http, $q, APP_CONFIG, principal) {
    var UserModel = {
        username: undefined,
        picture: undefined,
        update: update
    };

    function update() {
        UserModel.username = principal.identity().$$state.value.name;
    }
    //
    update();

    return UserModel;
});
