define(['vendor/jade-runtime'], function (jade){ var templates = {};

//
// Source file: [/Users/krishnarokhale/code/level/level/timesheetapp/assets/javascripts/app/template/another-example.jade]
// Template name: [another-example]
//
templates['another-example'] = function template(locals) {
var buf = [];
var jade_mixins = {};
var jade_interp;
;var locals_for_with = (locals || {});(function (name) {
buf.push("<div>And this is coming from another " + (jade.escape((jade_interp = name) == null ? '' : jade_interp)) + " template that is concatenated into a single template file with the others.</div>");}.call(this,"name" in locals_for_with?locals_for_with.name:typeof name!=="undefined"?name:undefined));;return buf.join("");
}

//
// Source file: [/Users/krishnarokhale/code/level/level/timesheetapp/assets/javascripts/app/template/example-partial.jade]
// Template name: [example-partial]
//
templates['example-partial'] = function template(locals) {
var buf = [];
var jade_mixins = {};
var jade_interp;

buf.push("<div class=\"helper\">And this is coming from a Jade partial</div>");;return buf.join("");
}

//
// Source file: [/Users/krishnarokhale/code/level/level/timesheetapp/assets/javascripts/app/template/example.jade]
// Template name: [example]
//
templates['example'] = function template(locals) {
var buf = [];
var jade_mixins = {};
var jade_interp;
;var locals_for_with = (locals || {});(function (name, css) {
buf.push("<div class=\"template\">This is coming from a " + (jade.escape((jade_interp = name) == null ? '' : jade_interp)) + " template</div><div class=\"helper\">And this is coming from a Jade partial</div><div class=\"styled\">And it has all been styled (poorly) using " + (jade.escape((jade_interp = css) == null ? '' : jade_interp)) + "</div>");}.call(this,"name" in locals_for_with?locals_for_with.name:typeof name!=="undefined"?name:undefined,"css" in locals_for_with?locals_for_with.css:typeof css!=="undefined"?css:undefined));;return buf.join("");
}
return templates; });