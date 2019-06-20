import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-recipe-newedit',
  templateUrl: './recipe-newedit.component.html',
  styleUrls: ['./recipe-newedit.component.css']
})
export class RecipeNeweditComponent implements OnInit {

  id: number;
  editMode = false;

  constructor(private currentRoute: ActivatedRoute) { }

  ngOnInit() {

    this.currentRoute.params.subscribe((params: Params)=> {      
      this.editMode = (params['id'] !== undefined)? true : false;
     });

  }
}
