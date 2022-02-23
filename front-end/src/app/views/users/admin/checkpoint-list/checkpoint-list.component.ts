import { Component, OnInit } from '@angular/core';
import { LocalDataSource }from 'ng2-smart-table';
@Component({
  selector: 'ngx-checkpoint-list',
  templateUrl: './checkpoint-list.component.html',
  styleUrls: ['./checkpoint-list.component.scss']
})
export class CheckpointListComponent implements OnInit {

  settings = {
    add: {
      addButtonContent: '<i class="nb-search"></i>',
      createButtonContent: '<i class="nb-checkmark"></i>',
      cancelButtonContent: '<i class="nb-close"></i>',
    },
    edit: {
      editButtonContent: '<i class="nb-edit"></i>',
      saveButtonContent: '<i class="nb-checkmark"></i>',
      cancelButtonContent: '<i class="nb-close"></i>',
    },
    delete: {
      deleteButtonContent: '<i class="nb-trash"></i>',
      confirmDelete: true,
    },
    columns: {
      id: {
        title: 'ID',
        type: 'number',
      },
      firstName: {
        title: 'First Name',
        type: 'string',
      },
      lastName: {
        title: 'Last Name',
        type: 'string',
      },
      username: {
        title: 'Username',
        type: 'string',
      },
      email: {
        title: 'E-mail',
        type: 'string',
      },
      age: {
        title: 'Age',
        type: 'number',
      },
    },
    actions: {
      columnTitle: 'Actions',
      add: true,
      edit: true,
      delete: true,
      position: 'right'
    },
  };

  source: LocalDataSource = new LocalDataSource();

  constructor() { }

  ngOnInit(): void {
  }

  onDeleteConfirm(event): void {
    if (window.confirm('Are you sure you want to delete?')) {
      event.confirm.resolve();
    } else {
      event.confirm.reject();
    }
  }

}
