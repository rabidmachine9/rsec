interface CheckboxProps {
    name: string,
    label: string,
    onChange: any,
  }
  


export const Checkbox: React.FC<CheckboxProps> = ({ name, label, onChange }) => {
    return (
      <>
        <label htmlFor={name} > {label}</label>
        <input type="checkbox" className="moufa-button moufa-dropdown" defaultChecked={false} name={name} id={name} onChange={onChange}></input>
      </>
    );
};