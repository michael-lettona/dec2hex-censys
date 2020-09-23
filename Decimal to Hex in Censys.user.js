// ==UserScript==
// @name         Decimal to Hex in Censys
// @namespace    https://digicert.com/
// @version      0.5
// @description  Converts serial numbers in Censys from decimal to hexadecimal.
// @author       Michael Lettona
// @match        https://censys.io/certificates/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';


    //var num = document.getElementsByTagName("dd")[2].textContent;
    var num = document.getElementsByTagName("dd")[2].textContent.replace(/[A-Za-z: ]*/,'').split(/[Hex]+/)[0];
    var hash = document.getElementsByTagName("dd")[5].textContent.toUpperCase();
    var hex_value = dec2Hex(num).toUpperCase();
    //alert(hex_value);
    //console.log(hex_value);

    var outputElem = document.getElementsByClassName("dl-horizontal dl")[0];
    var snlink = outputElem.cloneNode(true);
    snlink.innerHTML = '<dt>Serial (hex) </dt><dd>'+hex_value+'<br>[<a href="https://admin.digicert.com/adminarea/support-tools/view-by-serial-number.php?serial_number='+0+hex_value+'" target="_blank">AdminArea</a>]<span class="medspace"></span>[<a href="https://crt.sh/?serial='+hex_value+'" target="_blank">crt.sh Serial</a>]<span class="medspace"></span>[<a href="https://crt.sh/?sha256='+hash+'" target="_blank">crt.sh Hash]</dd></dd>';
    outputElem.appendChild(snlink);


//###############################################################################################################################################################################################
//Decimal to Hexadecimal conversion starts here
function dec2Hex(num){

	if(num.length > 15){
		return dec2Hex_big(num)
	}

	else{
		var hex = (new Number(num).toString(16))
		/*if(isNaN(hex)){
			displayMessage('dec');
			return ''
		}*/

		return hex

    }
}

//################################################################################################################################################################################################
//Decimal to Hexadecimal for large numbers
function dec2Hex_big(num){
	var hex_chars = ['a','b','c','d','e','f'];
	var s = [];
	var count =0;
	while(num.length > 2 || parseInt(num) > 15){

		var rem = 0;

		var q = new String();
		var start = 0;
		var firstTime = true;
		count++;

		for(var i = 0 ; i < num.length;i++){
			var intr_sum = new Number(num.substring(start,i+1));
			intr_sum = intr_sum + rem*10;

			if(intr_sum<16){

				if(firstTime)
					continue;
				if(!(q.length==0)){
					q+='0'

				}
				rem = parseInt(intr_sum);

			}
			else{
				firstTime=false;
				q+=parseInt(intr_sum/16)
				rem = parseInt(intr_sum%16);

			}
			start = i+1;

		}
		num = q;
		if(rem > 9)
	s+=(hex_chars[rem-10]);
       else
	s+=(rem);

	}

	if(num > 9)
	s+=(hex_chars[num-10]);
       else
	s+=(num);

	return reverse(s);

}

//################################################################################################################################################################################################
function hex2Dec(num){
    num = num.toLowerCase()
	var hex_pow=[]
    hex_pow.length = num.length
    var len = num.length
    hex_pow[0] = "1"
    var ans = new String()
    ans = "0";
    var hex_conv = ["10","11","12","13","14","15"]

    for(var i = 1; i <len ;i++){
        hex_pow[i] = multiply(hex_pow[i-1],"16");
    }

    for(var i = num.length-1;i >=0; i--){
        var n = (num.charAt(i)).charCodeAt();
        var val = (n > ('9'.charCodeAt())) ? hex_conv[n-('a'.charCodeAt())] : n-('0'.charCodeAt());

        var temp = multiply(val+"",hex_pow[num.length-1-i]);
        ans = add(ans,temp);

    }

    return ans;

}

//Decimal to Hexadecimal conversion ends here
//##############################################################################################################################################################################################################################################################
//function for string reverse
function reverse(s) {
    var o = '';
    for (var i = s.length - 1; i >= 0; i--)
        o += s[i];
    return o;
}

})();
