import { Injectable } from '@angular/core';
import { GlobalService } from './global.service';

@Injectable()
export class SessionService {

    public constructor(private globalService: GlobalService ) { }

    public setSessionData(menu: any, option: any) {
        // sessionStorage.setItem(menu, option);
    }

    public removeSessionData() {
        sessionStorage.clear();
    }
}
