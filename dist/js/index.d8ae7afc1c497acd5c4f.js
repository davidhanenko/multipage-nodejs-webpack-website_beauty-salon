(window.webpackJsonp=window.webpackJsonp||[]).push([[15],[,,,,function(n,t,e){},function(n,t,e){"use strict";(function(n,t){e(6);n.jQuery=e(0);var i=document.getElementById("top-button"),o=document.documentElement;i.addEventListener("click",()=>{o.scrollTo({top:0,behavior:"smooth"})}),t(function(){t(document).on("scroll",function(){t(this).scrollTop()<100?(t(".top-button").css("display","none"),t(".top-button").fadeOut("slow")):(t(".top-button").css("display","block"),t(".top-button").fadeIn("slow"))})})}).call(this,e(1),e(0))},function(n,t,e){},,function(n,t,e){"use strict";(function(n,t){e(2),e(3),e(9);n.jQuery=e(0),t(window).on("scroll",function(){t("#mainNavbar").toggleClass("scrolled",t(this).scrollTop()>90)}),t(function(){t(window).on("scroll",function(){t("#drop").toggleClass("dropdownScrolled",t(this).scrollTop()>90)})}),t(".navbar-toggler").on("click",function(){t(".navbar").toggleClass("navToggled")})}).call(this,e(1),e(0))},function(n,t,e){},function(n,t,e){"use strict";e(4)},function(n,t,e){"use strict";(function(n,t){e(2),e(3),e(12);n.jQuery=e(0),t(function(){var n=t(".priceBtn:first");t(n).addClass("priceBtnActive")}),t(function(){var n=t(".pricesTable:first");t(n).addClass("prices-active")}),document.querySelector(".priceBtn").addEventListener("click",function(){}),t(".pricesButtons").on("click",".priceBtn",function(){var n=t(".priceBtn").index(this),e=t(".priceBtn");n<t(e).length/2?n=n:n-=t(e).length/2;var i=t(".pricesTable")[n];t(".priceBtn").removeClass("priceBtnActive"),t(".pricesTable").removeClass("prices-active"),t(i).addClass("prices-active"),t(this).addClass("priceBtnActive")})}).call(this,e(1),e(0))},function(n,t,e){},,,,,,function(n,t,e){"use strict";e.r(t),function(n){e(2),e(3),e(19),e(8),e(11),e(20),e(22),e(5),e(24);n.jQuery=e(0),window.addEventListener("scroll",()=>{document.body.style.setProperty("--scroll",window.pageYOffset/(document.body.offsetHeight-window.innerHeight))},!1),document.onreadystatechange=function(){"complete"!==document.readyState?document.querySelector("#page-loading-spinner").style.visibility="visible":(document.querySelector("#page-loading-spinner").style.display="none",document.querySelector("body").style.visibility="visible")}}.call(this,e(1))},function(n,t,e){},function(n,t,e){"use strict";(function(n){e(2),e(3),e(21),e(10);n.jQuery=e(0)}).call(this,e(1))},function(n,t,e){},function(n,t,e){"use strict";(function(n,t){e(2),e(3),e(23);n.jQuery=e(0),t("input").on("change",function(){t("#reset-email-btn").fadeIn(function(){t("#send-email-btn").addClass("send-email-btn-isready")}),t("#reset-email-btn").on("click",function(){t("#reset-email-btn").fadeOut("slow",function(){t("#send-email-btn").removeClass("send-email-btn-isready")})})}),t("form").on("submit",function(){t("#send-email-spinner").show()})}).call(this,e(1),e(0))},function(n,t,e){},function(n,t){}],[[18,0,1]]]);
//# sourceMappingURL=index.d8ae7afc1c497acd5c4f.js.map