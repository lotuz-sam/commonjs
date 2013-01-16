$.parseTpl = function(tpl, values) {
	var fn = tplCache[tpl];
	if (!fn) {
		fn = new Function("obj", "var _=[];with(obj){_.push('" +
				tpl.replace(/[\r\t\n]/g, " ")
				.replace(/'(?=[^#]*#>)/g, "\t")
				.split("'").join("\\'")
				.split("\t").join("'")
				.replace(/<#=(.+?)#>/g, "',$1,'")
				.split("<#").join("');")
				.split("#>").join("_.push('")
				+ "');}return _.join('');");
		tplCache[tpl] = fn;
	}
	return fn(values);
}

// demo
var tpl = '<# var notFound = "无稽核轨迹"; #>\
	<div class="taskName">所在任务：<#= doc_code #></div>\
	<ul>\
	<li>营业员创建：<#= saler ? saler : notFound #><#= saler_date #> </li>\
	<li>营业厅接单：<#= haller ? haller : notFound #> <#= haller_date #> </li>\
	<# if(regioner_id){ #>\
		<li>区域接单：<#= regioner ? regioner : notFound #> <#= regioner_date #> </li>\
		<li>区域汇总：<#= regioner2 ? regioner2 : notFound #> <#= regioner_date2 #> </li>\
	<# }else{ #>\
		<li>营业厅汇总：<#= haller2 ? haller2 : notFound #> <#= haller_date2 #> </li>\
		<# if(regioner_id2){ #><li>区域接单：<#= regioner2 #> <#= regioner_date2 #> </li><# } #>\
	<# } #>\
	<li>分公司接单：<#= brancher ? brancher :notFound #> <#= brancher_date #> </li>\
	<li>扫描员接单：<#= scanner ? scanner : notFound #> <#= scanner_date #> </li>\
	<li>创建任务：<#= creator ? creator : notFound #> <#= create_date #> </li>\
	<li>校对：<#= verifier ? verifier : notFound #> <#= verify_date #> </li>\
	<li>比对：<#= comparor ? comparor : notFound #> <#= compare_date #> </li>\
	<li>稽核：<#= auditor ? auditor : notFound #> <#= audit_date #> </li>\
	<li>稽核结果:<#= passed == 1 ? "通过" : "未通过（" + (remark ? remark : "无备注") + "）" #></li>\
	</ul>';