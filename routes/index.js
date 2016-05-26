var express = require('express');
var router = express.Router();
var Typearea = require('../controllers/Typearea');
var Chronic = require('../controllers/Chronic');
var Version = require('../controllers/Version');
var HomeHealthCare = require('../controllers/HomeHealthCare');


/* GET home page. */
router.get('/', function(req, res, next) {
    res.send({ok: true, msg: 'Welcome to Maha Sarakham Health Support System.'});
});

// Typearea
router.post('/typearea/list', Typearea.list);
router.post('/typearea/detail', Typearea.detail);
router.post('/typearea/confirm', Typearea.confirm);
router.post('/typearea/change', Typearea.changeTypearea);
router.post('/hhc/list', HomeHealthCare.getImportsList);
router.post('/hhc/hhc_list', HomeHealthCare.getHHCList);
router.post('/hhc/hhc_list_imports', HomeHealthCare.getHHCImportsList);
router.post('/hhc/person_hhc_detail', HomeHealthCare.getPersonHHC);
router.post('/hhc/set_flag', HomeHealthCare.doSetFlag);
router.post('/hhc/provider', HomeHealthCare.getProvider);
router.post('/hhc/search_cid', HomeHealthCare.searchCid);
router.post('/hhc/commuserv', HomeHealthCare.getCommuserv);
router.post('/hhc/commu_group', HomeHealthCare.getCommuGroup);
router.post('/hhc/data_count', HomeHealthCare.getdataCount);
router.post('/hhc/sync_data', HomeHealthCare.synData);
//router.get('/hhc/connection', HomeHealthCare.connection);

// Chronicn
router.post('/chronic/duplicated/list', Chronic.getDuplicated);

// Version
router.post('/version', Version.getVersion);

// Export module
module.exports = router;
