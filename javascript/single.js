/**
 * Created by dell on 2017/6/24.
 */
(function(){
    var oSmall = document.getElementById("small");
    var aSmallImg = oSmall.getElementsByTagName("img");
    var oBig = document.getElementById("big");
    var oBigImg = oBig.getElementsByTagName("Img")[0];
    var oLeft = document.getElementById("single-left");
    var oRight = document.getElementById("single-right");
    var oSinglePic = document.getElementById("single-pic");
    var oDrag = document.getElementById("drag");
    var oMagnify = document.getElementById("magnify");
    var oMagImg = oMagnify.getElementsByTagName("img")[0];
    var oMask = document.getElementById("mask");
    var oSingle = document.getElementById("single");
    var oWrapper = oSingle.getElementsByClassName("wrapper")[0];
    var nowIndex = 0;
    for(var i=0;i<aSmallImg.length;i++) {
        aSmallImg[i].index = i;
        aSmallImg[i].onclick = function () {
            nowIndex = this.index;
            changeImg();
        };
    }
    oLeft.onclick = oRight.onclick = function () {
        if (this == oLeft) {
            nowIndex--;
            if (nowIndex == -1) {
                nowIndex = aSmallImg.length - 1;
            }
        } else {
            nowIndex++;
            if (nowIndex == aSmallImg.length) {
                nowIndex = 0;
            }
        }
        changeImg();
    };
    function changeImg() {
        oBigImg.src = aSmallImg[nowIndex].src;
        for (var i = 0; i < aSmallImg.length; i++) {
            aSmallImg[i].className = "";
        }
        aSmallImg[nowIndex].className = "selected";
        oMagImg.src = aSmallImg[nowIndex].src;
        if(nowIndex == 0){
            animate(oSmall,{
                left:0
            });
        //    oSmall.style.left = 0;
        }else{
            animate(oSmall,{
                left: -(aSmallImg[0].offsetWidth + 5 )
            });
        //    oSmall.style.left = -(aSmallImg[0].offsetWidth + 5 ) + "px";
        }
    }
    oMask.onmouseover = function(){
        oDrag.style.display = "block";
        oMagnify.style.display = "block";
    };
    oMask.onmouseout = function(){
        oDrag.style.display = "none";
        oMagnify.style.disply = "none";
    };
    oMask.onmousemove = function(e){
        e = e || window.event;
        var left = e.pageX - oWrapper.offsetLeft  - oDrag.offsetWidth/2;
        var top = e.pageY - oSingle.offsetTop - oDrag.offsetHeight/2;
        if(left<=0){
            left = 0;
        }
        if(top<=0){
            top = 0;
        }
        var leftMax = oBig.offsetWidth - oDrag.offsetWidth;
        var topMax = oBig.offsetHeight - oDrag.offsetHeight;
        if(left>=leftMax){
            left = oBig.offsetWidth - oDrag.offsetWidth;
        }
        if(top>=topMax){
            top = oBig.offsetHeight - oDrag.offsetHeight;
        }
        oDrag.style.left = left + "px";
        oDrag.style.top = top + "px";
        var scaleX = left/leftMax ;
        var scaleY = top/topMax;
        oMagImg.style.left = -scaleX * (oMagImg.offsetWidth - oMagnify.offsetWidth) + "px";
        oMagImg.style.top = -scaleY * (oMagImg.offsetWidth - oMagnify.offsetHeight) + "px";
    };


    /*
    * 小图片移动规则：
    * 下标    移动距离
    *   0       0
    *   1       1*width
    *   2       1*width
    *   3       1*width
    * */








})();
