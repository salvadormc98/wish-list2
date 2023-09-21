import { LitElement,css, html } from 'lit';
export class WishListComponent extends LitElement {

  static get styles(){
    return css `
    .main-container {
      margin: 50px auto;
      width: 500px;
      border-radius: 5px;
      border: 2px solid black;
      justify-content: center;
      max-height: 600px;
      overflow: scroll;
    }
    .title {
      text-align: center;
      color: #1500EC;
    }
    .input-text{
      width: 300px;
      
    }
    .task-container {
      justify-content: start;
      display: flex;
      align-items: center;
      
    }
    .item{
    margin-left: 20px;
    cursor: pointer;
    width: 25px;
    height: 25px;
    text-align: start;
    }
      
      .btn-delete{
        width: 200px;
        height: 35px;
        background-color: #FEC500 ;
        border-radius: 10px;
        cursor: pointer;

      }
      .btn-delete:hover{
        background-color: #FFE17B;
      }
      .btn-delete:active{
        box-shadow: 0 2px #666;
        transform: translateY(4px);
      }
      .btn-container{
        padding:20px;
        text-align: right;
      }

      .label{
        transition: background-color 1s ease;
        font-size: 20px;
        width: 100%;
      }
      .item, .label{
        vertical-align: middle;
      }
    `;
  }

  static get properties(){
    return {
      miDato: {type: String},
      listaTareas : { type: Array}
    };
  }

  constructor(){
    super();
    this.miDato = ' ';
    this.listaTareas= [];
    this.timers = [];
  }

  render() {
    var listaTareasArr = [];
    this.listaTareas.forEach((tareas, index)=>{
      listaTareasArr.push(html`
      <input type="checkbox" class="item" id='cb_${this.miDato}' @change=${(event) => this.setTimer(event,index)}><label class="label" id="label">${tareas}</label><br>`);
        try {
          if(index === this.listaTareas.length -1){
            this.timers[index] = {
              timeout1: setTimeout(()=>{
                console.log('1');
                this.colors(index, 'GREEN');//ESCOJEMOS EL COLOR DEL LABEL
              },2000),//ESTE SON DOS SEGUNDOS PERO SE PUEDEN MODIFICAR EL VALOR
              timeout2: setTimeout(()=>{
                this.colors(index, 'YELLOW');
              },5000),
              timeout3: setTimeout(()=>{
                this.colors(index, 'RED');
              },8000)
            };
          }
        } catch (error) {
          alert('ha ocurrido un error!!!')
        }
      
    });
console.log(this.timers);

    return html`
    <div class="main-container">
      <h1 class="title">My wishlist</h1>
      
      <wishlist-input-component class="input-text" id="inputText" value=${this.miDato} placeholder="ingresa tu pene" @keydown="${this.inputKeyDown}"></wishlist-input-component>
       ----------------------------------------------------
      <div id="taskContainer">
        ${listaTareasArr}
      </div>
        <div class="btn-container">
      <button class="btn-delete" @click=${this.removeCheckBox}>Completado</button></div>

        </div>
      
    `;
  }

  inputKeyDown(e){
    if(e.key === 'Enter'){
      this.miDato = e.target.value;
      this.listaTareas.push(this.miDato);
      this.resetTexto(e);
    }
  }

  resetTexto(e){
    this.miDato = '';
    e.target.value = '';
  }
  setTimer(event, index) {
    
    const labels = this.shadowRoot.querySelectorAll('.item + label');
    const checkbox = event.target;

    if (!checkbox.checked) {
      labels[index].style.textDecoration = 'none';
    } else {
        labels[index].style.color = 'black';
        labels[index].style.textDecoration = 'line-through';
        labels[index].style.background = 'none';
        clearTimeout(this.timers[index].timeout1);
        clearTimeout(this.timers[index].timeout2);
        clearTimeout(this.timers[index].timeout3);
      
    }
  }
  colors(index, color) {
    try {
      const label = this.shadowRoot.querySelectorAll('.item + label');
    label[index].style.background = color;
    } catch (error) {
    }
    
}
  removeCheckBox(){
    this.listaTareas = [];
  }

}



