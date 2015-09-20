/**
 * Created by Whiskey on 19-6-2015.
 */

(function () {
    'use strict';

    angular.module('GoingDutchApp').factory('gdApi', ['$http', '$localStorage', 'authenticationDataService', '$rootScope', '$state', 'gdConfig', '$q', gdApi]);

    function gdApi($http, $localStorage, authenticationDataService, $rootScope, $state, gdConfig, $q) {


        var currencies = JSON.parse('["EUR","USD","GBP","CHF"]');

        var expenses = JSON.parse('{"1":[{"eid":566,"etitle":"Tante Malee","uid":5,"amount":100,"ecreated":1437147000,"eupdated":1437218785,"timezoneoffset":0,"event_id":0,"depid":null,"uids":"5,1","deposit_count":null},{"eid":548,"etitle":"Verjaardag JP bijdrage Fein tool","uid":1,"amount":45,"ecreated":1433745900,"eupdated":1433753692,"timezoneoffset":0,"event_id":0,"depid":null,"uids":"2,4,5,6,1","deposit_count":null},{"eid":547,"etitle":"JP whis ","uid":6,"amount":30,"ecreated":1433704500,"eupdated":1433711665,"timezoneoffset":0,"event_id":0,"depid":null,"uids":"2,4,5,6,1","deposit_count":null},{"eid":540,"etitle":"parkeren","uid":2,"amount":9,"ecreated":1432332000,"eupdated":1432339502,"timezoneoffset":0,"event_id":0,"depid":null,"uids":"2,5,6,1","deposit_count":null},{"eid":539,"etitle":"Gekke Max bier","uid":2,"amount":32.6,"ecreated":1432332000,"eupdated":1432339457,"timezoneoffset":0,"event_id":0,"depid":null,"uids":"2,5,6,1","deposit_count":null},{"eid":538,"etitle":"Mad Max tickets ","uid":6,"amount":60,"ecreated":1432322100,"eupdated":1432329207,"timezoneoffset":0,"event_id":0,"depid":null,"uids":"2,5,6,1","deposit_count":null},{"eid":529,"etitle":"Kado dienblad Marieke Manschot","uid":1,"amount":7.5,"ecreated":1431787500,"eupdated":1431795034,"timezoneoffset":0,"event_id":0,"depid":null,"uids":5,"deposit_count":null},{"eid":515,"etitle":"Ultron Grolsch","uid":5,"amount":10.8,"ecreated":1430158500,"eupdated":1430165780,"timezoneoffset":0,"event_id":0,"depid":null,"uids":"5,6,1","deposit_count":null},{"eid":514,"etitle":"Ultron MMs","uid":1,"amount":6,"ecreated":1430082000,"eupdated":1430089501,"timezoneoffset":0,"event_id":0,"depid":null,"uids":"5,6,1","deposit_count":null},{"eid":513,"etitle":"Avengers Age of Ultron","uid":6,"amount":46.5,"ecreated":1430071200,"eupdated":1430074205,"timezoneoffset":0,"event_id":0,"depid":null,"uids":"5,6,1","deposit_count":null},{"eid":512,"etitle":"Kadootje rens","uid":4,"amount":7.25,"ecreated":1429782300,"eupdated":1429789788,"timezoneoffset":0,"event_id":0,"depid":null,"uids":5,"deposit_count":null},{"eid":506,"etitle":"FF7 bier","uid":6,"amount":20.5,"ecreated":1428953400,"eupdated":1428960491,"timezoneoffset":0,"event_id":0,"depid":null,"uids":"5,6,1","deposit_count":null},{"eid":505,"etitle":"FF7 kaartjes","uid":6,"amount":31.5,"ecreated":1428902100,"eupdated":1428909722,"timezoneoffset":0,"event_id":0,"depid":null,"uids":"5,6,1","deposit_count":null},{"eid":484,"etitle":"Kingsman kaartjes ","uid":6,"amount":31.5,"ecreated":1424979900,"eupdated":1424959943,"timezoneoffset":0,"event_id":0,"depid":null,"uids":"3,6,1","deposit_count":null},{"eid":483,"etitle":"bijdrage koffieapparaat Bert","uid":5,"amount":30,"ecreated":1424457900,"eupdated":1424894203,"timezoneoffset":0,"event_id":0,"depid":null,"uids":"2,6","deposit_count":null},{"eid":474,"etitle":"VOC bier II","uid":6,"amount":25.2,"ecreated":1423266300,"eupdated":1423270676,"timezoneoffset":0,"event_id":0,"depid":null,"uids":"4,5,6,1","deposit_count":null},{"eid":473,"etitle":"VOC bier","uid":6,"amount":20,"ecreated":1423250100,"eupdated":1423253765,"timezoneoffset":0,"event_id":0,"depid":null,"uids":"4,5,6,1","deposit_count":null},{"eid":472,"etitle":"Michiel de Ruyter","uid":5,"amount":42,"ecreated":1423250100,"eupdated":1423253437,"timezoneoffset":0,"event_id":0,"depid":null,"uids":"4,5,6,1","deposit_count":null},{"eid":468,"etitle":"Nieuwjaarsconcert Unilever","uid":1,"amount":16,"ecreated":1420875000,"eupdated":1422952101,"timezoneoffset":0,"event_id":0,"depid":null,"uids":"4,6","deposit_count":null},{"eid":469,"etitle":"Vuurwerk","uid":5,"amount":11,"ecreated":1420066800,"eupdated":1422952190,"timezoneoffset":0,"event_id":0,"depid":null,"uids":1,"deposit_count":null},{"eid":447,"etitle":"Kado verjaardag Martijn","uid":1,"amount":75,"ecreated":1418134500,"eupdated":1418138629,"timezoneoffset":0,"event_id":0,"depid":null,"uids":"2,3,5,6,1","deposit_count":null},{"eid":446,"etitle":"PlaymobileVoorThijsS","uid":5,"amount":20.25,"ecreated":1417376700,"eupdated":1417726425,"timezoneoffset":0,"event_id":0,"depid":null,"uids":"5,6,1","deposit_count":null},{"eid":442,"etitle":"Halve squash baan","uid":7,"amount":10.55,"ecreated":1417031100,"eupdated":1417034527,"timezoneoffset":0,"event_id":0,"depid":null,"uids":1,"deposit_count":null},{"eid":439,"etitle":"HousewarmingSjoerd40","uid":5,"amount":75.74,"ecreated":1416688200,"eupdated":1416684897,"timezoneoffset":0,"event_id":0,"depid":null,"uids":"2,3,4,5,1","deposit_count":null},{"eid":428,"etitle":"koffie en bier","uid":5,"amount":14,"ecreated":1416005100,"eupdated":1416224849,"timezoneoffset":0,"event_id":0,"depid":null,"uids":"5,6","deposit_count":null},{"eid":423,"etitle":"Interstellar","uid":5,"amount":25,"ecreated":1415988900,"eupdated":1415992465,"timezoneoffset":0,"event_id":0,"depid":null,"uids":"5,6","deposit_count":null},{"eid":421,"etitle":"Halve squash baan 2x","uid":7,"amount":17.1,"ecreated":1415825100,"eupdated":1415828689,"timezoneoffset":0,"event_id":0,"depid":null,"uids":1,"deposit_count":null},{"eid":420,"etitle":"Eweka ","uid":7,"amount":22.5,"ecreated":1415825100,"eupdated":1415828442,"timezoneoffset":0,"event_id":0,"depid":null,"uids":"5,7,1","deposit_count":null},{"eid":441,"etitle":"Kado Mario","uid":1,"amount":20,"ecreated":1414872000,"eupdated":1416818117,"timezoneoffset":0,"event_id":0,"depid":null,"uids":"4,5","deposit_count":null},{"eid":379,"etitle":"Exp. III bierrrrr","uid":5,"amount":22.1,"ecreated":1409334300,"eupdated":1409341603,"timezoneoffset":0,"event_id":0,"depid":null,"uids":"2,5,6,7,1","deposit_count":null},{"eid":378,"etitle":"Expendables 3","uid":1,"amount":50,"ecreated":1409334300,"eupdated":1409341473,"timezoneoffset":0,"event_id":0,"depid":null,"uids":"2,5,6,7,1","deposit_count":null},{"eid":376,"etitle":"Eweka 90 dagen","uid":5,"amount":22.5,"ecreated":1408038300,"eupdated":1408046130,"timezoneoffset":0,"event_id":0,"depid":null,"uids":"5,7,1","deposit_count":null},{"eid":370,"etitle":"Squash","uid":7,"amount":23.3,"ecreated":1405531800,"eupdated":1405539122,"timezoneoffset":0,"event_id":0,"depid":null,"uids":"7,10,1","deposit_count":null},{"eid":369,"etitle":"Halve squash baan","uid":7,"amount":8.55,"ecreated":1404924300,"eupdated":1404932354,"timezoneoffset":0,"event_id":0,"depid":null,"uids":10,"deposit_count":null},{"eid":368,"etitle":"Kadootje Thijs","uid":4,"amount":15,"ecreated":1404837900,"eupdated":1404845611,"timezoneoffset":0,"event_id":0,"depid":null,"uids":"4,1","deposit_count":null},{"eid":367,"etitle":"Kadootjes Timon","uid":4,"amount":22.5,"ecreated":1404837900,"eupdated":1404845547,"timezoneoffset":0,"event_id":0,"depid":null,"uids":"5,2,4","deposit_count":null},{"eid":366,"etitle":"Kado Yvonne Voetbalfeestje","uid":5,"amount":15,"ecreated":1403061300,"eupdated":1404277890,"timezoneoffset":0,"event_id":0,"depid":null,"uids":4,"deposit_count":null},{"eid":365,"etitle":"Bier vooraf Edge of T","uid":5,"amount":20,"ecreated":1401909300,"eupdated":1401916341,"timezoneoffset":0,"event_id":0,"depid":null,"uids":"2,4,5,6,1","deposit_count":null},{"eid":363,"etitle":"Kaartjes edget of tomorrow","uid":4,"amount":69,"ecreated":1401900300,"eupdated":1401908332,"timezoneoffset":0,"event_id":0,"depid":null,"uids":"2,3,4,5,6,1","deposit_count":null},{"eid":364,"etitle":"Zomerfestival ","uid":6,"amount":20,"ecreated":1400950800,"eupdated":1401908651,"timezoneoffset":0,"event_id":0,"depid":null,"uids":"5,6","deposit_count":null},{"eid":361,"etitle":"Lannen in Noordwijk","uid":1,"amount":109,"ecreated":1399656600,"eupdated":1399977476,"timezoneoffset":0,"event_id":0,"depid":null,"uids":"2,4,5,6,7,1","deposit_count":null},{"eid":360,"etitle":"Halve squash baan","uid":7,"amount":8.55,"ecreated":1398881700,"eupdated":1398888805,"timezoneoffset":0,"event_id":0,"depid":null,"uids":39,"deposit_count":null},{"eid":359,"etitle":"Halve squash baan","uid":7,"amount":8.55,"ecreated":1397670300,"eupdated":1397678229,"timezoneoffset":0,"event_id":0,"depid":null,"uids":3,"deposit_count":null},{"eid":358,"etitle":"Kadootjes Mitch","uid":4,"amount":67.1,"ecreated":1396178100,"eupdated":1396185323,"timezoneoffset":0,"event_id":0,"depid":null,"uids":"2,3,4,6,1","deposit_count":null},{"eid":355,"etitle":"Sil bier","uid":2,"amount":12.5,"ecreated":1394556300,"eupdated":1394560184,"timezoneoffset":0,"event_id":0,"depid":null,"uids":39,"deposit_count":null},{"eid":354,"etitle":"Eweka 3 mnd","uid":1,"amount":22.5,"ecreated":1394313300,"eupdated":1394316950,"timezoneoffset":0,"event_id":0,"depid":null,"uids":"5,7,1","deposit_count":null},{"eid":351,"etitle":"kaartjes film Hobbit","uid":2,"amount":25,"ecreated":1393955100,"eupdated":1393958987,"timezoneoffset":0,"event_id":0,"depid":null,"uids":"5,2","deposit_count":null},{"eid":346,"etitle":"Wolf of Wallstreet","uid":5,"amount":20,"ecreated":1393506000,"eupdated":1393509675,"timezoneoffset":0,"event_id":0,"depid":null,"uids":"5,6","deposit_count":null},{"eid":345,"etitle":"Kado Bert","uid":4,"amount":10,"ecreated":1393486200,"eupdated":1393489720,"timezoneoffset":0,"event_id":0,"depid":null,"uids":3,"deposit_count":null},{"eid":344,"etitle":"Kado Bert","uid":4,"amount":90,"ecreated":1393486200,"eupdated":1393489678,"timezoneoffset":0,"event_id":0,"depid":null,"uids":"5,6,7,39,2,4","deposit_count":null},{"eid":347,"etitle":"Hobbit 2 beugels","uid":5,"amount":12.5,"ecreated":1393099200,"eupdated":1393510006,"timezoneoffset":0,"event_id":0,"depid":null,"uids":"5,2","deposit_count":null},{"eid":349,"etitle":"Hobbitburgers","uid":5,"amount":15.95,"ecreated":1393085700,"eupdated":1393510343,"timezoneoffset":0,"event_id":0,"depid":null,"uids":"5,2","deposit_count":null},{"eid":348,"etitle":"Hobbit 2 Trappist","uid":5,"amount":15.8,"ecreated":1393084800,"eupdated":1393510079,"timezoneoffset":0,"event_id":0,"depid":null,"uids":"5,2","deposit_count":null},{"eid":338,"etitle":"borrel bij Knus","uid":2,"amount":10,"ecreated":1392480900,"eupdated":1392570638,"timezoneoffset":0,"event_id":0,"depid":null,"uids":"5,2","deposit_count":null},{"eid":336,"etitle":"Apres Furnace drank ","uid":6,"amount":40,"ecreated":1391213700,"eupdated":1391217824,"timezoneoffset":0,"event_id":0,"depid":null,"uids":"2,3,5,6,1","deposit_count":null},{"eid":335,"etitle":"Furnace bier","uid":6,"amount":30,"ecreated":1391196600,"eupdated":1391200591,"timezoneoffset":0,"event_id":0,"depid":null,"uids":"3,5,6,1","deposit_count":null},{"eid":334,"etitle":"Kaartjes Out of the Furnace ","uid":6,"amount":50,"ecreated":1391184000,"eupdated":1391187904,"timezoneoffset":0,"event_id":0,"depid":null,"uids":"2,3,5,6,1","deposit_count":null},{"eid":342,"etitle":"biertjes na bios","uid":3,"amount":30,"ecreated":1391165100,"eupdated":1392724746,"timezoneoffset":0,"event_id":0,"depid":null,"uids":"2,3,5,6,1","deposit_count":null},{"eid":341,"etitle":"drankjes bios","uid":3,"amount":26.8,"ecreated":1391165100,"eupdated":1392724703,"timezoneoffset":0,"event_id":0,"depid":null,"uids":"3,5,6,1","deposit_count":null},{"eid":332,"etitle":"Squash","uid":7,"amount":21,"ecreated":1389815100,"eupdated":1389819612,"timezoneoffset":0,"event_id":0,"depid":null,"uids":"7,1","deposit_count":null},{"eid":329,"etitle":"borrel bij de BeeBob","uid":2,"amount":57.8,"ecreated":1388865600,"eupdated":1388944125,"timezoneoffset":0,"event_id":0,"depid":null,"uids":"2,3","deposit_count":null},{"eid":327,"etitle":"Squash banen","uid":1,"amount":27,"ecreated":1386186300,"eupdated":1386190206,"timezoneoffset":0,"event_id":0,"depid":null,"uids":"3,39,1","deposit_count":null},{"eid":322,"etitle":"whis verjaardag daan","uid":3,"amount":12.5,"ecreated":1383663600,"eupdated":1383667698,"timezoneoffset":0,"event_id":0,"depid":null,"uids":1,"deposit_count":null},{"eid":321,"etitle":"Mario H kado","uid":5,"amount":30.9,"ecreated":1383480900,"eupdated":1383485019,"timezoneoffset":0,"event_id":0,"depid":null,"uids":"4,5,1","deposit_count":null},{"eid":320,"etitle":"Trappistbier en kaas","uid":5,"amount":22,"ecreated":1382214600,"eupdated":1382221543,"timezoneoffset":0,"event_id":0,"depid":null,"uids":"5,6","deposit_count":null},{"eid":319,"etitle":"Eweka okt-dec","uid":5,"amount":22.5,"ecreated":1382206500,"eupdated":1382213778,"timezoneoffset":0,"event_id":0,"depid":null,"uids":"5,7,1","deposit_count":null},{"eid":318,"etitle":"Gravity bier","uid":5,"amount":6.9,"ecreated":1382206500,"eupdated":1382213574,"timezoneoffset":0,"event_id":0,"depid":null,"uids":"5,6","deposit_count":null},{"eid":317,"etitle":"Gravity ","uid":6,"amount":22,"ecreated":1382206500,"eupdated":1382213542,"timezoneoffset":0,"event_id":0,"depid":null,"uids":"5,6","deposit_count":null},{"eid":310,"etitle":"Squashen","uid":10,"amount":33.33,"ecreated":1379337300,"eupdated":1379344543,"timezoneoffset":0,"event_id":0,"depid":null,"uids":"5,7,10,1","deposit_count":null},{"eid":309,"etitle":"Eweka aug-sept","uid":5,"amount":15,"ecreated":1376321400,"eupdated":1376328506,"timezoneoffset":0,"event_id":0,"depid":null,"uids":"5,7,1","deposit_count":null},{"eid":308,"etitle":"Bier en ballen kobus","uid":2,"amount":63.65,"ecreated":1374785100,"eupdated":1374791964,"timezoneoffset":0,"event_id":0,"depid":null,"uids":"2,3,6,31,39,1","deposit_count":null},{"eid":307,"etitle":"Kaartjes World War Z","uid":6,"amount":69,"ecreated":1374779700,"eupdated":1374786934,"timezoneoffset":0,"event_id":0,"depid":null,"uids":"2,3,6,31,39,1","deposit_count":null},{"eid":306,"etitle":"Pre-wwz-bier","uid":6,"amount":16,"ecreated":1374779700,"eupdated":1374786888,"timezoneoffset":0,"event_id":0,"depid":null,"uids":"39,2,3,6","deposit_count":null},{"eid":304,"etitle":"World War Z","uid":31,"amount":23.3,"ecreated":1374770700,"eupdated":1374778622,"timezoneoffset":0,"event_id":0,"depid":null,"uids":"2,3,6,31,39,1","deposit_count":null},{"eid":286,"etitle":"CAS fietsenverhuur","uid":5,"amount":38,"ecreated":1372477500,"eupdated":1372484555,"timezoneoffset":0,"event_id":0,"depid":null,"uids":"5,1","deposit_count":null},{"eid":285,"etitle":"CAS Lakens en toeristenbelasting","uid":5,"amount":40.4,"ecreated":1372477500,"eupdated":1372484370,"timezoneoffset":0,"event_id":0,"depid":null,"uids":"5,1","deposit_count":null},{"eid":284,"etitle":"Biertjezz","uid":4,"amount":33,"ecreated":1371850200,"eupdated":1371857387,"timezoneoffset":0,"event_id":0,"depid":null,"uids":"4,5,6,7,10,1","deposit_count":null},{"eid":283,"etitle":"Biertjes","uid":4,"amount":29.4,"ecreated":1371843900,"eupdated":1371851629,"timezoneoffset":0,"event_id":0,"depid":null,"uids":"4,5,6,7,10,1","deposit_count":null},{"eid":282,"etitle":"Into darkness prebier ","uid":6,"amount":28,"ecreated":1371834900,"eupdated":1371842224,"timezoneoffset":0,"event_id":0,"depid":null,"uids":"4,5,6,7,10,1","deposit_count":null},{"eid":281,"etitle":"Eweka","uid":7,"amount":22.5,"ecreated":1371834000,"eupdated":1371841391,"timezoneoffset":0,"event_id":0,"depid":null,"uids":"5,7,1","deposit_count":null},{"eid":280,"etitle":"Trekkies unite","uid":7,"amount":66,"ecreated":1371834000,"eupdated":1371841292,"timezoneoffset":0,"event_id":0,"depid":null,"uids":"4,5,6,7,10,1","deposit_count":null},{"eid":278,"etitle":"Kado JP","uid":1,"amount":50,"ecreated":1371814200,"eupdated":1371821712,"timezoneoffset":0,"event_id":0,"depid":null,"uids":"2,4,5,6,7,1","deposit_count":null},{"eid":277,"etitle":"Kadobon Mario","uid":5,"amount":30,"ecreated":1370968200,"eupdated":1371061550,"timezoneoffset":0,"event_id":0,"depid":null,"uids":"4,5,1","deposit_count":null},{"eid":279,"etitle":"Elektronica doosje","uid":1,"amount":7,"ecreated":1370691000,"eupdated":1371821819,"timezoneoffset":0,"event_id":0,"depid":null,"uids":5,"deposit_count":null},{"eid":272,"etitle":"Glenkinchie JP","uid":5,"amount":37.95,"ecreated":1370687400,"eupdated":1370694726,"timezoneoffset":0,"event_id":0,"depid":null,"uids":"2,4,5,6,7,1","deposit_count":null},{"eid":268,"etitle":"Cadeau mitch","uid":3,"amount":120,"ecreated":1369730700,"eupdated":1369738620,"timezoneoffset":0,"event_id":0,"depid":null,"uids":"2,3,4,6,7,1","deposit_count":null},{"eid":267,"etitle":"Pizza en bier","uid":4,"amount":37.15,"ecreated":1369728900,"eupdated":1369736473,"timezoneoffset":0,"event_id":0,"depid":null,"uids":"4,5,1","deposit_count":null},{"eid":266,"etitle":"Piface","uid":4,"amount":36.95,"ecreated":1369728900,"eupdated":1369736357,"timezoneoffset":0,"event_id":0,"depid":null,"uids":5,"deposit_count":null},{"eid":265,"etitle":"Lunch Scheveningen vrouwen en kids","uid":1,"amount":120,"ecreated":1368183600,"eupdated":1369053406,"timezoneoffset":0,"event_id":0,"depid":null,"uids":"2,1","deposit_count":null},{"eid":263,"etitle":"Kado voor Marjolein","uid":2,"amount":70,"ecreated":1367253900,"eupdated":1367260894,"timezoneoffset":0,"event_id":0,"depid":null,"uids":"3,4,5,1","deposit_count":null},{"eid":260,"etitle":"Oblivion apres-bier","uid":6,"amount":30,"ecreated":1366402500,"eupdated":1366409696,"timezoneoffset":0,"event_id":0,"depid":null,"uids":"2,5,6,1","deposit_count":null},{"eid":259,"etitle":"Oblivion pre-bier","uid":6,"amount":13.5,"ecreated":1366386300,"eupdated":1366394183,"timezoneoffset":0,"event_id":0,"depid":null,"uids":"5,6,2","deposit_count":null},{"eid":258,"etitle":"Oblivion snacks","uid":6,"amount":15.4,"ecreated":1366386300,"eupdated":1366394143,"timezoneoffset":0,"event_id":0,"depid":null,"uids":"2,5,6,1","deposit_count":null},{"eid":257,"etitle":"Kaartjes Oblivion ","uid":6,"amount":38,"ecreated":1366381800,"eupdated":1366388733,"timezoneoffset":0,"event_id":0,"depid":null,"uids":"2,5,6,1","deposit_count":null},{"eid":251,"etitle":"Bier Harderererr","uid":6,"amount":24,"ecreated":1362864600,"eupdated":1362814946,"timezoneoffset":0,"event_id":0,"depid":null,"uids":"6,7,1","deposit_count":null},{"eid":250,"etitle":"Die Harderererrer","uid":6,"amount":30,"ecreated":1362765600,"eupdated":1362769632,"timezoneoffset":0,"event_id":0,"depid":null,"uids":"6,7,1","deposit_count":null},{"eid":249,"etitle":"Die haderderder","uid":7,"amount":10.3,"ecreated":1362765600,"eupdated":1362769578,"timezoneoffset":0,"event_id":0,"depid":null,"uids":"6,7,1","deposit_count":null},{"eid":244,"etitle":"T Mobile Familie feb tm jan","uid":2,"amount":179.36,"ecreated":1361731500,"eupdated":1361735086,"timezoneoffset":0,"event_id":0,"depid":null,"uids":"2,3,1","deposit_count":null},{"eid":243,"etitle":"Pizza Delft","uid":2,"amount":90,"ecreated":1361730600,"eupdated":1361734653,"timezoneoffset":0,"event_id":0,"depid":null,"uids":"2,1","deposit_count":null},{"eid":242,"etitle":"Cadeau Bert","uid":3,"amount":30,"ecreated":1361128500,"eupdated":1361132550,"timezoneoffset":0,"event_id":0,"depid":null,"uids":"5,6","deposit_count":null},{"eid":241,"etitle":"Cadeau Bert","uid":3,"amount":60,"ecreated":1361128500,"eupdated":1361132506,"timezoneoffset":0,"event_id":0,"depid":null,"uids":"2,4,7","deposit_count":null},{"eid":240,"etitle":"Whiskey in the dark\/ Mannendiner","uid":5,"amount":94.78,"ecreated":1359834300,"eupdated":1359885214,"timezoneoffset":0,"event_id":0,"depid":null,"uids":"2,3,4,5,6,7,1","deposit_count":null},{"eid":239,"etitle":"vuurwerk","uid":5,"amount":9,"ecreated":1356975000,"eupdated":1369053431,"timezoneoffset":0,"event_id":0,"depid":null,"uids":1,"deposit_count":null},{"eid":238,"etitle":"Kadootjes Sanderse","uid":1,"amount":50,"ecreated":1355580000,"eupdated":1356631875,"timezoneoffset":0,"event_id":0,"depid":null,"uids":"2,3,5,6,1","deposit_count":null},{"eid":237,"etitle":"James Bond - Skyfall","uid":1,"amount":10,"ecreated":1355508000,"eupdated":1354561639,"timezoneoffset":0,"event_id":0,"depid":null,"uids":6,"deposit_count":null},{"eid":236,"etitle":"James Bond - Skyfall","uid":1,"amount":40,"ecreated":1355508000,"eupdated":1354561572,"timezoneoffset":0,"event_id":0,"depid":null,"uids":"5,1","deposit_count":null},{"eid":234,"etitle":"Apres Bond bier","uid":6,"amount":16.2,"ecreated":1353109500,"eupdated":1353113573,"timezoneoffset":0,"event_id":0,"depid":null,"uids":"5,6,1","deposit_count":null},{"eid":233,"etitle":"Bond snacks","uid":6,"amount":22.1,"ecreated":1353105900,"eupdated":1353109974,"timezoneoffset":0,"event_id":0,"depid":null,"uids":"5,6,1","deposit_count":null},{"eid":235,"etitle":"Kado Blondje - Wired abbo ","uid":1,"amount":69,"ecreated":1353094200,"eupdated":1354561447,"timezoneoffset":0,"event_id":0,"depid":null,"uids":"2,3,4,5,7,1","deposit_count":null},{"eid":232,"etitle":"Papagaai daan + whis","uid":1,"amount":57,"ecreated":1351595700,"eupdated":1351599435,"timezoneoffset":0,"event_id":0,"depid":null,"uids":"3,1","deposit_count":null},{"eid":231,"etitle":"Papagaai kado","uid":1,"amount":60,"ecreated":1351595700,"eupdated":1351599368,"timezoneoffset":0,"event_id":0,"depid":null,"uids":"6,7,4,5","deposit_count":null},{"eid":230,"etitle":"Geld voor de oppas","uid":6,"amount":5,"ecreated":1351367100,"eupdated":1351374911,"timezoneoffset":0,"event_id":0,"depid":null,"uids":1,"deposit_count":null},{"eid":229,"etitle":"Boulderen is hip","uid":4,"amount":32.75,"ecreated":1349372700,"eupdated":1349380391,"timezoneoffset":0,"event_id":0,"depid":null,"uids":"4,6","deposit_count":null},{"eid":228,"etitle":"Kaartjes Theater Yvonne","uid":5,"amount":79,"ecreated":1345394700,"eupdated":1345402450,"timezoneoffset":0,"event_id":0,"depid":null,"uids":"5,6,7,2,3","deposit_count":null},{"eid":227,"etitle":"Bier","uid":1,"amount":10,"ecreated":1345239900,"eupdated":1345247687,"timezoneoffset":0,"event_id":17,"depid":null,"uids":"3,5,1","deposit_count":null},{"eid":226,"etitle":"Biertjes","uid":3,"amount":50,"ecreated":1345239900,"eupdated":1345247463,"timezoneoffset":0,"event_id":17,"depid":null,"uids":"3,4,5,6,7,1","deposit_count":null},{"eid":225,"etitle":"Bier bios","uid":3,"amount":31.8,"ecreated":1345229100,"eupdated":1345236756,"timezoneoffset":0,"event_id":17,"depid":null,"uids":"3,4,5,6,7,1","deposit_count":null},{"eid":224,"etitle":"Expendables bier","uid":6,"amount":30,"ecreated":1345221900,"eupdated":1345228886,"timezoneoffset":0,"event_id":17,"depid":null,"uids":"3,4,5,6,7,1","deposit_count":null},{"eid":223,"etitle":"The Expandables 2 ","uid":5,"amount":60,"ecreated":1344964500,"eupdated":1345227367,"timezoneoffset":0,"event_id":17,"depid":null,"uids":"3,4,5,6,7,1","deposit_count":null},{"eid":222,"etitle":"bbq","uid":10,"amount":36,"ecreated":1343501100,"eupdated":1343501932,"timezoneoffset":0,"event_id":0,"depid":null,"uids":"7,10","deposit_count":null},{"eid":221,"etitle":"bier","uid":10,"amount":32,"ecreated":1343429100,"eupdated":1343429172,"timezoneoffset":0,"event_id":0,"depid":null,"uids":"7,10,1","deposit_count":null},{"eid":216,"etitle":"Wakeboarden biertjes","uid":3,"amount":16,"ecreated":1342827000,"eupdated":1342827472,"timezoneoffset":0,"event_id":0,"depid":null,"uids":"3,5,7,1","deposit_count":null},{"eid":215,"etitle":"Dark knight rises drankjes","uid":3,"amount":26,"ecreated":1342827000,"eupdated":1342827429,"timezoneoffset":0,"event_id":0,"depid":null,"uids":"3,5,6,1","deposit_count":null},{"eid":214,"etitle":"Apres Batman bier","uid":6,"amount":10,"ecreated":1342827000,"eupdated":1342827411,"timezoneoffset":0,"event_id":0,"depid":null,"uids":"6,3,5","deposit_count":null},{"eid":213,"etitle":"ticket batman dark knight rises","uid":5,"amount":10,"ecreated":1342827000,"eupdated":1342827382,"timezoneoffset":0,"event_id":0,"depid":null,"uids":5,"deposit_count":null},{"eid":212,"etitle":"Batman bier","uid":6,"amount":30,"ecreated":1342814400,"eupdated":1342814633,"timezoneoffset":0,"event_id":0,"depid":null,"uids":"3,5,6,1","deposit_count":null},{"eid":211,"etitle":"film The Dark Knight Rises ","uid":6,"amount":30,"ecreated":1342795500,"eupdated":1342796028,"timezoneoffset":0,"event_id":0,"depid":null,"uids":"3,6,1","deposit_count":null},{"eid":210,"etitle":"Zakgeld voor het praathuis.","uid":5,"amount":10,"ecreated":1342295100,"eupdated":1342295583,"timezoneoffset":0,"event_id":0,"depid":null,"uids":3,"deposit_count":null},{"eid":218,"etitle":"Kadootje voor Wen melkopschuim unit","uid":1,"amount":15,"ecreated":1341597600,"eupdated":1343041874,"timezoneoffset":0,"event_id":0,"depid":null,"uids":6,"deposit_count":null},{"eid":217,"etitle":"Kado JP \u0026 Jor","uid":1,"amount":120,"ecreated":1338044400,"eupdated":1343041459,"timezoneoffset":0,"event_id":0,"depid":null,"uids":"2,4,5,6,7,1","deposit_count":null},{"eid":209,"etitle":"Eweka 1jaar","uid":7,"amount":90,"ecreated":1337189400,"eupdated":1337189912,"timezoneoffset":0,"event_id":0,"depid":null,"uids":"5,7,1","deposit_count":null},{"eid":208,"etitle":"Kado Mitch - SSD met whis","uid":1,"amount":94.8,"ecreated":1332585000,"eupdated":1335903689,"timezoneoffset":0,"event_id":0,"depid":null,"uids":"2,3,4,6,7,1","deposit_count":null},{"eid":206,"etitle":"Lan kit cat6 utp 6x3m 1x5m 1x10m","uid":1,"amount":28.41,"ecreated":1332456300,"eupdated":1335902571,"timezoneoffset":0,"event_id":0,"depid":null,"uids":"2,3,5,6,7,1","deposit_count":null},{"eid":205,"etitle":"Squash ballen 3x","uid":1,"amount":8,"ecreated":1332445500,"eupdated":1332580167,"timezoneoffset":0,"event_id":0,"depid":null,"uids":7,"deposit_count":null},{"eid":207,"etitle":"Lan kit TP-LINK 16-Port Gb Switch","uid":1,"amount":69.7,"ecreated":1332322200,"eupdated":1335902908,"timezoneoffset":0,"event_id":0,"depid":null,"uids":"2,3,5,6,7,1","deposit_count":null},{"eid":203,"etitle":"Drankjes kroeg","uid":1,"amount":7.6,"ecreated":1331891100,"eupdated":1331891231,"timezoneoffset":0,"event_id":0,"depid":null,"uids":"6,31","deposit_count":null},{"eid":202,"etitle":"Drankjes kroeg","uid":1,"amount":30.4,"ecreated":1331844300,"eupdated":1331891173,"timezoneoffset":0,"event_id":0,"depid":null,"uids":"2,3,5,1","deposit_count":null},{"eid":201,"etitle":"3D brillen","uid":1,"amount":3.2,"ecreated":1331841600,"eupdated":1331842139,"timezoneoffset":0,"event_id":0,"depid":null,"uids":5,"deposit_count":null},{"eid":200,"etitle":"10tje voor Daan","uid":31,"amount":10,"ecreated":1331841600,"eupdated":1331841887,"timezoneoffset":0,"event_id":0,"depid":null,"uids":2,"deposit_count":null},{"eid":199,"etitle":"John carter kaartjes","uid":2,"amount":92,"ecreated":1331829900,"eupdated":1331830009,"timezoneoffset":0,"event_id":0,"depid":null,"uids":"2,3,5,1","deposit_count":null},{"eid":198,"etitle":"John Carter","uid":2,"amount":23,"ecreated":1331829900,"eupdated":1331829902,"timezoneoffset":0,"event_id":0,"depid":null,"uids":"6,31","deposit_count":null},{"eid":204,"etitle":"Bios hapjes\/drankjes","uid":31,"amount":58.7,"ecreated":1331820900,"eupdated":1332426087,"timezoneoffset":0,"event_id":0,"depid":null,"uids":"2,3,5,1","deposit_count":null},{"eid":197,"etitle":"Squash ballen 3x","uid":1,"amount":8,"ecreated":1330637400,"eupdated":1330986861,"timezoneoffset":0,"event_id":0,"depid":null,"uids":3,"deposit_count":null},{"eid":196,"etitle":"Cadeau verjaardag bert","uid":3,"amount":10,"ecreated":1330508700,"eupdated":1343395541,"timezoneoffset":0,"event_id":0,"depid":null,"uids":6,"deposit_count":null},{"eid":195,"etitle":"Cadeau verjaardag bert","uid":3,"amount":60,"ecreated":1330508700,"eupdated":1330508947,"timezoneoffset":0,"event_id":0,"depid":null,"uids":"5,7,2","deposit_count":null},{"eid":194,"etitle":"Cadeau verjaardag bert","uid":3,"amount":20,"ecreated":1330508700,"eupdated":1330508769,"timezoneoffset":0,"event_id":0,"depid":null,"uids":4,"deposit_count":null},{"eid":193,"etitle":"Kosten TMobile family okt tm jan","uid":2,"amount":55,"ecreated":1329156900,"eupdated":1329156857,"timezoneoffset":0,"event_id":0,"depid":null,"uids":"2,3,1","deposit_count":null},{"eid":192,"etitle":"Bier en bitterballen","uid":7,"amount":50,"ecreated":1329066000,"eupdated":1329066076,"timezoneoffset":0,"event_id":15,"depid":null,"uids":"2,3,5,6,7,1","deposit_count":null},{"eid":191,"etitle":"Eweka 90 dagen","uid":7,"amount":22.5,"ecreated":1328994900,"eupdated":1328995334,"timezoneoffset":0,"event_id":0,"depid":null,"uids":"5,7,1","deposit_count":null},{"eid":190,"etitle":"Pizza","uid":7,"amount":46.75,"ecreated":1328984100,"eupdated":1328984560,"timezoneoffset":0,"event_id":15,"depid":null,"uids":"2,5,6,7,1","deposit_count":null},{"eid":189,"etitle":"Eten\/Happen voor Whiskyproeverij ","uid":5,"amount":47.25,"ecreated":1328402700,"eupdated":1328402731,"timezoneoffset":0,"event_id":0,"depid":null,"uids":"2,3,5,6,1","deposit_count":null},{"eid":188,"etitle":"Kaartjes voor Jip en Janneke","uid":1,"amount":20,"ecreated":1326527100,"eupdated":1326527896,"timezoneoffset":0,"event_id":0,"depid":null,"uids":2,"deposit_count":null},{"eid":187,"etitle":"Nuclear Dawn","uid":2,"amount":4.49,"ecreated":1324912500,"eupdated":1324912914,"timezoneoffset":0,"event_id":0,"depid":null,"uids":6,"deposit_count":null},{"eid":186,"etitle":"pinnen lichtjesavond","uid":5,"amount":20,"ecreated":1323798300,"eupdated":1323798523,"timezoneoffset":0,"event_id":0,"depid":null,"uids":2,"deposit_count":null},{"eid":185,"etitle":"drank na Maaskantje","uid":6,"amount":40,"ecreated":1323387900,"eupdated":1323387617,"timezoneoffset":0,"event_id":0,"depid":null,"uids":"2,5,6,1","deposit_count":null},{"eid":184,"etitle":"New kids nitro","uid":3,"amount":36,"ecreated":1323381600,"eupdated":1323381843,"timezoneoffset":0,"event_id":0,"depid":null,"uids":"2,3,5,6,1","deposit_count":null},{"eid":183,"etitle":"Biertjes voor de film","uid":1,"amount":26,"ecreated":1323373500,"eupdated":1323381522,"timezoneoffset":0,"event_id":0,"depid":null,"uids":"2,3,5,6,1","deposit_count":null},{"eid":182,"etitle":"NKOTB Nitro","uid":5,"amount":45.55,"ecreated":1323293400,"eupdated":1323293198,"timezoneoffset":0,"event_id":0,"depid":null,"uids":"2,3,5,6,1","deposit_count":null},{"eid":181,"etitle":"DVDs doorverkocht","uid":5,"amount":15,"ecreated":1322383500,"eupdated":1322383433,"timezoneoffset":0,"event_id":0,"depid":null,"uids":1,"deposit_count":null},{"eid":179,"etitle":"Eweka","uid":7,"amount":22.5,"ecreated":1321195500,"eupdated":1321196240,"timezoneoffset":0,"event_id":0,"depid":null,"uids":"5,7,1","deposit_count":null},{"eid":180,"etitle":"Knus Delftse Hout voorgeschoten","uid":5,"amount":12.5,"ecreated":1321186500,"eupdated":1321205146,"timezoneoffset":0,"event_id":0,"depid":null,"uids":1,"deposit_count":null},{"eid":120,"etitle":"Kosten T mobile family mrt t\/m sep","uid":2,"amount":70,"ecreated":1318837500,"eupdated":1319133762,"timezoneoffset":0,"event_id":0,"depid":null,"uids":"2,3,1","deposit_count":null},{"eid":119,"etitle":"Broodnodig bier na Johnny English","uid":6,"amount":21.4,"ecreated":1318457700,"eupdated":1318457624,"timezoneoffset":0,"event_id":14,"depid":null,"uids":"2,5,6,1","deposit_count":null},{"eid":118,"etitle":"bier bios","uid":5,"amount":13,"ecreated":1318447800,"eupdated":1318447559,"timezoneoffset":0,"event_id":14,"depid":null,"uids":"5,6,7,1","deposit_count":null},{"eid":117,"etitle":"bier","uid":5,"amount":6.5,"ecreated":1318447800,"eupdated":1318447487,"timezoneoffset":0,"event_id":14,"depid":null,"uids":"5,1","deposit_count":null},{"eid":116,"etitle":"Johnny English Reborn","uid":6,"amount":45.55,"ecreated":1318369500,"eupdated":1318369687,"timezoneoffset":0,"event_id":14,"depid":null,"uids":"3,5,6,7,1","deposit_count":null},{"eid":141,"etitle":"Regenbroek Timon","uid":5,"amount":8.99,"ecreated":1318308300,"eupdated":1319344842,"timezoneoffset":0,"event_id":0,"depid":null,"uids":1,"deposit_count":null},{"eid":115,"etitle":"Bier en zo","uid":7,"amount":44,"ecreated":1317495600,"eupdated":1317927753,"timezoneoffset":0,"event_id":13,"depid":null,"uids":"2,3,5,6,7,1","deposit_count":null},{"eid":114,"etitle":"LAN-spareribs","uid":7,"amount":56.75,"ecreated":1317408300,"eupdated":1317927416,"timezoneoffset":0,"event_id":13,"depid":null,"uids":"2,3,5,6,7,1","deposit_count":null},{"eid":113,"etitle":"Squash","uid":10,"amount":8,"ecreated":1316633400,"eupdated":1316633647,"timezoneoffset":0,"event_id":0,"depid":null,"uids":"3,7,10,1","deposit_count":null},{"eid":112,"etitle":"Drinken","uid":10,"amount":6,"ecreated":1314216000,"eupdated":1314216193,"timezoneoffset":0,"event_id":0,"depid":null,"uids":"3,10,1","deposit_count":null},{"eid":111,"etitle":"Eten bij de Meiden","uid":1,"amount":110,"ecreated":1313945100,"eupdated":1313945525,"timezoneoffset":0,"event_id":12,"depid":null,"uids":"3,4,5,6,7,1","deposit_count":null},{"eid":110,"etitle":"Eten JP","uid":3,"amount":30,"ecreated":1313945100,"eupdated":1313944888,"timezoneoffset":0,"event_id":12,"depid":null,"uids":1,"deposit_count":null},{"eid":109,"etitle":"Squashbaan","uid":3,"amount":19.9,"ecreated":1313005500,"eupdated":1313005545,"timezoneoffset":0,"event_id":0,"depid":null,"uids":"3,10","deposit_count":null},{"eid":108,"etitle":"Film Cars 2","uid":1,"amount":22,"ecreated":1312018200,"eupdated":1312026867,"timezoneoffset":0,"event_id":0,"depid":null,"uids":"2,1","deposit_count":null},{"eid":107,"etitle":"SquashBaan","uid":3,"amount":19,"ecreated":1311795900,"eupdated":1311796774,"timezoneoffset":0,"event_id":0,"depid":null,"uids":"3,7,10,1","deposit_count":null},{"eid":106,"etitle":"Squash drinken","uid":10,"amount":8,"ecreated":1311795900,"eupdated":1311796678,"timezoneoffset":0,"event_id":0,"depid":null,"uids":"3,7,10,1","deposit_count":null},{"eid":104,"etitle":"Proeflokaal - the return","uid":4,"amount":38,"ecreated":1309499100,"eupdated":1309766182,"timezoneoffset":0,"event_id":11,"depid":null,"uids":"2,4,5,31,1","deposit_count":null},{"eid":105,"etitle":"Bios bier","uid":1,"amount":17,"ecreated":1309462200,"eupdated":1309766160,"timezoneoffset":0,"event_id":11,"depid":null,"uids":"2,4,5,31,1","deposit_count":null},{"eid":103,"etitle":"Eerstjr rondje preoflokaal","uid":4,"amount":45,"ecreated":1309461300,"eupdated":1309766199,"timezoneoffset":0,"event_id":11,"depid":null,"uids":"2,4,5,7,31,1","deposit_count":null},{"eid":101,"etitle":"Transformers Dark Moon","uid":5,"amount":66,"ecreated":1309461300,"eupdated":1309517025,"timezoneoffset":0,"event_id":11,"depid":null,"uids":"2,4,5,7,31,1","deposit_count":null},{"eid":52,"etitle":"croissants","uid":5,"amount":7.5,"ecreated":1302355800,"eupdated":1302356349,"timezoneoffset":0,"event_id":9,"depid":null,"uids":"2,3,5,7,1","deposit_count":null},{"eid":51,"etitle":"Bbq","uid":7,"amount":64.33,"ecreated":1302342300,"eupdated":1302342733,"timezoneoffset":0,"event_id":9,"depid":null,"uids":"2,3,4,5,6,7,10,1","deposit_count":null},{"eid":102,"etitle":"Bier lannen bij Mitch","uid":4,"amount":20,"ecreated":1302334200,"eupdated":1309428719,"timezoneoffset":0,"event_id":0,"depid":null,"uids":"2,3,4,5,6,7,10,1","deposit_count":null},{"eid":50,"etitle":"Kado","uid":2,"amount":120,"ecreated":1302021000,"eupdated":1302021411,"timezoneoffset":0,"event_id":8,"depid":null,"uids":"2,3,4,6,7,1","deposit_count":null},{"eid":49,"etitle":"Whis","uid":7,"amount":41,"ecreated":1301246100,"eupdated":1301418924,"timezoneoffset":0,"event_id":8,"depid":null,"uids":2,"deposit_count":null},{"eid":46,"etitle":"TRON Legacy","uid":5,"amount":58.05,"ecreated":1299272400,"eupdated":1299226161,"timezoneoffset":0,"event_id":7,"depid":null,"uids":"3,5,6,7,1","deposit_count":null},{"eid":48,"etitle":"bier en snacks","uid":7,"amount":42.9,"ecreated":1299268800,"eupdated":1299269091,"timezoneoffset":0,"event_id":7,"depid":null,"uids":"3,5,6,7,1","deposit_count":null},{"eid":47,"etitle":"Parkeren","uid":7,"amount":3.5,"ecreated":1299268800,"eupdated":1299268985,"timezoneoffset":0,"event_id":7,"depid":null,"uids":"3,5,6,7,1","deposit_count":null},{"eid":45,"etitle":"T mobile family februari","uid":2,"amount":10,"ecreated":1298813400,"eupdated":1298813811,"timezoneoffset":0,"event_id":0,"depid":null,"uids":"2,3,1","deposit_count":null},{"eid":44,"etitle":"Cadeau bert","uid":3,"amount":15,"ecreated":1298392200,"eupdated":1298579408,"timezoneoffset":0,"event_id":0,"depid":null,"uids":"4,6","deposit_count":null},{"eid":43,"etitle":"Cadeau bert","uid":3,"amount":45,"ecreated":1298392200,"eupdated":1298392324,"timezoneoffset":0,"event_id":0,"depid":null,"uids":"5,7,2,3","deposit_count":null},{"eid":42,"etitle":"Whis voor Bert","uid":4,"amount":30,"ecreated":1298287800,"eupdated":1298288151,"timezoneoffset":0,"event_id":0,"depid":null,"uids":"5,6,7,2,3,4","deposit_count":null},{"eid":41,"etitle":"Terrasactie bier en appelsap","uid":5,"amount":16,"ecreated":1297179000,"eupdated":1297367232,"timezoneoffset":0,"event_id":0,"depid":null,"uids":"5,2","deposit_count":null},{"eid":39,"etitle":" Squash","uid":7,"amount":4,"ecreated":1296678600,"eupdated":1296678825,"timezoneoffset":0,"event_id":0,"depid":null,"uids":"7,10","deposit_count":null},{"eid":40,"etitle":"Voorschieten e-sata kabel","uid":1,"amount":7,"ecreated":1296482400,"eupdated":1297183620,"timezoneoffset":0,"event_id":0,"depid":null,"uids":5,"deposit_count":null},{"eid":38,"etitle":"Voorschieten kado\u0027s","uid":1,"amount":10,"ecreated":1296325800,"eupdated":1296325626,"timezoneoffset":0,"event_id":6,"depid":null,"uids":4,"deposit_count":null},{"eid":37,"etitle":"Voorschieten kado\u0027s","uid":1,"amount":15,"ecreated":1296325800,"eupdated":1296325593,"timezoneoffset":0,"event_id":6,"depid":null,"uids":6,"deposit_count":null},{"eid":36,"etitle":"Voorschieten kado\u0027s","uid":1,"amount":20,"ecreated":1296325800,"eupdated":1296325552,"timezoneoffset":0,"event_id":6,"depid":null,"uids":2,"deposit_count":null},{"eid":35,"etitle":"Voorschieten kado\u0027s","uid":1,"amount":25,"ecreated":1296325800,"eupdated":1296325514,"timezoneoffset":0,"event_id":6,"depid":null,"uids":3,"deposit_count":null},{"eid":34,"etitle":"Voorschieten kado\u0027s","uid":1,"amount":5,"ecreated":1296324900,"eupdated":1296325416,"timezoneoffset":0,"event_id":6,"depid":null,"uids":5,"deposit_count":null},{"eid":33,"etitle":"Kosten voor T Mobile Family januari","uid":2,"amount":10,"ecreated":1295941500,"eupdated":1295941493,"timezoneoffset":0,"event_id":0,"depid":null,"uids":"2,3,1","deposit_count":null},{"eid":32,"etitle":"JP betaald SquashBaan","uid":3,"amount":2.5,"ecreated":1295469900,"eupdated":1295469651,"timezoneoffset":0,"event_id":0,"depid":null,"uids":7,"deposit_count":null},{"eid":31,"etitle":"Squash","uid":3,"amount":10,"ecreated":1295469900,"eupdated":1295469563,"timezoneoffset":0,"event_id":0,"depid":null,"uids":"3,5,7,10,1","deposit_count":null},{"eid":30,"etitle":"kado Jelle","uid":5,"amount":6,"ecreated":1295178300,"eupdated":1295178408,"timezoneoffset":0,"event_id":0,"depid":null,"uids":"5,7","deposit_count":null},{"eid":29,"etitle":"pizza","uid":6,"amount":32,"ecreated":1295032500,"eupdated":1295032622,"timezoneoffset":0,"event_id":5,"depid":null,"uids":"2,5,6,1","deposit_count":null},{"eid":28,"etitle":"Section 8","uid":2,"amount":1.99,"ecreated":1295030700,"eupdated":1295031544,"timezoneoffset":0,"event_id":0,"depid":null,"uids":6,"deposit_count":null},{"eid":27,"etitle":"FOOD LAN bij Blondje","uid":6,"amount":94.66,"ecreated":1295026200,"eupdated":1295032686,"timezoneoffset":0,"event_id":5,"depid":null,"uids":"2,3,5,6,7,1","deposit_count":null},{"eid":25,"etitle":"Squash","uid":7,"amount":10,"ecreated":1294173900,"eupdated":1294173598,"timezoneoffset":0,"event_id":0,"depid":null,"uids":"3,5,7,10,1","deposit_count":null},{"eid":24,"etitle":"Section 8","uid":1,"amount":1.99,"ecreated":1293724800,"eupdated":1294240400,"timezoneoffset":0,"event_id":0,"depid":null,"uids":5,"deposit_count":null},{"eid":23,"etitle":"Section 8","uid":2,"amount":5.97,"ecreated":1293633000,"eupdated":1293633467,"timezoneoffset":0,"event_id":0,"depid":null,"uids":"2,3,1","deposit_count":null},{"eid":22,"etitle":"Verrekening spel voor wieb","uid":2,"amount":6.24,"ecreated":1293029100,"eupdated":1293029608,"timezoneoffset":0,"event_id":0,"depid":null,"uids":7,"deposit_count":null},{"eid":21,"etitle":"Kosten T Mobile family","uid":2,"amount":15.35,"ecreated":1292615100,"eupdated":1292615407,"timezoneoffset":0,"event_id":0,"depid":null,"uids":"2,3,1","deposit_count":null},{"eid":20,"etitle":"Bierbierbier na film","uid":6,"amount":21.6,"ecreated":1292277600,"eupdated":1293006265,"timezoneoffset":0,"event_id":4,"depid":null,"uids":"2,3,6,1","deposit_count":null},{"eid":19,"etitle":"Bier tijdens de film","uid":1,"amount":24.2,"ecreated":1292269500,"eupdated":1293006265,"timezoneoffset":0,"event_id":4,"depid":null,"uids":"2,3,6,7,1","deposit_count":null},{"eid":18,"etitle":"Kaartjes en bier voor sint","uid":2,"amount":40,"ecreated":1292269500,"eupdated":1293006265,"timezoneoffset":0,"event_id":4,"depid":null,"uids":"2,3,6,7,1","deposit_count":null},{"eid":17,"etitle":"Bier kroeg film sint","uid":7,"amount":20,"ecreated":1292269500,"eupdated":1293007412,"timezoneoffset":0,"event_id":4,"depid":null,"uids":"2,3,6,7,1","deposit_count":null},{"eid":13,"etitle":"Verrekening Bert - Mitch","uid":1,"amount":5,"ecreated":1292106600,"eupdated":1292106822,"timezoneoffset":0,"event_id":0,"depid":null,"uids":5,"deposit_count":null},{"eid":12,"etitle":"Terrasborrel Sinterklaas intocht ","uid":5,"amount":37.2,"ecreated":1290263400,"eupdated":1291905284,"timezoneoffset":0,"event_id":0,"depid":null,"uids":"2,5,1","deposit_count":null},{"eid":11,"etitle":"Ontbijt LAN weekend","uid":1,"amount":16,"ecreated":1289639700,"eupdated":1293006206,"timezoneoffset":0,"event_id":3,"depid":null,"uids":"2,3,5,7,1","deposit_count":null},{"eid":16,"etitle":"LAN weekend pizza","uid":1,"amount":19.2,"ecreated":1289577600,"eupdated":1293006206,"timezoneoffset":0,"event_id":3,"depid":null,"uids":"2,3,5,7,1","deposit_count":null},{"eid":15,"etitle":"LAN weekend hapjes","uid":2,"amount":19.2,"ecreated":1289577600,"eupdated":1293006206,"timezoneoffset":0,"event_id":3,"depid":null,"uids":"2,3,5,7,1","deposit_count":null},{"eid":14,"etitle":"LAN weekend biertjes","uid":3,"amount":19.2,"ecreated":1289577600,"eupdated":1293006206,"timezoneoffset":0,"event_id":3,"depid":null,"uids":"2,3,5,7,1","deposit_count":null},{"eid":10,"etitle":"Day of Defeat","uid":2,"amount":12.5,"ecreated":1289307600,"eupdated":1291900018,"timezoneoffset":0,"event_id":0,"depid":null,"uids":"2,3,6,7,1","deposit_count":null},{"eid":9,"etitle":"Biertjes na de film","uid":5,"amount":19.7,"ecreated":1288910700,"eupdated":1293006098,"timezoneoffset":0,"event_id":2,"depid":null,"uids":"2,3,4,5,1","deposit_count":null},{"eid":8,"etitle":"Biertjes tijdens de film","uid":3,"amount":20.2,"ecreated":1288904400,"eupdated":1293006098,"timezoneoffset":0,"event_id":2,"depid":null,"uids":"2,3,4,5,1","deposit_count":null},{"eid":6,"etitle":"Kaartjes RED","uid":1,"amount":46,"ecreated":1288900800,"eupdated":1293006098,"timezoneoffset":0,"event_id":2,"depid":null,"uids":"2,3,4,5,1","deposit_count":null},{"eid":7,"etitle":"Biertjes voor de film","uid":4,"amount":45,"ecreated":1288897200,"eupdated":1293006098,"timezoneoffset":0,"event_id":2,"depid":null,"uids":"2,3,4,5,1","deposit_count":null},{"eid":5,"etitle":"Verrekening Blondje - Bert","uid":6,"amount":19,"ecreated":1285416000,"eupdated":1291900261,"timezoneoffset":0,"event_id":0,"depid":null,"uids":1,"deposit_count":null},{"eid":4,"etitle":"Biertjes na de film","uid":2,"amount":30,"ecreated":1285277400,"eupdated":1293006054,"timezoneoffset":0,"event_id":1,"depid":null,"uids":"2,3,4,5,6,1","deposit_count":null},{"eid":3,"etitle":"Biertjes tijdens de film","uid":3,"amount":23,"ecreated":1285269300,"eupdated":1293006054,"timezoneoffset":0,"event_id":1,"depid":null,"uids":"2,3,4,5,6,7,1","deposit_count":null},{"eid":1,"etitle":"Kaartjes Machete","uid":1,"amount":40,"ecreated":1285268400,"eupdated":1293006054,"timezoneoffset":0,"event_id":1,"depid":null,"uids":"2,3,4,5,6,7,1","deposit_count":null},{"eid":2,"etitle":"Biertjes voor de film","uid":5,"amount":35,"ecreated":1285265700,"eupdated":1293006054,"timezoneoffset":0,"event_id":1,"depid":null,"uids":"2,3,4,5,6,7,1","deposit_count":null}]}');


        var users = JSON.parse('{"1":{"uid":1,"nickName":"whiskey","active":1,"created":1291896432,"email":"atsantema@yahoo.com","realname":"Bert Santema","firstName":"Bert","lastName":"Santema","updated":0},"2":{"uid":2,"nickName":"Monc","active":1,"created":1291901297,"email":"d.groen@inthere.nl","realname":"Daan Groen","firstName":"Daan","lastName":"Groen","updated":0},"3":{"uid":3,"nickName":"JeePee","active":1,"created":1291899037,"email":"Mail@heetebrij.jp","realname":"JeePee","firstName":"JeePee","lastName":"","updated":0},"4":{"uid":4,"nickName":"martijnsanderse","active":1,"created":1291905917,"email":"martijnsanderse@gmail.com","realname":"Martijn Sanderse","firstName":"Martijn","lastName":"Sanderse","updated":0},"5":{"uid":5,"nickName":"Mitchemius","active":1,"created":1291926587,"email":"meerendonk@gmail.com","realname":"Michiel van Meerendonk","firstName":"Michiel","lastName":" van Meerendonk","updated":0},"6":{"uid":6,"nickName":"Blondje","active":1,"created":1292268294,"email":"manschot@gmail.com","realname":"Sjoerd M.","firstName":"Sjoerd","lastName":"M.","updated":0},"7":{"uid":7,"nickName":"Wiebren","active":1,"created":1292268627,"email":"wdamsma@gmail.com","realname":"Wiebren","firstName":"Wiebren","lastName":"","updated":0},"10":{"uid":10,"nickName":"Sjoerd","active":1,"created":1295470130,"email":"Ooievaar@gmail.com","realname":"Sjoerd","firstName":"Sjoerd","lastName":"","updated":0},"31":{"uid":31,"nickName":"BJW","active":1,"created":1309381583,"email":"berendjanwever@gmail.com","realname":"BJ Wever","firstName":"BJ","lastName":"Wever","updated":0},"39":{"uid":39,"nickName":"Bas","active":1,"created":1374763246,"email":"bas@inthere.nl","realname":"Bas","firstName":"Bas","lastName":"","updated":0},"40":{"uid":40,"nickName":"Muppetshow","active":1,"created":1380989526,"email":"ssantema@hotmail.com","realname":"Sjoerd Santema","firstName":"Sjoerd","lastName":"Santema","updated":0},"41":{"uid":41,"nickName":"purplehaze","active":1,"created":1381006161,"email":"maarten@santema.eu","realname":"Maarten","firstName":"Maarten","lastName":"","updated":0},"43":{"uid":43,"nickName":"BertTest","active":1,"created":1416578276,"email":"bert@inthere.nl","realname":"Bert Test","firstName":"Bert","lastName":"Test","updated":0},"46":{"uid":46,"nickName":"Erik","active":1,"created":1435404102,"email":"Erp.rutten@gmail.com","realname":"Erik","firstName":"Erik","lastName":"","updated":0}}');


        var groups = '';

        function login($username, $password) {
            var deferred = $q.defer();
            authenticationDataService.setAuthData($username, $password);

            $http.get(gdConfig.url_login)
                .success(function (data, status) {
                    console.log("Login success: credentials for " + $username + " are valid");
                    $localStorage.authenticated = true;
                    //fetchGroupsData(data);
                    deferred.resolve(data);
                })
                .error(function () {
                    console.log("Login failed: invalid credentials supplied for " + $username);
                    $localStorage.authenticated = false;
                    deferred.reject();
                });
            return deferred.promise;
        }

        function logout() {
            authenticationDataService.resetAuthData();
            $localStorage.authenticated = false;
        }

        function fetchGroupsData(data) {
            var deferred = $q.defer();

            $http.get(gdConfig.url_groups)
                .success(function (data, status) {
                    console.log("Groups data fetched successfully");
                    $localStorage.groups = data;
                    groups = $localStorage.groups;
                    //return $state.go('home.groups');
                    deferred.resolve(data);
                })
                .error(function () {
                    console.log("Error fetching groups data");
                    $localStorage.authenticated = false;
                    deferred.reject();
                });
            return deferred.promise;
        }

        var host = 'http://api.gdutch.dev/version';

        function getRequest(callback) {
            // $http.defaults.headers.common.Authorization = 'Basic d2hpc2tleTp0ZXN0cGFzc3dvcmQ='
            $http.get(host).success(function (data, status) {
                console.log("RECEIVED: ", data, status);
                //callback(data);
            })
                .error(function () {
                    console.log("Error making http call");
                });
        }

        function getGroupTitle($stateParams) {
            return getGroupTitleByGid($stateParams.gid);
        }

        var groupsArray = [];

        function getGroups() {
            return objectToArraySorted(groups, groupsArray);
        }

        function moveGroup(group, fromIndex, toIndex) {
            return moveItemForSort(groupsArray, group, fromIndex, toIndex);
        }

        function objectToArraySorted(obj, arr) {
            if (arr.length > 0)
                return arr;

            for (var i in obj) {
                if (obj.hasOwnProperty(i)) {
                    if (arr.length == 0) {
                        arr[0] = obj[i];
                        continue;
                    }
                    else if (Number(obj[i].sort) > Number(arr[arr.length - 1].sort)) {
                        arr.push(obj[i]);
                        continue;
                    }
                    for (var j in arr) {
                        if (Number(obj[i].sort) < Number(arr[j].sortId)) {
                            arr.splice(j, 0, obj[i]);
                        }
                    }
                }
            }
            return arr;
        }

        function moveItemForSort(arr, item, fromIndex, toIndex) {
            arr.splice(fromIndex, 1);
            arr.splice(toIndex, 0, item);
            updateSortIds(arr);
            return arr;
        }

        function updateSortIds(arr) {
            for (var j in arr) {
                arr[j].sort = Number(j) + 1;
            }
        }

        //function updateGroupSortIds() {
        //    for (var j in groupsArray) {
        //        groupsArray[j].sort = Number(j) + 1;
        //    }
        //}

        function getUser(uid) {
            return users[uid];
        }

        function getUserName(uid) {
            if (typeof(users[uid]) == 'undefined') {
                return "Error: user " + uid + " not found";
            }
            return users[uid]['nickName'];
        }

        function getGroupTitleByGid(gid) {
            //return _.pluck(_.filter(groups, {'gid': Number(gid)}), 'title')[0];
            return _.pluck(_.filter(groups, {'gid': Number(gid)}), 'name')[0];
        }

        function getGroupMembers(gid) {
            return groups[gid]['members'];
        }

        function getExpenses(gid) {
            return expenses[gid];
        }

        function getExpense(gid, eid) {
            return _.filter(expenses[gid], {'eid': Number(eid)})[0];
        }

        function getGroupCurrency(gid) {
            return _.pluck(_.filter(groupsArray, {'gid': Number(gid)}), 'currency')[0];
        }

        function setGroupCurrency(gid, currencyCode) {
            for (var i = 0, len = groupsArray.length; i < len; i++) {
                if (groupsArray[i].gid == Number(gid)) {
                    groupsArray[i].currency = currencyCode;
                    break;
                }
            }
        }

        function updateExpense(gid, expense) {
            for (var i = 0, len = expenses[gid].length; i < len; i++) {
                if (expenses[gid][i].eid == Number(expense.eid)) {
                    expenses[gid][i] = expense;
                    break;
                }
            }
        }

        var newExpensesMargin = 100000000;

        function addExpense(gid, expense) {
            newExpensesMargin += 1;
            expense.eid = newExpensesMargin;
            expenses[gid].unshift(expense);
        }

        var groupCategories = [];
        for (var i in groups) {
            groupCategories[groups[i].gid] = [];
        }


        function getGroupCategories(gid) {
            return objectToArraySorted(_.pluck(_.filter(groupsArray, {'gid': Number(gid)}), 'categories')[0], groupCategories[gid]);
            //return _.pluck(_.filter(groupsArray, {'gid': Number(gid)}), 'categories')[0];
        }

        function getGroupCategory(gid, cid) {
            for (var j in groupCategories[gid]) {
                if (groupCategories[gid][j].cid == cid)
                    return groupCategories[gid][j];
            }
        }


        function moveCategory(gid, category, fromIndex, toIndex) {
            return moveItemForSort(groupCategories[gid], category, fromIndex, toIndex);
        }

        function setGroupCategory(gid, category, newTitle) {
            if (category === 0) {
                var maxKey = 0;
                for (var i in groupCategories[gid]) {
                    if (groupCategories[gid][i].cid > maxKey) {
                        maxKey = groupCategories[gid][i].cid;
                    }
                }
                maxKey += 1;
                var sortId = groupCategories[gid].length + 1;
                groupCategories[gid][groupCategories[gid].length] = {
                    "cid": maxKey,
                    "title": newTitle,
                    "sort": sortId,
                    "presents": 0,
                    "inactive": 0,
                    "can_delete": 1
                }
            }

            else if (category.cid > 0) {
                //groups[gid]['categories'][cid] = newTitle;
                for (var i = 0, len = groupCategories[gid].length; i < len; i++) {
                    if (groupCategories[gid][i].cid == category.cid) {
                        groupCategories[gid][i].title = newTitle;
                        break;
                    }
                }
            }
            else {
                var maxKey = 0;
                for (var key in groups[gid]['categories']) {
                    if (groups[gid]['categories'].hasOwnProperty(key) && key > maxKey) {
                        maxKey = key;
                    }
                }
                maxKey += 1;
                groups[gid]['categories'][maxKey] = newTitle;
            }
        }

        function getCurrencies() {
            return currencies;
        }

        function getDateFormat(datetype) {
            switch (datetype) {
                case 'date':
                    return 'EEEE, MMMM d yyyy';
                    break;
                case 'time':
                    return 'HH:mm';
                    break;
                default:
                    return 'EEEE, MMMM d yyyy HH:mm';
            }
        }

        function deleteExpense(eid, gid) {
            for (var i = 0, len = expenses[gid].length; i < len; i++) {
                if (expenses[gid][i].eid == eid) {
                    expenses[gid].splice(i, 1);
                    break;
                }
            }
        }

        function pad(value) {
            return value < 10 ? '0' + value : value;
        }

        function createOffset(date) {
            var sign = (date.getTimezoneOffset() > 0) ? "-" : "+";
            var offset = Math.abs(date.getTimezoneOffset());
            var hours = pad(Math.floor(offset / 60));
            var minutes = pad(offset % 60);
            return sign + hours + ":" + minutes;
        }

        //var test = new Date();
        // offset in minutes but negative is really adding to utc
        //console.log(test.getTimezoneOffset());
        //console.log(createOffset(test));


        //var currentTS = Math.floor(Date.now() / 1000)
        //var dateObj = new Date(currentTS * 1000);
        //var London = new Date(currentTS * 1000 - 60 * 60 * 1000);

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
            getGroupMembers: getGroupMembers,
            getDateFormat: getDateFormat,
            deleteExpense: deleteExpense,
            setGroupCategory: setGroupCategory,
            getGroupCategories: getGroupCategories,
            getGroupCategory: getGroupCategory,
            fetchGroupsData: fetchGroupsData,
            moveGroup: moveGroup,
            moveCategory: moveCategory,
            updateExpense: updateExpense,
            createOffset: createOffset,
            addExpense: addExpense,
            login: login,
            logout: logout
        };


    }

})();

// http://stackoverflow.com/questions/31608486/adding-header-to-angular-resource-requests
angular.module("GoingDutchApp").factory('authHttpRequestInterceptor', ['authenticationDataService',
    function (authenticationDataService) {
        return {
            request: function (config) {
                var token = authenticationDataService.getAuthData();

                if (token) {
                    config.headers["Authorization"] = "Basic " + token;
                }
                return config;
            }
        };
    }]);


angular.module("GoingDutchApp").factory("authenticationDataService", ['$localStorage', function ($localStorage) {

    function getAuthData() {
        return $localStorage.token;
    }

    function setAuthData($user, $pass) {
        $localStorage.token = Base64.encode($user + ':' + $pass);
    }

    function resetAuthData() {
        $localStorage.token = false;
    }

    /**
     *
     *  Base64 encode / decode
     *  http://www.webtoolkit.info/
     *
     **/
    var Base64 = {
        // private property
        _keyStr: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",

        // public method for encoding
        encode: function (input) {
            var output = "";
            var chr1, chr2, chr3, enc1, enc2, enc3, enc4;
            var i = 0;

            input = Base64._utf8_encode(input);

            while (i < input.length) {

                chr1 = input.charCodeAt(i++);
                chr2 = input.charCodeAt(i++);
                chr3 = input.charCodeAt(i++);

                enc1 = chr1 >> 2;
                enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
                enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
                enc4 = chr3 & 63;

                if (isNaN(chr2)) {
                    enc3 = enc4 = 64;
                } else if (isNaN(chr3)) {
                    enc4 = 64;
                }

                output = output +
                    this._keyStr.charAt(enc1) + this._keyStr.charAt(enc2) +
                    this._keyStr.charAt(enc3) + this._keyStr.charAt(enc4);

            }

            return output;
        },

        // public method for decoding
        decode: function (input) {
            var output = "";
            var chr1, chr2, chr3;
            var enc1, enc2, enc3, enc4;
            var i = 0;

            input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");

            while (i < input.length) {

                enc1 = this._keyStr.indexOf(input.charAt(i++));
                enc2 = this._keyStr.indexOf(input.charAt(i++));
                enc3 = this._keyStr.indexOf(input.charAt(i++));
                enc4 = this._keyStr.indexOf(input.charAt(i++));

                chr1 = (enc1 << 2) | (enc2 >> 4);
                chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
                chr3 = ((enc3 & 3) << 6) | enc4;

                output = output + String.fromCharCode(chr1);

                if (enc3 != 64) {
                    output = output + String.fromCharCode(chr2);
                }
                if (enc4 != 64) {
                    output = output + String.fromCharCode(chr3);
                }

            }

            output = Base64._utf8_decode(output);

            return output;

        },

        // private method for UTF-8 encoding
        _utf8_encode: function (string) {
            string = string.replace(/\r\n/g, "\n");
            var utftext = "";

            for (var n = 0; n < string.length; n++) {

                var c = string.charCodeAt(n);

                if (c < 128) {
                    utftext += String.fromCharCode(c);
                }
                else if ((c > 127) && (c < 2048)) {
                    utftext += String.fromCharCode((c >> 6) | 192);
                    utftext += String.fromCharCode((c & 63) | 128);
                }
                else {
                    utftext += String.fromCharCode((c >> 12) | 224);
                    utftext += String.fromCharCode(((c >> 6) & 63) | 128);
                    utftext += String.fromCharCode((c & 63) | 128);
                }

            }

            return utftext;
        },

        // private method for UTF-8 decoding
        _utf8_decode: function (utftext) {
            var string = "";
            var i = 0;
            var c = c1 = c2 = 0;

            while (i < utftext.length) {

                c = utftext.charCodeAt(i);

                if (c < 128) {
                    string += String.fromCharCode(c);
                    i++;
                }
                else if ((c > 191) && (c < 224)) {
                    c2 = utftext.charCodeAt(i + 1);
                    string += String.fromCharCode(((c & 31) << 6) | (c2 & 63));
                    i += 2;
                }
                else {
                    c2 = utftext.charCodeAt(i + 1);
                    c3 = utftext.charCodeAt(i + 2);
                    string += String.fromCharCode(((c & 15) << 12) | ((c2 & 63) << 6) | (c3 & 63));
                    i += 3;
                }

            }

            return string;
        }

    };

    return {
        getAuthData: getAuthData,
        setAuthData: setAuthData,
        resetAuthData: resetAuthData
    }
}]);