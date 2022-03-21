import { HttpParams } from "@angular/common/http";
import { ServerDataSource } from "ng2-smart-table";

export class CustomServerDataSource extends ServerDataSource {
    addPagerRequestParams(httpParams: HttpParams): HttpParams {
        if (this.pagingConf && this.pagingConf['page'] && this.pagingConf['perPage']) {
            httpParams = httpParams.set(this.conf.pagerPageKey, this.pagingConf['page'] + (-1));
            httpParams = httpParams.set(this.conf.pagerLimitKey, this.pagingConf['perPage']);
        }
        return httpParams;
    }
}