/**
 * Created by Whiskey on 19-6-2015.
 */

(function () {
    'use strict';

    angular.module('GoingDutchApp').factory('goingdutchApi', [goingdutchApi]);

    function goingdutchApi() {

        var groups = JSON.parse('[{"gid":1,"title":"Group 1","subtitle":"group 1 subtitle","picture":"","created_ts":1434605924,"updated_ts":1434615924,"member_count":14,"balance":120.03,"member_create_events":1,"member_other_expense":1,"member_add_member":1},{"gid":2,"title":"Group 2","subtitle":"group 2 subtitle","picture":"","created_ts":1434605924,"updated_ts":1434615924,"member_count":8,"balance":0.07,"member_create_events":1,"member_other_expense":1,"member_add_member":1},{"gid":3,"title":"Group 3","subtitle":"group 3 subtitle","picture":"","created_ts":1434605924,"updated_ts":1434615924,"member_count":3,"balance":-123.03,"member_create_events":1,"member_other_expense":1,"member_add_member":1},{"gid":4,"title":"Group 4","subtitle":"group 4 subtitle","picture":"","created_ts":1434605924,"updated_ts":1434615924,"member_count":6,"balance":555.48,"member_create_events":1,"member_other_expense":1,"member_add_member":1}]');

        var selectedGroup = 0;

        function setGroup(gid) {
            console.log("Setting group to ", gid);
            this.selectedGroup = gid;
        }

        function selectedGroup() {
            return selectedGroup;
        }

        function getGroups() {
            return groups;
        }

        function getGroupTitle(gid) {
            return _.pluck(_.filter(groups, {'gid': Number(gid)}), 'title')[0];
        }

        return {
            selectedGroup: selectedGroup,
            setGroup: setGroup,
            getGroups: getGroups,
            getGroupTitle: getGroupTitle
        };

    }


})();