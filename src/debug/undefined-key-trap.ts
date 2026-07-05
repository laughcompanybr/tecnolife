export function installUndefinedKeyTrap() {
  const originalDefineProperty = Object.defineProperty

  Object.defineProperty = function (obj, prop, descriptor) {
    if (prop === undefined || prop === "undefined") {
      console.error("🚨 CHAVE UNDEFINED DETECTADA:", {
        obj,
        prop,
        descriptor,
      })
      console.trace()
    }

    return originalDefineProperty(obj, prop, descriptor)
  }
}