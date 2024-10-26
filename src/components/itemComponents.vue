<template>
    <div v-if="componentName" class="components" :data-item-type="itemtype">
        <h3 class="title">{{ modeText }}:</h3>
        <div class="component">
            <div class="icon-wrapper">
                <img class="component-icon" :src="matchedItem.ImagePath" :alt="matchedItem.Name">
            </div>
            <h4 class="component-name">{{ matchedItem.Name }}</h4>
        </div>
    </div>
</template>

<script>
import itemsData from '../../item-data.json';
import { toRaw } from 'vue';

export default {
    components: {},
    props: { component: Object, mode: String, itemtype: String },
    data() {
        return {
        };
    },
    computed: {
        componentName() {
            return this.component && toRaw(this.component)[0]
        },
        modeText() {
            return this.mode === 'is' ? 'Is component of' : 'Components';
        },
        matchedItem() {
            return itemsData[this.componentName] || null;
        }
    },
    mounted() {
    },
    methods: {
    }
};
</script>

<style lang="scss" scoped>
.components {
    background-color: rgba(0, 0, 0, 0.6);
    color: #fef7da;
    padding: 8px 16px;
    text-align: left;

    .title {
        text-transform: uppercase;
        font-size: 11px;
    }

    .component {
        display: flex;
        align-items: center;
        margin-top: 6px;
        background-color: rgba(0, 0, 0, 0.3);
        width: fit-content;
        border-radius: 50px;

        .icon-wrapper {
            background-color: var(--color-weapon);
            display: flex;
            justify-content: center;
            align-items: center;
            border-radius: 50%;
            width: 32px;
            height: 32px;
        }

        .component-icon {
            width: 20px;
            object-fit: cover;
            margin: auto;
            filter: brightness(0) saturate(100%) invert(12%) sepia(9%) saturate(4980%) hue-rotate(4deg) brightness(94%) contrast(93%);
        }

        .component-name {
            padding: 8px 12px;
            padding-left: 8px;
            font-weight: 400;
        }
    }

    &[data-item-type='Armor'] {
        .component>.icon-wrapper {
            background-color: var(--color-armor);
        }
    }

    &[data-item-type='Tech'] {
        .component>.icon-wrapper {
            background-color: var(--color-spirit);
        }
    }
}
</style>