<template>
    <div class="tier-item-bonus">
        <div class="top">
            {{ tierBonus }}
        </div>
        <div class="bottom">
            <span class="tier-bonus-text">
                {{ tierBonusText }}
            </span>
        </div>
    </div>
</template>

<script>
export default {
    props: { tier: String, type: String, },

    computed: {
        tierBonus() {
            if (this.tier === '1' && this.type === 'Armor') return '+11%'
            if (this.tier === '2' && this.type === 'Armor') return '+14%'
            if (this.tier === '3' && this.type === 'Armor') return '+17%'
            if (this.tier === '4' && this.type === 'Armor') return '+20%'
            if (this.tier === '1' && this.type === 'Tech') return '+4'
            if (this.tier === '2' && this.type === 'Tech') return '+8'
            if (this.tier === '3' && this.type === 'Tech') return '+12'
            if (this.tier === '4' && this.type === 'Tech') return '+16'
            if (this.tier === '2') return '+10%'
            if (this.tier === '3') return '+14%'
            if (this.tier === '4') return '+18%'
            return '+6%'
        },
        tierBonusText() {
            if (this.type === 'Armor') return 'Base Health'
            if (this.type === 'Tech') return 'Spirit Power'
            return 'Weapon damage'

        }
    },
    mounted() {

    },
    methods: {
    }
};
</script>

<style lang="scss" scoped>
.tier-item-bonus {
    font-size: 14px;
    min-width: 80px;

    .top {
        padding: 6px;
        background-color: #0000004d;
        font-size: 16px;
    }

    .bottom {
        font-size: 12px;
        padding: 6px;
        font-weight: 400;
        background-color: #0006;
    }

    .tier-bonus-text {
        max-width: 70px;
        display: block;
        margin: 0 auto;
    }
}
</style>