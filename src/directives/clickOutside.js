function bind (el, binding, vNode) {
  function documentHandler (e) {
    if (el.contains(e.target)) {
      return false
    }
    if (binding.expression) {
      binding.value(e)
    }
  }
  el.__documentHandler__ = documentHandler
  document.addEventListener('click', documentHandler)
}

function unbind (el, binding, vNode) {
  document.removeEventListener('click', el.__documentHandler__)
  delete el.__documentHandler__
}

export default {
  bind,
  unbind
}