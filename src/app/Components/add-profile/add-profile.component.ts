import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ProfileService } from 'src/app/services/profile.service';
import Swal from 'sweetalert2';
declare let window: any;
@Component({
  selector: 'app-add-profile',
  templateUrl: './add-profile.component.html',
  styleUrls: ['./add-profile.component.css'],
})
export class AddProfileComponent implements OnInit {
  add: any;
  designations: any;
  practiceTeam = 5;
  ResourceManager: any;
  BusinessUnit: any;
  primarySkill: any;
  email:any;
  form = {
    name: '',
  };
  @Output() onClose = new EventEmitter<boolean>();
  constructor(private profileService: ProfileService) {}
  async getDesignations() {
    this.profileService.getAllDesignation().then((data) => {
      this.designations = data;
    });
  }
  async getResourceManager() {
    this.profileService.getAllResourceManager().then((data) => {
      this.ResourceManager = data;
      console.log('data of resourcemanager:', this.ResourceManager);
    });
  }
  async getSkills() {
    this.profileService.getAllSkill().then((data) => {
      this.primarySkill = data;
      console.log('ksfks', data);
    });
    console.log('inside add component', this.primarySkill);
  }
  async getBusinessUnit() {
    this.profileService.getAllBusinessUnit().then((data) => {
      this.BusinessUnit = data;
    });
  }
  async handleAddProfile(formData) {
    console.log('haddle add profile data', formData);
    await this.profileService
      .addProfile(formData)
      .then((response) => {
        if (response.status == 201) {
          Swal.fire('Added');
        } else {
          Swal.fire('Something went wrong !');
        }
      })
      .catch((error) => {
        Swal.fire('Something went wrong !');
      })
      .finally(() => {
        this.handleClosePopup();
      });
    this.designations();
  }
  ngOnInit(): void {
    this.add = new window.bootstrap.Modal(document.getElementById('addModal'));
    this.add.show();
    this.getDesignations();
    this.getSkills();
    this.getResourceManager();
    console.log('snekaaa', this.getSkills());
    this.getBusinessUnit();
  }
  handleClosePopup() {
    this.add.hide();
    this.onClose.emit();
  }
}
