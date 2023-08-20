interface Window extends Window {
  _iub: Iubenda
}

interface Iubenda {
  advertisingPreferencesButton: {
    enableElement: (element: HTMLElement) => void
  }
}
