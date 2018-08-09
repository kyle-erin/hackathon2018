let $text
let $list
let socket
let itemHtml = '<li class="group-list-item"><button class="btn btn-primary" ><i class="fas fa-trash"></i></button></li>'

$(document).ready(function () {
  $text = $("#text")
  $list = $("#list")
  $text.focus()
  $text.val('')

  $text.click(function(){
    $(this).select()
  })


  $text.keydown(function (e) {
    if (e.keyCode === 13) {
      add()
    }
  })


  socket = io()
  // socket.emit('chat message', 10)
})

function add() {
  if($text.val()){
    console.log('adding...')
    socket.emit('add', $text.val())
    let $item = $("<li class='list-group-item'></li>")
    let $btn = $("<a class='btn btn-default float-right'><i class='fas fa-trash'></i></a>")
    $item.append($text.val())
    $item.append($btn)

    $list.append($item)

    $text.val('')

    // Scroll down to see the item, if there's a scroll
    let height = document.querySelector('#list').scrollHeight
    console.log(height)
    $list[0].scrollTo(0, height)
    // window.scrollTo(0, )
  }
  else {
    console.error("Input field can't be empty")
  }
}