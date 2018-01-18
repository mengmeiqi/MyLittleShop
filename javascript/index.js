/**
 * Created by MMQ on 2017/6/11.
 */
(function(){
    var oProduct = document.getElementById("product");
    var aButton = oProduct.getElementsByTagName("button");
    var aAdd = [];
    var aSpan = oProduct.getElementsByTagName("span");
    var aPrice = [];
    var oTotalNum = document.getElementById("total_num");
    var oTotalPrice = document.getElementById("total_price");
    var aNum = oProduct.getElementsByTagName("input");
    var oClear = document.getElementById("cart_clear");
    for(var i=0;i<aButton.length;i++){
        if(aButton[i].className == "add"){
            aAdd.push(aButton[i]);
        }
    }
    for(var i=0;i<aSpan.length;i++){
        if(aSpan[i].className == "cd_lb_price_1"){
            aPrice.push(aSpan[i]);
        }
    }
    for(var i=0;i<aAdd.length;i++){
        aAdd[i].index = i;
        aAdd[i].onclick = function(){
            oTotalNum.innerHTML = parseInt(aNum[this.index].value) + parseFloat(oTotalNum.innerHTML) ;
            oTotalPrice.innerHTML = parseFloat(oTotalPrice.innerHTML) +  aPrice[this.index].innerHTML * aNum[this.index].value;
        };
    }
    oClear.onclick = function(){
        oTotalNum.innerHTML = "0";
        oTotalPrice.innerHTML = "0.00";
    }
})();
