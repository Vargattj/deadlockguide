<template>
  <div class="main">
    <nav class="shop-tabs" :data-item-type="selectedItemType.toLocaleLowerCase()">
      <button class="shop-tab-button" @click="selectShopTab('Weapon')"
        :class="{ active: selectedItemType === 'Weapon' }">
        Weapon
      </button>
      <button class="shop-tab-button" @click="selectShopTab('Armor')" :class="{ active: selectedItemType === 'Armor' }">
        Vitality
      </button>
      <button class="shop-tab-button" @click="selectShopTab('Tech')" :class="{ active: selectedItemType === 'Tech' }">
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
import itemsData from '../item-data.json';
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
  async mounted() {
    this.getItems()
  },
  methods: {
    async getItems() {
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
:root {
  --color-weapon: #C97A03;
  --color-armor: #7CBB1E;
  --color-spirit: #CE91FF;
  --color-primary: #170C00;
  --color-secondary: #F0E2C9
}

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

  .shop-tab-button::before {
    content: '';
    width: 25px;
    height: 25px;
    display: inline-block;
    background-repeat: no-repeat;
  }

  .shop-tab-button:nth-child(1)::before {
    background-image: url(assets/items/weapon-Icon.png);
    margin-right: 5px;
  }

  .shop-tab-button:nth-child(2)::before {
    background-image: url(assets/items/vitality-icon.png);
  }

  .shop-tab-button:nth-child(3)::before {
    background-image: url(assets/items/spirit-icon.png);
    margin-top: 2px;
  }
}

.shop-items-wrapper {
  border-top: 6px solid var(--color-weapon);
  background-color: #584021;

  &[data-item-type='armor'] {
    background-color: #325008;
    border-top: 6px solid var(--color-armor);
  }

  &[data-item-type='tech'] {
    background-color: #3F2851;
    border-top: 6px solid var(--color-spirit);
  }

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

  .highlight {
    color: #fefefe;
  }
}
</style>
