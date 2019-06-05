import store 	from '../store'
import { Model, model } from '../model'
import datetime   from './datetime'


describe('Field: moment', () => {
    store.clear()

    @model
    class A extends Model {
        @datetime x : Date  
    }

    it('...', async ()=> {
        let a = new A();	expect(a.x).toBeUndefined()
        expect(() => { a.x = <any>1      }).toThrow(new Error('Field can be only Date or null.'))
        expect(() => { a.x = <any>'test' }).toThrow(new Error('Field can be only Date or null.'))
        let now      = new Date()
        a.x = now;          expect(a.x).toBe(now)
        a.x = null;         expect(a.x).toBeNull()

        let sometime = new Date('2019-02-25T11:27:32.682907-06:00')
        a.x = sometime;     expect(a.x.getDate()).toBe(25)
    }),

    it('serialize/deserialize', async ()=> {
        let sometime = new Date('2019-02-25T11:27:32.682907-06:00')
        let raw  = A.getFieldsMeta().x.deserialize(sometime);    expect(raw).toBe('2019-02-25T17:27:32.682Z')
        let copy = A.getFieldsMeta().x.serialize(raw);           expect(copy).toEqual(sometime)
    })
})
