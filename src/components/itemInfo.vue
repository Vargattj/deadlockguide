<template>
    <div class="item-info" :data-item-type="item.Slot">
        <div class="header">
            <div class="left">
                <h3 class="name">{{ item.Name }}</h3>
                <h4 class="price">
                    <img :src="getImageSrc('souls_iconColored')" alt="" class="souls-icon">
                    {{ item.Cost }}
                </h4>
            </div>
            <TierItemBonus :tier="item.Tier" :type="item.Slot" />
        </div>
        <div class="content">
            <div v-for="(category, categoryName) in item.Tooltip" v-if="item.Tooltip" :key="categoryName">
                <div v-for="(item, index) in category" :key="index" :data-type="categoryName.toLowerCase()">

                    <div v-if="item.Description && category != 'Innate'" class="special-effect">
                        <p class="strip">{{ categoryName }}
                            <span v-if="item.RegularProperties.AbilityCooldown" class="special-effect-cd">
                                {{ item.RegularProperties.AbilityCooldown.value }}s
                            </span>
                        </p>
                        <p class="special-effect-description" v-html="item.Description"></p>
                    </div>

                    <ul v-if="item.RegularProperties && Object.keys(item.RegularProperties).length || item.HighlightedProperties && Object.keys(item.HighlightedProperties).length"
                        class="attributes">
                        <ItemProperties :abilityProperties="item.SpecialProperties"
                            abilityClass="important-ability" />
                        <ItemProperties :abilityProperties="item.HighlightedProperties"
                            abilityClass="highlighted-ability" />
                        <ItemProperties :abilityProperties="item.RegularProperties" abilityClass="regular-ability" />
                    </ul>



                </div>
            </div>

        </div>
    </div>
</template>

<script>
import ItemProperties from './itemProperties.vue';
import TierItemBonus from './tierItemBonus.vue';

export default {
    props: { item: Object },
    components: { TierItemBonus, ItemProperties },
    data() {
        return {
        
        };
    },
    mounted() {


    },
    methods: {
        getImageSrc(name) {
            return `src/assets/items/${name.toLowerCase().replace(/ /g, '_')}.png`
        },
        styleNumbers(text) {
            return text.replace(/(\d+)/g, '<span class="number">$1</span>');
        },
    }
}
</script>

<style lang="scss">
.item-info {
    position: absolute;
    right: 110%;
    top: 50%;
    transform: translateY(-50%);
    border-radius: 6px;
    width: 420px;
    opacity: 0;
    visibility: hidden;
    z-index: 150;
    transition: .1s;
    color: #F0E2C9;
    box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
    background-color: #C97A03;

    &[data-item-type='Armor'] {
        background-color: #7CBB1E;
    }

    &[data-item-type='Tech'] {
        background-color: #CE91FF;
    }

    .header {
        display: flex;
        justify-content: space-between;
        padding: 16px;
    }

    .left {
        text-align: left;

        .name {
            font-size: 24px;
            font-weight: bold;
            text-shadow: 1px 1px 2px #555, 0px 0px 1px #555;
        }

        .price {
            display: block;
            font-size: 18px;
            color: #98ffde;
            margin-top: 6px;
            text-shadow: 1px 1px 2px darkslategrey, 0px 0px 1px darkslategrey;
            display: flex;
            align-items: center;

            img {
                width: 12px;
                margin-right: 4px;
            }
        }
    }

    .content {
        background-color: rgba(0, 0, 0, .4);
        border-bottom-right-radius: 6px;
        border-bottom-left-radius: 6px;
        padding-bottom: 10px;

        .attributes {
            text-align: left;
            padding: 8px 16px;
            color: #cecece;
            font-weight: 400;
        }

        .special-effect {
            text-align: left;

            .strip {
                background-color: #00000080;
                padding-left: 16px;
                display: flex;
                justify-content: space-between;
                align-items: center;
                font-weight: 400;
                min-height: 28px;
            }

            .special-effect-cd {
                background-color: #0B1314;
                height: 100%;
                display: block;
                padding: 6px;
                width: 30%;
                text-align: center;
                display: block;
                font-weight: bold;
            }

            .special-effect-description {
                padding: 12px;
                font-weight: 400;
                line-height: 1.3;
            }
        }

        [data-type='passive'],
        [data-type='active'] {
            .attributes {
                width: calc(100% - 32px);
                margin: 0 auto;
                display: flex;
                gap: 5px;
                padding: 0;

                li {
                    border-radius: 4px;
                    padding: 16px;
                    width: 100%;
                    background-color: rgba(0, 0, 0, 0.2);
                    min-height: 80px;

                }
            }
        }

    }

}
</style>