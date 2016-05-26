/** Chronic model **/
var Q = require('q');

exports.getImportsList = function (db, hospcode, commu_group ) {
    var q = Q.defer();
    db('person_community_service as m')
        .select()
        .where('m.COMMU_GROUP', commu_group)
        .where('m.HOSPCODE', hospcode)
        //.groupByRaw('m.CID, m.GROUPCODE')
        //.limit(25).offset(offset)
        .exec(function (err, rows) {
            if (err) q.reject(err);
            else q.resolve(rows);
        });

    return q.promise;
};
exports.getImportsListtoHIS = function (db, hospcode) {
    var q = Q.defer();
    var sql=" SELECT * FROM community_service WHERE hospcode='"+hospcode+"' AND flag !='2'";
    db.raw(sql, [])
        .then(function (rows){
            q.resolve(rows[0]);
        });
    return q.promise;

};
exports.getHHCList = function (db, hospcode, offset ) {
    var q = Q.defer();
    var sql=" SELECT * FROM community_service WHERE hospcode='"+hospcode+"'";
    console.log(sql);
    db.raw(sql, [])
        .then(function (rows){
            q.resolve(rows[0]);
        });
    return q.promise;
};

exports.getPersonHHC = function (db, hospcode, vn ) {
    var q = Q.defer();
    var sql=" SELECT * FROM community_service WHERE hospcode='"+hospcode+"' AND vn='"+vn+"'";
    console.log(sql);
    db.raw(sql, [])
        .then(function (rows){
            q.resolve(rows[0]);
        });
    return q.promise;
};

exports.getProvider = function (db, hospcode) {
    var q = Q.defer();
    db('provider as m')
        .select()
        .where('m.HOSPCODE', hospcode)
        //.groupByRaw('m.CID, m.GROUPCODE')
        //.limit(25).offset(offset)
        .exec(function (err, rows) {
            if (err) q.reject(err);
            else q.resolve(rows);
        });

    return q.promise;
};
exports.getCommuserv = function (db) {
    var q = Q.defer();
    db('ccommuserv as m')
        .select()
        .exec(function (err, rows) {
            if (err) q.reject(err);
            else q.resolve(rows);
        });

    return q.promise;
};
exports.searchCid = function (db, hospcode, cid) {
    var q = Q.defer();
    var sql = " SELECT HOSPCODE, person.cid AS CID, PID,CONCAT(person.`NAME`,' ',person.LNAME) AS PTNAME,person.SEX,person.BIRTH,(PERIOD_DIFF(DATE_FORMAT(NOW(),'%Y%m'),DATE_FORMAT(person.birth,'%Y%m')) DIV 12) AS AGE,getAddress(hdc.person.CID) as ADDRESS FROM hdc.person WHERE NAME LIKE '"+cid+"%' AND HOSPCODE='"+hospcode+"'; ";
    console.log(sql);
    db.raw(sql, [])
        .then(function (rows) {
            q.resolve(rows[0]);
        });
    return q.promise;
};

exports.doSetFlag = function (db, hospcode, vn) {
    var q = Q.defer();

    db('community_service')
        .where('hospcode', hospcode)
        .where('vn', vn)
        .update({
            flag: 2
        })
        .exec(function (err) {
            if (err) q.reject(err);
            else q.resolve();
        });

    return q.promise;
};

exports.getCommuGroup = function (db) {
    var q = Q.defer();
    db('commu_group as m')
        .select()
        .exec(function (err, rows) {
            if (err) q.reject(err);
            else q.resolve(rows);
        });

    return q.promise;
};
exports.getDataCount = function (db, hospcode, date_start, date_end) {
    var q = Q.defer();
    var sql="select COMSERVICE as comservice,b.commuserv, count(*) as total FROM community_service a LEFT JOIN ccommuserv b ON a.COMSERVICE=b.id_commuserv WHERE hospcode='"+hospcode+"'  AND DATE_FORMAT(a.DATE_SERV,'%Y-%m-%d') BETWEEN '"+date_start+"' AND '"+date_end+"' GROUP BY COMSERVICE ORDER BY total DESC";

    console.log(sql);
    db.raw(sql)
        .then(function (rows){
            q.resolve(rows[0]);
        });
    return q.promise;
};
exports.saveDataHHC= function (db, data) {
    var q = Q.defer();

    db('community_service')
        .insert({
            hospcode: data.hospcode,
            pid: data.pid,
            cid: data.cid,
            ptname: data.ptname,
            date_serv: data.date_serv,
            diagcode: data.diagcode,
            cc: data.cc,
            weight: data.weight,
            height:data.height,
            bps:data.bps,
            comservice:data.comservice,
            bpd:data.bpd,
            pr:data.pr,
            rr: data.rr,
            temp: data.temp,
            pt_img: data.pt_img,
            com_img1: data.com_img1,
            com_img2: data.com_img2,
            com_img3:data.com_img3,
            dc_code: data.dc_code,
            provider: data.provider,
            vn : data.vn,
            flag:1
        })
        .exec(function (err) {
            if (err) q.reject(err);
            else q.resolve();
        });

    return q.promise;
};