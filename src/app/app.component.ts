import { Component, OnInit, Inject, ElementRef, ViewChild, DoCheck } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, DoCheck{
  @ViewChild('myCanvas') canvasRef!: ElementRef 



  public Dificulty={
    Easy : 1,
    Normal : 2,
    Hard : 3,
  }

  width: any;
  height: any;
  shapedimension: any;
  shapes: any;
  dificultyPopup: boolean = true;
  oldDificulty: any;
  currentDificulty: any;
  flagCount: any;
  mine: any;

  
  

  ngOnInit(): void {
      
  }
  ngDoCheck(): void {
    if(this.width != null && this.height != null && this.oldDificulty != this.currentDificulty ){
      this.oldDificulty = this.currentDificulty;
      this.drawBoard();
    }
}



  selectDificulty(data: any){
    if(data == this.Dificulty.Easy){ // 10x10 board
      this.width = 700;
      this.height = 700;
      this.shapedimension = 70;
      this.flagCount = 10;
      this.mine = 10;
    }
    else if(data == this.Dificulty.Normal){  // 20 x 16 board
      this.width = 1000;
      this.height = 800;
      this.shapedimension = 50;
      this.flagCount = 20;
      this.mine = 50;
    }
    else if(data == this.Dificulty.Hard){ // 30 x 24 board
      this.width = 1200;
      this.height = 640;
      this.shapedimension = 40;
      this.flagCount = 50;
      this.mine = 99;
    }
    this.currentDificulty = data;
    this.dificultyPopup = false;
  }

  drawBoard(){
    const cw = Math.fround(this.width );
    const ch = Math.fround(this.height );
    this.canvasRef.nativeElement.width = cw;
    this.canvasRef.nativeElement.height = ch;
    const ctx: CanvasRenderingContext2D = this.canvasRef.nativeElement.getContext('2d');
    ctx.clearRect(0,0,cw,ch);
    ctx.strokeStyle = 'rgb(185, 173, 173)'; // grid borderline
    this.shapes = new Array(Math.fround(this.width/this.shapedimension))
    for (let i = 0; i < this.shapes.length; i++) { this.shapes[i] = new Array(Math.fround(this.height/this.shapedimension)) };
    for (let i = 0; i < this.shapes.length; i++) {
      for (let j = 0; j < this.shapes[i].length; j++) {
        let type = 0; // 0 = normal block, 1 = mine block
        let x = i * this.shapedimension;
        let y = j * this.shapedimension;
        let isOpened = false;
        let isFlagged = false;
        // let F = 100000;
        // let G = 100000;
        // let H = 100000;
        let neighbors = new Array();
        //ctx.strokeRect(x, y, this.shapedimension, this.shapedimension); // draw grid
        ctx.fillStyle = "#696969";
        ctx.fillRect(x, y, this.shapedimension, this.shapedimension);

        ctx.strokeStyle = "#0000ff";
        ctx.lineWidth   = 2;
        ctx.strokeRect(x, y, this.shapedimension, this.shapedimension);
        this.shapes[i][j] = { x, y,i,j, type, neighbors, isOpened , isFlagged};
      }
     

    }
    let mineCount = 0;
    while(mineCount < this.mine){
       let tempI = Math.floor(Math.random()* this.shapes.length);
       let tempJ = Math.floor(Math.random()* this.shapes[0].length);
       console.log(tempI,tempJ);
       if(this.shapes[tempI][tempJ].type === 1){
        continue;
       }
       else{
        this.shapes[tempI][tempJ].type = 1;
        mineCount++;
       }
    }
  }


  rightClick(e:any){
    e.preventDefault();
    console.log(e.offsetX , e.offsetY );
    for(let i = 0; i< this.shapes.length; i++){
      for(let j = 0; j< this.shapes[0].length; j++){
        if(e.offsetX > this.shapes[i][j].x && e.offsetX <= this.shapes[i][j].x + this.shapedimension
          && e.offsetY > this.shapes[i][j].y && e.offsetY <= this.shapes[i][j].y + this.shapedimension){
            console.log(this.shapes[i][j])
            const ctx: CanvasRenderingContext2D = this.canvasRef.nativeElement.getContext('2d');
            if(!this.shapes[i][j].isFlagged){
              if(this.flagCount > 0){
                this.shapes[i][j].isFlagged = true;
                let flag = new Image();
                flag.src = "assets/flag.png";
                flag.onload = () => {
                  ctx.strokeStyle = "#0000ff";
                  ctx.lineWidth   = 2;
                  ctx.fillStyle = "#696969";
                  ctx.fillRect(this.shapes[i][j].x, this.shapes[i][j].y, this.shapedimension, this.shapedimension);
                  ctx.drawImage(flag,this.shapes[i][j].x, this.shapes[i][j].y, this.shapedimension,  this.shapedimension )
                  ctx.strokeRect(this.shapes[i][j].x, this.shapes[i][j].y, this.shapedimension,  this.shapedimension );
                  this.flagCount--;
                  return;
                }
              }
              else{
                return;
              }
              
            }
            else{
              this.shapes[i][j].isFlagged = false;
              ctx.clearRect(this.shapes[i][j].x, this.shapes[i][j].y, this.shapedimension, this.shapedimension);
              ctx.fillStyle = "#696969";
              ctx.fillRect(this.shapes[i][j].x, this.shapes[i][j].y, this.shapedimension, this.shapedimension);
              ctx.strokeStyle = "#0000ff";
              ctx.lineWidth   = 2;
              ctx.strokeRect(this.shapes[i][j].x, this.shapes[i][j].y, this.shapedimension, this.shapedimension);
              this.flagCount++;
            }
           
          }
      }
    }
    




  }
  leftClick(e:any){
    for(let i = 0; i< this.shapes.length; i++){
      for(let j = 0; j< this.shapes[0].length; j++){
        if(e.offsetX > this.shapes[i][j].x && e.offsetX <= this.shapes[i][j].x + this.shapedimension
          && e.offsetY > this.shapes[i][j].y && e.offsetY <= this.shapes[i][j].y + this.shapedimension){
            console.log(this.shapes[i][j])
            const ctx: CanvasRenderingContext2D = this.canvasRef.nativeElement.getContext('2d');
            if(!this.shapes[i][j].isFlagged){
              this.shapes[i][j].isFlagged = true;
              let flag = new Image();
              flag.src = "assets/mine.png";
              flag.onload = () => {
                ctx.clearRect(this.shapes[i][j].x, this.shapes[i][j].y, this.shapedimension,  this.shapedimension );
                ctx.strokeStyle = "#0000ff";
                ctx.lineWidth   = 2;
                ctx.strokeRect(this.shapes[i][j].x+1, this.shapes[i][j].y+1, this.shapedimension-2,  this.shapedimension-2 );
                ctx.drawImage(flag,this.shapes[i][j].x, this.shapes[i][j].y, this.shapedimension,  this.shapedimension )
                
              }
            }
            else{
             
            }
           
          }
      }
    }
    




  }


}
