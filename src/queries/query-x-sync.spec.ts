import { runInAction } from 'mobx'
import { Model, model, field, SelectorX as Selector, QueryXSync, LocalAdapter, EQ, IN, ASC, DESC } from '../'
import { data_set, obj_a, obj_b, obj_c, obj_d, obj_e } from '../test.utils' 


describe('QueryXSync', () => {
    @model class A extends Model {
        @field   a !: number
        @field   b !: string
        @field   c !: boolean
    }

    const adapter   : LocalAdapter<A> = (<any>A).__adapter
    const cache     : Map<string, A>  = (<any>A).__cache

    it('constructor: default', () => {
        const query = new QueryXSync<A>(adapter, cache)
        expect(query).toMatchObject({
            items: [],
            total: 0,
            selector: new Selector(),
            adapter: adapter,
            need_to_update: true,
            is_loading: false,
            is_ready: false,
            error: '',
        })

    })
    
    it('constructor: with selector', async ()=> {
        const selector = new Selector()
        const query = new QueryXSync<A>(adapter, cache, selector)
        expect(query).toMatchObject({
            items: [],
            total: 0,
            selector: selector,
            adapter: adapter,
            need_to_update: true,
            is_loading: false,
            is_ready: false,
            error: '',
        })
    })
})
