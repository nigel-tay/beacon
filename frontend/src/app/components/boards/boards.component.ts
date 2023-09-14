import { Component, OnInit } from '@angular/core';
import { Reports } from 'src/app/interface/reports';
import { PetService } from 'src/app/service/pet.service';

@Component({
  selector: 'app-boards',
  templateUrl: './boards.component.html',
  styleUrls: ['./boards.component.scss']
})
export class BoardsComponent implements OnInit{

  selectedRegion: string = "";
  reportsList!: Reports[];
  currentPage: number = 1;
  pageSize: number = 3;
  totalPages: number[] = [];

  constructor(
    private petService: PetService
  ) {}
  
  ngOnInit(): void {
    this.getReportsByRegion(this.currentPage, '');
  }

  getReportsByRegion(currentPage: number, region: string) {
    this.petService.getAllReports(currentPage, 5, region)
      .subscribe({
        next: (data: any) => {
          this.reportsList = [...data.reports];
        },
        error: (data: any) => {
          this.reportsList = [];
          console.log(data);
        }
      })
  }

  handleSearchReportsFromRegion(region: string) {
    this.getReportsByRegion(this.currentPage, region);
  }

  getTotalPages() {
    this.petService.getTotalPages()
      .subscribe(data => {        
        for (let i = 0; i < data.pages; i++) {
          this.totalPages.push(i+1);
        }
      })
  }

  onPageChange(newPage: number) {
    this.currentPage = newPage;
    this.getReportsByRegion(newPage, this.selectedRegion);
  }
  
}
