import { Component, OnInit, OnDestroy, Output, EventEmitter } from '@angular/core';
import { ShareDataService } from '../services/share-data-siblings-component.service';
import { Subscription, Observable } from 'rxjs';
import { ApiService } from 'src/provider/api.service';
import { Endpoint } from 'src/provider/endPoint.const';

@Component({
  selector: 'app-service-detail',
  templateUrl: './service-detail.component.html',
  styleUrls: ['./service-detail.component.scss']
})
export class ServiceDetailComponent implements OnInit, OnDestroy {
  drinkItems: Service[] = [];

  foodItems: Service[] = [];
  subscription: Subscription;
  constructor(
    private shareDataService: ShareDataService,
    private api: ApiService,
  ) { }

  ngOnInit() {
    const pic = ['tiger','heneken','pepsi','coke','aquafina','traicay','snack'];
    this.api.get(Endpoint.service).subscribe((services) => {
      (services as unknown as ServiceModel[]).forEach((service, index) => {
        const temp: Service = {
          id: service.ServiceID,
          name: service.Name,
          total: service.Price,
          quantity: 1,
          img: pic[index],
        }
        if (service.Type === 'drink') {
          this.drinkItems.push(temp);
        } else {
          this.foodItems.push(temp);
        }
      })
    })
    this.subscription = this.shareDataService.drinkData.subscribe(() => { });
    this.subscription = this.shareDataService.foodData.subscribe(() => { });
  }

  HandleFood(item) {
    this.shareDataService.AddFood(item);
  }

  HandleDrink(item) {
    this.shareDataService.AddDrink(item);
  }



  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
