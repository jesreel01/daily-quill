export const createLogger = (context) => {
  const formatMessage = (level, message, data) => {
    const timestamp = new Date().toISOString()
    const base = { timestamp, level, context, message }
    return data ? { ...base, ...data } : base
  }

  return {
    info: (message, data) => console.log(JSON.stringify(formatMessage('info', message, data))),
    warn: (message, data) => console.warn(JSON.stringify(formatMessage('warn', message, data))),
    error: (message, data) => console.error(JSON.stringify(formatMessage('error', message, data))),
    debug: (message, data) => console.debug(JSON.stringify(formatMessage('debug', message, data))),
  }
}
