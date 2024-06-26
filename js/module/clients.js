//6. Devuelve un listado con el nombre de los todos los clientes españoles.

export const getClientsFromSpain = async()=>{
    let res = await fetch("http://localhost:5501/clients?country=Spain")
    let data = await res.json();
    let dataUpdate = [];
    data.forEach(val => {
        dataUpdate.push({
            nombre: val.client_name,
            nacionalidad: val.country,
            codigo:val.code_employee_sales_manager,
            ciudad: val.city
        })
    });
    return dataUpdate;
}

//16.Devuelve un listado con todos los clientes que sean de la ciudad de `Madrid` y cuyo representante de ventas tenga el código de empleado `11` o `30`.
export const getAllClientsMadrid1130 = async ()=>{
    let res= await fetch("http://localhost:5501/clients?city=Madrid")
    let data= await res.json();
    let dataUpdate=[];
    data.forEach(val=>{
        if(val.code_employee_sales_manager=="11"|| val.code_employee_sales_manager=="30"){
            dataUpdate.push({
                ...val
            })
        }

    });
    return dataUpdate
}


//multitabla
/*1. Obtén un listado con el nombre de cada cliente y el nombre y apellido de su representante de ventas.
--solucion 1.1(employees), 1.2 (clients)*/

import {getAllNameRepresentSales} from "./employees.js"
export const getAllClientsAndRepresentSales= async()=>{
    let res =await fetch("http://localhost:5501/clients")
    let dataClients=await res.json();
    let dataManager= await getAllNameRepresentSales();
    let dataUpdate=[];

    dataClients.forEach(val=>{
        dataManager.forEach(dat=>{
            if(val.code_employee_sales_manager == dat.codigo){
                dataUpdate.push({
                    codigo_cliente:val.client_code,
                    nombre_cliente: val.client_name,
                    nombre_representate: dat.nombre,
                    apellido_representante: dat.apellidos,
                    codigo_representante_ventas: dat.codigo,

                    codigo_oficina: dat.code_office

                });
            };
        });
    });
            return dataUpdate
    }


//2. Muestra el nombre de los clientes que hayan realizado pagos junto con el nombre de sus representantes de ventas.

import {getAllPayments} from "./payments.js"
// import {getAllNameRepresentSales} from "./employees.js"
export const getAllClientsAndRepresentSalesPayments= async()=>{
    let res =await fetch("http://localhost:5501/clients")
    let dataClients=await res.json();
    let dataManager= await getAllNameRepresentSales();
    let date_payments= await getAllPayments()
    let dataUpdate=new Set();
    

    dataClients.forEach(val=>{
        dataManager.forEach(dat=>{
            date_payments.forEach(dato=>{
                if(val.code_employee_sales_manager == dat.codigo && val.client_code == dato.codigo_cliente){
                    dataUpdate.add(JSON.stringify({
                        codigo_pago_cliente: dato.codigo_cliente,
                        nombre_cliente: val.client_name,
                        nombre_representate: dat.nombre,
                        apellido_representante: dat.apellidos,
                        codigo_representante_ventas: dat.codigo,
                        tipo_pago:dato.tipo_pago,
                        codigo_oficina: dat.codigo_oficina

                    }));
                }
        
            })
            })
        });
    
            return Array.from(dataUpdate).map(element => JSON.parse(element))
    }

//multitabla
//3. Muestra el nombre de los clientes que **no** hayan realizado pagos junto con el nombre de sus representantes de ventas.
    //

    // import {getAllPayments} from "./payments.js"// NO LA USO PORQUE ESTA ARRIBA
    // import {getAllNameRepresentSales} from "./employees.js"
    export const getAllClientsAndRepresentSalesNotPayments= async()=>{
        let dataClients = await getAllClientsAndRepresentSales();
        let datapayment =await getAllPayments()
        let dataUpdate=[];
        for ( let client of dataClients ){
            let pago_encontrado = false
            for ( let pay of datapayment){
                if( pay.codigo_cliente == client.codigo_cliente ){
                    pago_encontrado = true
                }


            }
            if(!pago_encontrado){
                dataUpdate.push( client)
            }            
        }
        return dataUpdate
    }
        //multitabla
    //4. Devuelve el nombre de los clientes que han hecho pagos y el nombre de sus representantes junto con la ciudad de la oficina a la que pertenece el representante.
    import {getAllOfficesCodeAndCity} from  "./offices.js"
    export const getAllClientsAndRepresentSalesandofficeAndPay= async()=>{  //le agrege andpay al final si sale mal algo quitarlo.
        let client_manager= await getAllClientsAndRepresentSalesPayments();
        let offices= await getAllOfficesCodeAndCity ();
        let dataUpdate=[];
        client_manager.forEach(val=>{
            offices.forEach(ofi=>{
                if(val.codigo_oficina== ofi.codigo){
                    dataUpdate.push({

                        nombre_cliente: val.nombre_cliente,
                        nombre_representate:val.nombre_representate,
                        ciudad_oficina_representante: ofi.ciudad
                    }
                    )

            }})
        })
        return dataUpdate
    }
 
    //multitabla
    //5. Devuelve el nombre de los clientes que **no** hayan hecho pagos y el nombre de sus representantes junto con la ciudad de la oficina a la que pertenece el representante.
//     export const getAllClientsAndRepresentSalesandofficeNotPay = async()=>{
//         let client_manager= await getAllClientsAndRepresentSalesNotPayments();
//         let offices= await getAllOfficesCodeAndCity ();
//         let dataUpdate=[];
//         // client_manager.forEach(val=>{
//         //     offices.forEach(ofi=>{
//         //         if(val.codigo_oficina== ofi.codigo){
//         //             dataUpdate.push(
//         //                 client
//         //             )

//         //     }})
//         // })
//         for (let client of client_manager){
//             for(let office of offices){
//                 if(client.code_employee_sales_manager==office.code_office){
//                     dataUpdate.push({
//                         nombre_cliente: client.nombre_cliente,
//                         nombre_representate: client.nombre_representate,
//                         ciudad_oficina: office.ciudad

//                     })
//             }
//         }
//     }
//     return dataUpdate
// }
export const getAllClientsAndRepresentSalesandofficeNotPay = async () => {
    let client_manager = await getAllClientsAndRepresentSalesNotPayments();
    let offices = await getAllOfficesCodeAndCity();
    let dataUpdate = [];
    let seenClients = new Set(); // Utilizamos un conjunto para registrar los clientes vistos

    for (let client of client_manager) {
        for (let office of offices) {
            if (client.code_employee_sales_manager === office.code_office) {
                // Verificamos si el cliente ya ha sido agregado
                const clientKey = `${client.nombre_cliente}-${client.nombre_representate}`;
                if (!seenClients.has(clientKey)) {
                    dataUpdate.push({
                        nombre_cliente: client.nombre_cliente,
                        nombre_representate: client.nombre_representate,
                        ciudad_oficina: office.ciudad
                    });
                    seenClients.add(clientKey); // Agregamos el cliente al conjunto de clientes vistos
                }
            }
        }
    }
    return dataUpdate;
}


// 7. Devuelve el nombre de los clientes y el nombre de sus representantes junto con la ciudad de la oficina a la que pertenece el representante.
// 7. Devuelve el nombre de los clientes y el nombre de sus representantes junto con la ciudad de la oficina a la que pertenece el representante.
//revisar 
export const getAllClientsAndRepresentSalesOffices = async() => {
    let client_manager = await getAllClientsAndRepresentSales();
    let office = await getAllOfficesCodeAndCity();
    let dataUpdate=[];
    client_manager.forEach(val=>{
        office.forEach(dat=>{
            // if(val.codigo_oficina == dat.codigo){


                dataUpdate.push({
                    nombre_cliente: val.nombre_cliente,
                    nombre_representate:val.nombre_representate,
                    ciudad_oficina_representante: dat.ciudad
                })
            // }
        })
        // office.forEach(ofi=>{
        //     if(val.codigo_oficina== ofi.codigo){
        //         dataUpdate.push({

        //             nombre_cliente: val.codigo_cliente,
        //             nombre_representate:val.nombre_representate,
        //             ciudad_oficina_representante: ofi.ciudad
        //         }
        //         )

        // }})
    })
    
    return dataUpdate


}

//CREAMOS ESTA FUNCION PARA OBTENER EL TOTAL DE LOS CLIENTES Y USARLOEN EL EJERCICIO 10 DE MULTITABLAS.
export const getAllClients = async ()=>{
    let res =await fetch("http://localhost:5501/clients")
    let data=await res.json();
    let dataUpdate = [];
    let clientCodes = new Set();
    // data.forEach(val => {
    //     dataUpdate.push({
    //         codigo: val.client_code,
    //         nombre: val.client_name,
    //         nacionalidad: val.country,
    //         codigo:val.code_employee_sales_manager,
    //         ciudad: val.city
    //     })
    // });
    data.forEach(val => {
        // Verificamos si el código de cliente ya ha sido procesado anteriormente
        if (!clientCodes.has(val.client_code)) {
            // Si no ha sido procesado, lo agregamos al Set y a la lista de datos actualizados
            clientCodes.add(val.client_code);
            dataUpdate.push({
                codigo_cliente: val.client_code,
                nombre_cliente: val.client_name,
                nacionalidad: val.country,
                ciudad: val.city
            });
        }
    });
    return dataUpdate;
}










//MIRAR ARRIBA ESTA LA PARTE DE LOS CLIENTES FULL
// 10. Devuelve el nombre de los clientes a los que no se les ha entregado a tiempo un pedido.
import {getAllCodeRequestLate} from "./requests.js"
export const getAllClientsWithLateRequests = async() => {
    
    let dataLateRequests = await getAllCodeRequestLate()
    let dataClients = await getAllClients()
    let dataUpdate = new Set()

    for (let lateRequest of dataLateRequests) {
        for (let client of dataClients) {
            if (client.codigo_cliente == lateRequest.Codigo_cliente) {
                dataUpdate.add(JSON.stringify(
                    client.nombre_cliente
                ))
            }
        }
    }

    dataUpdate = Array.from(dataUpdate).map(element => JSON.parse(element))
    return dataUpdate
}



// Consultas multitabla (Composición externa)
// 1.Devuelve un listado que muestre solamente los clientes que no han realizado ningún pago.

export const getAllClientsNotPay = async () => {
    let dataClients = await getAllClients()
    let dataPayments = await getAllPayments()
    let dataUpdate = []
    let seenClients = new Set() // Utilizamos un conjunto para registrar los clientes vistos
    for (let client of dataClients) {
        for (let payment of dataPayments) {
            if (client.codigo_cliente == payment.codigo_cliente) {
                // Verificamos si el cliente ya ha sido agregado
                const clientKey = `${client.nombre_cliente}-${client.codigo_cliente}`;
                if (!seenClients.has(clientKey)) {
                    dataUpdate.push({
                        codigo_cliente: client.codigo_cliente,
                        nombre_cliente: client.nombre_cliente,
                        nacionalidad: client.nacionalidad,
                        ciudad: client.ciudad
                    });
                    seenClients.add(clientKey); // Agregamos el cliente al conjunto de clientes vistos
                }
            }
        }
        return dataUpdate
    
}}


// 2.Devuelve un listado que muestre solamente los clientes que no han realizado ningún pedido.
import {getAllRequests} from "./requests.js"
export const getAllClientsNotRequest =async ()=>{
    let dataClients = await getAllClients()
    let dataRequests = await getAllRequests()
    let dataUpdate = []
    let seenClients = new Set() // Utilizamos un conjunto para registrar los clientes vistos
    for (let client of dataClients) {
        for (let request of dataRequests) {
            if (client.codigo_cliente == request.codigo_cliente) {
                // Verificamos si el cliente ya ha sido agregado
                const clientKey = `${client.nombre_cliente}-${client.codigo_cliente}`;
                if (!seenClients.has(clientKey)) {
                    dataUpdate.push({
                        codigo_cliente: client.codigo_cliente,
                        nombre_cliente: client.nombre_cliente,
                        nacionalidad: client.nacionalidad,
                        ciudad: client.ciudad
                    });
                    seenClients.add(clientKey); // Agregamos el cliente al conjunto de clientes vistos
                }
            }
        }
    }
    return dataUpdate
}


//3.Devuelve un listado que muestre los clientes que no han realizado ningún pago y los que no han realizado ningún pedido.
export const getAllClientsNotRequestsAndPay = async ()=>{


    let dataClients = await getAllClients();
    let dataPayments = await getAllPayments();
    let dataRequests = await getAllRequests();
    let dataUpdate = [];
    let seenClients = new Set(); // Utilizamos un conjunto para registrar los clientes vistos.
    
    for (let client of dataClients) {
        let hasPayment = false;
        let hasRequest = false;
    
        // Verificar si el cliente tiene pagos
        for (let payment of dataPayments) {
            if (client.codigo_cliente === payment.codigo_cliente) {
                hasPayment = true;
                break; // No es necesario seguir buscando más pagos para este cliente
            }
        }
    
        // Verificar si el cliente tiene solicitudes
        for (let request of dataRequests) {
            if (client.codigo_cliente === request.codigo_cliente) {
                hasRequest = true;
                break; // No es necesario seguir buscando más solicitudes para este cliente
            }
        }
    
        // Si el cliente no tiene ni pagos ni solicitudes, se agrega a dataUpdate
        if (!hasPayment && !hasRequest) {
            const clientKey = `${client.nombre_cliente}-${client.codigo_cliente}`;
            if (!seenClients.has(clientKey)) {
                dataUpdate.push({
                    codigo_cliente: client.codigo_cliente,
                    nombre_cliente: client.nombre_cliente,
                    nacionalidad: client.nacionalidad,
                    ciudad: client.ciudad
                });
                seenClients.add(clientKey); // Agregamos el cliente al conjunto de clientes vistos
            }
        }
    }
    return dataUpdate
    
    // dataUpdate ahora contiene la lista de clientes que no han realizado ni pagos ni solicitudes.
}



// 6.Devuelve un listado que muestre solamente los empleados que no tienen un cliente asociado junto con los datos de la oficina donde trabajan.
import {getAllEmployees} from "./employees.js"
export const getAllEmployeesWithoutClientAndOffice =async ()=>{
    let dataEmployees = await getAllEmployees();
    let dataClients = await getAllClients();
    let dataUpdate = [];
    let seenEmployees = new Set(); // Utilizamos un conjunto para registrar los empleados vistos
    
    for (let employee of dataEmployees) {
        let hasAssociatedClient = false;
    
        // Verificar si el empleado tiene algún cliente asociado
        for (let client of dataClients) {
            if (employee.codigo_empleado === client.codigo) {
                hasAssociatedClient = true;
                break; // No es necesario seguir buscando más clientes para este empleado
            }
        }
    
        // Si el empleado no tiene ningún cliente asociado, se agrega a dataUpdate
        if (!hasAssociatedClient) {
            const employeeKey = `${employee.nombre}-${employee.codigo_empleado}`;
            if (!seenEmployees.has(employeeKey)) {
                dataUpdate.push({
                    codigo_empleado: employee.codigo_empleado,
                    nombre: employee.nombre,
                    codigo_oficina: employee.codigo_oficina
                });
                seenEmployees.add(employeeKey); // Agregamos el empleado al conjunto de empleados vistos
            }
        }
    }
    
    return dataUpdate;
}


// 7.Devuelve un listado que muestre los empleados que no tienen una oficina asociada y los que no tienen un cliente asociado.
export const getAllEmployeesNotOfficesAndNotClients = async ()=> {

    let dataEmployees = await getAllEmployees();
    let dataClients = await getAllClients();
    let dataOffices = await getAllOfficesCodeAndCity();
    let dataUpdate = [];
    let seenEmployees = new Set(); // Utilizamos un conjunto para registrar los empleados vistos
    
    for (let employee of dataEmployees) {
        let hasAssociatedClient = false;
        let hasAssociatedOffice = false;
    
        // Verificar si el empleado tiene algún cliente asociado
        for (let client of dataClients) {
            if (employee.codigo_empleado === client.codigo) {
                hasAssociatedClient = true;
                break; // No es necesario seguir buscando más clientes para este empleado
            }
        }
    
        // Verificar si el empleado tiene alguna oficina asociada
        for (let office of dataOffices) {
            if (employee.codigo_oficina === office.codigo_oficina) {
                hasAssociatedOffice = true;
                break; // No es necesario seguir buscando más oficinas para este empleado
            }
        }
    
        // Si el empleado no tiene ni cliente asociado ni oficina asociada, se agrega a dataUpdate
        if (!hasAssociatedClient || !hasAssociatedOffice) {
            const employeeKey = `${employee.nombre}-${employee.codigo_empleado}`;
            if (!seenEmployees.has(employeeKey)) {
                dataUpdate.push({
                    codigo_empleado: employee.codigo_empleado,
                    nombre: employee.nombre,
                    codigo_oficina: employee.codigo_oficina
                });
                seenEmployees.add(employeeKey); // Agregamos el empleado al conjunto de empleados vistos
            }
        }
    }
    
    return dataUpdate;
}


// 11.Devuelve un listado con los clientes que han realizado algún pedido pero no han realizado ningún pago.
//revisar lo que imprime




export const getAllClientsAndRequestsNotPay =async ()=>{
    let dataClients = await getAllClients();
    let dataPayments = await getAllPayments();
    let dataRequests = await getAllRequests();
    let dataUpdate = [];
    let seenClients = new Set(); // Utilizamos un conjunto para registrar los clientes vistos.
    
    for (let client of dataClients) {
        let hasPayment = false;
        let hasRequest = false;
        
        // Verificar si el cliente tiene pagos
        for (let payment of dataPayments) {
            if (client.codigo_cliente === payment.codigo_cliente) {
                hasPayment = true;
                break; // No es necesario seguir buscando más pagos para este cliente
            }
        }
        
        // Verificar si el cliente tiene solicitudes
        for (let request of dataRequests) {
            if (client.codigo_cliente === request.codigo_cliente) {
                hasRequest = true;
                break; // No es necesario seguir buscando más solicitudes para este cliente
            }
        }
        
        // Si el cliente tiene solicitudes pero no pagos, se agrega a dataUpdate
        if (hasRequest && !hasPayment) {
            const clientKey = `${client.nombre_cliente}-${client.codigo_cliente}`;
            if (!seenClients.has(clientKey)) {
                dataUpdate.push({
                    codigo_cliente: client.codigo_cliente,
                    nombre_cliente: client.nombre_cliente,
                    nacionalidad: client.nacionalidad,
                    ciudad: client.ciudad
                });
                seenClients.add(clientKey); // Agregamos el cliente al conjunto de clientes vistos
            }
        }
    }
    return dataUpdate
}