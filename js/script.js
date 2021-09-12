//crea la variable members de tipo array y lo carga con el array de members del Json
const members=data.results[0].members;
//crea la variable states de tipo array de los estados de members sin repetidos
let states=[];
members.forEach(element => {
    if(!states.includes(element.state)){
        states.push(element.state);
    };
});
//ordeno alfabeticamente los elementos de states
states.sort();
//funcion que carga las opciones dentro del select
let optionS=document.querySelector("#states");
function optionSelect(states){
    optionS.innerHTML=`
        <option value="none" selected>States</option>
    `;
    //buscar en el json states el array dstates y reemplaza el codigo de states por el nombres
    //agrega como vulue el codigo
    //crea un array con todos los codigos de estado del json para controla si exite
    let statesJson=[];
    dstates.forEach(state => {
        statesJson.push(state.st);
    });
    states.forEach(element => {
        let stateName="";
        if(statesJson.includes(element)){
            stateName=dstates.filter(st=>st.st==element)[0].estado;
        }else{
            stateName=element;
        };
        optionS.innerHTML+=`
        <option value="${element}">${stateName}</option>
        `;
    });
};
optionSelect(states);
//dibuja la el cuerpo de la tabla en html con valores de un array
const tbody=document.querySelector(".tbody");
function crearTabla(array){
    //captura la el cuerpo de la tabla de html
    tbody.innerHTML="";
    let fullname="";
    array.forEach(element => {
        fullname=element.last_name+" "+element.first_name+" "+(element.middle_name||"");
        tbody.innerHTML+=`
        <tr>
            <td><a href="${element.url}">${fullname}</a></td>
            <td>${element.party}</td>
            <td>${element.state}</td>
            <td>${element.seniority}</td>
            <td>${element.votes_with_party_pct}</td>
        </tr>
        `;
    });
};
//function de filtrado de la tabla members
const checkBoxes=document.querySelectorAll(".partys");
function filtrarMembers(members){
    // obtinene la seleccion de los states
   const selectValue=optionS.value//document.querySelector("#states").value;
    let membersFiltro=members;
    
    checkBoxes.forEach(element => {
        if(!element.checked){
            membersFiltro=membersFiltro.filter(member=>member.party!=element.value);
        };
    });
    if(selectValue!="none"){
        membersFiltro=membersFiltro.filter(member=>member.state==selectValue);
    };
    console.log(membersFiltro.state);
    console.log(selectValue);
    return membersFiltro;
};
//detecta los cambios en el formulario y aplica los filtros si los hay
const form=document.querySelector("#form");
crearTabla(members);
form.addEventListener("change",(event)=>{
    crearTabla(filtrarMembers(members));
});