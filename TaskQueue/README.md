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
