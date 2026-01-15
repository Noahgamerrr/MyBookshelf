import { Component, model } from "@angular/core";
import { Star } from "../../assets/star/star.component";

@Component({
    selector: 'rating',
    templateUrl: 'rating.component.html',
    styleUrl: 'rating.component.scss',
    imports: [ Star ]
})
export class Rating {
    stars = model(1);

    setStars(stars: number) {
        this.stars.set(stars);
    }
}