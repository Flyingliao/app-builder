
import React from "react";
import {Input} from '..'; 


// https://developer.salesforce.com/docs/component-library/bundle/lightning-input-field/documentation
export class InputField extends React.Component<any> {
  static defaultProps = {
    required: false,
  }

  render() {
    const {fieldName, ...rest} = this.props

    // 根据fieldName，解析 type, label 等属性
    
    return (
      <Input id={fieldName} {...rest}/>
    )
  }
}
