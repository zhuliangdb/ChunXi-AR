import { ref } from 'vue';
import type { Ref } from 'vue';

/**
 * 祝福技能模块
 * 提供春节祝福系统的核心功能，包括祝福卡片生成、祝福管理等
 */
export class WishesSkill {
  private wishes: Ref<Wish[]>;
  private maxWishes: number;

  /**
   * 构造函数
   * @param maxWishes 最大祝福数量，默认100
   */
  constructor(maxWishes: number = 100) {
    this.wishes = ref<Wish[]>([]);
    this.maxWishes = maxWishes;
  }

  /**
   * 添加祝福
   * @param name 祝福人姓名
   * @param content 祝福内容
   * @returns 添加结果
   */
  public addWish(name: string, content: string): boolean {
    if (this.wishes.value.length >= this.maxWishes) {
      return false;
    }

    const now = new Date();
    const time = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')} ${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;

    const wish: Wish = {
      id: this.generateId(),
      name,
      content,
      time,
      likes: 0,
      isLiked: false
    };

    this.wishes.value.unshift(wish);
    return true;
  }

  /**
   * 获取祝福列表
   * @returns 祝福列表
   */
  public getWishes(): Wish[] {
    return this.wishes.value;
  }

  /**
   * 点赞祝福
   * @param id 祝福ID
   * @returns 点赞结果
   */
  public likeWish(id: string): boolean {
    const wish = this.wishes.value.find(w => w.id === id);
    if (!wish) {
      return false;
    }

    if (wish.isLiked) {
      wish.likes--;
    } else {
      wish.likes++;
    }
    wish.isLiked = !wish.isLiked;
    return true;
  }

  /**
   * 删除祝福
   * @param id 祝福ID
   * @returns 删除结果
   */
  public deleteWish(id: string): boolean {
    const index = this.wishes.value.findIndex(w => w.id === id);
    if (index === -1) {
      return false;
    }

    this.wishes.value.splice(index, 1);
    return true;
  }

  /**
   * 生成祝福卡片
   * @param wish 祝福对象
   * @returns 祝福卡片HTML字符串
   */
  public generateWishCard(wish: Wish): string {
    return `
      <div class="wish-card">
        <div class="wish-header">
          <h3>${wish.name}</h3>
          <span class="wish-time">${wish.time}</span>
        </div>
        <div class="wish-content">${wish.content}</div>
        <div class="wish-footer">
          <button class="like-button" data-id="${wish.id}">
            ${wish.isLiked ? '❤️' : '🤍'} ${wish.likes}
          </button>
        </div>
      </div>
    `;
  }

  /**
   * 生成随机祝福内容
   * @returns 随机祝福内容
   */
  public generateRandomWish(): string {
    const wishes = [
      '新年快乐！万事如意！',
      '新春大吉！阖家欢乐！',
      '恭喜发财！红包拿来！',
      '年年有余！岁岁平安！',
      '心想事成！步步高升！',
      '身体健康！笑口常开！',
      '工作顺利！事业有成！',
      '家庭幸福！美满安康！',
      '吉星高照！鸿运当头！',
      '辞旧迎新！万象更新！'
    ];

    const randomIndex = Math.floor(Math.random() * wishes.length);
    return wishes[randomIndex] || '新年快乐！';
  }

  /**
   * 生成唯一ID
   * @returns 唯一ID
   */
  private generateId(): string {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
  }
}

/**
 * 祝福类型定义
 */
export interface Wish {
  id: string;
  name: string;
  content: string;
  time: string;
  likes: number;
  isLiked: boolean;
}

export default WishesSkill;