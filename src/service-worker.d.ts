interface Event {
  request: Request
  waitUntil(fn: Promise<void>): void
  respondWith(response: Promise<Response | undefined>): Promise<Response>
}
