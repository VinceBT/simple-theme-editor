import './EditableField.scss'

import classNames from 'classnames'
import React, { ChangeEvent, useCallback, useRef, useState } from 'react'

import { RuleType } from '../../models/ThemeRule'
import { bindCallbackOnEnter, bindClickOnEnter } from '../../utils/HTMLUtils'
import PrimaryButton from '../PrimaryButton/PrimaryButton'

export type EditableFieldProps = {
  className?: string
  name?: string
  computedValue?: string
  computationError?: string
  actualValue?: string
  identifier?: string
  type?: RuleType
  valueLabel?: string
  valuePlaceholder?: string
  typeLabel?: string
  typeLabels?: { [key in RuleType]: string }
  submitLabel?: string
  emptyLabel?: string
  onSubmit?: (text: string) => any
  autoSubmit?: boolean
}

function EditableField(props: EditableFieldProps) {
  const {
    className,
    name,
    computedValue,
    computationError,
    actualValue,
    type,
    identifier,
    valueLabel,
    valuePlaceholder,
    typeLabel,
    typeLabels,
    submitLabel,
    emptyLabel,
    onSubmit,
    autoSubmit = true,
  } = props

  const [expanded, setExpanded] = useState<boolean>(false)
  const [editableType, setEditableType] = useState<RuleType | undefined>(type)
  const [editableValue, setEditableValue] = useState(actualValue ?? '')
  const timeoutRef = useRef<any>()

  const handleExpand = useCallback(() => {
    setExpanded(!expanded)
  }, [expanded])

  const submitValue = useCallback(
    (value) => {
      onSubmit?.(value)
    },
    [onSubmit]
  )

  const handleSubmit = useCallback(() => {
    submitValue(editableValue)
    setExpanded(false)
  }, [editableValue, submitValue])

  const launchTimer = useCallback(
    (value: string) => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current)
      timeoutRef.current = setTimeout(() => submitValue(value), 300)
    },
    [submitValue]
  )

  const handleTextChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      const nextValue = (event.target as HTMLInputElement).value
      setEditableValue?.(nextValue)
      if (autoSubmit) launchTimer(nextValue)
    },
    [autoSubmit, launchTimer]
  )

  const handleTypeClick = useCallback(
    (type) => () => {
      setEditableType(type)
    },
    []
  )

  const renderFieldTypeRadioButton = useCallback(
    (fieldType: RuleType) => {
      if (!typeLabels) return null
      return (
        <div
          key={fieldType}
          className="radio-button"
          onClick={handleTypeClick(fieldType)}
          tabIndex={0}
          onKeyUp={bindClickOnEnter}
        >
          <div className={classNames('radio', editableType === fieldType && 'checked')} />
          <div className="label">{typeLabels[fieldType]}</div>
        </div>
      )
    },
    [editableType, handleTypeClick, typeLabels]
  )

  const fieldTypeOrder = [RuleType.Text, RuleType.Em, RuleType.Px, RuleType.Color]

  return (
    <div className={classNames(className, 'EditableField', expanded && 'expanded')}>
      <div
        className="info-container"
        onClick={handleExpand}
        tabIndex={0}
        onKeyUp={bindClickOnEnter}
      >
        <div className="name">{name + ':'}</div>
        <div
          className={classNames(
            'computedValue',
            computedValue === '' && 'empty',
            Boolean(computationError) && 'error'
          )}
        >
          {Boolean(computationError)
            ? computationError
            : computedValue === ''
            ? emptyLabel
            : computedValue}
        </div>
        {!Boolean(computationError) && editableType === RuleType.Color && (
          <div className="colorPreview" style={{ background: computedValue }} />
        )}
        <div className="spacer" />
        <div className="identifier">{identifier}</div>
        <div className="close">🞫</div>
      </div>
      {expanded && (
        <>
          <div className="input-container">
            <div className="text">{valueLabel + ':'}</div>
            <input
              className="input"
              placeholder={valuePlaceholder}
              value={editableValue}
              onChange={handleTextChange}
              onKeyPress={bindCallbackOnEnter(handleSubmit)}
            />
          </div>
          <div className="radio-container">
            <div className="text">{typeLabel + ':'}</div>
            <div className="radio-group">{fieldTypeOrder.map(renderFieldTypeRadioButton)}</div>
            <PrimaryButton
              className="button"
              onClick={handleSubmit}
              text={submitLabel}
              disabled={editableValue === actualValue}
            />
          </div>
        </>
      )}
    </div>
  )
}

export default React.memo<EditableFieldProps>(EditableField)
