var path = require('path');
var eejs = require("ep_etherpad-lite/node/eejs");
var exportLatex = require('./ExportLatex');

exports.expressCreateServer = function (hook_name, args, cb) {
	args.app.get('/p/:pad/:rev?/export/latex', function(req, res, next) {
		var padID = req.params.pad;
		var revision = req.params.rev ? req.params.rev : null;

		exportLatex.getPadLatexDocument(padID, revision, function(err, result) {
			res.contentType('plain/text');
			res.send(result);
		});
	});
};

exports.eejsBlock_exportColumn = function(hook_name, args, cb) {
	args.content = args.content + eejs.require("ep_latexexport/templates/exportcolumn.html", {}, module);
	return cb();
};

exports.eejsBlock_scripts = function (hook_name, args, cb) {
	args.content = args.content + eejs.require("ep_latexexport/templates/scripts.html", {}, module);
	return cb();
};

exports.eejsBlock_styles = function (hook_name, args, cb) {
	args.content = args.content + eejs.require("ep_latexexport/templates/styles.html", {}, module);
	return cb();
};