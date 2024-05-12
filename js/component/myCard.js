import{getAllOfficesCodeAndCity,getAllOfficesFromSpainCityAndMovil} from "../module/offices.js"
import {getAllEmployeesWithBossAndCodeSeven, getBossFullNameAndEmail,getAll}  from "../module/employees.js"
import {getClientsFromSpain} from "../module/clients.js"    
import {orderStatusList} from "../module/requests.js"
import {customerPaymentCode2008 } from "../module/payments.js"



export class Mycard extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: "open"});
        this.shadowRoot.innerHTML = /*html*/ `
            <link rel="stylesheet" href="../css/myCard.css">
        `
    }
    
    // // 1. Devuelve un listado con el código de oficina y la ciudad donde hay oficinas.

    async getAllOfficesCodeAndCityDesing() {
        let data = await getAllOfficesCodeAndCity()
        data.forEach(val => {
            this.shadowRoot.innerHTML += /*html*/ `
                <div class="report__card">
                    <div class="card__title">
                        <div>Codigo oficina y ciudad</div>
                    </div>
                    <div class="card__body">
                        <div class="body__marck">
                        <p><b>Codigo: </b>${val.codigo}</p>
                        <p><b>Ciudad: </b>${val.ciudad}</p>
                        <p><b>direccion1: </b>${val.direccion1}</p>
                        <p><b>direccion2: </b>${val.direccion2}</p>

                        </div>
                    </div>
                </div>
            `
        })
    }

// 2. Devuelve un listado con la ciudad y el teléfono de las oficinas de España.
async getAllOfficesFromSpainCityAndMovilDesing() {
    let data = await getAllOfficesFromSpainCityAndMovil()
    data.forEach(val => {
        this.shadowRoot.innerHTML += /*html*/ `
            <div class="report__card">
                <div class="card__title">
                    <div>Ciudad y telefono oficina españa</div>
                </div>
                <div class="card__body">
                    <div class="body__marck">
                    <p><b>Ciudad: </b>${val.ciudad}</p>
                    <p><b>Telefono: </b>${val.telefono}</p>
                   
                  

                    </div>
                </div>
            </div>
        `
    })
}


    //// 3. Devuelve un listado con el nombre, apellidos y email de los empleados cuyo jefe 
// tiene un código de jefe igual a 7.
    async getAllEmployeesWithBossAndCodeSevenDesing() {
        let data = await getAllEmployeesWithBossAndCodeSeven()
        data.forEach(val => {
            this.shadowRoot.innerHTML += /*html*/ `
                <div class="report__card">
                    <div class="card__title">
                        <div>Nombre empleados y email jefe 7</div>
                    </div>
                    <div class="card__body">
                        <div class="body__marck">
                        <p><b>Nombre: </b>${val.nombre}</p>
                        <p><b>Apellidos: </b>${val.apellidos}</p>
                        <p><b>Email: </b>${val.email}</p>
                      

                        </div>
                    </div>
                </div>
            `
        })
    }
    // 4. Devuelve el nombre del puesto, nombre, apellidos y email del jefe de la empresa.
    async getBossFullNameAndEmailDesing() {
        let data = await getBossFullNameAndEmail()
        // data.forEach(val => {
            this.shadowRoot.innerHTML += /*html*/ `
                <div class="report__card">
                    <div class="card__title">
                        <div>Nombre jefe mas puesto de la empresa</div>
                    </div>
                    <div class="card__body">
                        <div class="body__marck">
                       <p><b>Puesto: </b>${data.puesto}</p>
                         <p><b>Nombre: </b>${data.nombre}</p>
                         <p><b>Apellidos: </b>${data.apellidos}</p>
                        <p><b>Email: </b>${data.email}</p>
                      

                        </div>
                    </div>
                </div>
            `
        // })
    }

    // 5. Devuelve un listado con el nombre, apellidos y puesto de aquellos empleados que no sean representantes de ventas.

    async getAllDesing() {
        let data = await getAll()
        data.forEach(val => {
            this.shadowRoot.innerHTML += /*html*/ `
                <div class="report__card">
                    <div class="card__title">
                        <div>Empleados que no son representantes de ventas</div>
                    </div>
                    <div class="card__body">
                        <div class="body__marck">
                        <p><b>Nombre_empleado: </b>${val.nombre}</p>
                         <p><b>Apellidos: </b>${val.apellidos}</p>
                         <p><b>Puesto: </b>${val.puesto}</p>
                      

                        </div>
                    </div>
                </div>
            `
        })
    }
    // 6. Devuelve un listado con el nombre de los todos los clientes españoles.
    async getClientsFromSpainDesing() {
        let data = await getClientsFromSpain()
        data.forEach(val => {
            this.shadowRoot.innerHTML += /*html*/ `
                <div class="report__card">
                    <div class="card__title">
                        <div>Clientes españoles</div>
                    </div>
                    <div class="card__body">
                        <div class="body__marck">
                       <p><b>Nombre_Clientes: </b>${val.nombre}</p>
                         <p><b>Nacionalidad: </b>${val.nacionalidad}</p>
                      

                        </div>
                    </div>
                </div>
            `
        })
    }

    // 7. Devuelve un listado con los distintos estados por los que puede pasar un pedido.

    async orderStatusListDesing() {
        let data = await orderStatusList()
        data.forEach(val => {
            this.shadowRoot.innerHTML += /*html*/ `
                <div class="report__card">
                    <div class="card__title">
                        <div>Estados pedidos</div>
                    </div>
                    <div class="card__body">
                        <div class="body__marck">
                        <p><b>Nombre_estados: </b>${val}</p>
                      

                        </div>
                    </div>
                </div>
            `
        })
    }

    // 8. Devuelve un listado con el código de cliente de aquellos clientes que realizaron algún pago en 2008. Tenga en cuenta que deberá eliminar aquellos códigos de cliente que aparezcan repetidos. Resuelva la consulta:
    async customerPaymentCode2008Desing() {
        let data = await customerPaymentCode2008()
        data.forEach(payment => {
            this.shadowRoot.innerHTML += /*html*/ `
                <div class="report__card">
                    <div class="card__title">
                        <div>Estados pedidos</div>
                    </div>
                    <div class="card__body">
                        <div class="body__marck">
                       <p><b>Codigo_cliente: </b>${payment}</p>

                      

                        </div>
                    </div>
                </div>
            `
        })
    }

























static get observedAttributes() {
        return ["logic"];
    }
    attributeChangedCallback(name, old, now) {
        if(name=="logic" && now=="office_1") this.getAllOfficesCodeAndCityDesing() //1
        if(name=="logic" && now=="office_2") this.getAllOfficesFromSpainCityAndMovilDesing() //2
        if(name=="logic" && now=="employe_1") this.getAllEmployeesWithBossAndCodeSevenDesing()//3
        if(name=="logic" && now=="employe_2") this.getBossFullNameAndEmailDesing() //4
        if(name=="logic" && now=="employe_3") this.getAllDesing() //5
        if(name=="logic" && now=="client_1") this.getClientsFromSpainDesing() //6
        if(name=="logic" && now=="request_1") this.orderStatusListDesing() //7
        if(name=="logic" && now=="payment_1") this.customerPaymentCode2008Desing() //8
        // if(name=="logic" && now=="employe_3") this.getAllDesing() //5
        // if(name=="logic" && now=="employe_3") this.getAllDesing() //5
        // if(name=="logic" && now=="employe_3") this.getAllDesing() //5
        // if(name=="logic" && now=="employe_3") this.getAllDesing() //5
        // if(name=="logic" && now=="employe_3") this.getAllDesing() //5
        // if(name=="logic" && now=="employe_3") this.getAllDesing() //5
        // if(name=="logic" && now=="employe_3") this.getAllDesing() //5
        // if(name=="logic" && now=="employe_3") this.getAllDesing() //5

        
    
    
    
    
    
    
    }}