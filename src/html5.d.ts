import 'react'

// Extended support for the newest HTML5 attributes in React.
// Possibly Upcoming: https://open-ui.org/components/invokers.explainer/

declare module 'react' {
  interface HTMLAttributes<T> extends AriaAttributes, DOMAttributes<T> {
    /**
     * The popover global attribute is used to designate an element as a popover element.
     * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/popover
     */
    popover?: 'auto' | 'manual' | undefined
  }

  interface ButtonHTMLAttributes<T> extends React.AriaAttributes, React.DOMAttributes<T> {
    /**
     * ID of the popover target element to open.
     *
     * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#popovertarget
     */
    popovertarget?: string // Consider using a more specific type than `any`
    /**
     * The popovertargetaction attribute is used to designate an element as a popover target action element.
     * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#popovertargetaction
     */
    popovertargetaction?: 'show' | 'hide' | 'toggle'
  }

  interface InputHTMLAttributes<T> extends React.AriaAttributes, React.DOMAttributes<T> {
    /**
     * ID of the popover target element to open.
     *
     * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#popovertarget
     */
    popovertarget?: T extends { type: 'button' } ? string : never
  }
}
