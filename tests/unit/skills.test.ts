import { describe, it, expect, vi, beforeEach } from 'vitest'
import AnimationSkill from '@/skills/skill-animation'
import WishesSkill from '@/skills/skill-wishes'

// Mock GSAP
vi.mock('gsap', () => ({
  default: {
    from: vi.fn(),
    to: vi.fn(),
  },
}))

describe('AnimationSkill', () => {
  let mockElement: HTMLElement

  beforeEach(() => {
    mockElement = document.createElement('div')
  })

  it('should create spring festival entrance animation', () => {
    AnimationSkill.createSpringFestivalEntrance(mockElement)
    expect(require('gsap').default.from).toHaveBeenCalledWith(
      mockElement,
      expect.objectContaining({
        opacity: 0,
        y: 50,
        scale: 0.8,
        duration: 1.2,
        ease: 'back.out(1.7)',
        stagger: 0.1,
      })
    )
  })

  it('should create spring festival emphasis animation', () => {
    AnimationSkill.createSpringFestivalEmphasis(mockElement)
    expect(require('gsap').default.to).toHaveBeenCalledWith(
      mockElement,
      expect.objectContaining({
        scale: 1.1,
        rotation: 2,
        duration: 0.8,
        ease: 'elastic.out(1, 0.3)',
        repeat: -1,
        repeatDelay: 2,
        yoyo: true,
      })
    )
  })

  it('should create spring festival background animation', () => {
    AnimationSkill.createSpringFestivalBackground(mockElement)
    expect(require('gsap').default.to).toHaveBeenCalledWith(
      mockElement,
      expect.objectContaining({
        backgroundPosition: '100% 100%',
        duration: 20,
        ease: 'linear',
        repeat: -1,
      })
    )
  })
})

describe('WishesSkill', () => {
  let wishesSkill: WishesSkill

  beforeEach(() => {
    wishesSkill = new WishesSkill()
  })

  it('should add a wish', () => {
    const result = wishesSkill.addWish('测试用户', '新年快乐！')
    expect(result).toBe(true)
    const wishes = wishesSkill.getWishes()
    expect(wishes.length).toBe(1)
    expect(wishes[0].name).toBe('测试用户')
    expect(wishes[0].content).toBe('新年快乐！')
  })

  it('should not add wishes beyond max limit', () => {
    const limitedWishesSkill = new WishesSkill(2)
    limitedWishesSkill.addWish('用户1', '祝福1')
    limitedWishesSkill.addWish('用户2', '祝福2')
    const result = limitedWishesSkill.addWish('用户3', '祝福3')
    expect(result).toBe(false)
    const wishes = limitedWishesSkill.getWishes()
    expect(wishes.length).toBe(2)
  })

  it('should like a wish', () => {
    wishesSkill.addWish('测试用户', '新年快乐！')
    const wishes = wishesSkill.getWishes()
    const wishId = wishes[0].id
    
    const result = wishesSkill.likeWish(wishId)
    expect(result).toBe(true)
    const updatedWishes = wishesSkill.getWishes()
    expect(updatedWishes[0].likes).toBe(1)
    expect(updatedWishes[0].isLiked).toBe(true)
  })

  it('should delete a wish', () => {
    wishesSkill.addWish('测试用户', '新年快乐！')
    const wishes = wishesSkill.getWishes()
    const wishId = wishes[0].id
    
    const result = wishesSkill.deleteWish(wishId)
    expect(result).toBe(true)
    const updatedWishes = wishesSkill.getWishes()
    expect(updatedWishes.length).toBe(0)
  })

  it('should generate a random wish', () => {
    const wish = wishesSkill.generateRandomWish()
    expect(typeof wish).toBe('string')
    expect(wish.length).toBeGreaterThan(0)
  })

  it('should generate a wish card', () => {
    wishesSkill.addWish('测试用户', '新年快乐！')
    const wishes = wishesSkill.getWishes()
    const wishCard = wishesSkill.generateWishCard(wishes[0])
    expect(typeof wishCard).toBe('string')
    expect(wishCard).toContain('测试用户')
    expect(wishCard).toContain('新年快乐！')
  })
})
