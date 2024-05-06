import { Component, OnInit } from '@angular/core';
import { SharedService } from 'src/app/shared.service';

@Component({
  selector: 'app-show-dep',
  templateUrl: './show-dep.component.html',
  styleUrls: ['./show-dep.component.css']
})
export class ShowDepComponent implements OnInit {

  constructor(private sharedService: SharedService){}

  departmentList:any[] = [];

  ModalTitle: string = '';
  ActivateAddEditDepComp: boolean = false;
  dep:any;

  departmentIdFilter:string = '';
  departmentNameFilter:string='';
  departmentListWithoutFiletr:any=[];

  ngOnInit(): void {
    this.refreshDepList();
  }

  refreshDepList(){
    this.sharedService.getDepList().subscribe(
      data => {
        this.departmentList = data;
        this.departmentListWithoutFiletr=data;
      }
    )
  }

  addClick(){
    this.dep = {
      DepartmentId:0,
      DepartmentName: ""
    }
    this.ModalTitle = "Add Department";
    this.ActivateAddEditDepComp = true;
  }

  closeClick(){
    this.ActivateAddEditDepComp = false;
    this.refreshDepList();
  }

  editClick(item:any){
    this.dep=item;
    this.ModalTitle="Edit Department";
    this.ActivateAddEditDepComp = true;
  }

  deleteClick(item:any){
    if(confirm('Are you sure?'))
      {
        this.sharedService.deleteDepartment(item.DepartmentId).subscribe(data => {
          alert(data.toString())
          this.refreshDepList()
        })
      }
  }
}
