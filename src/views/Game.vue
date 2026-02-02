<template>
  <section class="game-section" aria-labelledby="game-heading">
    <div class="game-container">
      <h2 id="game-heading">互动游玩</h2>
      
      <div class="game-tabs" role="tablist" aria-label="互动游玩选项卡">
        <button 
          @click="activeGame = 'food'" 
          :class="{ active: activeGame === 'food' }"
          role="tab"
          :aria-selected="activeGame === 'food'"
          :aria-controls="activeGame === 'food' ? 'food-content' : undefined"
          id="food-tab"
        >
          美食区
        </button>
        <button 
          @click="activeGame = 'play'" 
          :class="{ active: activeGame === 'play' }"
          role="tab"
          :aria-selected="activeGame === 'play'"
          :aria-controls="activeGame === 'play' ? 'play-content' : undefined"
          id="play-tab"
        >
          游玩区
        </button>
        <button 
          @click="activeGame = 'entertainment'" 
          :class="{ active: activeGame === 'entertainment' }"
          role="tab"
          :aria-selected="activeGame === 'entertainment'"
          :aria-controls="activeGame === 'entertainment' ? 'entertainment-content' : undefined"
          id="entertainment-tab"
        >
          娱乐区
        </button>
        <button 
          @click="activeGame = 'shopping'" 
          :class="{ active: activeGame === 'shopping' }"
          role="tab"
          :aria-selected="activeGame === 'shopping'"
          :aria-controls="activeGame === 'shopping' ? 'shopping-content' : undefined"
          id="shopping-tab"
        >
          购物区
        </button>
        <button 
          @click="activeGame = 'quiz'" 
          :class="{ active: activeGame === 'quiz' }"
          role="tab"
          :aria-selected="activeGame === 'quiz'"
          :aria-controls="activeGame === 'quiz' ? 'quiz-content' : undefined"
          id="quiz-tab"
        >
          知识问答
        </button>
      </div>
      
      <!-- 美食区 -->
      <div 
        v-if="activeGame === 'food'" 
        class="game-content"
        role="tabpanel"
        id="food-content"
        aria-labelledby="food-tab"
      >
        <h3>美食知识小问答</h3>
        <div class="quiz-container">
          <div class="quiz-question">
            <p>1. 安徽的特色美食臭鳜鱼的特点是什么？</p>
            <div class="quiz-options">
              <label class="quiz-option">
                <input type="radio" v-model="foodQuiz.answers.q1" value="a" aria-label="闻起来臭，吃起来香">
                <span class="option-text">闻起来臭，吃起来香</span>
              </label>
              <label class="quiz-option">
                <input type="radio" v-model="foodQuiz.answers.q1" value="b" aria-label="口感酥脆">
                <span class="option-text">口感酥脆</span>
              </label>
              <label class="quiz-option">
                <input type="radio" v-model="foodQuiz.answers.q1" value="c" aria-label="甜而不腻">
                <span class="option-text">甜而不腻</span>
              </label>
            </div>
          </div>
          <div class="quiz-question">
            <p>2. 河南的特色早餐是什么？</p>
            <div class="quiz-options">
              <label class="quiz-option">
                <input type="radio" v-model="foodQuiz.answers.q2" value="a" aria-label="烩面">
                <span class="option-text">烩面</span>
              </label>
              <label class="quiz-option">
                <input type="radio" v-model="foodQuiz.answers.q2" value="b" aria-label="胡辣汤">
                <span class="option-text">胡辣汤</span>
              </label>
              <label class="quiz-option">
                <input type="radio" v-model="foodQuiz.answers.q2" value="c" aria-label="豆腐脑">
                <span class="option-text">豆腐脑</span>
              </label>
            </div>
          </div>
          <div class="quiz-question">
            <p>3. 北京的特色美食是什么？</p>
            <div class="quiz-options">
              <label class="quiz-option">
                <input type="radio" v-model="foodQuiz.answers.q3" value="a" aria-label="烤鸭">
                <span class="option-text">烤鸭</span>
              </label>
              <label class="quiz-option">
                <input type="radio" v-model="foodQuiz.answers.q3" value="b" aria-label="小笼包">
                <span class="option-text">小笼包</span>
              </label>
              <label class="quiz-option">
                <input type="radio" v-model="foodQuiz.answers.q3" value="c" aria-label="火锅">
                <span class="option-text">火锅</span>
              </label>
            </div>
          </div>
          <button 
            class="btn-primary quiz-submit"
            aria-label="提交答案"
            @click="submitFoodQuiz"
          >
            提交答案
          </button>
          <div v-if="foodQuiz.result !== null" class="quiz-result" :class="{ correct: foodQuiz.result.correct, incorrect: !foodQuiz.result.correct }">
            <p>{{ foodQuiz.result.message }}</p>
            <button class="btn-primary retry-btn" @click="resetFoodQuiz" aria-label="重新答题">
              重新答题
            </button>
          </div>
        </div>
      </div>
      
      <!-- 游玩区 -->
      <div 
        v-else-if="activeGame === 'play'" 
        class="game-content"
        role="tabpanel"
        id="play-content"
        aria-labelledby="play-tab"
      >
        <h3>猜灯谜</h3>
        <div class="riddle-container">
          <div class="riddle-item">
            <p class="riddle-question">身穿红袍，头戴绿帽，坐在泥里，呆头呆脑（打一蔬菜）</p>
            <input 
              type="text" 
              :value="riddles[0]?.answer" 
              @input="$event => riddles[0] && (riddles[0].answer = ($event.target as HTMLInputElement).value)" 
              class="riddle-input" 
              placeholder="请输入答案"
              aria-label="输入谜语答案"
            >
            <button 
              class="btn-primary riddle-check"
              aria-label="检查答案"
              @click="checkRiddle(0)"
            >
              检查答案
            </button>
            <div v-if="riddles[0]?.result" class="riddle-result" :class="{ correct: riddles[0]?.result.correct, incorrect: !riddles[0]?.result.correct }">
              <p>{{ riddles[0]?.result.message }}</p>
            </div>
          </div>
          <div class="riddle-item">
            <p class="riddle-question">春节放假三天（打一字）</p>
            <input 
              type="text" 
              :value="riddles[1]?.answer" 
              @input="$event => riddles[1] && (riddles[1].answer = ($event.target as HTMLInputElement).value)" 
              class="riddle-input" 
              placeholder="请输入答案"
              aria-label="输入谜语答案"
            >
            <button 
              class="btn-primary riddle-check"
              aria-label="检查答案"
              @click="checkRiddle(1)"
            >
              检查答案
            </button>
            <div v-if="riddles[1]?.result" class="riddle-result" :class="{ correct: riddles[1]?.result.correct, incorrect: !riddles[1]?.result.correct }">
              <p>{{ riddles[1]?.result.message }}</p>
            </div>
          </div>
          <div class="riddle-item">
            <p class="riddle-question">除夕夜守岁（打一歇后语）</p>
            <input 
              type="text" 
              :value="riddles[2]?.answer" 
              @input="$event => riddles[2] && (riddles[2].answer = ($event.target as HTMLInputElement).value)" 
              class="riddle-input" 
              placeholder="请输入答案"
              aria-label="输入谜语答案"
            >
            <button 
              class="btn-primary riddle-check"
              aria-label="检查答案"
              @click="checkRiddle(2)"
            >
              检查答案
            </button>
            <div v-if="riddles[2]?.result" class="riddle-result" :class="{ correct: riddles[2]?.result.correct, incorrect: !riddles[2]?.result.correct }">
              <p>{{ riddles[2]?.result.message }}</p>
            </div>
          </div>
        </div>
      </div>
      
      <!-- 娱乐区 -->
      <div 
        v-else-if="activeGame === 'entertainment'" 
        class="game-content"
        role="tabpanel"
        id="entertainment-content"
        aria-labelledby="entertainment-tab"
      >
        <h3>春节传统习俗</h3>
        <div class="custom-container">
          <div class="custom-item" tabindex="0">
            <h4>贴春联</h4>
            <LazyImage :src="`https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=Chinese%20New%20Year%20spring%20couplets%20being%20pasted%20on%20door%2C%20red%20paper%20with%20black%20calligraphy&image_size=square`" alt="贴春联" />
            <p>春联是春节的重要习俗，人们在门上贴红色春联，表达对新年的美好祝愿。</p>
          </div>
          <div class="custom-item" tabindex="0">
            <h4>放鞭炮</h4>
            <LazyImage :src="`https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=Chinese%20New%20Year%20firecrackers%20exploding%2C%20colorful%20fireworks%20in%20night%20sky&image_size=square`" alt="放鞭炮" />
            <p>放鞭炮是春节的传统习俗，象征着驱邪避灾，迎接新年的到来。</p>
          </div>
          <div class="custom-item" tabindex="0">
            <h4>拜年</h4>
            <LazyImage :src="`https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=Chinese%20families%20visiting%20each%20other%20during%20Chinese%20New%20Year%2C%20exchanging%20greetings%20and%20gifts&image_size=square`" alt="拜年" />
            <p>拜年是春节期间的重要活动，人们互相拜访，送上新年祝福。</p>
          </div>
          <div class="custom-item" tabindex="0">
            <h4>吃团圆饭</h4>
            <LazyImage :src="`https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=Chinese%20family%20having%20reunion%20dinner%20during%20Chinese%20New%20Year%2C%20traditional%20food%20on%20table&image_size=square`" alt="吃团圆饭" />
            <p>团圆饭是春节的重要习俗，家人团聚，共享丰盛的年夜饭。</p>
          </div>
        </div>
      </div>
      
      <!-- 购物区 -->
      <div 
        v-else-if="activeGame === 'shopping'" 
        class="game-content"
        role="tabpanel"
        id="shopping-content"
        aria-labelledby="shopping-tab"
      >
        <h3>特色年货</h3>
        <div class="shopping-grid">
          <div class="shopping-item" tabindex="0">
            <LazyImage :src="`https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=Huizhou%20mao%20tofu%2C%20traditional%20Chinese%20food%2C%20packaged%20as%20New%20Year%20goods&image_size=square`" alt="徽州毛豆腐" />
            <h4>徽州毛豆腐</h4>
            <p>安徽特色美食</p>
            <button class="btn-primary buy-btn" @click="buyItem('徽州毛豆腐')" aria-label="购买徽州毛豆腐">
              🛒 购买
            </button>
          </div>
          <div class="shopping-item" tabindex="0">
            <LazyImage :src="`https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=Stinky%20mandarin%20fish%2C%20traditional%20Chinese%20food%2C%20packaged%20as%20New%20Year%20goods&image_size=square`" alt="臭鳜鱼" />
            <h4>臭鳜鱼</h4>
            <p>安徽特色美食</p>
            <button class="btn-primary buy-btn" @click="buyItem('臭鳜鱼')" aria-label="购买臭鳜鱼">
              🛒 购买
            </button>
          </div>
          <div class="shopping-item" tabindex="0">
            <LazyImage :src="`https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=Henan%20braised%20noodles%2C%20traditional%20Chinese%20food%2C%20packaged%20as%20New%20Year%20goods&image_size=square`" alt="河南烩面" />
            <h4>河南烩面</h4>
            <p>河南特色美食</p>
            <button class="btn-primary buy-btn" @click="buyItem('河南烩面')" aria-label="购买河南烩面">
              🛒 购买
            </button>
          </div>
          <div class="shopping-item" tabindex="0">
            <LazyImage :src="`https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=Henan%20spicy%20soup%2C%20traditional%20Chinese%20food%2C%20packaged%20as%20New%20Year%20goods&image_size=square`" alt="胡辣汤" />
            <h4>胡辣汤</h4>
            <p>河南特色美食</p>
            <button class="btn-primary buy-btn" @click="buyItem('胡辣汤')" aria-label="购买胡辣汤">
              🛒 购买
            </button>
          </div>
          <div class="shopping-item" tabindex="0">
            <LazyImage :src="`https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=Beijing%20roast%20duck%2C%20traditional%20Chinese%20food%2C%20packaged%20as%20New%20Year%20goods&image_size=square`" alt="北京烤鸭" />
            <h4>北京烤鸭</h4>
            <p>北京特色美食</p>
            <button class="btn-primary buy-btn" @click="buyItem('北京烤鸭')" aria-label="购买北京烤鸭">
              🛒 购买
            </button>
          </div>
          <div class="shopping-item" tabindex="0">
            <LazyImage :src="`https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=Shanghai%20xiaolongbao%20dumplings%2C%20traditional%20Chinese%20food%2C%20packaged%20as%20New%20Year%20goods&image_size=square`" alt="小笼包" />
            <h4>小笼包</h4>
            <p>上海特色美食</p>
            <button class="btn-primary buy-btn" @click="buyItem('小笼包')" aria-label="购买小笼包">
              🛒 购买
            </button>
          </div>
        </div>
        
        <!-- 购物车 -->
        <div v-if="cart.length > 0" class="shopping-cart" aria-label="购物车">
          <h4>购物车</h4>
          <div class="cart-items">
            <div 
              v-for="(item, index) in cart" 
              :key="index"
              class="cart-item"
            >
              <span class="item-name">{{ item }}</span>
              <button 
                class="btn-primary remove-btn" 
                @click="removeFromCart(index)"
                aria-label="移除商品"
              >
                🗑️ 移除
              </button>
            </div>
          </div>
          <button 
            class="btn-primary checkout-btn" 
            @click="checkout"
            aria-label="结账"
          >
            📋 结账
          </button>
        </div>
      </div>
      
      <!-- 知识问答 -->
      <div 
        v-else-if="activeGame === 'quiz'" 
        class="game-content"
        role="tabpanel"
        id="quiz-content"
        aria-labelledby="quiz-tab"
      >
        <h3>春节知识问答</h3>
        <div class="quiz-container">
          <div class="quiz-question">
            <p>1. 春节是中国农历的哪一天？</p>
            <div class="quiz-options">
              <label class="quiz-option">
                <input type="radio" v-model="springQuiz.answers.q1" value="a" aria-label="正月初一">
                <span class="option-text">正月初一</span>
              </label>
              <label class="quiz-option">
                <input type="radio" v-model="springQuiz.answers.q1" value="b" aria-label="腊月三十">
                <span class="option-text">腊月三十</span>
              </label>
              <label class="quiz-option">
                <input type="radio" v-model="springQuiz.answers.q1" value="c" aria-label="正月十五">
                <span class="option-text">正月十五</span>
              </label>
            </div>
          </div>
          <div class="quiz-question">
            <p>2. 春节的另一个名称是什么？</p>
            <div class="quiz-options">
              <label class="quiz-option">
                <input type="radio" v-model="springQuiz.answers.q2" value="a" aria-label="中秋节">
                <span class="option-text">中秋节</span>
              </label>
              <label class="quiz-option">
                <input type="radio" v-model="springQuiz.answers.q2" value="b" aria-label="元旦">
                <span class="option-text">元旦</span>
              </label>
              <label class="quiz-option">
                <input type="radio" v-model="springQuiz.answers.q2" value="c" aria-label="新年">
                <span class="option-text">新年</span>
              </label>
            </div>
          </div>
          <div class="quiz-question">
            <p>3. 春节期间人们通常会贴什么在门上？</p>
            <div class="quiz-options">
              <label class="quiz-option">
                <input type="radio" v-model="springQuiz.answers.q3" value="a" aria-label="春联">
                <span class="option-text">春联</span>
              </label>
              <label class="quiz-option">
                <input type="radio" v-model="springQuiz.answers.q3" value="b" aria-label="照片">
                <span class="option-text">照片</span>
              </label>
              <label class="quiz-option">
                <input type="radio" v-model="springQuiz.answers.q3" value="c" aria-label="海报">
                <span class="option-text">海报</span>
              </label>
            </div>
          </div>
          <div class="quiz-question">
            <p>4. 春节期间，孩子们会收到什么？</p>
            <div class="quiz-options">
              <label class="quiz-option">
                <input type="radio" v-model="springQuiz.answers.q4" value="a" aria-label="红包">
                <span class="option-text">红包</span>
              </label>
              <label class="quiz-option">
                <input type="radio" v-model="springQuiz.answers.q4" value="b" aria-label="礼物">
                <span class="option-text">礼物</span>
              </label>
              <label class="quiz-option">
                <input type="radio" v-model="springQuiz.answers.q4" value="c" aria-label="糖果">
                <span class="option-text">糖果</span>
              </label>
            </div>
          </div>
          <button 
            class="btn-primary quiz-submit"
            aria-label="提交答案"
            @click="submitSpringQuiz"
          >
            提交答案
          </button>
          <div v-if="springQuiz.result !== null" class="quiz-result" :class="{ correct: springQuiz.result.correct, incorrect: !springQuiz.result.correct }">
            <p>{{ springQuiz.result.message }}</p>
            <button class="btn-primary retry-btn" @click="resetSpringQuiz" aria-label="重新答题">
              重新答题
            </button>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import LazyImage from '../components/LazyImage.vue'

const activeGame = ref('food')

// 美食问答
const foodQuiz = ref({
  answers: {
    q1: '',
    q2: '',
    q3: ''
  },
  result: null as any
})

// 谜语类型定义
interface Riddle {
  question: string;
  answer: string;
  correctAnswer: string;
  result: { correct: boolean; message: string } | null;
}

// 谜语
const riddles = ref<Riddle[]>([
  {
    question: '身穿红袍，头戴绿帽，坐在泥里，呆头呆脑（打一蔬菜）',
    answer: '',
    correctAnswer: '胡萝卜',
    result: null
  },
  {
    question: '春节放假三天（打一字）',
    answer: '',
    correctAnswer: '人',
    result: null
  },
  {
    question: '除夕夜守岁（打一歇后语）',
    answer: '',
    correctAnswer: '辞旧迎新',
    result: null
  }
])

// 购物车
const cart = ref<string[]>([])

// 春节知识问答
const springQuiz = ref({
  answers: {
    q1: '',
    q2: '',
    q3: '',
    q4: ''
  },
  result: null as any
})

// 提交美食问答
const submitFoodQuiz = () => {
  const answers = foodQuiz.value.answers
  const correctAnswers = {
    q1: 'a',
    q2: 'b',
    q3: 'a'
  }
  
  const allAnswered = Object.values(answers).every(answer => answer !== '')
  if (!allAnswered) {
    alert('请回答所有问题！')
    return
  }
  
  const isCorrect = Object.entries(answers).every(([key, value]) => value === correctAnswers[key as keyof typeof correctAnswers])
  
  foodQuiz.value.result = {
    correct: isCorrect,
    message: isCorrect ? '恭喜你，全部答对了！🎉' : '很遗憾，答案不完全正确，请再试一次！'
  }
}

// 重置美食问答
const resetFoodQuiz = () => {
  foodQuiz.value = {
    answers: {
      q1: '',
      q2: '',
      q3: ''
    },
    result: null
  }
}

// 检查谜语答案
const checkRiddle = (index: number) => {
  const riddle = riddles.value[index]
  if (!riddle) {
    return
  }
  if (!riddle.answer) {
    alert('请输入答案！')
    return
  }
  
  const isCorrect = riddle.answer === riddle.correctAnswer
  
  riddle.result = {
    correct: isCorrect,
    message: isCorrect ? '恭喜你，答对了！🎉' : `很遗憾，正确答案是：${riddle.correctAnswer}`
  }
}

// 购买商品
const buyItem = (item: string) => {
  cart.value.push(item)
  alert(`已将${item}加入购物车！`)
}

// 从购物车移除商品
const removeFromCart = (index: number) => {
  cart.value.splice(index, 1)
}

// 结账
const checkout = () => {
  if (cart.value.length === 0) {
    alert('购物车为空！')
    return
  }
  
  alert(`您已成功购买以下商品：\n${cart.value.join('\n')}\n\n祝您购物愉快！`)
  cart.value = []
}

// 提交春节知识问答
const submitSpringQuiz = () => {
  const answers = springQuiz.value.answers
  const correctAnswers = {
    q1: 'a',
    q2: 'c',
    q3: 'a',
    q4: 'a'
  }
  
  const allAnswered = Object.values(answers).every(answer => answer !== '')
  if (!allAnswered) {
    alert('请回答所有问题！')
    return
  }
  
  const isCorrect = Object.entries(answers).every(([key, value]) => value === correctAnswers[key as keyof typeof correctAnswers])
  
  springQuiz.value.result = {
    correct: isCorrect,
    message: isCorrect ? '恭喜你，全部答对了！🎉' : '很遗憾，答案不完全正确，请再试一次！'
  }
}

// 重置春节知识问答
const resetSpringQuiz = () => {
  springQuiz.value = {
    answers: {
      q1: '',
      q2: '',
      q3: '',
      q4: ''
    },
    result: null
  }
}
</script>

<style scoped>
.game-section {
  min-height: 80vh;
}

.game-container {
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
}

.game-section h2 {
  color: #c41e3a;
  text-align: center;
  margin-bottom: 2rem;
  font-size: 2.5rem;
}

.game-tabs {
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin-bottom: 2rem;
  flex-wrap: wrap;
}

.game-tabs button {
  padding: 1rem 2rem;
  border: none;
  border-radius: 5px;
  font-size: 1rem;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.3s ease;
  background-color: #f0f0f0;
  color: #333;
}

.game-tabs button.active {
  background-color: #c41e3a;
  color: #fff;
}

.game-content {
  background-color: #fff;
  padding: 2rem;
  border-radius: 15px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
}

.game-content h3 {
  color: #c41e3a;
  margin-bottom: 2rem;
}

.btn-primary {
  background-color: #d4af37;
  color: #c41e3a;
  border: none;
  padding: 1rem 2rem;
  font-size: 1rem;
  font-weight: bold;
  border-radius: 5px;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
}

.btn-primary:hover {
  background-color: #f4d03f;
  transform: translateY(-2px);
  box-shadow: 0 6px 15px rgba(0, 0, 0, 0.3);
}

.quiz-container {
  line-height: 1.6;
}

.quiz-question {
  margin-bottom: 2rem;
}

.quiz-options {
  margin-top: 1rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.quiz-submit {
  margin-top: 2rem;
}

/* 问答结果样式 */
.quiz-result {
  margin-top: 2rem;
  padding: 1.5rem;
  border-radius: 10px;
  text-align: center;
  animation: fadeIn 0.5s ease;
}

.quiz-result.correct {
  background-color: rgba(76, 175, 80, 0.1);
  border: 2px solid #4caf50;
  color: #2e7d32;
}

.quiz-result.incorrect {
  background-color: rgba(244, 67, 54, 0.1);
  border: 2px solid #f44336;
  color: #c62828;
}

.retry-btn {
  margin-top: 1rem;
}

.riddle-container {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.riddle-item {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 1.5rem;
  background-color: #f9f9f9;
  border-radius: 10px;
  box-shadow: 0 3px 10px rgba(0, 0, 0, 0.1);
}

.riddle-input {
  padding: 0.8rem;
  border: 1px solid #ddd;
  border-radius: 5px;
  font-size: 1rem;
}

.riddle-check {
  align-self: flex-start;
}

/* 谜语结果样式 */
.riddle-result {
  margin-top: 1rem;
  padding: 1rem;
  border-radius: 5px;
  text-align: center;
  animation: fadeIn 0.5s ease;
}

.riddle-result.correct {
  background-color: rgba(76, 175, 80, 0.1);
  border: 1px solid #4caf50;
  color: #2e7d32;
}

.riddle-result.incorrect {
  background-color: rgba(244, 67, 54, 0.1);
  border: 1px solid #f44336;
  color: #c62828;
}

.custom-container {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
}

.custom-item {
  background-color: #f9f9f9;
  padding: 1.5rem;
  border-radius: 10px;
  box-shadow: 0 3px 10px rgba(0, 0, 0, 0.1);
  border-left: 4px solid #c41e3a;
  transition: all 0.3s ease;
}

.custom-item:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
}

.custom-item h4 {
  color: #c41e3a;
  margin-bottom: 1rem;
}

.custom-item img {
  width: 100%;
  height: 150px;
  object-fit: cover;
  border-radius: 5px;
  margin-bottom: 1rem;
}

.shopping-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 2rem;
}

.shopping-item {
  text-align: center;
  background-color: #f9f9f9;
  padding: 1.5rem;
  border-radius: 10px;
  box-shadow: 0 3px 10px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
}

.shopping-item:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
}

.shopping-item img {
  width: 150px;
  height: 150px;
  object-fit: cover;
  border-radius: 10px;
  margin-bottom: 1rem;
}

.shopping-item h4 {
  color: #c41e3a;
  margin-bottom: 0.5rem;
}

/* 购买按钮 */
.buy-btn {
  margin-top: 1rem;
  padding: 0.8rem 1.5rem;
  font-size: 0.9rem;
}

/* 购物车 */
.shopping-cart {
  margin-top: 3rem;
  padding: 2rem;
  background-color: #f9f9f9;
  border-radius: 10px;
  box-shadow: 0 3px 10px rgba(0, 0, 0, 0.1);
  border-top: 4px solid #c41e3a;
}

.shopping-cart h4 {
  color: #c41e3a;
  margin-bottom: 1.5rem;
  font-size: 1.2rem;
}

.cart-items {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-bottom: 2rem;
}

.cart-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  background-color: #fff;
  border-radius: 5px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

.item-name {
  font-weight: bold;
  color: #333;
}

.remove-btn {
  padding: 0.5rem 1rem;
  font-size: 0.8rem;
}

.checkout-btn {
  width: 100%;
  text-align: center;
}

@media (max-width: 768px) {
  .game-tabs {
    flex-direction: column;
    align-items: center;
  }
  
  .game-tabs button {
    width: 100%;
    max-width: 300px;
  }
  
  .cart-item {
    flex-direction: column;
    gap: 1rem;
    align-items: flex-start;
  }
  
  .remove-btn {
    align-self: flex-end;
  }
}

@media (max-width: 480px) {
  .game-section h2 {
    font-size: 2rem;
  }
  
  .game-content {
    padding: 1.5rem;
  }
  
  .custom-item,
  .shopping-item {
    padding: 1rem;
  }
  
  .custom-item img,
  .shopping-item img {
    height: 120px;
  }
}

/* 按钮焦点样式 */
.game-tabs button:focus,
.btn-primary:focus {
  outline: 2px solid #d4af37;
  outline-offset: 2px;
}

/* 输入框焦点样式 */
.riddle-input:focus {
  outline: 2px solid #d4af37;
  outline-offset: 2px;
  border-color: #c41e3a;
}

/* 卡片焦点样式 */
.custom-item:focus,
.shopping-item:focus {
  outline: 2px solid #d4af37;
  outline-offset: 2px;
}

/* 选项卡样式改进 */
.game-tabs button {
  position: relative;
}

.game-tabs button.active::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 3px;
  background-color: #c41e3a;
  border-radius: 3px 3px 0 0;
}

/* 选项样式改进 */
.quiz-option {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem;
  border-radius: 5px;
  transition: background-color 0.3s ease;
}

.quiz-option:hover {
  background-color: rgba(196, 30, 58, 0.1);
}

.quiz-option input[type="radio"] {
  accent-color: #c41e3a;
}

/* 输入框样式改进 */
.riddle-input {
  transition: all 0.3s ease;
}

/* 卡片交互改进 */
.custom-item,
.shopping-item {
  transition: all 0.3s ease;
}

.custom-item:focus,
.shopping-item:focus {
  transform: translateY(-3px);
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15);
}

/* 动画效果 */
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* 响应式调整 */
@media (max-width: 768px) {
  .custom-container,
  .shopping-grid {
    grid-template-columns: 1fr;
  }
}
</style>