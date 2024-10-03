<template>
  <div class="main">
    <ul class="items tier-1">
      <h4 class="tier-price">
        <img :src="getImageSrc('souls_iconColored')" alt="" class="souls-icon">
        500
      </h4>
      <li v-for="(item, key) in items.weapon.tier1" :key="key" class="item">
        <div class="item-image">
          <img :src="getImageSrc(item.name)" alt="">
        </div>
        <h2>{{ item.name }}</h2>
        <ItemInfo :item="item" />
      </li>
    </ul>
    <ul class="items tier-2">
      <h4 class="tier-price">
        <img :src="getImageSrc('souls_iconColored')" alt="" class="souls-icon">
        1,250
      </h4>
      <li v-for="(item, key) in items.weapon.tier2" :key="key" class="item">
        <div class="item-image" :class="{ active: item.active }">
          <img :src="getImageSrc(item.name)" alt="">
          <span class="active-tag" v-if="item.active">ACTIVE</span>
        </div>
        <h2>{{ item.name }}</h2>
        <ItemInfo :item="item" />
      </li>
    </ul>
  </div>
</template>

<script>
import itemsData from '../items.json';
import ItemInfo from './components/itemInfo.vue';
export default {
  components: { ItemInfo },
  data() {
    return {
      items: itemsData
    };
  },
  mounted() {
    console.log(itemsData)
  },

  methods: {
    getImageSrc(name) {
      return `src/assets/items/${name.toLowerCase().replace(/ /g, '_')}.png`
    }
  }
};
</script>

<style lang="scss">
body {
  background-color: #80530F;
  color: #fff;

  .main {
    margin: 0 auto;
  }

  .items {
    display: grid;
    flex-wrap: wrap;
    gap: 10px;
    grid-template-columns: repeat(9, 1fr);
    margin-bottom: 20px;
    position: relative;
    .tier-price {
      color: #98ffde;
      position: absolute;
      left: -100px;
      display: flex;
      justify-content: center;
      align-items: center;
      transform: rotate(-90deg);
      font-weight: bold;
      top: 50%;
      transform: translateY(-50%), rotate(-90deg);
      font-size: 22px;
      .souls-icon{
        width: 18px;
        margin-right: 5px;
      }
    }

    .item {
      text-align: center;
      background-color: #F0E2C9;
      color: #170C00;
      font-weight: 600;
      border-radius: 8px;
      width: 110px;
      height: 130px;
      font-family: sans-serif;
      position: relative;
      cursor: pointer;
      transition: transform .2s;
      .item-image {
        background-color: #D08E3E;
        border-top-left-radius: 8px;
        border-top-right-radius: 8px;
        height: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        position: relative;
        &.active {
          background-color: #EFC586;
        }

        .active-tag {
          font-weight: bold;
          position: absolute;
          bottom: -10px;
          left: 50%;
          transform: translateX(-50%);
          background-color: #170C00;
          color: #F0E2C9;
          padding: 2px 10px;
          border-radius: 2px;
          font-size: 12px;

        }

        img {
          object-fit: cover;
          filter: brightness(0.1) saturate(100%);
          width: 40px;
          height: 40px;
        }
      }

      &:hover {
        transform: scale(1.05);
        z-index: 1000;
        .item-info {
          visibility: visible;
          opacity: 1;
        }
      }

      &:nth-child(-n+3) {
        .item-info {
          left: 110%;
        }
      }

      h2 {
        padding: 10px;
        font-size: 16px;
        height: 50%;
        display: flex;
        align-items: center;
      }

      .number {
        font-weight: bold;
        color: #F0E2C9;
        font-size: 16px;
      }
    }
  }
}
</style>
