let $username
let $pass
let $pass2

$(document).ready(function () {
  $username = $("#username")
  $pass = $("#pass")
  $pass2 = $("#pass2")
  $username.focus()
})

function signup() {
  if (($pass.val() === $pass2.val()) && $username.val() && $pass.val()) {
    let username = $username.val()
    let pass = $pass.val()
    console.log(username, pass)
    postp('/signup', {username: username, pass: pass})
        .then((res) => {
          window.location.href = '/'
        })
        .catch((err) => {
          console.error(err)
        })
  }
  else {
    console.error("missing fields or passwords aren't the same")
  }

  return false
}