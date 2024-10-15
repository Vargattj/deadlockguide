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

    <div class="shop-itens-wrapper" :data-item-type="selectedItemType.toLocaleLowerCase()">
      <ItensTierList :itens="getItensByTier('1')" tier="1" />
      <ItensTierList :itens="getItensByTier('2')" tier="2" />
      <ItensTierList :itens="getItensByTier('3')" tier="3" />
      <ItensTierList :itens="getItensByTier('4')" tier="4" />
    </div>

  </div>
</template>

<script>
import itemsData from '../item-data.json';
import ItensTierList from './components/itensTierList.vue';
export default {
  components: { ItensTierList },
  data() {
    return {
      items: itemsData,
      shopItems: null,
      selectedItemType: 'Weapon',
    };
  },
  async mounted() {
    this.getItens()
  },
  methods: {
    async getItens() {
      const entriesItens = Object.entries(this.items)
      const filteredItems = entriesItens.filter(([key, value]) => value.Slot === this.selectedItemType);
      const filteredAndSortedObject = Object.fromEntries(filteredItems);
      this.shopItems = filteredAndSortedObject;
    },
    getItensByTier(tier) {
      if (!this.shopItems) return
      const entriesItens = Object.entries(this.shopItems)
      const filteredItems = entriesItens.filter(([key, value]) => {
        return value.Tier === tier
      });
      return Object.fromEntries(filteredItems);

    },
    async selectShopTab(type) {
      this.selectedItemType = type
      this.getItens()
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

.shop-itens-wrapper {
  // height: 90vh;
  // overflow-y: auto;
  // overflow-x: hidden;
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

  .main {
    margin: 0 auto;
    padding: 16px;
  }


  .number {
    font-weight: bold;
    color: #F0E2C9;
    font-size: 16px;
  }

}
</style>
