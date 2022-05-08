export const throttle = (callback: Function, time: number) => {
  let lastCallback: number;
  let lastRan: number;

  return function(this: any) {
    const args = arguments;
    const context = this;

    if (!lastRan) {
      callback.apply(context, args)
      lastRan = Date.now()
    } else {
      clearTimeout(lastCallback)
      lastCallback = window.setTimeout(function() {
        if ((Date.now() - lastRan) >= time) {
          callback.apply(context, args)
          lastRan = Date.now()
        }
      }, time - (Date.now() - lastRan))
    }
  }
}
