/**
 * Created by Whiskey on 19-6-2015.
 */

(function () {
    'use strict';

    angular.module('GoingDutchApp').factory('gdApi', [gdApi]);

    function gdApi() {

        console.log("Running API");
        var currencies = JSON.parse('["EUR","USD","GBP","CHF"]');

        var groups = JSON.parse('[' +
            '{"gid":1,"title":"Group 1","subtitle":"group 1 subtitle","picture":"","created_ts":1434605924,"updated_ts":1434615924,"member_count":14,"balance":120.03,"member_create_events":1,"member_other_expense":1,"member_add_member":1,"currency_sign":"EUR"},' +
            '{"gid":2,"title":"Group 2","subtitle":"group 2 subtitle","picture":"","created_ts":1434605924,"updated_ts":1434615924,"member_count":8,"balance":0.07,"member_create_events":1,"member_other_expense":1,"member_add_member":1,"currency_sign":"USD"},' +
            '{"gid":3,"title":"Group 3","subtitle":"group 3 subtitle","picture":"","created_ts":1434605924,"updated_ts":1434615924,"member_count":3,"balance":-123.03,"member_create_events":1,"member_other_expense":1,"member_add_member":1,"currency_sign":"GBP"},' +
            '{"gid":4,"title":"Group 4","subtitle":"group 4 subtitle","picture":"","created_ts":1434605924,"updated_ts":1434615924,"member_count":6,"balance":555.48,"member_create_events":1,"member_other_expense":1,"member_add_member":1,"currency_sign":"EUR"}]');

        var expenses = JSON.parse('{"1":[{"eid":1,"etitle":"group 1 expense 1","cid":1,"ctitle":"drinks","uid":1,"uids":"1,2,3","amount":12.24,"ecreated":1437605924,"eupdated":1437605924},{"eid":2,"etitle":"group 1 expense 2","cid":2,"ctitle":"tickets","uid":2,"uids":"1,2,3","amount":55.58,"ecreated":1437692324,"eupdated":1437692324},{"eid":3,"etitle":"group 1 expense 3","cid":3,"ctitle":"presents","uid":1,"uids":"1,2,3","amount":123.85,"ecreated":1437778724,"eupdated":1437778724},{"eid":4,"etitle":"group 1 expense 4","cid":1,"ctitle":"drinks","uid":3,"uids":"1,2,3","amount":99.63,"ecreated":1437865124,"eupdated":1437865124},{"eid":5,"etitle":"group 1 expense 5. Dit is een uitgave met een hele lange omschrijving om te kijken of dat wel goed gaat in de lists van ionic. Dus bijv. door middel van gebruik van text-wrap etc.","cid":2,"ctitle":"tickets","uid":1,"uids":"1,2,3","amount":63,"ecreated":1437951524,"eupdated":1437951524},{"eid":6,"etitle":"group 1 expense 6","cid":3,"ctitle":"presents","uid":2,"uids":"1,2,3","amount":891.2,"ecreated":1438037924,"eupdated":1438037924},{"eid":7,"etitle":"group 1 expense 7","cid":1,"ctitle":"drinks","uid":1,"uids":"1,2,3","amount":12.24,"ecreated":1438124324,"eupdated":1438124324},{"eid":8,"etitle":"group 1 expense 8","cid":2,"ctitle":"tickets","uid":3,"uids":"1,2,3","amount":55.58,"ecreated":1438210724,"eupdated":1438210724},{"eid":9,"etitle":"group 1 expense 9","cid":3,"ctitle":"presents","uid":3,"uids":"1,2,3","amount":123.85,"ecreated":1438297124,"eupdated":1438297124},{"eid":10,"etitle":"group 1 expense 10","cid":1,"ctitle":"drinks","uid":2,"uids":"1,2,3","amount":99.63,"ecreated":1438383524,"eupdated":1438383524},{"eid":11,"etitle":"group 1 expense 11","cid":2,"ctitle":"tickets","uid":3,"uids":"1,2,3","amount":63,"ecreated":1438469924,"eupdated":1438469924},{"eid":12,"etitle":"group 1 expense 12","cid":3,"ctitle":"presents","uid":1,"uids":"1,2,3","amount":891.2,"ecreated":1438556324,"eupdated":1438556324},{"eid":13,"etitle":"group 1 expense 13","cid":1,"ctitle":"drinks","uid":1,"uids":"1,2,3","amount":12.24,"ecreated":1438642724,"eupdated":1438642724},{"eid":14,"etitle":"group 1 expense 14","cid":2,"ctitle":"tickets","uid":3,"uids":"1,2,3","amount":55.58,"ecreated":1438729124,"eupdated":1438729124},{"eid":15,"etitle":"group 1 expense 15","cid":3,"ctitle":"presents","uid":2,"uids":"1,2,3","amount":123.85,"ecreated":1438815524,"eupdated":1438815524},{"eid":16,"etitle":"group 1 expense 16","cid":1,"ctitle":"drinks","uid":2,"uids":"1,2,3","amount":99.63,"ecreated":1438901924,"eupdated":1438901924},{"eid":17,"etitle":"group 1 expense 17","cid":2,"ctitle":"tickets","uid":1,"uids":"1,2,3","amount":63,"ecreated":1438988324,"eupdated":1438988324},{"eid":18,"etitle":"group 1 expense 18","cid":2,"ctitle":"tickets","uid":1,"uids":"1,2,3","amount":891.2,"ecreated":1439074724,"eupdated":1439074724},{"eid":19,"etitle":"group 1 expense 19","cid":3,"ctitle":"presents","uid":3,"uids":"1,2,3","amount":123,"ecreated":1439161124,"eupdated":1439161124},{"eid":20,"etitle":"group 1 expense 20","cid":1,"ctitle":"drinks","uid":3,"uids":"1,2,3","amount":222.22,"ecreated":1439247524,"eupdated":1439247524}],"2":[{"eid":21,"etitle":"group 2 expense 1","cid":1,"ctitle":"drinks","uid":1,"uids":"1,2,3","amount":12.24,"ecreated":1437605924,"eupdated":1437605924},{"eid":22,"etitle":"group 2 expense 2","cid":2,"ctitle":"tickets","uid":2,"uids":"1,2,3","amount":55.58,"ecreated":1437692324,"eupdated":1437692324},{"eid":23,"etitle":"group 2 expense 3","cid":3,"ctitle":"presents","uid":1,"uids":"1,2,3","amount":123.85,"ecreated":1437778724,"eupdated":1437778724},{"eid":24,"etitle":"group 2 expense 4","cid":1,"ctitle":"drinks","uid":3,"uids":"1,2,3","amount":99.63,"ecreated":1437865124,"eupdated":1437865124},{"eid":25,"etitle":"group 2 expense 5","cid":2,"ctitle":"tickets","uid":1,"uids":"1,2,3","amount":63,"ecreated":1437951524,"eupdated":1437951524},{"eid":26,"etitle":"group 2 expense 6","cid":3,"ctitle":"presents","uid":2,"uids":"1,2,3","amount":891.2,"ecreated":1438037924,"eupdated":1438037924},{"eid":27,"etitle":"group 2 expense 7","cid":1,"ctitle":"drinks","uid":1,"uids":"1,2,3","amount":12.24,"ecreated":1438124324,"eupdated":1438124324},{"eid":28,"etitle":"group 2 expense 8","cid":2,"ctitle":"tickets","uid":3,"uids":"1,2,3","amount":55.58,"ecreated":1438210724,"eupdated":1438210724},{"eid":29,"etitle":"group 2 expense 9","cid":3,"ctitle":"presents","uid":3,"uids":"1,2,3","amount":123.85,"ecreated":1438297124,"eupdated":1438297124},{"eid":30,"etitle":"group 2 expense 10","cid":1,"ctitle":"drinks","uid":2,"uids":"1,2,3","amount":99.63,"ecreated":1438383524,"eupdated":1438383524},{"eid":31,"etitle":"group 2 expense 11","cid":2,"ctitle":"tickets","uid":3,"uids":"1,2,3","amount":63,"ecreated":1438469924,"eupdated":1438469924},{"eid":32,"etitle":"group 2 expense 12","cid":3,"ctitle":"presents","uid":1,"uids":"1,2,3","amount":891.2,"ecreated":1438556324,"eupdated":1438556324},{"eid":33,"etitle":"group 2 expense 13","cid":1,"ctitle":"drinks","uid":1,"uids":"1,2,3","amount":12.24,"ecreated":1438642724,"eupdated":1438642724},{"eid":34,"etitle":"group 2 expense 14","cid":2,"ctitle":"tickets","uid":3,"uids":"1,2,3","amount":55.58,"ecreated":1438729124,"eupdated":1438729124},{"eid":35,"etitle":"group 2 expense 15","cid":3,"ctitle":"presents","uid":2,"uids":"1,2,3","amount":123.85,"ecreated":1438815524,"eupdated":1438815524},{"eid":36,"etitle":"group 2 expense 16","cid":1,"ctitle":"drinks","uid":2,"uids":"1,2,3","amount":99.63,"ecreated":1438901924,"eupdated":1438901924},{"eid":37,"etitle":"group 2 expense 17","cid":2,"ctitle":"tickets","uid":1,"uids":"1,2,3","amount":63,"ecreated":1438988324,"eupdated":1438988324},{"eid":38,"etitle":"group 2 expense 18","cid":2,"ctitle":"tickets","uid":1,"uids":"1,2,3","amount":891.2,"ecreated":1439074724,"eupdated":1439074724},{"eid":39,"etitle":"group 2 expense 19","cid":3,"ctitle":"presents","uid":3,"uids":"1,2,3","amount":123,"ecreated":1439161124,"eupdated":1439161124},{"eid":40,"etitle":"group 2 expense 20","cid":1,"ctitle":"drinks","uid":3,"uids":"1,2,3","amount":222.22,"ecreated":1439247524,"eupdated":1439247524}],"3":[{"eid":41,"etitle":"group 3 expense 1","cid":1,"ctitle":"drinks","uid":1,"uids":"1,2,3","amount":12.24,"ecreated":1437605924,"eupdated":1437605924},{"eid":42,"etitle":"group 3 expense 2","cid":2,"ctitle":"tickets","uid":2,"uids":"1,2,3","amount":55.58,"ecreated":1437692324,"eupdated":1437692324},{"eid":43,"etitle":"group 3 expense 3","cid":3,"ctitle":"presents","uid":1,"uids":"1,2,3","amount":123.85,"ecreated":1437778724,"eupdated":1437778724},{"eid":44,"etitle":"group 3 expense 4","cid":1,"ctitle":"drinks","uid":3,"uids":"1,2,3","amount":99.63,"ecreated":1437865124,"eupdated":1437865124},{"eid":45,"etitle":"group 3 expense 5","cid":2,"ctitle":"tickets","uid":1,"uids":"1,2,3","amount":63,"ecreated":1437951524,"eupdated":1437951524},{"eid":46,"etitle":"group 3 expense 6","cid":3,"ctitle":"presents","uid":2,"uids":"1,2,3","amount":891.2,"ecreated":1438037924,"eupdated":1438037924},{"eid":47,"etitle":"group 3 expense 7","cid":1,"ctitle":"drinks","uid":1,"uids":"1,2,3","amount":12.24,"ecreated":1438124324,"eupdated":1438124324},{"eid":48,"etitle":"group 3 expense 8","cid":2,"ctitle":"tickets","uid":3,"uids":"1,2,3","amount":55.58,"ecreated":1438210724,"eupdated":1438210724},{"eid":49,"etitle":"group 3 expense 9","cid":3,"ctitle":"presents","uid":3,"uids":"1,2,3","amount":123.85,"ecreated":1438297124,"eupdated":1438297124},{"eid":50,"etitle":"group 3 expense 10","cid":1,"ctitle":"drinks","uid":2,"uids":"1,2,3","amount":99.63,"ecreated":1438383524,"eupdated":1438383524},{"eid":51,"etitle":"group 3 expense 11","cid":2,"ctitle":"tickets","uid":3,"uids":"1,2,3","amount":63,"ecreated":1438469924,"eupdated":1438469924},{"eid":52,"etitle":"group 3 expense 12","cid":3,"ctitle":"presents","uid":1,"uids":"1,2,3","amount":891.2,"ecreated":1438556324,"eupdated":1438556324},{"eid":53,"etitle":"group 3 expense 13","cid":1,"ctitle":"drinks","uid":1,"uids":"1,2,3","amount":12.24,"ecreated":1438642724,"eupdated":1438642724},{"eid":54,"etitle":"group 3 expense 14","cid":2,"ctitle":"tickets","uid":3,"uids":"1,2,3","amount":55.58,"ecreated":1438729124,"eupdated":1438729124},{"eid":55,"etitle":"group 3 expense 15","cid":3,"ctitle":"presents","uid":2,"uids":"1,2,3","amount":123.85,"ecreated":1438815524,"eupdated":1438815524},{"eid":56,"etitle":"group 3 expense 16","cid":1,"ctitle":"drinks","uid":2,"uids":"1,2,3","amount":99.63,"ecreated":1438901924,"eupdated":1438901924},{"eid":57,"etitle":"group 3 expense 17","cid":2,"ctitle":"tickets","uid":1,"uids":"1,2,3","amount":63,"ecreated":1438988324,"eupdated":1438988324},{"eid":58,"etitle":"group 3 expense 18","cid":2,"ctitle":"tickets","uid":1,"uids":"1,2,3","amount":891.2,"ecreated":1439074724,"eupdated":1439074724},{"eid":59,"etitle":"group 3 expense 19","cid":3,"ctitle":"presents","uid":3,"uids":"1,2,3","amount":123,"ecreated":1439161124,"eupdated":1439161124},{"eid":60,"etitle":"group 3 expense 20","cid":1,"ctitle":"drinks","uid":3,"uids":"1,2,3","amount":222.22,"ecreated":1439247524,"eupdated":1439247524}]}');

        function getGroupTitle($stateParams){
            return getGroupTitleByGid($stateParams.gid);
        }

        function getGroups() {
            return groups;
        }

        function getGroupTitleByGid(gid) {
            return _.pluck(_.filter(groups, {'gid': Number(gid)}), 'title')[0];
        }

        function getExpenses(gid) {
            return expenses[gid];
        }

        function getExpense(gid,eid){
            return _.filter(expenses[gid], {'eid': Number(eid)})[0];
        }
        function getGroupCurrency(gid)
        {
            return _.pluck(_.filter(groups, {'gid': Number(gid)}), 'currency_sign')[0];
        }

        function setGroupCurrency(gid, currencyCode)
        {
            for (var i = 0, len = groups.length; i < len; i++) {
                if (groups[i].gid == gid) {
                    groups[i].currency_sign = currencyCode;
                    break;
                }
            }
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
            getCurrencies: getCurrencies
        };

    }

})();