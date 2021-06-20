import { TestBed } from '@angular/core/testing';
import { HeroesService } from './heroes.service';
import { HttpClientModule } from '@angular/common/http';
import { IHero } from '../models/hero.model';

describe('HeroesService', () => {
  let service: HeroesService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientModule,
      ]
    });
    service = TestBed.inject(HeroesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it ('Debería retornar heroes', async () => {
    const hero = await service.getHeroes().toPromise();
    expect(hero.length > 0).toBeTruthy();
  });

  it ('Debería hacer CRUD de un heroe', async () => {
    console.log('entre en crear');
    const hero = {
      name: 'Flash',
      lastname: 'Allen',
      email: 'flash@heroes.com',
      bio: 'Flash el mejor',
      image: 'assets/img/aquaman.png',
      appearance: '1941-11-01',
      business: 'DC'
    };

    const createHero = await service.createHero(hero).toPromise();
    const getCreateHero = await service.getHero(createHero.id).toPromise();
    expect(getCreateHero.name).toEqual('Flash');
    expect(getCreateHero.email).toEqual('flash@heroes.com');
    expect(getCreateHero.appearance).toEqual('1941-11-01');

    const editHero = {
      id: 8,
      name: 'Flash2',
      lastname: 'Allen2',
      email: 'flash2@heroes.com',
      bio: 'Flash el mejor 2',
      image: 'assets/img/aquaman.png',
      appearance: '1941-11-01',
      business: 'DC'
    };

    const updateHero = await service.editHero(editHero).toPromise();
    const getUpdateHero = await service.getHero(updateHero.id).toPromise();
    expect(getUpdateHero.name).toEqual('Flash2');
    expect(getUpdateHero.email).toEqual('flash2@heroes.com');
    expect(getUpdateHero.appearance).toEqual('1941-11-01');

    const deleteHero = await service.deleteHero(8).toPromise();
    expect(deleteHero).toEqual({} as IHero);
  })

});
