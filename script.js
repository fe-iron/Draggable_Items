const draggables = document.querySelectorAll(".draggable")
const containers = document.querySelectorAll(".container")


//for tracking dragging start and dragging end
draggables.forEach(draggable => {
    draggable.addEventListener('dragstart', () => {
        draggable.classList.add('dragging');
    })
    draggable.addEventListener('dragend', () => {
        draggable.classList.remove('dragging');
    })
})

//container tracking and placing draggable elements
containers.forEach(container => {
    container.addEventListener('dragover', e => {
        e.preventDefault()
        const afterElement = getDragAfterElement(container, e.clientY)

        const draggable = document.querySelector('.dragging');
        if(afterElement == null){
            container.appendChild(draggable)
        } else {
            container.insertBefore(draggable, afterElement);
        }

    })
})


//for getting closets elements of the container
function getDragAfterElement(container, y){
    const draggableElements = [...container.querySelectorAll('.draggable:not(.dragging')]

    return draggableElements.reduce((closet, child) => {
        const box = child.getBoundingClientRect()
        const offset = y - box.top - box.height / 2;

        if(offset < 0 && offset > closet.offset){
            return {offset: offset, element: child}
        } else {
            return closet;
        }
    }, {offset: Number.NEGATIVE_INFINITY}).element

}