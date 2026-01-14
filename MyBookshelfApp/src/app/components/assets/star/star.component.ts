import { Component, input } from "@angular/core";

@Component({
    selector: 'star',
    templateUrl: 'star.component.html',
    styleUrl: 'star.component.scss'
})
export class Star {
    fill = input("");
}