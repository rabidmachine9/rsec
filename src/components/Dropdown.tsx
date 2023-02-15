import { LabelRounded } from "@mui/icons-material"

interface DropdownProps {
  name: string,
  label: string,
  options: Map<string, number>,
  onChange: any,
  defaultValue?: any,
  selected:any
}

interface Dropdown2Props {
  name: string,
  label: string,
  options: (string | number)[],
  onChange: any,
  selected: string | number
}

export const Dropdown: React.FC<DropdownProps> = ({ name, label, options, onChange, selected }) => {
  return (
    <>
      <label htmlFor={name} > {label}</label>
      <select className="moufa-button moufa-dropdown" name={name} id={name} onChange={onChange} defaultValue={selected}>
        {Array.from(options.entries()).map(([key, value]) => (
          <option key={key} value={value}>{key}</option>
        ))}
      </select>
    </>

  );
};

export const Dropdown2: React.FC<Dropdown2Props> = ({ name, label, options, onChange, selected }) => {
  return (
    <>
      <label htmlFor={name} > {label}</label>
      <select className="moufa-button moufa-dropdown" defaultValue={selected} name={name} id={name} onChange={onChange}>
        {options.map((el: any) => (
          <option key={el} value={el}>{el}</option>
        ))}
      </select>
    </>

  );
};