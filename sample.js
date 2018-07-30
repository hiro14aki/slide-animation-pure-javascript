const el = document.getElementsByClassName("floating")[0]

slideUp = () => {
  el.classList.add('floating-close')
  console.log(el.className)
}

clearSlideUp = () => {
  el.classList.remove('floating-close')
  console.log(el.className)
}

window.addEventListener( 'scroll', slideUp, false )
window.addEventListener( 'click', clearSlideUp, false )
