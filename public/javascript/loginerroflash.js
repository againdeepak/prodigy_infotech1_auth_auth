window.onload = function () {
    const flashMessage = document.getElementById('flashMessage');
    if (flashMessage) {
        flashMessage.classList.add('show'); // Add show class to trigger the animation
        setTimeout(function () {
            flashMessage.classList.remove('show'); // Remove show class to hide the message
           
        }, 2000); // Duration before hiding
    }
    setTimeout(()=>{
        flashMessage.style.display='none';
    },3000)
};