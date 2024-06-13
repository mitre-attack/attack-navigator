import { Component, OnInit, HostListener  } from '@angular/core';
import { DataService } from '../data.service';
import { SharedService, CompanyDictionary  } from '../services/data.service'

@Component({
  selector: 'my-chart',
  templateUrl: './my-chart.component.html',
  styleUrls: ['./my-chart.component.scss']
})
export class MyChartComponent implements OnInit {
  allData: any;
  companies: string[];
  selectedCompany: string;
  companyMap: CompanyDictionary;
  chartData: any[] = [];
  view: [number, number] = [700, 400];
  showXAxis = true;
  showYAxis = true;
  gradient = false;
  showLegend = true;
  showXAxisLabel = true;
  showYAxisLabel = true;
  xAxisLabel = 'Data source';
  yAxisLabel = 'percentage';
  colorScheme: any;
  simpleChartData: any[] = [];
  isSubcategoryView = false;

  constructor(private dataService: DataService, private sharedService: SharedService) { }
  ngOnInit() {
          this.sharedService.currentLayer.subscribe(data => {
              this.updateChartSize();
              this.selectedCompany = data.companyName;  // Veilig toewijzen van companyName als string
              this.loadChartData();  // Herlaad je chart data wanneer de company verandert
          });
  }

  loadChartData() {
    this.dataService.getCompanyData().subscribe({
      next: (data) => {
        this.allData = data;
        this.companies = Object.keys(data);
        this.colorScheme = this.generateColorScheme(data[this.selectedCompany]);
        this.updateChartData(data);
      },
      error: (err) => console.error('Failed to load company data', this.selectedCompany)
    });
  }


  loadMainCategories() {
      this.isSubcategoryView = false;
      this.colorScheme = this.generateColorScheme(this.allData[this.selectedCompany]); // Reset het kleurenschema
      this.updateChartData(this.allData);
  }

  generateColorScheme(data: any) {
      const categories = Object.keys(data).sort(); // Sorteer categorieën alfabetisch
      const colors = [
          '#FF8C00', '#FFD700', '#1E90FF', '#32CD32', '#6A5ACD', '#FF69B4',
          '#BADA55', '#7FE5F0', '#FF6347', '#40E0D0', '#EE82EE', '#DA70D6'
      ];

      let sortedColors = categories.map((category, index) => colors[index % colors.length]);

      return { domain: sortedColors }; // Retourneer een lijst van kleurcodes gesorteerd op categorie naam
  }

  onCategorySelect(event: any) {
      console.log('event')
      let selectedCategory;
      let companyData = this.allData[this.selectedCompany];
      let dataSource;

      if (typeof event === 'string'){
        dataSource = event;}
      else if (event && typeof event === 'object'){
        dataSource = event.name;

      }
      let subcategories = [];
      selectedCategory = companyData[dataSource];

      for (let subCategoryName in selectedCategory) {
          subcategories.push({
              name: subCategoryName,
              value: selectedCategory[subCategoryName]
          });
      }

      this.chartData = subcategories; // Update de chartData voor subcategorieën

      // Vind de index van de geselecteerde categorie in de alfabetisch gesorteerde lijst
      const categoryIndex = Object.keys(companyData).sort().indexOf(dataSource);
      const categoryColor = this.colorScheme.domain[categoryIndex]; // Haal de kleur van de geselecteerde categorie

      this.colorScheme = { domain: [categoryColor] }; // Stel deze kleur in voor alle subcategorieën

      this.isSubcategoryView = true;
  }




  onCompanyChange(newCompany: string) {
      this.selectedCompany = newCompany;
      this.dataService.getCompanyData().subscribe({
          next: (data) => {
              this.colorScheme = this.generateColorScheme(data[this.selectedCompany]); // Update het kleurenschema
              this.updateChartData(data);
          },
          error: (err) => console.error("Failed to update data for new company", err)
      });
  }




  updateChartData(data: any) {
    if (!this.selectedCompany || !data || !data[this.selectedCompany]) {
      console.error('Invalid or missing data');
      return;
    }

    let companyData = data[this.selectedCompany];
    let categories = [];

    // Collect data for main categories and sort alphabetically
    Object.keys(companyData).sort().forEach(category => {
      let sum = 0;
      let count = 0;
      Object.entries(companyData[category]).forEach(([subCategoryName, subCategoryValue]) => {
        sum += subCategoryValue as number;  // Assuming subCategoryValue is directly the number
        count++;
      });
      let average = count > 0 ? sum / count : 0;
      categories.push({ name: category, value: average });
    });

    // Set the main categories with their average values as chartData
    this.chartData = categories;
  }


  updateChartSize() {
    // Update de afmetingen afhankelijk van de schermgrootte of een andere logica
    this.view = [window.innerWidth * 0.9, 550]; // Past de breedte dynamisch aan, vaste hoogte
  }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.updateChartSize();
  }

}
