import { Component, OnInit, ViewChild } from '@angular/core';
import { AdminService } from 'src/app/services/admin.service';
import { participantFields } from 'src/app/constants';
import {
  CellClickedEvent,
  ColDef,
  GridOptions,
  GridReadyEvent,
  IDatasource,
  IGetRowsParams,
} from 'ag-grid-community/dist/lib/main';
import { RequestWithFilterAndSort } from 'src/app/model/request-with-sort-filter';
import { AgGridAngular } from 'ag-grid-angular';
import { groupBy } from 'src/app/common.func';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css'],
})
export class AdminDashboardComponent implements OnInit {
  participantList: any;
  constParticipantList: any;
  participantFields: any = participantFields();
  pageNo = 1;
  sortBy = 'points';
  sortOrder = 'desc';
  currentYear = new Date().getFullYear();
  quarterCodes: string[] = [];

  defaultPageSize = 5;
  gridColumnApi: any;
  gridApi: any;
  public rowData = [];

  public columnDefs: ColDef[] = [
    {
      field: 'rank',
      cellStyle: { fontSize: '16px' },
      minWidth: 100,
      sortable: false,
      filter: 'agNumberColumnFilter',
    },
    {
      field: 'participantName',
      headerName: 'Employee Name',
      cellStyle: { fontSize: '16px' },
    },
    {
      field: 'designation',
      cellStyle: { fontSize: '16px' },
    },
    {
      field: 'businessUnit',
      cellStyle: { fontSize: '16px' },
    },
    {
      field: 'resourceManager',
      cellStyle: { fontSize: '16px' },
    },
    {
      field: 'primarySkill',
      cellStyle: { fontSize: '16px' },
    },
    {
      field: 'points',
      cellStyle: { fontSize: '16px' },
      filter: 'agNumberColumnFilter',
    },
  ];

  gridOptions: GridOptions = {
    defaultColDef: {
      sortable: true,
      filter: true,
      minWidth: 200,
      resizable: true,
      floatingFilter: true,
      flex: 1,
    },
    rowModelType: 'infinite',
    suppressHorizontalScroll: true,
    onCellClicked: (event: CellClickedEvent) => console.log(event.column),
  };

  constructor(private adminService: AdminService) {}

  onGridReady(params: GridReadyEvent) {
    params.api.sizeColumnsToFit();
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
    this.gridApi.setDatasource(this.dataSource);
  }

  onBtExport() {
    this.gridApi.exportDataAsCsv();
  }

  dataSource: IDatasource = {
    getRows: (params: IGetRowsParams) => {
      // preparing sort filter model

      let sort = 'desc';
      let colId = 'points';
      if (params.sortModel[0]) {
        sort = params.sortModel[0].sort;
        colId = params.sortModel[0].colId;
      }
      const sortFilterModel: RequestWithFilterAndSort = {
        colId: colId,
        sort: sort,
        filterModel: params.filterModel,
        data: undefined,
      };

      // Handling date filter

      const endDate = (<HTMLInputElement>(
        document.querySelector('#end-date-filter')
      )).value;
      const startDate = (<HTMLInputElement>(
        document.querySelector('#start-date-filter')
      )).value;

      if (startDate !== '' || endDate !== '') {
        params.filterModel.startDateFilter = {
          filter: startDate,
          filterType: 'date',
          type: 'greaterThan',
        };
        params.filterModel.endDateFilter = {
          filter: endDate,
          filterType: 'date',
          type: 'lessThan',
        };
        sortFilterModel.data = 'dateFilter';
      }

      // handling year filter

      if (
        (<HTMLInputElement>(
          document.querySelector('.year-filter-activator')
        )).hasAttribute('style')
      ) {
        const year = (<HTMLInputElement>document.querySelector('#year')).value;
        const quarterFilter = (<HTMLInputElement>(
          document.querySelector('#quarterFilter')
        )).value;
        params.filterModel.yearFilter = {
          filter: year,
          filterType: 'date',
          type: 'eqauls',
        };
        params.filterModel.quarterFilter = {
          filter: quarterFilter,
          filterType: 'date',
          type: 'between',
        };
        sortFilterModel.data = 'yearFilter';
      }

      console.log('Model - ', sortFilterModel);

      // calling api

      this.getAllParticipants(
        this.pageNo + this.gridApi.paginationGetCurrentPage(),
        this.defaultPageSize,
        sortFilterModel,
        params
      );
    },
  };

  async getAllParticipants(pageNo, pageSize, sortFilterModel, params) {
    console.log('Page no - ', pageNo);
    console.log('Page size - ', pageSize);

    await this.adminService
      .getParticipants(pageNo, pageSize, sortFilterModel)
      .then((response) => {
        response.subscribe((response) => {
          const participants = response['participantDtoList'];
          const totalRecords = response['numberOfParticipants'] + pageSize;
          console.log('Final response - ', participants);

          if (sortFilterModel['colId'] == 'points') {
            if (sortFilterModel['sort'] === 'asc') {
              participants.forEach(
                (e, i) => (e['rank'] = totalRecords - pageSize * pageNo - i)
              );
            } else {
              participants.forEach(
                (e, i) => (e['rank'] = (pageNo - 1) * pageSize + i + 1)
              );
            }
          } else {
            participants.forEach((e, i) => (e['rank'] = 0));
          }

          const finalData = this.rectifyingParticipantData(participants);

          params.successCallback(finalData, response['numberOfParticipants']);
        });
      });

    this.gridOptions.paginationPageSize = pageSize;
  }

  rectifyingParticipantData(participants) {
    const groupedParticipant = groupBy(participants, 'email');
    const result: any = [];
    for (const item in groupedParticipant) {
      const participant = groupedParticipant[item];
      const obj = participant[0];
      if (participant.length > 1) {
        let points = 0;
        participant.forEach((e) => {
          points = points + e['points'];
        });
        obj['points'] = points;
      }
      result.push(obj);
    }
    return result;
  }

  @ViewChild(AgGridAngular) agGrid!: AgGridAngular;

  ngOnInit(): void {
    this.quarterSetting(this.currentYear);
  }

  quarterSetting(selectedYear: number) {
    if (selectedYear == this.currentYear) {
      const currentMonth = new Date().getMonth() + 1;
      console.log('Month - ', currentMonth);

      switch (currentMonth) {
        case 1:
        case 2:
        case 3:
          this.quarterCodes = ['q1'];
          break;
        case 4:
        case 5:
        case 6:
          this.quarterCodes = ['q1', 'q2'];
          break;
        case 7:
        case 8:
        case 9:
          this.quarterCodes = ['q1', 'q2', 'q3'];
          break;
        default:
          this.quarterCodes = ['q1', 'q2', 'q3', 'q4'];
      }
    } else {
      this.quarterCodes = ['q1', 'q2', 'q3', 'q4'];
    }
  }

  onPageSizeChanged(event: any) {
    console.log('page changed');

    this.gridApi.paginationSetPageSize(Number(event.target.value));
    this.gridApi.setDatasource(this.dataSource);
  }

  recPerPageHandler(recNo) {
    this.defaultPageSize = Number(recNo.target.value);
    this.gridApi.setDatasource(this.dataSource);
  }

  startDateFilter() {
    this.gridApi.setDatasource(this.dataSource);
  }

  endDateFilter() {
    this.gridApi.setDatasource(this.dataSource);
  }

  resetDateFilter() {
    const startDate = <HTMLInputElement>(
      document.querySelector('#end-date-filter')
    );
    const endDate = <HTMLInputElement>(
      document.querySelector('#start-date-filter')
    );
    if (startDate.value !== '' || endDate.value !== '') {
      startDate.value = '';
      endDate.value = '';
      this.gridApi.setDatasource(this.dataSource);
    }
  }

  quarterFilterHandler() {
    this.quarterSetting(
      Number((<HTMLInputElement>document.querySelector('#year')).value)
    );
    this.gridApi.setDatasource(this.dataSource);
  }

  quarterFilterClickHandler(event) {
    if (event.target.hasAttribute('style')) {
      event.target.removeAttribute('style');
      (<HTMLInputElement>document.querySelector('#year')).setAttribute(
        'disabled',
        'true'
      );
      (<HTMLInputElement>document.querySelector('#year')).setAttribute(
        'type',
        'text'
      );
      (<HTMLInputElement>document.querySelector('#year')).value = 'Year';
      (<HTMLInputElement>document.querySelector('#quarterFilter')).setAttribute(
        'disabled',
        'true'
      );
      this.gridApi.setDatasource(this.dataSource);
    } else {
      event.target.setAttribute('style', 'background: lightgreen;');
      (<HTMLInputElement>document.querySelector('#year')).removeAttribute(
        'disabled'
      );
      (<HTMLInputElement>document.querySelector('#year')).setAttribute(
        'type',
        'number'
      );
      (<HTMLInputElement>document.querySelector('#year')).value = String(
        this.currentYear
      );
      (<HTMLInputElement>(
        document.querySelector('#quarterFilter')
      )).removeAttribute('disabled');

      this.quarterFilterHandler();
    }
  }
}
