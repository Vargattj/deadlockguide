<template>
    <div class="item-info" :data-item-type="item.Slot" :data-item-tier="itemTier">
        <div class="header">
            <div class="left">
                <h3 class="name">{{ item.Name }}</h3>
                <h4 class="price">
                    <img src="../assets/icons/icon_souls.png" alt="" class="souls-icon">
                    {{ item.Cost }}
                </h4>
            </div>
            <TierItemBonus :tier="item.Tier" :type="item.Slot" />
        </div>
        <ItemComponents :itemtype="item.Slot" mode="has" :component="item.Components" />

        <div class="content">
            <div v-for="(category, categoryName) in item.Tooltip" v-if="item.Tooltip" :key="categoryName">
                <div v-for="(properties, index) in category" :key="index" :data-type="categoryName.toLowerCase()">
                    <div v-if="properties.Description && categoryName != 'Innate'" class="special-effect">
                        <p v-if="index != 1" class="strip">{{ categoryName }}
                            <span v-if="properties.RegularProperties.AbilityCooldown" class="special-effect-cd">
                                <img src="../assets/icons/icon_cooldown.svg" alt="">
                                {{ properties.RegularProperties.AbilityCooldown.value }}s
                            </span>
                        </p>
                        <p class="special-effect-description" v-html="properties.Description"></p>
                    </div>
                    <div v-if="Object.keys(properties.RegularProperties).length || properties.HighlightedProperties && Object.keys(properties.HighlightedProperties).length || Object.keys(properties.SpecialProperties).length"
                        class="properties">
                        <ItemProperties :itemCategory="categoryName" :properties="properties.SpecialProperties"
                            abilityClass="special-property" />
                        <ItemProperties :itemCategory="categoryName" :properties="properties.HighlightedProperties"
                            abilityClass="highlighted-ability" />
                        <ItemProperties :itemCategory="categoryName" :properties="properties.RegularProperties"
                            abilityClass="regular-ability" />
                    </div>
                </div>
            </div>
        </div>
        <ItemComponents mode="is" :itemtype="item.Slot" :component="item.isComponent" />
    </div>
</template>

<script>
import ItemComponents from './itemComponents.vue';
import ItemProperties from './itemProperties.vue';
import TierItemBonus from './tierItemBonus.vue';

export default {
    props: { item: Object, itemTier: String },
    components: { TierItemBonus, ItemProperties, ItemComponents },
    data() {
        return {

        };
    },
    mounted() {
        this.positionItemInfo()

    },
    methods: {
        positionItemInfo() {
            const items = document.querySelectorAll('.items > li');

            items.forEach(item => {

                const itemInfoElement = item.querySelector('.item-info') 
                const itemRect = item.getBoundingClientRect(); 
                const infoRect = itemInfoElement.getBoundingClientRect(); 

                let left = itemRect.right;

                if (left + infoRect.width > window.innerWidth - 380) {
                    left = itemRect.left - infoRect.width;

                    itemInfoElement.setAttribute('data-position-right', true);
                } else {
                    itemInfoElement.removeAttribute('data-position-right');
                }
            });

        },
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
    border-radius: 6px;
    width: 420px;
    opacity: 0;
    visibility: hidden;
    z-index: 150;
    color: #F0E2C9;
    box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
    background-color: #C97A03;
    transform: translateX(29%) translateY(-50%);
    position: absolute;
    top: 50%;

    &[data-position-right] {
        transform: translateX(-103%) translateY(-50%);

        &[data-item-tier='4'] {
            top: unset;
            transform: translateX(-103%) translateY(-100%);
        }

        &[data-item-tier='1'] {
            top: 0;
            transform: translateX(-103%);
        }
    }


    &[data-item-tier='4'] {
        top: unset;
        transform: translateX(29%) translateY(-100%);

    }

    &[data-item-tier='1'] {
        top: 0;
        transform: translateX(29%);
    }

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

            .souls-icon {
                width: 16px;
                margin-right: 4px;
            }
        }
    }

    .content {
        background-color: rgba(0, 0, 0, .4);
        padding-bottom: 16px;

        &:last-child {
            border-bottom-right-radius: 6px;
            border-bottom-left-radius: 6px;
        }

        >div {
            &:first-child{
                padding-bottom: 16px;
            }
           
            &:only-child {
                padding-bottom: 0;
            }
        }

        .properties {
            text-align: left;
            padding: 8px 16px;
            font-weight: 400;
            padding-bottom: 0;
        }



        .special-effect {
            text-align: left;
            padding-bottom: 16px;

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
                display: flex;
                justify-content: center;
                align-items: center;
                font-weight: bold;
                color: #cecece;
                img{
                    margin-right: 4px;
                    width: 15px;
                    height: 15px;
                }
            }

            .special-effect-description {
                padding: 16px;
                font-weight: 400;
                line-height: 1.3;
                padding-bottom: 0;

                br {
                    display: none;
                }
            }
        }

        [data-type='passive'],
        [data-type='active'] {
            .properties {
                width: calc(100% - 32px);
                margin: 0 auto;
                display: flex;
                gap: 4px;
                padding: 0;
                flex-wrap: wrap;
                align-content: center;

                .special-property:has(.special-property:only-child) {
                    width: 33%;
                }
            }
        }
    }

}
</style>