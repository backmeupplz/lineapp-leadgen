import "./assets/styles/main.scss";

const maxValue = 500
const minValue = 1
const countCustomers = document.getElementById("count-customers")
const countCustomersOutput = document.getElementById("count-customers-value")
const rangeBubble = document.getElementById('range-bubble');
const rangeMin = document.getElementById('range-min')
const rangeMax = document.getElementById('range-max')
const headerInfo = document.getElementById('b-header__info')
const rangeWrapper = document.getElementById('range-wrapper')
const body = document.body;

const pipe = (value) => {
  return Math.ceil(value * 1.5)
}

const setPosition = (position) => {
  const width = countCustomers.offsetWidth
  const bubleWidth = rangeBubble.offsetWidth
  const sizeRangeThumb = (body.offsetWidth <= 450) ? 35 : 25;
  const elemWidth = rangeMin.offsetWidth
  const offsetThumb = sizeRangeThumb / 2 + (countCustomers.parentElement.offsetWidth > width ? elemWidth : 0)

  rangeBubble.style.marginLeft = (((width - sizeRangeThumb) * position) - bubleWidth/2 
    + offsetThumb ) + "px"

  rangeBubble.style.marginTop = (-rangeWrapper.offsetHeight - rangeBubble.offsetHeight - (body.offsetWidth <= 450 ? 16 : 4)) + "px"
}

const setValue = (value) => {
  if (value > maxValue) value = maxValue
  else if (value < 0) value = 0
  const result = pipe(value)
  countCustomersOutput.innerHTML = "$" + result
  rangeBubble.innerHTML = value
  setPosition((value - minValue) / (maxValue - minValue))
}

const changeInput = (event) => {
  return setValue(event.target.value)
}

const start = (value) => {
  countCustomers.value = value;
  setValue(value)
}

countCustomers.addEventListener('input', changeInput)

const loadImage = (src) => {
  const old = document.getElementById('b-header__image')
  if (!old) {
    const _img = document.createElement('img')
    _img.className = 'b-header__image'
    _img.id = 'b-header__image'
    const newImg = new Image;
    newImg.onload = function() {
        _img.src = this.src
    }
    newImg.src = src;
    headerInfo.appendChild(_img)
  }
  else {
    const newImg = new Image;
    newImg.onload = function() {
        old.src = this.src
    }
    newImg.src = src;
  }
}

document.addEventListener('DOMContentLoaded', () => {
  countCustomers.min = minValue
  countCustomers.max = maxValue

  rangeMin.innerHTML = minValue
  rangeMax.innerHTML = maxValue

  rangeBubble.style.display = "none"
  setTimeout(() => {
    rangeBubble.style.display = "block"
    onResize(100)()
  }, 600)
})

const onResize = (_value) => {
  const value = _value;
  return () => {
    const langElem = document.getElementById('lang')
    let lang = langElem ? langElem.value : ''
    lang = lang == 'en' ? '' : '-' + lang

    if (body.offsetWidth <= 600){
      loadImage(`/assets/img/main-phone-img${lang}.png`)
    } else {
      loadImage(`/assets/img/main-img${lang}.png`)
    }
    start(value || countCustomers.value)
  }
}


const validateEmail = (email) => {
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
}

const isValid = (data) => {
  return validateEmail(data.email)
}


let isEnter = false
const emailInput = document.getElementById('email_input')
const button = document.getElementById('send_email')
const buttonDone = document.getElementById('send_email_done')

const emailHandler = (event) => {
  const email = event.target.value
  isEnter = true

  if (isValid({ email })){
    button.disabled = false
    buttonDone.disabled = false
  } else {
    button.disabled = true
    buttonDone.disabled = true
  }
}

emailInput.addEventListener('change', emailHandler)
emailInput.addEventListener('keydown', emailHandler)

const send = () => {
  const value = document.getElementById('count-customers').value
  const email = document.getElementById('email_input').value
  const lang = document.getElementById('lang').value

  const res = { value: value, email: email, lang: lang }
  if (!isValid(res)) return;

  const xhr = new XMLHttpRequest();

  xhr.open('POST', '/email');
  xhr.setRequestHeader('Content-Type', 'application/json');
  xhr.onload = function() {
    if (xhr.status === 200) {
      button.classList.add('hide')
      buttonDone.className = buttonDone.className.replace(/hide/, '')
      setTimeout(() => { 
        button.style.display = 'none' 
        buttonDone.style.display = 'initial'
      }, 500)
    }
    else if (xhr.status !== 200) {
      buttonDone.classList.add('hide')
      button.className = button.className.replace(/hide/, '')
      setTimeout(() => { 
        buttonDone.style.display = 'none' 
        button.style.display = 'initial'
      }, 500)
    }
  };
  xhr.send(JSON.stringify(res));
}

document.getElementById('send_email').onclick = send
document.getElementById('send_email_done').onclick = send

window.onresize = onResize()