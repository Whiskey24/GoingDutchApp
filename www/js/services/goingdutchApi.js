/**
 * Created by Whiskey on 19-6-2015.
 */

(function () {
    'use strict';

    angular.module('GoingDutchApp').factory('gdApi', [gdApi]);

    function gdApi() {

        var currencies = JSON.parse('["EUR","USD","GBP","CHF"]');

        var groups = JSON.parse('{"1":{"gid":1,"title":"Group 1","subtitle":"group 1 subtitle","picture":"","created_ts":1434605924,"updated_ts":1434615924,"member_count":4,"balance":120.03,"member_create_events":1,"member_other_expense":1,"member_add_member":1,"currency_sign":"EUR","members":{"1":23.23,"2":1542.36,"3":-1000,"5":565.59}},"2":{"gid":2,"title":"Group 2","subtitle":"group 2 subtitle","picture":"","created_ts":1434605924,"updated_ts":1434615924,"member_count":8,"balance":0.07,"member_create_events":1,"member_other_expense":1,"member_add_member":1,"currency_sign":"USD","members":{"1":-857.65,"4":452.85,"6":623.88,"7":219.08}},"3":{"gid":3,"title":"Group 3","subtitle":"group 3 subtitle","picture":"","created_ts":1434605924,"updated_ts":1434615924,"member_count":3,"balance":-123.03,"member_create_events":1,"member_other_expense":1,"member_add_member":1,"currency_sign":"GBP","members":{"8":853.33,"1":11000.36,"3":-5000.76,"5":-6852}},"4":{"gid":4,"title":"Group 4","subtitle":"group 4 subtitle","picture":"","created_ts":1434605924,"updated_ts":1434615924,"member_count":6,"balance":555.48,"member_create_events":1,"member_other_expense":1,"member_add_member":1,"currency_sign":"EUR","members":{"1":853.33,"2":200.36,"3":-2100.76,"5":-1852,"6":782.36,"7":4503.76,"8":-2386}}}');

        var expenses = JSON.parse('{"1":[{"eid":1,"etitle":"group 1 expense 1","cid":1,"ctitle":"drinks","uid":1,"uids":"1,2,3","amount":12.24,"ecreated":1437605924,"eupdated":1437605924},{"eid":2,"etitle":"group 1 expense 2","cid":2,"ctitle":"tickets","uid":2,"uids":"1,5","amount":55.58,"ecreated":1437692324,"eupdated":1437692324},{"eid":3,"etitle":"group 1 expense 3","cid":3,"ctitle":"presents","uid":1,"uids":"2,3,5","amount":123.85,"ecreated":1437778724,"eupdated":1437778724},{"eid":4,"etitle":"group 1 expense 4","cid":1,"ctitle":"drinks","uid":3,"uids":"1,2,3","amount":99.63,"ecreated":1437865124,"eupdated":1437865124},{"eid":5,"etitle":"group 1 expense 5","cid":2,"ctitle":"tickets","uid":1,"uids":"1,2,3","amount":63,"ecreated":1437951524,"eupdated":1437951524},{"eid":6,"etitle":"group 1 expense 6","cid":3,"ctitle":"presents","uid":5,"uids":"1,2,3","amount":891.2,"ecreated":1438037924,"eupdated":1438037924},{"eid":7,"etitle":"group 1 expense 7","cid":1,"ctitle":"drinks","uid":5,"uids":"1,5,3","amount":12.24,"ecreated":1438124324,"eupdated":1438124324},{"eid":8,"etitle":"group 1 expense 8","cid":2,"ctitle":"tickets","uid":3,"uids":"2,3","amount":55.58,"ecreated":1438210724,"eupdated":1438210724},{"eid":9,"etitle":"group 1 expense 9","cid":3,"ctitle":"presents","uid":5,"uids":"1,3","amount":123.85,"ecreated":1438297124,"eupdated":1438297124},{"eid":10,"etitle":"group 1 expense 10","cid":1,"ctitle":"drinks","uid":2,"uids":"1,5","amount":99.63,"ecreated":1438383524,"eupdated":1438383524},{"eid":11,"etitle":"group 1 expense 11","cid":2,"ctitle":"tickets","uid":5,"uids":"2,3,5","amount":63,"ecreated":1438469924,"eupdated":1438469924},{"eid":12,"etitle":"group 1 expense 12","cid":3,"ctitle":"presents","uid":1,"uids":"1,2,5","amount":891.2,"ecreated":1438556324,"eupdated":1438556324},{"eid":13,"etitle":"group 1 expense 13","cid":1,"ctitle":"drinks","uid":5,"uids":"1,2","amount":12.24,"ecreated":1438642724,"eupdated":1438642724},{"eid":14,"etitle":"group 1 expense 14","cid":2,"ctitle":"tickets","uid":3,"uids":"1,3","amount":55.58,"ecreated":1438729124,"eupdated":1438729124},{"eid":15,"etitle":"group 1 expense 15","cid":3,"ctitle":"presents","uid":2,"uids":"1,2,3,5","amount":123.85,"ecreated":1438815524,"eupdated":1438815524},{"eid":16,"etitle":"group 1 expense 16","cid":1,"ctitle":"drinks","uid":2,"uids":"1,2,3,5","amount":99.63,"ecreated":1438901924,"eupdated":1438901924},{"eid":17,"etitle":"group 1 expense 17","cid":2,"ctitle":"tickets","uid":5,"uids":"1,5,3","amount":63,"ecreated":1438988324,"eupdated":1438988324},{"eid":18,"etitle":"group 1 expense 18","cid":2,"ctitle":"tickets","uid":1,"uids":"5,2,3","amount":891.2,"ecreated":1439074724,"eupdated":1439074724},{"eid":19,"etitle":"group 1 expense 19","cid":3,"ctitle":"presents","uid":3,"uids":"1,2,5","amount":123,"ecreated":1439161124,"eupdated":1439161124},{"eid":20,"etitle":"group 1 expense 20","cid":1,"ctitle":"drinks","uid":5,"uids":"1,2,3,5","amount":222.22,"ecreated":1439247524,"eupdated":1439247524}],"2":[{"eid":21,"etitle":"group 2 expense 1","cid":1,"ctitle":"drinks","uid":1,"uids":"1,4,6,7","amount":12.24,"ecreated":1437605924,"eupdated":1437605924},{"eid":22,"etitle":"group 2 expense 2","cid":2,"ctitle":"tickets","uid":7,"uids":"1,2,7","amount":55.58,"ecreated":1437692324,"eupdated":1437692324},{"eid":23,"etitle":"group 2 expense 3","cid":3,"ctitle":"presents","uid":1,"uids":"1,4,7","amount":123.85,"ecreated":1437778724,"eupdated":1437778724},{"eid":24,"etitle":"group 2 expense 4","cid":1,"ctitle":"drinks","uid":4,"uids":"1,4","amount":99.63,"ecreated":1437865124,"eupdated":1437865124},{"eid":25,"etitle":"group 2 expense 5","cid":2,"ctitle":"tickets","uid":7,"uids":"1,7","amount":63,"ecreated":1437951524,"eupdated":1437951524},{"eid":26,"etitle":"group 2 expense 6","cid":3,"ctitle":"presents","uid":7,"uids":"1,6,7","amount":891.2,"ecreated":1438037924,"eupdated":1438037924},{"eid":27,"etitle":"group 2 expense 7","cid":1,"ctitle":"drinks","uid":1,"uids":"1,4,7","amount":12.24,"ecreated":1438124324,"eupdated":1438124324},{"eid":28,"etitle":"group 2 expense 8","cid":2,"ctitle":"tickets","uid":7,"uids":"1,4,7","amount":55.58,"ecreated":1438210724,"eupdated":1438210724},{"eid":29,"etitle":"group 2 expense 9","cid":3,"ctitle":"presents","uid":6,"uids":"1,4","amount":123.85,"ecreated":1438297124,"eupdated":1438297124},{"eid":30,"etitle":"group 2 expense 10","cid":1,"ctitle":"drinks","uid":4,"uids":"1,4,6","amount":99.63,"ecreated":1438383524,"eupdated":1438383524},{"eid":31,"etitle":"group 2 expense 11","cid":2,"ctitle":"tickets","uid":4,"uids":"1,4,6","amount":63,"ecreated":1438469924,"eupdated":1438469924},{"eid":32,"etitle":"group 2 expense 12","cid":3,"ctitle":"presents","uid":1,"uids":"1,7,4","amount":891.2,"ecreated":1438556324,"eupdated":1438556324},{"eid":33,"etitle":"group 2 expense 13","cid":1,"ctitle":"drinks","uid":1,"uids":"1,6,4","amount":12.24,"ecreated":1438642724,"eupdated":1438642724},{"eid":34,"etitle":"group 2 expense 14","cid":2,"ctitle":"tickets","uid":6,"uids":"1,6","amount":55.58,"ecreated":1438729124,"eupdated":1438729124},{"eid":35,"etitle":"group 2 expense 15","cid":3,"ctitle":"presents","uid":4,"uids":"1,7","amount":123.85,"ecreated":1438815524,"eupdated":1438815524},{"eid":36,"etitle":"group 2 expense 16","cid":1,"ctitle":"drinks","uid":4,"uids":"1,4,7","amount":99.63,"ecreated":1438901924,"eupdated":1438901924},{"eid":37,"etitle":"group 2 expense 17","cid":2,"ctitle":"tickets","uid":7,"uids":"1,6,7","amount":63,"ecreated":1438988324,"eupdated":1438988324},{"eid":38,"etitle":"group 2 expense 18","cid":2,"ctitle":"tickets","uid":7,"uids":"6,7","amount":891.2,"ecreated":1439074724,"eupdated":1439074724},{"eid":39,"etitle":"group 2 expense 19","cid":3,"ctitle":"presents","uid":6,"uids":"4,6,7","amount":123,"ecreated":1439161124,"eupdated":1439161124},{"eid":40,"etitle":"group 2 expense 20","cid":1,"ctitle":"drinks","uid":6,"uids":"1,4,6","amount":222.22,"ecreated":1439247524,"eupdated":1439247524}],"3":[{"eid":41,"etitle":"group 3 expense 1","cid":1,"ctitle":"drinks","uid":1,"uids":"1,3,5,8","amount":12.24,"ecreated":1437605924,"eupdated":1437605924},{"eid":42,"etitle":"group 3 expense 2","cid":2,"ctitle":"tickets","uid":3,"uids":"1,8,3","amount":55.58,"ecreated":1437692324,"eupdated":1437692324},{"eid":43,"etitle":"group 3 expense 3","cid":3,"ctitle":"presents","uid":5,"uids":"1,8,3","amount":123.85,"ecreated":1437778724,"eupdated":1437778724},{"eid":44,"etitle":"group 3 expense 4","cid":1,"ctitle":"drinks","uid":8,"uids":"1,5,3","amount":99.63,"ecreated":1437865124,"eupdated":1437865124},{"eid":45,"etitle":"group 3 expense 5","cid":2,"ctitle":"tickets","uid":1,"uids":"1,5,3","amount":63,"ecreated":1437951524,"eupdated":1437951524},{"eid":46,"etitle":"group 3 expense 6","cid":3,"ctitle":"presents","uid":8,"uids":"5,8,3","amount":891.2,"ecreated":1438037924,"eupdated":1438037924},{"eid":47,"etitle":"group 3 expense 7","cid":1,"ctitle":"drinks","uid":5,"uids":"5,8,3","amount":12.24,"ecreated":1438124324,"eupdated":1438124324},{"eid":48,"etitle":"group 3 expense 8","cid":2,"ctitle":"tickets","uid":3,"uids":"8,3","amount":55.58,"ecreated":1438210724,"eupdated":1438210724},{"eid":49,"etitle":"group 3 expense 9","cid":3,"ctitle":"presents","uid":5,"uids":"5,3","amount":123.85,"ecreated":1438297124,"eupdated":1438297124},{"eid":50,"etitle":"group 3 expense 10","cid":1,"ctitle":"drinks","uid":1,"uids":"1,5,3,8","amount":99.63,"ecreated":1438383524,"eupdated":1438383524},{"eid":51,"etitle":"group 3 expense 11","cid":2,"ctitle":"tickets","uid":3,"uids":"1,5,3,8","amount":63,"ecreated":1438469924,"eupdated":1438469924},{"eid":52,"etitle":"group 3 expense 12","cid":3,"ctitle":"presents","uid":8,"uids":"1,5,3,8","amount":891.2,"ecreated":1438556324,"eupdated":1438556324},{"eid":53,"etitle":"group 3 expense 13","cid":1,"ctitle":"drinks","uid":5,"uids":"1,5,3","amount":12.24,"ecreated":1438642724,"eupdated":1438642724},{"eid":54,"etitle":"group 3 expense 14","cid":2,"ctitle":"tickets","uid":3,"uids":"5,3,8","amount":55.58,"ecreated":1438729124,"eupdated":1438729124},{"eid":55,"etitle":"group 3 expense 15","cid":3,"ctitle":"presents","uid":8,"uids":"1,5,8","amount":123.85,"ecreated":1438815524,"eupdated":1438815524},{"eid":56,"etitle":"group 3 expense 16","cid":1,"ctitle":"drinks","uid":1,"uids":"1,5,8","amount":99.63,"ecreated":1438901924,"eupdated":1438901924},{"eid":57,"etitle":"group 3 expense 17","cid":2,"ctitle":"tickets","uid":3,"uids":"1,3,8","amount":63,"ecreated":1438988324,"eupdated":1438988324},{"eid":58,"etitle":"group 3 expense 18","cid":2,"ctitle":"tickets","uid":1,"uids":"1,3,8","amount":891.2,"ecreated":1439074724,"eupdated":1439074724},{"eid":59,"etitle":"group 3 expense 19","cid":3,"ctitle":"presents","uid":8,"uids":"1,5,3,8","amount":123,"ecreated":1439161124,"eupdated":1439161124},{"eid":60,"etitle":"group 3 expense 20","cid":1,"ctitle":"drinks","uid":8,"uids":"1,5,3,8","amount":222.22,"ecreated":1439247524,"eupdated":1439247524}]}');

        var users = JSON.parse('{"1":{"uid":1,"email":"jan@test.com","password":"123123123","firstName":"Jan","lastName":"van den Broek","nickName":"Jantje","picture":"","active":1,"created":"1435658751","updated":"1435662751"},"2":{"uid":2,"email":"jan2@test.com","password":"123123123","firstName":"Jan Alleman","lastName":"van den Broek","nickName":"Jantje2","picture":"","active":1,"created":"1435658751","updated":"1435662751"},"3":{"uid":3,"email":"LangeAchternaam@test.com","password":"123123123","firstName":"Rob","lastName":"met een hele lange Achternaam","nickName":"Rob","picture":"","active":1,"created":"1435658751","updated":"1435662751"},"4":{"uid":4,"email":"whiskey@test.com","password":"123123123","firstName":"Albert Theodorus","lastName":"Santema","nickName":"Whiskey","picture":"","active":1,"created":"1435658751","updated":"1435662751"},"5":{"uid":5,"email":"jan5@test.com","password":"123123123","firstName":"Jan5","lastName":"van den Broek5","nickName":"Jantje5","picture":"","active":1,"created":"1435658751","updated":"1435662751"},"6":{"uid":6,"email":"jan6@test.com","password":"123123123","firstName":"Jan6 Alleman","lastName":"van den Broekkkk","nickName":"Alleman6","picture":"","active":1,"created":"1435658751","updated":"1435662751"},"7":{"uid":7,"email":"LangeAchternaam7@test.com","password":"123123123","firstName":"Rob7","lastName":"met een hele lange Achternaam","nickName":"Rob7","picture":"","active":1,"created":"1435658751","updated":"1435662751"},"8":{"uid":8,"email":"whiskey8@test.com","password":"123123123","firstName":"Albert 8","lastName":"Santema8","nickName":"Whiskey8","picture":"","active":1,"created":"1435658751","updated":"1435662751"}}');

        function getGroupTitle($stateParams){
            return getGroupTitleByGid($stateParams.gid);
        }

        function getGroups() {
            return groups;
        }

        function getUser(uid){
            return users[uid];
        }

        function getUserName(uid) {
            if (typeof(users[uid]) == 'undefined') {
                return "Error: user " + uid + " not found";
            }
            return users[uid]['nickName'];
        }

        function getGroupTitleByGid(gid) {
            return _.pluck(_.filter(groups, {'gid': Number(gid)}), 'title')[0];
        }

        function getGroupMembers(gid) {
            return groups[gid]['members'];
        }

        function getExpenses(gid) {
            return expenses[gid];
        }

        function getExpense(gid,eid){
            return _.filter(expenses[gid], {'eid': Number(eid)})[0];
        }
        function getGroupCurrency(gid)
        {
            //return _.pluck(_.filter(groups, {'gid': Number(gid)}), 'currency_sign')[0];
            return groups[gid]['currency_sign'];
        }

        function setGroupCurrency(gid, currencyCode)
        {
            //for (var i = 0, len = groups.length; i < len; i++) {
            //    if (groups[i].gid == gid) {
            //        groups[i].currency_sign = currencyCode;
            //        break;
            //    }
            //}
            groups[gid].currency_sign = currencyCode;
        }

        function getCurrencies()
        {
            return currencies;
        }

        return {
            getGroups: getGroups,
            getGroupTitle: getGroupTitle,
            getGroupTitleByGid: getGroupTitleByGid,
            getExpenses: getExpenses,
            getExpense: getExpense,
            getGroupCurrency: getGroupCurrency,
            setGroupCurrency: setGroupCurrency,
            getCurrencies: getCurrencies,
            getUser: getUser,
            getUserName: getUserName,
            getGroupMembers: getGroupMembers
        };

    }

})();