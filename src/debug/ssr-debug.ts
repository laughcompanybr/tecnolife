export function installSSRDebugger() {
  const originalStringify = JSON.stringify

  JSON.stringify = function (value, replacer, space) {
    try {
      return originalStringify(value, replacer, space)
    } catch (err) {
      console.error("❌ JSON.stringify QUEBROU EM:", value)
      throw err
    }
  }
}