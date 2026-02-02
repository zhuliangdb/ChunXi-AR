/**
 * 预加载策略
 * 用于优化页面加载性能，预加载关键资源
 */

/**
 * 资源优先级
 */
export const ResourcePriority = {
  HIGH: 'high',
  MEDIUM: 'medium',
  LOW: 'low'
} as const;

export type ResourcePriority = typeof ResourcePriority[keyof typeof ResourcePriority];

/**
 * 预加载资源配置
 */
export interface PreloadResource {
  href: string;
  as: string;
  type?: string;
  crossorigin?: string;
  priority?: ResourcePriority;
  imagesrcset?: string;
  imagesizes?: string;
}

/**
 * 预加载关键资源
 * @param resources 资源列表
 * @param priorityFilter 优先级过滤器
 */
export function preloadResources(resources: PreloadResource[], priorityFilter?: ResourcePriority) {
  resources
    .filter(resource => !priorityFilter || resource.priority === priorityFilter)
    .forEach(resource => {
      const link = document.createElement('link');
      link.rel = 'preload';
      link.href = resource.href;
      link.as = resource.as;
      
      if (resource.type) {
        link.type = resource.type;
      }
      
      if (resource.crossorigin) {
        link.crossOrigin = resource.crossorigin;
      }
      
      if (resource.imagesrcset) {
        (link as any).imageSrcset = resource.imagesrcset;
      }
      
      if (resource.imagesizes) {
        (link as any).imageSizes = resource.imagesizes;
      }
      
      // 根据优先级设置fetchpriority
      if (resource.priority === ResourcePriority.HIGH) {
        (link as any).fetchpriority = 'high';
      } else if (resource.priority === ResourcePriority.LOW) {
        (link as any).fetchpriority = 'low';
      }
      
      document.head.appendChild(link);
    });
}

/**
 * 预加载字体资源
 */
export function preloadFonts() {
  const fonts = [
    {
      href: 'https://fonts.googleapis.com/css2?family=Noto+Serif+SC:wght@400;500;600;700&family=Noto+Sans+SC:wght@300;400;500;600;700&display=swap',
      as: 'style',
      priority: ResourcePriority.HIGH
    }
  ];
  
  preloadResources(fonts);
  
  // 同时添加字体的DNS预解析
  const fontDomains = [
    'fonts.googleapis.com',
    'fonts.gstatic.com'
  ];
  
  fontDomains.forEach(domain => {
    const link = document.createElement('link');
    link.rel = 'dns-prefetch';
    link.href = `https://${domain}`;
    document.head.appendChild(link);
  });
}

/**
 * 预加载关键JavaScript资源
 */
export function preloadCriticalScripts() {
  // 注意：实际使用时需要替换[hash]为真实的哈希值
  // 或者使用webpack的预加载插件来自动处理
}

/**
 * 预加载关键CSS资源
 */
export function preloadCriticalStyles() {
  // 注意：实际使用时需要替换[hash]为真实的哈希值
}

/**
 * 生成优化的图片URL
 * @param url 原始图片URL
 * @param options 优化选项
 * @returns 优化后的图片URL
 */
export function optimizeImageUrl(url: string, options: {
  width?: number;
  height?: number;
  quality?: number;
  format?: 'webp' | 'jpg' | 'png';
} = {}) {
  if (!url) return '';
  
  // 对于API生成的图片，添加优化参数
  if (url.includes('text_to_image')) {
    const params = new URLSearchParams(url.includes('?') ? url.split('?')[1] : '');
    
    if (options.width) {
      params.set('width', options.width.toString());
    }
    if (options.height) {
      params.set('height', options.height.toString());
    }
    if (options.quality) {
      params.set('quality', options.quality.toString());
    }
    if (options.format) {
      params.set('format', options.format);
    }
    
    const baseUrl = url.split('?')[0];
    return `${baseUrl}?${params.toString()}`;
  }
  
  return url;
}

/**
 * 预加载图片资源
 * @param images 图片列表
 * @param options 图片优化选项
 */
export function preloadImages(images: string[], options: {
  quality?: number;
  priority?: ResourcePriority;
} = {}) {
  const imageResources = images.map(src => {
    const optimizedUrl = optimizeImageUrl(src, {
      quality: options.quality
    });
    
    return {
      href: optimizedUrl,
      as: 'image',
      priority: options.priority || ResourcePriority.MEDIUM
    };
  });
  
  preloadResources(imageResources);
}

/**
 * 懒加载图片
 * @param selector 图片选择器
 * @param options 懒加载选项
 */
export function lazyLoadImages(
  selector: string = 'img[data-src]',
  options: {
    rootMargin?: string;
    threshold?: number;
    quality?: number;
  } = {}
) {
  const images = document.querySelectorAll(selector);
  
  const imageObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target as HTMLImageElement;
        const src = img.dataset.src || '';
        
        // 优化图片加载
        if (src) {
          const optimizedSrc = optimizeImageUrl(src, {
            quality: options.quality || 85
          });
          img.src = optimizedSrc;
        }
        
        img.classList.remove('lazy');
        img.classList.add('loaded');
        imageObserver.unobserve(img);
      }
    });
  }, {
    rootMargin: options.rootMargin || '200px 0px',
    threshold: options.threshold || 0.1
  });
  
  images.forEach(img => {
    imageObserver.observe(img);
  });
}

/**
 * 预连接关键域名
 * @param domains 域名列表
 */
export function preconnectDomains(domains: string[]) {
  domains.forEach(domain => {
    const link = document.createElement('link');
    link.rel = 'preconnect';
    link.href = `https://${domain}`;
    link.crossOrigin = 'anonymous';
    document.head.appendChild(link);
  });
}

/**
 * 预获取关键资源
 * @param urls 资源URL列表
 */
export function prefetchResources(urls: string[]) {
  urls.forEach(url => {
    const link = document.createElement('link');
    link.rel = 'prefetch';
    link.href = url;
    document.head.appendChild(link);
  });
}

/**
 * 初始化预加载策略
 */
export function initPreloadStrategy() {
  // 预连接关键域名
  preconnectDomains([
    'fonts.googleapis.com',
    'fonts.gstatic.com',
    'trae-api-cn.mchost.guru'
  ]);
  
  // 预加载字体（高优先级）
  preloadFonts();
  
  // 预加载关键脚本（可选，需要根据实际构建结果调整）
  // preloadCriticalScripts();
  
  // 预加载关键样式（可选，需要根据实际构建结果调整）
  // preloadCriticalStyles();
  
  // 初始化懒加载
  if (typeof window !== 'undefined') {
    // 立即初始化，不需要等待load事件
    lazyLoadImages('img[data-src]', {
      rootMargin: '300px 0px',
      threshold: 0.05,
      quality: 85
    });
    
    // 预获取可能需要的资源
    const prefetchUrls: string[] = [];
    
    // 根据当前页面预获取相关资源
    const currentPath = window.location.pathname;
    if (currentPath === '/' || currentPath === '/home') {
      // 首页预获取其他页面的关键资源
      prefetchUrls.push('/culture', '/ar', '/game', '/wishes');
    }
    
    if (prefetchUrls.length > 0) {
      prefetchResources(prefetchUrls);
    }
  }
}

/**
 * 批量预加载图片
 * @param imageUrls 图片URL列表
 * @param batchSize 批量大小
 * @param delay 批次延迟（毫秒）
 */
export function batchPreloadImages(
  imageUrls: string[],
  batchSize: number = 5,
  delay: number = 100
) {
  const batches: string[][] = [];
  
  // 分组
  for (let i = 0; i < imageUrls.length; i += batchSize) {
    batches.push(imageUrls.slice(i, i + batchSize));
  }
  
  // 按批次加载
  batches.forEach((batch, index) => {
    setTimeout(() => {
      preloadImages(batch, {
        priority: ResourcePriority.LOW,
        quality: 80
      });
    }, index * delay);
  });
}
