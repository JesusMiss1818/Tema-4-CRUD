var Filaseleccionada = null;
var productos = [];

refrescarpagina();
function onFormSubmit(e){
    event.preventDefault();
    if(validate()){
        var formData = readFormData();
        if(Filaseleccionada == null){
            insertNewRecord(formData);
        }
        else{
            updateRecord(formData);
        }
        resetForm();
        
    }
}

//Retrieve the data
function readFormData(){
    var formData = {};
    formData["CodigoProducto"] = document.getElementById("codigoproducto").value;
    formData["Producto"] = document.getElementById("producto").value;
    formData["Cantidad"] = document.getElementById("cantidad").value;
    formData["Precio"] = document.getElementById("precio").value;
    return formData;
}

//Insert the data
function insertNewRecord(data){
    var table = document.getElementById("ListaProducto").getElementsByTagName('tbody')[0];
    var newRow = table.insertRow(table.length);
    cell1 = newRow.insertCell(0);
    cell1.innerHTML = data.CodigoProducto;
    cell2 = newRow.insertCell(1);
    cell2.innerHTML = data.Producto;
    cell3 = newRow.insertCell(2);
    cell3.innerHTML = data.Cantidad;
    cell4 = newRow.insertCell(3);
    cell4.innerHTML = data.Precio;
    cell5 = newRow.insertCell(4);
    cell5.innerHTML = `<button onClick='onEdit(this)'>Editar</button>`
    cell5 = newRow.insertCell(5);
    cell5.innerHTML = `<button onClick='onDelete(this)'>Eliminar</button>`
    productos.push(data);
    localStorage.setItem("Productos",JSON.stringify(productos));
}

//Edit the data
function onEdit(td){
    Filaseleccionada = td.parentElement.parentElement;
    document.getElementById('codigoproducto').value = Filaseleccionada.cells[0].innerHTML;
    document.getElementById('producto').value = Filaseleccionada.cells[1].innerHTML;
    document.getElementById('cantidad').value = Filaseleccionada.cells[2].innerHTML;
    document.getElementById('precio').value = Filaseleccionada.cells[3].innerHTML;
}

function updateRecord(formData){
    Filaseleccionada.cells[0].innerHTML = formData.CodigoProducto;
    Filaseleccionada.cells[1].innerHTML = formData.Producto;
    Filaseleccionada.cells[2].innerHTML = formData.Cantidad;
    Filaseleccionada.cells[3].innerHTML = formData.Precio;
    productos = JSON.parse(localStorage.getItem("Productos"));
    productos.splice(Filaseleccionada.rowIndex-1,1,{CodigoProducto:formData.CodigoProducto,Producto:formData.Producto,Cantidad:formData.Cantidad,Precio:formData.Precio});
    localStorage.setItem("Productos",JSON.stringify(productos));
    Filaseleccionada = null;
}

//Delete the data
function onDelete(td){
    if(confirm('¿Desea eliminar este producto?')){
        row = td.parentElement.parentElement;
        productos = JSON.parse(localStorage.getItem("Productos"))
        productos.splice(row.rowIndex-1,1);
        localStorage.setItem("Productos",JSON.stringify(productos))
        document.getElementById('ListaProducto').deleteRow(row.rowIndex);
    }
    resetForm();
}

//Reset the data
function resetForm(){
    document.getElementById('codigoproducto').value = '';
    document.getElementById('producto').value = '';
    document.getElementById('cantidad').value = '';
    document.getElementById('precio').value = '';
    Filaseleccionada = null;
}

function validate(){
    isValid = true;
    if(document.getElementById("producto").value == ""){
        isValid = false;
        document.getElementById("productovalidacion").classList.remove("hide");
    }
    else{
        isValid =true;
        if(!document.getElementById("productovalidacion").classList.contains("hide")){
            document.getElementById("productovalidacion").classList.add("hide");
        }
    }
    return isValid;
}

function refrescarpagina(){
    if(localStorage.getItem("Productos")===null){
        console.log("No hay nada en la base de datos")
    }
    else{
        productos = JSON.parse(localStorage.getItem("Productos"));
        document.getElementById("tbody").innerHTML="";
        for (let index = 0; index < productos.length; index++) {
            let Codigoproducto = productos[index].CodigoProducto;
            let producto = productos[index].Producto;
            let cantidad = productos[index].Cantidad;
            let precio = productos[index].Precio;

            document.getElementById("tbody").innerHTML +=
            `<tr>
                <td>${Codigoproducto}</td>
                <td>${producto}</td>
                <td>${cantidad}</td>
                <td>${precio}</td>
                <td><button onClick="onEdit(this)">Editar</button></td>
                <td><button onclick="onDelete(this)">Eliminar</button></td>
            </tr>
            `

        }
    }  
}