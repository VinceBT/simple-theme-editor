import './AccordionSection.scss'

import classNames from 'classnames'
import React, { useCallback, useState } from 'react'

export type AccordionSectionProps = {
  className?: string
  children?: React.ReactNode
  sectionTitle?: string
  expanded?: boolean
}

function AccordionSection(props: AccordionSectionProps) {
  const { className, children, sectionTitle, expanded = true } = props

  const [isExpanded, setIsExpanded] = useState<boolean>(expanded)

  const handleToggleClick = useCallback(() => {
    setIsExpanded(!isExpanded)
  }, [isExpanded])

  return (
    <div className={classNames(className, 'AccordionSection')}>
      <div className="button-container">
        <button onClick={handleToggleClick}>{isExpanded ? '▼' : '▲'}</button>
      </div>
      <div className="section-title">
        <h2>{sectionTitle}</h2>
      </div>
      <div className="empty" />
      <div className="children-container">
        {isExpanded && <div className="children-content">{children}</div>}
      </div>
    </div>
  )
}

export default React.memo<AccordionSectionProps>(AccordionSection)
