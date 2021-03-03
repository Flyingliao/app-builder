Steedos App Builder 
===

Steedos Low-Code App Builder, an alternative to Salesforce App Builder. use metadata to define apps, including components, forms, tables, pages, layout and routes. 

You can use [Builder.IO Fiddle](https://builder.io/fiddle) for visual page design.

## Build In Components

### Standard Components

Provide standard components to working on all projects, based on [Ant Design ProComponents](https://procomponents.ant.design/en-US_ .

- [Form](https://procomponents.ant.design/en-US/components/form) 
- [FormField](https://procomponents.ant.design/en-US/components/field-set)
- [Layout](https://procomponents.ant.design/en-US/components/layout)
- [Editable DataTable](https://procomponents.ant.design/en-US/components/editable-table)

### Steedos Business Object Components

Provide components to query [Steedos Objects](https://github.com/steedos/steedos-platform)

- Object Form
- Object DataTables

## Design App with Builder.IO

You can use [Builder.IO Fiddle](https://builder.io/fiddle) as an no-code editor to design you app.

## Design App with json

You can write json file to design your app.

### Page Section

```json
{
  "@type": "@steedos/builder-sdk:Section",
  "blocks":[
    {
      "@type":"@builder.io/sdk:Element",
      "component":{
        "name":"Text",
        "options":{"text":"Hello Steedos ..."}
      },
      "responsiveStyles":{
        "large":{
          "position":"relative"
        }
      }
    }
  ]
}
```


### Page

```json
{
  "@type": "@steedos/builder-sdk:Page",
  "title": "Hello Steedos",
  "description": "This page is generated by Steedos App Builder.",
  "blocks":[
    {
      "@type":"@builder.io/sdk:Element",
      "component":{
        "name":"Text",
        "options":{"text":"Hello Steedos ..."}
      },
      "responsiveStyles":{
        "large":{
          "position":"relative"
        }
      }
    }
  ]
}
```

### Layout

```json
{
  "@type": "@steedos/builder-sdk:Layout",
  "title": "Hello Steedos",
  "logo": "https://www.steedos.com/img/logo_platform.png",
  "description": "This page is generated by Steedos App Builder.",
  "menuPosition": "top",
  "menus":[{
    "title": "Home",
    "route": "/"
  }]
}
```

### App

```json
{
  "@type": "@steedos/builder-sdk:App",
  "title": "Hello Steedos",
  "description": "This app is generated by Steedos App Builder.",
  "routes": [
  ],
  "layouts": [
  ],
  "pages": [
  ]
}
```
