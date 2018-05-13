 window.onload = () => {
     typingCarousel()
     d = new Date();
     var hour = d.getHours() < 10 ? '0' + d.getHours() : d.getHours()
     var minutes = d.getMinutes() < 10 ? '0' + d.getMinutes() : d.getMinutes()
     document.querySelectorAll("header .message .item").forEach(function(node) {
         node.innerHTML = hour + ':' + minutes;
     });
 };