//aqui va a estar el codigo de usuarios.model.js

function init(){
    $("#frm_proveedor").on("submit", function(e){
        guardaryeditar(e);
    });
}


$().ready(()=>{
    todos();
});

var todos = () =>{
    var html = "";
    $.get("../../Controllers/proveedor.controller.php?op=todos", (res) => {
      res = JSON.parse(res);
      $.each(res, (index, valor) => {
       
        html += `<tr>
                <td>${index + 1}</td>
                <td>${valor.nomPro}</td>
                <td>${valor.contacto}</td>
                <td>${valor.telefono}</td>
                <td>${valor.direccion}</td>
            <td>
            <button class='btn btn-success' onclick='editar(${
              valor.codproveedor
            })'>Editar</button>
            <button class='btn btn-danger' onclick='eliminar(${
              valor.codproveedor
            })'>Eliminar</button>
            <button class='btn btn-info' onclick='ver(${
              valor.codproveedor
            })'>Ver</button>
            </td></tr>
                `;
      });
      $("#tabla_proveedor").html(html);
    });
  };

  var guardaryeditar=(e)=>{
    e.preventDefault();
    var dato = new FormData($("#frm_proveedor")[0]);
    var ruta = '';
    var codproveedor = document.getElementById("codproveedor").value
    if(codproveedor > 0){
     ruta = "../../Controllers/proveedor.controller.php?op=actualizar"
    }else{
        ruta = "../../Controllers/proveedor.controller.php?op=insertar"
    }
    $.ajax({
        url: ruta,
        type: "POST",
        data: dato,
        contentType: false,
        processData: false,
        success: function (res) {
          res = JSON.parse(res);
          if (res == "ok") {
            Swal.fire("proveedor", "Registrado con éxito" , "success");
            todos();
            limpia_Cajas();
          } else {
            Swal.fire("usuarios", "Error al guardo, intente mas rtarde", "error");
          }
        },
      });
  }

  var editar = (codproveedor)=>{
  
    $.post(
      "../../Controllers/proveedor.controller.php?op=uno",
      { codproveedor: codproveedor },
      (res) => {
        res = JSON.parse(res);
        $("#codproveedor").val(res.codproveedor);
        $("#nomPro").val(res.nomPro);
        $("#contacto").val(res.contacto);
        $("#telefono").val(res.telefono);
        $("#direccion").val(res.direccion);
    
      }
    );
    $("#Modal_proveedor").modal("show");
  }


  var eliminar = (codproveedor)=>{
    Swal.fire({
        title: "proveedores",
        text: "Esta seguro de eliminar el proveedor",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#d33",
        cancelButtonColor: "#3085d6",
        confirmButtonText: "Eliminar",
      }).then((result) => {
        if (result.isConfirmed) {
          $.post(
            "../../Controllers/proveedor.controller.php?op=eliminar",
            { codproveedor: codproveedor },
            (res) => {
              res = JSON.parse(res);
              if (res === "ok") {
                Swal.fire("proveedores", "proveedor Eliminado", "success");
                todos();
              } else {
                Swal.fire("Error", res, "error");
              }
            }
          );
        }
      });
  
      limpia_Cajas();
}
  
  var limpia_Cajas = ()=>{
    document.getElementById("nomPro").value = "";
    document.getElementById("contacto").value = "";
    document.getElementById("telefono").value = "";
    document.getElementById("direccion").value = "";
    $("#Modal_proveedor").modal("hide");
  
  }
  init();