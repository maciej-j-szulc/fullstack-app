import { Component, Input, OnInit } from '@angular/core';
import { SharedService } from 'src/app/shared.service';

@Component({
  selector: 'app-add-edit-emp',
  templateUrl: './add-edit-emp.component.html',
  styleUrls: ['./add-edit-emp.component.css']
})
export class AddEditEmpComponent {
  @Input() emp:any;
  EmployeeId: string='';
  EmployeeName: string='';
  DepartmentName: string='';
  DateOfJoining: string='';
  PhotoFileName: string='';
  PhotoFilePath: string='';

  DepartmentList:any[]=[];

  constructor(private sharedService: SharedService){}

  ngOnInit(): void {
    this.loadDepartmentList();
  }

  loadDepartmentList(){
    this.sharedService.getAllDepartmentNames().subscribe((data:any)=>{
      this.DepartmentList=data;

      this.EmployeeId=this.emp.EmployeeId;
      this.EmployeeName=this.emp.EmployeeName;
      this.DepartmentName=this.emp.departmentName;
      this.DateOfJoining=this.emp.DateOfJoining;
      this.PhotoFileName=this.emp.PhotoFileName;
      this.PhotoFilePath=this.sharedService.PhotoURL+this.PhotoFileName;
      console.log(this.PhotoFilePath)
    })
  }

  addEmployee(){
    const val = {EmployeeId:this.EmployeeId,
                 EmployeeName:this.EmployeeName,
                 DepartmentName:this.DepartmentName,
                 DateOfJoining:this.DateOfJoining,
                 PhotoFileName:this.PhotoFileName}

    this.sharedService.addEmployee(val).subscribe(res =>{
      alert(res.toString());
    })
    }

  updateEmployee(){
    const val = {EmployeeId:this.EmployeeId,
      EmployeeName:this.EmployeeName,
      DepartmentName:this.DepartmentName,
      DateOfJoining:this.DateOfJoining,
      PhotoFileName:this.PhotoFileName}

    this.sharedService.updateEmployee(val).subscribe(res =>{
      alert(res.toString());
    })
  }

  uploadPhoto(event: Event): void {
  const inputElement = event.target as HTMLInputElement; // Explicitly cast event.target to HTMLInputElement
  if (inputElement.files && inputElement.files.length > 0) {
    const file = inputElement.files[0];
    const formData: FormData = new FormData();
    formData.append('uploadedFile', file, file.name);

    this.sharedService.uploadPhoto(formData).subscribe((data: any) => {
      this.PhotoFileName = data.toString();
      this.PhotoFilePath = this.sharedService.PhotoURL + this.PhotoFileName;
    });
  }
}
}