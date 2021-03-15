
import React, { useContext } from "react";
import _ from 'lodash';
import { BuilderStoreContext } from '@builder.io/react';
import { ObjectContext } from "../";
import { useQuery } from "react-query";
import ProTable, { ProTableProps, RequestData } from "@ant-design/pro-table";
import { SortOrder } from "antd/lib/table/interface";
import { ParamsType } from "@ant-design/pro-provider";
import { registerObjectTableComponent } from "..";

// export type TableProps<T extends Record<string, any>, U extends ParamsType, ValueType>  = {
//   mode?: ProFieldFCMode,
//   editable?: boolean,
// } & ProTableProps<T, U, ValueType> & {
//   defaultClassName: string;
// }

// export type ObjectTableProps = {
//   objectApiName?: string,
//   recordId?: string,
// } & ProTableProps<T, U, ValueType> & {
//   defaultClassName: string;
// }

export type ObjectTableColumnProps = {
  fieldName: string,
  wrap?: boolean
}

export type ObjectTableProps<T extends Record<string, any>, U extends ParamsType, ValueType> = {
  objectApiName?: string,
  columns: ObjectTableColumnProps[]
} & Omit<ProTableProps<T, U, ValueType>, 'columns'> & {
  defaultClassName: string;
}

export const getObjectTableProColumn = (field: any) => {
  // 把yml中的某个字段field转成ant的ProTable中的columns属性项
  if (!field) {
    return null;
  }
  const fieldType: string = field.type;
  let proColumnProps: any = {
    title: field.label,
    dataIndex: field.name
  }
  switch (fieldType) {
    case 'text':
      proColumnProps.valueType = 'text';
      break;
    case 'select':
      proColumnProps.valueType = 'select';
      break;
    case 'textarea':
      proColumnProps.valueType = 'textarea';
      break;
    case 'date':
      proColumnProps.valueType = 'date';
      break;
    case 'datetime':
      proColumnProps.valueType = 'dateTime';
      break;
    case 'boolean':
      proColumnProps.valueType = 'switch';
      break;
    case 'number':
      proColumnProps.valueType = 'digit';
      break;
    case 'url':
      proColumnProps.render = () => <div>{`未实现字段类型${fieldType}的组件`}</div>
      break;
    case 'currency':
      proColumnProps.valueType = 'money';
      break;
    case 'autonumber':
      proColumnProps.valueType = 'index';
      break;
    case 'lookup':
      proColumnProps.render = () => <div>{`未实现字段类型${fieldType}的组件`}</div>
      break;
    case 'formula':
      proColumnProps.render = () => <div>{`未实现字段类型${fieldType}的组件`}</div>
      break;
    case 'summary':
      proColumnProps.render = () => <div>{`未实现字段类型${fieldType}的组件`}</div>
      break;
    case 'master_detail':
      proColumnProps.render = () => <div>{`未实现字段类型${fieldType}的组件`}</div>
      break;
  }
  return proColumnProps;
}

export const ObjectTable = <T extends Record<string, any>, U extends ParamsType, ValueType>(props: ObjectTableProps<T, U, ValueType>) => {
  const store = useContext(BuilderStoreContext);
  const objectContext = useContext(ObjectContext);
  let { currentObjectApiName } = store.context;
  if (!currentObjectApiName) {
    currentObjectApiName = objectContext.currentObjectApiName;
  }

  const { columns, ...rest } = props
  const objectApiName = props.objectApiName ? props.objectApiName : currentObjectApiName as string;
  const {
    isLoading,
    error,
    data,
    isFetching
  } = useQuery(objectApiName, async () => {
    return await objectContext.requestObject(objectApiName as string);
  });
  const objectSchema: any = data

  if (!objectSchema)
    return (<div>Object Loading...</div>)

  registerObjectTableComponent(_.keys(objectSchema.fields));

  const objectFields = objectSchema.fields;
  let proColumns: any = []
  _.forEach(columns, (columnItem: ObjectTableColumnProps) => {
    const proColumn = getObjectTableProColumn(objectFields[columnItem.fieldName]);

    if (proColumn) {
      proColumns.push(proColumn);
    }
  });
  const request = async (params: U & {
    pageSize?: number;
    current?: number;
    keyword?: string;
  }, sort: Record<string, SortOrder>, filter: Record<string, React.ReactText[]>): Promise<Partial<RequestData<T>>> => {
    // 第一个参数 params 查询表单和 params 参数的结合
    // 第一个参数中一定会有 pageSize 和  current ，这两个参数是 antd 的规范
    // 这里需要返回一个 Promise,在返回之前你可以进行数据转化
    // 如果需要转化参数可以在这里进行修改
    /*
    const msg = await myQuery({
      page: params.current,
      pageSize: params.pageSize,
    });
    return {
      data: msg.result,
      // success 请返回 true，
      // 不然 table 会停止解析数据，即使有数据
      success: boolean,
      // 不传会使用 data 的长度，如果是分页一定要传
      total: number,
    };
    */
    const columnsFields = columns.map((n) => { return n.fieldName });
    return objectContext.requestRecords(objectApiName, filter, columnsFields, {
      pageSize: params.pageSize as number,
      current: params.current as number,
      sort: sort
    });
  }

  return (
    <ProTable
      rowKey="_id"
      request={request}
      columns={proColumns}
      // formFieldComponent = {ObjectField}
      {...rest}
    />
  )
}