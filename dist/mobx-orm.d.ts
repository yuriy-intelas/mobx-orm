import { Selector as Selector$2 } from '@/types';

declare abstract class Filter {
    abstract get URLSearchParams(): URLSearchParams;
    abstract setFromURI(uri: string): void;
    abstract isMatch(obj: any): boolean;
}

declare abstract class XFilter$1 {
    abstract get URLSearchParams(): URLSearchParams;
    abstract setFromURI(uri: string): void;
    abstract isMatch(obj: any): boolean;
    abstract get isReady(): boolean;
}

declare abstract class Filter$1 {
    abstract get URLSearchParams(): URLSearchParams;
    abstract setFromURI(uri: string): void;
    abstract isMatch(obj: any): boolean;
}

declare abstract class XFilter {
    abstract get URLSearchParams(): URLSearchParams;
    abstract setFromURI(uri: string): void;
    abstract isMatch(obj: any): boolean;
    abstract get isReady(): boolean;
}
declare type ORDER_BY$1 = Map<string, boolean>;
declare class SelectorX$1 {
    filter?: XFilter;
    order_by?: ORDER_BY$1;
    offset?: number;
    limit?: number;
    relations?: Array<string>;
    fields?: Array<string>;
    omit?: Array<string>;
    constructor(filter?: XFilter, order_by?: ORDER_BY$1, offset?: number, limit?: number, relations?: string[], fields?: string[], omit?: string[]);
    get URLSearchParams(): URLSearchParams;
}

declare abstract class QueryBase$1<M extends Model$1> {
    filters: Filter$1;
    order_by: ORDER_BY$1;
    fields?: Array<string>;
    omit?: Array<string>;
    relations?: Array<string>;
    offset: number;
    limit: number;
    total: number;
    need_to_update: boolean;
    get is_loading(): boolean;
    get is_ready(): boolean;
    get error(): string;
    readonly __base_cache: any;
    readonly __adapter: Adapter$1<M>;
    __items: M[];
    __is_loading: boolean;
    __is_ready: boolean;
    __error: string;
    __disposers: (() => void)[];
    __disposer_objects: {
        [field: string]: () => void;
    };
    constructor(adapter: Adapter$1<M>, base_cache: any, selector?: Selector$2);
    destroy(): void;
    abstract get items(): any;
    abstract __load(objs: M[]): any;
    abstract shadowLoad(): any;
    load(): Promise<void>;
    get autoupdate(): boolean;
    set autoupdate(value: boolean);
    get selector(): Selector$2;
    ready(): Promise<Boolean>;
    loading(): Promise<Boolean>;
}

declare class Query$1<M extends Model$1> extends QueryBase$1<M> {
    constructor(adapter: Adapter$1<M>, base_cache: any, selector?: Selector$2);
    shadowLoad(): Promise<void>;
    get items(): M[];
    __load(objs: M[]): void;
    __watch_obj(obj: any): void;
}

declare class QueryPage$1<M extends Model$1> extends QueryBase$1<M> {
    __load(objs: M[]): void;
    setPageSize(size: number): void;
    setPage(n: number): void;
    goToFirstPage(): void;
    goToPrevPage(): void;
    goToNextPage(): void;
    goToLastPage(): void;
    get is_first_page(): boolean;
    get is_last_page(): boolean;
    get current_page(): number;
    get total_pages(): number;
    constructor(adapter: Adapter$1<M>, base_cache: any, selector?: Selector$2);
    get items(): M[];
    shadowLoad(): Promise<void>;
}

interface Selector$1 {
    filter?: Filter$1;
    order_by?: ORDER_BY$1;
    relations?: Array<string>;
    fields?: Array<string>;
    omit?: Array<string>;
    offset?: number;
    limit?: number;
}

declare abstract class Adapter$1<M extends Model$1> {
    abstract __create(raw_data: RawData$1): Promise<RawObject$1>;
    abstract __update(obj_id: number, only_changed_raw_data: RawData$1): Promise<RawObject$1>;
    abstract __delete(obj_id: number): Promise<void>;
    abstract __action(obj_id: number, name: string, kwargs: Object): Promise<any>;
    abstract __get(obj_id: number): Promise<object>;
    abstract __find(props: Selector$1 | SelectorX$1): Promise<object>;
    abstract __load(props: Selector$1 | SelectorX$1): Promise<RawObject$1[]>;
    abstract getTotalCount(where?: any): Promise<number>;
    readonly model: any;
    constructor(model: any);
    action(obj: M, name: string, kwargs: Object): Promise<any>;
    create(obj: M): Promise<M>;
    update(obj: M): Promise<M>;
    delete(obj: M): Promise<M>;
    get(obj_id: number): Promise<M>;
    find(selector: Selector$1 | SelectorX$1): Promise<M>;
    load(selector?: Selector$1 | SelectorX$1): Promise<M[]>;
}

declare type RawObject$1 = any;
declare type RawData$1 = any;
declare abstract class Model$1 {
    static __adapter: Adapter$1<Model$1>;
    static __cache: Map<number, Model$1>;
    static __fields: {
        [field_name: string]: {
            decorator: (obj: Model$1, field_name: string) => void;
            settings: any;
            serialize: any;
            deserialize: any;
        };
    };
    static __relations: {
        [field_name: string]: {
            decorator: (obj: Model$1, field_name: string) => void;
            settings: any;
        };
    };
    static inject(obj: Model$1): void;
    static eject(obj: Model$1): void;
    static getQuery(selector?: Selector$1): Query$1<Model$1>;
    static getQueryPage(selector?: Selector$1): QueryPage$1<Model$1>;
    static get(id: number): Model$1;
    static findById(id: number): Promise<Model$1>;
    static find(selector: Selector$1): Promise<Model$1>;
    static updateCache(raw_obj: any): Model$1;
    static clearCache(): void;
    id: number | undefined;
    __init_data: any;
    __errors: any;
    __disposers: Map<any, any>;
    constructor(...args: any[]);
    get model(): any;
    get raw_data(): any;
    get raw_obj(): any;
    get only_changed_raw_data(): any;
    get is_changed(): boolean;
    action(name: string, kwargs: Object): Promise<any>;
    create(): Promise<any>;
    update(): Promise<any>;
    delete(): Promise<any>;
    save(): Promise<any>;
    refresh(): Promise<any>;
    setError(error: any): void;
    refreshInitData(): void;
    cancelLocalChanges(): void;
    updateFromRaw(raw_obj: any): void;
}

declare abstract class Value<T> {
    value: T;
    isReady: boolean;
    readonly options: Query$1<Model$1>;
    private __disposers;
    constructor(value?: T, options?: any);
    destroy(): void;
    abstract serialize(value?: string): T;
    abstract deserialize(value: T): string;
    toString(): string;
}
declare class StringValue extends Value<string | null | undefined> {
    serialize(value?: string): string | null | undefined;
    deserialize(value: string | null | undefined): string;
}
declare class NumberValue extends Value<number | null | undefined> {
    serialize(value?: string): number | null | undefined;
    deserialize(value: number | null | undefined): string;
}
declare class BoolValue extends Value<boolean | null | undefined> {
    serialize(value?: string): boolean | null | undefined;
    deserialize(value: boolean | null | undefined): string;
}
declare class DateTimeValue extends Value<Date | null | undefined> {
    serialize(value?: string): Date | null | undefined;
    deserialize(value: Date | null | undefined): string;
}
declare class DateValue extends Value<Date | null | undefined> {
    serialize(value?: string): Date;
    deserialize(value: Date | null | undefined): string;
}
declare class ArrayStringValue extends Value<string[]> {
    serialize(value?: string): string[];
    deserialize(value: string[]): string;
}
declare class ArrayNumberValue extends Value<number[]> {
    serialize(value?: string): number[];
    deserialize(value: number[]): string;
}

declare abstract class XSingleFilter extends XFilter$1 {
    readonly field: string;
    value: Value<any>;
    __disposers: (() => void)[];
    constructor(field: string, value: Value<any>);
    get isReady(): boolean;
    get URLSearchParams(): URLSearchParams;
    abstract get URIField(): string;
    setFromURI(uri: string): void;
    abstract operator(value_a: any, value_b: any): boolean;
    isMatch(obj: any): boolean;
}

declare abstract class XComboFilter extends XFilter$1 {
    readonly filters: XFilter$1[];
    constructor(filters?: XFilter$1[]);
    get isReady(): boolean;
    get URLSearchParams(): URLSearchParams;
    setFromURI(uri: string): void;
}

declare class XEQ_Filter extends XSingleFilter {
    get URIField(): string;
    operator(value_a: any, value_b: any): boolean;
}
declare class XEQV_Filter extends XEQ_Filter {
    get URIField(): string;
}
declare function XEQ(field: string, value: Value<any>): XSingleFilter;
declare function XEQV(field: string, value: Value<any>): XSingleFilter;

declare class XNOT_EQ_Filter extends XSingleFilter {
    get URIField(): string;
    operator(value_a: any, value_b: any): boolean;
}
declare function XNOT_EQ(field: string, value: Value<any>): XSingleFilter;

declare class XGT_Filter extends XSingleFilter {
    get URIField(): string;
    operator(value_a: any, value_b: any): boolean;
}
declare function XGT(field: string, value: Value<any>): XSingleFilter;

declare class XGTE_Filter extends XSingleFilter {
    get URIField(): string;
    operator(value_a: any, value_b: any): boolean;
}
declare function XGTE(field: string, value: Value<any>): XSingleFilter;

declare class XLT_Filter extends XSingleFilter {
    get URIField(): string;
    operator(value_a: any, value_b: any): boolean;
}
declare function XLT(field: string, value: Value<any>): XSingleFilter;

declare class XLTE_Filter extends XSingleFilter {
    get URIField(): string;
    operator(value_a: any, value_b: any): boolean;
}
declare function XLTE(field: string, value: Value<any>): XSingleFilter;

declare class XIN_Filter extends XSingleFilter {
    get URIField(): string;
    operator(value_a: any, value_b: any): boolean;
}
declare function XIN(field: string, value: Value<any>): XSingleFilter;

declare class XLIKE_Filter extends XSingleFilter {
    get URIField(): string;
    operator(current_value: any, filter_value: any): boolean;
}
declare function XLIKE(field: string, value: Value<any>): XSingleFilter;

declare class XILIKE_Filter extends XSingleFilter {
    get URIField(): string;
    operator(current_value: any, filter_value: any): boolean;
}
declare function XILIKE(field: string, value: Value<any>): XSingleFilter;

declare class XAND_Filter extends XComboFilter {
    isMatch(obj: any): boolean;
}
declare function XAND(...filters: XFilter$1[]): XFilter$1;

declare const ASC = true;
declare const DESC = false;
declare type ORDER_BY = Map<string, boolean>;
declare class SelectorX {
    filter?: XFilter$1;
    order_by?: ORDER_BY;
    offset?: number;
    limit?: number;
    relations?: Array<string>;
    fields?: Array<string>;
    omit?: Array<string>;
    constructor(filter?: XFilter$1, order_by?: ORDER_BY, offset?: number, limit?: number, relations?: string[], fields?: string[], omit?: string[]);
    get URLSearchParams(): URLSearchParams;
}

declare abstract class QueryBase<M extends Model> {
    filters: Filter;
    order_by: ORDER_BY;
    fields?: Array<string>;
    omit?: Array<string>;
    relations?: Array<string>;
    offset: number;
    limit: number;
    total: number;
    need_to_update: boolean;
    get is_loading(): boolean;
    get is_ready(): boolean;
    get error(): string;
    readonly __base_cache: any;
    readonly __adapter: Adapter<M>;
    __items: M[];
    __is_loading: boolean;
    __is_ready: boolean;
    __error: string;
    __disposers: (() => void)[];
    __disposer_objects: {
        [field: string]: () => void;
    };
    constructor(adapter: Adapter<M>, base_cache: any, selector?: Selector$2);
    destroy(): void;
    abstract get items(): any;
    abstract __load(objs: M[]): any;
    abstract shadowLoad(): any;
    load(): Promise<void>;
    get autoupdate(): boolean;
    set autoupdate(value: boolean);
    get selector(): Selector$2;
    ready(): Promise<Boolean>;
    loading(): Promise<Boolean>;
}

declare class Query<M extends Model> extends QueryBase<M> {
    constructor(adapter: Adapter<M>, base_cache: any, selector?: Selector$2);
    shadowLoad(): Promise<void>;
    get items(): M[];
    __load(objs: M[]): void;
    __watch_obj(obj: any): void;
}

declare class QueryPage<M extends Model> extends QueryBase<M> {
    __load(objs: M[]): void;
    setPageSize(size: number): void;
    setPage(n: number): void;
    goToFirstPage(): void;
    goToPrevPage(): void;
    goToNextPage(): void;
    goToLastPage(): void;
    get is_first_page(): boolean;
    get is_last_page(): boolean;
    get current_page(): number;
    get total_pages(): number;
    constructor(adapter: Adapter<M>, base_cache: any, selector?: Selector$2);
    get items(): M[];
    shadowLoad(): Promise<void>;
}

declare class QueryX<M extends Model> {
    total: number;
    need_to_update: boolean;
    get is_loading(): boolean;
    get is_ready(): boolean;
    get error(): string;
    readonly selector: SelectorX;
    readonly adapter: Adapter<M>;
    __items: M[];
    __is_loading: boolean;
    __is_ready: boolean;
    __error: string;
    __disposers: (() => void)[];
    __disposer_objects: {
        [field: string]: () => void;
    };
    constructor(adapter: Adapter<M>, selector?: SelectorX);
    destroy(): void;
    get items(): M[];
    __load(): Promise<void>;
    load(): Promise<void>;
    shadowLoad(): Promise<void>;
    get autoupdate(): boolean;
    set autoupdate(value: boolean);
    ready: () => Promise<Boolean>;
    loading: () => Promise<Boolean>;
}

declare class QueryXPage<M extends Model> extends QueryX<M> {
    setPageSize(size: number): void;
    setPage(n: number): void;
    goToFirstPage(): void;
    goToPrevPage(): void;
    goToNextPage(): void;
    goToLastPage(): void;
    get is_first_page(): boolean;
    get is_last_page(): boolean;
    get current_page(): number;
    get total_pages(): number;
    constructor(adapter: Adapter<M>, selector?: SelectorX);
    __load(): Promise<void>;
}

declare class QueryXSync<M extends Model> extends QueryX<M> {
    constructor(adapter: Adapter<M>, base_cache: any, selector?: SelectorX);
    __load(): Promise<void>;
    get items(): M[];
    __watch_obj(obj: any): void;
}

declare class QueryXInfinity<M extends Model> extends QueryX<M> {
    goToFirstPage(): void;
    goToNextPage(): void;
    constructor(adapter: Adapter<M>, selector?: SelectorX);
    __load(): Promise<void>;
}

declare enum ValueType {
    STRING = 0,
    NUMBER = 1,
    BOOL = 2,
    DATETIME = 3,
    DATE = 4
}
declare abstract class SingleFilter extends Filter {
    readonly field: string;
    readonly value_type: ValueType;
    value: any;
    options?: Query<Model>;
    __disposers: (() => void)[];
    constructor(field: string, value?: any, value_type?: ValueType, options?: Query<Model>);
    get URLSearchParams(): URLSearchParams;
    abstract get URIField(): string;
    set(value: any): void;
    setFromURI(uri: string): void;
    abstract operator(value_a: any, value_b: any): boolean;
    abstract alias(alias_field: any): SingleFilter;
    isMatch(obj: any): boolean;
    serialize(value: string | undefined): void;
    deserialize(value?: any): string;
}
declare function match(obj: any, field_name: string, filter_value: any, operator: (value_a: any, value_b: any) => boolean): boolean;

declare abstract class ComboFilter extends Filter {
    readonly filters: Filter[];
    constructor(filters?: Filter[]);
    get URLSearchParams(): URLSearchParams;
    setFromURI(uri: string): void;
}

declare class EQ_Filter extends SingleFilter {
    get URIField(): string;
    operator(value_a: any, value_b: any): boolean;
    alias(alias_field: any): SingleFilter;
}
declare class EQV_Filter extends EQ_Filter {
    get URIField(): string;
}
declare function EQ(field: string, value?: any, value_type?: ValueType): SingleFilter;
declare function EQV(field: string, value?: any, value_type?: ValueType): SingleFilter;

declare class NOT_EQ_Filter extends SingleFilter {
    get URIField(): string;
    operator(value_a: any, value_b: any): boolean;
    alias(alias_field: any): SingleFilter;
}
declare function NOT_EQ(field: string, value?: any, value_type?: ValueType): SingleFilter;

declare class GT_Filter extends SingleFilter {
    get URIField(): string;
    operator(value_a: any, value_b: any): boolean;
    alias(alias_field: any): SingleFilter;
}
declare function GT(field: string, value?: any, value_type?: ValueType): SingleFilter;

declare class GTE_Filter extends SingleFilter {
    get URIField(): string;
    operator(value_a: any, value_b: any): boolean;
    alias(alias_field: any): SingleFilter;
}
declare function GTE(field: string, value?: any, value_type?: ValueType): SingleFilter;

declare class LT_Filter extends SingleFilter {
    get URIField(): string;
    operator(value_a: any, value_b: any): boolean;
    alias(alias_field: any): SingleFilter;
}
declare function LT(field: string, value?: any, value_type?: ValueType): SingleFilter;

declare class LTE_Filter extends SingleFilter {
    get URIField(): string;
    operator(value_a: any, value_b: any): boolean;
    alias(alias_field: any): SingleFilter;
}
declare function LTE(field: string, value?: any, value_type?: ValueType): SingleFilter;

declare class IN_Filter extends SingleFilter {
    constructor(field: string, value?: any, value_type?: ValueType);
    alias(alias_field: any): SingleFilter;
    serialize(value: string | undefined): void;
    deserialize(): string;
    get URIField(): string;
    operator(value_a: any, value_b: any): boolean;
}
declare function IN(field: string, value?: any[], value_type?: ValueType): SingleFilter;

declare class LIKE_Filter extends SingleFilter {
    get URIField(): string;
    operator(current_value: any, filter_value: any): boolean;
    alias(alias_field: any): SingleFilter;
}
declare function LIKE(field: string, value?: any, value_type?: ValueType): SingleFilter;

declare class ILIKE_Filter extends SingleFilter {
    get URIField(): string;
    operator(current_value: any, filter_value: any): boolean;
    alias(alias_field: any): SingleFilter;
}
declare function ILIKE(field: string, value?: any, value_type?: ValueType): SingleFilter;

declare class AND_Filter extends ComboFilter {
    isMatch(obj: any): boolean;
}
declare function AND(...filters: Filter[]): Filter;

interface Selector {
    filter?: Filter;
    order_by?: ORDER_BY;
    relations?: Array<string>;
    fields?: Array<string>;
    omit?: Array<string>;
    offset?: number;
    limit?: number;
}

declare abstract class Adapter<M extends Model> {
    abstract __create(raw_data: RawData): Promise<RawObject>;
    abstract __update(obj_id: number, only_changed_raw_data: RawData): Promise<RawObject>;
    abstract __delete(obj_id: number): Promise<void>;
    abstract __action(obj_id: number, name: string, kwargs: Object): Promise<any>;
    abstract __get(obj_id: number): Promise<object>;
    abstract __find(props: Selector | SelectorX): Promise<object>;
    abstract __load(props: Selector | SelectorX): Promise<RawObject[]>;
    abstract getTotalCount(where?: any): Promise<number>;
    readonly model: any;
    constructor(model: any);
    action(obj: M, name: string, kwargs: Object): Promise<any>;
    create(obj: M): Promise<M>;
    update(obj: M): Promise<M>;
    delete(obj: M): Promise<M>;
    get(obj_id: number): Promise<M>;
    find(selector: Selector | SelectorX): Promise<M>;
    load(selector?: Selector | SelectorX): Promise<M[]>;
}

declare let local_store: {
    string?: {
        number: Model;
    };
};
declare class LocalAdapter<M extends Model> extends Adapter<M> {
    readonly store_name: string;
    delay: number;
    init_local_data(data: RawObject[]): void;
    constructor(model: any, store_name?: string);
    __action(obj_id: number, name: string, kwargs: Object): Promise<any>;
    __create(raw_data: RawData): Promise<RawObject>;
    __update(obj_id: number, only_changed_raw_data: RawData): Promise<RawObject>;
    __delete(obj_id: number): Promise<void>;
    __find(selector: Selector$2): Promise<RawObject>;
    __get(obj_id: number): Promise<RawObject>;
    __load(selector?: Selector$2): Promise<RawObject[]>;
    getTotalCount(where?: any): Promise<number>;
}
declare function local(): (cls: any) => void;

declare type RawObject = any;
declare type RawData = any;
declare abstract class Model {
    static __adapter: Adapter<Model>;
    static __cache: Map<number, Model>;
    static __fields: {
        [field_name: string]: {
            decorator: (obj: Model, field_name: string) => void;
            settings: any;
            serialize: any;
            deserialize: any;
        };
    };
    static __relations: {
        [field_name: string]: {
            decorator: (obj: Model, field_name: string) => void;
            settings: any;
        };
    };
    static inject(obj: Model): void;
    static eject(obj: Model): void;
    static getQuery(selector?: Selector): Query<Model>;
    static getQueryPage(selector?: Selector): QueryPage<Model>;
    static get(id: number): Model;
    static findById(id: number): Promise<Model>;
    static find(selector: Selector): Promise<Model>;
    static updateCache(raw_obj: any): Model;
    static clearCache(): void;
    id: number | undefined;
    __init_data: any;
    __errors: any;
    __disposers: Map<any, any>;
    constructor(...args: any[]);
    get model(): any;
    get raw_data(): any;
    get raw_obj(): any;
    get only_changed_raw_data(): any;
    get is_changed(): boolean;
    action(name: string, kwargs: Object): Promise<any>;
    create(): Promise<any>;
    update(): Promise<any>;
    delete(): Promise<any>;
    save(): Promise<any>;
    refresh(): Promise<any>;
    setError(error: any): void;
    refreshInitData(): void;
    cancelLocalChanges(): void;
    updateFromRaw(raw_obj: any): void;
}
declare function model(constructor: any): any;

declare abstract class ReadOnlyModel extends Model {
    create(): Promise<void>;
    update(): Promise<void>;
    delete(): Promise<void>;
    save(): Promise<void>;
}

declare function field_field(obj: any, field_name: any): void;
declare function field(cls: any, field_name: string): void;

declare function foreign(foreign_model: any, foreign_id_name?: string): (cls: any, field_name: string) => void;

declare function one(remote_model: any, remote_foreign_id_name?: string): (cls: any, field_name: string) => void;

declare function many(remote_model: any, remote_foreign_id_name?: string): (cls: any, field_name: string) => void;

declare function waitIsTrue(field_name: string): Promise<Boolean>;
declare function waitIsFalse(field_name: string): Promise<Boolean>;

export { AND, AND_Filter, ASC, Adapter, ArrayNumberValue, ArrayStringValue, BoolValue, ComboFilter, DESC, DateTimeValue, DateValue, EQ, EQV, EQV_Filter, EQ_Filter, Filter, GT, GTE, GTE_Filter, GT_Filter, ILIKE, ILIKE_Filter, IN, IN_Filter, LIKE, LIKE_Filter, LT, LTE, LTE_Filter, LT_Filter, LocalAdapter, Model, NOT_EQ, NOT_EQ_Filter, NumberValue, ORDER_BY, Query, QueryBase, QueryPage, QueryX, QueryXInfinity, QueryXPage, QueryXSync, RawData, RawObject, ReadOnlyModel, Selector, SelectorX, SingleFilter, StringValue, Value, ValueType, XAND, XAND_Filter, XComboFilter, XEQ, XEQV, XEQV_Filter, XEQ_Filter, XFilter$1 as XFilter, XGT, XGTE, XGTE_Filter, XGT_Filter, XILIKE, XILIKE_Filter, XIN, XIN_Filter, XLIKE, XLIKE_Filter, XLT, XLTE, XLTE_Filter, XLT_Filter, XNOT_EQ, XNOT_EQ_Filter, XSingleFilter, field, field_field, foreign, local, local_store, many, match, model, one, waitIsFalse, waitIsTrue };
