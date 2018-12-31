import { TweenMax } from "gsap";

export const contractWidth = el => {
  TweenMax.to(el, 0.3, { width: "0%" });
};

export const expandWidth = el => {
  TweenMax.to(el, 0.3, { width: "50%" });
};

export const fadeIn = el => {
  TweenMax.to(el, 0.3, { opacity: 1 });
};

export const fadeOut = el => {
  TweenMax.to(el, 0.3, { opacity: 0 });
};

export const fadeInStaggered = collection => {
  TweenMax.staggerTo(collection, 0.3, { opacity: 1 }, 0.01);
};

export const fadeOutStaggered = (collection, done) => {
  TweenMax.staggerTo(collection, 0.3, { opacity: 0, onComplete: done }, -0.01);
};
