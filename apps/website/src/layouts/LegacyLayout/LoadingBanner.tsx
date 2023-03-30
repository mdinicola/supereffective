import React, { useEffect } from 'react'

export const LoadingBanner = ({ content }: { content?: any }) => {
  const hasContent = !!content
  useEffect(() => {
    if (hasContent) {
      return
    }
    // toggle loading class to body
    if (!document.body.classList.contains('loading')) {
      document.body.classList.add('loading')
    }
    return () => {
      document.body.classList.remove('loading')
    }
  }, [hasContent])
  return (
    <>
      {content && (
        <div className="page-container">
          <div
            className="inner-container bg-white-semi"
            style={{ background: 'rgba(243,243,243,0.15)' }}
          >
            <p className={'font-title3 text-center'} style={{ color: 'rgba(255,255,255,0.65)' }}>
              {content}
            </p>
          </div>
        </div>
      )}
    </>
  )
}
