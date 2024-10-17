<template>
    <ul :class="abilityClass" :data-item-category="itemCategory" v-if="Object.keys(formattedProperties).length"
        :data-multiple-props="Object.keys(formattedProperties).length > 1">
        <li v-for="(property, propName) in formattedProperties" :key="propName" :data-style="property.style">
            <p class="property-value">
                <span class="prefix">
                    {{ getValueByKey(propPrefix, propName) }}
                </span>
                <span class="number">{{ property.value }}</span>
                <span class="property-unit">
                    {{ getValueByKey(propUnit, propName) }}
                </span>
            </p>
            <span class="property-text">
                {{ getValueByKey(propsName, propName) }}
            </span>
        </li>
    </ul>
</template>

<script>
export default {
    name: 'ItemProperties',
    data() {
        return {
            propsName: {
                "AbilityCastRange": "Cast Range",
                "AbilityChannelTime": "Channel Duration",
                "AbilityDuration": "Duration",
                "AbilityLifestealPercentHero": "Spirit Lifesteal",
                "ActivatedFireRate": "Fire Rate",
                "ActiveBonusFireRate": "Fire Rate",
                "ActiveBonusLifesteal": "Bullet Lifesteal",
                "ActiveBonusMoveSpeed": "Movement Speed",
                "ActiveRadius": "Active Radius",
                "ActiveReloadPercent": "Ammo",
                "AirMoveIncreasePercent": "Air Jump/Dash Distance",
                "AmbushBonusFireRate": "Ambush Fire Rate",
                "AmbushBonusTechPower": "Ambush Spirit Power",
                "AmbushDuration": "Ambush Duration",
                "AmmoPerSoul": "Ammo Per Soul",
                "AttackDamageWhenShielded": "Weapon Damage While Shielded",
                "AuraRadius": "Radius",
                "BaseAttackDamagePercent": "Weapon Damage",
                "BaseAttackDamagePercentAtMaxDuration": "Max Weapon Damage",
                "BaseAttackDamagePercentBonus": "Weapon Damage",
                "BonusAbilityCharges": "Bonus Ability Charges",
                "BonusAbilityDurationPercent": "Ability Duration",
                "BonusAttackRangePercent": "Weapon Fall-off Range",
                "BonusBaseWeaponDamageTaken": "Weapon Damage",
                "BonusBulletSpeedPercent": "Bullet Velocity",
                "BonusClipSize": "Ammo",
                "BonusClipSizePercent": "Ammo",
                "BonusFireRate": "Fire Rate",
                "BonusFireRatePlayerUnit": "Minions Fire Rate",
                "BonusHealth": "Bonus Health",
                "BonusHealthRegen": "Health Regen",
                "BonusHeavyMeleeDamage": "Bonus Heavy Damage",
                "BonusMeleeDamagePercent": "Melee Damage",
                "BonusMoveSpeed": "Move Speed",
                "BonusPerChain": "Damage on Jump",
                "BonusSpirit": "Spirit Power",
                "BonusSpiritDuration": "Bonus Spirit Duration",
                "BonusSpiritWithMagicShield": "Spirit Power While Shielded",
                "BonusSprintSpeed": "Sprint Speed",
                "BonusZoomPercent": "Weapon Zoom",
                "BuffDuration": "Duration",
                "BuildUpPerShot": "Buildup Per Shot",
                "BulletArmorReduction": "Bullet Resist",
                "BulletDamageReflectedPct": "Bullet Damage Returned",
                "BulletLifestealPercent": "Bullet Lifesteal",
                "BulletResist": "Bullet Resist",
                "BulletResistDuration": "Stack Duration",
                "BulletResistPerStack": "Bullet Resist per Stack",
                "BulletResistReduction": "Bullet Resist Reduction",
                "BulletShieldMaxHealth": "Bullet Shield Health",
                "BulletShieldOnCast": "Bullet Shield",
                "CasterBuffDuration": "Buff Duration",
                "ChainCount": "Max Jumps",
                "ChainRadius": "Jump Radius",
                "CloseRangeBonusDamageRange": "Close Range",
                "CloseRangeBonusWeaponPower": "Weapon Damage",
                "CooldownBetweenChargeReduction": "Faster Time Between Charges",
                "CooldownReduction": "Cooldown Reduction",
                "CooldownReductionOnChargedAbilities": "Cooldown Reduction for Charged Abilities",
                "CooldownReductionWithShield": "Cooldown Reduction While Shielded",
                "CritDamagePercent": "Bonus Damage",
                "DPS": "DPS",
                "DPSMax": "Max DPS",
                "Damage": "Damage",
                "DamageDuration": "Duration",
                "DamagePerChain": "Shock Damage",
                "DamagePulseAmount": "Pulse Damage",
                "DamagePulseRadius": "Pulse Radius",
                "DamageToStack": "Damage taken to Stack",
                "DebuffDuration": "Debuff Duration",
                "DelayDuration": "Delay Duration",
                "DotDuration": "Duration",
                "DotHealthPercent": "Bleed Damage",
                "EMPDuration": "Debuff Duration",
                "EndRadius": "End Radius",
                "FervorBulletResist": "Bullet Resist",
                "FervorFireRate": "Fire Rate",
                "FervorMovespeed": "Move Speed",
                "FervorTechResist": "Spirit Resist",
                "FireRateBonus": "Fire Rate Bonus",
                "FireRateSlow": "Fire Rate Slow",
                "FireRateWhenShielded": "Fire Rate While Shielded",
                "FlyMoveSpeed": "Bonus Fly Speed",
                "FlyingBulletShield": "Bullet Shield Health",
                "FlyingTechShield": "Spirit Shield Health",
                "HeadShotBonusDamage": "Head Shot Bonus Damage",
                "HeadShotCooldown": "Cooldown",
                "HealAmpReceivePenaltyPercent": "Healing Reduction",
                "HealFromHero": "Healing From Heroes",
                "HealFromNPC": "Healing From NPCs",
                "HealOnKill": "Heal On Hero Kill",
                "HealPerStack": "Heal per Stack",
                "HealPercentAmount": "Heal Amount",
                "HealPercentPerHeadshot": "Heal Per Headshot",
                "HealthSteal": "Max HP Steal Per Bullet",
                "ImbuedBonusDuration": "Imbued Ability Duration",
                "ImbuedCooldownReduction": "Imbued Ability Cooldown Reduction",
                "ImbuedTechPower": "Imbued Ability Spirit Power",
                "ImbuedTechRangeMultiplier": "Imbued Ability Range",
                "ImpactDamage": "Damage",
                "InvisDuration": "Invisibility Duration",
                "InvisMoveSpeedMod": "Invis Sprint Speed",
                "LifestealPercentHero": "Spirit Lifesteal",
                "LocalBulletArmorReduction": "Bullet Resist",
                "LongRangeBonusWeaponPower": "Weapon Damage",
                "LongRangeBonusWeaponPowerMinRange": "Min. Distance",
                "MagicIncreasePerStack": "Spirit Amp per Stack",
                "MagicResistReduction": "Spirit Resist Reduction",
                "MaxArmorStacks": "Max Bullet Resist",
                "MaxHealth": "Max Health",
                "MaxHealthDamage": "Max Health Bonus Damage",
                "MaxHealthLossPercent": "Max Health",
                "MaxStacks": "Max Stacks",
                "MeleeDistanceScale": "Heavy Melee distance",
                "MovementSpeedBonusDuration": "Move Speed Duration",
                "MovementSpeedSlow": "Movement Slow",
                "NonImbuedBonusDuration": "Non-Imbued Ability Duration",
                "NonImbuedCooldownReduction": "Non-Imbued Ability Cooldown Reduction",
                "NonImbuedTechRangeMultiplier": "Non-Imbued Ability Range",
                "NonPlayerBonusWeaponPower": "Weapon Damage vs. NPCs",
                "NonPlayerBulletResist": "Bullet Resist vs. NPCs",
                "OutgoingDamagePenaltyPercent": "Damage Penalty",
                "ProcBonusMagicDamage": "Spirit Damage",
                "ProcChance": "Proc Chance",
                "ProcCooldown": "Max Frequency Per Target",
                "Radius": "Radius",
                "RegenDuration": "Regen Duration",
                "ReloadSpeedMultipler": "Reload Time",
                "RespawnHealthPercent": "Rebirth Health",
                "ReturnFireBulletResist": "Bullet Resist",
                "RicochetDamagePercent": "Ricochet Damage",
                "RicochetRadius": "Ricochet Range",
                "RicochetTargetsTooltipOnly": "Ricochet Targets",
                "SaviorBulletShieldHealth": "Bullet Shield",
                "SaviorMagicShieldHealth": "Spirit Shield",
                "ShieldDuration": "Shield Duration",
                "ShootDurationForMax": "Time for Max Damage",
                "ShreddersTechAmp": "Spirit Amp",
                "SlideScale": "Slide Distance",
                "SlowDuration": "Slow Duration",
                "SlowPercent": "Movement Slow",
                "SlowResistancePercent": "Movement Slow Resist",
                "SpawnTimePenalty": "Increased Respawn Time",
                "SpiritDamage": "Spirit Damage",
                "SpiritDamageReflectedPct": "Spirit Damage Returned",
                "SpiritPower": "Spirit Power",
                "SpiritPowerPerSoul": "Spirit Power Per Soul",
                "SpottedRadius": "Spot Radius",
                "Stamina": "Stamina",
                "StaminaCooldownReduction": "Stamina Recovery",
                "StatusResistancePercent": "Debuff Resist",
                "StealDuration": "Steal Duration",
                "StunDuration": "Stun Duration",
                "SummonDuration": "Summon Duration",
                "TechArmorDamageReduction": "Spirit Resist on Spirit Damage",
                "TechDamagePercent": "Damage",
                "TechPower": "Spirit Power",
                "TechRangeMultiplier": "Ability Range",
                "TechResist": "Spirit Resist",
                "TechShieldMaxHealth": "Spirit Shield Health",
                "TechShieldOnCast": "Spirit Shield",
                "TotalHealthRegen": "Total HP Regen",
                "VexBarrierBulletMaxHealth": "Bullet Shield Health",
                "VexBarrierShieldDuration": "Duration",
                "VexBarrierTechMaxHealth": "Spirit Shield Health",
                "WeaponPowerPerKill": "Weapon Damage per Kill",
                "WeaponPowerPerStack": "Weapon Damage per Stack"
            },
            propUnit: {
                "AbilityCastRange": "",
                "AbilityChannelTime": "s",
                "AbilityDuration": "s",
                "AbilityLifestealPercentHero": "%",
                "ActivatedFireRate": "%",
                "ActiveBonusFireRate": "%",
                "ActiveBonusLifesteal": "%",
                "ActiveBonusMoveSpeed": "/s",
                "ActiveRadius": "",
                "ActiveReloadPercent": "%",
                "AirMoveIncreasePercent": "%",
                "AmbushBonusFireRate": "%",
                "AmbushBonusTechPower": "",
                "AmbushDuration": "s",
                "AmmoPerSoul": "",
                "AttackDamageWhenShielded": "%",
                "AuraRadius": "",
                "BaseAttackDamagePercent": "%",
                "BaseAttackDamagePercentAtMaxDuration": "%",
                "BaseAttackDamagePercentBonus": "%",
                "BonusAbilityCharges": "",
                "BonusAbilityDurationPercent": "%",
                "BonusAttackRangePercent": "%",
                "BonusBaseWeaponDamageTaken": "%",
                "BonusBulletSpeedPercent": "%",
                "BonusClipSize": "",
                "BonusClipSizePercent": "%",
                "BonusFireRate": "%",
                "BonusFireRatePlayerUnit": "%",
                "BonusHealth": "",
                "BonusHealthRegen": "",
                "BonusHeavyMeleeDamage": "%",
                "BonusMeleeDamagePercent": "%",
                "BonusMoveSpeed": "/s",
                "BonusPerChain": "",
                "BonusSpirit": "",
                "BonusSpiritDuration": "s",
                "BonusSpiritWithMagicShield": "",
                "BonusSprintSpeed": "/s",
                "BonusZoomPercent": "%",
                "BuffDuration": "s",
                "BuildUpPerShot": "%",
                "BulletArmorReduction": "%",
                "BulletDamageReflectedPct": "%",
                "BulletLifestealPercent": "%",
                "BulletResist": "%",
                "BulletResistDuration": "s",
                "BulletResistPerStack": "%",
                "BulletResistReduction": "%",
                "BulletShieldMaxHealth": "",
                "BulletShieldOnCast": "",
                "CasterBuffDuration": "s",
                "ChainCount": "",
                "ChainRadius": "",
                "CloseRangeBonusDamageRange": "",
                "CloseRangeBonusWeaponPower": "%",
                "CooldownBetweenChargeReduction": "%",
                "CooldownReduction": "%",
                "CooldownReductionOnChargedAbilities": "%",
                "CooldownReductionWithShield": "%",
                "CritDamagePercent": "%",
                "DPS": "",
                "DPSMax": "",
                "Damage": "",
                "DamageDuration": "s",
                "DamagePerChain": "",
                "DamagePulseAmount": "",
                "DamagePulseRadius": "",
                "DamageToStack": "",
                "DebuffDuration": "s",
                "DelayDuration": "s",
                "DotDuration": "sec",
                "DotHealthPercent": "%/sec",
                "EMPDuration": "s",
                "EndRadius": "",
                "FervorBulletResist": "%",
                "FervorFireRate": "%",
                "FervorMovespeed": "/s",
                "FervorTechResist": "%",
                "FireRateBonus": "%",
                "FireRateSlow": "%",
                "FireRateWhenShielded": "%",
                "FlyMoveSpeed": "/s",
                "FlyingBulletShield": "",
                "FlyingTechShield": "",
                "HeadShotBonusDamage": "",
                "HeadShotCooldown": "s",
                "HealAmpReceivePenaltyPercent": "%",
                "HealFromHero": "",
                "HealFromNPC": "",
                "HealOnKill": "",
                "HealPerStack": "",
                "HealPercentAmount": "%",
                "HealPercentPerHeadshot": "%",
                "HealthSteal": "",
                "ImbuedBonusDuration": "%",
                "ImbuedCooldownReduction": "%",
                "ImbuedTechPower": "",
                "ImbuedTechRangeMultiplier": "%",
                "ImpactDamage": "",
                "InvisDuration": "s",
                "InvisMoveSpeedMod": "/s",
                "LifestealPercentHero": "%",
                "LocalBulletArmorReduction": "%",
                "LongRangeBonusWeaponPower": "%",
                "LongRangeBonusWeaponPowerMinRange": "",
                "MagicIncreasePerStack": "%",
                "MagicResistReduction": "%",
                "MaxArmorStacks": "%",
                "MaxHealth": "",
                "MaxHealthDamage": "%",
                "MaxHealthLossPercent": "%",
                "MaxStacks": "",
                "MeleeDistanceScale": "%",
                "MovementSpeedBonusDuration": "s",
                "MovementSpeedSlow": "%",
                "NonImbuedBonusDuration": "%",
                "NonImbuedCooldownReduction": "%",
                "NonImbuedTechRangeMultiplier": "%",
                "NonPlayerBonusWeaponPower": "%",
                "NonPlayerBulletResist": "%",
                "OutgoingDamagePenaltyPercent": "%",
                "ProcBonusMagicDamage": "",
                "ProcChance": "%",
                "ProcCooldown": "s",
                "Radius": "",
                "RegenDuration": "s",
                "ReloadSpeedMultipler": "%",
                "RespawnHealthPercent": "%",
                "ReturnFireBulletResist": "%",
                "RicochetDamagePercent": "%",
                "RicochetRadius": "",
                "RicochetTargetsTooltipOnly": "",
                "SaviorBulletShieldHealth": "",
                "SaviorMagicShieldHealth": "",
                "ShieldDuration": "s",
                "ShootDurationForMax": "s",
                "ShreddersTechAmp": "%",
                "SlideScale": "%",
                "SlowDuration": "s",
                "SlowPercent": "%",
                "SlowResistancePercent": "%",
                "SpawnTimePenalty": "s",
                "SpiritDamage": "",
                "SpiritDamageReflectedPct": "%",
                "SpiritPower": "",
                "SpiritPowerPerSoul": "",
                "SpottedRadius": "",
                "Stamina": "",
                "StaminaCooldownReduction": "%",
                "StatusResistancePercent": "%",
                "StealDuration": "s",
                "StunDuration": "s",
                "SummonDuration": "s",
                "TechArmorDamageReduction": "%",
                "TechDamagePercent": "%",
                "TechPower": "",
                "TechRangeMultiplier": "%",
                "TechResist": "%",
                "TechShieldMaxHealth": "",
                "TechShieldOnCast": "",
                "TotalHealthRegen": "",
                "VexBarrierBulletMaxHealth": "",
                "VexBarrierShieldDuration": "s",
                "VexBarrierTechMaxHealth": "",
                "WeaponPowerPerKill": "%",
                "WeaponPowerPerStack": "%"
            },
            propPrefix: {
                "AbilityCastRange": "",
                "AbilityChannelTime": "",
                "AbilityDuration": "",
                "AbilityLifestealPercentHero": "+",
                "ActivatedFireRate": "+",
                "ActiveBonusFireRate": "",
                "ActiveBonusLifesteal": "",
                "ActiveBonusMoveSpeed": "+",
                "ActiveRadius": "",
                "ActiveReloadPercent": "",
                "AirMoveIncreasePercent": "+",
                "AmbushBonusFireRate": "+",
                "AmbushBonusTechPower": "+",
                "AmbushDuration": "",
                "AmmoPerSoul": "+",
                "AttackDamageWhenShielded": "+",
                "AuraRadius": "",
                "BaseAttackDamagePercent": "+",
                "BaseAttackDamagePercentAtMaxDuration": "",
                "BaseAttackDamagePercentBonus": "+",
                "BonusAbilityCharges": "+",
                "BonusAbilityDurationPercent": "+",
                "BonusAttackRangePercent": "+",
                "BonusBaseWeaponDamageTaken": "+",
                "BonusBulletSpeedPercent": "+",
                "BonusClipSize": "+",
                "BonusClipSizePercent": "+",
                "BonusFireRate": "+",
                "BonusFireRatePlayerUnit": "+",
                "BonusHealth": "+",
                "BonusHealthRegen": "+",
                "BonusHeavyMeleeDamage": "+",
                "BonusMeleeDamagePercent": "+",
                "BonusMoveSpeed": "+",
                "BonusPerChain": "",
                "BonusSpirit": "+",
                "BonusSpiritDuration": "",
                "BonusSpiritWithMagicShield": "+",
                "BonusSprintSpeed": "+",
                "BonusZoomPercent": "+",
                "BuffDuration": "",
                "BuildUpPerShot": "",
                "BulletArmorReduction": "",
                "BulletDamageReflectedPct": "",
                "BulletLifestealPercent": "+",
                "BulletResist": "+",
                "BulletResistDuration": "",
                "BulletResistPerStack": "",
                "BulletResistReduction": "",
                "BulletShieldMaxHealth": "+",
                "BulletShieldOnCast": "",
                "CasterBuffDuration": "",
                "ChainCount": "",
                "ChainRadius": "",
                "CloseRangeBonusDamageRange": "",
                "CloseRangeBonusWeaponPower": "+",
                "CooldownBetweenChargeReduction": "+",
                "CooldownReduction": "+",
                "CooldownReductionOnChargedAbilities": "+",
                "CooldownReductionWithShield": "+",
                "CritDamagePercent": "",
                "DPS": "",
                "DPSMax": "",
                "Damage": "",
                "DamageDuration": "",
                "DamagePerChain": "",
                "DamagePulseAmount": "",
                "DamagePulseRadius": "",
                "DamageToStack": "",
                "DebuffDuration": "",
                "DelayDuration": "",
                "DotDuration": "",
                "DotHealthPercent": "",
                "EMPDuration": "",
                "EndRadius": "",
                "FervorBulletResist": "+",
                "FervorFireRate": "",
                "FervorMovespeed": "",
                "FervorTechResist": "",
                "FireRateBonus": "",
                "FireRateSlow": "",
                "FireRateWhenShielded": "+",
                "FlyMoveSpeed": "+",
                "FlyingBulletShield": "+",
                "FlyingTechShield": "+",
                "HeadShotBonusDamage": "+",
                "HeadShotCooldown": "",
                "HealAmpReceivePenaltyPercent": "",
                "HealFromHero": "",
                "HealFromNPC": "",
                "HealOnKill": "",
                "HealPerStack": "",
                "HealPercentAmount": "",
                "HealPercentPerHeadshot": "",
                "HealthSteal": "",
                "ImbuedBonusDuration": "+",
                "ImbuedCooldownReduction": "+",
                "ImbuedTechPower": "+",
                "ImbuedTechRangeMultiplier": "+",
                "ImpactDamage": "",
                "InvisDuration": "",
                "InvisMoveSpeedMod": "+",
                "LifestealPercentHero": "+",
                "LocalBulletArmorReduction": "",
                "LongRangeBonusWeaponPower": "+",
                "LongRangeBonusWeaponPowerMinRange": "",
                "MagicIncreasePerStack": "+",
                "MagicResistReduction": "",
                "MaxArmorStacks": "",
                "MaxHealth": "",
                "MaxHealthDamage": "",
                "MaxHealthLossPercent": "",
                "MaxStacks": "",
                "MeleeDistanceScale": "+",
                "MovementSpeedBonusDuration": "",
                "MovementSpeedSlow": "",
                "NonImbuedBonusDuration": "+",
                "NonImbuedCooldownReduction": "+",
                "NonImbuedTechRangeMultiplier": "+",
                "NonPlayerBonusWeaponPower": "+",
                "NonPlayerBulletResist": "+",
                "OutgoingDamagePenaltyPercent": "",
                "ProcBonusMagicDamage": "+",
                "ProcChance": "",
                "ProcCooldown": "",
                "Radius": "",
                "RegenDuration": "",
                "ReloadSpeedMultipler": "",
                "RespawnHealthPercent": "",
                "ReturnFireBulletResist": "+",
                "RicochetDamagePercent": "",
                "RicochetRadius": "",
                "RicochetTargetsTooltipOnly": "",
                "SaviorBulletShieldHealth": "",
                "SaviorMagicShieldHealth": "",
                "ShieldDuration": "",
                "ShootDurationForMax": "",
                "ShreddersTechAmp": "",
                "SlideScale": "+",
                "SlowDuration": "",
                "SlowPercent": "",
                "SlowResistancePercent": "+",
                "SpawnTimePenalty": "+",
                "SpiritDamage": "",
                "SpiritDamageReflectedPct": "",
                "SpiritPower": "+",
                "SpiritPowerPerSoul": "+",
                "SpottedRadius": "",
                "Stamina": "+",
                "StaminaCooldownReduction": "+",
                "StatusResistancePercent": "",
                "StealDuration": "",
                "StunDuration": "",
                "SummonDuration": "",
                "TechArmorDamageReduction": "",
                "TechDamagePercent": "",
                "TechPower": "+",
                "TechRangeMultiplier": "+",
                "TechResist": "+",
                "TechShieldMaxHealth": "+",
                "TechShieldOnCast": "",
                "TotalHealthRegen": "",
                "VexBarrierBulletMaxHealth": "",
                "VexBarrierShieldDuration": "",
                "VexBarrierTechMaxHealth": "",
                "WeaponPowerPerKill": "+",
                "WeaponPowerPerStack": "+"
            }
        };
    },
    props: {
        properties: {
            type: Object,
            required: true
        },
        abilityClass: {
            type: String,
            required: true
        },
        itemCategory: String
    },
    computed: {
        formattedProperties() {

            const { AbilityCooldown, ...rest } = this.properties;
            console.log('aqui:', AbilityCooldown);
            return rest;
        }
    },
    methods: {
        getValueByKey(keyList, key) {
            if (!key) return
            return keyList[key] || '';
        },

    }
};
</script>

<style lang="scss" scoped>
ul {

    [data-item-category='Passive'],
    [data-item-category='Active'] {
        background-color: rgba(0, 0, 0, 0.2);
        border-radius: 4px;
        padding: 8px 16px;
        width: 100%;
        display: flex;
        align-items: center;
        flex-wrap: wrap;
        justify-content: space-between;

        li {
            margin: 4px 0;
            width: fit-content;
        }
    }

    &.special-property {
        justify-content: center;
        background-color: transparent;
        padding: 0;
        min-height: 50px;
        display: flex;
        flex-direction: row;
        gap: 4px;
        width: 100%;

        &[data-multiple-props='false'] {
            width: calc(33% - 4px);

            &:only-child {
                width: 100%;

                li {
                    border-radius: 6px;
                }
            }

            li {
                border-top-right-radius: 0;
                border-bottom-right-radius: 0;
            }

            &+.regular-ability {
                border-top-left-radius: 0;
                border-bottom-left-radius: 0;
                width: calc(66% - 4px);
                flex-direction: column;
                align-items: flex-start;

                li {
                    flex-wrap: nowrap;
                }
            }
        }

        &[data-multiple-props='true'] {
            li {
                border-radius: 0;

                &:first-child {
                    border-top-left-radius: 6px;
                }

                &:last-child {
                    border-top-right-radius: 6px;
                }
            }

            &+.regular-ability {
                border-top-left-radius: 0;
                border-top-right-radius: 0;
            }
        }

        li {
            text-align: center;
            flex-direction: column;
            gap: 4px;
            border-radius: 6px;
            background-color: rgba(0, 0, 0, 0.2);
            padding: 16px 8px;
            flex: 1;
            margin: 0;
            justify-content: center;
            height: 100%;

            .property-text {
                font-size: 16px;
                filter: brightness(1.2);
                margin: 0 auto;
            }
        }

        [data-style='healing'] .property-text {
            color: var(--color-armor);
        }

        [data-style='tech_damage'] .property-text {
            color: var(--color-spirit);
        }

        [data-style='bullet_damage'] .property-text {
            color: var(--color-weapon);
        }
    }
}

ul.highlighted-ability {
    li .property-text {
        color: #fefefe;
        font-weight: 600;

    }
}

li {
    margin: 8px 0;
    display: flex;
    width: 100%;
    margin-bottom: 0;

    &.special-property {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;

        .property-text {
            font-size: 16px;
            max-width: 60px;
            margin-top: 4px;
        }
    }

    &.highlated-ability {
        color: #fefefe;
        font-weight: 600;
    }
}

.property-unit {
    margin-right: 4px;
}
</style>