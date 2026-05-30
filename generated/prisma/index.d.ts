
/**
 * Client
**/

import * as runtime from './runtime/library.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model FarmerProfile
 * 
 */
export type FarmerProfile = $Result.DefaultSelection<Prisma.$FarmerProfilePayload>
/**
 * Model FarmActivityLog
 * 
 */
export type FarmActivityLog = $Result.DefaultSelection<Prisma.$FarmActivityLogPayload>

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more FarmerProfiles
 * const farmerProfiles = await prisma.farmerProfile.findMany()
 * ```
 *
 *
 * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  const U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   *
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient()
   * // Fetch zero or more FarmerProfiles
   * const farmerProfiles = await prisma.farmerProfile.findMany()
   * ```
   *
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
   */

  constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): PrismaClient;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;


  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/concepts/components/prisma-client/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>


  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb<ClientOptions>, ExtArgs, $Utils.Call<Prisma.TypeMapCb<ClientOptions>, {
    extArgs: ExtArgs
  }>>

      /**
   * `prisma.farmerProfile`: Exposes CRUD operations for the **FarmerProfile** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more FarmerProfiles
    * const farmerProfiles = await prisma.farmerProfile.findMany()
    * ```
    */
  get farmerProfile(): Prisma.FarmerProfileDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.farmActivityLog`: Exposes CRUD operations for the **FarmActivityLog** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more FarmActivityLogs
    * const farmActivityLogs = await prisma.farmActivityLog.findMany()
    * ```
    */
  get farmActivityLog(): Prisma.FarmActivityLogDelegate<ExtArgs, ClientOptions>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql



  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
   * Metrics
   */
  export type Metrics = runtime.Metrics
  export type Metric<T> = runtime.Metric<T>
  export type MetricHistogram = runtime.MetricHistogram
  export type MetricHistogramBucket = runtime.MetricHistogramBucket

  /**
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 6.19.3
   * Query Engine version: c2990dca591cba766e3b7ef5d9e8a84796e47ab7
   */
  export type PrismaVersion = {
    client: string
  }

  export const prismaVersion: PrismaVersion

  /**
   * Utility Types
   */


  export import Bytes = runtime.Bytes
  export import JsonObject = runtime.JsonObject
  export import JsonArray = runtime.JsonArray
  export import JsonValue = runtime.JsonValue
  export import InputJsonObject = runtime.InputJsonObject
  export import InputJsonArray = runtime.InputJsonArray
  export import InputJsonValue = runtime.InputJsonValue

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }

  type SelectAndOmit = {
    select: any
    omit: any
  }

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : T extends SelectAndOmit
        ? 'Please either choose `select` or `omit`.'
        : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? P : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;



  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
    FarmerProfile: 'FarmerProfile',
    FarmActivityLog: 'FarmActivityLog'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]


  export type Datasources = {
    db?: Datasource
  }

  interface TypeMapCb<ClientOptions = {}> extends $Utils.Fn<{extArgs: $Extensions.InternalArgs }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], ClientOptions extends { omit: infer OmitOptions } ? OmitOptions : {}>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> = {
    globalOmitOptions: {
      omit: GlobalOmitOptions
    }
    meta: {
      modelProps: "farmerProfile" | "farmActivityLog"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      FarmerProfile: {
        payload: Prisma.$FarmerProfilePayload<ExtArgs>
        fields: Prisma.FarmerProfileFieldRefs
        operations: {
          findUnique: {
            args: Prisma.FarmerProfileFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FarmerProfilePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.FarmerProfileFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FarmerProfilePayload>
          }
          findFirst: {
            args: Prisma.FarmerProfileFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FarmerProfilePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.FarmerProfileFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FarmerProfilePayload>
          }
          findMany: {
            args: Prisma.FarmerProfileFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FarmerProfilePayload>[]
          }
          create: {
            args: Prisma.FarmerProfileCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FarmerProfilePayload>
          }
          createMany: {
            args: Prisma.FarmerProfileCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.FarmerProfileCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FarmerProfilePayload>[]
          }
          delete: {
            args: Prisma.FarmerProfileDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FarmerProfilePayload>
          }
          update: {
            args: Prisma.FarmerProfileUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FarmerProfilePayload>
          }
          deleteMany: {
            args: Prisma.FarmerProfileDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.FarmerProfileUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.FarmerProfileUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FarmerProfilePayload>[]
          }
          upsert: {
            args: Prisma.FarmerProfileUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FarmerProfilePayload>
          }
          aggregate: {
            args: Prisma.FarmerProfileAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateFarmerProfile>
          }
          groupBy: {
            args: Prisma.FarmerProfileGroupByArgs<ExtArgs>
            result: $Utils.Optional<FarmerProfileGroupByOutputType>[]
          }
          count: {
            args: Prisma.FarmerProfileCountArgs<ExtArgs>
            result: $Utils.Optional<FarmerProfileCountAggregateOutputType> | number
          }
        }
      }
      FarmActivityLog: {
        payload: Prisma.$FarmActivityLogPayload<ExtArgs>
        fields: Prisma.FarmActivityLogFieldRefs
        operations: {
          findUnique: {
            args: Prisma.FarmActivityLogFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FarmActivityLogPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.FarmActivityLogFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FarmActivityLogPayload>
          }
          findFirst: {
            args: Prisma.FarmActivityLogFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FarmActivityLogPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.FarmActivityLogFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FarmActivityLogPayload>
          }
          findMany: {
            args: Prisma.FarmActivityLogFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FarmActivityLogPayload>[]
          }
          create: {
            args: Prisma.FarmActivityLogCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FarmActivityLogPayload>
          }
          createMany: {
            args: Prisma.FarmActivityLogCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.FarmActivityLogCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FarmActivityLogPayload>[]
          }
          delete: {
            args: Prisma.FarmActivityLogDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FarmActivityLogPayload>
          }
          update: {
            args: Prisma.FarmActivityLogUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FarmActivityLogPayload>
          }
          deleteMany: {
            args: Prisma.FarmActivityLogDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.FarmActivityLogUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.FarmActivityLogUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FarmActivityLogPayload>[]
          }
          upsert: {
            args: Prisma.FarmActivityLogUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FarmActivityLogPayload>
          }
          aggregate: {
            args: Prisma.FarmActivityLogAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateFarmActivityLog>
          }
          groupBy: {
            args: Prisma.FarmActivityLogGroupByArgs<ExtArgs>
            result: $Utils.Optional<FarmActivityLogGroupByOutputType>[]
          }
          count: {
            args: Prisma.FarmActivityLogCountArgs<ExtArgs>
            result: $Utils.Optional<FarmActivityLogCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<"define", Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasources?: Datasources
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasourceUrl?: string
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Shorthand for `emit: 'stdout'`
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events only
     * log: [
     *   { emit: 'event', level: 'query' },
     *   { emit: 'event', level: 'info' },
     *   { emit: 'event', level: 'warn' }
     *   { emit: 'event', level: 'error' }
     * ]
     * 
     * / Emit as events and log to stdout
     * og: [
     *  { emit: 'stdout', level: 'query' },
     *  { emit: 'stdout', level: 'info' },
     *  { emit: 'stdout', level: 'warn' }
     *  { emit: 'stdout', level: 'error' }
     * 
     * ```
     * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/logging#the-log-option).
     */
    log?: (LogLevel | LogDefinition)[]
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number
      timeout?: number
      isolationLevel?: Prisma.TransactionIsolationLevel
    }
    /**
     * Instance of a Driver Adapter, e.g., like one provided by `@prisma/adapter-planetscale`
     */
    adapter?: runtime.SqlDriverAdapterFactory | null
    /**
     * Global configuration for omitting model fields by default.
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   omit: {
     *     user: {
     *       password: true
     *     }
     *   }
     * })
     * ```
     */
    omit?: Prisma.GlobalOmitConfig
  }
  export type GlobalOmitConfig = {
    farmerProfile?: FarmerProfileOmit
    farmActivityLog?: FarmActivityLogOmit
  }

  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type CheckIsLogLevel<T> = T extends LogLevel ? T : never;

  export type GetLogType<T> = CheckIsLogLevel<
    T extends LogDefinition ? T['level'] : T
  >;

  export type GetEvents<T extends any[]> = T extends Array<LogLevel | LogDefinition>
    ? GetLogType<T[number]>
    : never;

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'createManyAndReturn'
    | 'update'
    | 'updateMany'
    | 'updateManyAndReturn'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy'

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */


  /**
   * Count Type FarmerProfileCountOutputType
   */

  export type FarmerProfileCountOutputType = {
    logs: number
  }

  export type FarmerProfileCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    logs?: boolean | FarmerProfileCountOutputTypeCountLogsArgs
  }

  // Custom InputTypes
  /**
   * FarmerProfileCountOutputType without action
   */
  export type FarmerProfileCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FarmerProfileCountOutputType
     */
    select?: FarmerProfileCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * FarmerProfileCountOutputType without action
   */
  export type FarmerProfileCountOutputTypeCountLogsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: FarmActivityLogWhereInput
  }


  /**
   * Models
   */

  /**
   * Model FarmerProfile
   */

  export type AggregateFarmerProfile = {
    _count: FarmerProfileCountAggregateOutputType | null
    _avg: FarmerProfileAvgAggregateOutputType | null
    _sum: FarmerProfileSumAggregateOutputType | null
    _min: FarmerProfileMinAggregateOutputType | null
    _max: FarmerProfileMaxAggregateOutputType | null
  }

  export type FarmerProfileAvgAggregateOutputType = {
    id: number | null
    landSize: number | null
  }

  export type FarmerProfileSumAggregateOutputType = {
    id: number | null
    landSize: number | null
  }

  export type FarmerProfileMinAggregateOutputType = {
    id: number | null
    userId: string | null
    name: string | null
    district: string | null
    zone: string | null
    soilType: string | null
    landSize: number | null
    crops: string | null
    isIrrigated: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type FarmerProfileMaxAggregateOutputType = {
    id: number | null
    userId: string | null
    name: string | null
    district: string | null
    zone: string | null
    soilType: string | null
    landSize: number | null
    crops: string | null
    isIrrigated: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type FarmerProfileCountAggregateOutputType = {
    id: number
    userId: number
    name: number
    district: number
    zone: number
    soilType: number
    landSize: number
    crops: number
    isIrrigated: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type FarmerProfileAvgAggregateInputType = {
    id?: true
    landSize?: true
  }

  export type FarmerProfileSumAggregateInputType = {
    id?: true
    landSize?: true
  }

  export type FarmerProfileMinAggregateInputType = {
    id?: true
    userId?: true
    name?: true
    district?: true
    zone?: true
    soilType?: true
    landSize?: true
    crops?: true
    isIrrigated?: true
    createdAt?: true
    updatedAt?: true
  }

  export type FarmerProfileMaxAggregateInputType = {
    id?: true
    userId?: true
    name?: true
    district?: true
    zone?: true
    soilType?: true
    landSize?: true
    crops?: true
    isIrrigated?: true
    createdAt?: true
    updatedAt?: true
  }

  export type FarmerProfileCountAggregateInputType = {
    id?: true
    userId?: true
    name?: true
    district?: true
    zone?: true
    soilType?: true
    landSize?: true
    crops?: true
    isIrrigated?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type FarmerProfileAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which FarmerProfile to aggregate.
     */
    where?: FarmerProfileWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of FarmerProfiles to fetch.
     */
    orderBy?: FarmerProfileOrderByWithRelationInput | FarmerProfileOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: FarmerProfileWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` FarmerProfiles from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` FarmerProfiles.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned FarmerProfiles
    **/
    _count?: true | FarmerProfileCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: FarmerProfileAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: FarmerProfileSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: FarmerProfileMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: FarmerProfileMaxAggregateInputType
  }

  export type GetFarmerProfileAggregateType<T extends FarmerProfileAggregateArgs> = {
        [P in keyof T & keyof AggregateFarmerProfile]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateFarmerProfile[P]>
      : GetScalarType<T[P], AggregateFarmerProfile[P]>
  }




  export type FarmerProfileGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: FarmerProfileWhereInput
    orderBy?: FarmerProfileOrderByWithAggregationInput | FarmerProfileOrderByWithAggregationInput[]
    by: FarmerProfileScalarFieldEnum[] | FarmerProfileScalarFieldEnum
    having?: FarmerProfileScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: FarmerProfileCountAggregateInputType | true
    _avg?: FarmerProfileAvgAggregateInputType
    _sum?: FarmerProfileSumAggregateInputType
    _min?: FarmerProfileMinAggregateInputType
    _max?: FarmerProfileMaxAggregateInputType
  }

  export type FarmerProfileGroupByOutputType = {
    id: number
    userId: string
    name: string
    district: string
    zone: string
    soilType: string
    landSize: number
    crops: string
    isIrrigated: boolean
    createdAt: Date
    updatedAt: Date
    _count: FarmerProfileCountAggregateOutputType | null
    _avg: FarmerProfileAvgAggregateOutputType | null
    _sum: FarmerProfileSumAggregateOutputType | null
    _min: FarmerProfileMinAggregateOutputType | null
    _max: FarmerProfileMaxAggregateOutputType | null
  }

  type GetFarmerProfileGroupByPayload<T extends FarmerProfileGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<FarmerProfileGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof FarmerProfileGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], FarmerProfileGroupByOutputType[P]>
            : GetScalarType<T[P], FarmerProfileGroupByOutputType[P]>
        }
      >
    >


  export type FarmerProfileSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    name?: boolean
    district?: boolean
    zone?: boolean
    soilType?: boolean
    landSize?: boolean
    crops?: boolean
    isIrrigated?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    logs?: boolean | FarmerProfile$logsArgs<ExtArgs>
    _count?: boolean | FarmerProfileCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["farmerProfile"]>

  export type FarmerProfileSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    name?: boolean
    district?: boolean
    zone?: boolean
    soilType?: boolean
    landSize?: boolean
    crops?: boolean
    isIrrigated?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["farmerProfile"]>

  export type FarmerProfileSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    name?: boolean
    district?: boolean
    zone?: boolean
    soilType?: boolean
    landSize?: boolean
    crops?: boolean
    isIrrigated?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["farmerProfile"]>

  export type FarmerProfileSelectScalar = {
    id?: boolean
    userId?: boolean
    name?: boolean
    district?: boolean
    zone?: boolean
    soilType?: boolean
    landSize?: boolean
    crops?: boolean
    isIrrigated?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type FarmerProfileOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "userId" | "name" | "district" | "zone" | "soilType" | "landSize" | "crops" | "isIrrigated" | "createdAt" | "updatedAt", ExtArgs["result"]["farmerProfile"]>
  export type FarmerProfileInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    logs?: boolean | FarmerProfile$logsArgs<ExtArgs>
    _count?: boolean | FarmerProfileCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type FarmerProfileIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type FarmerProfileIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $FarmerProfilePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "FarmerProfile"
    objects: {
      logs: Prisma.$FarmActivityLogPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      userId: string
      name: string
      district: string
      zone: string
      soilType: string
      landSize: number
      crops: string
      isIrrigated: boolean
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["farmerProfile"]>
    composites: {}
  }

  type FarmerProfileGetPayload<S extends boolean | null | undefined | FarmerProfileDefaultArgs> = $Result.GetResult<Prisma.$FarmerProfilePayload, S>

  type FarmerProfileCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<FarmerProfileFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: FarmerProfileCountAggregateInputType | true
    }

  export interface FarmerProfileDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['FarmerProfile'], meta: { name: 'FarmerProfile' } }
    /**
     * Find zero or one FarmerProfile that matches the filter.
     * @param {FarmerProfileFindUniqueArgs} args - Arguments to find a FarmerProfile
     * @example
     * // Get one FarmerProfile
     * const farmerProfile = await prisma.farmerProfile.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends FarmerProfileFindUniqueArgs>(args: SelectSubset<T, FarmerProfileFindUniqueArgs<ExtArgs>>): Prisma__FarmerProfileClient<$Result.GetResult<Prisma.$FarmerProfilePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one FarmerProfile that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {FarmerProfileFindUniqueOrThrowArgs} args - Arguments to find a FarmerProfile
     * @example
     * // Get one FarmerProfile
     * const farmerProfile = await prisma.farmerProfile.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends FarmerProfileFindUniqueOrThrowArgs>(args: SelectSubset<T, FarmerProfileFindUniqueOrThrowArgs<ExtArgs>>): Prisma__FarmerProfileClient<$Result.GetResult<Prisma.$FarmerProfilePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first FarmerProfile that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FarmerProfileFindFirstArgs} args - Arguments to find a FarmerProfile
     * @example
     * // Get one FarmerProfile
     * const farmerProfile = await prisma.farmerProfile.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends FarmerProfileFindFirstArgs>(args?: SelectSubset<T, FarmerProfileFindFirstArgs<ExtArgs>>): Prisma__FarmerProfileClient<$Result.GetResult<Prisma.$FarmerProfilePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first FarmerProfile that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FarmerProfileFindFirstOrThrowArgs} args - Arguments to find a FarmerProfile
     * @example
     * // Get one FarmerProfile
     * const farmerProfile = await prisma.farmerProfile.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends FarmerProfileFindFirstOrThrowArgs>(args?: SelectSubset<T, FarmerProfileFindFirstOrThrowArgs<ExtArgs>>): Prisma__FarmerProfileClient<$Result.GetResult<Prisma.$FarmerProfilePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more FarmerProfiles that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FarmerProfileFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all FarmerProfiles
     * const farmerProfiles = await prisma.farmerProfile.findMany()
     * 
     * // Get first 10 FarmerProfiles
     * const farmerProfiles = await prisma.farmerProfile.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const farmerProfileWithIdOnly = await prisma.farmerProfile.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends FarmerProfileFindManyArgs>(args?: SelectSubset<T, FarmerProfileFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$FarmerProfilePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a FarmerProfile.
     * @param {FarmerProfileCreateArgs} args - Arguments to create a FarmerProfile.
     * @example
     * // Create one FarmerProfile
     * const FarmerProfile = await prisma.farmerProfile.create({
     *   data: {
     *     // ... data to create a FarmerProfile
     *   }
     * })
     * 
     */
    create<T extends FarmerProfileCreateArgs>(args: SelectSubset<T, FarmerProfileCreateArgs<ExtArgs>>): Prisma__FarmerProfileClient<$Result.GetResult<Prisma.$FarmerProfilePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many FarmerProfiles.
     * @param {FarmerProfileCreateManyArgs} args - Arguments to create many FarmerProfiles.
     * @example
     * // Create many FarmerProfiles
     * const farmerProfile = await prisma.farmerProfile.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends FarmerProfileCreateManyArgs>(args?: SelectSubset<T, FarmerProfileCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many FarmerProfiles and returns the data saved in the database.
     * @param {FarmerProfileCreateManyAndReturnArgs} args - Arguments to create many FarmerProfiles.
     * @example
     * // Create many FarmerProfiles
     * const farmerProfile = await prisma.farmerProfile.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many FarmerProfiles and only return the `id`
     * const farmerProfileWithIdOnly = await prisma.farmerProfile.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends FarmerProfileCreateManyAndReturnArgs>(args?: SelectSubset<T, FarmerProfileCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$FarmerProfilePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a FarmerProfile.
     * @param {FarmerProfileDeleteArgs} args - Arguments to delete one FarmerProfile.
     * @example
     * // Delete one FarmerProfile
     * const FarmerProfile = await prisma.farmerProfile.delete({
     *   where: {
     *     // ... filter to delete one FarmerProfile
     *   }
     * })
     * 
     */
    delete<T extends FarmerProfileDeleteArgs>(args: SelectSubset<T, FarmerProfileDeleteArgs<ExtArgs>>): Prisma__FarmerProfileClient<$Result.GetResult<Prisma.$FarmerProfilePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one FarmerProfile.
     * @param {FarmerProfileUpdateArgs} args - Arguments to update one FarmerProfile.
     * @example
     * // Update one FarmerProfile
     * const farmerProfile = await prisma.farmerProfile.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends FarmerProfileUpdateArgs>(args: SelectSubset<T, FarmerProfileUpdateArgs<ExtArgs>>): Prisma__FarmerProfileClient<$Result.GetResult<Prisma.$FarmerProfilePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more FarmerProfiles.
     * @param {FarmerProfileDeleteManyArgs} args - Arguments to filter FarmerProfiles to delete.
     * @example
     * // Delete a few FarmerProfiles
     * const { count } = await prisma.farmerProfile.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends FarmerProfileDeleteManyArgs>(args?: SelectSubset<T, FarmerProfileDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more FarmerProfiles.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FarmerProfileUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many FarmerProfiles
     * const farmerProfile = await prisma.farmerProfile.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends FarmerProfileUpdateManyArgs>(args: SelectSubset<T, FarmerProfileUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more FarmerProfiles and returns the data updated in the database.
     * @param {FarmerProfileUpdateManyAndReturnArgs} args - Arguments to update many FarmerProfiles.
     * @example
     * // Update many FarmerProfiles
     * const farmerProfile = await prisma.farmerProfile.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more FarmerProfiles and only return the `id`
     * const farmerProfileWithIdOnly = await prisma.farmerProfile.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends FarmerProfileUpdateManyAndReturnArgs>(args: SelectSubset<T, FarmerProfileUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$FarmerProfilePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one FarmerProfile.
     * @param {FarmerProfileUpsertArgs} args - Arguments to update or create a FarmerProfile.
     * @example
     * // Update or create a FarmerProfile
     * const farmerProfile = await prisma.farmerProfile.upsert({
     *   create: {
     *     // ... data to create a FarmerProfile
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the FarmerProfile we want to update
     *   }
     * })
     */
    upsert<T extends FarmerProfileUpsertArgs>(args: SelectSubset<T, FarmerProfileUpsertArgs<ExtArgs>>): Prisma__FarmerProfileClient<$Result.GetResult<Prisma.$FarmerProfilePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of FarmerProfiles.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FarmerProfileCountArgs} args - Arguments to filter FarmerProfiles to count.
     * @example
     * // Count the number of FarmerProfiles
     * const count = await prisma.farmerProfile.count({
     *   where: {
     *     // ... the filter for the FarmerProfiles we want to count
     *   }
     * })
    **/
    count<T extends FarmerProfileCountArgs>(
      args?: Subset<T, FarmerProfileCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], FarmerProfileCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a FarmerProfile.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FarmerProfileAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends FarmerProfileAggregateArgs>(args: Subset<T, FarmerProfileAggregateArgs>): Prisma.PrismaPromise<GetFarmerProfileAggregateType<T>>

    /**
     * Group by FarmerProfile.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FarmerProfileGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends FarmerProfileGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: FarmerProfileGroupByArgs['orderBy'] }
        : { orderBy?: FarmerProfileGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, FarmerProfileGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetFarmerProfileGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the FarmerProfile model
   */
  readonly fields: FarmerProfileFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for FarmerProfile.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__FarmerProfileClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    logs<T extends FarmerProfile$logsArgs<ExtArgs> = {}>(args?: Subset<T, FarmerProfile$logsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$FarmActivityLogPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the FarmerProfile model
   */
  interface FarmerProfileFieldRefs {
    readonly id: FieldRef<"FarmerProfile", 'Int'>
    readonly userId: FieldRef<"FarmerProfile", 'String'>
    readonly name: FieldRef<"FarmerProfile", 'String'>
    readonly district: FieldRef<"FarmerProfile", 'String'>
    readonly zone: FieldRef<"FarmerProfile", 'String'>
    readonly soilType: FieldRef<"FarmerProfile", 'String'>
    readonly landSize: FieldRef<"FarmerProfile", 'Float'>
    readonly crops: FieldRef<"FarmerProfile", 'String'>
    readonly isIrrigated: FieldRef<"FarmerProfile", 'Boolean'>
    readonly createdAt: FieldRef<"FarmerProfile", 'DateTime'>
    readonly updatedAt: FieldRef<"FarmerProfile", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * FarmerProfile findUnique
   */
  export type FarmerProfileFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FarmerProfile
     */
    select?: FarmerProfileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the FarmerProfile
     */
    omit?: FarmerProfileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FarmerProfileInclude<ExtArgs> | null
    /**
     * Filter, which FarmerProfile to fetch.
     */
    where: FarmerProfileWhereUniqueInput
  }

  /**
   * FarmerProfile findUniqueOrThrow
   */
  export type FarmerProfileFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FarmerProfile
     */
    select?: FarmerProfileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the FarmerProfile
     */
    omit?: FarmerProfileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FarmerProfileInclude<ExtArgs> | null
    /**
     * Filter, which FarmerProfile to fetch.
     */
    where: FarmerProfileWhereUniqueInput
  }

  /**
   * FarmerProfile findFirst
   */
  export type FarmerProfileFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FarmerProfile
     */
    select?: FarmerProfileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the FarmerProfile
     */
    omit?: FarmerProfileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FarmerProfileInclude<ExtArgs> | null
    /**
     * Filter, which FarmerProfile to fetch.
     */
    where?: FarmerProfileWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of FarmerProfiles to fetch.
     */
    orderBy?: FarmerProfileOrderByWithRelationInput | FarmerProfileOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for FarmerProfiles.
     */
    cursor?: FarmerProfileWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` FarmerProfiles from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` FarmerProfiles.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of FarmerProfiles.
     */
    distinct?: FarmerProfileScalarFieldEnum | FarmerProfileScalarFieldEnum[]
  }

  /**
   * FarmerProfile findFirstOrThrow
   */
  export type FarmerProfileFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FarmerProfile
     */
    select?: FarmerProfileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the FarmerProfile
     */
    omit?: FarmerProfileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FarmerProfileInclude<ExtArgs> | null
    /**
     * Filter, which FarmerProfile to fetch.
     */
    where?: FarmerProfileWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of FarmerProfiles to fetch.
     */
    orderBy?: FarmerProfileOrderByWithRelationInput | FarmerProfileOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for FarmerProfiles.
     */
    cursor?: FarmerProfileWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` FarmerProfiles from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` FarmerProfiles.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of FarmerProfiles.
     */
    distinct?: FarmerProfileScalarFieldEnum | FarmerProfileScalarFieldEnum[]
  }

  /**
   * FarmerProfile findMany
   */
  export type FarmerProfileFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FarmerProfile
     */
    select?: FarmerProfileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the FarmerProfile
     */
    omit?: FarmerProfileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FarmerProfileInclude<ExtArgs> | null
    /**
     * Filter, which FarmerProfiles to fetch.
     */
    where?: FarmerProfileWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of FarmerProfiles to fetch.
     */
    orderBy?: FarmerProfileOrderByWithRelationInput | FarmerProfileOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing FarmerProfiles.
     */
    cursor?: FarmerProfileWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` FarmerProfiles from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` FarmerProfiles.
     */
    skip?: number
    distinct?: FarmerProfileScalarFieldEnum | FarmerProfileScalarFieldEnum[]
  }

  /**
   * FarmerProfile create
   */
  export type FarmerProfileCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FarmerProfile
     */
    select?: FarmerProfileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the FarmerProfile
     */
    omit?: FarmerProfileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FarmerProfileInclude<ExtArgs> | null
    /**
     * The data needed to create a FarmerProfile.
     */
    data: XOR<FarmerProfileCreateInput, FarmerProfileUncheckedCreateInput>
  }

  /**
   * FarmerProfile createMany
   */
  export type FarmerProfileCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many FarmerProfiles.
     */
    data: FarmerProfileCreateManyInput | FarmerProfileCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * FarmerProfile createManyAndReturn
   */
  export type FarmerProfileCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FarmerProfile
     */
    select?: FarmerProfileSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the FarmerProfile
     */
    omit?: FarmerProfileOmit<ExtArgs> | null
    /**
     * The data used to create many FarmerProfiles.
     */
    data: FarmerProfileCreateManyInput | FarmerProfileCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * FarmerProfile update
   */
  export type FarmerProfileUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FarmerProfile
     */
    select?: FarmerProfileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the FarmerProfile
     */
    omit?: FarmerProfileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FarmerProfileInclude<ExtArgs> | null
    /**
     * The data needed to update a FarmerProfile.
     */
    data: XOR<FarmerProfileUpdateInput, FarmerProfileUncheckedUpdateInput>
    /**
     * Choose, which FarmerProfile to update.
     */
    where: FarmerProfileWhereUniqueInput
  }

  /**
   * FarmerProfile updateMany
   */
  export type FarmerProfileUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update FarmerProfiles.
     */
    data: XOR<FarmerProfileUpdateManyMutationInput, FarmerProfileUncheckedUpdateManyInput>
    /**
     * Filter which FarmerProfiles to update
     */
    where?: FarmerProfileWhereInput
    /**
     * Limit how many FarmerProfiles to update.
     */
    limit?: number
  }

  /**
   * FarmerProfile updateManyAndReturn
   */
  export type FarmerProfileUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FarmerProfile
     */
    select?: FarmerProfileSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the FarmerProfile
     */
    omit?: FarmerProfileOmit<ExtArgs> | null
    /**
     * The data used to update FarmerProfiles.
     */
    data: XOR<FarmerProfileUpdateManyMutationInput, FarmerProfileUncheckedUpdateManyInput>
    /**
     * Filter which FarmerProfiles to update
     */
    where?: FarmerProfileWhereInput
    /**
     * Limit how many FarmerProfiles to update.
     */
    limit?: number
  }

  /**
   * FarmerProfile upsert
   */
  export type FarmerProfileUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FarmerProfile
     */
    select?: FarmerProfileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the FarmerProfile
     */
    omit?: FarmerProfileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FarmerProfileInclude<ExtArgs> | null
    /**
     * The filter to search for the FarmerProfile to update in case it exists.
     */
    where: FarmerProfileWhereUniqueInput
    /**
     * In case the FarmerProfile found by the `where` argument doesn't exist, create a new FarmerProfile with this data.
     */
    create: XOR<FarmerProfileCreateInput, FarmerProfileUncheckedCreateInput>
    /**
     * In case the FarmerProfile was found with the provided `where` argument, update it with this data.
     */
    update: XOR<FarmerProfileUpdateInput, FarmerProfileUncheckedUpdateInput>
  }

  /**
   * FarmerProfile delete
   */
  export type FarmerProfileDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FarmerProfile
     */
    select?: FarmerProfileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the FarmerProfile
     */
    omit?: FarmerProfileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FarmerProfileInclude<ExtArgs> | null
    /**
     * Filter which FarmerProfile to delete.
     */
    where: FarmerProfileWhereUniqueInput
  }

  /**
   * FarmerProfile deleteMany
   */
  export type FarmerProfileDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which FarmerProfiles to delete
     */
    where?: FarmerProfileWhereInput
    /**
     * Limit how many FarmerProfiles to delete.
     */
    limit?: number
  }

  /**
   * FarmerProfile.logs
   */
  export type FarmerProfile$logsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FarmActivityLog
     */
    select?: FarmActivityLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the FarmActivityLog
     */
    omit?: FarmActivityLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FarmActivityLogInclude<ExtArgs> | null
    where?: FarmActivityLogWhereInput
    orderBy?: FarmActivityLogOrderByWithRelationInput | FarmActivityLogOrderByWithRelationInput[]
    cursor?: FarmActivityLogWhereUniqueInput
    take?: number
    skip?: number
    distinct?: FarmActivityLogScalarFieldEnum | FarmActivityLogScalarFieldEnum[]
  }

  /**
   * FarmerProfile without action
   */
  export type FarmerProfileDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FarmerProfile
     */
    select?: FarmerProfileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the FarmerProfile
     */
    omit?: FarmerProfileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FarmerProfileInclude<ExtArgs> | null
  }


  /**
   * Model FarmActivityLog
   */

  export type AggregateFarmActivityLog = {
    _count: FarmActivityLogCountAggregateOutputType | null
    _avg: FarmActivityLogAvgAggregateOutputType | null
    _sum: FarmActivityLogSumAggregateOutputType | null
    _min: FarmActivityLogMinAggregateOutputType | null
    _max: FarmActivityLogMaxAggregateOutputType | null
  }

  export type FarmActivityLogAvgAggregateOutputType = {
    id: number | null
    profileId: number | null
  }

  export type FarmActivityLogSumAggregateOutputType = {
    id: number | null
    profileId: number | null
  }

  export type FarmActivityLogMinAggregateOutputType = {
    id: number | null
    profileId: number | null
    category: string | null
    notes: string | null
    timestamp: Date | null
  }

  export type FarmActivityLogMaxAggregateOutputType = {
    id: number | null
    profileId: number | null
    category: string | null
    notes: string | null
    timestamp: Date | null
  }

  export type FarmActivityLogCountAggregateOutputType = {
    id: number
    profileId: number
    category: number
    notes: number
    timestamp: number
    _all: number
  }


  export type FarmActivityLogAvgAggregateInputType = {
    id?: true
    profileId?: true
  }

  export type FarmActivityLogSumAggregateInputType = {
    id?: true
    profileId?: true
  }

  export type FarmActivityLogMinAggregateInputType = {
    id?: true
    profileId?: true
    category?: true
    notes?: true
    timestamp?: true
  }

  export type FarmActivityLogMaxAggregateInputType = {
    id?: true
    profileId?: true
    category?: true
    notes?: true
    timestamp?: true
  }

  export type FarmActivityLogCountAggregateInputType = {
    id?: true
    profileId?: true
    category?: true
    notes?: true
    timestamp?: true
    _all?: true
  }

  export type FarmActivityLogAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which FarmActivityLog to aggregate.
     */
    where?: FarmActivityLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of FarmActivityLogs to fetch.
     */
    orderBy?: FarmActivityLogOrderByWithRelationInput | FarmActivityLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: FarmActivityLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` FarmActivityLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` FarmActivityLogs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned FarmActivityLogs
    **/
    _count?: true | FarmActivityLogCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: FarmActivityLogAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: FarmActivityLogSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: FarmActivityLogMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: FarmActivityLogMaxAggregateInputType
  }

  export type GetFarmActivityLogAggregateType<T extends FarmActivityLogAggregateArgs> = {
        [P in keyof T & keyof AggregateFarmActivityLog]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateFarmActivityLog[P]>
      : GetScalarType<T[P], AggregateFarmActivityLog[P]>
  }




  export type FarmActivityLogGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: FarmActivityLogWhereInput
    orderBy?: FarmActivityLogOrderByWithAggregationInput | FarmActivityLogOrderByWithAggregationInput[]
    by: FarmActivityLogScalarFieldEnum[] | FarmActivityLogScalarFieldEnum
    having?: FarmActivityLogScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: FarmActivityLogCountAggregateInputType | true
    _avg?: FarmActivityLogAvgAggregateInputType
    _sum?: FarmActivityLogSumAggregateInputType
    _min?: FarmActivityLogMinAggregateInputType
    _max?: FarmActivityLogMaxAggregateInputType
  }

  export type FarmActivityLogGroupByOutputType = {
    id: number
    profileId: number
    category: string
    notes: string
    timestamp: Date
    _count: FarmActivityLogCountAggregateOutputType | null
    _avg: FarmActivityLogAvgAggregateOutputType | null
    _sum: FarmActivityLogSumAggregateOutputType | null
    _min: FarmActivityLogMinAggregateOutputType | null
    _max: FarmActivityLogMaxAggregateOutputType | null
  }

  type GetFarmActivityLogGroupByPayload<T extends FarmActivityLogGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<FarmActivityLogGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof FarmActivityLogGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], FarmActivityLogGroupByOutputType[P]>
            : GetScalarType<T[P], FarmActivityLogGroupByOutputType[P]>
        }
      >
    >


  export type FarmActivityLogSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    profileId?: boolean
    category?: boolean
    notes?: boolean
    timestamp?: boolean
    profile?: boolean | FarmerProfileDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["farmActivityLog"]>

  export type FarmActivityLogSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    profileId?: boolean
    category?: boolean
    notes?: boolean
    timestamp?: boolean
    profile?: boolean | FarmerProfileDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["farmActivityLog"]>

  export type FarmActivityLogSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    profileId?: boolean
    category?: boolean
    notes?: boolean
    timestamp?: boolean
    profile?: boolean | FarmerProfileDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["farmActivityLog"]>

  export type FarmActivityLogSelectScalar = {
    id?: boolean
    profileId?: boolean
    category?: boolean
    notes?: boolean
    timestamp?: boolean
  }

  export type FarmActivityLogOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "profileId" | "category" | "notes" | "timestamp", ExtArgs["result"]["farmActivityLog"]>
  export type FarmActivityLogInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    profile?: boolean | FarmerProfileDefaultArgs<ExtArgs>
  }
  export type FarmActivityLogIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    profile?: boolean | FarmerProfileDefaultArgs<ExtArgs>
  }
  export type FarmActivityLogIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    profile?: boolean | FarmerProfileDefaultArgs<ExtArgs>
  }

  export type $FarmActivityLogPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "FarmActivityLog"
    objects: {
      profile: Prisma.$FarmerProfilePayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      profileId: number
      category: string
      notes: string
      timestamp: Date
    }, ExtArgs["result"]["farmActivityLog"]>
    composites: {}
  }

  type FarmActivityLogGetPayload<S extends boolean | null | undefined | FarmActivityLogDefaultArgs> = $Result.GetResult<Prisma.$FarmActivityLogPayload, S>

  type FarmActivityLogCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<FarmActivityLogFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: FarmActivityLogCountAggregateInputType | true
    }

  export interface FarmActivityLogDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['FarmActivityLog'], meta: { name: 'FarmActivityLog' } }
    /**
     * Find zero or one FarmActivityLog that matches the filter.
     * @param {FarmActivityLogFindUniqueArgs} args - Arguments to find a FarmActivityLog
     * @example
     * // Get one FarmActivityLog
     * const farmActivityLog = await prisma.farmActivityLog.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends FarmActivityLogFindUniqueArgs>(args: SelectSubset<T, FarmActivityLogFindUniqueArgs<ExtArgs>>): Prisma__FarmActivityLogClient<$Result.GetResult<Prisma.$FarmActivityLogPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one FarmActivityLog that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {FarmActivityLogFindUniqueOrThrowArgs} args - Arguments to find a FarmActivityLog
     * @example
     * // Get one FarmActivityLog
     * const farmActivityLog = await prisma.farmActivityLog.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends FarmActivityLogFindUniqueOrThrowArgs>(args: SelectSubset<T, FarmActivityLogFindUniqueOrThrowArgs<ExtArgs>>): Prisma__FarmActivityLogClient<$Result.GetResult<Prisma.$FarmActivityLogPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first FarmActivityLog that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FarmActivityLogFindFirstArgs} args - Arguments to find a FarmActivityLog
     * @example
     * // Get one FarmActivityLog
     * const farmActivityLog = await prisma.farmActivityLog.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends FarmActivityLogFindFirstArgs>(args?: SelectSubset<T, FarmActivityLogFindFirstArgs<ExtArgs>>): Prisma__FarmActivityLogClient<$Result.GetResult<Prisma.$FarmActivityLogPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first FarmActivityLog that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FarmActivityLogFindFirstOrThrowArgs} args - Arguments to find a FarmActivityLog
     * @example
     * // Get one FarmActivityLog
     * const farmActivityLog = await prisma.farmActivityLog.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends FarmActivityLogFindFirstOrThrowArgs>(args?: SelectSubset<T, FarmActivityLogFindFirstOrThrowArgs<ExtArgs>>): Prisma__FarmActivityLogClient<$Result.GetResult<Prisma.$FarmActivityLogPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more FarmActivityLogs that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FarmActivityLogFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all FarmActivityLogs
     * const farmActivityLogs = await prisma.farmActivityLog.findMany()
     * 
     * // Get first 10 FarmActivityLogs
     * const farmActivityLogs = await prisma.farmActivityLog.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const farmActivityLogWithIdOnly = await prisma.farmActivityLog.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends FarmActivityLogFindManyArgs>(args?: SelectSubset<T, FarmActivityLogFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$FarmActivityLogPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a FarmActivityLog.
     * @param {FarmActivityLogCreateArgs} args - Arguments to create a FarmActivityLog.
     * @example
     * // Create one FarmActivityLog
     * const FarmActivityLog = await prisma.farmActivityLog.create({
     *   data: {
     *     // ... data to create a FarmActivityLog
     *   }
     * })
     * 
     */
    create<T extends FarmActivityLogCreateArgs>(args: SelectSubset<T, FarmActivityLogCreateArgs<ExtArgs>>): Prisma__FarmActivityLogClient<$Result.GetResult<Prisma.$FarmActivityLogPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many FarmActivityLogs.
     * @param {FarmActivityLogCreateManyArgs} args - Arguments to create many FarmActivityLogs.
     * @example
     * // Create many FarmActivityLogs
     * const farmActivityLog = await prisma.farmActivityLog.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends FarmActivityLogCreateManyArgs>(args?: SelectSubset<T, FarmActivityLogCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many FarmActivityLogs and returns the data saved in the database.
     * @param {FarmActivityLogCreateManyAndReturnArgs} args - Arguments to create many FarmActivityLogs.
     * @example
     * // Create many FarmActivityLogs
     * const farmActivityLog = await prisma.farmActivityLog.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many FarmActivityLogs and only return the `id`
     * const farmActivityLogWithIdOnly = await prisma.farmActivityLog.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends FarmActivityLogCreateManyAndReturnArgs>(args?: SelectSubset<T, FarmActivityLogCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$FarmActivityLogPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a FarmActivityLog.
     * @param {FarmActivityLogDeleteArgs} args - Arguments to delete one FarmActivityLog.
     * @example
     * // Delete one FarmActivityLog
     * const FarmActivityLog = await prisma.farmActivityLog.delete({
     *   where: {
     *     // ... filter to delete one FarmActivityLog
     *   }
     * })
     * 
     */
    delete<T extends FarmActivityLogDeleteArgs>(args: SelectSubset<T, FarmActivityLogDeleteArgs<ExtArgs>>): Prisma__FarmActivityLogClient<$Result.GetResult<Prisma.$FarmActivityLogPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one FarmActivityLog.
     * @param {FarmActivityLogUpdateArgs} args - Arguments to update one FarmActivityLog.
     * @example
     * // Update one FarmActivityLog
     * const farmActivityLog = await prisma.farmActivityLog.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends FarmActivityLogUpdateArgs>(args: SelectSubset<T, FarmActivityLogUpdateArgs<ExtArgs>>): Prisma__FarmActivityLogClient<$Result.GetResult<Prisma.$FarmActivityLogPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more FarmActivityLogs.
     * @param {FarmActivityLogDeleteManyArgs} args - Arguments to filter FarmActivityLogs to delete.
     * @example
     * // Delete a few FarmActivityLogs
     * const { count } = await prisma.farmActivityLog.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends FarmActivityLogDeleteManyArgs>(args?: SelectSubset<T, FarmActivityLogDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more FarmActivityLogs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FarmActivityLogUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many FarmActivityLogs
     * const farmActivityLog = await prisma.farmActivityLog.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends FarmActivityLogUpdateManyArgs>(args: SelectSubset<T, FarmActivityLogUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more FarmActivityLogs and returns the data updated in the database.
     * @param {FarmActivityLogUpdateManyAndReturnArgs} args - Arguments to update many FarmActivityLogs.
     * @example
     * // Update many FarmActivityLogs
     * const farmActivityLog = await prisma.farmActivityLog.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more FarmActivityLogs and only return the `id`
     * const farmActivityLogWithIdOnly = await prisma.farmActivityLog.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends FarmActivityLogUpdateManyAndReturnArgs>(args: SelectSubset<T, FarmActivityLogUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$FarmActivityLogPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one FarmActivityLog.
     * @param {FarmActivityLogUpsertArgs} args - Arguments to update or create a FarmActivityLog.
     * @example
     * // Update or create a FarmActivityLog
     * const farmActivityLog = await prisma.farmActivityLog.upsert({
     *   create: {
     *     // ... data to create a FarmActivityLog
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the FarmActivityLog we want to update
     *   }
     * })
     */
    upsert<T extends FarmActivityLogUpsertArgs>(args: SelectSubset<T, FarmActivityLogUpsertArgs<ExtArgs>>): Prisma__FarmActivityLogClient<$Result.GetResult<Prisma.$FarmActivityLogPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of FarmActivityLogs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FarmActivityLogCountArgs} args - Arguments to filter FarmActivityLogs to count.
     * @example
     * // Count the number of FarmActivityLogs
     * const count = await prisma.farmActivityLog.count({
     *   where: {
     *     // ... the filter for the FarmActivityLogs we want to count
     *   }
     * })
    **/
    count<T extends FarmActivityLogCountArgs>(
      args?: Subset<T, FarmActivityLogCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], FarmActivityLogCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a FarmActivityLog.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FarmActivityLogAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends FarmActivityLogAggregateArgs>(args: Subset<T, FarmActivityLogAggregateArgs>): Prisma.PrismaPromise<GetFarmActivityLogAggregateType<T>>

    /**
     * Group by FarmActivityLog.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FarmActivityLogGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends FarmActivityLogGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: FarmActivityLogGroupByArgs['orderBy'] }
        : { orderBy?: FarmActivityLogGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, FarmActivityLogGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetFarmActivityLogGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the FarmActivityLog model
   */
  readonly fields: FarmActivityLogFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for FarmActivityLog.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__FarmActivityLogClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    profile<T extends FarmerProfileDefaultArgs<ExtArgs> = {}>(args?: Subset<T, FarmerProfileDefaultArgs<ExtArgs>>): Prisma__FarmerProfileClient<$Result.GetResult<Prisma.$FarmerProfilePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the FarmActivityLog model
   */
  interface FarmActivityLogFieldRefs {
    readonly id: FieldRef<"FarmActivityLog", 'Int'>
    readonly profileId: FieldRef<"FarmActivityLog", 'Int'>
    readonly category: FieldRef<"FarmActivityLog", 'String'>
    readonly notes: FieldRef<"FarmActivityLog", 'String'>
    readonly timestamp: FieldRef<"FarmActivityLog", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * FarmActivityLog findUnique
   */
  export type FarmActivityLogFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FarmActivityLog
     */
    select?: FarmActivityLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the FarmActivityLog
     */
    omit?: FarmActivityLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FarmActivityLogInclude<ExtArgs> | null
    /**
     * Filter, which FarmActivityLog to fetch.
     */
    where: FarmActivityLogWhereUniqueInput
  }

  /**
   * FarmActivityLog findUniqueOrThrow
   */
  export type FarmActivityLogFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FarmActivityLog
     */
    select?: FarmActivityLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the FarmActivityLog
     */
    omit?: FarmActivityLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FarmActivityLogInclude<ExtArgs> | null
    /**
     * Filter, which FarmActivityLog to fetch.
     */
    where: FarmActivityLogWhereUniqueInput
  }

  /**
   * FarmActivityLog findFirst
   */
  export type FarmActivityLogFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FarmActivityLog
     */
    select?: FarmActivityLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the FarmActivityLog
     */
    omit?: FarmActivityLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FarmActivityLogInclude<ExtArgs> | null
    /**
     * Filter, which FarmActivityLog to fetch.
     */
    where?: FarmActivityLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of FarmActivityLogs to fetch.
     */
    orderBy?: FarmActivityLogOrderByWithRelationInput | FarmActivityLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for FarmActivityLogs.
     */
    cursor?: FarmActivityLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` FarmActivityLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` FarmActivityLogs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of FarmActivityLogs.
     */
    distinct?: FarmActivityLogScalarFieldEnum | FarmActivityLogScalarFieldEnum[]
  }

  /**
   * FarmActivityLog findFirstOrThrow
   */
  export type FarmActivityLogFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FarmActivityLog
     */
    select?: FarmActivityLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the FarmActivityLog
     */
    omit?: FarmActivityLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FarmActivityLogInclude<ExtArgs> | null
    /**
     * Filter, which FarmActivityLog to fetch.
     */
    where?: FarmActivityLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of FarmActivityLogs to fetch.
     */
    orderBy?: FarmActivityLogOrderByWithRelationInput | FarmActivityLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for FarmActivityLogs.
     */
    cursor?: FarmActivityLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` FarmActivityLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` FarmActivityLogs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of FarmActivityLogs.
     */
    distinct?: FarmActivityLogScalarFieldEnum | FarmActivityLogScalarFieldEnum[]
  }

  /**
   * FarmActivityLog findMany
   */
  export type FarmActivityLogFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FarmActivityLog
     */
    select?: FarmActivityLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the FarmActivityLog
     */
    omit?: FarmActivityLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FarmActivityLogInclude<ExtArgs> | null
    /**
     * Filter, which FarmActivityLogs to fetch.
     */
    where?: FarmActivityLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of FarmActivityLogs to fetch.
     */
    orderBy?: FarmActivityLogOrderByWithRelationInput | FarmActivityLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing FarmActivityLogs.
     */
    cursor?: FarmActivityLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` FarmActivityLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` FarmActivityLogs.
     */
    skip?: number
    distinct?: FarmActivityLogScalarFieldEnum | FarmActivityLogScalarFieldEnum[]
  }

  /**
   * FarmActivityLog create
   */
  export type FarmActivityLogCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FarmActivityLog
     */
    select?: FarmActivityLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the FarmActivityLog
     */
    omit?: FarmActivityLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FarmActivityLogInclude<ExtArgs> | null
    /**
     * The data needed to create a FarmActivityLog.
     */
    data: XOR<FarmActivityLogCreateInput, FarmActivityLogUncheckedCreateInput>
  }

  /**
   * FarmActivityLog createMany
   */
  export type FarmActivityLogCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many FarmActivityLogs.
     */
    data: FarmActivityLogCreateManyInput | FarmActivityLogCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * FarmActivityLog createManyAndReturn
   */
  export type FarmActivityLogCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FarmActivityLog
     */
    select?: FarmActivityLogSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the FarmActivityLog
     */
    omit?: FarmActivityLogOmit<ExtArgs> | null
    /**
     * The data used to create many FarmActivityLogs.
     */
    data: FarmActivityLogCreateManyInput | FarmActivityLogCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FarmActivityLogIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * FarmActivityLog update
   */
  export type FarmActivityLogUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FarmActivityLog
     */
    select?: FarmActivityLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the FarmActivityLog
     */
    omit?: FarmActivityLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FarmActivityLogInclude<ExtArgs> | null
    /**
     * The data needed to update a FarmActivityLog.
     */
    data: XOR<FarmActivityLogUpdateInput, FarmActivityLogUncheckedUpdateInput>
    /**
     * Choose, which FarmActivityLog to update.
     */
    where: FarmActivityLogWhereUniqueInput
  }

  /**
   * FarmActivityLog updateMany
   */
  export type FarmActivityLogUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update FarmActivityLogs.
     */
    data: XOR<FarmActivityLogUpdateManyMutationInput, FarmActivityLogUncheckedUpdateManyInput>
    /**
     * Filter which FarmActivityLogs to update
     */
    where?: FarmActivityLogWhereInput
    /**
     * Limit how many FarmActivityLogs to update.
     */
    limit?: number
  }

  /**
   * FarmActivityLog updateManyAndReturn
   */
  export type FarmActivityLogUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FarmActivityLog
     */
    select?: FarmActivityLogSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the FarmActivityLog
     */
    omit?: FarmActivityLogOmit<ExtArgs> | null
    /**
     * The data used to update FarmActivityLogs.
     */
    data: XOR<FarmActivityLogUpdateManyMutationInput, FarmActivityLogUncheckedUpdateManyInput>
    /**
     * Filter which FarmActivityLogs to update
     */
    where?: FarmActivityLogWhereInput
    /**
     * Limit how many FarmActivityLogs to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FarmActivityLogIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * FarmActivityLog upsert
   */
  export type FarmActivityLogUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FarmActivityLog
     */
    select?: FarmActivityLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the FarmActivityLog
     */
    omit?: FarmActivityLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FarmActivityLogInclude<ExtArgs> | null
    /**
     * The filter to search for the FarmActivityLog to update in case it exists.
     */
    where: FarmActivityLogWhereUniqueInput
    /**
     * In case the FarmActivityLog found by the `where` argument doesn't exist, create a new FarmActivityLog with this data.
     */
    create: XOR<FarmActivityLogCreateInput, FarmActivityLogUncheckedCreateInput>
    /**
     * In case the FarmActivityLog was found with the provided `where` argument, update it with this data.
     */
    update: XOR<FarmActivityLogUpdateInput, FarmActivityLogUncheckedUpdateInput>
  }

  /**
   * FarmActivityLog delete
   */
  export type FarmActivityLogDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FarmActivityLog
     */
    select?: FarmActivityLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the FarmActivityLog
     */
    omit?: FarmActivityLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FarmActivityLogInclude<ExtArgs> | null
    /**
     * Filter which FarmActivityLog to delete.
     */
    where: FarmActivityLogWhereUniqueInput
  }

  /**
   * FarmActivityLog deleteMany
   */
  export type FarmActivityLogDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which FarmActivityLogs to delete
     */
    where?: FarmActivityLogWhereInput
    /**
     * Limit how many FarmActivityLogs to delete.
     */
    limit?: number
  }

  /**
   * FarmActivityLog without action
   */
  export type FarmActivityLogDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FarmActivityLog
     */
    select?: FarmActivityLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the FarmActivityLog
     */
    omit?: FarmActivityLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FarmActivityLogInclude<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const FarmerProfileScalarFieldEnum: {
    id: 'id',
    userId: 'userId',
    name: 'name',
    district: 'district',
    zone: 'zone',
    soilType: 'soilType',
    landSize: 'landSize',
    crops: 'crops',
    isIrrigated: 'isIrrigated',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type FarmerProfileScalarFieldEnum = (typeof FarmerProfileScalarFieldEnum)[keyof typeof FarmerProfileScalarFieldEnum]


  export const FarmActivityLogScalarFieldEnum: {
    id: 'id',
    profileId: 'profileId',
    category: 'category',
    notes: 'notes',
    timestamp: 'timestamp'
  };

  export type FarmActivityLogScalarFieldEnum = (typeof FarmActivityLogScalarFieldEnum)[keyof typeof FarmActivityLogScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const QueryMode: {
    default: 'default',
    insensitive: 'insensitive'
  };

  export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode]


  /**
   * Field references
   */


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Int[]'
   */
  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>
    


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'String[]'
   */
  export type ListStringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String[]'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    


  /**
   * Reference to a field of type 'Float[]'
   */
  export type ListFloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float[]'>
    


  /**
   * Reference to a field of type 'Boolean'
   */
  export type BooleanFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Boolean'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'DateTime[]'
   */
  export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime[]'>
    
  /**
   * Deep Input Types
   */


  export type FarmerProfileWhereInput = {
    AND?: FarmerProfileWhereInput | FarmerProfileWhereInput[]
    OR?: FarmerProfileWhereInput[]
    NOT?: FarmerProfileWhereInput | FarmerProfileWhereInput[]
    id?: IntFilter<"FarmerProfile"> | number
    userId?: StringFilter<"FarmerProfile"> | string
    name?: StringFilter<"FarmerProfile"> | string
    district?: StringFilter<"FarmerProfile"> | string
    zone?: StringFilter<"FarmerProfile"> | string
    soilType?: StringFilter<"FarmerProfile"> | string
    landSize?: FloatFilter<"FarmerProfile"> | number
    crops?: StringFilter<"FarmerProfile"> | string
    isIrrigated?: BoolFilter<"FarmerProfile"> | boolean
    createdAt?: DateTimeFilter<"FarmerProfile"> | Date | string
    updatedAt?: DateTimeFilter<"FarmerProfile"> | Date | string
    logs?: FarmActivityLogListRelationFilter
  }

  export type FarmerProfileOrderByWithRelationInput = {
    id?: SortOrder
    userId?: SortOrder
    name?: SortOrder
    district?: SortOrder
    zone?: SortOrder
    soilType?: SortOrder
    landSize?: SortOrder
    crops?: SortOrder
    isIrrigated?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    logs?: FarmActivityLogOrderByRelationAggregateInput
  }

  export type FarmerProfileWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: FarmerProfileWhereInput | FarmerProfileWhereInput[]
    OR?: FarmerProfileWhereInput[]
    NOT?: FarmerProfileWhereInput | FarmerProfileWhereInput[]
    userId?: StringFilter<"FarmerProfile"> | string
    name?: StringFilter<"FarmerProfile"> | string
    district?: StringFilter<"FarmerProfile"> | string
    zone?: StringFilter<"FarmerProfile"> | string
    soilType?: StringFilter<"FarmerProfile"> | string
    landSize?: FloatFilter<"FarmerProfile"> | number
    crops?: StringFilter<"FarmerProfile"> | string
    isIrrigated?: BoolFilter<"FarmerProfile"> | boolean
    createdAt?: DateTimeFilter<"FarmerProfile"> | Date | string
    updatedAt?: DateTimeFilter<"FarmerProfile"> | Date | string
    logs?: FarmActivityLogListRelationFilter
  }, "id">

  export type FarmerProfileOrderByWithAggregationInput = {
    id?: SortOrder
    userId?: SortOrder
    name?: SortOrder
    district?: SortOrder
    zone?: SortOrder
    soilType?: SortOrder
    landSize?: SortOrder
    crops?: SortOrder
    isIrrigated?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: FarmerProfileCountOrderByAggregateInput
    _avg?: FarmerProfileAvgOrderByAggregateInput
    _max?: FarmerProfileMaxOrderByAggregateInput
    _min?: FarmerProfileMinOrderByAggregateInput
    _sum?: FarmerProfileSumOrderByAggregateInput
  }

  export type FarmerProfileScalarWhereWithAggregatesInput = {
    AND?: FarmerProfileScalarWhereWithAggregatesInput | FarmerProfileScalarWhereWithAggregatesInput[]
    OR?: FarmerProfileScalarWhereWithAggregatesInput[]
    NOT?: FarmerProfileScalarWhereWithAggregatesInput | FarmerProfileScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"FarmerProfile"> | number
    userId?: StringWithAggregatesFilter<"FarmerProfile"> | string
    name?: StringWithAggregatesFilter<"FarmerProfile"> | string
    district?: StringWithAggregatesFilter<"FarmerProfile"> | string
    zone?: StringWithAggregatesFilter<"FarmerProfile"> | string
    soilType?: StringWithAggregatesFilter<"FarmerProfile"> | string
    landSize?: FloatWithAggregatesFilter<"FarmerProfile"> | number
    crops?: StringWithAggregatesFilter<"FarmerProfile"> | string
    isIrrigated?: BoolWithAggregatesFilter<"FarmerProfile"> | boolean
    createdAt?: DateTimeWithAggregatesFilter<"FarmerProfile"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"FarmerProfile"> | Date | string
  }

  export type FarmActivityLogWhereInput = {
    AND?: FarmActivityLogWhereInput | FarmActivityLogWhereInput[]
    OR?: FarmActivityLogWhereInput[]
    NOT?: FarmActivityLogWhereInput | FarmActivityLogWhereInput[]
    id?: IntFilter<"FarmActivityLog"> | number
    profileId?: IntFilter<"FarmActivityLog"> | number
    category?: StringFilter<"FarmActivityLog"> | string
    notes?: StringFilter<"FarmActivityLog"> | string
    timestamp?: DateTimeFilter<"FarmActivityLog"> | Date | string
    profile?: XOR<FarmerProfileScalarRelationFilter, FarmerProfileWhereInput>
  }

  export type FarmActivityLogOrderByWithRelationInput = {
    id?: SortOrder
    profileId?: SortOrder
    category?: SortOrder
    notes?: SortOrder
    timestamp?: SortOrder
    profile?: FarmerProfileOrderByWithRelationInput
  }

  export type FarmActivityLogWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: FarmActivityLogWhereInput | FarmActivityLogWhereInput[]
    OR?: FarmActivityLogWhereInput[]
    NOT?: FarmActivityLogWhereInput | FarmActivityLogWhereInput[]
    profileId?: IntFilter<"FarmActivityLog"> | number
    category?: StringFilter<"FarmActivityLog"> | string
    notes?: StringFilter<"FarmActivityLog"> | string
    timestamp?: DateTimeFilter<"FarmActivityLog"> | Date | string
    profile?: XOR<FarmerProfileScalarRelationFilter, FarmerProfileWhereInput>
  }, "id">

  export type FarmActivityLogOrderByWithAggregationInput = {
    id?: SortOrder
    profileId?: SortOrder
    category?: SortOrder
    notes?: SortOrder
    timestamp?: SortOrder
    _count?: FarmActivityLogCountOrderByAggregateInput
    _avg?: FarmActivityLogAvgOrderByAggregateInput
    _max?: FarmActivityLogMaxOrderByAggregateInput
    _min?: FarmActivityLogMinOrderByAggregateInput
    _sum?: FarmActivityLogSumOrderByAggregateInput
  }

  export type FarmActivityLogScalarWhereWithAggregatesInput = {
    AND?: FarmActivityLogScalarWhereWithAggregatesInput | FarmActivityLogScalarWhereWithAggregatesInput[]
    OR?: FarmActivityLogScalarWhereWithAggregatesInput[]
    NOT?: FarmActivityLogScalarWhereWithAggregatesInput | FarmActivityLogScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"FarmActivityLog"> | number
    profileId?: IntWithAggregatesFilter<"FarmActivityLog"> | number
    category?: StringWithAggregatesFilter<"FarmActivityLog"> | string
    notes?: StringWithAggregatesFilter<"FarmActivityLog"> | string
    timestamp?: DateTimeWithAggregatesFilter<"FarmActivityLog"> | Date | string
  }

  export type FarmerProfileCreateInput = {
    userId: string
    name: string
    district: string
    zone: string
    soilType: string
    landSize: number
    crops: string
    isIrrigated?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    logs?: FarmActivityLogCreateNestedManyWithoutProfileInput
  }

  export type FarmerProfileUncheckedCreateInput = {
    id?: number
    userId: string
    name: string
    district: string
    zone: string
    soilType: string
    landSize: number
    crops: string
    isIrrigated?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    logs?: FarmActivityLogUncheckedCreateNestedManyWithoutProfileInput
  }

  export type FarmerProfileUpdateInput = {
    userId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    district?: StringFieldUpdateOperationsInput | string
    zone?: StringFieldUpdateOperationsInput | string
    soilType?: StringFieldUpdateOperationsInput | string
    landSize?: FloatFieldUpdateOperationsInput | number
    crops?: StringFieldUpdateOperationsInput | string
    isIrrigated?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    logs?: FarmActivityLogUpdateManyWithoutProfileNestedInput
  }

  export type FarmerProfileUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    userId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    district?: StringFieldUpdateOperationsInput | string
    zone?: StringFieldUpdateOperationsInput | string
    soilType?: StringFieldUpdateOperationsInput | string
    landSize?: FloatFieldUpdateOperationsInput | number
    crops?: StringFieldUpdateOperationsInput | string
    isIrrigated?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    logs?: FarmActivityLogUncheckedUpdateManyWithoutProfileNestedInput
  }

  export type FarmerProfileCreateManyInput = {
    id?: number
    userId: string
    name: string
    district: string
    zone: string
    soilType: string
    landSize: number
    crops: string
    isIrrigated?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type FarmerProfileUpdateManyMutationInput = {
    userId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    district?: StringFieldUpdateOperationsInput | string
    zone?: StringFieldUpdateOperationsInput | string
    soilType?: StringFieldUpdateOperationsInput | string
    landSize?: FloatFieldUpdateOperationsInput | number
    crops?: StringFieldUpdateOperationsInput | string
    isIrrigated?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type FarmerProfileUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    userId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    district?: StringFieldUpdateOperationsInput | string
    zone?: StringFieldUpdateOperationsInput | string
    soilType?: StringFieldUpdateOperationsInput | string
    landSize?: FloatFieldUpdateOperationsInput | number
    crops?: StringFieldUpdateOperationsInput | string
    isIrrigated?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type FarmActivityLogCreateInput = {
    category: string
    notes: string
    timestamp?: Date | string
    profile: FarmerProfileCreateNestedOneWithoutLogsInput
  }

  export type FarmActivityLogUncheckedCreateInput = {
    id?: number
    profileId: number
    category: string
    notes: string
    timestamp?: Date | string
  }

  export type FarmActivityLogUpdateInput = {
    category?: StringFieldUpdateOperationsInput | string
    notes?: StringFieldUpdateOperationsInput | string
    timestamp?: DateTimeFieldUpdateOperationsInput | Date | string
    profile?: FarmerProfileUpdateOneRequiredWithoutLogsNestedInput
  }

  export type FarmActivityLogUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    profileId?: IntFieldUpdateOperationsInput | number
    category?: StringFieldUpdateOperationsInput | string
    notes?: StringFieldUpdateOperationsInput | string
    timestamp?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type FarmActivityLogCreateManyInput = {
    id?: number
    profileId: number
    category: string
    notes: string
    timestamp?: Date | string
  }

  export type FarmActivityLogUpdateManyMutationInput = {
    category?: StringFieldUpdateOperationsInput | string
    notes?: StringFieldUpdateOperationsInput | string
    timestamp?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type FarmActivityLogUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    profileId?: IntFieldUpdateOperationsInput | number
    category?: StringFieldUpdateOperationsInput | string
    notes?: StringFieldUpdateOperationsInput | string
    timestamp?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type IntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type FloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type BoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type FarmActivityLogListRelationFilter = {
    every?: FarmActivityLogWhereInput
    some?: FarmActivityLogWhereInput
    none?: FarmActivityLogWhereInput
  }

  export type FarmActivityLogOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type FarmerProfileCountOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    name?: SortOrder
    district?: SortOrder
    zone?: SortOrder
    soilType?: SortOrder
    landSize?: SortOrder
    crops?: SortOrder
    isIrrigated?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type FarmerProfileAvgOrderByAggregateInput = {
    id?: SortOrder
    landSize?: SortOrder
  }

  export type FarmerProfileMaxOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    name?: SortOrder
    district?: SortOrder
    zone?: SortOrder
    soilType?: SortOrder
    landSize?: SortOrder
    crops?: SortOrder
    isIrrigated?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type FarmerProfileMinOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    name?: SortOrder
    district?: SortOrder
    zone?: SortOrder
    soilType?: SortOrder
    landSize?: SortOrder
    crops?: SortOrder
    isIrrigated?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type FarmerProfileSumOrderByAggregateInput = {
    id?: SortOrder
    landSize?: SortOrder
  }

  export type IntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type FloatWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedFloatFilter<$PrismaModel>
    _min?: NestedFloatFilter<$PrismaModel>
    _max?: NestedFloatFilter<$PrismaModel>
  }

  export type BoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type FarmerProfileScalarRelationFilter = {
    is?: FarmerProfileWhereInput
    isNot?: FarmerProfileWhereInput
  }

  export type FarmActivityLogCountOrderByAggregateInput = {
    id?: SortOrder
    profileId?: SortOrder
    category?: SortOrder
    notes?: SortOrder
    timestamp?: SortOrder
  }

  export type FarmActivityLogAvgOrderByAggregateInput = {
    id?: SortOrder
    profileId?: SortOrder
  }

  export type FarmActivityLogMaxOrderByAggregateInput = {
    id?: SortOrder
    profileId?: SortOrder
    category?: SortOrder
    notes?: SortOrder
    timestamp?: SortOrder
  }

  export type FarmActivityLogMinOrderByAggregateInput = {
    id?: SortOrder
    profileId?: SortOrder
    category?: SortOrder
    notes?: SortOrder
    timestamp?: SortOrder
  }

  export type FarmActivityLogSumOrderByAggregateInput = {
    id?: SortOrder
    profileId?: SortOrder
  }

  export type FarmActivityLogCreateNestedManyWithoutProfileInput = {
    create?: XOR<FarmActivityLogCreateWithoutProfileInput, FarmActivityLogUncheckedCreateWithoutProfileInput> | FarmActivityLogCreateWithoutProfileInput[] | FarmActivityLogUncheckedCreateWithoutProfileInput[]
    connectOrCreate?: FarmActivityLogCreateOrConnectWithoutProfileInput | FarmActivityLogCreateOrConnectWithoutProfileInput[]
    createMany?: FarmActivityLogCreateManyProfileInputEnvelope
    connect?: FarmActivityLogWhereUniqueInput | FarmActivityLogWhereUniqueInput[]
  }

  export type FarmActivityLogUncheckedCreateNestedManyWithoutProfileInput = {
    create?: XOR<FarmActivityLogCreateWithoutProfileInput, FarmActivityLogUncheckedCreateWithoutProfileInput> | FarmActivityLogCreateWithoutProfileInput[] | FarmActivityLogUncheckedCreateWithoutProfileInput[]
    connectOrCreate?: FarmActivityLogCreateOrConnectWithoutProfileInput | FarmActivityLogCreateOrConnectWithoutProfileInput[]
    createMany?: FarmActivityLogCreateManyProfileInputEnvelope
    connect?: FarmActivityLogWhereUniqueInput | FarmActivityLogWhereUniqueInput[]
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type FloatFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type BoolFieldUpdateOperationsInput = {
    set?: boolean
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type FarmActivityLogUpdateManyWithoutProfileNestedInput = {
    create?: XOR<FarmActivityLogCreateWithoutProfileInput, FarmActivityLogUncheckedCreateWithoutProfileInput> | FarmActivityLogCreateWithoutProfileInput[] | FarmActivityLogUncheckedCreateWithoutProfileInput[]
    connectOrCreate?: FarmActivityLogCreateOrConnectWithoutProfileInput | FarmActivityLogCreateOrConnectWithoutProfileInput[]
    upsert?: FarmActivityLogUpsertWithWhereUniqueWithoutProfileInput | FarmActivityLogUpsertWithWhereUniqueWithoutProfileInput[]
    createMany?: FarmActivityLogCreateManyProfileInputEnvelope
    set?: FarmActivityLogWhereUniqueInput | FarmActivityLogWhereUniqueInput[]
    disconnect?: FarmActivityLogWhereUniqueInput | FarmActivityLogWhereUniqueInput[]
    delete?: FarmActivityLogWhereUniqueInput | FarmActivityLogWhereUniqueInput[]
    connect?: FarmActivityLogWhereUniqueInput | FarmActivityLogWhereUniqueInput[]
    update?: FarmActivityLogUpdateWithWhereUniqueWithoutProfileInput | FarmActivityLogUpdateWithWhereUniqueWithoutProfileInput[]
    updateMany?: FarmActivityLogUpdateManyWithWhereWithoutProfileInput | FarmActivityLogUpdateManyWithWhereWithoutProfileInput[]
    deleteMany?: FarmActivityLogScalarWhereInput | FarmActivityLogScalarWhereInput[]
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type FarmActivityLogUncheckedUpdateManyWithoutProfileNestedInput = {
    create?: XOR<FarmActivityLogCreateWithoutProfileInput, FarmActivityLogUncheckedCreateWithoutProfileInput> | FarmActivityLogCreateWithoutProfileInput[] | FarmActivityLogUncheckedCreateWithoutProfileInput[]
    connectOrCreate?: FarmActivityLogCreateOrConnectWithoutProfileInput | FarmActivityLogCreateOrConnectWithoutProfileInput[]
    upsert?: FarmActivityLogUpsertWithWhereUniqueWithoutProfileInput | FarmActivityLogUpsertWithWhereUniqueWithoutProfileInput[]
    createMany?: FarmActivityLogCreateManyProfileInputEnvelope
    set?: FarmActivityLogWhereUniqueInput | FarmActivityLogWhereUniqueInput[]
    disconnect?: FarmActivityLogWhereUniqueInput | FarmActivityLogWhereUniqueInput[]
    delete?: FarmActivityLogWhereUniqueInput | FarmActivityLogWhereUniqueInput[]
    connect?: FarmActivityLogWhereUniqueInput | FarmActivityLogWhereUniqueInput[]
    update?: FarmActivityLogUpdateWithWhereUniqueWithoutProfileInput | FarmActivityLogUpdateWithWhereUniqueWithoutProfileInput[]
    updateMany?: FarmActivityLogUpdateManyWithWhereWithoutProfileInput | FarmActivityLogUpdateManyWithWhereWithoutProfileInput[]
    deleteMany?: FarmActivityLogScalarWhereInput | FarmActivityLogScalarWhereInput[]
  }

  export type FarmerProfileCreateNestedOneWithoutLogsInput = {
    create?: XOR<FarmerProfileCreateWithoutLogsInput, FarmerProfileUncheckedCreateWithoutLogsInput>
    connectOrCreate?: FarmerProfileCreateOrConnectWithoutLogsInput
    connect?: FarmerProfileWhereUniqueInput
  }

  export type FarmerProfileUpdateOneRequiredWithoutLogsNestedInput = {
    create?: XOR<FarmerProfileCreateWithoutLogsInput, FarmerProfileUncheckedCreateWithoutLogsInput>
    connectOrCreate?: FarmerProfileCreateOrConnectWithoutLogsInput
    upsert?: FarmerProfileUpsertWithoutLogsInput
    connect?: FarmerProfileWhereUniqueInput
    update?: XOR<XOR<FarmerProfileUpdateToOneWithWhereWithoutLogsInput, FarmerProfileUpdateWithoutLogsInput>, FarmerProfileUncheckedUpdateWithoutLogsInput>
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedFloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type NestedBoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedFloatWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedFloatFilter<$PrismaModel>
    _min?: NestedFloatFilter<$PrismaModel>
    _max?: NestedFloatFilter<$PrismaModel>
  }

  export type NestedBoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type FarmActivityLogCreateWithoutProfileInput = {
    category: string
    notes: string
    timestamp?: Date | string
  }

  export type FarmActivityLogUncheckedCreateWithoutProfileInput = {
    id?: number
    category: string
    notes: string
    timestamp?: Date | string
  }

  export type FarmActivityLogCreateOrConnectWithoutProfileInput = {
    where: FarmActivityLogWhereUniqueInput
    create: XOR<FarmActivityLogCreateWithoutProfileInput, FarmActivityLogUncheckedCreateWithoutProfileInput>
  }

  export type FarmActivityLogCreateManyProfileInputEnvelope = {
    data: FarmActivityLogCreateManyProfileInput | FarmActivityLogCreateManyProfileInput[]
    skipDuplicates?: boolean
  }

  export type FarmActivityLogUpsertWithWhereUniqueWithoutProfileInput = {
    where: FarmActivityLogWhereUniqueInput
    update: XOR<FarmActivityLogUpdateWithoutProfileInput, FarmActivityLogUncheckedUpdateWithoutProfileInput>
    create: XOR<FarmActivityLogCreateWithoutProfileInput, FarmActivityLogUncheckedCreateWithoutProfileInput>
  }

  export type FarmActivityLogUpdateWithWhereUniqueWithoutProfileInput = {
    where: FarmActivityLogWhereUniqueInput
    data: XOR<FarmActivityLogUpdateWithoutProfileInput, FarmActivityLogUncheckedUpdateWithoutProfileInput>
  }

  export type FarmActivityLogUpdateManyWithWhereWithoutProfileInput = {
    where: FarmActivityLogScalarWhereInput
    data: XOR<FarmActivityLogUpdateManyMutationInput, FarmActivityLogUncheckedUpdateManyWithoutProfileInput>
  }

  export type FarmActivityLogScalarWhereInput = {
    AND?: FarmActivityLogScalarWhereInput | FarmActivityLogScalarWhereInput[]
    OR?: FarmActivityLogScalarWhereInput[]
    NOT?: FarmActivityLogScalarWhereInput | FarmActivityLogScalarWhereInput[]
    id?: IntFilter<"FarmActivityLog"> | number
    profileId?: IntFilter<"FarmActivityLog"> | number
    category?: StringFilter<"FarmActivityLog"> | string
    notes?: StringFilter<"FarmActivityLog"> | string
    timestamp?: DateTimeFilter<"FarmActivityLog"> | Date | string
  }

  export type FarmerProfileCreateWithoutLogsInput = {
    userId: string
    name: string
    district: string
    zone: string
    soilType: string
    landSize: number
    crops: string
    isIrrigated?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type FarmerProfileUncheckedCreateWithoutLogsInput = {
    id?: number
    userId: string
    name: string
    district: string
    zone: string
    soilType: string
    landSize: number
    crops: string
    isIrrigated?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type FarmerProfileCreateOrConnectWithoutLogsInput = {
    where: FarmerProfileWhereUniqueInput
    create: XOR<FarmerProfileCreateWithoutLogsInput, FarmerProfileUncheckedCreateWithoutLogsInput>
  }

  export type FarmerProfileUpsertWithoutLogsInput = {
    update: XOR<FarmerProfileUpdateWithoutLogsInput, FarmerProfileUncheckedUpdateWithoutLogsInput>
    create: XOR<FarmerProfileCreateWithoutLogsInput, FarmerProfileUncheckedCreateWithoutLogsInput>
    where?: FarmerProfileWhereInput
  }

  export type FarmerProfileUpdateToOneWithWhereWithoutLogsInput = {
    where?: FarmerProfileWhereInput
    data: XOR<FarmerProfileUpdateWithoutLogsInput, FarmerProfileUncheckedUpdateWithoutLogsInput>
  }

  export type FarmerProfileUpdateWithoutLogsInput = {
    userId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    district?: StringFieldUpdateOperationsInput | string
    zone?: StringFieldUpdateOperationsInput | string
    soilType?: StringFieldUpdateOperationsInput | string
    landSize?: FloatFieldUpdateOperationsInput | number
    crops?: StringFieldUpdateOperationsInput | string
    isIrrigated?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type FarmerProfileUncheckedUpdateWithoutLogsInput = {
    id?: IntFieldUpdateOperationsInput | number
    userId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    district?: StringFieldUpdateOperationsInput | string
    zone?: StringFieldUpdateOperationsInput | string
    soilType?: StringFieldUpdateOperationsInput | string
    landSize?: FloatFieldUpdateOperationsInput | number
    crops?: StringFieldUpdateOperationsInput | string
    isIrrigated?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type FarmActivityLogCreateManyProfileInput = {
    id?: number
    category: string
    notes: string
    timestamp?: Date | string
  }

  export type FarmActivityLogUpdateWithoutProfileInput = {
    category?: StringFieldUpdateOperationsInput | string
    notes?: StringFieldUpdateOperationsInput | string
    timestamp?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type FarmActivityLogUncheckedUpdateWithoutProfileInput = {
    id?: IntFieldUpdateOperationsInput | number
    category?: StringFieldUpdateOperationsInput | string
    notes?: StringFieldUpdateOperationsInput | string
    timestamp?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type FarmActivityLogUncheckedUpdateManyWithoutProfileInput = {
    id?: IntFieldUpdateOperationsInput | number
    category?: StringFieldUpdateOperationsInput | string
    notes?: StringFieldUpdateOperationsInput | string
    timestamp?: DateTimeFieldUpdateOperationsInput | Date | string
  }



  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}