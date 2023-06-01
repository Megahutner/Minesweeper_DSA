import { Component, OnInit, Inject, ElementRef, ViewChild, DoCheck } from '@angular/core';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css']
})
export class BoardComponent implements OnInit, DoCheck{
//   @ViewChild('myCanvas') canvasRef!: ElementRef 



//   public Dificulty={
//     Easy : 1,
//     Normal : 2,
//     Hard : 3,
//   }

//   width: any;
//   height: any;
//   shapedimension = 10;
//   shapes: any;
//   dificultyPopup: boolean = true;

  
  

  ngOnInit(): void {
      
  }
  ngDoCheck(): void {
    // if(this.width != null && this.height != null){
    //   this.drawBoard();
    // }
}



//   selectDificulty(data: any){
//     if(data == this.Dificulty.Easy){
//       this.width = 100;
//       this.height = 100;
//     }
//     else if(data == this.Dificulty.Normal){
//       this.width = 250;
//       this.height = 200;
//     }
//     else if(data == this.Dificulty.Hard){
//       this.width = 500;
//       this.height = 300;
//     }
//     this.dificultyPopup = false;
//   }

//   drawBoard(){
//     const cw = Math.fround(this.width + 1);
//     const ch = Math.fround(this.height + 1);
//     this.canvasRef.nativeElement.width = cw;
//     this.canvasRef.nativeElement.height = ch;
//     const ctx: CanvasRenderingContext2D = this.canvasRef.nativeElement.getContext('2d');
//     ctx.clearRect(0,0,cw,ch);
//     ctx.strokeStyle = 'rgb(185, 173, 173)'; // grid borderline
//     this.shapes = new Array(Math.fround(this.width/this.shapedimension))
//     for (let i = 0; i < this.shapes.length; i++) { this.shapes[i] = new Array(Math.fround(this.height/this.shapedimension)) };
//     for (let i = 0; i < this.shapes.length; i++) {
//       for (let j = 0; j < this.shapes[i].length; j++) {
//         let type = 0;
//         let x = i * this.shapedimension;
//         let y = j * this.shapedimension;
//         let visited = false;
//         let F = 100000;
//         let G = 100000;
//         let H = 100000;
//         let cameFrom = undefined;
//         let neighbors = new Array();
//         ctx.strokeRect(x, y, this.shapedimension, this.shapedimension); // draw grid
//         this.shapes[i][j] = { x, y,i,j, type, F, G, H, neighbors, cameFrom, visited };
//       }

//     }
//   }


}
