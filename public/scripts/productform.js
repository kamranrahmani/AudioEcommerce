let item = 0;

const openModalBtn = document.getElementById('additem');
const backdrop = document.getElementById('backdrop');
const itemDetailsForm = document.getElementById('itemDetails');
const addItemBtn = document.getElementById('add');
const cancelBtn = document.getElementById('cancel');



openModalBtn.addEventListener('click',openItemModal);
addItemBtn.addEventListener('click', addItem);


function openItemModal(event){
    backdrop.classList.remove('hidden');
    itemDetailsForm.classList.remove('hidden');
}

function addItem(event){

    event.preventDefault();
    let itemName = document.getElementById('itemname');
    let itemquantity = document.getElementById('itemquant');
    if(itemName.value.trim().length == 0 || itemquantity.value.trim().length == 0){
        alert('you should enter a valid value for the input');
        return
    }
    
    let template = `
        <input type="text" name="items[${item}][title]" class="bg-item-Bg px-2 py-1 max-w-fit border-2 focus:outline-0" value="${itemName.value}">
        <input type="text" name="items[${item}][quant]" class="bg-item-Bg px-2 py-1 max-w-fit border-2 focus:outline-0" value="${itemquantity.value}">
        `

    const addedItem = document.createElement('div');
    addedItem.classList.add('flex', 'flex-row', 'space-x-4','mb-4');
    addedItem.innerHTML = template;
    document.getElementById('items').appendChild(addedItem);
    item++;
    itemName.value = '';
    itemquantity.value = '';
    itemDetailsForm.classList.add('hidden');
    backdrop.classList.add('hidden')
}











