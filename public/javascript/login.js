let $username
let $pass

$(document).ready(function () {
  $username = $("#username")
  $pass = $("#pass")

  $username.focus()
})

function login() {
  if ($username.val() && $pass.val()) {
    $.ajax({
      url: '/login',
      type: "post",
      data: {username: $username.val(), pass: $pass.val()},
      success: (res) => {
        window.location.reload()
      },
      error: (err) => {
        console.error(err)
      }
    })
  }
  else {
    console.log('fields empty', $username.val(), $pass.val())
  }

  return false
}