const EJS = require('ejs')
const FS = require('fs')
const PATH = require('path')
const FORMIDABLE = require("formidable");
let fetch = require('../db/fetch')
let db = require('../db/db')
let email = require('../db/email')


module.exports = routes = {
    assest: function (data, res) {
        let assets = FS.readFileSync(PATH.normalize(PATH.join(__dirname + "/.." + data.url)));
        res.writeHead(200);
        res.write(assets);
        res.end("\n");
    },
    reserve: async function (data, res) {
        let form = new FORMIDABLE.IncomingForm();
        form.parse(data.dt, async function (err, fields, files) {
            if (err) {
                //handle errors
                console.error(err);
                return;
            }
            var obj;

            obj = {
                fields: fields,
                files: files
            }
            let getvol = await db.get(fetch.getvol(obj.fields.depart, obj.fields.dest, obj.fields.departure));
            EJS.renderFile('./reserve.ejs', {
                data: getvol,
            }, function (err, str) {
                res.writeHead(200, {
                    'Content-Type': 'text/html;charset=utf-8'
                });
                if (err) {
                    res.end();
                } else {
                    res.end(str);
                }
            });
        })


    },
    booking: async function (data, res) {
        let form = new FORMIDABLE.IncomingForm();
        form.parse(data.dt, async function (err, fields, files) {
            if (err) {
                //handle errors
                console.error(err);
                return;
            }
            var obj;

            obj = {
                fields: fields,
                files: files
            }
            await db.get(fetch.savereserv(obj.fields.idvol, obj.fields.nom, obj.fields.prenom, obj.fields.phone, obj.fields.email, obj.fields.place));
            email.mail(obj.fields.email)

            EJS.renderFile('./done.ejs', {
                data: obj,
            }, function (err, str) {
                res.writeHead(200, {
                    'Content-Type': 'text/html;charset=utf-8'
                });
                if (err) {
                    res.end();
                } else {
                    res.end(str);
                }
            });
        })


    },
    index: async function (data, res) {
        let fetchfrom = await db.get(fetch.vol_from());
        let fetchto = await db.get(fetch.vol_to());


        EJS.renderFile('./index.ejs', {
            from: fetchfrom,
            to: fetchto
        }, function (err, str) {
            res.writeHead(200, {
                'Content-Type': 'text/html;charset=utf-8'
            });
            if (err) {
                res.end();
            } else {
                res.end(str);
            }
        });
    },
    error: function (data, res) {
        let html = EJS.render(FS.readFileSync("./error.ejs", "utf8"));
        res.writeHead(200);
        res.write(html);
        res.end("\n");
    }
}