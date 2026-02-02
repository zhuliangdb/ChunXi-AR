import gsap from 'gsap';

/**
 * 动画技能模块
 * 提供春节主题的动画效果
 */
export class AnimationSkill {
  /**
   * 创建春节主题的入场动画
   * @param element 目标元素
   * @param duration 动画持续时间
   */
  static createSpringFestivalEntrance(element: HTMLElement, duration: number = 1.2) {
    gsap.from(element, {
      opacity: 0,
      y: 50,
      scale: 0.8,
      duration,
      ease: 'back.out(1.7)',
      stagger: 0.1
    });
  }

  /**
   * 创建春节主题的强调动画
   * @param element 目标元素
   * @param duration 动画持续时间
   */
  static createSpringFestivalEmphasis(element: HTMLElement, duration: number = 0.8) {
    gsap.to(element, {
      scale: 1.1,
      rotation: 2,
      duration,
      ease: 'elastic.out(1, 0.3)',
      repeat: -1,
      repeatDelay: 2,
      yoyo: true
    });
  }

  /**
   * 创建春节主题的背景动画
   * @param element 目标元素
   * @param duration 动画持续时间
   */
  static createSpringFestivalBackground(element: HTMLElement, duration: number = 20) {
    gsap.to(element, {
      backgroundPosition: '100% 100%',
      duration,
      ease: 'linear',
      repeat: -1
    });
  }
}

export default AnimationSkill;