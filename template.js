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
var tpl = '<# var notFound = "�޻��˹켣"; #>\
	<div class="taskName">��������<#= doc_code #></div>\
	<ul>\
	<li>ӪҵԱ������<#= saler ? saler : notFound #><#= saler_date #> </li>\
	<li>Ӫҵ���ӵ���<#= haller ? haller : notFound #> <#= haller_date #> </li>\
	<# if(regioner_id){ #>\
		<li>����ӵ���<#= regioner ? regioner : notFound #> <#= regioner_date #> </li>\
		<li>������ܣ�<#= regioner2 ? regioner2 : notFound #> <#= regioner_date2 #> </li>\
	<# }else{ #>\
		<li>Ӫҵ�����ܣ�<#= haller2 ? haller2 : notFound #> <#= haller_date2 #> </li>\
		<# if(regioner_id2){ #><li>����ӵ���<#= regioner2 #> <#= regioner_date2 #> </li><# } #>\
	<# } #>\
	<li>�ֹ�˾�ӵ���<#= brancher ? brancher :notFound #> <#= brancher_date #> </li>\
	<li>ɨ��Ա�ӵ���<#= scanner ? scanner : notFound #> <#= scanner_date #> </li>\
	<li>��������<#= creator ? creator : notFound #> <#= create_date #> </li>\
	<li>У�ԣ�<#= verifier ? verifier : notFound #> <#= verify_date #> </li>\
	<li>�ȶԣ�<#= comparor ? comparor : notFound #> <#= compare_date #> </li>\
	<li>���ˣ�<#= auditor ? auditor : notFound #> <#= audit_date #> </li>\
	<li>���˽��:<#= passed == 1 ? "ͨ��" : "δͨ����" + (remark ? remark : "�ޱ�ע") + "��" #></li>\
	</ul>';