import { Injectable } from '@angular/core';
import { SupabaseService } from 'src/service/supabase.service';
import { SQLiteDBConnection, capSQLiteSet,  } from '@capacitor-community/sqlite';
import { from, Observable, of } from 'rxjs';
import { switchMap, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class OfflineDataService {
  /*private database: SQLiteDBConnection | null = null;
  private readonly databaseName = 'my_organisms_db';

  constructor(private supabaseService: SupabaseService) { }

  async initDatabase(): Promise<void> {
    if (!this.database) {
      try {
        this.database = await capSQLiteCreateConnection({ database: this.databaseName });
        await this.database.open();
      }

    }
  }

  saveOfflineData(data: any): Observable<any> {
    if (this.database) {
      return from(this.database.execute(
        `INSERT INTO organisms (id, category, name, species, description, location, photo) VALUES (?, ?, ?, ?, ?, ?, ?)`,
        [data.id, data.category, data.name, data.species, data.description, data.location, data.photo]
      ));
    } else {
      return of(null);
    }
  }

  syncOfflineData(): Observable<any> {
    if (this.database) {
      return from(this.database.query(`SELECT * FROM organisms`)).pipe(
        switchMap((result) => {
          return this.supabaseService.saveOrganismBatch(result.values);
        }),
        switchMap(() => {
          return from(this.database.execute(`DELETE FROM organisms`));
        }),
        catchError((error) => {
          console.error("Error syncing offline data: ", error);
          return of(null);
        })
      );
    } else {
      return of(null);
    }
  }*/
}
