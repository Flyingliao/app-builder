import { Divider } from "antd"
import * as React from "react"
import { 
  RecordEditForm, 
  FormSection, 
  InputField, 
  InputLookup, 
} from "../src"

export default {
  title: "Form",
}

export const RecordForm = () => (
    <RecordEditForm>
      <FormSection title="Section 1">
        <InputField fieldName="name" required label="Name" isWide placeholder="Please enter name." fieldLevelHelp="Please input name"/>
        <InputField fieldName="email" readOnly label="Email" value="user@company.com"/>
        <InputField fieldName="number" type="number" label="Number"/>
        <InputField fieldName="lookup" type="lookup" label="Lookup"/>
      </FormSection>
      <FormSection title="Section 2">
        <InputField fieldName="name" label="Name"/>
      </FormSection>
    </RecordEditForm>
  )
  