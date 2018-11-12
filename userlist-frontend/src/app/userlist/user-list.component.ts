import { Component, OnInit, ViewChild } from '@angular/core';
import { User } from './user';
import { UsersService } from './users.service';
import { LazyLoadEvent } from 'primeng/api';
import { Table } from 'primeng/table';
import { HalOptions, Sort } from 'angular4-hal';

@Component({
  selector: 'app-userlist',
  templateUrl: './user-list.component.html',
  styleUrls: ['./userlist.component.css']
})
export class UserListComponent implements OnInit {

  @ViewChild(Table) tableViewChild: Table;

  readonly rowsPerPage = 15;

  displayDialog: boolean;

  user: User;

  selectedUser: User;

  newUser: boolean;

  users: User[];

  totalRecords: number;

  loading: boolean;

  cols: any[];

  constructor(private usersService: UsersService) {
  }

  ngOnInit() {
    this.cols = [
      {field: 'name', header: 'Name'},
      {field: 'surname', header: 'Surname'},
    ];
    this.loading = true;
  }

  lazyLoad(event: LazyLoadEvent) {
    this.loading = true;

    //in a real application, make a remote request to load data using state metadata from event
    //event.first = First row offset
    //event.rows = Number of rows per page
    //event.sortField = Field name to sort with
    //event.sortOrder = Sort order as number, 1 for asc and -1 for dec
    //filters: FilterMetadata object having field as key and filter value, filter matchMode as value

    const next = (users) => {
      this.users = users;
      this.totalRecords = this.usersService.totalElement()
    };
    const error1 = (error) => {
      this.totalRecords = 0;
      console.log('Error requesting user data from server: ' + error)
    };
    const complete = () => this.loading = false;

    const isSortDifferent = (event1: LazyLoadEvent, sortInfo: Sort[]) => {
      return event1.sortField != sortInfo[0].path || sortInfo[0].order != (event1.sortOrder == 1 ? 'ASC' : 'DESC');
    };

    if (!this.usersService.resourceArray || isSortDifferent(event, this.usersService.resourceArray.sortInfo)) {
      // for first load, or sort change
      this.usersService.getAll({
        notPaged: false,
        size: this.rowsPerPage,
        sort: [{path: event.sortField, order: event.sortOrder == 1 ? 'ASC' : 'DESC'}]
      }).subscribe(next, error1, complete);
    } else {
      this.usersService.page(event.first / this.rowsPerPage).subscribe(next, error1, complete);
    }
  }

  showDialogToAdd() {
    this.newUser = true;
    this.user = new User();
    this.displayDialog = true;
  }

  save() {
    // just reset (reload) table
    if (this.newUser)
      this.usersService.create(this.user).subscribe(_ => this.tableViewChild.reset(),
        error => console.log('Error crating user: ' + error)
      );
    else
      this.usersService.update(this.selectedUser).subscribe(_ => this.tableViewChild.reset(),
        error => console.log('Error updating user: ' + error)
      );

    this.user = null;
    this.displayDialog = false;
  }

  delete() {
    // just reset (reload) table
    this.usersService.delete(this.selectedUser).subscribe(_ => this.tableViewChild.reset(),
      error => console.log('Error removing user: ' + error)
    );

    this.user = null;
    this.displayDialog = false;
  }

  onRowSelect(event) {
    // event.originalEvent: Browser event
    // event.data: Selected data
    // event.type: Type of selection, valid values are "row", "radiobutton" and "checkbox"
    // event.index: Index of the row
    this.newUser = false;
    this.user = event.data;
    this.displayDialog = true;
  }

}
