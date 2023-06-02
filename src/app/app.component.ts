import { Component, OnInit, Inject, ElementRef, ViewChild, DoCheck } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit, DoCheck{
  @ViewChild('myCanvas') canvasRef!: ElementRef 


 
  // enums
  public Dificulty={
    Easy : 1,
    Normal : 2,
    Hard : 3,
  }

  public BlockType = {
    Empty: 0 ,
    Mine : 1 ,
  }
  // general variables
  width: any;
  height: any;
  shapedimension: any;
  shapes: any;
  oldDificulty: any;
  currentDificulty: any;
  flagCount: any;
  mine: any;
  color: any;
  empty: any;
  


  // popup flags
  dificultyPopup: boolean = true;
  gameoverPopup : boolean = false;
  winPopup: boolean = false;
  sidebar: boolean = false;

  

  ngOnInit(): void { // initializing value 
    enum Color {
      "#7FFF00",
      "#0000FF",
      "#008B8B",
      "#8B008B",
      "#006400",
      "#9932CC",
      "#FF8C00",
      "#A52A2A",
    }
    this.color =  Color;
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
      this.empty = 90;
    }
    else if(data == this.Dificulty.Normal){  // 16 x 16 board
      this.width = 800;
      this.height = 800;
      this.shapedimension = 50;
      this.flagCount = 20;
      this.mine = 50;
      this.empty = 270;
    }
    else if(data == this.Dificulty.Hard){ // 24 x 24 board
      this.width = 960;
      this.height = 960;
      this.shapedimension = 40;
      this.flagCount = 50;
      this.mine = 99;
      this.empty = 477;
    }
    if(this.currentDificulty === data){
      this.drawBoard();
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
        ctx.fillStyle = "#696969";
        ctx.fillRect(x, y, this.shapedimension, this.shapedimension);

        ctx.strokeStyle = "#0000ff";
        ctx.lineWidth   = 2;
        ctx.strokeRect(x, y, this.shapedimension, this.shapedimension);
        this.shapes[i][j] = { x, y, type, isOpened , isFlagged};
      }
    }
    let mineCount = 0;
    while(mineCount < this.mine){
       let tempI = Math.floor(Math.random()* this.shapes.length);
       let tempJ = Math.floor(Math.random()* this.shapes[0].length);
       if(this.shapes[tempI][tempJ].type === 1){
        continue;
       }
       else{
        this.shapes[tempI][tempJ].type = 1;
        mineCount++;
        //this.MineBlocks.push(this.shapes[tempI][tempJ]);
       }
    }
    //this.shapes[0][0].type = 1; //for testing purpose
  }


  rightClick(e:any){
    e.preventDefault(); // prevent regular right click event on web
    for(let i = 0; i< this.shapes.length; i++){
      for(let j = 0; j< this.shapes[0].length; j++){
        if(e.offsetX > this.shapes[i][j].x && e.offsetX <= this.shapes[i][j].x + this.shapedimension
          && e.offsetY > this.shapes[i][j].y && e.offsetY <= this.shapes[i][j].y + this.shapedimension){
            if(!this.shapes[i][j].isOpened){
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
    




  }
  leftClick(e:any){
    for(let i = 0; i< this.shapes.length; i++){
      for(let j = 0; j< this.shapes[0].length; j++){
        if(e.offsetX > this.shapes[i][j].x && e.offsetX <= this.shapes[i][j].x + this.shapedimension
          && e.offsetY > this.shapes[i][j].y && e.offsetY <= this.shapes[i][j].y + this.shapedimension){
            const ctx: CanvasRenderingContext2D = this.canvasRef.nativeElement.getContext('2d');
            if(!this.shapes[i][j].isFlagged){
              if(this.shapes[i][j].type === this.BlockType.Mine) // if block has mine
              {
                this.gameOver();
              } 
              else{
                this.openBlock(i,j);
                if(this.empty === 0){
                  this.winPopup = true;
                }
              } 
              }
            }           
          }
      }
    }

    openBlock(i: number, j: number){
      if(!this.shapes[i][j].isOpened && !this.shapes.isFlagged){
      const ctx: CanvasRenderingContext2D = this.canvasRef.nativeElement.getContext('2d');
      if(this.shapes[i][j].type === this.BlockType.Empty ){
        var neighborMineCount = 0;        
        for(let x = i-1; x <= i+1; x++) {
          for(let y = j-1; y<= j+1;y++){
            if((x >= 0 && x < this.shapes.length) && (y >=0 && y< this.shapes[0].length)){
            if(this.shapes[x][y].type === this.BlockType.Mine){
              neighborMineCount++;
            }
          }
          }
        }
        if(neighborMineCount === 0){
          ctx.clearRect(this.shapes[i][j].x, this.shapes[i][j].y, this.shapedimension,  this.shapedimension );
          ctx.fillStyle = "#F0F8FF";
          ctx.fillRect(this.shapes[i][j].x, this.shapes[i][j].y, this.shapedimension, this.shapedimension);
          ctx.strokeStyle = "#0000ff";
          ctx.lineWidth   = 2;
          ctx.strokeRect(this.shapes[i][j].x, this.shapes[i][j].y, this.shapedimension, this.shapedimension);
          this.shapes[i][j].isOpened = true;
          this.empty --;
          if(i - 1 >= 0){
            this.openBlock(i - 1, j);
          }
          if(j - 1 >= 0){
            this.openBlock(i, j -1);
          }
          if(i + 1 < this.shapes.length){
            this.openBlock(i + 1, j);
          }
          if(j + 1 < this.shapes[0].length){
            this.openBlock(i, j + 1);
          }
        }
        else{
          ctx.clearRect(this.shapes[i][j].x, this.shapes[i][j].y, this.shapedimension,  this.shapedimension );
          ctx.fillStyle = this.color[neighborMineCount-1];
          ctx.textAlign = "center";
          ctx.font = "30px Arial";
          ctx.fillText(`${neighborMineCount}`,this.shapes[i][j].x + this.shapedimension/2,this.shapes[i][j].y + this.shapedimension/1.5);
          ctx.strokeStyle = "#0000ff";
          ctx.lineWidth   = 2;
          ctx.strokeRect(this.shapes[i][j].x, this.shapes[i][j].y, this.shapedimension, this.shapedimension);
          this.shapes[i][j].isOpened = true;
          this.empty --;
        }
      }
    }
    }
    gameOver(){
      const ctx: CanvasRenderingContext2D = this.canvasRef.nativeElement.getContext('2d');
      for(let i = 0; i< this.shapes.length; i++){
        for(let j = 0; j< this.shapes[0].length; j++){
          if(this.shapes[i][j].type === this.BlockType.Mine){ 
          this.shapes[i][j].isOpened = true;  
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
      
    }
  }
      // this.MineBlocks.array.forEach((i: any) => { // draw mine blocks on the board
      // }
      // );
      // show game over popup
      this.gameoverPopup = true;

    }

    retry(){
      this.gameoverPopup = false;
      this.dificultyPopup = false;
      this.winPopup = false;
      this.selectDificulty(this.currentDificulty); // reset variables
      this.drawBoard();
    }

    changeDifficulty(){
      this.gameoverPopup = false;
      this.dificultyPopup = true;
      this.winPopup = false;
    }


    toolbarContent = [{
      widget: 'dxButton',
      location: 'before',
      options: {
        icon: 'menu',
        onClick: () => this.dificultyPopup = !this.dificultyPopup,
      },
    },
    {
      widget: 'dxButton',
      location: 'before',
      options: {
        icon: 'redo',
        onClick: () => this.selectDificulty(this.currentDificulty),
      },
    },
  ];
  
  }



