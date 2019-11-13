 /* ========================================================================
 * TaskQueue v0.0.1
 * Created By Heaven2049
 * github:https://github.com/heaven2049/TaskQueue
 * 分割任务工具，用于将运算量较大的任务分割为多个小任务分步运算以避免卡顿丢帧，或者用作顺序执行任务.
 * TaskQueue.checkStartLoop方法中创建计时器setInterval可改为window.requestAnimationFrame或创建其他的计时器
 * ========================================================================
 * 用法1：
 *  简单情况下，只需传入执行函数func及每帧该函数执行次数repeatTimes，并以该函数返回值判断任务是否完成。
 *  var queue = new TaskQueue();
 *  queue.addHandler(func,repeatTimes,completeCallback);
 *  用法2：
 *  复杂情况下，实现任务分割类继承自Task，并重写Task.execute()方法。
 *  var task = new MyTask();
 *  var queue = new TaskQueue();
 *  queue.addTask(task);
 * ========================================================================
 * Licensed under MIT
 * ======================================================================== */
function Task(){
    this.id = ++Task._InstanceId;
    this.repeatTimes = 0;
    this.workSpace = null;
    this.iInit  = 0 ;
    this.index = 0 ;
    this._finished = false;
    this.completeCallBack = null;
    this.bindHandler = null;
}
Task._InstanceId = 0 ;
Task.prototype = {
    constructor:Task,
    init:function (ws,initIndex,repeatTimes=1,finalCall=null) {
        this.workSpace = ws;
        this.iInit = initIndex;
        this.index = iInit;
        this.repeatTimes = repeatTimes>1?repeatTimes:1;
        this.completeCallBack = finalCall;
    },
    get finished(){
        return this._finished;
    },
    set finished(value){
        this._finished = value;
        if(value&&this.completeCallBack!=null){
            this.completeCallBack();
        }
    },
    initHandler:function(handler,repeatTimes,finalCall){
        "use strict";
        this.bindHandler = handler;
        this.repeatTimes = repeatTimes>1?repeatTimes:1;
        this.completeCallBack = finalCall;
    },
    execute:function () {
        if(this.bindHandler!=null){
            this.finished = this.bindHandler();
        }
    },
    count:function () {
        if(this.workSpace!=null){
            this.index++;
            this.finished = this.index>this.workSpace.length;
        }
    },
    cancel:function () {
        
    },
    reset:function () {
        this._finished = false;
        this.completeCallBack = null;
        this.id = -1;
        this.index = 0;
        this.iInit = 0;
    }
}

function TaskQueue(){
    this.queue = [];
    this.currTask = null;
    this._running = false;
    this.autoStart = true;
    this.timerId = 0;
}

TaskQueue.prototype = {
    constructor:TaskQueue,
    run:function () {
        if(!this._running){
            this._running = true;
            this.checkStartLoop(true);
            this.executeTask();
        }
    },
    stop:function () {
        if(this._running){
            this._running = false;
            this.checkStartLoop(false);
        }
    },
    checkStartLoop:function (startFlag) {
        if(startFlag){
            clearInterval(this.timerId);
            this.timerId = setInterval(function(){
                this.executeTask();
            }.bind(this),34);
        }else {
            clearInterval(this.timerId);
        }
    },
    addTask:function (task) {
        if(!task)return 0 ;
        if(this.queue.indexOf(task)==-1){
            this.queue.push(task);
        }
        if(!this._running && this.autoStart && this.queue.length>0){
            this.run();
        }
        return task.id;
    },
    addHandler:function (handler,repeatTimes=1,finalCall=null) {
        var t = new Task();
        t.initHandler(handler,repeatTimes,finalCall);
       return this.addTask(t);
    },
    removeTask:function (taskId) {
        if(this.currTask && this.currTask.id === taskId){
            this.currTask.cancel();
            this.currTask = null;
            return;
        }
        var i = this.queue.length-1;
        while (i--){
            var t = this.queue[i];
            if(t.id == taskId){
                this.queue.splice(i,1);
            }
        }
    },
    removeAllTask:function () {
        this.stop();
        this.queue = [];
        this.currTask = null;
    },
    executeTask:function () {
        if(this._running&&(!this.currTask||this.currTask.finished)&&this.queue.length==0){
            this.stop();
            return;
        }

        if(!this.currTask||this.currTask.finished){
            this.currTask = this.queue.shift();
        }

        if(this.currTask){
            var i = this.currTask.repeatTimes;
            while (i--&&!this.currTask.finished){
                this.currTask.execute();
            }
        }
    }
}

