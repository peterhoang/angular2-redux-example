/**
 * Created by phoang on 2016-09-02.
 */

import { fakeAsync, inject } from '@angular/core/testing';
import { HttpModule, XHRBackend, ResponseOptions, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/throw';
import { MarvelActions } from '../actions/marvel.actions';
import { MarvelEpics } from './marvel.epics';
import { MyAppSettings } from '../app/my-app.settings';
import { TestBed } from '@angular/core/testing/test_bed';
import { MockBackend, MockConnection } from '@angular/http/testing/mock_backend';

describe('MarvelEpics', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpModule],
      providers: [
        {
          provide: XHRBackend,
          useClass: MockBackend
        },
        MarvelEpics,
        MyAppSettings
      ]
    });
  });

  it('should successfully retrieve a set of marvel characters', fakeAsync(inject([XHRBackend, MarvelEpics],
    (mockBackend, marvelEpics) => {

      let mockResp = {
        "code": 200,
        "status": "Ok",
        "copyright": "© 2016 MARVEL",
        "attributionText": "Data provided by Marvel. © 2016 MARVEL",
        "attributionHTML": "",
        "etag": "2ea49577549f91070db3d18cde93e8df6742d721",
        "data": {
          "offset": 0,
          "limit": 20,
          "total": 1485,
          "count": 20,
          "results": [
            {
              "id": 1011334,
              "name": "3-D Man",
              "description": "",
              "modified": "2014-04-29T14:18:17-0400",
              "thumbnail": {
                "path": "http://i.annihil.us/u/prod/marvel/i/mg/c/e0/535fecbbb9784",
                "extension": "jpg"
              }
            }]
        }
      };

      mockBackend.connections.subscribe((connection: MockConnection) => {
        connection.mockRespond(new Response(
          new ResponseOptions({
            body: mockResp
          })
        ));
      });

      const action$ = Observable.of({type: MarvelActions.GET_CHARACTERS});
      marvelEpics.getCharacters(action$).subscribe(
        action => expect(action).toEqual({
          type: MarvelActions.GET_CHARACTERS_SUCCESS,
          payload: mockResp
        })
      );
    }
  )));

  it('should return an error on get characters fail', fakeAsync(inject([XHRBackend, MarvelEpics],
    (mockBackend, marvelEpics) => {
      mockBackend.connections.subscribe(
        (connection: MockConnection) => {
          connection.mockError(new Error('some error'));
        });

      const action$ = Observable.of({type: MarvelActions.GET_CHARACTERS});
      marvelEpics.getCharacters(action$).subscribe(
        action => expect(action).toEqual({
          type: MarvelActions.MARVEL_GENERIC_ERROR,
          payload: new Error('some error')
        }));
    }
  )));
});
