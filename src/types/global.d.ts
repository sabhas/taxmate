interface Window {
  grecaptcha: {
    render: (
      element: HTMLElement,
      options: { sitekey: string; callback: (token: string) => void }
    ) => void
  }
}
