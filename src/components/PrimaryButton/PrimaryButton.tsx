import './PrimaryButton.scss'

import classNames from 'classnames'
import React, { useCallback } from 'react'

export type PrimaryButtonProps = {
  className?: string
  text?: string
  disabled?: boolean
  onClick?: Function
}

function PrimaryButton(props: PrimaryButtonProps) {
  const { className, text, onClick, disabled = false } = props

  const handleClick = useCallback(() => {
    if (!disabled) onClick?.()
  }, [disabled, onClick])

  return (
    <button
      className={classNames(className, 'PrimaryButton', disabled && 'disabled')}
      onClick={handleClick}
      disabled={disabled}
    >
      {text}
    </button>
  )
}

export default React.memo<PrimaryButtonProps>(PrimaryButton)
