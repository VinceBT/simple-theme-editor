import './Home.scss'

import React, { useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import { useDispatch, useSelector } from 'react-redux'

import AccordionSection from '../../components/AccordionSection/AccordionSection'
import EditableField from '../../components/EditableField/EditableField'
import PrimaryButton from '../../components/PrimaryButton/PrimaryButton'
import ThemeRule, { RuleType } from '../../models/ThemeRule'
import ThemeSection from '../../models/ThemeSection'
import App from '../../redux/App/App'

function Home() {
  const { t } = useTranslation()
  const dispatch = useDispatch()

  const autoSubmit = useSelector(App.selectors.getAutoSubmit)
  const themeSections = useSelector(App.selectors.getComputedThemeSections)

  const handleRuleSubmit = useCallback(
    (identifier: string) => (value: string) => {
      dispatch(App.actions.updateRuleValue({ identifier, nextValue: value }))
    },
    [dispatch]
  )

  const handleThemeSave = useCallback(() => {
    const json = themeSections.reduce((acc: any, themeSection) => {
      themeSection.rules.forEach((rule) => {
        const suffix = rule.type === RuleType.Em ? 'em' : rule.type === RuleType.Px ? 'px' : ''
        acc[rule.identifier] = rule.computedValue + suffix
      })
      return acc
    }, {})
    console.log(json)
    setImmediate(() => {
      alert(JSON.stringify(json))
    })
  }, [themeSections])

  const handleThemeReset = useCallback(() => {
    localStorage.clear()
    window.location.reload()
  }, [])

  const handleAutoSubmit = useCallback(() => {
    dispatch(App.actions.setAutoSubmit({ autoSubmit: !autoSubmit }))
  }, [dispatch, autoSubmit])

  const renderRule = useCallback(
    (themeRule: ThemeRule) => {
      return (
        <EditableField
          className="field"
          key={themeRule.identifier}
          name={themeRule.name}
          type={themeRule.type}
          computedValue={themeRule.computedValue}
          computationError={themeRule.computationError}
          actualValue={themeRule.value}
          identifier={themeRule.identifier}
          valueLabel={t('value_label')}
          valuePlaceholder={t('value_placeholder')}
          typeLabel={t('type_label')}
          typeLabels={{
            [RuleType.Text]: t('type_text'),
            [RuleType.Em]: t('type_em'),
            [RuleType.Px]: t('type_px'),
            [RuleType.Color]: t('type_color'),
          }}
          submitLabel={t('submit_label')}
          emptyLabel={t('empty_label')}
          onSubmit={handleRuleSubmit(themeRule.identifier)}
          autoSubmit={autoSubmit}
        />
      )
    },
    [autoSubmit, handleRuleSubmit, t]
  )

  const renderSection = useCallback(
    (themeSection: ThemeSection) => {
      return (
        <AccordionSection
          key={themeSection.name}
          sectionTitle={themeSection.name}
          className="accordion"
        >
          {themeSection.rules.map(renderRule)}
        </AccordionSection>
      )
    },
    [renderRule]
  )

  return (
    <div className="Home">
      <h1>{t('title')}</h1>
      {themeSections.map(renderSection)}
      <div className="buttons-container">
        <PrimaryButton className="saveButton" text={t('save_label')} onClick={handleThemeSave} />
        <PrimaryButton className="resetButton" text={t('reset_label')} onClick={handleThemeReset} />
        <PrimaryButton
          className="autoSubmitButton"
          text={autoSubmit ? t('auto_submit_off_label') : t('auto_submit_on_label')}
          onClick={handleAutoSubmit}
        />
      </div>
    </div>
  )
}

export default Home
