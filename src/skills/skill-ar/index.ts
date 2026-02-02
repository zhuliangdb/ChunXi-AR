import * as THREE from 'three';

/**
 * AR技能模块
 * 提供基于Three.js的增强现实功能，用于展示春节主题的AR效果
 */
export class ARSkill {
  private scene: THREE.Scene;
  private camera: THREE.PerspectiveCamera;
  private renderer: THREE.WebGLRenderer;
  private animationId: number = 0;

  /**
   * 构造函数
   * @param container 容器元素
   */
  constructor(container: HTMLElement) {
    // 创建场景
    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color(0xf8f0e3);

    // 创建相机
    this.camera = new THREE.PerspectiveCamera(
      75,
      container.clientWidth / container.clientHeight,
      0.1,
      1000
    );
    this.camera.position.z = 5;

    // 创建渲染器
    this.renderer = new THREE.WebGLRenderer({ antialias: true });
    this.renderer.setSize(container.clientWidth, container.clientHeight);
    container.appendChild(this.renderer.domElement);

    // 添加灯光
    this.addLights();

    // 开始动画循环
    this.animate();

    // 监听窗口大小变化
    window.addEventListener('resize', () => this.onWindowResize(container));
  }

  /**
   * 添加灯光
   */
  private addLights() {
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    this.scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(1, 1, 1);
    this.scene.add(directionalLight);
  }

  /**
   * 创建春节主题的3D模型
   * @param type 模型类型
   */
  public createSpringFestivalModel(type: 'lantern' | 'firecracker' | 'tiger') {
    switch (type) {
      case 'lantern':
        return this.createLantern();
      case 'firecracker':
        return this.createFirecracker();
      case 'tiger':
        return this.createTiger();
      default:
        throw new Error(`不支持的模型类型: ${type}`);
    }
  }

  /**
   * 创建灯笼模型
   */
  private createLantern() {
    const group = new THREE.Group();

    // 灯笼主体
    const geometry = new THREE.CylinderGeometry(1, 1, 2, 32);
    const material = new THREE.MeshPhongMaterial({ 
      color: 0xc41e3a, 
      transparent: true,
      opacity: 0.8
    });
    const lantern = new THREE.Mesh(geometry, material);
    group.add(lantern);

    // 灯笼顶部
    const topGeometry = new THREE.ConeGeometry(1.2, 0.5, 32);
    const top = new THREE.Mesh(topGeometry, material);
    top.position.y = 1.25;
    group.add(top);

    // 灯笼底部
    const bottomGeometry = new THREE.ConeGeometry(1.2, 0.5, 32);
    const bottom = new THREE.Mesh(bottomGeometry, material);
    bottom.position.y = -1.25;
    bottom.rotation.x = Math.PI;
    group.add(bottom);

    // 灯笼绳子
    const ropeGeometry = new THREE.CylinderGeometry(0.05, 0.05, 1, 8);
    const rope = new THREE.Mesh(ropeGeometry, new THREE.MeshBasicMaterial({ color: 0x8b4513 }));
    rope.position.y = 1.75;
    group.add(rope);

    this.scene.add(group);
    return group;
  }

  /**
   * 创建鞭炮模型
   */
  private createFirecracker() {
    const group = new THREE.Group();

    // 鞭炮主体
    const geometry = new THREE.BoxGeometry(0.5, 3, 0.5);
    const material = new THREE.MeshPhongMaterial({ color: 0xc41e3a });
    const firecracker = new THREE.Mesh(geometry, material);
    group.add(firecracker);

    // 鞭炮引线
    const fuseGeometry = new THREE.CylinderGeometry(0.05, 0.05, 0.5, 8);
    const fuse = new THREE.Mesh(fuseGeometry, new THREE.MeshBasicMaterial({ color: 0x8b4513 }));
    fuse.position.y = 1.75;
    group.add(fuse);

    this.scene.add(group);
    return group;
  }

  /**
   * 创建老虎模型（简化版）
   */
  private createTiger() {
    const group = new THREE.Group();

    // 老虎身体
    const bodyGeometry = new THREE.SphereGeometry(1, 32, 32);
    const bodyMaterial = new THREE.MeshPhongMaterial({ color: 0xdb7093 });
    const body = new THREE.Mesh(bodyGeometry, bodyMaterial);
    group.add(body);

    // 老虎头部
    const headGeometry = new THREE.SphereGeometry(0.6, 32, 32);
    const head = new THREE.Mesh(headGeometry, bodyMaterial);
    head.position.y = 0.8;
    group.add(head);

    this.scene.add(group);
    return group;
  }

  /**
   * 动画循环
   */
  private animate() {
    this.animationId = requestAnimationFrame(() => this.animate());

    // 旋转场景中的所有模型
    this.scene.children.forEach((child: THREE.Object3D) => {
      if (child instanceof THREE.Group) {
        child.rotation.y += 0.01;
      }
    });

    this.renderer.render(this.scene, this.camera);
  }

  /**
   * 窗口大小变化处理
   * @param container 容器元素
   */
  private onWindowResize(container: HTMLElement) {
    this.camera.aspect = container.clientWidth / container.clientHeight;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(container.clientWidth, container.clientHeight);
  }

  /**
   * 销毁AR场景
   * @param container 容器元素
   */
  public destroy(container: HTMLElement) {
    cancelAnimationFrame(this.animationId);
    container.removeChild(this.renderer.domElement);
    this.renderer.dispose();
    
    // 清理场景中的所有对象
    while (this.scene.children.length > 0) {
      const child = this.scene.children[0];
      if (child) {
        this.scene.remove(child);
        
        if (child instanceof THREE.Mesh) {
          child.geometry.dispose();
          if (Array.isArray(child.material)) {
            child.material.forEach((material: THREE.Material) => material.dispose());
          } else {
            child.material.dispose();
          }
        }
      }
    }
  }
}

export default ARSkill;