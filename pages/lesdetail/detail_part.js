const util = require('../../utils/util.js')
//打开评价
function openEvlu(that){
  if (that.data.info.isappraise == '0' && that.data.info.isappraise != '-1') {
    console.log(that.data.info.isappraise);
    that.setData({ eva_panel: 1 });
  }
} 
//关闭评价
function closeEvlu(that){
  that.setData({ eva_panel: 0 });
}
//评价提交
function evaluateSubmit(that){
  let joinJudgeControl = that.data.joinJudgeControl;
  if (joinJudgeControl == 0) {
    joinJudgeControl = 1;
    that.setData({
      joinJudgeControl: joinJudgeControl
    })
  }
  let loginUser = wx.getStorageSync('loginUser');

  let can = true;
  let evs = that.data.evs;
  for (let i = 0; i < evs.length; i++) {
    if (parseInt(evs[i].rate) <= 0) {
      can = false;
    }
  }

  if (can) {
    let args = {
      accountid: loginUser.accountId,
      classcourseid: "",
      studentid: loginUser.studentId,
      coursewareid: that.data.lesid,
      classid: "",
      scoreList: that.data.evs
    }

    util.getServerData(args, "api/submitAppraise", function (result) {
      that.setData({
        joinJudgeControl: 0
      })
      that.queryISEvaluate();
      wx.showToast({
        title: result ? '评价成功' : '评价失败',
        icon: 'none',
        duration: 2000
      })

      that.setData({ eva_panel: 0 });

    });
  }
  else {
    wx.showToast({
      title: "请完整评价",
      icon: 'none',
      duration: 2000
    })
  }
}
//评价星星点击
function evaluateClick(e,that){
  let item = e.target.dataset.item;
  let star = e.target.dataset.star;

  let evs = that.data.evs;
  for (let i = 0; i < evs.length; i++) {
    if (item.itemid == "1") {
      evs[i].rate = parseInt(star);
      evs[i].percent = parseInt(star) * 2;
    }
    else {
      if (evs[i].itemid == item.itemid) {
        evs[i].rate = parseInt(star);
        evs[i].percent = parseInt(star) * 2;
      }
    }

  }
  that.setData({
    evs: evs
  })
}

//收藏/取消收藏
function collectionClick(that){
  let loginUser = wx.getStorageSync('loginUser');

  if (that.data.info.ifcollectedcourse == '0' && that.data.info.ifcollectedcourse != '-1') {
    util.getServerData([
      {
        coursewareid: that.data.lesid,
        studentid: loginUser.studentId
      }
    ], "api/insertCourseWareCollection", function (result) {

      console.log(result);

      wx.showToast({
        title: result.message,
        icon: 'none',
        duration: 2000,
        complete: function (e) {
          that.queryPartUpdate();
        }
      })
    });
  }
  else {
    util.getServerData([
      {
        coursewareid: that.data.lesid,
        studentid: loginUser.studentId
      }
    ], "api/deleteCourseWareCollection", function (result) {

      wx.showToast({
        title: result.message,
        icon: 'none',
        duration: 2000,
        complete: function (e) {
          that.queryPartUpdate();
        }
      })
    });
  }
}
 //加入待学
function joinLearn(that){
  let joinStydyControl = that.data.joinStydyControl;
  if (joinStydyControl == 0) {
    joinStydyControl = 1;
    that.setData({
      joinStydyControl: joinStydyControl
    })

    let loginUser = wx.getStorageSync('loginUser');


    if (that.data.info.ifwaitcourse == '0') {
      util.getServerData({
        studentid: loginUser.studentId,
        coursewareid: that.data.lesid
      }, "api/inertToBeStudiedUseWeicatApp/save", function (result) {
        that.setData({
          joinStydyControl: 0
        })
        that.queryPartUpdate();
      });
    }
  }
}
//音频控制面板
function animationClick(that){
  let processBarShow = that.data.processBarShow == 0 ? 1 : 0;
  var animation = wx.createAnimation({
    transformOrigin: "50% 50%",
    duration: 1000,
    timingFunction: "ease",
    delay: 0
  })
  animation.opacity(processBarShow).translateY(0).step();
  that.setData({
    animationData: animation.export(), processBarShow: processBarShow
  })

}
//音频控制面板
function animationDo(that){
  let processBarShow = 1;
  var animation = wx.createAnimation({
    transformOrigin: "50% 50%",
    duration: 1000,
    timingFunction: "ease",
    delay: 0
  })
  animation.opacity(processBarShow).translateY(0).step();
  that.setData({
    animationData: animation.export(), processBarShow: processBarShow
  })
}
//音频滑动
function timeSliderChanged(e,that){
  if (!that.duration)
    return;

  let method = that.data.audioAction.method;

  that.setData({
    audioAction: {
      method: 'setCurrentTime',
      data: that.duration * e.detail.value / 100
    }
  });

  that.setData({
    audioAction: {
      method: method
    }
  });
}
//播放音频
function playAudio(that){
  that.setData({
    audioAction: {
      method: 'play'
    }
  });
}
//暂停音频
function pauseAudio(that){
  that.setData({
    audioAction: {
      method: 'pause'
    }
  });
}

module.exports = {
  openEvlu: openEvlu,
  closeEvlu: closeEvlu,
  evaluateSubmit: evaluateSubmit,
  evaluateClick: evaluateClick,
  collectionClick: collectionClick,
  joinLearn: joinLearn,
  animationClick: animationClick,
  animationDo: animationDo,
  timeSliderChanged: timeSliderChanged,
  playAudio: playAudio,
  pauseAudio: pauseAudio
}
