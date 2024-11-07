<template>
  <div class="main">
    <nav class="shop-tabs" :data-item-type="selectedItemType.toLocaleLowerCase()">
      <button class="shop-tab-button" @click="selectShopTab('Weapon')"
        :class="{ active: selectedItemType === 'Weapon' }">
        <img src="assets/icons/icon_weapon.svg" alt="icon-weapon">
        Weapon
      </button>
      <button class="shop-tab-button" @click="selectShopTab('Armor')" :class="{ active: selectedItemType === 'Armor' }">
        <img src="assets/icons/icon_armor.svg" alt="icon-armor">
        Vitality
      </button>
      <button class="shop-tab-button" @click="selectShopTab('Tech')" :class="{ active: selectedItemType === 'Tech' }">
        <img src="assets/icons/icon_spirit.svg" alt="icon-spirit">
        Spirit
      </button>
    </nav>
    <div class="shop-items-wrapper" :data-item-type="selectedItemType.toLocaleLowerCase()">
      <itemsTierList :items="getItemsByTier('1')" tier="1" />
      <itemsTierList :items="getItemsByTier('2')" tier="2" />
      <itemsTierList :items="getItemsByTier('3')" tier="3" />
      <itemsTierList :items="getItemsByTier('4')" tier="4" />
    </div>
  </div>
</template>

<script>
import itemsData from './item-data.json';
import itemsTierList from './components/itemsTierList.vue';

export default {
  components: { itemsTierList },
  data() {
    return {
      items: itemsData,
      shopItems: null,
      selectedItemType: 'Weapon',
    };
  },
  created() {
    this.getItems()
  },
  methods: {
    getItems() {
      const entriesItems = Object.entries(this.items)
      const filteredItems = entriesItems.filter(([key, value]) => value.Slot === this.selectedItemType);
      const filteredAndSortedObject = Object.fromEntries(filteredItems);
      this.shopItems = filteredAndSortedObject;
    },
    getItemsByTier(tier) {
      if (!this.shopItems) return
      const entriesItems = Object.entries(this.shopItems)
      const filteredItems = entriesItems.filter(([key, value]) => {
        return value.Tier === tier
      });
      return Object.fromEntries(filteredItems);

    },
    async selectShopTab(type) {
      this.selectedItemType = type
      this.getItems()
    }
  }
};
</script>

<style lang="scss">
.shop-tabs {
  display: flex;
  gap: 12px;

  &[data-item-type='armor'] {
    .shop-tab-button.active {
      background-color: var(--color-armor);
    }
  }

  &[data-item-type='tech'] {
    .shop-tab-button.active {
      background-color: var(--color-spirit);
    }
  }

  .shop-tab-button {
    height: 65px;
    width: 150px;
    display: flex;
    justify-content: center;
    align-items: center;
    border: none;
    border-top-left-radius: 6px;
    border-top-right-radius: 6px;
    background-color: var(--color-secondary);
    color: var(--color-primary);
    font-size: 22px;
    font-weight: 600;
    cursor: pointer;
    border-top: 5px solid var(--color-weapon);

    >img {
      width: 30px;
      height: 30px;
      filter: brightness(0) saturate(100%) invert(12%) sepia(9%) saturate(4980%) hue-rotate(4deg) brightness(94%) contrast(93%);
      margin-right: 8px;
    }

    &:nth-of-type(2) {
      border-color: var(--color-armor);
    }

    &:nth-of-type(3) {
      border-color: var(--color-spirit);
    }

    &.active {
      background-color: var(--color-weapon);
    }
  }


}

.shop-items-wrapper {
  border-top: 6px solid var(--color-weapon);
  background-color: #584021;
  // max-height: 80vh;
  // overflow-x: clip;
 // overflow-y: auto;

  &[data-item-type='armor'] {
    background-color: #325008;
    border-top: 6px solid var(--color-armor);
  }

  &[data-item-type='tech'] {
    background-color: #3F2851;
    border-top: 6px solid var(--color-spirit);
  }

}

body::-webkit-scrollbar {
  display: none;
}

body {
  color: #fef7da;
  background-repeat: no-repeat;
  height: 100%;
  font-size: 14px;

  .main {
    margin: 0 auto;
    padding: 16px;
  }


  .number {
    color: #fefefe;
    font-size: 16px;
    font-weight: 600
  }

  .highlight,
  .highlighted-number {
    color: #fefefe;
  }
}
</style>
