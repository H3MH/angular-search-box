import { Component } from "@angular/core";
import { HttpClient } from "@angular/common/http";

@Component({
  selector: "my-app",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"]
})


export class AppComponent {
  constructor(private http: HttpClient) {}
  search = "";
  timeout = null;
  show = false;
  searchTickers: any;

  open() {
    this.show = true;
  }
  hide() {
    this.show = false;
  }
  clear() {
    this.search = "";
  }
  getStockImage(symbol: any) {
    
    return `https://api.duckduckgo.com${symbol?.Icon?.URL}` ;
  }

  fetchResults(symbol, count) {
    if (!symbol) this.hide();
    this.http
      .get<any>(
        `https://api.duckduckgo.com/?q=${encodeURIComponent(symbol)}&format=json&pretty=1`
      )
      .subscribe(data => {
        console.log(data);
        this.searchTickers = data;
      });
  }
  searchFunc(val) {
    this.search = val;
    if (val != "") {
      clearTimeout(this.timeout);
      this.timeout = setTimeout(() => {
        this.show = true;

        this.fetchResults(this.search, 10);
      }, 500);
    } else {
      this.clear();
      this.hide();
    }
  }
}
