<template>
  <section class="culture-section" aria-labelledby="culture-heading">
    <div class="culture-container">
      <h2 id="culture-heading">地域文化</h2>
      
      <div class="culture-tabs" role="tablist" aria-label="地域文化选项卡">
        <button 
          @click="activeCulture = 'anhui'" 
          :class="{ active: activeCulture === 'anhui' }"
          role="tab"
          :aria-selected="activeCulture === 'anhui'"
          :aria-controls="activeCulture === 'anhui' ? 'anhui-content' : undefined"
          id="anhui-tab"
        >
          安徽
        </button>
        <button 
          @click="activeCulture = 'henan'" 
          :class="{ active: activeCulture === 'henan' }"
          role="tab"
          :aria-selected="activeCulture === 'henan'"
          :aria-controls="activeCulture === 'henan' ? 'henan-content' : undefined"
          id="henan-tab"
        >
          河南
        </button>
        <button 
          @click="activeCulture = 'beijing'" 
          :class="{ active: activeCulture === 'beijing' }"
          role="tab"
          :aria-selected="activeCulture === 'beijing'"
          :aria-controls="activeCulture === 'beijing' ? 'beijing-content' : undefined"
          id="beijing-tab"
        >
          北京
        </button>
        <button 
          @click="activeCulture = 'shanghai'" 
          :class="{ active: activeCulture === 'shanghai' }"
          role="tab"
          :aria-selected="activeCulture === 'shanghai'"
          :aria-controls="activeCulture === 'shanghai' ? 'shanghai-content' : undefined"
          id="shanghai-tab"
        >
          上海
        </button>
        <button 
          @click="activeCulture = 'guangdong'" 
          :class="{ active: activeCulture === 'guangdong' }"
          role="tab"
          :aria-selected="activeCulture === 'guangdong'"
          :aria-controls="activeCulture === 'guangdong' ? 'guangdong-content' : undefined"
          id="guangdong-tab"
        >
          广东
        </button>
        <button 
          @click="activeCulture = 'sichuan'" 
          :class="{ active: activeCulture === 'sichuan' }"
          role="tab"
          :aria-selected="activeCulture === 'sichuan'"
          :aria-controls="activeCulture === 'sichuan' ? 'sichuan-content' : undefined"
          id="sichuan-tab"
        >
          四川
        </button>
        <button 
          @click="activeCulture = 'zhejiang'" 
          :class="{ active: activeCulture === 'zhejiang' }"
          role="tab"
          :aria-selected="activeCulture === 'zhejiang'"
          :aria-controls="activeCulture === 'zhejiang' ? 'zhejiang-content' : undefined"
          id="zhejiang-tab"
        >
          浙江
        </button>
        <button 
          @click="activeCulture = 'jiangsu'" 
          :class="{ active: activeCulture === 'jiangsu' }"
          role="tab"
          :aria-selected="activeCulture === 'jiangsu'"
          :aria-controls="activeCulture === 'jiangsu' ? 'jiangsu-content' : undefined"
          id="jiangsu-tab"
        >
          江苏
        </button>
        <button 
          @click="activeCulture = 'fujian'" 
          :class="{ active: activeCulture === 'fujian' }"
          role="tab"
          :aria-selected="activeCulture === 'fujian'"
          :aria-controls="activeCulture === 'fujian' ? 'fujian-content' : undefined"
          id="fujian-tab"
        >
          福建
        </button>
      </div>
      
      <!-- 安徽文化 -->
      <div 
        v-if="activeCulture === 'anhui'" 
        class="culture-content"
        role="tabpanel"
        id="anhui-content"
        aria-labelledby="anhui-tab"
      >
        <div class="culture-grid">
          <div class="culture-item" tabindex="0">
            <h3>徽州建筑</h3>
            <div class="culture-image">
              <LazyImage :src="`https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=huizhou%20traditional%20architecture%20with%20white%20walls%20and%20black%20tiles%2C%20Chinese%20New%20Year%20decorations%2C%20red%20lanterns&image_size=landscape_16_9`" alt="徽州建筑" />
            </div>
            <p>徽州建筑以马头墙、雕花窗棂、天井等为特色，春节期间家家户户贴春联、挂灯笼，充满喜庆氛围。</p>
          </div>
          <div class="culture-item" tabindex="0">
            <h3>黄梅戏</h3>
            <div class="culture-image">
              <LazyImage :src="`https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=Huangmei%20opera%20performers%20in%20traditional%20Chinese%20costumes%2C%20red%20and%20gold%20colors%2C%20stage%20performance&image_size=landscape_16_9`" alt="黄梅戏" />
            </div>
            <p>黄梅戏是安徽的传统戏曲剧种，春节期间常上演传统剧目，为节日增添欢乐气氛。</p>
          </div>
          <div class="culture-item" tabindex="0">
            <h3>徽州剪纸</h3>
            <div class="culture-image">
              <LazyImage :src="`https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=Huizhou%20paper%20cutting%20art%2C%20Chinese%20New%20Year%20themes%2C%20red%20paper%2C%20traditional%20patterns&image_size=landscape_16_9`" alt="徽州剪纸" />
            </div>
            <p>徽州剪纸以其精细的工艺和丰富的题材著称，春节期间常用作门窗装饰，寓意吉祥如意。</p>
          </div>
          <div class="culture-item" tabindex="0">
            <h3>安徽特色美食</h3>
            <div class="culture-image">
              <LazyImage :src="`https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=Anhui%20traditional%20food%20selection%20including%20hairy%20tofu%20and%20stinky%20mandarin%20fish%2C%20Chinese%20New%20Year%20feast&image_size=landscape_16_9`" alt="安徽特色美食" />
            </div>
            <p>安徽春节特色美食包括徽州毛豆腐、臭鳜鱼、符离集烧鸡等，色香味俱全，是春节家宴的必备佳肴。</p>
          </div>
        </div>
      </div>
      
      <!-- 河南文化 -->
      <div 
        v-else-if="activeCulture === 'henan'" 
        class="culture-content"
        role="tabpanel"
        id="henan-content"
        aria-labelledby="henan-tab"
      >
        <div class="culture-grid">
          <div class="culture-item" tabindex="0">
            <h3>豫剧文化</h3>
            <div class="culture-image">
              <LazyImage :src="`https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=Yu%20Opera%20performers%20in%20traditional%20costumes%2C%20red%20and%20gold%20colors%2C%20stage%20performance&image_size=landscape_16_9`" alt="豫剧文化" />
            </div>
            <p>豫剧是河南的代表性戏曲剧种，春节期间常举办戏曲演出，深受群众喜爱。</p>
          </div>
          <div class="culture-item" tabindex="0">
            <h3>开封汴绣</h3>
            <div class="culture-image">
              <LazyImage :src="`https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=Kaifeng%20Bian%20embroidery%20patterns%2C%20traditional%20Chinese%20designs%2C%20red%20and%20gold%20threads&image_size=landscape_16_9`" alt="开封汴绣" />
            </div>
            <p>开封汴绣以其精湛的工艺和丰富的题材著称，春节期间常作为礼品和装饰品。</p>
          </div>
          <div class="culture-item" tabindex="0">
            <h3>河南民俗</h3>
            <div class="culture-image">
              <LazyImage :src="`https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=Henan%20traditional%20New%20Year%20festivities%2C%20dragon%20and%20lion%20dances%2C%20temple%20fair%20scene&image_size=landscape_16_9`" alt="河南民俗" />
            </div>
            <p>河南春节民俗丰富多彩，包括庙会、舞龙舞狮、放鞭炮等传统活动，热闹非凡。</p>
          </div>
          <div class="culture-item" tabindex="0">
            <h3>河南特色美食</h3>
            <div class="culture-image">
              <LazyImage :src="`https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=Henan%20traditional%20food%20selection%20including%20braised%20noodles%20and%20spicy%20soup%2C%20Chinese%20New%20Year%20feast&image_size=landscape_16_9`" alt="河南特色美食" />
            </div>
            <p>河南春节特色美食包括烩面、胡辣汤、道口烧鸡等，风味独特，深受人们喜爱。</p>
          </div>
        </div>
      </div>
      
      <!-- 北京文化 -->
      <div 
        v-else-if="activeCulture === 'beijing'" 
        class="culture-content"
        role="tabpanel"
        id="beijing-content"
        aria-labelledby="beijing-tab"
      >
        <div class="culture-grid">
          <div class="culture-item" tabindex="0">
            <h3>京剧文化</h3>
            <div class="culture-image">
              <LazyImage :src="`https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=Beijing%20Opera%20performers%20in%20traditional%20costumes%2C%20red%20and%20gold%20colors%2C%20painted%20faces%2C%20stage%20performance&image_size=landscape_16_9`" alt="京剧文化" />
            </div>
            <p>京剧是中国的国粹，春节期间北京各大剧院常上演经典剧目，吸引众多观众。</p>
          </div>
          <div class="culture-item" tabindex="0">
            <h3>北京庙会</h3>
            <div class="culture-image">
              <LazyImage :src="`https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=Beijing%20traditional%20temple%20fair%20during%20Chinese%20New%20Year%2C%20crowded%20streets%2C%20red%20lanterns%2C%20traditional%20performances&image_size=landscape_16_9`" alt="北京庙会" />
            </div>
            <p>北京春节庙会历史悠久，是北京最具特色的传统民俗活动之一，每年吸引大量游客。</p>
          </div>
          <div class="culture-item" tabindex="0">
            <h3>北京四合院</h3>
            <div class="culture-image">
              <LazyImage :src="`https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=Beijing%20siheyuan%20traditional%20courtyard%20house%2C%20Chinese%20New%20Year%20decorations%2C%20red%20lanterns%2C%20spring%20couplets&image_size=landscape_16_9`" alt="北京四合院" />
            </div>
            <p>北京四合院是北京传统民居的代表，春节期间院内张灯结彩，充满节日氛围。</p>
          </div>
          <div class="culture-item" tabindex="0">
            <h3>北京特色美食</h3>
            <div class="culture-image">
              <LazyImage :src="`https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=Beijing%20traditional%20food%20selection%20including%20Peking%20duck%2C%20jiaozi%20dumplings%2C%20Chinese%20New%20Year%20feast&image_size=landscape_16_9`" alt="北京特色美食" />
            </div>
            <p>北京春节特色美食包括烤鸭、饺子、炸酱面等，风味独特，是春节家宴的必备佳肴。</p>
          </div>
        </div>
      </div>
      
      <!-- 上海文化 -->
      <div 
        v-else-if="activeCulture === 'shanghai'" 
        class="culture-content"
        role="tabpanel"
        id="shanghai-content"
        aria-labelledby="shanghai-tab"
      >
        <div class="culture-grid">
          <div class="culture-item" tabindex="0">
            <h3>上海弄堂</h3>
            <div class="culture-image">
              <LazyImage :src="`https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=Shanghai%20traditional%20longtang%20alleyways%2C%20Chinese%20New%20Year%20decorations%2C%20red%20lanterns%2C%20washing%20hanging%20out&image_size=landscape_16_9`" alt="上海弄堂" />
            </div>
            <p>上海弄堂是上海特有的民居形式，春节期间弄堂里张灯结彩，邻里之间互相拜年，热闹非凡。</p>
          </div>
          <div class="culture-item" tabindex="0">
            <h3>沪剧文化</h3>
            <div class="culture-image">
              <LazyImage :src="`https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=Shanghai%20Opera%20performers%20in%20traditional%20costumes%2C%20red%20and%20gold%20colors%2C%20stage%20performance&image_size=landscape_16_9`" alt="沪剧文化" />
            </div>
            <p>沪剧是上海的地方戏曲剧种，春节期间常上演传统剧目，为节日增添欢乐气氛。</p>
          </div>
          <div class="culture-item" tabindex="0">
            <h3>上海豫园</h3>
            <div class="culture-image">
              <LazyImage :src="`https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=Shanghai%20Yuyuan%20Garden%20during%20Chinese%20New%20Year%2C%20red%20lanterns%2C%20traditional%20Chinese%20garden%20architecture&image_size=landscape_16_9`" alt="上海豫园" />
            </div>
            <p>上海豫园是上海的著名园林，春节期间举办灯会，吸引大量游客前来观赏。</p>
          </div>
          <div class="culture-item" tabindex="0">
            <h3>上海特色美食</h3>
            <div class="culture-image">
              <LazyImage :src="`https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=Shanghai%20traditional%20food%20selection%20including%20xiaolongbao%20dumplings%2C%20braised%20pork%20belly%2C%20Chinese%20New%20Year%20feast&image_size=landscape_16_9`" alt="上海特色美食" />
            </div>
            <p>上海春节特色美食包括小笼包、红烧肉、汤圆等，口味清淡鲜美，深受人们喜爱。</p>
          </div>
        </div>
      </div>
      
      <!-- 广东文化 -->
      <div 
        v-else-if="activeCulture === 'guangdong'" 
        class="culture-content"
        role="tabpanel"
        id="guangdong-content"
        aria-labelledby="guangdong-tab"
      >
        <div class="culture-grid">
          <div class="culture-item" tabindex="0">
            <h3>粤剧文化</h3>
            <div class="culture-image">
              <LazyImage :src="`https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=Cantonese%20Opera%20performers%20in%20traditional%20costumes%2C%20red%20and%20gold%20colors%2C%20elaborate%20headgear%2C%20stage%20performance&image_size=landscape_16_9`" alt="粤剧文化" />
            </div>
            <p>粤剧是广东的传统戏曲剧种，春节期间广东各大剧院常上演经典剧目，深受群众喜爱。</p>
          </div>
          <div class="culture-item" tabindex="0">
            <h3>广东醒狮</h3>
            <div class="culture-image">
              <LazyImage :src="`https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=Cantonese%20lion%20dance%20performance%20during%20Chinese%20New%20Year%2C%20red%20and%20gold%20lion%20costumes%2C%20dancers%20performing%20acrobatic%20moves&image_size=landscape_16_9`" alt="广东醒狮" />
            </div>
            <p>广东醒狮是广东的传统民俗活动，春节期间大街小巷常能看到醒狮表演，热闹非凡。</p>
          </div>
          <div class="culture-item" tabindex="0">
            <h3>广东花市</h3>
            <div class="culture-image">
              <LazyImage :src="`https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=Guangdong%20flower%20market%20during%20Chinese%20New%20Year%2C%20colorful%20flowers%2C%20crowded%20streets%2C%20red%20decorations&image_size=landscape_16_9`" alt="广东花市" />
            </div>
            <p>广东花市是广东春节的传统习俗，人们在花市购买鲜花，寓意新年吉祥如意。</p>
          </div>
          <div class="culture-item" tabindex="0">
            <h3>广东特色美食</h3>
            <div class="culture-image">
              <LazyImage :src="`https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=Guangdong%20traditional%20food%20selection%20including%20dim%20sum%2C%20roast%20goose%2C%20rice%20noodles%2C%20Chinese%20New%20Year%20feast&image_size=landscape_16_9`" alt="广东特色美食" />
            </div>
            <p>广东春节特色美食包括点心、烧鹅、肠粉等，口味清淡鲜美，是春节家宴的必备佳肴。</p>
          </div>
        </div>
      </div>
      
      <!-- 四川文化 -->
      <div 
        v-else-if="activeCulture === 'sichuan'" 
        class="culture-content"
        role="tabpanel"
        id="sichuan-content"
        aria-labelledby="sichuan-tab"
      >
        <div class="culture-grid">
          <div class="culture-item" tabindex="0">
            <h3>川剧变脸</h3>
            <div class="culture-image">
              <LazyImage :src="`https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=Sichuan%20Opera%20performer%20doing%20face%20changing%20act%2C%20traditional%20costume%2C%20red%20and%20gold%20colors%2C%20stage%20performance&image_size=landscape_16_9`" alt="川剧变脸" />
            </div>
            <p>川剧变脸是四川戏曲的独特技艺，春节期间常能看到精彩的变脸表演，令人叹为观止。</p>
          </div>
          <div class="culture-item" tabindex="0">
            <h3>四川麻将</h3>
            <div class="culture-image">
              <LazyImage :src="`https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=Sichuan%20mahjong%20game%20during%20Chinese%20New%20Year%2C%20family%20gathering%2C%20red%20tablecloth%2C%20traditional%20setting&image_size=landscape_16_9`" alt="四川麻将" />
            </div>
            <p>四川麻将是四川人春节期间的传统娱乐活动，亲朋好友聚在一起打麻将，共度新春。</p>
          </div>
          <div class="culture-item" tabindex="0">
            <h3>四川灯会</h3>
            <div class="culture-image">
              <LazyImage :src="`https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=Sichuan%20traditional%20lantern%20festival%20during%20Chinese%20New%20Year%2C%20colorful%20lanterns%2C%20crowded%20streets%2C%20traditional%20designs&image_size=landscape_16_9`" alt="四川灯会" />
            </div>
            <p>四川灯会是四川春节的传统习俗，各种造型的彩灯将夜晚装扮得绚丽多彩。</p>
          </div>
          <div class="culture-item" tabindex="0">
            <h3>四川特色美食</h3>
            <div class="culture-image">
              <LazyImage :src="`https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=Sichuan%20traditional%20food%20selection%20including%20hot%20pot%2C%20mapo%20tofu%2C%20kung%20pao%20chicken%2C%20Chinese%20New%20Year%20feast&image_size=landscape_16_9`" alt="四川特色美食" />
            </div>
            <p>四川春节特色美食以麻辣为主，包括火锅、麻婆豆腐、宫保鸡丁等，味道浓郁醇厚。</p>
          </div>
        </div>
      </div>
      
      <!-- 浙江文化 -->
      <div 
        v-else-if="activeCulture === 'zhejiang'" 
        class="culture-content"
        role="tabpanel"
        id="zhejiang-content"
        aria-labelledby="zhejiang-tab"
      >
        <div class="culture-grid">
          <div class="culture-item" tabindex="0">
            <h3>杭州西湖</h3>
            <div class="culture-image">
              <LazyImage :src="`https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=Hangzhou%20West%20Lake%20during%20Chinese%20New%20Year%2C%20traditional%20Chinese%20garden%2C%20red%20lanterns%2C%20snow-capped%20landscape&image_size=landscape_16_9`" alt="杭州西湖" />
            </div>
            <p>杭州西湖是浙江的著名景点，春节期间西湖周边张灯结彩，吸引众多游客前来观赏。</p>
          </div>
          <div class="culture-item" tabindex="0">
            <h3>浙江越剧</h3>
            <div class="culture-image">
              <LazyImage :src="`https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=Yue%20Opera%20performers%20from%20Zhejiang%20in%20traditional%20costumes%2C%20elegant%20movements%2C%20red%20and%20gold%20colors&image_size=landscape_16_9`" alt="浙江越剧" />
            </div>
            <p>越剧是浙江的代表性戏曲剧种，春节期间常上演经典剧目，深受观众喜爱。</p>
          </div>
          <div class="culture-item" tabindex="0">
            <h3>浙江丝绸</h3>
            <div class="culture-image">
              <LazyImage :src="`https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=Zhejiang%20silk%20products%20including%20scarves%20and%20dresses%2C%20traditional%20patterns%2C%20red%20and%20gold%20colors&image_size=landscape_16_9`" alt="浙江丝绸" />
            </div>
            <p>浙江丝绸历史悠久，工艺精湛，春节期间常作为礼品赠送亲友，寓意吉祥如意。</p>
          </div>
          <div class="culture-item" tabindex="0">
            <h3>浙江特色美食</h3>
            <div class="culture-image">
              <LazyImage :src="`https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=Zhejiang%20traditional%20food%20selection%20including%20West%20Lake%20fish%2C%20Dongpo%20pork%2C%20sticky%20rice%20dumplings%2C%20Chinese%20New%20Year%20feast&image_size=landscape_16_9`" alt="浙江特色美食" />
            </div>
            <p>浙江春节特色美食包括西湖醋鱼、东坡肉、粽子等，口味清淡鲜美，深受人们喜爱。</p>
          </div>
        </div>
      </div>
      
      <!-- 江苏文化 -->
      <div 
        v-else-if="activeCulture === 'jiangsu'" 
        class="culture-content"
        role="tabpanel"
        id="jiangsu-content"
        aria-labelledby="jiangsu-tab"
      >
        <div class="culture-grid">
          <div class="culture-item" tabindex="0">
            <h3>苏州园林</h3>
            <div class="culture-image">
              <LazyImage :src="`https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=Suzhou%20classical%20garden%20during%20Chinese%20New%20Year%2C%20traditional%20Chinese%20architecture%2C%20red%20lanterns%2C%20pond%20with%20lotus&image_size=landscape_16_9`" alt="苏州园林" />
            </div>
            <p>苏州园林是江苏的著名景点，春节期间园林内张灯结彩，展现出江南园林的独特魅力。</p>
          </div>
          <div class="culture-item" tabindex="0">
            <h3>江苏昆曲</h3>
            <div class="culture-image">
              <LazyImage :src="`https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=Kunqu%20Opera%20performers%20from%20Jiangsu%20in%20traditional%20costumes%2C%20elegant%20singing%2C%20red%20and%20gold%20colors&image_size=landscape_16_9`" alt="江苏昆曲" />
            </div>
            <p>昆曲是江苏的传统戏曲剧种，被誉为"百戏之祖"，春节期间常上演经典剧目。</p>
          </div>
          <div class="culture-item" tabindex="0">
            <h3>江苏刺绣</h3>
            <div class="culture-image">
              <LazyImage :src="`https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=Jiangsu%20embroidery%20art%20including%20Suzhou%20embroidery%2C%20intricate%20patterns%2C%20red%20and%20gold%20threads&image_size=landscape_16_9`" alt="江苏刺绣" />
            </div>
            <p>江苏刺绣工艺精湛，尤其是苏州刺绣，春节期间常作为礼品赠送亲友，寓意吉祥如意。</p>
          </div>
          <div class="culture-item" tabindex="0">
            <h3>江苏特色美食</h3>
            <div class="culture-image">
              <LazyImage :src="`https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=Jiangsu%20traditional%20food%20selection%20including%20Yangzhou%20fried%20rice%2C%20Nanjing%20salted%20duck%2C%20sweet%20and%20sour%20ribs&image_size=landscape_16_9`" alt="江苏特色美食" />
            </div>
            <p>江苏春节特色美食包括扬州炒饭、南京盐水鸭、糖醋排骨等，口味清淡鲜美，深受人们喜爱。</p>
          </div>
        </div>
      </div>
      
      <!-- 福建文化 -->
      <div 
        v-else-if="activeCulture === 'fujian'" 
        class="culture-content"
        role="tabpanel"
        id="fujian-content"
        aria-labelledby="fujian-tab"
      >
        <div class="culture-grid">
          <div class="culture-item" tabindex="0">
            <h3>福建土楼</h3>
            <div class="culture-image">
              <LazyImage :src="`https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=Fujian%20tulou%20traditional%20earthen%20buildings%20during%20Chinese%20New%20Year%2C%20round%20architecture%2C%20red%20lanterns%2C%20mountainous%20landscape&image_size=landscape_16_9`" alt="福建土楼" />
            </div>
            <p>福建土楼是福建的传统民居，春节期间土楼内张灯结彩，充满节日氛围。</p>
          </div>
          <div class="culture-item" tabindex="0">
            <h3>福建茶文化</h3>
            <div class="culture-image">
              <LazyImage :src="`https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=Fujian%20tea%20ceremony%20during%20Chinese%20New%20Year%2C%20traditional%20tea%20set%2C%20oolong%20tea%2C%20family%20gathering&image_size=landscape_16_9`" alt="福建茶文化" />
            </div>
            <p>福建是中国著名的茶乡，春节期间人们常以茶待客，共度新春佳节。</p>
          </div>
          <div class="culture-item" tabindex="0">
            <h3>福建妈祖文化</h3>
            <div class="culture-image">
              <LazyImage :src="`https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=Fujian%20Mazu%20temple%20festival%20during%20Chinese%20New%20Year%2C%20traditional%20procession%2C%20red%20decorations%2C%20devotees&image_size=landscape_16_9`" alt="福建妈祖文化" />
            </div>
            <p>妈祖文化是福建的传统信仰，春节期间常举办妈祖祭祀活动，祈求平安吉祥。</p>
          </div>
          <div class="culture-item" tabindex="0">
            <h3>福建特色美食</h3>
            <div class="culture-image">
              <LazyImage :src="`https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=Fujian%20traditional%20food%20selection%20including%20fish%20ball%20soup%2C%20oyster%20omelet%2C%20peanut%20candy%2C%20Chinese%20New%20Year%20feast&image_size=landscape_16_9`" alt="福建特色美食" />
            </div>
            <p>福建春节特色美食包括鱼丸汤、蚵仔煎、花生糖等，口味清淡鲜美，深受人们喜爱。</p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import LazyImage from '../components/LazyImage.vue'

const activeCulture = ref('anhui')
</script>

<style scoped>
.culture-section {
  min-height: 80vh;
}

.culture-container {
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
}

.culture-section h2 {
  color: #c41e3a;
  text-align: center;
  margin-bottom: 2rem;
  font-size: 2.5rem;
}

.culture-tabs {
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin-bottom: 2rem;
}

.culture-tabs button {
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

.culture-tabs button.active {
  background-color: #c41e3a;
  color: #fff;
}

.culture-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
}

.culture-item {
  background-color: #fff;
  border-radius: 15px;
  overflow: hidden;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
}

.culture-item:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
}

.culture-image {
  height: 200px;
  overflow: hidden;
}

.culture-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s ease;
}

.culture-item:hover .culture-image img {
  transform: scale(1.1);
}

.culture-item h3 {
  color: #c41e3a;
  padding: 1rem;
  margin: 0;
}

.culture-item p {
  padding: 0 1rem 1rem;
  margin: 0;
  color: #666;
}

@media (max-width: 768px) {
  .culture-grid {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 480px) {
  .culture-section h2 {
    font-size: 2rem;
  }
}

/* 按钮焦点样式 */
.culture-tabs button:focus {
  outline: 2px solid #d4af37;
  outline-offset: 2px;
}

/* 卡片焦点样式 */
.culture-item:focus {
  outline: 2px solid #d4af37;
  outline-offset: 2px;
}

/* 选项卡样式改进 */
.culture-tabs button {
  position: relative;
}

.culture-tabs button.active::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 3px;
  background-color: #c41e3a;
  border-radius: 3px 3px 0 0;
}

/* 卡片交互改进 */
.culture-item {
  transition: all 0.3s ease;
}

.culture-item:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
}

.culture-item:focus {
  transform: translateY(-3px);
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15);
}
</style>