import { describe, it, expect, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import Navbar from '@/components/Navbar.vue'
import Footer from '@/components/Footer.vue'
import LazyImage from '@/components/LazyImage.vue'

// Mock IntersectionObserver
global.IntersectionObserver = vi.fn(() => ({
  observe: vi.fn(),
  unobserve: vi.fn(),
  disconnect: vi.fn(),
}))

describe('Navbar Component', () => {
  it('should render correctly with active section', () => {
    const wrapper = mount(Navbar, {
      props: {
        activeSection: 'home',
      },
    })
    
    expect(wrapper.text()).toContain('首页')
    expect(wrapper.text()).toContain('地域文化')
    expect(wrapper.text()).toContain('AR体验')
    expect(wrapper.text()).toContain('互动游玩')
    expect(wrapper.text()).toContain('祝福系统')
  })
  
  it('should emit navigate event when a nav item is clicked', async () => {
    const wrapper = mount(Navbar, {
      props: {
        activeSection: 'home',
      },
    })
    
    await wrapper.find('button').trigger('click')
    expect(wrapper.emitted('navigate')).toHaveLength(1)
    expect(wrapper.emitted('navigate')?.[0]).toEqual(['home'])
  })
})

describe('Footer Component', () => {
  it('should render correctly', () => {
    const wrapper = mount(Footer)
    
    expect(wrapper.text()).toContain('2026 新春祝福网站')
  })
  
  it('should emit navigate event when a nav item is clicked', async () => {
    const wrapper = mount(Footer)
    
    await wrapper.find('button').trigger('click')
    expect(wrapper.emitted('navigate')).toHaveLength(1)
  })
})

describe('LazyImage Component', () => {
  it('should render placeholder when not loaded', () => {
    const wrapper = mount(LazyImage, {
      props: {
        src: 'test.jpg',
        alt: 'Test Image',
      },
    })
    
    expect(wrapper.find('.lazy-image-placeholder').exists()).toBe(true)
    expect(wrapper.find('.lazy-image').exists()).toBe(false)
  })
  
  it('should render image when loaded', async () => {
    const wrapper = mount(LazyImage, {
      props: {
        src: 'test.jpg',
        alt: 'Test Image',
      },
    })
    
    // Simulate image loading
    await wrapper.vm.$nextTick()
    
    expect(wrapper.find('.lazy-image').exists()).toBe(false)
    expect(wrapper.find('.lazy-image-placeholder').exists()).toBe(true)
  })
})
