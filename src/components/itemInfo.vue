<template>
    <div class="item-info">
        <div class="header">

            <div class="left">
                <h3 class="name">{{ item.name }}</h3>
                <h4 class="price">
                    <img :src="getImageSrc('souls_iconColored')" alt="" class="souls-icon">
                    {{ itemPrice }}
                </h4>
            </div>
            <div class="right">
                <div class="top">
                    {{ tierBonus }}
                </div>
                <div class="bottom">
                    Weapon <br> Damage
                </div>
            </div>
        </div>
        <div class="body">
            <ul class="attributes">
                <li v-for="(item, key) in item.attributes" :key="key" v-html="styleNumbers(item)"></li>
            </ul>
            <div v-if="item.passive" class="passive">
                <p class="strip">Passive
                    <span v-if="item.passiveCd" class="passive-cd">{{ item.passiveCd }}</span>
                </p>
                <p class="passive-description">

                    <span>{{ item.passive }}</span>
                </p>
            </div>
            <div v-if="item.active" class="passive">
                <p class="strip">Active
                    <span v-if="item.activeCd" class="passive-cd">{{ item.activeCd }}</span>
                </p>
                <p class="passive-description">
                    <span>{{ item.active }}</span>
                </p>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: { item: Object },
    data() {
        return {
            tierBonus: "+6%",
            itemPrice: "500"
        };
    },
    mounted() {
        console.log(this.item);
        const tier = this.item.tier
        if (tier == "2") {
            this.itemPrice = "1,250"
            this.tierBonus = "+10%"
        }
    },

    methods: {
        getImageSrc(name) {
            return `src/assets/items/${name.toLowerCase().replace(/ /g, '_')}.png`
        },
        styleNumbers(text) {
            return text.replace(/(\d+)/g, '<span class="number">$1</span>');
        }
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
    width: 350px;
    opacity: 0;
    visibility: hidden;
    z-index: 150;
    transition: .1s;
    color: #F0E2C9;
    box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
    background-color: #C97A03;



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

    .right {
        font-size: 14px;
        min-width: 80px;

        .top {
            padding: 6px;
            background-color: #A66101;
            font-size: 16px;
        }

        .bottom {
            font-size: 12px;
            padding: 6px;
            font-weight: 400;
            background-color: #8B5000;
        }
    }

    .body {
        background-color: #80530F;
        border-bottom-right-radius: 6px;
        border-bottom-left-radius: 6px;

        .attributes {
            text-align: left;
            padding: 8px 16px;
            color: #C9AC80;

            li {
                margin: 12px 0;
            }
        }

        .passive {
            text-align: left;

            .strip {
                background-color: #583B0D;
                padding-left: 16px;
                display: flex;
                justify-content: space-between;
                align-items: center;
                font-weight: 400;
                min-height: 28px;
            }

            .passive-cd {
                background-color: #0B1314;
                height: 100%;
                display: block;
                padding: 6px;
                width: 30%;
                text-align: center;
                display: block;
                font-weight: bold;
            }

            .passive-description {
                padding: 12px;
                font-weight: 400;
                line-height: 1.3;
            }
        }
    }

}
</style>