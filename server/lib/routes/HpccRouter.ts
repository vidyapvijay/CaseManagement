import { Router } from 'express';
import { locateClientTools, Workunit, Topology, DFUService, WorkunitsService } from "@hpcc-js/comms";
import { Guid } from "guid-typescript";
import * as superagent from "superagent";
const path = require('path');
var http = require('http');
var fs = require('fs');
let router = Router();

router.post('/getThorList', function (request, response) {
    try {
        let url = request.body.eclIP;
        let username = request.body.username;
        let password = request.body.password;
        let myTopology = new Topology({ baseUrl: url, userID: username, password: password });
        myTopology.fetchTargetClusters().then((targetClusterList) => {
            response.json(targetClusterList);
        });

    } catch (err) {
        console.log('err', err);
    }
});

router.post('/getFileListForSearch', function (request, response) {
    try {
        let url = request.body.eclIP;
        let username = request.body.username;
        let password = request.body.password;
        let pattern = request.body.pattern;
        let contentType = request.body.contentType;
        let myDFUService = new DFUService({ baseUrl: url, userID: username, password: password });
        myDFUService.DFUQuery({ LogicalName: pattern, ContentType: contentType }).then((filelist) => {
            response.json(filelist);
        });

    } catch (err) {
        console.log('err', err);
    }
});

router.get('/callForFileDetails', function (request, response) {
    try {
        let url = request.query.eclIP;
        let filename = request.query.selectedFile;
        url = url + "/WsDfu/DFUInfo.json";
        superagent
            .get(url)
            .query({ Name: filename })
            .end((err, res1) => {
                if (err) { return console.log('Error: ', err); }
                console.log('Body: ', res1.body);
                response.json(res1.body);
            });
    } catch (err) {
        console.log('err', err);
    }
});

router.post('/getWorkunitInfo', function (request, response) {
    try {
        let url = request.body.eclIP;
        let username = request.body.username;
        let password = request.body.password;
        let wuid = request.body.wuid;
        let myWorkunitsService = new WorkunitsService({ baseUrl: url, userID: username, password: password });
        myWorkunitsService.WUInfo({ Wuid: wuid }).then((winfo) => {
            // console.log(`${winfo.Workunit.Wuid}`);
            response.json(winfo);
        });
    } catch (err) {
        console.log('err', err);
    }
});
router.post('/workUnitCreateandUpdate', function (request, response) {
    try {
        console.log("Workunit Create and Update");
        let url = request.body.eclIP;
        let username = request.body.username;
        let password = request.body.password;
        let QueryText = request.body.QueryText;
        console.log("//////////", QueryText);
        let recLimit = request.body.ResultLimit;
        let ClusterId = request.body.ClusterId;
        //let wuid = request.body.wuid;
        let myWorkunitsService = new WorkunitsService({ baseUrl: url, userID: username, password: password });
        myWorkunitsService.WUCreate().then((wunit) => {
            myWorkunitsService.WUUpdate({ Wuid: wunit.Workunit.Wuid, QueryText: QueryText, ResultLimit: recLimit, Jobname: 'HPCCInfoRequest' }).then((workunits) => {
                myWorkunitsService.WUSubmit({ Wuid: workunits.Workunit.Wuid, Cluster: ClusterId }).then((workunit) => {
                    console.log(workunit);
                });
            });
            response.json(wunit);
        });
    } catch (err) {
        console.log('err', err);
    }
});
router.post('/workUnitResult', function (request, response) {
    try {
        console.log("Workunit Result");
        let url = request.body.eclIP;
        let username = request.body.username;
        let password = request.body.password;
        //let QueryText = request.body.QueryText;
        let wuid = request.body.wuid;
        let recLimit = request.body.ResultLimit;
        let ClusterId = request.body.ClusterId;
        let resultName = request.body.ResultName;
        console.log("...................................", resultName);
        let myWorkunitsService = new WorkunitsService({ baseUrl: url, userID: username, password: password });
        myWorkunitsService.WUResult({ Wuid: wuid, Cluster: ClusterId, Start: 0, ResultName: resultName, Count: recLimit }).then((wunit) => {
            response.json(wunit);
        });
    } catch (err) {
        console.log('err', err);
    }
});
router.post('/ajaxCreateECLFIle', function (request, response) {
    try {
        let url = request.body.eclIP;
        let username = request.body.username;
        let password = request.body.password;
        let QueryText = request.body.eclQuery;
        let ClusterId = request.body.clusterid;
        console.log("ajaxCreateECLFIle===================", QueryText);
        var id = Guid.create();
        fs.writeFile('./lib/temp/In/' + id + '.ecl', QueryText, 'UTF8', (err) => {
            if (err) throw err;
            console.log('====----====The file has been saved!', ClusterId);
        });
        locateClientTools(undefined, undefined, ".").then((clientTools) => {
            return clientTools.createArchive('./lib/temp/In/' + id + '.ecl');
        }).then(archive => {
            return Workunit.submit({ baseUrl: url, userID: username, password: password }, ClusterId, archive.content);
        }).then((wu) => {
            console.log("watchuntilcomplete");
            return wu.watchUntilComplete();
        }).then((wu) => {
            console.log("wt then", wu);
            return wu.fetchResults().then((results) => {
                let wt = results[0].fetchRows();
                console.log('wt', results);
                return wt;
            }).then((rows) => {
                console.log('wu', wu);
                return wu;
            }).then((rs) => {
                console.log("File is deleted", rs);
                fs.unlinkSync('./lib/temp/In/' + id + '.ecl');
                response.json(rs);
            });
        });
    } catch (err) {
        console.log('err', err);
    }
});
router.get('/dataseersService', function (request, response) {
    try {
        console.log("Calling DataseersService");
        let filename = request.query.filename;
        let foldername = request.query.foldername;
        let username = request.query.username;
        let password = request.query.password; 

        let url = '';
        url = "http://corp.dataseers.us:8002/WsEcl/submit/query/thor/accountnumber_account/json";
        superagent
            .get(url)
            .query({ filename: filename, foldername: foldername })
            .auth(username, password)
            .end((err, res1) => {
                if (err) { return console.log('Error: ', err); }
                console.log('Body: ', res1.body);
                response.json(res1.body);
            });
    } catch (err) {
        console.log('err', err);
    }
});
router.get('/getconfig', function (request, response) {
    try {
        console.log("Calling getconfig service");   
        let username = request.query.username;
        let password = request.query.password;     
        let url = "http://corp.dataseers.us:8002/WsEcl/submit/query/thor/getconfig/json";
        superagent
            .get(url)
            .auth(username, password)
            .end((err, res1) => {
                if (err) { return console.log('Error: ', err); }
                response.json(res1.body);
            });
    } catch (err) {
        console.log('err', err);
    }
});

// router.post('/downloadFileFromServer', function (req, res) {
//     console.log('Calling downloadFileFromServer');
//     try {
//         const filename = 'adhoc_results.csv'; // You will get this in the ouput after the service executes and creates a file
//         const netaddress = '192.168.1.226';
//         const lzpath =  '/mnt/dropzone/dev/adhoc/output'; //Directory from where the file needs to be downloaded 
//         const os = '2';
//         const username = '';
//         const password = '';
//         let url = 'http://corp.dataseers.us:8010';
//         url = url + "/FileSpray/DownloadFile?Name="+ filename + "&NetAddress=" + netaddress + "&Path=" + lzpath + "&OS=" + os;
//         console.log(url);
//         const superagentreq = superagent
//             .get(url)
//             .auth(username, password)
//             .timeout({
//                 response: 10000,  // Wait 10 seconds for the server to start sending,
//                 deadline: 120000, // but allow 2 minute for the file to finish downloading.
//             })
            
//         superagentreq.pipe(res);
        
//         res.setHeader('Content-disposition', 'attachment; filename=' + filename);
//         res.set('Content-Type', 'text/csv');
        
//     } catch (err) {
//         console.log('err', err);
//     }
// });



router.post('/downloadFileFromServer', function (req, res) {
    console.log('Calling downloadFileFromServer');
    try {
        let url = req.body.url;
        const username = req.body.username;
        const password = req.body.password;
        const lzpath =  req.body.lzpath;
        const netaddress = req.body.netaddress;
        const filename = req.body.filename;
        const os = '2';
        // const filename = 'adhoc_results.csv'; // You will get this in the ouput after the service executes and creates a file
        // const netaddress = '192.168.1.226';
        // const lzpath =  '/mnt/dropzone/dev/adhoc/output'; //Directory from where the file needs to be downloaded 
        // const os = '2';
        // const username = '';
        // const password = '';
        // let url = 'http://corp.dataseers.us:8010';
        url = url + "/FileSpray/DownloadFile?Name="+ filename + "&NetAddress=" + netaddress + "&Path=" + lzpath + "&OS=" + os;
        console.log(url);
        const superagentreq = superagent
            .get(url)
            .auth(username, password)
            .timeout({
                response: 10000,  // Wait 10 seconds for the server to start sending,
                deadline: 120000, // but allow 2 minute for the file to finish downloading.
            })
            
        superagentreq.pipe(res);
        
        res.setHeader('Content-disposition', 'attachment; filename=' + filename);
        res.set('Content-Type', 'text/csv');
        
    } catch (err) {
        console.log('err', err);
    }
});

export { router };  