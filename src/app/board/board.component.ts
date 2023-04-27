import { Component, OnInit, Inject, ElementRef, ViewChild, DoCheck } from '@angular/core';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css']
})
export class BoardComponent implements OnInit, DoCheck{
  //@ViewChild('myCanvas') canvasRef: ElementRef


  ngDoCheck(): void {
      
  }

  ngOnInit(): void {
      
  }


}
