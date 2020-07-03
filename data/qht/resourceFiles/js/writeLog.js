function setLogTarget(target){
  // https://book.yunzhan365.com/serm  (user_id) /doyf  (item_id) /mobile/index.html
  // https://vic-wxy.github.io/check/yhvx/rkjw/mobile/index.html?from=singlemessage&isappinstalled=0  ==>忽略
  // https://vic-wxy.github.io/view/yhvx   (user_id) /rkjw  (item_id) /mobile/index.html?from=singlemessage&isappinstalled=0
  // https://worldmimi.sharedbook.cn/books/yxoz  (item_id) /mobile/index.html?maxwidthtosmallmode=0&maxheighttosmallmode=0
  // ***.worldmimi.sharedbook.cn/books/getuserinfo.js--->uLink
  // ***.yunzhan365.com/books/getuserinfo.js
  // ***.huaceshu.cn/books/getuserinfo.js
  if(window.location.href.match('file:'))  return;
  var pathName;
  var startIndex = 1;
  var divideIndex1;
  var divideIndex2;
  var host = window.location.host;
  var pathName = window.location.pathname;
  target.item_type = "Book";

  if(host.match('vic-wxy.github.io')){

    if(host.match('vic-wxy.github.io/check')) return;
    startIndex = pathName.indexOf('/',1) + 1;
    divideIndex1 = pathName.indexOf('/',startIndex);
    divideIndex2 = pathName.indexOf('/',divideIndex1+1);

  }else if(host.match('book.yunzhan365.com')){

    divideIndex1 = pathName.indexOf('/',1);
    divideIndex2 = pathName.indexOf('/',divideIndex1+1);

  }else if(host.match('yunzhan365.com') || host.match('sharedbook.cn') || host.match('huaceshu.cn')){
      $.getScript(host + "/books/getuserinfo.js", function(response,status){
        if(status == 'success'){
             target.user_id = userinfo.user_ulink;
        }else{
          console.log(status);
        }
      });
    divideIndex1 = pathName.indexOf('/',1);
    divideIndex2 = pathName.indexOf('/',divideIndex1+1);
    target.item_id = pathName.substring(divideIndex1+1,divideIndex2);
    return;
  }

  target.user_id = pathName.substring(startIndex,divideIndex1);
  target.item_id = pathName.substring(divideIndex1+1,divideIndex2);
}

function setVisitParams(action){
  action.screen_height = window.screen.height;
  action.screen_width = window.screen.width;

}

function onBookFlipPage(trigger_name, current_page, dest_page, stay_time){
  if(current_page == dest_page) return;
  if(stay_time < 1000 ) return;

  stay_time = stay_time / 1000;
  if (stay_time > 3600) return;

  slsLogger.flipPage(trigger_name, current_page, dest_page, stay_time);
}

function onBookJumpLink(trigger_name, current_page, dest_url){
  slsLogger.jumpLink(trigger_name, current_page, dest_url);
}

function onBookClickButton(current_page, button_name){
  slsLogger.clickButton(current_page, button_name);
}


function onBookSearch(current_page, search_key){
  if(search_key.trim() == '') return;
  slsLogger.search(current_page, search_key);
}

function onBookShare(current_page, dest_platform,shared_page){
  slsLogger.share(current_page, dest_platform,shared_page);
}

function onBookPrint(current_page, printed_page){
  slsLogger.print(current_page, printed_page);
}

function onBookPlayMedia(trigger_name, current_page, media_url, media_type, play_time){
  if( play_time < 0 ) return;
  slsLogger.playMedia(trigger_name, current_page, media_url, media_type, play_time);
}

function onBookClickPageItem(trigger_name, current_page, left, top, width, height){
  slsLogger.clickPageItem(trigger_name, current_page, left, top, width, height);
}

$(document).ready(function (){
  if(location.href.indexOf('file:') >= 0)  return;

  BookEvent.bindEvent("flipPage", onBookFlipPage);
  BookEvent.bindEvent("jumpLink", onBookJumpLink);
  BookEvent.bindEvent("clickButton", onBookClickButton);
  BookEvent.bindEvent("search", onBookSearch);
  BookEvent.bindEvent("share", onBookShare);
  BookEvent.bindEvent("print", onBookPrint);
  BookEvent.bindEvent("playMedia", onBookPlayMedia);
  BookEvent.bindEvent("clickPageItem", onBookClickPageItem);
});


