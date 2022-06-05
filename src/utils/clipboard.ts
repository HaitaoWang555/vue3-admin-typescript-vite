import Clipboard from 'clipboard'

export default function handleClipboard(text: string, event: Event, callback: any): void {
  const clipboard = new Clipboard(event.target as Element, {
    text: () => text,
  })

  clipboard.on('success', () => {
    callback('success')
    clipboard.destroy()
  })
  clipboard.on('error', () => {
    callback('error')
    clipboard.destroy()
  })
    ; (clipboard as any).onClick(event)
}
