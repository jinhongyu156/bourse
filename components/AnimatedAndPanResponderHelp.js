// Animated.ValueXY:
/**
 * setValue 方法: new Animated.Value 实例上的方法, 调用这个方法可以从外部修改这个实例内部的值, 但掉用此方法后, 之前正在执行的动画将被结束并从新值开始执行动画. 同时更新全部相关的属性
 **/

/**
 * setOffset 方法: Aniamted.Value 与 Animated.ValueXY 都有, 可给动画值设定一个基础值( 或者偏差值 )
 * 例: 若 offset = 100, Animated.Value = 50, 则动画执行时使用的值为 150.
 **/

/**
 * flattenOffset 方法: Aniamted.Value 与 Animated.ValueXY 都有, 调用 flattenOffset 将 offset 值( 偏差值 ) 加 Aniamted.Value 的当前值作为 Animated.Value 的值, 之后把 offset值重置为 0.
 * 例: 现在 offset = 100, Animated.Value = 50, 调用 flattenOffset 方法时, offset = 0, Animated.Value = 150.
 **/

/**
 * addListener 方法: 动画是异步的, 添加动画的监听
 * 例: 进度从 0 到 1 的进度动画, 使用 addListener 方法实现当动画进行到 0.5 时需执行一个其他的动作
 **/

// PanResponder
/**
 * onStartShouldSetPanResponder: 若返回 ture 表示该组件愿意成为触摸(点击)事件的响应者, 默认返回 false
 * onStartShouldSetPanResponderCapture: 当此组件里包含了子组件, 且子组件也为触摸事件响应者时, 若该方法返回 true, 则父组件优先级更高
 * onMoveShouldSetPanResponder: 若返回 ture 表示该组件愿意成为触摸(滑屏)事件的响应者, 默认返回 false
 * onMoveShouldSetPanResponderCapture: 当此组件里包含了子组件, 且子组件也为触摸事件响应者时, 若该方法返回 true, 则父组件优先级更高
 * onPanResponderGrant: 手势刚开始触摸(即刚接触屏幕时)
 * onPanResponderMove: 手势滑动时触发该事件
 * gestureState 参数:
 *		dx: 从触摸操作开始时的累计横向路程
 *		dy: 从触摸操作开始时的累计纵向路程
 **/