<template>
    <nav class="shop-tabs" :data-item-type="selectedItemType.toLocaleLowerCase()">
        <button class="shop-tab-button" @click="selectShopTab('Weapon')"
            :class="{ active: selectedItemType === 'Weapon' }">
            Weapon
        </button>
        <button class="shop-tab-button" @click="selectShopTab('Armor')"
            :class="{ active: selectedItemType === 'Armor' }">
            Vitality
        </button>
        <button class="shop-tab-button" @click="selectShopTab('Tech')" :class="{ active: selectedItemType === 'Tech' }">
            Spirit
        </button>
    </nav>
</template>

<script>
export default {
    props: { tier: String, type: String, },
    computed: {
    },
    mounted() {

    },
    methods: {
    }
};
</script>

<style lang="scss" scoped></style>