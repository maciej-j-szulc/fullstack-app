import { Component, OnInit } from '@angular/core';
import { SharedService } from 'src/app/shared.service';

@Component({
  selector: 'app-show-emp',
  templateUrl: './show-emp.component.html',
  styleUrls: ['./show-emp.component.css']
})
export class ShowEmpComponent {

  constructor(private sharedService: SharedService){}

  employeeList:any[] = [];

  ModalTitle: string = '';
  ActivateAddEditEmpComp: boolean = false;
  emp:any;

  ngOnInit(): void {
    this.refreshEmpList();
  }

  refreshEmpList(){
    this.sharedService.getEmpList().subscribe(
      data => {
        this.employeeList = data;
      }
    )
  }

  addClick(){
    this.emp = {
      EmployeeId:0,
      EmployeeName: "",
      DepartmentName: "",
      DateOfJoining:"",
      PhotoFileName: "Beztytułu1.png"
    }
    this.ModalTitle = "Add Employee";
    this.ActivateAddEditEmpComp = true;
  }

  closeClick(){
    this.ActivateAddEditEmpComp = false;
    this.refreshEmpList();
  }

  editClick(item:any){
    this.emp=item;
    this.ModalTitle="Edit Employee";
    this.ActivateAddEditEmpComp = true;
  }

  deleteClick(item:any){
    if(confirm('Are you sure?'))
      {
        this.sharedService.deleteEmployee(item.EmployeeId).subscribe(data => {
          alert(data.toString())
          this.refreshEmpList()
        })
      }
  }
}
