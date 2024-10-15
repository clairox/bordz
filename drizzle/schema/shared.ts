import { toLongUUID, toShortUUID } from '@/lib/uuidTranslator'
import {
    BuildColumns,
    BuildExtraConfigColumns,
    HasDefault,
    IsPrimaryKey,
    NotNull,
    sql,
} from 'drizzle-orm'
import {
    PgColumnBuilderBase,
    PgTableExtraConfig,
    PgTableWithColumns,
    PgTimestampBuilderInitial,
    customType,
    pgTable,
    timestamp,
    PgCustomColumnBuilder,
} from 'drizzle-orm/pg-core'

type GeneratedPrimaryKey = IsPrimaryKey<
    NotNull<
        HasDefault<
            PgCustomColumnBuilder<{
                name: string
                dataType: 'custom'
                columnType: 'PgCustomColumn'
                data: string
                driverParam: string
                enumValues: undefined
                generated: undefined
            }>
        >
    >
>
type IdField = { id: GeneratedPrimaryKey }
type TimestampFields = {
    createdAt: NotNull<HasDefault<PgTimestampBuilderInitial<'created_at'>>>
    updatedAt: NotNull<HasDefault<PgTimestampBuilderInitial<'updated_at'>>>
}

export const shortUuid = customType<{
    data: string
    driverData: string
}>({
    dataType() {
        return 'varchar(36)'
    },
    toDriver(value: string): string {
        return toLongUUID(value)
    },
    fromDriver(value: string): string {
        return toShortUUID(value)
    },
})

export const pgTableWithAutoFields = <
    TTableName extends string,
    TColumnsMap extends Record<string, PgColumnBuilderBase>,
>(
    name: TTableName,
    columns: TColumnsMap,
    extraConfig?: (
        self: BuildExtraConfigColumns<TTableName, TColumnsMap, 'pg'>
    ) => PgTableExtraConfig
): PgTableWithColumns<{
    name: TTableName
    schema: undefined
    columns: BuildColumns<
        TTableName,
        IdField & TColumnsMap & TimestampFields,
        'pg'
    >
    dialect: 'pg'
}> =>
    pgTable(name, { id: generatePK(), ...columns, ...timestamps }, extraConfig)

export const generatePK = (name: string = 'id') =>
    shortUuid(name)
        .default(sql`uuid_generate_v4()`)
        .primaryKey()

export const timestamps = {
    createdAt: timestamp('created_at').defaultNow().notNull(),
    updatedAt: timestamp('updated_at').defaultNow().notNull(),
}
