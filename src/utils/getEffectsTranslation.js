import { translate } from "../utils/translator";
import protoData from "../data/protoy.json";
import exactMath from "exact-math";
import { replace_n } from "../utils/replaceN";

const WHITE_LIST_EFFECTS = [
    'Hitpoints',
    'Damage',
    'DamageBonus',
    'FreeHomeCityUnit',
    'WorkRate',
    'WorkRateEspecific',
    'TrainPoints',
    'MaximumVelocity'
]

const NO_ABSTRACT = [
    'Infantry',
    'Cavalry'
]

const TARGETS_MAP = {
    'AbstractCoyoteMan': 'AbstractNameCoyote'
}

export function getEffectsTranslations(effects = []) {
    return effects.filter(effect => WHITE_LIST_EFFECTS.includes(effect?._subtype)).map(effect => {
        const mainText = translate(buildSymbolId(effect), true) || ''
        const percentage = exactMath.formula(`((${+effect?._amount}) - 1) * 100`)
        let targetText = ''
        let unitText = ''
        let resourceText = ''
        let params = []

        if (effect?.target) {
            let targetLabel = effect?.target?.__text || ''

            if (targetLabel !== 'AbstractInfantry' && NO_ABSTRACT.some(word => targetLabel.includes(word))) {
                targetLabel = targetLabel.replace('Abstract', '')
            }

            if (TARGETS_MAP.hasOwnProperty(targetLabel)) {
                targetLabel = TARGETS_MAP[targetLabel]
            }

            targetText = translate(targetLabel, true) || getUnitTranslation(targetLabel)
        }

        if (effect?._unittype) {
            unitText = getUnitTranslation(effect?._unittype)
        }
        
        if (effect?._resource) {
            resourceText = translate(`ResourceName${effect?._resource}`, true)
        }

        if (effect?._subtype === 'Hitpoints') {
            params = [targetText, percentage]
        } else if (effect?._subtype === 'Damage') {
            const actionDamage = +effect?._allactions ? translate('AllActionsEffect', true) : ''
            params = [targetText, actionDamage, percentage]
        } else if (effect?._subtype === 'FreeHomeCityUnit') {
            params = [parseInt(effect?._amount), unitText]
        } else if (effect?._subtype === 'TrainPoints') {
            params = [targetText, percentage]
        } else if (effect?._subtype === 'MaximumVelocity') {
            params = [targetText, percentage]
        } else {
            params = [targetText, effect?._action, unitText, percentage, resourceText]
        }

        return replace_n(mainText, ...params)
    })
}

function buildSymbolId(effect) {
    let subType = effect?._subtype || ''
    let operationText = ''

    if (subType.includes('Specific')) {
        subType = subType.replace('Specific', 'EffectSpecific')
    } else {
        subType += 'Effect'
    }

    if (!subType.includes('FreeHomeCity')) {
        operationText = (+effect?._amount - 1) > 0 ? 'Increase' : 'Decrease'
    }
    if (effect?._subtype === 'MaximumVelocity') {
        operationText = (+effect?._amount - 1) > 0 ? 'Increase' : 'Decrease'
        subType = 'SpeedEffect'
    }

    return [operationText, subType].join('')
}

function getUnitTranslation(unitType) {
    const unit = protoData.unit.find(unit => unit?._name === unitType)
    if (unit) {
        return translate(unit?.displaynameid)
    }
    return ''
}