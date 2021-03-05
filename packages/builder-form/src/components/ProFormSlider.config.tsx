export const configProFormSlider = {
  name: 'Steedos:FormSlider',
  inputs: [
    { name: 'name', type: 'text', defaultValue: 'slider'},
    { name: 'label', type: 'text', defaultValue: 'Slider'},
    { name: 'marks',  type: 'list', subFields: [
      { name: 'label', type: 'string' },
      { name: 'value', type: 'number' }
    ]},
  ],
};
