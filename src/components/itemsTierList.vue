<template>
    <ul class="items">
        <h4 class="tier-price">
            <img src="../assets/icons/icon_souls.png" alt="" class="souls-icon">
            {{ tierPrice }}
        </h4>
        <li v-for="(item, itemName, key) in items" :key="itemName" class="item"
            :class="{ active: item.Activation === 'InstantCast' || item.Activation === 'ActivationPress' }, item.Slot">
            <div class="item-image">
                <img :src="item.ImagePath" :alt="item.Name">
                <span class="active-tag"
                    v-if="item.Activation === 'InstantCast' || item.Activation === 'ActivationPress'">ACTIVE</span>
            </div>
            <h2>{{ item.Name }}</h2>
            <ItemInfo :itemTier="tier" :ref="'itemInfo'" :item="item" />
        </li>
    </ul>
</template>

<script>
import ItemInfo from './itemInfo.vue';
import { ref } from 'vue';

export default {
    components: { ItemInfo },
    props: { items: { Object, require: true }, tier: String },
    data() {
        return {
        };
    },

    computed: {
        tierPrice() {
            if (this.tier == '2') return '1,250'
            if (this.tier == '3') return '3,000'
            if (this.tier == '4') return '6,250'
            return '500'
        }
    },
    mounted() {
    },
    methods: {
    }
};
</script>

<style lang="scss" scoped>
.items {
    display: grid;
    flex-wrap: wrap;
    gap: 12px;
    grid-template-columns: repeat(9, 1fr);
    position: relative;
    padding: 16px 56px;

    &:nth-child(even) {
        background-color: rgba(0, 0, 0, 0.15)
    }


    .tier-price {
        color: #98ffde;
        position: absolute;
        display: flex;
        justify-content: center;
        align-items: center;
        transform: rotate(-90deg);
        font-weight: bold;
        top: 50%;
        transform: translateY(-50%) rotate(-90deg);
        font-size: 22px;
        width: 55px;

        .souls-icon {
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
        height: 120px;
        font-family: sans-serif;
        position: relative;
        cursor: pointer;
        transition: ease-out transform .2s;
        
        &.Armor .item-image {
            background-color: #7CBB1E;
        }

        &.Tech .item-image {
            background-color: #CE91FF;
        }

        &.active {
            order: 2;

            .item-image {
                filter: brightness(1.4) saturate(0.5);
            }
        }

        .item-image {
            background-color: #D08E3E;
            border-top-left-radius: 8px;
            border-top-right-radius: 8px;
            height: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            position: relative;

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
                // left: 110%;
            }
        }

        h2 {
            padding: 10px;
            font-size: 16px;
            height: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
        }


    }
}
</style>