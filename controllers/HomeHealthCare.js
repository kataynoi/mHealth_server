/** Chronic controller **/
var HHC = require('../models/HomeHealthCare');

exports.getImportsList = function (req, res) {
    var db = req.db_hhc;
     //var key = req.body.key;
     var hospcode = req.body.hospcode;
     var commu_group = req.body.id;
     //var offset = req.body.offset;
     //if (key == req.session.key) {
     HHC.getImportsList(db, hospcode, commu_group)
     .then(function (rows) {
     res.send({ok: true, rows: rows});
     }, function (err) {
     console.log(err);
     res.send({ok:false, msg: err});
     });
     //} else {
     //res.send({ ok: false, msg: 'Invalid key, please login again.' });
    // }
    //res.send({ ok: false, msg: 'OK test.' });
};

exports.getHHCImportsList = function (req, res) {
    var db = req.db_hhc;
     var hospcode = req.body.hospcode;
     HHC.getImportsListtoHIS(db, hospcode)
     .then(function (rows) {
     res.send({ok: true, rows: rows});
     }, function (err) {
     console.log(err);
     res.send({ok:false, msg: err});
     });
};

exports.getHHCList = function (req, res) {
    var db = req.db_hhc;
     var key = req.body.key;
     var hospcode = req.body.hospcode;
     var offset = req.body.offset;
    console.log('User Key:'+key+' Server Key :'+req.session.key);
     if (key == req.session.key) {
     HHC.getHHCList(db, hospcode, offset)
     .then(function (rows) {
             //console.log(rows);
     res.send({ok: true, rows: rows});
     }, function (err) {
     console.log(err);
     res.send({ok:false, msg: err});
     });
    } else {
    res.send({ ok: false, msg: 'Invalid key, please login again.' });
     }
    //res.send({ ok: false, msg: 'OK test.' });
};

exports.getProvider = function (req, res) {
    var db = req.db;
     //var key = req.body.key;
     var hospcode = req.body.hospcode;
     HHC.getProvider(db, hospcode)
     .then(function (rows) {
     res.send({ok: true, rows: rows});
     }, function (err) {
     console.log(err);
     res.send({ok:false, msg: err});
     });
};

exports.doSetFlag = function (req, res) {
    var db = req.db_hhc;
     var hospcode = req.body.hospcode;
     var vn = req.body.vn;
     HHC.doSetFlag(db, hospcode, vn)
     .then(function () {
     res.send({ok: true});
     }, function (err) {
     console.log(err);
     res.send({ok:false, msg: err});
     });
};
exports.getCommuserv = function (req, res) {
    var db = req.db;
     HHC.getCommuserv(db)
     .then(function (rows) {
     res.send({ok: true, rows: rows});
     }, function (err) {
     console.log(err);
     res.send({ok:false, msg: err});
     });
};
exports.getCommuGroup = function (req, res) {
    var db = req.db_hhc;
     HHC.getCommuGroup(db)
     .then(function (rows) {
     res.send({ok: true, rows: rows});
     }, function (err) {
     console.log(err);
     res.send({ok:false, msg: err});
     });
};
exports.getdataCount = function (req, res) {
    var db = req.db;
    var hospcode = req.body.hospcode;
    var date_start = req.body.date_start;
    var date_end = req.body.date_end;
     HHC.getDataCount(db, hospcode, date_start, date_end)
     .then(function (rows) {
     res.send({ok: true, rows: rows});
     }, function (err) {
     console.log(err);
     res.send({ok:false, msg: err});
     });
};
exports.getPersonHHC = function (req, res) {
    var db = req.db_hhc;
    var hospcode = req.body.hospcode;
    var vn= req.body.vn;
     HHC.getPersonHHC(db, hospcode, vn)
     .then(function (rows) {
     res.send({ok: true, rows: rows});
     }, function (err) {
     console.log(err);
     res.send({ok:false, msg: err});
     });
};

exports.searchCid = function (req, res) {
    var db = req.db_hhc;
    var hospcode = req.body.hospcode;
    var cid = req.body.cid;
     HHC.searchCid(db, hospcode, cid)
     .then(function (rows) {
     res.send({ok: true, rows: rows});
     }, function (err) {
     console.log(err);
     res.send({ok:false, msg: err});
     });
};

exports.synData = function (req, res) {
    var db = req.db_hhc;
    var data = req.body.data;
        console.log('Data : '+JSON.stringify(data));
     HHC.saveDataHHC(db, data)
     .then(function () {
             res.send({ok:true,vn:data.vn});
     }, function (err) {
     console.log(err);
     res.send({ok:false, msg: err});
     });
};
