import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

// import { User } from '@/_models';

@Injectable({ providedIn: 'root' })
export class UserService {
    constructor(private http: HttpClient) { }

    register(user) {
        return this.http.post(`http://localhost:3000/singin`, user);
    }

    getAccounts(){
      return this.http.get<any>('http://localhost:3000/account');
    }

    getRolAccount(id) {
      return this.http.get<any>(`http://localhost:3000/rolaccount/${id}`);
    }

    getRol(){
      return this.http.get<any>('http://localhost:3000/rol');
    }

    deleteRolAccount(rolId,accountId){
      return this.http.delete(`http://localhost:3000/rolaccount/${rolId}/${accountId}`);
    }
    
    setRolAccont(rolaccount) {
        return this.http.post(`http://localhost:3000/rolaccount`, rolaccount);
    }

    getActions(){
      return this.http.get<any>('http://localhost:3000/action');
    }

    getActionsByRol(id) {
      return this.http.get<any>(`http://localhost:3000/actionbyrolid/${id}`);
    }

    deleteAction(optionId,actionId,rolId){
      return this.http.delete(`http://localhost:3000/action/${optionId}/${actionId}/${rolId}`);
    }

    setRolOption(rp) {
      return this.http.post(`http://localhost:3000/action`, rp);
    }

    getReport(rpt) {
      return this.http.get<any>(`http://localhost:3000/report/${rpt}`);
    }

}