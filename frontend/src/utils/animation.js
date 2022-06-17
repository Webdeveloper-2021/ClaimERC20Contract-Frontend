export const smoothScroll = function (targetEl, duration = 500) {
    let target = document.querySelector(targetEl);
    if (!target) { return }
    let targetPosition = target.getBoundingClientRect().top - 0;
    let startPosition = window.pageYOffset;
    let startTime = null;
  
    const ease = function(t,b,c,d) {
        t /= d / 2;
        if (t < 1) return c / 2 * t * t + b;
        t--;
        return -c / 2 * (t * (t - 2) - 1) + b;
    };
  
    const animation = function(currentTime){
        if (startTime === null) startTime = currentTime;
        const timeElapsed = currentTime - startTime;
        const run = ease(timeElapsed, startPosition, targetPosition, duration);
        window.scrollTo(0,run);
        if (timeElapsed < duration) requestAnimationFrame(animation);
    };
    requestAnimationFrame(animation);
};